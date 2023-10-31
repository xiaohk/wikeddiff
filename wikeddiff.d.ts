/**
 * Filename: wikeddiff.d.ts
 *
 * Description:
 * This file contains type definitions for [wikEd diff](https://en.wikipedia.org/wiki/User:Cacycle/diff).
 *
 * Credits:
 * - Jay Wang <jay@zijie.wang>
 *
 * License:
 * CC0-1.0
 *
 * Created on: 10/31/2023
 * Last updated on: 10/31/2023
 *
 */

/** Core diff settings (with default values). */
export interface Config {
  /** Show complete un-clipped diff text (false) */
  fullDiff: boolean;

  /** Enable block move layout with highlighted blocks and marks at the original positions (true) */
  showBlockMoves: boolean;

  /** Enable character-refined diff (true) */
  charDiff: boolean;

  /** Enable repeated diff to resolve problematic sequences (true) */
  repeatedDiff: boolean;

  /** Enable recursive diff to resolve problematic sequences (true) */
  recursiveDiff: boolean;

  /** Maximum recursion depth (10) */
  recursionMax: number;

  /**
   * Reject blocks if they are too short and their words are not unique,
   * prevents fragmentated diffs for very different versions (true)
   */
  unlinkBlocks: boolean;

  /** Maximum number of rejection cycles (5) */
  unlinkMax: number;

  /** Reject blocks if shorter than this number of real words (3) */
  blockMinLength: number;

  /** Display blocks in differing colors (rainbow color scheme) (false) */
  coloredBlocks: boolean;

  /** Do not use UniCode block move marks (legacy browsers) (false) */
  noUnicodeSymbols: boolean;

  /** Strip trailing newline off of texts (true in .js, false in .php) */
  stripTrailingNewline: boolean;

  /** Show debug infos and stats (block, group, and fragment data) in debug console (false) */
  debug: boolean;

  /** Show timing results in debug console (false) */
  timer: boolean;

  /** Run unit tests to prove correct working, display results in debug console (false) */
  unitTesting: boolean;

  /** RegExp character classes. */

  // UniCode letter support for regexps
  regExpLetters: string;

  // New line characters without and with \n and \r
  regExpNewLines: string;
  regExpNewLinesAll: string;

  // Breaking white space characters without \n, \r, and \f
  regExpBlanks: string;

  // Full stops without '.'
  regExpFullStops: string;

  // New paragraph characters without \n and \r
  regExpNewParagraph: string;

  // Exclamation marks without '!'
  regExpExclamationMarks: string;

  // Question marks without '?'
  regExpQuestionMarks: string;

  /**
   * @param event Browser event if available
   * @param element DOM node
   * @param type Event type
   */
  blockHandler: (event: Event | undefined, element: Node, type: string) => void;

  regExp: RegExpConfig;
  msg: MessageConfig;
  htmlCode: HtmlCodeConfig;
}

/** Add regular expressions to configuration settings. */
export interface RegExpConfig {
  /** RegExps for splitting text */
  split: {
    /** Split into paragraphs, after double newlines */
    paragraph: RegExp;

    /** Split into lines */
    line: RegExp;

    /** Split into sentences /[^ ].*?[.!?:;]+(?= |$)/ */
    sentence: RegExp;

    /** Split into inline chunks */
    chunk: RegExp;

    /** Split into words, multi-char markup, and chars
     * regExpLetters speed-up: \\w+
     */
    word: RegExp;

    /** Split into chars */
    character: RegExp;
  };

  /** RegExp to detect blank tokens */
  blankOnlyToken: RegExp;

  /** RegExps for sliding gaps: newlines and space/word breaks */
  slideStop: RegExp;
  slideBorder: RegExp;

  /** RegExps for counting words */
  countWords: RegExp;
  countChunks: RegExp;

  /** RegExp detecting blank-only and single-char blocks */
  blankBlock: RegExp;

  /** RegExps for clipping */
  clipLine: RegExp;
  clipHeading: RegExp;
  clipParagraph: RegExp;
  clipBlank: RegExp;
  clipTrimNewLinesLeft: RegExp;
  clipTrimNewLinesRight: RegExp;
  clipTrimBlanksLeft: RegExp;
  clipTrimBlanksRight: RegExp;
}

/** Add messages to configuration settings. */
export interface MessageConfig {
  /** '(No difference)' */
  'wiked-diff-empty': string;

  /** '=' */
  'wiked-diff-same': string;

  /** '+' */
  'wiked-diff-ins': string;

  /** '-' */
  'wiked-diff-del': string;

  /** '◀' */
  'wiked-diff-block-left': string;

  /** '▶' */
  'wiked-diff-block-right': string;

  /** '<' */
  'wiked-diff-block-left-nounicode': string;

  /** '>' */
  'wiked-diff-block-right-nounicode': string;

  /** 'Error: diff not consistent with versions!' */
  'wiked-diff-error': string;
}

/**
 * Add output html fragments to configuration settings.
 * Dynamic replacements:
 *   {number}: class/color/block/mark/id number
 *   {title}: title attribute (popup)
 *   {nounicode}: noUnicodeSymbols fallback
 */
interface HtmlCodeConfig {
  /** '<div class="wikEdDiffNoChange" title="' + this.config.msg['wiked-diff-same'] + '">' */
  noChangeStart: string;

  /** '</div>' */
  noChangeEnd: string;

  /** '<div class="wikEdDiffContainer" id="wikEdDiffContainer">' */
  containerStart: string;

  /** '</div>' */
  containerEnd: string;

  /** '<pre class="wikEdDiffFragment" style="white-space: pre-wrap;">' */
  fragmentStart: string;

  /** '</pre>' */
  fragmentEnd: string;

  /** '<div class="wikEdDiffSeparator"></div>' */
  separator: string;

  /** '<span class="wikEdDiffInsert" title="' + this.config.msg['wiked-diff-ins'] + '">' */
  insertStart: string;

  /** '<span class="wikEdDiffInsert wikEdDiffInsertBlank" title="' + this.config.msg['wiked-diff-ins'] + '">' */
  insertStartBlank: string;

  /** '</span>' */
  insertEnd: string;

  /** '<span class="wikEdDiffDelete" title="' + this.config.msg['wiked-diff-del'] + '">' */
  deleteStart: string;

  /** '<span class="wikEdDiffDelete wikEdDiffDeleteBlank" title="' + this.config.msg['wiked-diff-del'] + '">' */
  deleteStartBlank: string;

  /** '</span>' */
  deleteEnd: string;

  /** '<span class="wikEdDiffBlock" title="{title}" id="wikEdDiffBlock{number}" onmouseover="wikEdDiffBlockHandler(undefined, this, 'mouseover');">' */
  blockStart: string;

  /** '<span class="wikEdDiffBlock wikEdDiffBlock wikEdDiffBlock{number}" title="{title}" id="wikEdDiffBlock{number}" onmouseover="wikEdDiffBlockHandler(undefined, this, 'mouseover');">' */
  blockColoredStart: string;

  /** '</span>' */
  blockEnd: string;

  /** '<span class="wikEdDiffMarkLeft{nounicode}" title="{title}" id="wikEdDiffMark{number}" onmouseover="wikEdDiffBlockHandler(undefined, this, 'mouseover');"></span>' */
  markLeft: string;

  /** '<span class="wikEdDiffMarkLeft{nounicode} wikEdDiffMark wikEdDiffMark{number}" title="{title}" id="wikEdDiffMark{number}" onmouseover="wikEdDiffBlockHandler(undefined, this, 'mouseover');"></span>' */
  markLeftColored: string;

  /** '<span class="wikEdDiffMarkRight{nounicode}" title="{title}" id="wikEdDiffMark{number}" onmouseover="wikEdDiffBlockHandler(undefined, this, 'mouseover');"></span>' */
  markRight: string;

  /** '<span class="wikEdDiffMarkRight{nounicode} wikEdDiffMark wikEdDiffMark{number}" title="{title}" id="wikEdDiffMark{number}" onmouseover="wikEdDiffBlockHandler(undefined, this, 'mouseover');"></span>' */
  markRightColored: string;

  /** '<span class="wikEdDiffNewline">\n</span>' */
  newline: string;

  /** '<span class="wikEdDiffTab"><span class="wikEdDiffTabSymbol"></span>\t</span>' */
  tab: string;

  /** '<span class="wikEdDiffSpace"><span class="wikEdDiffSpaceSymbol"></span> </span>' */
  space: string;

  /** '<span class="wikEdDiffOmittedChars">…</span>' */
  omittedChars: string;

  /** '<div class="wikEdDiffError" title="Error: diff not consistent with versions!">' */
  errorStart: string;

  /** '</div>' */
  errorEnd: string;
}

/**
 * wikEd diff main class.
 */
export class WikEdDiff {
  /** Configuration and customization settings. */
  config: Config;

  /** New text version object with text and token list */
  newText: WikEdDiffText | null;

  /** Old text version object with text and token list */
  oldText: WikEdDiffText | null;

  /** Symbols table for whole text at all refinement levels */
  symbols: {
    token: string[];
    hashTable: { [key: string]: string };
    linked: boolean;
  };

  /** Matched region borders downwards */
  bordersDown: string[];

  /** Matched region borders upwards */
  bordersUp: string[];

  /** Block data (consecutive text tokens) in new text order */
  blocks: string[];

  /** Maximal detected word count of all linked blocks */
  maxWords: number;

  /** Section blocks that are consecutive in old text order */
  groups: string[];

  /** Block sections with no block move crosses outside a section */
  sections: string[];

  /** Debug timer array: string 'label' => float milliseconds. */
  timer: { [label: string]: number };

  /** Count time spent in recursion level in milliseconds. */
  recursionTimer: number[];

  /** Unit tests have detected a diff error */
  error: boolean;

  /** Diff fragment list for markup, abstraction layer for customization */
  fragments: string[];

  /** Html code of diff */
  html: string;

  /**
   * Constructor, initialize settings, load js and css.
   */
  init(
    wikEdDiffConfig: Record<string, unknown>,
    config: Record<string, unknown>
  ): void;

  /**
   * Main diff method.
   *
   * @param oldString Old text version
   * @param newString New text version
   * @return Html code of diff
   */
  diff: (oldString: string, newString: string) => string;

  /**
   * Split tokens into chars in the following unresolved regions (gaps):
   *   - One token became connected or separated by space or dash (or any token)
   *   - Same number of tokens in gap and strong similarity of all tokens:
   *     - Addition or deletion of flanking strings in tokens
   *     - Addition or deletion of internal string in tokens
   *     - Same length and at least 50 % identity
   *     - Same start or end, same text longer than different text
   * Identical tokens including space separators will be linked,
   *   resulting in word-wise char-level diffs
   */
  splitRefineChars: () => void;

  /**
   * Split tokens into chars in the following unresolved regions (gaps):
   *   - One token became connected or separated by space or dash (or any token)
   *   - Same number of tokens in gap and strong similarity of all tokens:
   *     - Addition or deletion of flanking strings in tokens
   *     - Addition or deletion of internal string in tokens
   *     - Same length and at least 50 % identity
   *     - Same start or end, same text longer than different text
   * Identical tokens including space separators will be linked,
   *   resulting in word-wise char-level diffs
   */
  splitRefineChars(): void;

  /**
   * Move gaps with ambiguous identical fronts to last newline border or otherwise last word border.
   *
   * @param text These two are newText
   * @param textLinked and oldText
   */
  slideGaps(text: string, textLinked: string): void;

  /**
   * Calculate diff information, can be called repeatedly during refining.
   * Links corresponding tokens from old and new text.
   * Steps:
   *   Pass 1: parse new text into symbol table
   *   Pass 2: parse old text into symbol table
   *   Pass 3: connect unique matching tokens
   *   Pass 4: connect adjacent identical tokens downwards
   *   Pass 5: connect adjacent identical tokens upwards
   *   Repeat with empty symbol table (against crossed-over gaps)
   *   Recursively diff still unresolved regions downwards with empty symbol table
   *   Recursively diff still unresolved regions upwards with empty symbol table
   *
   * @param level Split level: 'paragraph' | 'line' | 'sentence' | 'chunk' | 'word' | 'character'
   * @param recurse Enable recursion
   * @param repeating Currently repeating with empty symbol table
   * @param newStart Text object tokens index for new text start
   * @param oldStart Text object tokens index for old text start
   * @param up Determines the direction of comparison: true if upwards, false if downwards
   * @param recursionLevel Recursion level
   * @param newText Text object for the new text
   * @param oldText Text object for the old text
   */
  calculateDiff(
    level: 'paragraph' | 'line' | 'sentence' | 'chunk' | 'word' | 'character',
    recurse?: boolean,
    repeating?: boolean,
    newStart?: number,
    oldStart?: number,
    up?: boolean,
    recursionLevel?: number,
    newText?: WikEdDiffText,
    oldText?: WikEdDiffText
  ): void;

  /**
   * Main method for processing raw diff data, extracting deleted, inserted, and moved blocks.
   *
   * Scheme of blocks, sections, and groups (old block numbers):
   *   Old:      1    2 3D4   5E6    7   8 9 10  11
   *             |    ‾/-/_    X     |    >|<     |
   *   New:      1  I 3D4 2  E6 5  N 7  10 9  8  11
   *   Section:       0 0 0   1 1       2 2  2
   *   Group:    0 10 111 2  33 4 11 5   6 7  8   9
   *   Fixed:    .    +++ -  ++ -    .   . -  -   +
   *   Type:     =  . =-= =  -= =  . =   = =  =   =
   *
   */
  detectBlocks(): void;

  /**
   * Collect identical corresponding matching ('=') blocks from old text and sort by new text.
   */
  getSameBlocks(): void;

  /**
   * Collect independent block sections with no block move crosses
   * outside a section for per-section determination of non-moving fixed groups.
   */
  getSections(): void;

  /**
   * Find groups of continuous old text blocks.
   */
  getGroups(): void;

  /**
   * Set longest sequence of increasing groups in sections as fixed (not moved).
   */
  setFixed(): void;

  /**
   * Recusively find path of groups in increasing old group order with longest char length.
   *
   * @param start Path start group
   * @param groupEnd Path last group
   * @param cache Cache object, contains returnObj for start
   * @return Contains path and char length
   */
  findMaxPath(
    start: number,
    groupEnd: number,
    cache: unknown[]
  ): { path: unknown[]; chars: number };

  /**
   * Convert matching '=' blocks in groups into insertion/deletion ('+'/'-') pairs
   * if too short and too common.
   * Prevents fragmentated diffs for very different versions.
   *
   * @return True if text tokens were unlinked
   */
  unlinkBlocks(): boolean;

  /**
   * Unlink text tokens of single block, convert them into insertion/deletion ('+'/'-') pairs.
   *
   * @param block Blocks table object
   */
  unlinkSingleBlock(block: unknown[]): void;

  /**
   * Collect deletion ('-') blocks from old text.
   */
  getDelBlocks(): void;

  /**
   * Position deletion '-' blocks into new text order.
   */
  positionDelBlocks(): void;

  /**
   * Collect insertion ('+') blocks from new text.
   */
  getInsBlocks(): void;

  /**
   * Sort blocks by new text token number and update groups.
   */
  sortBlocks(): void;

  /**
   * Set group numbers of insertion '+' blocks.
   */
  setInsGroups(): void;

  /**
   * Mark original positions of moved groups.
   */
  insertMarks(): void;

  /**
   * Collect diff fragment list for markup, create abstraction layer for customized diffs.
   */
  getDiffFragments(): void;

  /**
   * Clip unchanged sections from unmoved block text.
   */
  clipDiffFragments(): void;

  /**
   * Create html formatted diff code from diff fragments.
   * @param version Output version: 'new' or 'old': only text from new or old version, used for unit tests
   * @returns void
   */
  getDiffHtml(version: string | undefined): void;

  /**
   * Customize html code fragments.
   * Replaces:
   *   {number}:    class/color/block/mark/id number
   *   {title}:     title attribute (popup)
   *   {nounicode}: noUnicodeSymbols fallback
   *
   * @param html Html code to be customized
   * @param number Block number
   * @param title Title attribute (popup) text
   * @returns Customized html code
   */
  htmlCustomize(html: string, number: string, title: string): string;

  /**
   * Replace html-sensitive characters in output text with character entities.
   *
   * @param html Html code to be escaped
   * @returns Escaped html code
   */
  htmlEscape(html: string): string;

  /**
   * Markup tabs, newlines, and spaces in diff fragment text.
   *
   * @param html Text code to be marked-up
   * @param highlight Highlight newlines and spaces in addition to tabs
   * @returns Marked-up text
   */
  markupBlanks(html: string, highlight: boolean): string;

  /**
   * Count real words in text.
   *
   * @param text Text for word counting
   * @returns Number of words in text
   */
  wordCount(text: string): number;

  /**
   * Test diff code for consistency with input versions.
   * Prints results to debug console.
   */
  unitTests(): void;

  /**
   * Dump blocks object to browser console.
   */
  debugBlocks(name: string, blocks: unknown[]): void;

  /**
   * Dump groups object to browser console.
   */
  debugGroups(name: string, groups: unknown[]): void;

  /**
   * Dump fragments array to browser console.
   */
  debugFragments(name: string): void;

  /**
   * Dump borders array to browser console.
   */
  debugBorders(name: string, borders: unknown[]): void;

  /**
   * Shorten text for dumping.
   */
  debugShortenText(text: string, max: number, end: number): string;

  /**
   * Start timer 'label', analogous to JavaScript console timer.
   */
  time(label: string, timer: number[]): void;

  /**
   * Stop timer 'label', analogous to JavaScript console timer.
   */
  timeEnd(label: string, noLog?: boolean): number;

  /**
   * Log recursion timer results to browser console.
   */
  timeRecursionEnd(text: string, recursionTimer: number[]): void;

  /**
   * Log variable values to debug console.
   */
  debug(name: string, object?: unknown): void;

  /**
   * Add script to document head.
   */
  addScript(code: string): void;

  /**
   * Add stylesheet to document head, cross-browser >= IE6.
   */
  addStyleSheet(css: string): void;

  /**
   * Recursive deep copy from target over source for customization import.
   */
  deepCopy(
    source: Record<string, unknown>,
    target: Record<string, unknown>
  ): void;
}

/**
 * Data and methods for single text version (old or new one).
 */
export class WikEdDiffText {
  /** Parent object for configuration settings and debugging methods */
  parent: WikEdDiff;

  /** Text of this version */
  text: string | null;

  /** Tokens list */
  tokens: string[];

  /** First and last index of tokens list */
  first: number | null;
  last: number | null;

  /** Word counts for version text */
  words: { [key: string]: number };

  /**
   * Constructor, initialize text object.
   */
  init(text: string, parent: WikEdDiff): void;

  /**
   * Parse and count words and chunks for identification of unique words.
   */
  wordParse(regExp: string, text: string, words: string[]): void;

  /**
   * Split text into paragraph, line, sentence, chunk, word, or character tokens.
   */
  splitText(
    level: string,
    token: number | null,
    text: string,
    tokens: string[],
    first: number,
    last: number
  ): void;

  /**
   * Split unique unmatched tokens into smaller tokens.
   */
  splitRefine(level: string, tokens: string[]): void;

  /**
   * Enumerate text token list before detecting blocks.
   */
  enumerateTokens(tokens: undefined[]): void;

  /**
   * Dump tokens object to browser console.
   *
   * @param name Text name
   * @param first First index of tokens list
   * @param last Last index of tokens list
   * @param tokens Tokens list
   */
  debugText(
    name: string,
    first: number,
    last: number,
    tokens: undefined[]
  ): void;
}
