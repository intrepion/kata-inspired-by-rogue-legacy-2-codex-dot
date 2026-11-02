# Heirs of the Hollow

An original browser action-platforming roguelite inspired by Rogue Legacy 2. Choose an heir, explore a connected randomized castle, claim the Wings heirloom, and defeat the Warden across generations. [Return to Kata Arcade](https://intrepion.github.io/).

## Play locally

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Visit <http://127.0.0.1:8000/>. Move with A/D or arrows; jump with W, up or Space; hold J to attack; dash with K; use the class talent with F; cast a mana spell with L; and interact with E. Doors are at the edges, ceiling or floor: approach one and press E. Ceiling doors require platforming. The minimap reveals visited rooms. Enemies remain defeated when revisiting a room during a life.

Find the Wings trial and defeat its enemies, then interact with the shrine for a permanent double jump. The Warden's room requires Wings. Treasure gives gold and health. Two relic sanctuaries offer temporary choices: each reduces resolve, and resolve below 100% proportionally reduces maximum health (to a floor of 25%). Enemies award gold and restore mana. Return to the left side of the starting room and press E to retire and bank gold, or leave it to the next heir on death. Buy permanent manor upgrades before choosing the next heir. Boss victory and Wings persist; room states and relics do not. Saves use browser local storage; Reset legacy erases them.

Knight has a sword and temporary countering shield, Ranger has a bow and stationary healing canopy, and Barbarian has an axe and damaging shout. Traits alter health, speed and/or gold. These are simplified original interpretations rather than replicas of the source classes.

## Research and fidelity

Cellar Door Games describes Rogue Legacy 2 as a genealogical roguelite: randomized exploration, death and succession, class-specific weapons, traits with gold modifiers, persistent manor upgrades and heirlooms, and temporary relics that trade against resolve. Its full game also has distinct biomes, many bosses, story, accessibility rules and New Game+. Sources: [developer press kit](https://press.cellardoorgames.com/sheet.php?p=rogue_legacy_2) and [official Steam page](https://store.steampowered.com/app/1253920/Rogue_Legacy_2/).

This remains a small approximation, **not mechanical parity**. It has a nine-room graph, one room layout, three classes, four traits, one heirloom, four relics, one boss, four manor upgrades, and original canvas artwork. It does not reproduce the source's exact movement, attacks, enemy behaviors, rooms, biome generation, economy, full class and trait roster, equipment, heirloom trials, boss roster, story, house rules, or New Game+. This build's freely available retirement, auto-collected gold, shrine and resolve rules are simplified. The 2D presentation does not use the original's 2.5D visual style. Rogue Legacy 2 is a trademark of Cellar Door Games; this project is unaffiliated.

## Tests

Run `npm test` with Node.js. Tests cover hundreds of seeded castle graphs including accessibility with the boss sealed, save migration, heirs, upgrades, relic costs and health, trait rewards and collisions. No dependencies or build step are required. The MIT license applies to this project's original code and artwork; see [LICENSE](LICENSE).
