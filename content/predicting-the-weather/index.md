---
title: "Predicting the Weather"
date: "2011-06-14"
categories: 
  - "weather"
---

Predicting the weather is a difficult task, often taking years of training. Then hours of studying charts, tides to predict weather we are going to be wearing shorts or trousers tomorrow.  
I decided to take a more basic approach to attempt to guesstimate what the weather is going to do.

Taking baby steps, I am only predicting 12 hours in the future. But below I will outline the method in my madness.  
  
From running [Is The Storm Coming](http://www.isthestormcoming.com) since February, Jason and I now have a load of weather related data stored. When I say a load, we have a boolean value measured twice a day saying if it was going to be nice or stormy.

Inspired by the Rock Paper Scissors bot I covered [a few posts earlier](http://snappeh.com/blog/rock-paper-scissors-bot/), I was inspired to see if the same approach could be used to predict the weather.  
This is my method for making the next prediction:

Look at the weather over the last 7 days, morning and afternoon, and find the pattern of weather it was Stormy or not, create a pattern from this. This gives 14 values of true or false. So I might have a pattern of:

> 01000010100010

Then I take the string from the whole database, currently about 200 values (Jun 2011) and growing, at the rate of two a day. It then looks for occurrences of this pattern in the database.

It then looks for this in the larger string and pulls out the next value. This is the prediction for the next day.

![Explaining storm prediction](/images/patterndemo.png "Pattern Demo")

So continuing the example above, Looking for the pattern in the larger string, it finds it, and therefore predicts the next storm reading to be a 0, meaning no Storm.

If it is unable to find it, then it removes one character from the beginning and looks again. Neat eh.  
So the string would become

> 1000010100010

Now, the real test of this would be how accurate this method of prediction is, I will be adding to the script in the next few days so the predictions are added to a table, then job will then be scheduled by Cron, just as the main Storm website. So as soon as it fetches the real storm data, I will predict the next reading.

Then I will code a another script to check my accuracy. I'm hoping for good results, but realistically I doubt it will.

If this method of predicting the weather does work, then MET department eat your heart out.
