/**
 * UIL Number Sense — Topic Database
 * 
 * LEVEL SYSTEM (inclusive upward):
 *   elementary topics → shown at ALL levels
 *   middle topics     → shown at middle + high
 *   high topics       → shown at high only
 *
 * Each topic: id, title, section, category, level (minimum), icon,
 *   description, lesson (HTML), examples, memoData?, practiceGenerator
 */

// ── Helpers ───────────────────────────────────────────────────────
function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
export function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; }

// ── Categories ────────────────────────────────────────────────────
export const CATEGORIES = {
  arithmetic: {
    id: 'arithmetic',
    title: 'Basic Arithmetic',
    icon: '🔢',
    color: '#818cf8',
    description: 'Speed drills for addition, subtraction, multiplication, division, and more',
  },
  // Future categories will be added here as we build them
};

// ── Levels ────────────────────────────────────────────────────────
export const LEVELS = {
  elementary: { id: 'elementary', label: 'Elem', full: 'Elementary (4-6)', icon: '🌱' },
  middle:     { id: 'middle',     label: 'Middle', full: 'Middle School (6-8)', icon: '📘' },
  high:       { id: 'high',       label: 'High',  full: 'High School', icon: '🎓' },
};

const LEVEL_ORD = { elementary: 0, middle: 1, high: 2 };

// ── Topics ────────────────────────────────────────────────────────
export const TOPICS = [

  // ┌──────────────────────────────────────────────────────────────┐
  // │  1. MULTI-DIGIT ADDITION                                    │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'addition',
    title: 'Multi-Digit Addition',
    section: 'A.1',
    category: 'arithmetic',
    level: 'elementary',
    icon: '➕',
    description: 'Add 2, 3, and 4+ digit numbers quickly and accurately in your head.',
    lesson: `
      <p>Fast mental addition is the foundation of Number Sense. The key strategies are:</p>
      <p><strong>1. Left-to-Right Addition</strong> — Unlike on paper, add from <span class="hl">left to right</span>. This way you build up the answer naturally and can adjust with carries.</p>
      <div class="formula-block">347 + 285 → 300+200=500, 40+80=120, 7+5=12 → 500+120+12 = 632</div>
      <p><strong>2. Compensation</strong> — Round one number to make it easy, then adjust.</p>
      <div class="formula-block">497 + 368 → (500 + 368) − 3 = 868 − 3 = 865</div>
      <p><strong>3. Group Friendly Pairs</strong> — When adding a series of numbers, look for pairs that sum to a round number.</p>
      <div class="formula-block">17 + 19 + 21 + 23 → (17+23) + (19+21) = 40 + 40 = 80</div>
      <ul>
        <li>Always scan for pairs that make <strong>10, 100, or 1000</strong></li>
        <li>On Number Sense, <strong>speed on addition saves time</strong> for harder problems</li>
        <li>For estimation (★) problems with large sums, round each number first</li>
      </ul>
    `,
    examples: [
      { problem: '47 + 68', steps: ['40+60 = 100', '7+8 = 15', '100+15 = 115'], answer: '115' },
      { problem: '799 + 199', steps: ['Round: 800+200 = 1000', 'Subtract adjustments: 1+1 = 2', '1000−2 = 998'], answer: '998' },
      { problem: '490 + 493', steps: ['490+493 → 500+493−10 = 993−10', 'Or: 490+490+3 = 983'], answer: '983' },
      { problem: '17 + 19 + 21 + 23', steps: ['Pair: (17+23)=40, (19+21)=40', '40+40 = 80'], answer: '80' },
    ],
    practiceGenerator(level) {
      const diff = { elementary: 0, middle: 1, high: 2 }[level] || 0;
      if (diff === 0) {
        const a = randInt(10, 999), b = randInt(10, 999);
        return { question: `${a} + ${b}`, answer: a + b };
      } else if (diff === 1) {
        const a = randInt(100, 9999), b = randInt(100, 9999);
        return { question: `${a} + ${b}`, answer: a + b };
      } else {
        // Series addition
        const start = randInt(10, 200);
        const step = pick([1, 2, 3, 5, 7, 10]);
        const count = randInt(3, 5);
        const terms = Array.from({ length: count }, (_, i) => start + step * i);
        const sum = terms.reduce((s, v) => s + v, 0);
        return { question: terms.join(' + '), answer: sum };
      }
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  2. MULTI-DIGIT SUBTRACTION                                 │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'subtraction',
    title: 'Multi-Digit Subtraction',
    section: 'A.2',
    category: 'arithmetic',
    level: 'elementary',
    icon: '➖',
    description: 'Subtract large numbers quickly, including results that go negative.',
    lesson: `
      <p>Mental subtraction uses similar strategies to addition:</p>
      <p><strong>1. Left-to-Right</strong> — Subtract the largest place values first.</p>
      <div class="formula-block">462 − 87 → 462−80 = 382, 382−7 = 375</div>
      <p><strong>2. Compensation</strong> — Round the number being subtracted.</p>
      <div class="formula-block">304 − 178 → 304−180 = 124, 124+2 = 126</div>
      <p><strong>3. Negative Results</strong> — At middle/high school level, results can be negative. Watch for this!</p>
      <div class="formula-block">599 − 995 → -(995−599) = -396</div>
      <p><strong>4. "Add Up" Method</strong> — Count up from the smaller number to the larger.</p>
      <div class="formula-block">1000 − 687 → 687+13=700, 700+300=1000 → 13+300 = 313</div>
    `,
    examples: [
      { problem: '304 − 178', steps: ['304−180 = 124', '124+2 = 126'], answer: '126' },
      { problem: '462 − 87', steps: ['462−90 = 372', '372+3 = 375'], answer: '375' },
      { problem: '599 − 995', steps: ['995−599 = 396', 'Result is negative: −396'], answer: '-396' },
    ],
    practiceGenerator(level) {
      const diff = LEVEL_ORD[level] || 0;
      if (diff === 0) {
        const a = randInt(50, 999), b = randInt(10, a);
        return { question: `${a} − ${b}`, answer: a - b };
      } else {
        const a = randInt(100, 9999), b = randInt(100, 9999);
        return { question: `${a} − ${b}`, answer: a - b };
      }
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  3. BASIC MULTIPLICATION                                    │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'basic-multiply',
    title: 'Basic Multiplication',
    section: 'A.3',
    category: 'arithmetic',
    level: 'elementary',
    icon: '✖️',
    description: 'Multiply single and multi-digit numbers. The heart of Number Sense!',
    lesson: `
      <p>You <strong>must</strong> know your times tables (1–12) instantly. Beyond that, here are the core strategies:</p>
      <p><strong>1. Multiplying by Multiples of 10/100</strong> — Multiply the non-zero parts, then add the zeros.</p>
      <div class="formula-block">600 × 41 → 6 × 41 = 246, attach two zeros → 24,600</div>
      <p><strong>2. Break-Apart Method</strong> — Split one number into easier parts.</p>
      <div class="formula-block">7 × 12 → 7×10 + 7×2 = 70 + 14 = 84</div>
      <p><strong>3. Two-Digit × One-Digit</strong> — This is the most common basic computation.</p>
      <div class="formula-block">2025 × 3 → 2000×3 + 25×3 = 6000 + 75 = 6075</div>
      <p><strong>4. Two-Digit × Two-Digit (FOIL/LIOF)</strong> — Work from <span class="hl">right to left</span>: last digits, then cross-multiply, then first digits.</p>
      <div class="formula-block">22 × 71 → Units: 2×1=2, Tens: 2×7+2×1=16, Hundreds: 2×7+1= 15 → 1562</div>
      <ul>
        <li>Practice your times tables until they're <strong>automatic</strong></li>
        <li>The first 30–40 problems on any NS test are multiplication-heavy</li>
      </ul>
    `,
    examples: [
      { problem: '7 × 12', steps: ['7×10 = 70', '7×2 = 14', '70+14 = 84'], answer: '84' },
      { problem: '600 × 41', steps: ['6×41 = 246', 'Attach zeros: 24600'], answer: '24600' },
      { problem: '2025 × 3', steps: ['2000×3 = 6000', '25×3 = 75', '6000+75 = 6075'], answer: '6075' },
      { problem: '22 × 71', steps: ['Units: 2×1 = 2', 'Tens: 2×7 + 2×1 = 16 → write 6 carry 1', 'Hundreds: 2×7 + 1 = 15', 'Answer: 1562'], answer: '1562' },
    ],
    practiceGenerator(level) {
      const diff = LEVEL_ORD[level] || 0;
      if (diff === 0) {
        const type = randInt(0, 2);
        if (type === 0) { // single × single/double
          const a = randInt(2, 12), b = randInt(2, 99);
          return { question: `${a} × ${b}`, answer: a * b };
        } else if (type === 1) { // multiples of 10/100
          const a = pick([10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 600]);
          const b = randInt(2, 99);
          return { question: `${a} × ${b}`, answer: a * b };
        } else { // 3-4 digit × 1 digit
          const a = randInt(100, 2999), b = randInt(2, 9);
          return { question: `${a} × ${b}`, answer: a * b };
        }
      } else if (diff === 1) {
        const a = randInt(11, 99), b = randInt(11, 99);
        return { question: `${a} × ${b}`, answer: a * b };
      } else {
        const a = randInt(100, 999), b = randInt(11, 99);
        return { question: `${a} × ${b}`, answer: a * b };
      }
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  4. BASIC DIVISION                                          │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'basic-divide',
    title: 'Basic Division',
    section: 'A.4',
    category: 'arithmetic',
    level: 'elementary',
    icon: '➗',
    description: 'Divide numbers mentally, including as decimals and mixed numbers.',
    lesson: `
      <p>Division shows up in several forms on Number Sense:</p>
      <p><strong>1. Exact Division</strong> — When the division comes out evenly.</p>
      <div class="formula-block">224 ÷ 8 → 22÷8 = 2 R6, bring down 4 → 64÷8 = 8 → 28</div>
      <p><strong>2. Division as Decimals</strong></p>
      <div class="formula-block">15 ÷ 4 = 3.75 &nbsp;(since 15/4 = 3 remainder 3, and 3/4 = 0.75)</div>
      <p><strong>3. Division as Mixed Numbers</strong> — Very common at middle/high level.</p>
      <div class="formula-block">1568 ÷ 9 = 174 R 2 → 174 2/9</div>
      <p><strong>4. Chain Division</strong> — Divide by one number, then another.</p>
      <div class="formula-block">315 ÷ 5 ÷ 7 = 63 ÷ 7 = 9</div>
      <ul>
        <li>Know your division facts for 2 through 12</li>
        <li>For dividing by 5: multiply by 2 and move decimal left one place</li>
        <li>For dividing by 4: halve the number twice</li>
      </ul>
    `,
    examples: [
      { problem: '224 ÷ 8', steps: ['8 × 28 = 224'], answer: '28' },
      { problem: '105 ÷ 15', steps: ['15 × 7 = 105'], answer: '7' },
      { problem: '315 ÷ 5 ÷ 7', steps: ['315 ÷ 5 = 63', '63 ÷ 7 = 9'], answer: '9' },
      { problem: '15 ÷ 4', steps: ['4 × 3 = 12, remainder 3', '3/4 = 0.75', 'Answer: 3.75'], answer: '3.75' },
    ],
    practiceGenerator(level) {
      const diff = LEVEL_ORD[level] || 0;
      if (diff === 0) {
        const divisor = randInt(2, 12);
        const quotient = randInt(2, 99);
        const dividend = divisor * quotient;
        return { question: `${dividend} ÷ ${divisor}`, answer: quotient };
      } else if (diff === 1) {
        const divisor = randInt(2, 15);
        const quotient = randInt(10, 999);
        const dividend = divisor * quotient;
        return { question: `${dividend} ÷ ${divisor}`, answer: quotient };
      } else {
        // Mixed number result
        const divisor = pick([3, 4, 7, 8, 9, 11, 13]);
        const whole = randInt(10, 200);
        const rem = randInt(1, divisor - 1);
        const dividend = whole * divisor + rem;
        const g = gcd(rem, divisor);
        return { question: `${dividend} ÷ ${divisor} (mixed number)`, answer: `${whole} ${rem/g}/${divisor/g}` };
      }
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  5. DECIMAL ARITHMETIC                                      │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'decimals',
    title: 'Decimal Arithmetic',
    section: 'A.5',
    category: 'arithmetic',
    level: 'elementary',
    icon: '🔵',
    description: 'Add, subtract, and multiply decimals accurately in your head.',
    lesson: `
      <p>Decimal problems are common, especially in the first half of tests.</p>
      <p><strong>1. Adding/Subtracting Decimals</strong> — Line up the decimal points mentally.</p>
      <div class="formula-block">94.9 + 41.6 = 136.5 &nbsp;(90+40=130, 4.9+1.6=6.5, total=136.5)</div>
      <div class="formula-block">71.3 − 12.9 = 58.4 &nbsp;(71.3−13=58.3, +0.1=58.4)</div>
      <p><strong>2. Multiplying Decimals</strong> — Multiply as whole numbers, then place the decimal.</p>
      <div class="formula-block">0.7 × 0.6 → 7 × 6 = 42 → two decimal places → 0.42</div>
      <div class="formula-block">2.2 × 0.3 → 22 × 3 = 66 → two decimal places → 0.66</div>
      <ul>
        <li>Count total decimal places in both factors → that's how many in the answer</li>
        <li>Compensation works great: 7.2 × 25 → 7 × 25 + 0.2 × 25 = 175 + 5 = 180</li>
      </ul>
    `,
    examples: [
      { problem: '0.7 × 0.6', steps: ['7 × 6 = 42', '1+1 = 2 decimal places', 'Answer: 0.42'], answer: '0.42' },
      { problem: '94.9 + 41.6', steps: ['94 + 41 = 135', '0.9 + 0.6 = 1.5', '135 + 1.5 = 136.5'], answer: '136.5' },
      { problem: '71.3 − 12.9', steps: ['71.3 − 13.0 = 58.3', '58.3 + 0.1 = 58.4'], answer: '58.4' },
      { problem: '2.2 × 0.3', steps: ['22 × 3 = 66', '2 decimal places → 0.66'], answer: '0.66' },
    ],
    practiceGenerator(level) {
      const diff = LEVEL_ORD[level] || 0;
      const type = randInt(0, 2);
      if (type === 0) { // add
        const a = (randInt(10, 999) / 10);
        const b = (randInt(10, 999) / 10);
        const ans = Math.round((a + b) * 10) / 10;
        return { question: `${a} + ${b} (decimal)`, answer: ans };
      } else if (type === 1) { // subtract
        const a = (randInt(100, 999) / 10);
        const b = (randInt(10, Math.floor(a * 10)) / 10);
        const ans = Math.round((a - b) * 10) / 10;
        return { question: `${a} − ${b} (decimal)`, answer: ans };
      } else { // multiply
        const a = (randInt(1, 9) / 10);
        const b = (randInt(1, 9) / 10);
        const ans = Math.round(a * b * 100) / 100;
        return { question: `${a} × ${b} (decimal)`, answer: ans };
      }
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  6. ORDER OF OPERATIONS                                     │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'order-of-ops',
    title: 'Order of Operations',
    section: 'A.6',
    category: 'arithmetic',
    level: 'elementary',
    icon: '📋',
    description: 'PEMDAS — Parentheses, Exponents, Multiply/Divide, Add/Subtract.',
    lesson: `
      <p>Order of Operations problems are some of the most common traps on Number Sense. Follow <strong>PEMDAS</strong>:</p>
      <div class="formula-block">P → Parentheses first
E → Exponents next
M/D → Multiply and Divide (left to right)
A/S → Add and Subtract (left to right)</div>
      <p><strong>Key point:</strong> Multiplication and division are done <span class="hl">left to right</span>, NOT multiplication before division. Same for addition and subtraction.</p>
      <div class="formula-block">6 + 5×4 − 3×1 = 6 + 20 − 3 = 23</div>
      <div class="formula-block">12 + 4×2 − 4 = 12 + 8 − 4 = 16</div>
      <p>At the high school level, problems get more complex with nested parentheses and negative numbers:</p>
      <div class="formula-block">3 ÷ (7−12) × 3 − (−2)² = 3÷(−5)×3 − 4 = −9/5 − 4 = −5.8</div>
    `,
    examples: [
      { problem: '6 + 5×4 − 3×1', steps: ['5×4 = 20', '3×1 = 3', '6 + 20 − 3 = 23'], answer: '23' },
      { problem: '30 + 3×3', steps: ['3×3 = 9', '30+9 = 39'], answer: '39' },
      { problem: '(17−5) ÷ 3', steps: ['17−5 = 12', '12÷3 = 4'], answer: '4' },
      { problem: '14×15 ÷ 21', steps: ['14×15 = 210', '210÷21 = 10'], answer: '10' },
    ],
    practiceGenerator(level) {
      const diff = LEVEL_ORD[level] || 0;
      if (diff <= 1) {
        // a + b×c − d
        const a = randInt(1, 20), b = randInt(2, 9), c = randInt(2, 9), d = randInt(1, 10);
        const ans = a + b * c - d;
        return { question: `${a} + ${b}×${c} − ${d}`, answer: ans };
      } else {
        // (a − b) × c ÷ d
        const a = randInt(10, 30), b = randInt(1, a - 1);
        const d = pick([2, 3, 4, 5, 6]);
        const c = d * randInt(1, 5);
        const ans = (a - b) * c / d;
        return { question: `(${a} − ${b}) × ${c} ÷ ${d}`, answer: ans };
      }
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  7. ROUNDING                                                │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'rounding',
    title: 'Rounding Numbers',
    section: 'A.7',
    category: 'arithmetic',
    level: 'elementary',
    icon: '🔄',
    description: 'Round numbers to specified place values quickly and accurately.',
    lesson: `
      <p>Rounding is straightforward but easy to rush and mess up:</p>
      <p><strong>The Rule:</strong> Look at the digit <span class="hl">one place to the right</span> of where you're rounding to. If it's 5 or more, round up. Otherwise, round down.</p>
      <div class="formula-block">Round 4815 to the nearest ten → Look at ones digit (5) → round up → 4820</div>
      <div class="formula-block">Round 4815 to the nearest hundred → Look at tens digit (1) → round down → 4800</div>
      <div class="formula-block">Round 3.478 to the nearest tenth → Look at hundredths digit (7) → round up → 3.5</div>
      <ul>
        <li>Read carefully — the problem specifies <em>which</em> place to round to</li>
        <li>Rounding is also key for <strong>estimation (★) problems</strong></li>
      </ul>
    `,
    examples: [
      { problem: 'Round 4815 to nearest ten', steps: ['Ones digit = 5 → round up', '4815 → 4820'], answer: '4820' },
      { problem: 'Round 7,349 to nearest hundred', steps: ['Tens digit = 4 → round down', '7349 → 7300'], answer: '7300' },
      { problem: 'Round 6.85 to nearest tenth', steps: ['Hundredths digit = 5 → round up', '6.85 → 6.9'], answer: '6.9' },
    ],
    practiceGenerator() {
      const places = [
        { name: "ten's", pow: 10 },
        { name: "hundred's", pow: 100 },
        { name: "thousand's", pow: 1000 },
      ];
      const place = pick(places);
      const n = randInt(100, 99999);
      const rounded = Math.round(n / place.pow) * place.pow;
      return { question: `Round ${n.toLocaleString()} to the nearest ${place.name} place`, answer: rounded };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  8. PLACE VALUE                                             │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'place-value',
    title: 'Place Value & Expanded Form',
    section: 'A.8',
    category: 'arithmetic',
    level: 'elementary',
    icon: '🏛️',
    description: 'Understand expanded notation, digit sums, and place value concepts.',
    lesson: `
      <p>Place value problems test whether you understand what each digit represents:</p>
      <p><strong>1. Expanded Notation</strong> — Write a number as the sum of its place values.</p>
      <div class="formula-block">(5×1000) + (8×1) = 5000 + 8 = 5008</div>
      <div class="formula-block">(8×10²) + (6×10¹) + (2×10⁰) = 800 + 60 + 2 = 862</div>
      <p><strong>2. Digit Identification</strong> — Identify what digit is in a specific place.</p>
      <div class="formula-block">In 758.94: The hundred's digit is 7, the one's digit is 8</div>
      <p><strong>3. Writing Numbers</strong> — Convert words to digits or vice versa.</p>
      <div class="formula-block">"Two and a half million, thirty-four thousand, five hundred six" → 2,534,506</div>
    `,
    examples: [
      { problem: '(5×1000) + (8×1)', steps: ['5×1000 = 5000', '8×1 = 8', '5000 + 8 = 5008'], answer: '5008' },
      { problem: '(8×10²) + (6×10¹) + (2×10⁰)', steps: ['8×100 = 800', '6×10 = 60', '2×1 = 2', '800+60+2 = 862'], answer: '862' },
    ],
    practiceGenerator() {
      const type = randInt(0, 1);
      if (type === 0) {
        // expanded notation
        const a = randInt(1, 9), b = randInt(0, 9), c = randInt(0, 9), d = randInt(0, 9);
        const num = a * 1000 + b * 100 + c * 10 + d;
        const parts = [];
        if (a) parts.push(`(${a}×1000)`);
        if (b) parts.push(`(${b}×100)`);
        if (c) parts.push(`(${c}×10)`);
        if (d) parts.push(`(${d}×1)`);
        return { question: parts.join(' + ') + ' =', answer: num };
      } else {
        // sum of specific digits
        const num = randInt(100, 99999);
        const str = num.toString();
        const placeNames = ['one\'s', 'ten\'s', 'hundred\'s', 'thousand\'s', 'ten-thousand\'s'];
        const pos = randInt(0, str.length - 1);
        const digit = parseInt(str[str.length - 1 - pos]);
        return { question: `What is the ${placeNames[pos]} digit of ${num.toLocaleString()}?`, answer: digit };
      }
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  9. COUNTING (ODD/EVEN/MULTIPLES IN RANGE)                  │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'counting',
    title: 'Counting in a Range',
    section: 'A.9',
    category: 'arithmetic',
    level: 'elementary',
    icon: '🔍',
    description: 'Count odd/even numbers, multiples, or primes within a given range.',
    lesson: `
      <p>These problems ask "how many" of something exist in a range. Use <strong>formulas</strong>, not hand-counting!</p>
      <p><strong>1. All integers from a to b (inclusive):</strong></p>
      <div class="formula-block">Count = b − a + 1</div>
      <p><strong>2. Even or odd numbers from a to b:</strong></p>
      <div class="formula-block">Count = ⌊(b − a) / 2⌋ + 1 &nbsp;(if a and b have the same parity)
Count = ⌊(b − a + 1) / 2⌋ &nbsp;(general formula)</div>
      <p><strong>3. Multiples of k from a to b:</strong></p>
      <div class="formula-block">Count = ⌊b/k⌋ − ⌈a/k⌉ + 1</div>
      <p>Or equivalently: find the first multiple ≥ a, find the last multiple ≤ b, then (last−first)/k + 1.</p>
      <p><strong>Watch out:</strong> "Between" can mean <span class="hl">exclusive</span> (not including endpoints). Read the problem carefully!</p>
    `,
    examples: [
      { problem: 'How many odd numbers between 30 and 48?', steps: ['Odd numbers: 31,33,35,37,39,41,43,45,47', 'Count = 9', '(or: (47-31)/2 + 1 = 9)'], answer: '9' },
      { problem: 'How many even numbers between 7 and 32?', steps: ['First even > 7 is 8, last even < 32 is 30', '(30−8)/2 + 1 = 12'], answer: '12' },
      { problem: 'Multiples of 5 between 15 and 66', steps: ['First: 20, last: 65', '(65−20)/5 + 1 = 10'], answer: '10' },
    ],
    practiceGenerator(level) {
      const diff = LEVEL_ORD[level] || 0;
      if (diff <= 1) {
        const type = pick(['odd', 'even']);
        const a = randInt(1, 50), b = a + randInt(15, 40);
        let count = 0;
        for (let i = a + 1; i < b; i++) {
          if (type === 'odd' ? i % 2 !== 0 : i % 2 === 0) count++;
        }
        return { question: `How many ${type} numbers are there between ${a} and ${b}?`, answer: count };
      } else {
        const k = pick([3, 4, 5, 6, 7]);
        const a = randInt(10, 50), b = a + randInt(30, 80);
        let count = 0;
        for (let i = a; i <= b; i++) if (i % k === 0) count++;
        return { question: `How many multiples of ${k} from ${a} to ${b} (inclusive)?`, answer: count };
      }
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  10. AVERAGES                                               │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'averages',
    title: 'Averages (Mean)',
    section: 'A.10',
    category: 'arithmetic',
    level: 'elementary',
    icon: '📊',
    description: 'Calculate the average (arithmetic mean) of a set of numbers quickly.',
    lesson: `
      <p>Average = Sum ÷ Count. But on Number Sense, there are faster ways:</p>
      <p><strong>1. Standard Method:</strong></p>
      <div class="formula-block">Average = (Sum of all values) ÷ (Number of values)</div>
      <p><strong>2. Deviation Method</strong> — Pick a "base" number close to all values, find how much each deviates, average the deviations, and add to the base.</p>
      <div class="formula-block">Average of 89, 79, 99:
Pick base = 89. Deviations: 0, −10, +10
Average deviation = 0/3 = 0
Answer: 89 + 0 = 89</div>
      <div class="formula-block">Average of 48, 60, 66:
Pick base = 60. Deviations: −12, 0, +6
Sum of deviations = −6, average = −2
Answer: 60 + (−2) = 58</div>
      <ul>
        <li>The deviation method is <strong>much faster</strong> when numbers are close together</li>
        <li>For an arithmetic series, the average is just the middle term (or average of two middle terms)</li>
      </ul>
    `,
    examples: [
      { problem: 'Average of 89, 79, and 99', steps: ['Base = 89: deviations 0, −10, +10', 'Sum = 0, average deviation = 0', 'Answer: 89'], answer: '89' },
      { problem: 'Average of 48, 60, and 66', steps: ['Sum = 48+60+66 = 174', '174 ÷ 3 = 58'], answer: '58' },
    ],
    practiceGenerator(level) {
      const diff = LEVEL_ORD[level] || 0;
      const count = diff === 0 ? 3 : pick([3, 4, 5]);
      const base = randInt(20, 200);
      const nums = Array.from({ length: count }, () => base + randInt(-20, 20));
      const sum = nums.reduce((s, v) => s + v, 0);
      // Ensure clean average
      const remainder = sum % count;
      nums[0] += (count - remainder) % count;
      const newSum = nums.reduce((s, v) => s + v, 0);
      const avg = newSum / count;
      return { question: `Average of ${nums.join(', ')}`, answer: avg };
    },
  },

];

// ── Accessors ─────────────────────────────────────────────────────

export function getTopicsByLevel(level) {
  return TOPICS.filter(t => LEVEL_ORD[t.level] <= LEVEL_ORD[level]);
}

export function getTopicsByCategory(catId, level) {
  return getTopicsByLevel(level).filter(t => t.category === catId);
}

export function getTopicById(id) {
  return TOPICS.find(t => t.id === id);
}
