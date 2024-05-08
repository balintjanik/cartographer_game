# Cartographer

## About
This is a university project from 2023. It is a simple game playable from the browser. It is not entirely responsive (designed for desktop, mobile view was not a task of the homework).

## Game Description
Next to Dontsearchcountry lies a huge country, the Potato Empire, many parts of which are still unknown and uninhabited to this day. Its ruler, Empress Pityóka, ordered the mapping and population of these areas. As a first step, she commissioned you as an imperial cartographer to explore the landscape. The empress uses quests to determine what kind of landscapes she wants to see in her empire. Help her fulfill her wishes as best as possible, so your reputation can grow accordingly!

In this one-player game, you have to place map elements of different shapes and types of terrain on an 11x11 square grid map (there are 5 fix mountain fields). Each item has a time value (1 or 2), the game consists of 28 time units. At the end of the game (or during) you get points for missions based on the current state of the square grid, and the final score is based on this.

The terrain types of the map elements that can be placed can be the following: forest, village, farm and water. The map elements to be placed are randomly chosen. We can rotate and mirror all map elements, and the map element cannot cover an already full field (the mountain also counts), nor can any part of it hang from the map.

At the beginning of each game, you get 4 random mission cards (A,B,C,D), based on which you can get points. If you surround the mountains from 4 sides, you get 1 point for each surrounded mountain.

The 28 time units represent one year. This can be broken down into 4 seasons, each season lasting up to 7 time units. If the cumulative time value reaches or exceeds a multiple of 7 while dragging map elements, the season ends. At the end of each season, we can get points for 2 mission cards. At the end of spring we can earn points for A-B missions, at the end of summer for B-C missions, at the end of autumn for C-D missions, and at the end of winter for D-A missions. For each of the four missions, you must indicate how many points you got for each season!

At the end of the game, our scores during the four seasons are added together and will give us our final score.