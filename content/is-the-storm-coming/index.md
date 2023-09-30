---
title: "Is The Storm Coming? Plug"
date: "2011-03-15"
categories: 
  - "recommendations"
  - "weather"
---

Because I have little other content to put up, I'm just leaving a note about another website I run with Jason, [Is The Storm Coming](http://isthestormcoming.com)?.

The whole idea of this website, came from a saying at work. So we bought the domain, and wondered what to do with it. Eventually we came up with the idea of scraping a weather website, and searching for key words. Firstly, I hacked something together in PHP. It took all of about 20 minutes, and the website was live.

Obviously the information provided is only for Guernsey, in the Channel Islands, but it provides a simple yes or no answer on weather to stay indoors.

In January, Jason [recoded it all in Ruby on Rails](http://deedoubleyou.net/2011/01/24/isthestormcoming-com-updated/). We also tarted the thing up with a nice graph showing storm frequency. This uses the google API, and although Jason needs to get on it and fix the labels on the axis, the scales are good, and now there is nearly 3 months worth of data in the graph, its actually interesting what shape it takes.

The future plans I think are to use an algorithm similar to the one used by the [Rock, Paper, Scissors Bot](http://snappeh.com/blog/rock-paper-scissors-bot/) to predict the weather. Accurate, No A bit of Fun, Yes
