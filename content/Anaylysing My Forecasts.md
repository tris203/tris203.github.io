---
title: Analysing My Forecasts
date: 2011-06-21
slug: analysing-my-forecasts
categories:
  - weather
---

So I've now been predicting the weather for a week, and well all I can say is, I’m pretty damn good at it.

I wrote a script to go back in the database, and using the same logic as my current predicting script. It looks at data that would have been available to the system then, and puts a prediction in the database. This was marked as retrospective (although in theory it doesn’t matter).

Here is some output of my results at the time of writing

Using all data in the database, and all predictions (even those retrospective) gives

> 323 predictions, of which 279 have been correct, and 44 have been incorrect  
> Giving a total accuracy of 86.4%

If we exclude retrospectively calculated figures, we have a much lower number of predictions, but a higher rate of accuracy.

> 10 predictions, of which 9 have been correct, and 1 have been incorrect  
> Giving a total accuracy of 90%

So I was trying to work out why the drop in accuracy, when including the retrospective calculations.

The answer is simple, in that in the early days, the database wasn’t very accurate. So, if we exclude the first 100 rows. As at this time, the database was 'learning'. Then we get (at the time of writing) as below:

> 225 predictions, of which 206 have been correct, and 19 have been incorrect  
> Giving a total accuracy of 91.6%

Note: The eagle-eyed among you, will have noticed, that the first result shows 323 predictions, and the final (as it is working now) gives 225, and I said I had excluded the first 100 rows. But that’s only 98. Well the database doesn’t start until ID=3. As it couldn’t predict when there were only 1 or 2 entries. And I actually restricted it by doing ID>100. So it’s actually the first 98 as rows I'm ignoring as 1 and 2 don't exist!
