---
title: '1v1 Lockout Bingo Patch 3.1 Notes'
excerpt: 'With the goals of fixing some of the level shine strength, check out the latest patch notes for 1v1 Lockout Bingo.'
date: '2021-08-04T21:50:32Z'
author:
    name: Bingo Balance Team
---

## Philosophy

The current 3.0 patch has been played consistently for about 2 weeks, and a couple of worrying patterns emerged. Chiefly, the strength of level shines, the particular strength of Ricco and Pianta, and by extension, Pinna.

Ricco and Pianta represent some of the fastest worlds for level shines, and are heavily supported in the 3.0 patch by a variety of goals being spread out across multiple pools. This resulted in the dominant strategy of going to one or two of those levels first, sometimes both, with little to no counterplay available. Coupled with the relative strength of Pinna, this meant that we were seeing earlier Pinna entries than ever before, and matches being closed out in this way.

The goal of this 3.1 patch is to reduce some of the strength a straight Pianta/Ricco -> Pinna rush enjoys. This is primarily achieved by moving goals around in pools to better consolidate some of the Pianta and Ricco specific goals, consolidate deep level payoffs together, and to try to enable some more counterplay to some specific goals. We also are fixing lilypad. #legowasright

The balance team did not aim to make drastic changes, but rather, to try to find the smallest scope of changes that can bring the meta to a more healthy state and achieve a better balance of starts, and ultimately, enable slower players to have counterplay options available to them.

While we don’t want to make this a common occurrence, the unique circumstances around the release of patch 3.0 (where there was minimal scrim activity for a variety of factors, including the 2v2 tournament), meant that we wanted to respond quickly. We are open to further changes, though this should not be expected to be a common occurance.

## Goal Changes

### 20 Lives -> 22 Lives (List 3)

We’re seeing more and more players routing lives into their normal gameplan when a lives goal is on the card. This is a game plan the balance team likes to see, as it presents a tradeoff, however, the distinction between 18 lives and 20 lives becomes much less when you consider lifegrinds are starting with 10, even 15 lives. Moving 20 to 22 makes it just a bit further out of reach and require more time investment to achieve over just 18 lives.

### All 15 Pinna Yellow Button Coins -> 10 Yellow Button Coins (List 12)

The absence of a word can change everything. Pinna Yellow Button now has a counter starting in Gelato 3, where you can ground pound it’s yellow button and achieve it’s goal. The hope is this will allow for some counter to Pinna yellow button by allowing for an alternative in a slower, but earlier place. While we don’t expect this to be a massive change, it opens up some doors to alternatives (much like 16 Noki Blues OR 5 Gelato Shines). This did require a change in the count of coins from 15 to 10, but that shouldn’t impact the Pinna side much.

### Pinna 4 AND Lily Pad Shine -> Lily Pad No Pipe Clipping (List 14)

As was mentioned in the original patch 3.0, this was a buff to Pinna, a buff that we are now evaluating as too much given the current strength of the world. Given that Lily Pad shine was doable as part of a Pinna rush, and no longer requires you to leave Pinna to obtain, this allowed players to continue on and not have to sacrifice goals like 6 from Pinna or Pinna 5 FTBH. This change achieves the goal of preventing timer glitch strats while returning the goal back to its original, pre 3.0 state. There is still, sadly, no reason to classify barrels as fruits. This will be coupled with a rule clarification stating what is considered "pipe clipping", which, for this goal, refers to any method of entering the Lily Pad shine's loading zone that does not involve disolving the jelly and entering through the top.

## Goal Pool Changes

### Preface

This was the primary place where the balance team looked to shift power around. The goal was to try to consolidate some of the ways that Ricco, Pianta, and Pinna were strong to give other goals the ability to show up on the card. The changes here are ordered not by their pool number, but rather by how they are logically grouped together.

### Pools 21 and 22

| Pool Number | Old Goals                                                                                                                                                                                                   | New Goals                                                                                                                                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 21          | { name: "2 Turbo Nozzle Unlocks"},<br>**{ name: "8 Episode Shines"},**<br>{ name: "13 Shines from Delfino (With Blue Trades)"},<br>**{ name: "6 Shines from 2 Worlds"},**<br>{ name: "80 Total Blue Coins"} | { name: "2 Turbo Nozzle Unlocks"},<br>{ name: "13 Shines from Delfino (With Blue Trades)"},<br>{ name: "80 Total Blue Coins"},<br>**{ name: "3 Shines from 4 Levels"},<br>{ name: "4 Shines from 3 Levels"},** |
| 22          | **{ name: "3 Shines from 4 Levels"},<br>{ name: "4 Shines from 3 Levels"},**<br>{ name: "1 Shine from each Level"},<br>{ name: "12 Level Shines"},<br>{ name: "8 Shines from 1 Level"}                      | { name: "1 Shine from each Level"},<br>{ name: "12 Level Shines"},<br>{ name: "8 Shines from 1 Level"},<br>**{ name: "8 Episode Shines"},<br>{ name: "6 Shines from 2 Worlds"}**                               |

In the patch 3.0 notes, it was identified that allowing 8 episode shines to spawn with 8 from 1 might have been too powerful, so it’s one of the first things we changed back. These changes are designed to consolidate the deeper progression goals together in Pool 22 and make pool 21 more of a catch-all for spread progression. This should create situations where there’s at least one “deep” goal and one “wide” goal per card from these pools. We are now allowing for 12 level shines to co-exist with 3 from 4 and 4 from 3, which may present issues, but is able to be responded to in more ways than one.

### Pool 4

| Old Goals                                                                                                                                                                           | New Goals                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **{ name: "15 Gelato Blue Coins"},<br>{ name: "5 Linked Blue Coin Pairs"},**<br>{ name: "3 Boss Shines"},<br>{ name: "1 Ricco Hidden Shine"},<br>**{ name: "Pianta 3 Damageless"}** | **{ name: "Bianco 4 Hoverless"},<br>{ name: "23 Ricco Blue Coins"},**<br>{ name: "3 Boss Shines"},<br>{ name: "1 Ricco Hidden Shine"},<br>**{ name: "16 Pianta Blue Coins"}** |

Pool 4 ended up changing the most due to its current role as a repository of some powerful goals. It remains a place where you can find some early game power, this time focused just a bit more on levels and goals accessible within the first 4 shines you collect in the game.

### Pool 9

| Old Goals                                                                                                                                                                   | New Goals                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| { name: "3 Secret Shines"},<br>{ name: "4 Red Coin Shines"},<br>**{ name: "23 Ricco Blue Coins"},**<br>{ name: "5 Blue Bird Blue Coins"},<br>{ name: "16 Pinna Blue Coins"} | { name: "3 Secret Shines"},<br>{ name: "4 Red Coin Shines"},<br>**{ name: "5 Linked Blue Coin Pairs"},**<br>{ name: "5 Blue Bird Blue Coins"},<br>{ name: "16 Pinna Blue Coins"} |

The first of the consolidation moves resides in pool 9. Moving 5 linked pairs into this pool means that early pinna blues can only spawn once on a card, instead of up to twice between linked pairs and either blue birds or 16 Pinna blues.

### Pool 8

| Old Goals                                                                                                                                                                      | New Goals                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **{ name: "16 Pianta Blue Coins"},**<br>{ name: "2 Rocket Nozzle Unlocks"},<br>{ name: "4 Unique Boss Shines"},<br>{ name: "4 Pianta Shines"},<br>{ name: "3 Red Coin Shines"} | **{ name: "Pianta 3 Damageless"},**<br>{ name: "2 Rocket Nozzle Unlocks"},<br>{ name: "4 Unique Boss Shines"},<br>{ name: "4 Pianta Shines"},<br>{ name: "3 Red Coin Shines"} |

Trading one pianta goal for another may not seem like a big change, but this consolidates the two Pianta early shine goals together as opposed to allowing them to spawn on the same card. 16 Pianta Blues is more of a time commitment, and can allow for counterplay to either of those two goals, so it is more permissible to allow them to spawn together.

### Pool 3

| Old Goals                                                                                                                                                         | New Goals                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| { name: "18 Lives"},<br>**{ name: "20 Lives"},**<br>{ name: "Ricco 100 Coin Shine"},<br>{ name: "Gelato 100 Coin Shine"},<br>**{ name: "1 Bianco Hidden Shine"}** | { name: "18 Lives"},<br>**{ name: "22 Lives"},**<br>{ name: "Ricco 100 Coin Shine"},<br>{ name: "Gelato 100 Coin Shine"},<br>**{ name: "15 Gelato Blue Coins"}** |

Pool 3 now has two gelato goals, increasing the likelihood of a gelato goal on the card. It also enables the final move in Pool 2, to free up Bianco 4 Hoverless to move to Pool 4 while keeping a early bianco goal inside of Pool 2.

### Pool 2

| Old Goals                                                                                                                                                                                                               | New Goals                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| { name: "Two 100 Coin Shines"},<br>{ name: "50 Yellow Coins from 2 Levels OR 150 Delfino Yellow Coins"},<br>**{ name: "Bianco 4 Hoverless"},**<br>{ name: "1 Turbo Nozzle Unlock"},<br>{ name: "Pianta 100 Coin Shine"} | { name: "Two 100 Coin Shines"},<br>{ name: "50 Yellow Coins from 2 Levels OR 150 Delfino Yellow Coins"},<br>**{ name: "1 Bianco Hidden Shine"},**<br>{ name: "1 Turbo Nozzle Unlock"},<br>{ name: "Pianta 100 Coin Shine"} |

As mentioned, this move is primarily to free up Bianco 4 Hoverless to move into Pool 4 by taking the donation from Pool 3. This also preserves the ability for bianco hidden and ricco hidden to appear on the same card, which a simpler swap may not have allowed.

## League Implications

All matches from Week 3 onward will be using this version. If Bingosync is not updated in time, we’ll run the matches using a custom generator.
