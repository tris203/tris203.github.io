---
title: Methods Are Requests; Providers Are Capabilities
date: 2026-05-15
slug: methods-are-requests-providers-are-capabilities
tags:
  - blog/tech
aliases: []
id: methods-are-requests-providers-are-capabilities
---

# Methods Are Requests; Providers Are Capabilities

I've contributed to a few different parts of Neovim's LSP implementation now, but diagnostics was the first place where Neovim's dynamic registration model stopped making sense to me.

Diagnostics has two related methods: `textDocument/diagnostic` and `workspace/diagnostic`. They are not the same request, but they share requirements through the diagnostic provider. That was the awkward part. The existing code mostly wanted to answer questions by looking at the method, but here were two methods whose support could not be understood cleanly without looking through the provider they shared.

That discrepancy was the first thread. Pulling on it turned dynamic registration from a missing feature into a deeper question about what Neovim should treat as the source of truth.

In LSP, a server can advertise support for a capability in a couple of different ways. It can return a fixed set of capabilities during initialization, which is the static path: the client starts, the server says what it supports, and those capabilities are available for the lifetime of the client. Or, if the client says it supports dynamic registration for a particular capability, the server can register that capability later.

That later registration is not just another way of saying "yes, I support this method." It can carry its own options, its own document selector, and its own shape. A server can even register the same capability multiple times under different conditions. So the question Neovim needs to answer is not simply "does this server support this method?" It is "which registered thing says this method is supported, and under what rules?"

The awkward thing is that dynamic registration arrives with the method as its primary shape. Simplified a bit, a `client/registerCapability` request can put the interesting provider option inside a method-shaped registration:

```json
{
  "registrations": [
    {
      "id": "diagnostics",
      "method": "textDocument/diagnostic",
      "registerOptions": {
        "documentSelector": [{ "language": "lua" }],
        "workspaceDiagnostics": true
      }
    }
  ]
}
```

That makes the method feel like the natural key. The server is registering `textDocument/diagnostic`, so the client stores support under `textDocument/diagnostic`, and later asks whether that method is supported. But the option that enables workspace diagnostics is sitting inside that registration too. The method describes the request being made. The provider describes the server capability that makes the request valid. For diagnostics, that distinction matters, because `workspace/diagnostic` is a different method that still has to be understood through the diagnostic provider.

That was the model shift: methods are requests; providers are capabilities.

The method is what the client wants to do. The provider is the server saying how, and under what conditions, that request can be served. Most of the time those two ideas sit close enough together that you can pretend they are the same thing. Dynamic registration is where the pretending stops working.

Diagnostics is a good example because `workspace/diagnostic` does not have to be registered as `workspace/diagnostic` to be supported. The support can be expressed inside the registration options for `textDocument/diagnostic`, through `workspaceDiagnostics: true`.

So if Neovim asks the method-shaped question, "was `workspace/diagnostic` registered?", the honest answer might be no. But if it asks the provider-shaped question, "does the diagnostic provider support workspace diagnostics for this registration?", the answer might be yes. Both answers can be true at the same time. The bug was expecting one question to stand in for the other.

The refactor was to stop making every caller reconstruct that distinction for itself. Neovim needed one path for asking for provider values, regardless of whether those values came from the server's initialization result or from a later dynamic registration.

That sounds like a small plumbing change, but it changes the responsibility of the code. Instead of each feature asking, "is my method supported?", the client can ask for the provider behind the method and let the registration machinery account for static capabilities, dynamic registrations, and the options attached to each registration. The question moves closer to the shape of the protocol, even if the protocol does not always make that shape easy to see.

I do not think the old code was stupid. It had grown around the cases Neovim already supported, and for a lot of LSP methods the method and the provider sit close enough together that the difference does not hurt you. If a server says it supports completion, and the method maps cleanly to `completionProvider`, there is not much reason to reach for a more complicated model.

Diagnostics made the hidden assumption visible. The refactor was not just moving logic around. It was changing the unit of truth from "the method we saw" to "the provider state this method depends on."

Neovim has another constraint here: it tries to generate as much of its LSP metadata as possible from the official specification. In theory, that is exactly what you want. The spec knows the methods, the capabilities, the registration options, and the relationships between them; Neovim should not have to maintain a parallel hand-written map of the protocol.

But once the client starts asking provider-shaped questions, the generated metadata has to be good enough to answer them. It needs to know which provider a method corresponds to, where that provider lives in the server capabilities object, whether registration is allowed, and what shape the registration options have. That is where `metaModel.json` stopped feeling like a neat source of truth and started feeling like another part of the protocol with history embedded in it.

That history matters because LSP was not born as a tidy schema. It started as a written specification: prose, tables, examples, conventions, exceptions. The machine-readable model came later, after the protocol already had years of accumulated shape.

So generating from the spec does not magically erase ambiguity. Sometimes it preserves the ambiguity more precisely. If the prose says one thing, the TypeScript implementation assumes another, and the generated metadata can only express part of the relationship, a client that generates from the metadata inherits that disagreement instead of escaping it.

The clearest example I ran into was `workspace/didChangeWorkspaceFolders`. The prose specification says the method can be dynamically registered, but in the metamodel its `RegistrationOptions` are undefined. For a human reading the spec, the intent is visible. For a generator trying to infer which methods allow registration, there is no clean signal.

That is a frustrating kind of mismatch because nobody is really confused about what the feature is supposed to do. The problem is that the machine-readable version cannot quite say it. An empty `RegistrationOptions` type would have been enough. An explicit `allowsRegistration` flag would have been even clearer. Instead, a client that wants to generate this information has to learn the exception somewhere else.

I raised that upstream as [microsoft/language-server-protocol#2218](https://github.com/microsoft/language-server-protocol/issues/2218). Maybe my interpretation is wrong. Maybe there is a reason `workspace/didChangeWorkspaceFolders` should be represented that way. But without a response, Neovim still has to make a decision.

That is where the maintenance cost lands. The client cannot wait indefinitely for the metamodel to become more expressive, so the workaround lives downstream. And if Neovim needs local knowledge for this, it is hard to imagine it is the only client carrying little patches of protocol memory around the edges of the generated spec.

I do not want this to sound like dunking on LSP. I think the Language Server Protocol is one of the most important things to happen to editor tooling in years. It moved a huge amount of duplicated work out of individual editors and into shared language servers, and that basically worked.

If anything, its success is why this matters. The protocol is no longer only serving editors in the narrow sense. Language servers now sit under editors, IDEs, CI tools, and increasingly agentic coding interfaces that need a tight feedback loop: what is wrong, where is it wrong, did the change fix it? When the protocol has scar tissue, that scar tissue gets inherited by a lot of consumers.

For Neovim, the practical answer was not to solve LSP governance. It was to make the workaround boring.

If the generated metadata cannot express a case, the local exception should be obvious, documented by the shape of the code, and easy to delete if the spec is fixed later. I do not want some future maintainer to rediscover this from scratch during a refactor. The point of the implementation is not only to make today's behavior correct; it is to leave enough structure behind that the next person can tell which parts are protocol facts and which parts are scars.

That is also why the tests matter. The hard part of this code is not the happy path where one method maps cleanly to one provider. The hard part is the set of cases that made the model slippery in the first place: multiple dynamic registrations, methods with no provider, mixed static and dynamic capabilities, and providers reached through a different method than the one being asked about.

Those tests are not just proof that the current implementation works. They are a map of the weirdness. If someone has to refactor this code later, the tests should tell them which parts of the shape are accidental complexity and which parts are load-bearing protocol behavior.

That is a good place to end up. Neovim now has better dynamic registration handling than it did before, and the edge cases are captured in a way that should make future changes less frightening. The code is not pretending the protocol is simpler than it is, but it is also not giving up on the idea that the protocol can get better.

LSP is still active, still useful, and still worth improving. If the spec and the generated metadata become more precise over time, some of this code can disappear, and I love nothing more than a PR that is mostly red. Until then, Neovim has a more honest model, a clearer set of tests, and a better chance at a fearless refactor next time.
