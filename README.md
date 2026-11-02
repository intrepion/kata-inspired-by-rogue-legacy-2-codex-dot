# Heirs of the Hollow

An original browser action-platforming roguelite inspired by Rogue Legacy 2. Choose one of three heirs, fight through six randomized chambers, collect gold, and return to the manor to buy permanent health and damage upgrades. Defeat the Warden and carry the crown into future runs. [Return to Kata Arcade](https://intrepion.github.io/).

## Play

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Visit <http://127.0.0.1:8000/>. Move with A/D or arrows, jump with W, up or Space, attack with J, dash with K, and use E at an unsealed door. Clear each room before leaving. Gold is collected on contact and inherited on death or victory. Progress is stored in browser local storage; Reset legacy erases it.

## Research and scope

Cellar Door Games describes Rogue Legacy 2 as a genealogical roguelite: randomized exploration, death and succession, class-specific weapons, traits with gold modifiers, persistent manor upgrades and heirlooms, and temporary relics that trade against resolve. Its full game also has distinct biomes, many bosses, story, accessibility rules and New Game+. Sources: [developer press kit](https://press.cellardoorgames.com/sheet.php?p=rogue_legacy_2) and [official Steam page](https://store.steampowered.com/app/1253920/Rogue_Legacy_2/).

This is a small interpretation, not a mechanical replica. It has three simplified classes, four traits, six rooms, one boss, two permanent upgrades and original canvas artwork. It does not implement the original's exact movement, combat, level generation, classes, enemies, bosses, heirlooms, relics, resolve, equipment, story, accessibility settings or New Game+. The presentation is 2D; a 3D library would add little to this compact side-view game. Rogue Legacy 2 is a trademark of Cellar Door Games; this project is unaffiliated.

## Tests

Run `npm test` with Node.js. No dependencies or build step are required. The MIT license applies to this project's original code and artwork; see [LICENSE](LICENSE).
