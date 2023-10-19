---
title: 'Whipping Up Tech Brilliance!'
date: '2023-10-20'
categories:
  - 'tech'
---

A thought I have been having recently has to do with finding new raw talent in tech. How do you interview somebody who doesn't have a CV or a portfolio of work to show you? How do you find the next big thing? Don't get me wrong, I am not saying that you should hire somebody without any programming knowledge, but how do you find somebody who has the potential to be a great programmer?

If you have somebody, for example, who is coming in for a summer job, or a work experience placement, how do you sound out if they have the potential to be a great programmer? I have been giving this some thought recently, and tonight I was at a tech networking event, and I was talking to somebody about this, and I have come up with a solution. It's a piece of cake!

## The Cake Test

> Explain to me how to make a cake.

So in this question, you are looking for a basic ability to break a process down into its component steps, and then to explain them in a logical order. This is a basic skill that is required in programming, and if they can't do this, then they are unlikely to be able to get into the mindset of a programmer.

> Now make the instructions generic enough that I can make any recipe.

This is the next step, it is easy to make a set of instructions for a specific recipe, but can they make it generic enough that it can be applied to any recipe? This will show that they can think about the problem more abstractly. When programming, you are often taking processes that you have been through before, and problems that you have solved before and applying them to new problems. Taking a well-known process like cooking something, and abstracting it out to be generic is a good way to test this.

> When mixing the batter, how do you know when it is mixed enough?

The concept here is if statements, or probably more accurately while loops.

```typescript
whilst(!batter.mixed) {
    batter.mix();
}
```

> How can you make the baking process efficient and save time whilst doing it?

At this point, you are moving into a few different areas. Especially what I am thinking about here is multithreading or asynchronous operations. Would they put the oven on to warm up whilst they are making the batter? Would they put the cake in the oven and then start washing it up? Would they start washing up whilst the cake is in the oven? This is a good way to test their ability to think about the process as a whole, and not just the individual steps.

```typescript
function turnOnOven() {
    return new Promise(resolve => {
        oven.turnOn();
        resolve();
    });
}

function waitUntilTemperatureIsReady(targetTemperature) {
    return new Promise(resolve => {
        const checkTemperature = setInterval(() => {
            if (oven.temperature > targetTemperature) {
                clearInterval(checkTemperature);
                resolve();
            }
        }, 1000);
    });
}

async function makeCake() {
    await turnOnOven(); // Turn on the oven asynchronously
    console.log("Oven is on.");

    await waitUntilTemperatureIsReady(180); // Wait until the oven reaches 180°C
    console.log("Oven is ready! Let's make a cake.");
}

makeCake();
```

> How can you deal with different ingredients in the same recipe?
> Maybe I'm getting really abstract here, but I think this leads into types and type guards

```typescript
function mixIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(ingredient => {
        switch (ingredient.type) {
            case "liquid":
                pour(ingredient)
                break;
            case "powder":
                sprinkle(ingredient)
                break;
            case "egg":
                crack(ingredient)
                break;
        }
}
}
```

I'm sure I could expand on this, anyone who knows me knows that I love a good convoluted analogy, but I think this is a good start. Do you have any thoughts on how this could be expanded? If you have any other ideas for questions that could be asked then please let me know. As said before, I'm not asking them to write any code in this, this is specifically just to test thought processes and if they can think about some abstractions of code design, and the code examples are just to show how I would think about the problem.

I haven't even started on relational database design and how they would organise the fridge, or what stack of kitchen appliances they would use to make the cake. Maybe I might be getting a bit carried away now.

I've got another good analogy about a mechanic and change control/QA, but I'll save that for another day.
