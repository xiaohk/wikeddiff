# WikEd Diff

Mirror of [WikEd Diff](https://en.wikipedia.org/wiki/User:Cacycle/diff), a free
JavaScript visual diff library for inline text comparisons, written by
[Cacycle](https://en.wikipedia.org/wiki/User:Cacycle).

## Features

- Visual inline style, changes are shown in a single output text
- Block move detection and highlighting
- Resolution down to characters level
- Unicode and multilingual support
- Stepwise split (paragraphs, sentences, words, characters)
- Recursive diff
- Optimized code for resolving unmatched sequences
- Minimization of length of moved blocks
- Alignment of ambiguous unmatched sequences to next line break or word border
- Clipping of unchanged irrelevant parts from the output (optional)
- Fully customizable
- Text split optimized for MediaWiki source texts
- Well commented and documented code
- **TypeScript type definitions (new)**

## Install

```bash
npm install wikeddiff
```

## Demo

Online visual
[text diffing tool](http://cacycle.altervista.org/wikEd-diff-tool.html), created
by [Cacycle](https://en.wikipedia.org/wiki/User:Cacycle).

## Usage

```ts
import { WikEdDiff } from 'wikeddiff';

const wikEdDiff = new WikEdDiff();
const diffs = wikEdDiff.diff(oldText, newText);
```

For detailed documentation, see the
[original project page](https://en.wikipedia.org/wiki/User:Cacycle/diff).

## License

CC0-1.0.
