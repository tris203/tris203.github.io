---
title: "Forecast Accuracy"
date: "2011-06-16"
---

Well as I've rambled on about in many posts I run a [weather reporting website](http://isthestormcoming.com). It seemed to make sense to try and get into [prediction](http://snappeh.com/blog/guernsey-forecast/) using a nonsense mathmatical theory, outlined [here](http://snappeh.com/blog/predicting-the-weather/).

This page uses a PHP and MySQL scripting to look at the table that stores my predictions, and look at the table holding the actual weather results. This will allow me to judge weather the predictions are accurate.

100 ');

$correct=0;$incorrect=0;

$total = mysql\_num\_rows($result);

while($row = mysql\_fetch\_assoc($result)) { if ($row\['is\_predicted'\] == $row\['is\_coming'\]) { ++$correct; } else { ++$incorrect; } }

echo '

# Statistics

';

echo '

**' . $total . '** predictions, of which **' . $correct . '** have been correct, and **' . $incorrect . '** have been incorrect Giving a total accuracy of **' . round($correct/$total\*100,1) . '%**

';

$pattern = mysql\_fetch\_assoc(mysql\_query('SELECT COUNT( DISTINCT searchstring ) as \`patterns\` FROM predictions WHERE id > 100;')); $occurance = mysql\_fetch\_assoc(mysql\_query('SELECT SUM(occurances) as \`occurance\` FROM predictions WHERE id > 100;'));

echo '

This data is searching a total of **' . $pattern\['patterns'\] . '** unique patterns over a total of **' . $occurance\['occurance'\] . '** occurances of these patterns

';

echo '

Please note, these predictions ignore the first 100 rows of storm data. This because at this time the system was "learning"

'; mysql\_close($con); ?>
