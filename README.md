## PIXI CJK

pixi-cjk is a plugin for Pixi.js to display the Chinese/Japanese/Korean correctly

## Features

- prevent illegal break-lines in CJK (which also called kinsoku-shori)
- prevent unneeded breaking space when follwoing by CJK character

## Usage

Apply the Text style with `breakWords: true`, then improt the plugin. It should cover the CJK styling for you.
```
import 'pixi-cjk';
```

## How it works

- About the Kinsoku-shori, detect the Regex of unbreakable character (refer from: https://en.wikipedia.org/wiki/Line_breaking_rules_in_East_Asian_languages), and preventing break-lines when the matched the result.
- About the breaking space, when a space is following by a NOT-LATIN word, the space should not be a breaking space.
