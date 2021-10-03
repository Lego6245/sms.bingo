---
title: 'Roll 25d5: Generating Bingo Cards'
excerpt: "Ever curious how bingo cards get generated? Here's a primer on the mechanics behind the process."
date: '2021-10-04T21:50:32Z'
author:
    name: 'Lego'
---

Any viewer or player in the Sunshine Bingo League has definitely seen and played their fair share of bingo cards. To an outside viewer, it may seem simple: Out of all 121 goals available, twenty-five are selected and placed randomly in the five by five grid. However, astute observers might notice a few patterns. There always will be at least 2 blue coin totals goals, for instance, and certain goals don't show up at the same time. The secret is in how these goals are collected into "pools", and this primer will explain what those pools are, how they impact card generation, and why they are so important to creating balanced cards.

## Jumping In: Why Pools?

If we look over the 121 goals that make up SMS Bingo today, we can notice that the goals, at least on an individual basis, can be grouped in a number of ways based on what type of goal they are, or where you achieve it. For instance, there are 8 goals that explicitly mention Delfino in some way, whether it's Delfino's blue coins, shines, or nozzles. However, many of these goals overlap with each other. 11 and 15 Delfino Blues, for instance, are different goals in execution, but if they showed up on the same card, it would place too strong an emphesis on delfino blues, and would essentially be two goals in one. While synergies like that aren't neccissarily a bad thing, synergies that are too strong together are things that make a card imbalanced, easier to route, and ultimately less fun to play.

To solve this, instead of picking 25 goals out of the list of 121, the generation starts by grouping each of the 121 goals into 25 seperate pools. These pools are designed to group goals together that fit a certain theme, are a particular type of goal, or, in some cases, just hold a bunch of strong goals. Take a look at Pool 1 to understand what I mean.

```
bingoList[1] = [
    { name: "11 Delfino Blue Coins"},
    { name: "15 Delfino Blue Coins"},
    { name: "15 M Graffiti Blue Coins"},
    { name: "17 M Graffiti Blue Coins"},
    { name: "3 Blue Trade Shines"}
];
```

You can see that pool one contains many early blues goals that can be achieved with almost no shine progression. The fact that all these goals are grouped together results in two key impacts on board generation. The first, is that you are guaranteed one of these five goals on the board every single time a card is generated. This means there will always be at least one of these early blues goals to go for in every match. The second, and just as important, is that you are guaranted **only** one of these five goals on the board every single time a card is generated. This is just as important. It means that 15 and 17 Ms can't show up on the same card, nor can 11 Delfinos and 3 Blue Trades.

This is one of the most important balancing tools that the balance team has. By grouping together goals, you can prevent synergies from showing up that could result in unbalanced cards, but you can also guarantee that a goal of a certain type will show up. By seperating goals, you can allow them to show up together and synergize. In this way, the most important changes in every balance patch are usually how pools are shifted to allow for new goals or move goals around to allow for new synergize and prevent old ones from showing up.

## Concluding Notes

There are other mechanisms used by other types of bingos that allow for different wrinkles in card generation, such as tags on goals to prevent them showing up in the same line (important for non-lockout bingos to prevent broken rows), but for 1v1 Lockout Bingo, since we don't care as much about how strong an individual string of 5 goals is. Given the fact your opponent can lock you out of goals, the SMS 1v1 generator doesn't include tags to prevent a strong string of 5 (But pour one for Connect 5, where it does actually matter).

Knowing what goals can show up together, and which can't show up at the same time, can be a very powerful tool for any bingo player or viewer who wants to better theorize how to react to synergies when they show up. You can always find the latest version of the SMS 1v1 generator [here](https://github.com/kbuzsaki/bingosync/blob/master/bingosync-app/generators/super_mario_sunshine_1v1_generator.js), so you can see the pools and how they're grouped together.
