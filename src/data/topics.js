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
  multiplication: {
    id: 'multiplication',
    title: 'Multiplication Tricks',
    icon: '✕',
    color: '#f472b6',
    description: 'Core Number Sense tricks for fast multiplication.',
  },
  division: {
    id: 'division',
    title: 'Division & Remainders',
    icon: '➗',
    color: '#34d399',
    description: 'Shortcuts for finding quotients and remainders.',
  },
  addition: {
    id: 'addition',
    title: 'Addition & Subtraction',
    icon: '➕',
    color: '#fbbf24',
    description: 'Master fast addition, subtraction, and telescoping sums.',
  },
  memorization: {
    id: 'memorization',
    title: 'Memorization',
    icon: '🧠',
    color: '#a78bfa',
    description: 'Essential squares, cubes, powers, and constants to memorize.',
  },
  conversions: {
    id: 'conversions',
    title: 'Conversions',
    icon: '📏',
    color: '#f87171',
    description: 'Master fast unit conversions for distance, area, and volume.',
  },
  series: {
    id: 'series',
    title: 'Series & Sequences',
    icon: '📈',
    color: '#60a5fa',
    description: 'Calculate sums of arithmetic and geometric progressions.',
  },
  'number-theory': {
    id: 'number-theory',
    title: 'Number Theory',
    icon: '🔮',
    color: '#14b8a6',
    description: 'Divisors, primes, modular arithmetic, and integer properties.',
  },
  geometry: {
    id: 'geometry',
    title: 'Geometry',
    icon: '📐',
    color: '#eab308',
    description: 'Polygons, perimeter, area, volume, and properties of shapes.',
  },
  patterns: {
    id: 'patterns',
    title: 'Number Patterns',
    icon: '🧩',
    color: '#ec4899',
    description: 'Figurate numbers, triangular patterns, and sequences.',
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
      \\[ 347 + 285 \\rightarrow 300+200=500, \\quad 40+80=120, \\quad 7+5=12 \\rightarrow 500+120+12 = 632 \\]
      <p><strong>2. Compensation</strong> — Round one number to make it easy, then adjust.</p>
      \\[ 497 + 368 \\rightarrow (500 + 368) - 3 = 868 - 3 = 865 \\]
      <p><strong>3. Group Friendly Pairs</strong> — When adding a series of numbers, look for pairs that sum to a round number.</p>
      \\[ 17 + 19 + 21 + 23 \\rightarrow (17+23) + (19+21) = 40 + 40 = 80 \\]
      <ul>
        <li>Always scan for pairs that make <strong>10, 100, or 1000</strong></li>
        <li>On Number Sense, <strong>speed on addition saves time</strong> for harder problems</li>
        <li>For estimation (★) problems with large sums, round each number first</li>
      </ul>
    `,
    examples: [
      { problem: '\\( 47 + 68 \\)', steps: ['\\( 40+60 = 100 \\)', '\\( 7+8 = 15 \\)', '\\( 100+15 = 115 \\)'], answer: '115' },
      { problem: '\\( 799 + 199 \\)', steps: ['Round: \\( 800+200 = 1000 \\)', 'Subtract adjustments: \\( 1+1 = 2 \\)', '\\( 1000-2 = 998 \\)'], answer: '998' },
      { problem: '\\( 490 + 493 \\)', steps: ['\\( 490+493 \\rightarrow 500+493-10 = 993-10 \\)', 'Or: \\( 490+490+3 = 983 \\)'], answer: '983' },
      { problem: '\\( 17 + 19 + 21 + 23 \\)', steps: ['Pair: \\( 17+23=40 \\), \\( 19+21=40 \\)', '\\( 40+40 = 80 \\)'], answer: '80' },
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
      \\[ 462 - 87 \\rightarrow 462-80 = 382, \\quad 382-7 = 375 \\]
      <p><strong>2. Compensation</strong> — Round the number being subtracted.</p>
      \\[ 304 - 178 \\rightarrow 304-180 = 124, \\quad 124+2 = 126 \\]
      <p><strong>3. Negative Results</strong> — At middle/high school level, results can be negative. Watch for this!</p>
      \\[ 599 - 995 \\rightarrow -(995-599) = -396 \\]
      <p><strong>4. "Add Up" Method</strong> — Count up from the smaller number to the larger.</p>
      \\[ 1000 - 687 \\rightarrow 687+13=700, \\quad 700+300=1000 \\rightarrow 13+300 = 313 \\]
    `,
    examples: [
      { problem: '\\( 304 - 178 \\)', steps: ['\\( 304-180 = 124 \\)', '\\( 124+2 = 126 \\)'], answer: '126' },
      { problem: '\\( 462 - 87 \\)', steps: ['\\( 462-90 = 372 \\)', '\\( 372+3 = 375 \\)'], answer: '375' },
      { problem: '\\( 599 - 995 \\)', steps: ['\\( 995-599 = 396 \\)', 'Result is negative: \\( -396 \\)'], answer: '-396' },
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
      \\[ 600 \\times 41 \\rightarrow 6 \\times 41 = 246 \\quad \\text{(attach two zeros)} \\rightarrow 24,600 \\]
      <p><strong>2. Break-Apart Method</strong> — Split one number into easier parts.</p>
      \\[ 7 \\times 12 \\rightarrow 7 \\times 10 + 7 \\times 2 = 70 + 14 = 84 \\]
      <p><strong>3. Two-Digit × One-Digit</strong> — This is the most common basic computation.</p>
      \\[ 2025 \\times 3 \\rightarrow 2000 \\times 3 + 25 \\times 3 = 6000 + 75 = 6075 \\]
      <p><strong>4. Two-Digit × Two-Digit (FOIL/LIOF)</strong> — Work from <span class="hl">right to left</span>: last digits, then cross-multiply, then first digits.</p>
      \\[ 22 \\times 71 \\rightarrow \\text{Units: } 2 \\times 1=2, \\quad \\text{Tens: } 2 \\times 7+2 \\times 1=16, \\quad \\text{Hundreds: } 2 \\times 7+1=15 \\rightarrow 1562 \\]
      <ul>
        <li>Practice your times tables until they're <strong>automatic</strong></li>
        <li>The first 30–40 problems on any NS test are multiplication-heavy</li>
      </ul>
    `,
    examples: [
      { problem: '\\( 7 \\times 12 \\)', steps: ['\\( 7 \\times 10 = 70 \\)', '\\( 7 \\times 2 = 14 \\)', '\\( 70+14 = 84 \\)'], answer: '84' },
      { problem: '\\( 600 \\times 41 \\)', steps: ['\\( 6 \\times 41 = 246 \\)', 'Attach zeros: \\( 24600 \\)'], answer: '24600' },
      { problem: '\\( 2025 \\times 3 \\)', steps: ['\\( 2000 \\times 3 = 6000 \\)', '\\( 25 \\times 3 = 75 \\)', '\\( 6000+75 = 6075 \\)'], answer: '6075' },
      { problem: '\\( 22 \\times 71 \\)', steps: ['Units: \\( 2 \\times 1 = 2 \\)', 'Tens: \\( 2 \\times 7 + 2 \\times 1 = 16 \\rightarrow \\text{write 6 carry 1} \\)', 'Hundreds: \\( 2 \\times 7 + 1 = 15 \\)', 'Answer: \\( 1562 \\)'], answer: '1562' },
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
      \\[ 224 \\div 8 \\rightarrow 22 \\div 8 = 2 \\text{ R } 6, \\quad 64 \\div 8 = 8 \\rightarrow 28 \\]
      <p><strong>2. Division as Decimals</strong></p>
      \\[ 15 \\div 4 = 3.75 \\quad (\\text{since } \\frac{15}{4} = 3 \\text{ R } 3, \\text{ and } \\frac{3}{4} = 0.75) \\]
      <p><strong>3. Division as Mixed Numbers</strong> — Very common at middle/high level.</p>
      \\[ 1568 \\div 9 = 174 \\text{ R } 2 \\rightarrow 174 \\frac{2}{9} \\]
      <p><strong>4. Chain Division</strong> — Divide by one number, then another.</p>
      \\[ 315 \\div 5 \\div 7 = 63 \\div 7 = 9 \\]
      <ul>
        <li>Know your division facts for 2 through 12</li>
        <li>For dividing by 5: multiply by 2 and move decimal left one place</li>
        <li>For dividing by 4: halve the number twice</li>
      </ul>
    `,
    examples: [
      { problem: '\\( 224 \\div 8 \\)', steps: ['\\( 8 \\times 28 = 224 \\)'], answer: '28' },
      { problem: '\\( 105 \\div 15 \\)', steps: ['\\( 15 \\times 7 = 105 \\)'], answer: '7' },
      { problem: '\\( 315 \\div 5 \\div 7 \\)', steps: ['\\( 315 \\div 5 = 63 \\)', '\\( 63 \\div 7 = 9 \\)'], answer: '9' },
      { problem: '\\( 15 \\div 4 \\)', steps: ['\\( 4 \\times 3 = 12 \\), remainder 3', '\\( \\frac{3}{4} = 0.75 \\)', 'Answer: \\( 3.75 \\)'], answer: '3.75' },
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
      \\[ 94.9 + 41.6 = 136.5 \\quad (90+40=130, \\; 4.9+1.6=6.5, \\; \\text{total}=136.5) \\]
      \\[ 71.3 - 12.9 = 58.4 \\quad (71.3-13=58.3, \\; +0.1=58.4) \\]
      <p><strong>2. Multiplying Decimals</strong> — Multiply as whole numbers, then place the decimal.</p>
      \\[ 0.7 \\times 0.6 \\rightarrow 7 \\times 6 = 42 \\rightarrow \\text{two decimal places} \\rightarrow 0.42 \\]
      \\[ 2.2 \\times 0.3 \\rightarrow 22 \\times 3 = 66 \\rightarrow \\text{two decimal places} \\rightarrow 0.66 \\]
      <ul>
        <li>Count total decimal places in both factors → that's how many in the answer</li>
        <li>Compensation works great: \\( 7.2 \\times 25 \\rightarrow 7 \\times 25 + 0.2 \\times 25 = 175 + 5 = 180 \\)</li>
      </ul>
    `,
    examples: [
      { problem: '\\( 0.7 \\times 0.6 \\)', steps: ['\\( 7 \\times 6 = 42 \\)', '1+1 = 2 decimal places', 'Answer: \\( 0.42 \\)'], answer: '0.42' },
      { problem: '\\( 94.9 + 41.6 \\)', steps: ['\\( 94 + 41 = 135 \\)', '\\( 0.9 + 0.6 = 1.5 \\)', '\\( 135 + 1.5 = 136.5 \\)'], answer: '136.5' },
      { problem: '\\( 71.3 - 12.9 \\)', steps: ['\\( 71.3 - 13.0 = 58.3 \\)', '\\( 58.3 + 0.1 = 58.4 \\)'], answer: '58.4' },
      { problem: '\\( 2.2 \\times 0.3 \\)', steps: ['\\( 22 \\times 3 = 66 \\)', '2 decimal places \\(\\rightarrow 0.66\\)'], answer: '0.66' },
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
      \\[ 6 + 5 \\times 4 - 3 \\times 1 = 6 + 20 - 3 = 23 \\]
      \\[ 12 + 4 \\times 2 - 4 = 12 + 8 - 4 = 16 \\]
      <p>At the high school level, problems get more complex with nested parentheses and negative numbers:</p>
      \\[ 3 \\div (7-12) \\times 3 - (-2)^2 = 3 \\div (-5) \\times 3 - 4 = -\\frac{9}{5} - 4 = -5.8 \\]
    `,
    examples: [
      { problem: '\\( 6 + 5 \\times 4 - 3 \\times 1 \\)', steps: ['\\( 5 \\times 4 = 20 \\)', '\\( 3 \\times 1 = 3 \\)', '\\( 6 + 20 - 3 = 23 \\)'], answer: '23' },
      { problem: '\\( 30 + 3 \\times 3 \\)', steps: ['\\( 3 \\times 3 = 9 \\)', '\\( 30+9 = 39 \\)'], answer: '39' },
      { problem: '\\( (17-5) \\div 3 \\)', steps: ['\\( 17-5 = 12 \\)', '\\( 12 \\div 3 = 4 \\)'], answer: '4' },
      { problem: '\\( 14 \\times 15 \\div 21 \\)', steps: ['\\( 14 \\times 15 = 210 \\)', '\\( 210 \\div 21 = 10 \\)'], answer: '10' },
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
      \\[ \\text{Round 4815 to nearest ten} \\rightarrow \\text{Ones digit is 5} \\rightarrow \\text{round up} \\rightarrow 4820 \\]
      \\[ \\text{Round 4815 to nearest hundred} \\rightarrow \\text{Tens digit is 1} \\rightarrow \\text{round down} \\rightarrow 4800 \\]
      \\[ \\text{Round 3.478 to nearest tenth} \\rightarrow \\text{Hundredths digit is 7} \\rightarrow \\text{round up} \\rightarrow 3.5 \\]
      <ul>
        <li>Read carefully — the problem specifies <em>which</em> place to round to</li>
        <li>Rounding is also key for <strong>estimation (★) problems</strong></li>
      </ul>
    `,
    examples: [
      { problem: 'Round 4815 to nearest ten', steps: ['Ones digit = 5 \\(\\rightarrow\\) round up', '\\( 4815 \\rightarrow 4820 \\)'], answer: '4820' },
      { problem: 'Round 7,349 to nearest hundred', steps: ['Tens digit = 4 \\(\\rightarrow\\) round down', '\\( 7349 \\rightarrow 7300 \\)'], answer: '7300' },
      { problem: 'Round 6.85 to nearest tenth', steps: ['Hundredths digit = 5 \\(\\rightarrow\\) round up', '\\( 6.85 \\rightarrow 6.9 \\)'], answer: '6.9' },
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
      \\[ (5 \\times 1000) + (8 \\times 1) = 5000 + 8 = 5008 \\]
      \\[ (8 \\times 10^2) + (6 \\times 10^1) + (2 \\times 10^0) = 800 + 60 + 2 = 862 \\]
      <p><strong>2. Digit Identification</strong> — Identify what digit is in a specific place.</p>
      \\[ \\text{In 758.94: The hundred's digit is 7, the one's digit is 8} \\]
      <p><strong>3. Writing Numbers</strong> — Convert words to digits or vice versa.</p>
      \\[ \\text{"Two and a half million, thirty-four thousand, five hundred six" } \\rightarrow 2,534,506 \\]
    `,
    examples: [
      { problem: '\\( (5 \\times 1000) + (8 \\times 1) \\)', steps: ['\\( 5 \\times 1000 = 5000 \\)', '\\( 8 \\times 1 = 8 \\)', '\\( 5000 + 8 = 5008 \\)'], answer: '5008' },
      { problem: '\\( (8 \\times 10^2) + (6 \\times 10^1) + (2 \\times 10^0) \\)', steps: ['\\( 8 \\times 100 = 800 \\)', '\\( 6 \\times 10 = 60 \\)', '\\( 2 \\times 1 = 2 \\)', '\\( 800+60+2 = 862 \\)'], answer: '862' },
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
      \\[ \\text{Count } = b - a + 1 \\]
      <p><strong>2. Even or odd numbers from a to b:</strong></p>
      \\[ \\text{Count } = \\left\\lfloor \\frac{b - a}{2} \\right\\rfloor + 1 \\quad \\text{(if a and b have the same parity)} \\]
      \\[ \\text{Count } = \\left\\lfloor \\frac{b - a + 1}{2} \\right\\rfloor \\quad \\text{(general formula)} \\]
      <p><strong>3. Multiples of k from a to b:</strong></p>
      \\[ \\text{Count } = \\lfloor b/k \\rfloor - \\lceil a/k \\rceil + 1 \\]
      <p>Or equivalently: find the first multiple \\(\\ge a\\), find the last multiple \\(\\le b\\), then \\( \\frac{\\text{last} - \\text{first}}{k} + 1 \\).</p>
      <p><strong>Watch out:</strong> "Between" can mean <span class="hl">exclusive</span> (not including endpoints). Read the problem carefully!</p>
    `,
    examples: [
      { problem: 'How many odd numbers between 30 and 48?', steps: ['Odd numbers: 31,33,35,37,39,41,43,45,47', 'Count \\( = 9 \\)', '(or: \\( (47-31)/2 + 1 = 9 \\))'], answer: '9' },
      { problem: 'How many even numbers between 7 and 32?', steps: ['First even > 7 is 8, last even < 32 is 30', '\\( (30-8)/2 + 1 = 12 \\)'], answer: '12' },
      { problem: 'Multiples of 5 between 15 and 66', steps: ['First: 20, last: 65', '\\( (65-20)/5 + 1 = 10 \\)'], answer: '10' },
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
      \\[ \\text{Average} = \\frac{\\text{Sum of all values}}{\\text{Number of values}} \\]
      <p><strong>2. Deviation Method</strong> — Pick a "base" number close to all values, find how much each deviates, average the deviations, and add to the base.</p>
      \\[
      \\begin{aligned}
      &\\text{Average of 89, 79, 99:} \\\\
      &\\text{Pick base = 89. Deviations: } 0, -10, +10 \\\\
      &\\text{Average deviation: } 0 / 3 = 0 \\\\
      &\\text{Answer: } 89 + 0 = 89
      \\end{aligned}
      \\]
      \\[
      \\begin{aligned}
      &\\text{Average of 48, 60, 66:} \\\\
      &\\text{Pick base = 60. Deviations: } -12, 0, +6 \\\\
      &\\text{Sum of devs = } -6, \\quad \\text{average dev = } -2 \\\\
      &\\text{Answer: } 60 + (-2) = 58
      \\end{aligned}
      \\]
      <ul>
        <li>The deviation method is <strong>much faster</strong> when numbers are close together</li>
        <li>For an arithmetic series, the average is just the middle term (or average of two middle terms)</li>
      </ul>
    `,
    examples: [
      { problem: 'Average of 89, 79, and 99', steps: ['Base = 89: deviations \\( 0, -10, +10 \\)', '\\( \\text{Sum} = 0, \\; \\text{average deviation} = 0 \\)', 'Answer: 89'], answer: '89' },
      { problem: 'Average of 48, 60, and 66', steps: ['Sum = \\( 48+60+66 = 174 \\)', '\\( 174 \\div 3 = 58 \\)'], answer: '58' },
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

  // ┌──────────────────────────────────────────────────────────────┐
  // │  11. MULTIPLY BY 11 / 111                                   │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'multiply-11',
    title: 'Multiply by 11',
    section: 'B.1',
    category: 'multiplication',
    level: 'elementary',
    icon: '1️⃣',
    description: 'Quickly multiply any number by 11 by adding adjacent digits.',
    lesson: `
      <p>The "Multiply by 11" trick is one of the most famous Number Sense strategies.</p>
      <p><strong>To multiply a 2-digit number by 11:</strong></p>
      <div class="formula-block">1. Write the last digit.<br>2. Add the two digits together.<br>3. Write the first digit (plus any carry).</div>
      \\[ 34 \\times 11 \\rightarrow \\text{last digit 4, middle } 3+4=7, \\text{ first digit } 3 \\rightarrow 374 \\]
      \\[ 85 \\times 11 \\rightarrow \\text{last digit 5, middle } 8+5=13 \\text{ (write 3, carry 1), first digit } 8+1=9 \\rightarrow 935 \\]
      <p><strong>For longer numbers:</strong> just keep adding adjacent pairs from right to left!</p>
      \\[ 142 \\times 11 \\rightarrow 2, \\; 4+2=6, \\; 1+4=5, \\; 1 \\rightarrow 1562 \\]
    `,
    examples: [
      { problem: '\\( 34 \\times 11 \\)', steps: ['Last digit: \\( 4 \\)', 'Middle: \\( 3+4 = 7 \\)', 'First digit: \\( 3 \\)'], answer: '374' },
      { problem: '\\( 85 \\times 11 \\)', steps: ['Last digit: \\( 5 \\)', 'Middle: \\( 8+5 = 13 \\) (write 3, carry 1)', 'First digit: \\( 8+1 = 9 \\)'], answer: '935' },
    ],
    practiceGenerator(level) {
      const diff = LEVEL_ORD[level] || 0;
      let a;
      if (diff === 0) a = randInt(11, 99);
      else if (diff === 1) a = randInt(111, 999);
      else a = pick([11, 111]) === 11 ? randInt(1000, 9999) : randInt(111, 999);
      
      const multiplier = diff === 2 && Math.random() > 0.5 ? 111 : 11;
      return { question: `${a} × ${multiplier}`, answer: a * multiplier };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  12. MULTIPLY BY 25                                         │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'multiply-25',
    title: 'Multiply by 25',
    section: 'B.2',
    category: 'multiplication',
    level: 'elementary',
    icon: '🪙',
    description: 'Use the fact that 25 is 100/4 to multiply quickly.',
    lesson: `
      <p>Instead of multiplying by 25, it is much easier to divide by 4 and multiply by 100.</p>
      \\[ N \\times 25 = (N \\div 4) \\times 100 \\]
      <p><strong>Step 1:</strong> Divide the number by 4.<br>
      <strong>Step 2:</strong> Look at the remainder.<br>
      • R = 0 → end in 00<br>
      • R = 1 → end in 25<br>
      • R = 2 → end in 50<br>
      • R = 3 → end in 75</p>
      \\[ 36 \\times 25 \\rightarrow 36 \\div 4 = 9, \\text{ Remainder 0 } \\rightarrow 900 \\]
      \\[ 37 \\times 25 \\rightarrow 37 \\div 4 = 9, \\text{ Remainder 1 } \\rightarrow 925 \\]
    `,
    examples: [
      { problem: '\\( 44 \\times 25 \\)', steps: ['\\( 44 \\div 4 = 11 \\)', 'Remainder 0 \\(\\rightarrow\\) attach 00'], answer: '1100' },
      { problem: '\\( 46 \\times 25 \\)', steps: ['\\( 46 \\div 4 = 11 \\), remainder 2', 'Remainder 2 \\(\\rightarrow\\) attach 50'], answer: '1150' },
    ],
    practiceGenerator(level) {
      const diff = LEVEL_ORD[level] || 0;
      const a = diff === 0 ? randInt(12, 99) : randInt(100, 999);
      return { question: `${a} × 25`, answer: a * 25 };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  13. MULTIPLY BY 50                                         │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'multiply-50',
    title: 'Multiply by 50',
    section: 'B.3',
    category: 'multiplication',
    level: 'middle',
    icon: '🎯',
    description: 'Use the fact that 50 is 100/2 to multiply quickly.',
    lesson: `
      <p>Just like multiplying by 25, we use a fraction shortcut for 50.</p>
      \\[ N \\times 50 = (N \\div 2) \\times 100 \\]
      <p><strong>Step 1:</strong> Divide the number by 2 (cut it in half).<br>
      <strong>Step 2:</strong> Look at the remainder.<br>
      • Even (R = 0) → end in 00<br>
      • Odd (R = 1) → end in 50</p>
      \\[ 48 \\times 50 \\rightarrow \\text{Half of 48 is 24 } \\rightarrow 2400 \\]
      \\[ 49 \\times 50 \\rightarrow \\text{Half of 49 is 24.5 } \\rightarrow 2450 \\]
    `,
    examples: [
      { problem: '\\( 84 \\times 50 \\)', steps: ['\\( 84 \\div 2 = 42 \\)', 'Even \\(\\rightarrow\\) attach 00'], answer: '4200' },
      { problem: '\\( 87 \\times 50 \\)', steps: ['\\( 87 \\div 2 = 43 \\) remainder 1', 'Odd \\(\\rightarrow\\) attach 50'], answer: '4350' },
    ],
    practiceGenerator(level) {
      const a = randInt(10, 999);
      return { question: `${a} × 50`, answer: a * 50 };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  14. MULTIPLY BY 75                                         │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'multiply-75',
    title: 'Multiply by 75',
    section: 'B.4',
    category: 'multiplication',
    level: 'middle',
    icon: '💎',
    description: 'Use the fact that 75 is 3/4 of 100.',
    lesson: `
      <p>The shortcut for 75 is a two-step process:</p>
      \\[ N \\times 75 = (N \\div 4) \\times 300 \\]
      <p>Or alternatively, it is <strong>\\( (N \\times 3) \\div 4 \\times 100 \\)</strong>.</p>
      \\[ 36 \\times 75 \\rightarrow 36 \\div 4 = 9 \\rightarrow 9 \\times 3 = 27 \\rightarrow 2700 \\]
      <p>If there's a remainder when dividing by 4, multiplying that remainder by 75 gives the ending:</p>
      <p>• R = 0 → 00<br>
      • R = 1 → 75<br>
      • R = 2 → 150 (add 1 to hundreds, end in 50)<br>
      • R = 3 → 225 (add 2 to hundreds, end in 25)</p>
      \\[ 13 \\times 75 \\rightarrow 13 \\times 3 = 39. \\quad 39 \\div 4 = 9 \\text{ R } 3 \\rightarrow 975 \\]
    `,
    examples: [
      { problem: '\\( 36 \\times 75 \\)', steps: ['\\( 36 \\div 4 = 9 \\)', '\\( 9 \\times 3 = 27 \\) (hundreds)'], answer: '2700' },
      { problem: '\\( 14 \\times 75 \\)', steps: ['\\( 14 \\times 3 = 42 \\)', '\\( 42 \\div 4 = 10 \\) remainder 2', '\\( 2/4 \\) represents 50 \\(\\rightarrow 1050\\)'], answer: '1050' },
    ],
    practiceGenerator(level) {
      const a = randInt(10, 200);
      return { question: `${a} × 75`, answer: a * 75 };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  15. MULTIPLY BY 125                                        │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'multiply-125',
    title: 'Multiply by 125',
    section: 'B.5',
    category: 'multiplication',
    level: 'middle',
    icon: '🌟',
    description: 'Use the fact that 125 is 1000/8.',
    lesson: `
      <p>Just like 25 is 100/4, 125 is 1000/8. The shortcut is:</p>
      \\[ N \\times 125 = (N \\div 8) \\times 1000 \\]
      <p><strong>Step 1:</strong> Divide the number by 8.<br>
      <strong>Step 2:</strong> Look at the remainder, which tells you the last three digits.</p>
      <ul style="column-count: 2;">
        <li>R = 0 → 000</li>
        <li>R = 1 → 125</li>
        <li>R = 2 → 250</li>
        <li>R = 3 → 375</li>
        <li>R = 4 → 500</li>
        <li>R = 5 → 625</li>
        <li>R = 6 → 750</li>
        <li>R = 7 → 875</li>
      </ul>
      \\[ 24 \\times 125 \\rightarrow 24 \\div 8 = 3 \\rightarrow 3000 \\]
      \\[ 25 \\times 125 \\rightarrow 25 \\div 8 = 3 \\text{ R } 1 \\rightarrow 3125 \\]
    `,
    examples: [
      { problem: '\\( 32 \\times 125 \\)', steps: ['\\( 32 \\div 8 = 4 \\)', 'Remainder 0 \\(\\rightarrow\\) attach 000'], answer: '4000' },
      { problem: '\\( 43 \\times 125 \\)', steps: ['\\( 43 \\div 8 = 5 \\) remainder 3', 'Remainder 3 = 375', 'Answer: \\( 5375 \\)'], answer: '5375' },
    ],
    practiceGenerator(level) {
      const a = randInt(8, 200);
      return { question: `${a} × 125`, answer: a * 125 };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  16. MULTIPLY BY 101                                        │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'multiply-101',
    title: 'Multiply by 101',
    section: 'B.6',
    category: 'multiplication',
    level: 'high',
    icon: '🔮',
    description: 'Multiply quickly by 101 by writing the number twice, with an overlap if needed.',
    lesson: `
      <p>Multiplying by 101 is simple: <strong>\\( N \\times 101 = N \\times 100 + N \\)</strong>.</p>
      <p><strong>For a 2-digit number:</strong> Just write it twice!</p>
      \\[ 47 \\times 101 = 4747 \\]
      <p><strong>For a 3-digit number:</strong> Write the number, then write it again shifted by two places, and add the overlap.</p>
      \\[ 384 \\times 101 \\rightarrow 38400 + 384 = 38784 \\]
    `,
    examples: [
      { problem: '\\( 47 \\times 101 \\)', steps: ['2 digits \\(\\rightarrow\\) write twice', 'Answer: 4747'], answer: '4747' },
      { problem: '\\( 384 \\times 101 \\)', steps: ['\\( 38400 + 384 \\)', '\\( 38784 \\)'], answer: '38784' },
    ],
    practiceGenerator(level) {
      const a = randInt(10, 999);
      return { question: `${a} × 101`, answer: a * 101 };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  17. DOUBLE AND HALF                                        │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'double-half',
    title: 'Double and Half',
    section: 'B.7',
    category: 'multiplication',
    level: 'elementary',
    icon: '🌓',
    description: 'If you double one factor and halve the other, the product remains the same.',
    lesson: `
      <p>This is a powerful trick for simplifying awkward multiplications. If one number is even and the other ends in 5, you can halve the even number and double the one ending in 5 to get a power of 10!</p>
      \\[ 15 \\times 32 \\rightarrow \\text{Double 15 to get 30. Halve 32 to get 16.} \\]
      \\[ 30 \\times 16 = 480 \\]
      <p>This works for fractions too, ending in .5 or 1/2:</p>
      \\[ 4.5 \\times 18 \\rightarrow 9 \\times 9 = 81 \\]
    `,
    examples: [
      { problem: '\\( 15 \\times 32 \\)', steps: ['Double \\( 15 \\rightarrow 30 \\)', 'Halve \\( 32 \\rightarrow 16 \\)', '\\( 30 \\times 16 = 480 \\)'], answer: '480' },
      { problem: '\\( 4.5 \\times 18 \\)', steps: ['Double \\( 4.5 \\rightarrow 9 \\)', 'Halve \\( 18 \\rightarrow 9 \\)', '\\( 9 \\times 9 = 81 \\)'], answer: '81' },
      { problem: '\\( 45 \\times 42 \\)', steps: ['Double \\( 45 \\rightarrow 90 \\)', 'Halve \\( 42 \\rightarrow 21 \\)', '\\( 90 \\times 21 = 1890 \\)'], answer: '1890' },
    ],
    practiceGenerator(level) {
      const diff = LEVEL_ORD[level] || 0;
      const bHalf = randInt(6, 25);
      const b = bHalf * 2; 
      let a;
      if (diff === 0) a = pick([15, 25, 35, 45]);
      else a = pick([15, 35, 45, 55, 65, 85, 4.5, 3.5, 2.5]);
      
      return { question: `${a} × ${b}`, answer: a * b };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  18. NUMBERS NEAR 100                                       │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'near-100',
    title: 'Numbers Near 100',
    section: 'B.8',
    category: 'multiplication',
    level: 'middle',
    icon: '💯',
    description: 'Multiply two numbers close to 100 by looking at their distances from 100.',
    lesson: `
      <p><strong>Case 1: Both just below 100 (e.g., \\( 98 \\times 93 \\))</strong></p>
      <p>Find the "deficiencies" (how far below 100 they are): 2 and 7.</p>
      <ol>
        <li><strong>First two digits:</strong> Subtract either deficiency crosswise from the other number. (\\( 93 - 2 = 91 \\), or \\( 98 - 7 = 91 \\)). → <span class="hl">91</span></li>
        <li><strong>Last two digits:</strong> Multiply the deficiencies. (\\( 2 \\times 7 = 14 \\)). → <span class="hl">14</span></li>
      </ol>
      \\[ \\text{Result: } 9114 \\]
      
      <p><strong>Case 2: Both just above 100 (e.g., \\( 102 \\times 106 \\))</strong></p>
      <p>Find their "excesses": 2 and 6.</p>
      <ol>
        <li>Add excess crosswise: \\( 102 + 6 = 108 \\). → <span class="hl">108</span></li>
        <li>Multiply excesses: \\( 2 \\times 6 = 12 \\). → <span class="hl">12</span></li>
      </ol>
      \\[ \\text{Result: } 10812 \\]
    `,
    examples: [
      { problem: '\\( 96 \\times 93 \\)', steps: ['Deficiencies: 4 and 7', 'Cross-subtract: \\( 96 - 7 = 89 \\)', 'Multiply defs: \\( 4 \\times 7 = 28 \\)', 'Combine: 8928'], answer: '8928' },
      { problem: '\\( 104 \\times 107 \\)', steps: ['Excesses: 4 and 7', 'Cross-add: \\( 104 + 7 = 111 \\)', 'Multiply: \\( 4 \\times 7 = 28 \\)', 'Combine: 11128'], answer: '11128' },
    ],
    practiceGenerator(level) {
      const type = pick(['below', 'above']);
      let a, b;
      if (type === 'below') {
        a = randInt(91, 99); b = randInt(91, 99);
      } else {
        a = randInt(101, 109); b = randInt(101, 109);
      }
      return { question: `${a} × ${b}`, answer: a * b };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  19. SQUARES ENDING IN 5                                    │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'square-5',
    title: 'Squares Ending in 5',
    section: 'B.9',
    category: 'multiplication',
    level: 'elementary',
    icon: '🖐️',
    description: 'An easy trick to instantly square any number ending in 5.',
    lesson: `
      <p>When squaring a number ending in 5, the answer <strong>always ends in 25</strong>. To find the beginning of the answer, take the part before the 5 and multiply it by the next higher integer.</p>
      \\[ \\text{For } (N5)^2 \\rightarrow \\text{First part is } N \\times (N + 1), \\text{ ending is } 25 \\]
      <p><strong>Example: \\( 35^2 \\)</strong></p>
      <ol>
        <li>The part before 5 is 3.</li>
        <li>Multiply 3 by the next number (4): \\( 3 \\times 4 = 12 \\).</li>
        <li>Attach 25 to the end.</li>
      </ol>
      \\[ \\text{Result: } 1225 \\]
      <p><strong>Example: \\( 105^2 \\)</strong></p>
      <p>Before the 5 is 10. \\( 10 \\times 11 = 110 \\). Answer = 11025.</p>
    `,
    examples: [
      { problem: '\\( 65^2 \\)', steps: ['Before 5 is 6', '\\( 6 \\times 7 = 42 \\)', 'Attach 25 \\(\\rightarrow\\) 4225'], answer: '4225' },
      { problem: '\\( 115^2 \\)', steps: ['Before 5 is 11', '\\( 11 \\times 12 = 132 \\)', 'Attach 25 \\(\\rightarrow\\) 13225'], answer: '13225' },
    ],
    practiceGenerator(level) {
      const diff = LEVEL_ORD[level] || 0;
      let n;
      // Elementary: 2-digit numbers ending in 5 (15 to 95)
      if (diff === 0) n = randInt(1, 9) * 10 + 5;
      // Middle/High: 3-digit numbers ending in 5 (105 to 305)
      else n = randInt(10, 30) * 10 + 5;
      return { question: `${n}²`, answer: n * n };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  20. EQUIDISTANT (DIFFERENCE OF SQUARES)                    │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'equidistant',
    title: 'Equidistant (Diff of Squares)',
    section: 'B.10',
    category: 'multiplication',
    level: 'elementary',
    icon: '⚖️',
    description: 'Multiply two numbers that are equidistant from a round number.',
    lesson: `
      <p>This relies on the algebraic identity: <strong>\\( (x - y)(x + y) = x^2 - y^2 \\)</strong>.</p>
      <p>Instead of multiplying two awkward numbers directly, find the "middle" round number and use this trick!</p>
      \\[ 48 \\times 52 \\rightarrow \\text{Middle is 50. They are +2 and -2 away.} \\]
      \\[ (50-2)(50+2) = 50^2 - 2^2 = 2500 - 4 = 2496 \\]
      \\[ 37 \\times 43 \\rightarrow \\text{Middle is 40. They are 3 away.} \\]
      \\[ 40^2 - 3^2 = 1600 - 9 = 1591 \\]
      <p>This works very well if you have memorized your perfect squares.</p>
    `,
    examples: [
      { problem: '\\( 28 \\times 32 \\)', steps: ['Middle is 30, distance is 2', '\\( 30^2 - 2^2 = 900 - 4 \\)', '896'], answer: '896' },
      { problem: '\\( 84 \\times 76 \\)', steps: ['Middle is 80, distance is 4', '\\( 80^2 - 4^2 = 6400 - 16 \\)', '6384'], answer: '6384' },
      { problem: '\\( 19 \\times 21 \\)', steps: ['Middle is 20, distance is 1', '\\( 20^2 - 1^2 = 400 - 1 \\)', '399'], answer: '399' },
    ],
    practiceGenerator(level) {
      const diff = LEVEL_ORD[level] || 0;
      const middle = randInt(2, 9) * 10;
      const dist = randInt(1, 4);
      let a = middle - dist;
      let b = middle + dist;
      if (diff > 0 && Math.random() > 0.5) {
        // use other squares like 15*17 = 16^2 - 1^2
        const m = randInt(15, 25);
        const d = randInt(1, 3);
        a = m - d; b = m + d;
      }
      return { question: `${a} × ${b}`, answer: a * b };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  21. UNITS ADD TO 10, SAME TENS                             │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'units-10',
    title: 'Units Add to 10, Same Tens',
    section: 'B.11',
    category: 'multiplication',
    level: 'middle',
    icon: '🔟',
    description: 'Instantly multiply numbers like 83 × 87.',
    lesson: `
      <p>This is a generalization of the "Squares Ending in 5" trick!</p>
      <p>If the tens digits are the same, and the units digits add to exactly 10:</p>
      <ol>
        <li><strong>First part:</strong> Multiply the tens digit by the next higher integer (just like the ending in 5 trick).</li>
        <li><strong>Last part:</strong> Multiply the units digits together. (Must take up TWO spaces).</li>
      </ol>
      \\[ \\text{For example: } 83 \\times 87 \\]
      \\[ \\text{1. Tens: } 8. \\quad 8 \\times 9 = 72. \\qquad \\text{2. Units: } 3 \\times 7 = 21. \\rightarrow 7221 \\]
      \\[ \\text{For example: } 41 \\times 49 \\]
      \\[ \\text{1. Tens: } 4 \\times 5 = 20. \\qquad \\text{2. Units: } 1 \\times 9 = 09 \\text{ (must be 2 digits!). } \\rightarrow 2009 \\]
    `,
    examples: [
      { problem: '\\( 74 \\times 76 \\)', steps: ['Tens match (7), units sum to 10 (4+6)', '\\( 7 \\times 8 = 56 \\)', '\\( 4 \\times 6 = 24 \\)', 'Attach: 5624'], answer: '5624' },
      { problem: '\\( 112 \\times 118 \\)', steps: ['"Tens" match (11). \\( 11 \\times 12 = 132 \\)', '\\( 2 \\times 8 = 16 \\)', '13216'], answer: '13216' },
      { problem: '\\( 31 \\times 39 \\)', steps: ['\\( 3 \\times 4 = 12 \\)', '\\( 1 \\times 9 = 09 \\) (Careful with the zero!)', '1209'], answer: '1209' },
    ],
    practiceGenerator(level) {
      let t;
      if (LEVEL_ORD[level] === 2 && Math.random() > 0.5) t = randInt(10, 15);
      else t = randInt(2, 9);
      const u = randInt(1, 9);
      const a = t * 10 + u;
      const b = t * 10 + (10 - u);
      return { question: `${a} × ${b}`, answer: a * b };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  22. FOILing / LIOFing                                      │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'foiling',
    title: 'FOILing (General 2x2)',
    section: 'B.12',
    category: 'multiplication',
    level: 'elementary',
    icon: '⚔️',
    description: 'Mental cross-multiplication for any 2-digit numbers.',
    lesson: `
      <p>When no special trick applies, you must use mental cross-multiplication, working from <span class="hl">right to left</span>. Some call it LIOF (Last, Inner/Outer, First).</p>
      \\[ N = AB \\times CD \\]
      <ol>
        <li><strong>Last (Units):</strong> \\( B \\times D \\). Write the unit, carry the ten.</li>
        <li><strong>Inner/Outer (Cross):</strong> \\( (A \\times D) + (B \\times C) \\) + carry. Write the unit, carry the ten.</li>
        <li><strong>First (Tens):</strong> \\( A \\times C \\) + carry. Write it down.</li>
      </ol>
      <p><strong>Example: \\( 23 \\times 41 \\)</strong></p>
      <ul>
        <li>Last: \\( 3 \\times 1 = \\mathbf{3} \\) (No carry)</li>
        <li>Cross: \\( (2 \\times 1) + (3 \\times 4) = 2 + 12 = 14 \\). Write <strong>4</strong>, carry 1. (We have 43 so far).</li>
        <li>First: \\( (2 \\times 4) + 1 \\text{ (carry)} = \\mathbf{9} \\).</li>
      </ul>
      \\[ \\text{Result: } 943 \\]
    `,
    examples: [
      { problem: '\\( 52 \\times 34 \\)', steps: ['L: \\( 2 \\times 4 = 8 \\)', 'O/I: \\( (5 \\times 4)+(2 \\times 3)=20+6=26 \\). Write 6, carry 2', 'F: \\( (5 \\times 3)+2=17 \\)', 'Answer: 1768'], answer: '1768' },
    ],
    practiceGenerator(level) {
      const a = randInt(12, 99);
      const b = randInt(12, 99);
      return { question: `${a} × ${b}`, answer: a * b };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  23. MULTIPLYING MIXED NUMBERS                              │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'mixed-numbers',
    title: 'Multiplying Mixed',
    section: 'B.13',
    category: 'multiplication',
    level: 'middle',
    icon: '🥧',
    description: 'Quickly multiply mixed fractions that have the same whole number and fractions adding to 1.',
    lesson: `
      <p>This is EXACTLY the same trick as "Units Add to 10, Same Tens", applied to fractions!</p>
      <p>If you have the same whole number, and the fractions add up to exactly 1:</p>
      <ol>
        <li><strong>Whole number part:</strong> Multiply the whole number by the next integer up.</li>
        <li><strong>Fraction part:</strong> Multiply the two fractions together.</li>
      </ol>
      \\[ 4 \\frac{1}{2} \\times 4 \\frac{1}{2} \\rightarrow \\text{Wholes match (4), fractions sum to 1.} \\]
      \\[ 1. \\; 4 \\times 5 = 20. \\qquad 2. \\; \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}. \\rightarrow 20 \\frac{1}{4} \\]
      \\[ 7 \\frac{1}{3} \\times 7 \\frac{2}{3} \\rightarrow \\text{Wholes are 7.} \\]
      \\[ 1. \\; 7 \\times 8 = 56. \\qquad 2. \\; \\frac{1}{3} \\times \\frac{2}{3} = \\frac{2}{9}. \\rightarrow 56 \\frac{2}{9} \\]
    `,
    examples: [
      { problem: '\\( 7 \\frac{1}{4} \\times 7 \\frac{3}{4} \\)', steps: ['Fractions add to 1. Whole numbers match.', '\\( 7 \\times 8 = 56 \\)', '\\( \\frac{1}{4} \\times \\frac{3}{4} = \\frac{3}{16} \\)', '\\( 56 \\frac{3}{16} \\)'], answer: '56 3/16' },
      { problem: '\\( 5 \\frac{1}{5} \\times 5 \\frac{4}{5} \\)', steps: ['\\( 5 \\times 6 = 30 \\)', '\\( \\frac{1}{5} \\times \\frac{4}{5} = \\frac{4}{25} \\)', '\\( 30 \\frac{4}{25} \\)'], answer: '30 4/25' },
    ],
    practiceGenerator(level) {
      const w = randInt(2, 9);
      const denom = pick([3, 4, 5, 7, 8]);
      const num = randInt(1, denom - 1);
      
      const a = `${w} ${num}/${denom}`;
      const b = `${w} ${denom - num}/${denom}`;
      
      const numProd = num * (denom - num);
      const denProd = denom * denom;
      const g = gcd(numProd, denProd);
      
      const fw = w * (w + 1);
      
      return { question: `${a} × ${b} (mixed #)`, answer: `${fw} ${numProd/g}/${denProd/g}` };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  24. FACTORING TO SIMPLIFY                                  │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'factor-simplify',
    title: 'Factoring Algebraically',
    section: 'B.14',
    category: 'multiplication',
    level: 'middle',
    icon: '🧩',
    description: 'Use the distributive property to factor out a common term and simplify sums of products.',
    lesson: `
      <p>Using the distributive property backwards makes ugly problems beautiful: <strong>\\( ab + ac = a(b + c) \\)</strong></p>
      <p>When you see the same number in two different multiplications added together, factor it out!</p>
      \\[ 58 \\times 39 + 58 \\times 61 \\]
      <p>Factor out 58:</p>
      \\[ = 58 \\times (39 + 61) = 58 \\times 100 = 5800 \\]
      <p>This trick is extremely common on modern UIL tests. Always scan for a common term before blindly multiplying.</p>
    `,
    examples: [
      { problem: '\\( 14 \\times 17 + 14 \\times 83 \\)', steps: ['Factor out 14', '\\( 14 \\times (17 + 83) \\)', '\\( 14 \\times 100 = 1400 \\)'], answer: '1400' },
      { problem: '\\( 47 \\times 81 - 47 \\times 71 \\)', steps: ['Factor out 47', '\\( 47 \\times (81 - 71) = 47 \\times 10 \\)', '470'], answer: '470' },
    ],
    practiceGenerator(level) {
      const a = randInt(12, 99);
      const targetSum = pick([10, 100]);
      const b = randInt(1, targetSum - 1);
      const c = targetSum - b;
      
      const sign = pick(['+', '-']);
      if (sign === '+') {
        return { question: `${a} × ${b} + ${a} × ${c}`, answer: a * targetSum };
      } else {
        const diffTarget = pick([10, 100]);
        const x = randInt(diffTarget + 1, diffTarget + 50);
        const y = x - diffTarget;
        return { question: `${a} × ${x} − ${a} × ${y}`, answer: a * diffTarget };
      }
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  25. SQUARING NUMBERS (GENERAL)                             │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'squaring-general',
    title: 'Squaring General',
    section: 'B.15',
    category: 'multiplication',
    level: 'elementary',
    icon: '📐',
    description: "How to square any 2-digit number when it doesn't end in 5.",
    lesson: `
      <p>To square any general 2-digit number <strong>ab</strong>, you can use the algebraic formula: <strong>\\( (A+B)^2 = A^2 + 2AB + B^2 \\)</strong>.</p>
      <p>Mentally, we do this right-to-left.</p>
      <ol>
        <li>Square the units digit. (Write unit, carry ten).</li>
        <li>Multiply the two digits together, and DOUBLE it. (Add carry, write unit, carry ten).</li>
        <li>Square the tens digit, add carry.</li>
      </ol>
      \\[ 47^2 \\]
      \\[ 1. \\; 7^2 = 49 \\text{ (Write 9, carry 4)} \\]
      \\[ 2. \\; 4 \\times 7 \\times 2 = 56. \\quad 56 + 4 = 60 \\text{ (Write 0, carry 6)} \\]
      \\[ 3. \\; 4^2 = 16. \\quad 16 + 6 = 22 \\]
      \\[ \\text{Answer: } 2209 \\]
    `,
    examples: [
      { problem: '\\( 31^2 \\)', steps: ['\\( 1^2 = 1 \\)', '\\( 3 \\times 1 \\times 2 = 6 \\)', '\\( 3^2 = 9 \\)', '961'], answer: '961' },
      { problem: '\\( 24^2 \\)', steps: ['\\( 4^2 = 16 \\) (write 6, carry 1)', '\\( 2 \\times 4 \\times 2 = 16 \\). \\( 16+1 = 17 \\) (write 7, carry 1)', '\\( 2^2 = 4 \\). \\( 4+1 = 5 \\)', '576'], answer: '576' },
      { problem: '\\( 82^2 \\)', steps: ['\\( 2^2 = 4 \\)', '\\( 8 \\times 2 \\times 2 = 32 \\) (write 2, carry 3)', '\\( 8^2 = 64 \\). \\( 64+3 = 67 \\)', '6724'], answer: '6724' },
    ],
    practiceGenerator(level) {
      let n;
      // Elementary: Two-digit squaring (11-49), so it's not too giant
      if (LEVEL_ORD[level] === 0) n = randInt(11, 49);
      else n = randInt(11, 99);
      // exclude ending in 5 logic since that's a previous module
      while (n % 10 === 5) n++; 
      return { question: `${n}²`, answer: n * n };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  NEW TOPICS (21, 23, 26, 27, 28)                            │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'squares-41-59',
    title: 'Squares 41-59 (Near-50)',
    section: 'B.16',
    category: 'multiplication',
    level: 'middle',
    icon: '🧮',
    description: 'Quickly compute squares between 41 and 59 by referencing 50.',
    lesson: `
      <p>For any number close to 50, you can compute its square incredibly fast by understanding its algebraic relationship to 50 and 25.</p>
      <p>If we let \\( k \\) be the difference from 50, then any number close to 50 can be expressed as \\( (50 \\pm k) \\).</p>
      \\[ (50 \\pm k)^2 = 2500 \\pm 100k + k^2 = 100(25 \\pm k) + k^2 \\]
      <p>This formula gives us an exact two-step mental math shortcut:</p>
      <ol>
        <li><strong>Last two digits:</strong> Simply square the difference \\( k \\). (Always write this as a two-digit number, e.g., if \\( k = 2 \\), write \\( 04 \\)).</li>
        <li><strong>First two digits:</strong> Add (if the original number is greater than 50) or subtract (if it is less than 50) the difference \\( k \\) from the base number <strong>25</strong>.</li>
      </ol>
    `,
    examples: [
      { problem: '\\( 53^2 \\)', steps: ['The number is \\( +3 \\) away from 50 (so \\( k = 3 \\))', 'Square the difference: \\( 3^2 = 09 \\)', 'Adjust the base: Add 3 to 25. \\( 25 + 3 = 28 \\)', 'Combine the parts: 2809'], answer: '2809' },
      { problem: '\\( 57^2 \\)', steps: ['\\( 57 \\) is \\( +7 \\) from \\( 50 \\)', 'Square the diff: \\( 7^2 = 49 \\)', 'Adjust the base: \\( 25 + 7 = 32 \\)', 'Combine: 3249'], answer: '3249' },
      { problem: '\\( 42^2 \\)', steps: ['\\( 42 \\) is \\( -8 \\) from \\( 50 \\) (Subtracting since 42 < 50)', '\\( 8^2 = 64 \\)', '\\( 25 - 8 = 17 \\)', 'Combine: 1764'], answer: '1764' },
    ],
    practiceGenerator(level) {
      const n = randInt(41, 59);
      return { question: `${n}²`, answer: n * n };
    },
  },
  {
    id: 'multiplying-reverses',
    title: 'Multiplying Reverses',
    section: 'B.17',
    category: 'multiplication',
    level: 'middle',
    icon: '🔁',
    description: 'Multiply two 2-digit numbers whose digits are the reverse of each other.',
    lesson: `
      <p>When multiplying two-digit numbers whose digits are the exact reverse of each other, like \\( 53 \\times 35 \\), you can use a formula to figure out the answer digit-by-digit.</p>
      <p>Using algebra, \\( (10a + b)(10b + a) = 100(a \\times b) + 10(a^2 + b^2) + (a \\times b) \\).</p>
      <p>This translates into a three-step mental process, working from right to left:</p>
      <ol>
        <li><strong>Ones Digit:</strong> Multiply the two digits together. Write down the units, and mentally hold any carry.</li>
        <li><strong>Tens Digit:</strong> Square both individual digits and add them together. Add your carry from the previous step. Write down the units, and mentally hold the new carry.</li>
        <li><strong>Hundreds Digit:</strong> Multiply the two digits together one more time. Add your carry from the previous step.</li>
      </ol>
    `,
    examples: [
      { problem: '\\( 53 \\times 35 \\)', steps: ['Ones Digit: \\( 3 \\times 5 = 15 \\). Write 5, carry the 1.', 'Tens Digit: \\( 3^2 + 5^2 = 9 + 25 = 34 \\). Add the carry: \\( 34 + 1 = 35 \\). Write 5, carry 3.', 'Hundreds Digit: \\( 3 \\times 5 = 15 \\). Add the carry: \\( 15 + 3 = 18 \\)', 'Result: 1855'], answer: '1855' },
      { problem: '\\( 42 \\times 24 \\)', steps: ['Ones: \\( 4 \\times 2 = 8 \\)', 'Tens: \\( 4^2 + 2^2 = 16 + 4 = 20 \\) (write 0, carry 2)', 'Hundreds: \\( 4 \\times 2 = 8 \\). Add carry: \\( 8 + 2 = 10 \\)', 'Result: 1008'], answer: '1008' }
    ],
    practiceGenerator(level) {
      const a = randInt(1, 9);
      const b = randInt(1, 9);
      const n1 = a * 10 + b;
      const n2 = b * 10 + a;
      return { question: `${n1} × ${n2}`, answer: n1 * n2 };
    },
  },
  {
    id: 'sum-consecutive-squares',
    title: 'Sum of Consecutive Squares',
    section: 'B.18',
    category: 'multiplication',
    level: 'middle',
    icon: '➕',
    description: 'Add two squares that are consecutive integers using algebra.',
    lesson: `
      <p>Finding the sum of two consecutive squares like \\( 35^2 + 36^2 \\) might seem exhausting, but we can simplify it significantly using algebra so we don't have to square both numbers.</p>
      <p>Notice that the second number is simply the first number plus one. If we expand the binomial, the entire expression simplifies:</p>
      \\[ n^2 + (n+1)^2 = n^2 + (n^2 + 2n + 1) = 2n^2 + 2n + 1 \\]
      <p>This allows us to evaluate only <strong>one</strong> square and quickly double it, which is especially useful when the smaller number ends in 5 or 0!</p>
      <ol>
        <li>Square the smaller number \\( n \\) and double it.</li>
        <li>Double the smaller number \\( n \\) and add 1.</li>
        <li>Add the two results together.</li>
      </ol>
    `,
    examples: [
      { problem: '\\( 35^2 + 36^2 \\)', steps: ['Apply formula: \\( 2(n^2) + 2n + 1 \\)', 'Square the smaller number and double: \\( 2(35^2) = 2(1225) = 2450 \\)', 'Double the smaller number and add one: \\( 2(35) + 1 = 70 + 1 = 71 \\)', 'Add parts: \\( 2450 + 71 = 2521 \\)'], answer: '2521' },
      { problem: '\\( 15^2 + 16^2 \\)', steps: ['\\( 2(15^2) = 2(225) = 450 \\)', '\\( 2(15) + 1 = 30 + 1 = 31 \\)', '\\( 450 + 31 = 481 \\)'], answer: '481' },
    ],
    practiceGenerator(level) {
      // Numbers ending in 5 or 0 between 10 and 45
      const n = randInt(2, 9) * 5;
      return { question: `${n}² + ${n+1}²`, answer: (n * n) + ((n + 1) * (n + 1)) };
    },
  },
  {
    id: 'sum-squares-factoring',
    title: 'Sum of Squares: Factoring',
    section: 'B.19',
    category: 'multiplication',
    level: 'middle',
    icon: '🧩',
    description: 'Simplify complex square expressions by treating them as expanded binomials.',
    lesson: `
      <p>Usually on the 3rd or 4th column of a UIL test, you'll see a complex combination of squares, such as \\( (30^2 - 2^2) + (30+2)^2 \\).</p>
      <p>Instead of manually evaluating \\( 32^2 \\) and \\( 30^2 - 4 \\), expand the expressions algebraically and watch the complex terms completely cancel out into something much simpler:</p>
      \\[ (a^2 - b^2) + (a + b)^2 \\]
      \\[ = a^2 - b^2 + (a^2 + 2ab + b^2) \\]
      \\[ = 2a^2 + 2ab \\]
      <p>This transforms a difficult mental problem into two simple multiplication steps.</p>
    `,
    examples: [
      { problem: '\\( (30^2 - 2^2) + (30 + 2)^2 \\)', steps: ['Recognize difference of squares and perfect square binomial logic: \\( 2a^2 + 2ab \\)', 'Here, \\( a=30, b=2 \\)', 'Evaluate \\( 2a^2 \\): \\( 2(30^2) = 2(900) = 1800 \\)', 'Evaluate \\( 2ab \\): \\( 2(30)(2) = 120 \\)', 'Add them up: \\( 1800 + 120 = 1920 \\)'], answer: '1920' },
      { problem: '\\( (40 + 3)^2 + (40^2 - 3^2) \\)', steps: ['Notice the commutative property doesn\'t change the formula: \\( 2a^2 + 2ab \\)', '\\( 2(40^2) = 3200 \\)', '\\( 2(40)(3) = 240 \\)', '\\( 3200 + 240 = 3440 \\)'], answer: '3440' },
    ],
    practiceGenerator(level) {
      const a = pick([10, 20, 30, 40, 50]);
      const b = randInt(1, 4);
      return { question: `(${a} + ${b})² + (${a}² - ${b}²)`, answer: 2 * a * a + 2 * a * b };
    },
  },
  {
    id: 'sum-squares-special',
    title: 'Sum of Squares: Special',
    section: 'B.20',
    category: 'multiplication',
    level: 'middle',
    icon: '🌟',
    description: 'A special pattern when a sum of squares multiplies by 101.',
    lesson: `
      <p>There is a special case for the sum of squares that appears repeatedly on tests. It looks incredibly difficult (like evaluating \\( 72^2+13^2 \\) mentally), but actually collapses into a single multiplication trick!</p>
      <p>In order to apply the trick to \\( AB^2 + CD^2 \\), these exact conditions must be met:</p>
      <ul>
        <li>The unit's digit of the first number is <strong>one greater</strong> than the ten's digit of the second number (\\( B = C + 1 \\)).</li>
        <li>The ten's digit of the first number plus the zero's digit of the second number <strong>adds up to 10</strong> (\\( A + D = 10 \\)).</li>
      </ul>
      <p>If these conditions are met, the answer is remarkably simple: Just <strong>sum the squares of the digits of the first number, and multiply by 101</strong>.</p>
    `,
    examples: [
      { problem: '\\( 72^2 + 13^2 \\)', steps: ['Check rules: 2 is one greater than 1. And 7+3=10.', 'Formula: Sum the squares of the digits of the first number and multiply by 101.', 'Sum digits squared: \\( 7^2 + 2^2 = 49 + 4 = 53 \\)', '\\( 53 \\times 101 = 5353 \\)'], answer: '5353' },
      { problem: '\\( 64^2 + 34^2 \\)', steps: ['Check rules: \\( 4 = 3 + 1 \\) and \\( 6 + 4 = 10 \\). Trick applies.', '\\( (6^2 + 4^2) \\times 101 \\)', '\\( (36 + 16) \\times 101 = 52 \\times 101 \\)', '\\( 5252 \\)'], answer: '5252' },
    ],
    practiceGenerator(level) {
      const a = randInt(1, 9);
      const b = randInt(2, 9);
      const c = b - 1;
      const d = 10 - a;
      const n1 = a * 10 + b;
      const n2 = c * 10 + d;
      return { question: `${n1}² + ${n2}²`, answer: (a * a + b * b) * 101 };
    },
  },

  {
    id: 'multiply-ending-in-5',
    title: 'Multiply 2-Digits Ending in 5',
    section: 'B.21',
    category: 'multiplication',
    level: 'middle',
    icon: '💡',
    description: 'Multiply any two numbers ending in 5 quickly.',
    lesson: `
      <p>We already know how to square numbers ending in 5, but what if they are different, like \\( 35 \\times 75 \\)? Let the tens digits be \\( a \\) and \\( b \\).</p>
      \\[ \\text{Value} = 100(a \\times b + \\frac{a+b}{2}) + 25 \\]
      <p>We handle this differently depending on if the sum of the tens digits (\\( a+b \\)) is <strong>even</strong> or <strong>odd</strong>.</p>
      <ol>
        <li><strong>If \\( a + b \\) is EVEN:</strong> The answer ends in <strong>25</strong>. To get the front digits, compute \\( a \\times b \\), then add exactly half of \\( (a+b) \\).</li>
        <li><strong>If \\( a + b \\) is ODD:</strong> The answer ends in <strong>75</strong>. Compute \\( a \\times b \\), then add the integer (rounded down) half of \\( (a+b) \\).</li>
      </ol>
    `,
    examples: [
      { problem: '\\( 35 \\times 75 \\)', steps: ['Tens digits: \\( a=3 \\) and \\( b=7 \\)', 'Check parity: \\( 3+7 = 10 \\) (EVEN). Answer will end in 25.', 'Multiply tens: \\( 3 \\times 7 = 21 \\)', 'Add exactly half the sum: \\( 21 + (10 \\div 2) = 26 \\)', 'Combine: 2625'], answer: '2625' },
      { problem: '\\( 65 \\times 35 \\)', steps: ['Tens digits: 6 and 3. Sum is 9 (ODD). Answer ends in 75.', 'Multiply tens: \\( 6 \\times 3 = 18 \\)', 'Add Integer half of sum: \\( 18 + \\text{Math.floor}(9 \\div 2) = 18 + 4 = 22 \\)', 'Combine: 2275'], answer: '2275' },
    ],
    practiceGenerator(level) {
      const a = randInt(1, 9);
      const b = randInt(1, 9);
      const n1 = a * 10 + 5;
      const n2 = b * 10 + 5;
      return { question: `${n1} × ${n2}`, answer: n1 * n2 };
    },
  },
  {
    id: 'a-times-a-over-b',
    title: 'The a × (a/b) Trick',
    section: 'B.22',
    category: 'multiplication',
    level: 'middle',
    icon: '✨',
    description: 'Multiply an integer by a fraction where the numerator matches the integer.',
    lesson: `
      <p>When multiplying an integer by a fraction where the numerator perfectly matches the integer, like \\( a \\times \\frac{a}{b} \\), there is a powerful algebraic shortcut.</p>
      <p>By breaking it down, we know \\( a \\times \\frac{a}{b} = \\frac{a^2}{b} \\). To easily turn this into a mixed number without long division, use this formula:</p>
      \\[ \\text{Whole Number Part: } a + (a - b) \\]
      \\[ \\text{Fractional Part: } \\frac{(a - b)^2}{b} \\]
    `,
    examples: [
      { problem: '\\( 11 \\times \\frac{11}{13} \\)', steps: ['Identify \\( a = 11, b = 13 \\)', 'Find the difference: \\( 11 - 13 = -2 \\)', 'Whole Number: Add difference to \\( a \\) \\( \\rightarrow 11 + (-2) = 9 \\)', 'Numerator: Square the difference \\( \\rightarrow (-2)^2 = 4 \\)', 'Combine: \\( 9 \\frac{4}{13} \\)'], answer: '9 4/13' },
      { problem: '\\( 13 \\times \\frac{13}{12} \\)', steps: ['Identify \\( a=13, b=12 \\)', 'Difference: \\( 13 - 12 = 1 \\)', 'Whole Number: \\( 13 + 1 = 14 \\)', 'Fraction: \\( \\frac{1^2}{12} = \\frac{1}{12} \\)', 'Answer: \\( 14 \\frac{1}{12} \\)'], answer: '14 1/12' },
    ],
    practiceGenerator(level) {
      const a = randInt(6, 15);
      const diff = pick([-1, -2, 1, 2]);
      const b = a - diff;
      const whole = a + diff;
      const num = diff * diff;
      let ansNum = num;
      let ansDen = b;
      const g = gcd(ansNum, ansDen);
      ansNum /= g;
      ansDen /= g;
      const frac = ansDen === 1 ? `${ansNum}` : `${ansNum}/${ansDen}`;
      const ansStr = ansNum === 0 ? `${whole}` : `${whole} ${frac}`;
      return { question: `${a} × ${a}/${b} (mixed #)`, answer: ansStr };
    },
  },
  {
    id: 'combination-of-tricks',
    title: 'Combination of Tricks',
    section: 'B.23',
    category: 'multiplication',
    level: 'middle',
    icon: '🎆',
    description: 'Apply multiple Number Sense tricks in one problem.',
    lesson: `
      <p>In highly competitive testing formats, you will rarely see isolated tricks. Often, questions will require you to combine multiple Number Sense shortcuts creatively to avoid long computation.</p>
      <p>For example, you might be asked to evaluate an expression like \\( 11 \\times 14 \\times 25 \\).</p>
      <p>Instead of mindlessly calculating left-to-right (which gives \\( 154 \\times 25 \\) and is very difficult), quickly scan the associative pairings for known tricks.</p>
      <p>Always pair up expressions to make the numbers fall into your existing mental toolboxes!</p>
    `,
    examples: [
      { problem: '\\( 11 \\times 14 \\times 25 \\)', steps: ['Pair the 25: \\( 14 \\times 25 \\) is the "Multiply by 25" trick: \\( 14 \\div 4 \\times 100 = 350 \\)', 'Pair the 11: \\( 350 \\times 11 \\) is the "Multiply by 11" trick: \\( 3(3+5)50 = 3850 \\)', 'Answer: 3850'], answer: '3850' },
      { problem: '\\( 18 \\times 25 \\times 11 \\)', steps: ['Multiply by 25 trick: \\( 18 \\div 4 \\times 100 = 4.5 \\times 100 = 450 \\)', 'Multiply by 11 trick: \\( 450 \\times 11 = 4950 \\)'], answer: '4950' },
    ],
    practiceGenerator(level) {
      const a = randInt(12, 40);
      return { question: `${a} × 25 × 11`, answer: a * 25 * 11 };
    },
  },
  {
    id: 'remainder-divide-4-8',
    title: 'Remainders by 4 and 8',
    section: 'C.1',
    category: 'division',
    level: 'middle',
    icon: '➗',
    description: 'Find remainders when dividing by powers of 2 (4, 8, 16).',
    lesson: `
      <p>Divisibility rules are the backbone of remainder questions. For powers of 2 (like 4, 8, and 16), the rule directly dictates how many ending digits you need to inspect.</p>
      <ul>
        <li><strong>Dividing by 4:</strong> You only need to calculate the remainder of the <strong>last 2 digits</strong>. The hundreds, thousands, etc., are all perfectly divisible by 4 (since 100 is divisible by 4).</li>
        <li><strong>Dividing by 8:</strong> You only need to calculate the remainder of the <strong>last 3 digits</strong> (since 1000 is divisible by 8).</li>
      </ul>
      <p>To compute the remainder for 8 quickly, you can subtract out large known multiples of 8 from those 3 digits (like 800, 400, or 80) until you hit a small number.</p>
    `,
    examples: [
      { problem: 'Remainder of \\( 135702 \\div 8 \\)', steps: ['Focus ONLY on the last 3 digits: \\( 702 \\)', 'Subtract known multiples of 8: \\( 702 - 640 = 62 \\)', 'Find closest multiple of 8 to 62: \\( 8 \\times 7 = 56 \\)', 'Subtract: \\( 62 - 56 = 6 \\). Answer: 6'], answer: '6' },
      { problem: 'Remainder of \\( 458321 \\div 4 \\)', steps: ['For dividing by 4, check only the last 2 digits: 21', 'Divide: \\( 21 \\div 4 = 5 \\text{ with Remainder } 1 \\)', 'Answer: 1'], answer: '1' },
    ],
    practiceGenerator(level) {
      const p = pick([4, 8]);
      const n = randInt(10000, 99999);
      return { question: `Rem of ${n} ÷ ${p}`, answer: n % p };
    },
  },
  {
    id: 'remainder-divide-3-9',
    title: 'Remainders by 3 and 9',
    section: 'C.2',
    category: 'division',
    level: 'middle',
    icon: '🔢',
    description: 'Find remainders when dividing by 3 or 9 using the sum of digits.',
    lesson: `
      <p>The rules for divisibility by 3 and 9 are famously based on the <strong>Sum of Digits</strong>.</p>
      <p>The remainder of ANY large number divided by 3 (or 9) is mathematically identical to the remainder of its sum of digits divided by 3 (or 9). If the sum is still too large, you can sum the digits again recursively!</p>
      <p><strong>Pro-Tip (Casting out 9s):</strong> To speed this up, completely ignore (cross out) any 9s or any group of digits that sum to 9 (e.g., 4+5, 2+7) before you even begin summing. This drastically reduces the addition required.</p>
    `,
    examples: [
      { problem: 'Remainder of \\( 4837 \\div 9 \\)', steps: ['Sum the digits: \\( 4 + 8 + 3 + 7 = 22 \\)', 'Sum again: \\( 2 + 2 = 4 \\)', 'The original remainder is 4!'], answer: '4' },
      { problem: 'Remainder of \\( 12345 \\div 9 \\)', steps: ['Casting out 9s: Drop the 4 and 5 because they sum to 9.', 'Sum remaining digits: \\( 1+2+3 = 6 \\)', 'Answer: 6'], answer: '6' },
    ],
    practiceGenerator(level) {
      const p = pick([3, 9]);
      const n = randInt(10000, 999999);
      return { question: `Rem of ${n} ÷ ${p}`, answer: n % p };
    },
  },
  {
    id: 'remainder-divide-11',
    title: 'Remainders by 11',
    section: 'C.3',
    category: 'division',
    level: 'middle',
    icon: '⚖️',
    description: 'Find the remainder when dividing by 11 using alternating sums.',
    lesson: `
      <p>The remainder when dividing by 11 can be found by taking the alternating sum of the digits from right-to-left (adding the units, subtracting the tens, adding the hundreds, etc.).</p>
      <ul>
        <li>If the alternating sum is positive, that is your remainder.</li>
        <li>If the alternating sum is negative, keep adding 11 until it is a positive integer between 0 and 10.</li>
      </ul>
    `,
    examples: [
      { problem: '\\( 83742 \\div 11 \\)', steps: ['Alternating sum from right-to-left: \\( 2 - 4 + 7 - 3 + 8 = 10 \\)', 'The sum is 10, which is already positive.', 'Answer: 10'], answer: '10' },
      { problem: '\\( 6284 \\div 11 \\)', steps: ['Alternating sum (right-to-left): \\( 4 - 8 + 2 - 6 = -8 \\)', 'Add 11 because it is negative: \\( -8 + 11 = 3 \\)', 'Answer: 3'], answer: '3' },
    ],
    practiceGenerator(level) {
      const n = randInt(10000, 99999);
      return { question: `Rem of ${n} ÷ 11`, answer: n % 11 };
    },
  },
  {
    id: 'remainder-other-integers',
    title: 'Remainders for Other Integers',
    section: 'C.4',
    category: 'division',
    level: 'middle',
    icon: '🔀',
    description: 'Find remainders of composite numbers by breaking them into smaller factors.',
    lesson: `
      <p>When finding a remainder for a composite number (like 12 or 15), look for massive chunks to instantly subtract from the original number.</p>
      <p>For example, if you are finding the remainder of \\( 45012 \\div 15 \\):</p>
      <ul>
         <li>You know \\( 45 \\) is a multiple of \\( 15 \\), so \\( 45000 \\) is a massive chunk perfectly divisible by 15.</li>
         <li>Drop \\( 45000 \\) completely. You are just left evaluating \\( 12 \\div 15 \\).</li>
      </ul>
      <p>Since 12 is already less than 15, the remainder is trivially 12. Always "prune" out large obvious chunks from the front to make the problem tiny!</p>
    `,
    examples: [
      { problem: '\\( 12345 \\div 12 \\)', steps: ['Strip off large known multiples: 12000 is obviously a multiple of 12.', 'Explore the remaining 345.', 'Find closest multiple: \\( 12 \\times 30 = 360 \\)', '\\( 345 - 360 = -15 \\)', '\\( -15 + 24 = 9 \\)'], answer: '9' },
      { problem: '\\( 45012 \\div 15 \\)', steps: ['Strip off large known multiples: 45000 is exactly divisible by 15 \\( (15 \\times 3000) \\)', 'The only remaining portion is 12.', 'Since 12 is less than 15, the remainder is trivially 12.'], answer: '12' },
    ],
    practiceGenerator(level) {
      const p = pick([6, 12, 15, 14]);
      const n = randInt(10000, 99999);
      return { question: `Rem of ${n} ÷ ${p}`, answer: n % p };
    },
  },
  {
    id: 'remainders-expressions',
    title: 'Remainders of Expressions',
    section: 'C.5',
    category: 'division',
    level: 'middle',
    icon: '🧪',
    description: 'Find remainders of large algebraic expressions using modular arithmetic.',
    lesson: `
      <p>Using the principle of modular arithmetic: <strong>The remainder of an expression is the expression of the remainders.</strong></p>
      <p>Instead of calculating a massive number like \\( 14 \\times 15 + 16 \\) and then dividing, you can replace every single term inside the expression with its remainder modulo the divisor.</p>
      <p>Simply evaluate the remainders first, substitute them in, and calculate the final small expression for your answer.</p>
    `,
    examples: [
      { problem: 'Rem of \\( (14 \\times 15 + 16) \\div 13 \\)', steps: ['Find individual remainders modulo 13:', '\\( 14 \\div 13 \\rightarrow 1 \\)', '\\( 15 \\div 13 \\rightarrow 2 \\)', '\\( 16 \\div 13 \\rightarrow 3 \\)', 'Substitute into expression: \\( 1 \\times 2 + 3 = 5 \\)'], answer: '5' },
      { problem: 'Rem of \\( (10^3 + 12) \\div 9 \\)', steps: ['Find individual remainders modulo 9:', '\\( 10 \\div 9 \\rightarrow 1 \\)', '\\( 12 \\div 9 \\rightarrow 3 \\)', 'Substitute into expression: \\( 1^3 + 3 = 4 \\)'], answer: '4' },
    ],
    practiceGenerator(level) {
      const base = randInt(10, 20);
      const m = base - 2;
      const add = randInt(2, 10);
      return { question: `Rem of (${base}×${base+1} + ${add}) ÷ ${m}`, answer: ( (base%m) * ((base+1)%m) + (add%m) ) % m };
    },
  },
  {
    id: 'division-by-9',
    title: 'Dividing by 9 Trick',
    section: 'C.6',
    category: 'division',
    level: 'middle',
    icon: '🔮',
    description: 'Divide any number by 9 and get the answer as a mixed fraction immediately.',
    lesson: `
      <p>When dividing a 3-digit number (like \\( abc \\div 9 \\)), you can build the answer directly from left to right without doing long division:</p>
      <ul>
        <li>The first digit of the answer is just the first digit \\( a \\).</li>
        <li>The second digit of the answer is \\( a + b \\).</li>
        <li>The remainder for the fraction at the end is \\( (a+b) + c \\)!</li>
      </ul>
      <p>If any sum happens to go over 9, just "carry" the 1 over to the previous digit.</p>
    `,
    examples: [
      { problem: '\\( 123 \\div 9 \\)', steps: ['First digit of Quotient: \\( 1 \\)', 'Second digit: \\( 1 + 2 = 3 \\)', 'Remainder is the final sum: \\( 3 + 3 = 6 \\)', 'Construct fraction: \\( 13 \\frac{6}{9} = 13 \\frac{2}{3} \\)'], answer: '13 2/3' },
      { problem: '\\( 214 \\div 9 \\)', steps: ['Quotient tens place: \\( 2 \\)', 'Quotient ones place: \\( 2+1 = 3 \\) (Quotient is 23)', 'Remainder: \\( 3+4 = 7 \\)', 'Combine: \\( 23 \\frac{7}{9} \\)'], answer: '23 7/9' },
    ],
    practiceGenerator(level) {
      const a = randInt(1, 3);
      const b = randInt(1, 3);
      const c = randInt(1, 2);
      const n = a * 100 + b * 10 + c;
      const whole = Math.floor(n / 9);
      const rem = n % 9;
      const g = gcd(rem, 9);
      const frac = rem === 0 ? '' : (rem/g === 0 ? '' : ` ${rem/g}/${9/g}`);
      return { question: `${n} ÷ 9 (mixed #)`, answer: `${whole}${frac}`.trim() };
    },
  },
  {
    id: 'fractions-40-80',
    title: 'Fractions /40 and /80',
    section: 'C.7',
    category: 'division',
    level: 'middle',
    icon: '🧮',
    description: 'Quickly convert fractions with denominators 40 and 80 to decimals.',
    lesson: `
      <p>Converting denominators like 40 or 80 into standard decimals is super fast when you relate them to fractions out of 1000 or 10000.</p>
      <ul>
        <li><strong>For \\( \\frac{x}{40} \\):</strong> Multiply the top number by <strong>25</strong>, and then insert a decimal point exactly 3 spaces from the right. (This works because \\( \\frac{1}{40} = 0.025 \\)).</li>
        <li><strong>For \\( \\frac{x}{80} \\):</strong> Multiply the top number by <strong>125</strong>, and insert a decimal point exactly 4 spaces from the right. (This works because \\( \\frac{1}{80} = 0.0125 \\)).</li>
      </ul>
    `,
    examples: [
      { problem: '\\( \\frac{3}{40} \\)', steps: ['Base is 40, so multiply numerator by 25.', '\\( 3 \\times 25 = 75 \\)', 'Since it\'s base 40, move decimal left 3 places:', 'Answer: 0.075'], answer: '.075' },
      { problem: '\\( \\frac{5}{80} \\)', steps: ['Base is 80, so multiply numerator by 125.', '\\( 5 \\times 125 = 625 \\)', 'Since it\'s base 80, move decimal left 4 places:', 'Answer: 0.0625'], answer: '.0625' },
      { problem: '\\( \\frac{7}{40} \\)', steps: ['\\( 7 \\times 25 = 175 \\)', 'Move decimal: 0.175'], answer: '.175' },
    ],
    practiceGenerator(level) {
      const den = pick([40, 80]);
      const num = randInt(1, 9);
      return { question: `${num}/${den} (dec)`, answer: (num / den).toString().replace(/^0\\./, '.') };
    },
  },
  {
    id: 'subtracting-reverses',
    title: 'Subtracting Reverses',
    section: 'D.1',
    category: 'addition',
    level: 'middle',
    icon: '🔁',
    description: 'Quickly find the difference between two reversed two-digit numbers.',
    lesson: `
      <p>When subtracting a two-digit number from its reverse (e.g., \\( 82 - 28 \\)), the answer is always a multiple of 9.</p>
      <ul>
        <li>Find the positive difference between the two individual digits.</li>
        <li>Multiply that difference by <strong>9</strong>.</li>
      </ul>
      <p>If the smaller number is first, the process is exactly the same, but the answer will be negative!</p>
    `,
    examples: [
      { problem: '\\( 82 - 28 \\)', steps: ['Digits are 8 and 2. Difference: \\( 8 - 2 = 6 \\)', 'Multiply difference by 9: \\( 6 \\times 9 = 54 \\)'], answer: '54' },
      { problem: '\\( 37 - 73 \\)', steps: ['Digits are 7 and 3. Difference is 4.', 'Multiply by 9: \\( 4 \\times 9 = 36 \\)', 'Since \\( 37 < 73 \\), the answer is negative: -36'], answer: '-36' },
    ],
    practiceGenerator(level) {
      const a = randInt(2, 9);
      const b = randInt(1, a - 1);
      let n1, n2;
      if (Math.random() < 0.5) { n1 = a * 10 + b; n2 = b * 10 + a; }
      else { n1 = b * 10 + a; n2 = a * 10 + b; }
      return { question: `${n1} - ${n2}`, answer: n1 - n2 };
    },
  },
  {
    id: 'switch-negate-subtraction',
    title: 'Switching & Negating',
    section: 'D.2',
    category: 'addition',
    level: 'middle',
    icon: '➖',
    description: 'A mental shift that makes subtracting larger numbers from smaller numbers effortless.',
    lesson: `
      <p>When faced with a subtraction where the first number is smaller (like \\( 123 - 345 \\)), don't try to mentally borrow negatives.</p>
      <p>Instead, instantly flip the numbers around to a comfortable standard subtraction, find the positive answer, and then just <strong>make it negative</strong>.</p>
      \\[ a - b = - (b - a) \\]
    `,
    examples: [
      { problem: '\\( 123 - 345 \\)', steps: ['Flip the subtraction: \\( 345 - 123 \\)', 'Solve normally: \\( 345 - 120 = 225 \\rightarrow 225 - 3 = 222 \\)', 'Negate the result: \\( -222 \\)'], answer: '-222' }
    ],
    practiceGenerator(level) {
      const a = randInt(100, 300);
      const b = randInt(400, 900);
      return { question: `${a} - ${b}`, answer: a - b };
    },
  },
  {
    id: 'telescoping-sums',
    title: 'Telescoping Fraction Sums',
    section: 'D.3',
    category: 'addition',
    level: 'high',
    icon: '🔭',
    description: 'Evaluate seemingly infinite or long fractional series instantly.',
    lesson: `
      <p>A telescoping sum is a long addition of fractions where the denominator is the product of consecutive numbers.</p>
      \\[ \\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\frac{1}{3 \\times 4} + \\dots + \\frac{1}{n(n+1)} \\]
      <p>Because \\( \\frac{1}{a \\times b} = \\frac{1}{a} - \\frac{1}{b} \\) (when \\( b-a=1 \\)), almost every term in the middle cancels out.</p>
      <p>The entire sequence collapses to just: <strong>(First Term) - (Last Term)</strong>.</p>
      \\[ \\text{Usually: } 1 - \\frac{1}{n+1} = \\frac{n}{n+1} \\]
    `,
    examples: [
      { problem: '\\( \\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\dots + \\frac{1}{10 \\times 11} \\)', steps: ['Identify as a telescoping sum with terms from 1 to 10.', 'Formula directly collapsed to: \\( 1 - \\frac{1}{11} \\)', 'Answer is \\( \\frac{10}{11} \\)'], answer: '10/11' }
    ],
    practiceGenerator(level) {
      const n = randInt(10, 50);
      return { question: `1/(1×2) + 1/(2×3) + ... + 1/(${n}×${n+1})`, answer: `${n}/${n+1}` };
    },
  },
  {
    id: 'ab-plus-ba',
    title: 'a/b + b/a Trick',
    section: 'D.4',
    category: 'addition',
    level: 'middle',
    icon: '➕',
    description: 'Add a fraction to its exact reciprocal without finding common denominators manually.',
    lesson: `
      <p>To add a fraction and its reciprocal, use this direct algebraic shortcut:</p>
      \\[ \\frac{a}{b} + \\frac{b}{a} = \\frac{a^2 + b^2}{ab} \\]
      <p>You can then quickly convert this improper fraction into a mixed number. Since the numerator is always greater than the denominator, it will often convert neatly if you notice that \\( a^2 + b^2 \\) is slightly larger than \\( ab \\) mentally.</p>
    `,
    examples: [
      { problem: '\\( \\frac{3}{4} + \\frac{4}{3} \\)', steps: ['Numerator: \\( 3^2 + 4^2 = 9 + 16 = 25 \\)', 'Denominator: \\( 3 \\times 4 = 12 \\)', 'Fraction is \\( \\frac{25}{12} \\)', 'Convert to mixed: \\( 2 \\frac{1}{12} \\)'], answer: '2 1/12' }
    ],
    practiceGenerator(level) {
      const a = randInt(2, 7);
      let b = randInt(a + 1, 9);
      while(gcd(a, b) !== 1) b++;
      const num = a*a + b*b;
      const den = a*b;
      const whole = Math.floor(num/den);
      const rem = num % den;
      return { question: `${a}/${b} + ${b}/${a} (mixed #)`, answer: `${whole} ${rem}/${den}` };
    },
  },
  {
    id: 'ab-complex-subtraction',
    title: 'a/b − (na−1)/(nb+1)',
    section: 'D.5',
    category: 'addition',
    level: 'high',
    icon: '🧙‍♂️',
    description: 'A magical algebraic cancellation that appears heavily in advanced UIL tests.',
    lesson: `
      <p>This looks like an impossible subtraction problem to do mentally: \\( \\frac{a}{b} - \\frac{na-1}{nb+1} \\).</p>
      <p>However, it collapses completely due to cross-multiplication.</p>
      <p>If you recognize that the second fraction's numerator is a multiple of \\( a \\) minus 1, and its denominator is a multiple of \\( b \\) plus 1, you can use the formula:</p>
      \\[ \\text{Result: } \\frac{a+b}{b(nb+1)} \\]
    `,
    examples: [
      { problem: '\\( \\frac{3}{5} - \\frac{5}{11} \\)', steps: ['Identify \\( a=3, b=5 \\).', 'Notice \\( 5 = 2(3) - 1 \\) and \\( 11 = 2(5) + 1 \\). So trick applies (with \\(n=2\\)).', 'Numerator: \\( a+b = 3+5 = 8 \\)', 'Denominator: \\( b(nb+1) \\rightarrow 5(11) = 55 \\)', 'Answer: \\( \\frac{8}{55} \\)'], answer: '8/55' }
    ],
    practiceGenerator(level) {
      const a = randInt(2, 5);
      let b = a + randInt(1, 4);
      while(gcd(a,b) !== 1) b++;
      const n = randInt(2, 4);
      const num2 = n*a - 1;
      const den2 = n*b + 1;
      const ansNum = a + b;
      const ansDen = b * den2;
      const g = gcd(ansNum, ansDen);
      return { question: `${a}/${b} - ${num2}/${den2}`, answer: `${ansNum/g}/${ansDen/g}` };
    },
  },
  {
    id: 'squares-memorized',
    title: 'Squares (1-30)',
    section: 'E.1',
    category: 'memorization',
    level: 'elementary',
    icon: '⬜',
    description: 'The foundation of all mental math. You must have these memorized cold.',
    lesson: `
      <p>To succeed at any trick in Number Sense, you absolutely must have all perfect squares from 1 to 30 memorized instantly.</p>
      <p>The "hardest" ones to recall for most people are:</p>
      <ul>
        <li>\\( 13^2 = 169 \\)</li>
        <li>\\( 14^2 = 196 \\)</li>
        <li>\\( 16^2 = 256 \\)</li>
        <li>\\( 17^2 = 289 \\)</li>
        <li>\\( 18^2 = 324 \\)</li>
        <li>\\( 19^2 = 361 \\)</li>
        <li>\\( 24^2 = 576 \\)</li>
        <li>\\( 26^2 = 676 \\)</li>
      </ul>
      <p>Drill these until you don't even have to calculate them.</p>
    `,
    examples: [
      { problem: '\\( 24^2 \\)', steps: ['Instantly recall 576 from memory. No calculation needed!'], answer: '576' }
    ],
    practiceGenerator(level) {
      const n = randInt(11, 30);
      return { question: `${n}²`, answer: n*n };
    },
  },
  {
    id: 'cubes-memorized',
    title: 'Cubes (1-12)',
    section: 'E.2',
    category: 'memorization',
    level: 'elementary',
    icon: '🧊',
    description: 'Essential perfect cubes used in volume and algebraic questions.',
    lesson: `
      <p>Just like squares, knowing the first 12 cubes by heart will save you massive amounts of time on geometry volume questions and base-conversion questions.</p>
      <p>Key cubes to lock in:</p>
      <ul>
        <li>\\( 6^3 = 216 \\)</li>
        <li>\\( 7^3 = 343 \\)</li>
        <li>\\( 8^3 = 512 \\) (also \\( 2^9 \\))</li>
        <li>\\( 9^3 = 729 \\) (also \\( 3^6 \\))</li>
        <li>\\( 11^3 = 1331 \\)</li>
        <li>\\( 12^3 = 1728 \\)</li>
      </ul>
    `,
    examples: [
      { problem: '\\( 7^3 \\)', steps: ['Instantly recall 343 from memory.'], answer: '343' }
    ],
    practiceGenerator(level) {
      const n = randInt(4, 12);
      return { question: `${n}³`, answer: n*n*n };
    },
  },
  {
    id: 'powers-2-3-5',
    title: 'Powers of 2, 3, 5',
    section: 'E.3',
    category: 'memorization',
    level: 'elementary',
    icon: '🚀',
    description: 'Recognize powers immediately for base and logarithm questions.',
    lesson: `
      <p>Many intermediate tricks rely on splitting numbers into their prime power components.</p>
      <ul>
        <li><strong>Powers of 2 (up to 10):</strong> 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024</li>
        <li><strong>Powers of 3 (up to 6):</strong> 3, 9, 27, 81, 243, 729</li>
        <li><strong>Powers of 5 (up to 4):</strong> 5, 25, 125, 625</li>
      </ul>
      <p>When you see 243 on a test, your brain should immediately scream "\\( 3^5 \\)".</p>
    `,
    examples: [
      { problem: '\\( 2^8 \\)', steps: ['Recall powers of 2. It is exactly 256.'], answer: '256' },
      { problem: '\\( 5^4 \\)', steps: ['Recall powers of 5. It is 625.'], answer: '625' }
    ],
    practiceGenerator(level) {
      const r = Math.random();
      if (r < 0.6) {
        const p = randInt(5, 10);
        return { question: `2^${p}`, answer: 2**p };
      } else if (r < 0.85) {
        const p = randInt(3, 6);
        return { question: `3^${p}`, answer: 3**p };
      } else {
        const p = randInt(3, 4);
        return { question: `5^${p}`, answer: 5**p };
      }
    },
  },
  {
    id: 'important-fractions',
    title: 'Important Fractions',
    section: 'E.4',
    category: 'memorization',
    level: 'elementary',
    icon: '🍕',
    description: 'Convert tricky fractions to percentages or decimals instantly.',
    lesson: `
      <p>There are specific unit fractions that show up everywhere because of their repeating decimal properties.</p>
      <ul>
        <li>\\( \\frac{1}{6} = 16 \\frac{2}{3}\\% \\) or \\( 0.1666... \\)</li>
        <li>\\( \\frac{1}{7} = 14 \\frac{2}{7}\\% \\). (The digits cycle: 142857...)</li>
        <li>\\( \\frac{1}{8} = 12.5\\% \\) or \\( 0.125 \\)</li>
        <li>\\( \\frac{1}{9} = 11 \\frac{1}{9}\\% \\) or \\( 0.111... \\)</li>
        <li>\\( \\frac{1}{11} = 9 \\frac{1}{11}\\% \\) or \\( 0.0909... \\)</li>
      </ul>
      <p>Knowing \\( \\frac{1}{8} \\) logic makes computing \\( \\frac{3}{8} \\) (37.5%) or \\( \\frac{7}{8} \\) (87.5%) trivial. Knowing \\( \\frac{1}{9} \\) and \\( \\frac{1}{11} \\) makes their multiples trivial.</p>
    `,
    examples: [
      { problem: '\\( \\frac{5}{9} \\) as a decimal', steps: ['Recall \\( \\frac{1}{9} = 0.111... \\)', 'Multiply by 5: \\( 0.555... \\)', 'Answer: .555...'], answer: '.555...' },
      { problem: '\\( \\frac{3}{8} \\) as a %', steps: ['Recall \\( \\frac{1}{8} = 12.5\\% \\)', '\\( 3 \\times 12.5\\% = 37.5\\% \\)'], answer: '37.5' }
    ],
    practiceGenerator(level) {
      const q = pick([
        { q: '1/6 as % (mixed #)', a: '16 2/3' },
        { q: '1/8 as a decimal', a: '.125' },
        { q: '3/8 as %', a: '37.5' },
        { q: '1/9 as % (mixed #)', a: '11 1/9' },
        { q: '4/9 as a decimal', a: '.444...' },
        { q: '1/11 as % (mixed #)', a: '9 1/11' },
      ]);
      return { question: q.q, answer: q.a };
    },
  },
  {
    id: 'special-integers',
    title: 'Special Integers',
    section: 'E.5',
    category: 'memorization',
    level: 'high',
    icon: '💎',
    description: 'Perfect and Amicable numbers guaranteed to appear in trivia rounds.',
    lesson: `
      <p>Number theory questions frequently pull from a very specific list of "special" named integers. You must memorize these class definitions.</p>
      <ul>
        <li><strong>Perfect Numbers:</strong> Numbers whose proper divisors add exactly up to the number itself. <br>The first three are: <strong>6, 28, 496</strong>.</li>
        <li><strong>Amicable Numbers:</strong> Two different numbers whose proper divisors add up to each other. <br>The most famous pair: <strong>220 and 284</strong>.</li>
      </ul>
    `,
    examples: [
      { problem: 'What is the sum of the first two Perfect numbers?', steps: ['Recall first perfect number: 6', 'Recall second perfect number: 28', 'Add: 34'], answer: '34' }
    ],
    practiceGenerator(level) {
      const q = pick([
        { q: '1st Perfect Number', a: '6' },
        { q: '2nd Perfect Number', a: '28' },
        { q: '3rd Perfect Number', a: '496' },
        { q: 'Smaller Amicable pair number', a: '220' },
        { q: 'Larger Amicable pair number', a: '284' },
      ]);
      return { question: q.q, answer: q.a };
    },
  },
  {
    id: 'roman-numerals',
    title: 'Roman Numerals',
    section: 'E.6',
    category: 'memorization',
    level: 'elementary',
    icon: '🏛️',
    description: 'Quickly convert Roman Numerals to Arabic numerals.',
    lesson: `
      <p>Memorize the 7 core Roman Numerals:</p>
      <ul>
        <li><strong>I</strong> = 1, <strong>V</strong> = 5, <strong>X</strong> = 10</li>
        <li><strong>L</strong> = 50, <strong>C</strong> = 100</li>
        <li><strong>D</strong> = 500, <strong>M</strong> = 1000</li>
      </ul>
      <p>Rule: If a smaller numeral appears BEFORE a larger one, you subtract it (e.g., IV = 4, IX = 9, XC = 90). Otherwise, add them up from left to right!</p>
    `,
    examples: [
      { problem: 'MCMXCV', steps: ['M = 1000', 'CM = 900 (100 before 1000)', 'XC = 90 (10 before 100)', 'V = 5', 'Add them up: 1995'], answer: '1995' }
    ],
    practiceGenerator(level) {
      const q = pick([
        { q: 'C (Roman) = ?', a: '100' },
        { q: 'D (Roman) = ?', a: '500' },
        { q: 'M (Roman) = ?', a: '1000' },
        { q: 'L (Roman) = ?', a: '50' },
        { q: 'CM (Roman) = ?', a: '900' },
        { q: 'XC (Roman) = ?', a: '90' },
        { q: 'XVI (Roman) = ?', a: '16' },
      ]);
      return { question: q.q, answer: q.a };
    },
  },
  {
    id: 'platonic-solids',
    title: 'Platonic Solids & Euler',
    section: 'E.7',
    category: 'memorization',
    level: 'middle',
    icon: '🎲',
    description: 'Memorize faces of platonic solids and Euler\'s polyhedral formula.',
    lesson: `
      <p>There are exactly 5 Platonic Solids (regular polyhedrons). You must memorize how many faces they have:</p>
      <ul>
        <li><strong>Tetrahedron:</strong> 4 faces</li>
        <li><strong>Hexahedron (Cube):</strong> 6 faces</li>
        <li><strong>Octahedron:</strong> 8 faces</li>
        <li><strong>Dodecahedron:</strong> 12 faces</li>
        <li><strong>Icosahedron:</strong> 20 faces</li>
      </ul>
      <p><strong>Euler's Formula:</strong> For any convex polyhedron, \\( \\text{Vertices} - \\text{Edges} + \\text{Faces} = 2 \\).</p>
    `,
    examples: [
      { problem: 'Faces of an icosahedron?', steps: ['Recall memorized list: Icosahedron is 20.'], answer: '20' },
      { problem: 'A shape has 8 faces and 12 edges, how many vertices?', steps: ['Use Euler\'s Formula: \\( V - E + F = 2 \\)', '\\( V - 12 + 8 = 2 \\)', '\\( V - 4 = 2 \\)', '\\( V = 6 \\)'], answer: '6' }
    ],
    practiceGenerator(level) {
      const q = pick([
        { q: 'Faces of a Dodecahedron', a: '12' },
        { q: 'Faces of an Icosahedron', a: '20' },
        { q: 'Faces of an Octahedron', a: '8' },
        { q: 'Edges of a Cube', a: '12' },
        { q: 'V - E + F = ?', a: '2' },
      ]);
      return { question: q.q, answer: q.a };
    },
  },
  {
    id: 'pi-and-e',
    title: 'π and e Approximations',
    section: 'E.8',
    category: 'memorization',
    level: 'high',
    icon: '🥧',
    description: 'Memorize the rational and decimal approximations of pi and e.',
    lesson: `
      <p>Mathematical constants are heavily tested in estimation and accuracy rounds.</p>
      <ul>
        <li><strong>Pi (\\( \\pi \\)):</strong> \\( \\approx 3.14159 \\)</li>
        <li><strong>Euler's Number (e):</strong> \\( \\approx 2.718 \\)</li>
        <li><strong>Pi Rational Approximations:</strong> \\( \\frac{22}{7} \\) (Close), \\( \\frac{355}{113} \\) (Extremely close!)</li>
      </ul>
    `,
    examples: [
      { problem: 'Which fraction famously approximates Pi better than 22/7?', steps: ['Recall the memorized ratio: 355/113'], answer: '355/113' }
    ],
    practiceGenerator(level) {
      const q = pick([
        { q: 'Fraction approx of π (starts with 35..)', a: '355/113' },
        { q: 'First 3 digits of e', a: '2.71' },
      ]);
      return { question: q.q, answer: q.a };
    },
  },
  {
    id: 'distance-velocity',
    title: 'Distance & Velocity',
    section: 'F.1',
    category: 'conversions',
    level: 'middle',
    icon: '🛣️',
    description: 'Convert miles, feet, and convert MPH to FPS.',
    lesson: `
      <p>Memorize these foundational imperial distance conversions:</p>
      <ul>
        <li><strong>1 Mile</strong> = 5,280 feet = 1,760 yards</li>
        <li><strong>1 Yard</strong> = 3 feet = 36 inches</li>
      </ul>
      <p>To convert from <strong>Miles Per Hour (MPH)</strong> to <strong>Feet Per Second (fps)</strong> directly, just multiply the speed by <strong>22/15</strong>! <br>For fps to MPH, multiply by <strong>15/22</strong>.</p>
    `,
    examples: [
      { problem: '60 mph in feet per second?', steps: ['Multiply 60 by \\( \\frac{22}{15} \\)', '\\( \\frac{60}{15} = 4 \\)', '\\( 4 \\times 22 = 88 \\)'], answer: '88' }
    ],
    practiceGenerator(level) {
      const mph = pick([15, 30, 45, 60, 75, 90]);
      return { question: `${mph} mph = ? fps`, answer: mph * 22 / 15 };
    },
  },
  {
    id: 'area-volume-conversions',
    title: 'Area & Volume Scalings',
    section: 'F.2',
    category: 'conversions',
    level: 'elementary',
    icon: '📦',
    description: 'Learn how unit scalings expand exponentially in 2D and 3D space.',
    lesson: `
      <p>When you convert a unit (like yards to feet) in 2D (Area) or 3D (Volume), the conversion factor gets squared or cubed!</p>
      <ul>
        <li><strong>1 Yard</strong> = 3 Feet</li>
        <li><strong>1 Square Yard</strong> = \\( 3^2 \\) = 9 Square Feet</li>
        <li><strong>1 Cubic Yard</strong> = \\( 3^3 \\) = 27 Cubic Feet</li>
      </ul>
      <p>Square inch to square feet? Since there are 12 inches in a foot, there are \\( 12^2 = 144 \\) sq inches in a sq foot! For cubic, it's \\( 12^3 = 1728 \\)!</p>
    `,
    examples: [
      { problem: '5 cubic yards = ? cubic feet', steps: ['Recall 1 cubic yard = 27 cubic feet.', 'Multiply: \\( 5 \\times 27 \\)', '\\( 135 \\)'], answer: '135' }
    ],
    practiceGenerator(level) {
      const q = pick([
        { q: '1 sq yd = ? sq ft', a: '9' },
        { q: '1 cu yd = ? cu ft', a: '27' },
        { q: '1 sq ft = ? sq inches', a: '144' },
        { q: '1 cu ft = ? cu inches', a: '1728' },
      ]);
      return { question: q.q, answer: q.a };
    },
  },
  {
    id: 'fluid-weight-conversions',
    title: 'Fluid & Weight',
    section: 'F.3',
    category: 'conversions',
    level: 'elementary',
    icon: '💧',
    description: 'Master standard fluid capacities, ounces, and pounds.',
    lesson: `
      <p>Memorize the "Gallon Man" or these simple equations for fluids:</p>
      <ul>
        <li><strong>1 Gallon</strong> = 4 Quarts = 8 Pints = 16 Cups = 128 fluid ounces</li>
      </ul>
      <p>For weight mass:</p>
      <ul>
        <li><strong>1 Pound (lb)</strong> = 16 dry ounces</li>
        <li><strong>1 Ton</strong> = 2,000 pounds</li>
      </ul>
    `,
    examples: [
      { problem: '3 gallons = ? cups', steps: ['Recall 1 gallon = 16 cups.', 'Multiply: \\( 3 \\times 16 = 48 \\)'], answer: '48' }
    ],
    practiceGenerator(level) {
      const q = pick([
        { q: '1 gallon = ? cups', a: '16' },
        { q: '1 gallon = ? pints', a: '8' },
        { q: '1 quart = ? cups', a: '4' },
        { q: '1 pound = ? ounces', a: '16' },
        { q: '1 ton = ? pounds', a: '2000' },
      ]);
      return { question: q.q, answer: q.a };
    },
  },
  {
    id: 'celsius-fahrenheit',
    title: 'Celsius ↔ Fahrenheit',
    section: 'F.4',
    category: 'conversions',
    level: 'middle',
    icon: '🌡️',
    description: 'Convert temperatures instantly in your head.',
    lesson: `
      <p>Temperature conversions require two steps: multiplying by a fraction and adding/subtracting 32.</p>
      <ul>
        <li><strong>Celsius to Fahrenheit:</strong> Multiply by <strong>1.8</strong> (or \\( \\frac{9}{5} \\)), then <strong>add 32</strong>.</li>
        <li><strong>Fahrenheit to Celsius:</strong> <strong>Subtract 32</strong> first, then divide by <strong>1.8</strong> (multiply by \\( \\frac{5}{9} \\)).</li>
      </ul>
      <p>Hint: Remember that 0°C = 32°F and 100°C = 212°F.</p>
    `,
    examples: [
      { problem: '20°C in Fahrenheit?', steps: ['Multiply by 1.8: \\( 20 \\times 1.8 = 36 \\)', 'Add 32: \\( 36 + 32 = 68 \\)'], answer: '68' }
    ],
    practiceGenerator(level) {
      const c = pick([10, 20, 25, 30, 40, 50, 100]);
      return { question: `${c}°C = ? °F`, answer: c * 9 / 5 + 32 };
    },
  },
  {
    id: 'arithmetic-series',
    title: 'Arithmetic Series Sum',
    section: 'G.1',
    category: 'series',
    level: 'elementary',
    icon: '🪜',
    description: 'Find the total sum of any evenly-spaced sequence of numbers.',
    lesson: `
      <p>To find the sum of an arithmetic sequence (where the gap between numbers is constant), use the formula:</p>
      \\[ S = n \\times \\left( \\frac{a_1 + a_n}{2} \\right) \\]
      <p>Where \\( n \\) is the number of terms, \\( a_1 \\) is the first term, and \\( a_n \\) is the last term.</p>
      <p>Think of it as simply: <strong>(Number of Things) × (Average of the First and Last Thing)</strong>.</p>
    `,
    examples: [
      { problem: '\\( 1 + 2 + 3 + \\dots + 10 \\)', steps: ['Number of terms \\( n = 10 \\)', 'Average of boundaries: \\( \\frac{1 + 10}{2} = 5.5 \\)', 'Multiply: \\( 10 \\times 5.5 = 55 \\)'], answer: '55' }
    ],
    practiceGenerator(level) {
      const n = randInt(5, 10) * 2;
      return { question: `1 + 2 + ... + ${n}`, answer: (n * (n + 1)) / 2 };
    },
  },
  {
    id: 'geometric-series',
    title: 'Finite Geometric Series',
    section: 'G.2',
    category: 'series',
    level: 'middle',
    icon: '📈',
    description: 'Find the total sum of a sequence that multiplies by a common ratio.',
    lesson: `
      <p>A finite geometric series multiplies by a common ratio \\( r \\) between each term. The sum is:</p>
      \\[ S_n = a_1 \\left( \\frac{r^n - 1}{r - 1} \\right) \\]
      <p>For example, if you are summing powers of 2 (\\( 1 + 2 + 4 + 8 + 16 \\)), notice that the sum is always exactly <strong>1 less than the NEXT term</strong> in the sequence!</p>
    `,
    examples: [
      { problem: '\\( 1 + 2 + 4 + 8 + 16 \\)', steps: ['Identify as powers of 2 (ratio \\( r=2 \\)).', 'The next term would be 32.', 'Answer is \\( 32 - 1 = 31 \\)'], answer: '31' }
    ],
    practiceGenerator(level) {
      const p = randInt(4, 7);
      return { question: `1 + 2 + 4 + ... + 2^${p}`, answer: 2**(p+1) - 1 };
    },
  },
  {
    id: 'infinite-geometric',
    title: 'Infinite Geometric',
    section: 'G.3',
    category: 'series',
    level: 'high',
    icon: '♾️',
    description: 'Sum an infinitely long sequence whose numbers approach zero.',
    lesson: `
      <p>When a geometric series goes on forever (infinite) AND the ratio \\( r \\) is a fraction between -1 and 1, the sum converges perfectly to a single number:</p>
      \\[ S = \\frac{a_1}{1 - r} \\]
      <p>Just take the very first term, and divide it by \\( 1 \\text{ minus the ratio} \\).</p>
    `,
    examples: [
      { problem: '\\( 8 + 4 + 2 + 1 + \\frac{1}{2} + \\dots \\)', steps: ['Identify first term \\( a_1 = 8 \\).', 'Identify ratio \\( r = \\frac{1}{2} \\).', 'Evaluate: \\( \\frac{8}{1 - 0.5} = \\frac{8}{0.5} = 16 \\)'], answer: '16' }
    ],
    practiceGenerator(level) {
      const a = pick([4, 8, 16, 24, 32]);
      return { question: `${a} + ${a/2} + ${a/4} + ... ∞`, answer: a * 2 };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  61. SUM OF ODD INTEGERS                                    │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'sum-odd-integers',
    title: 'Sum of Odd Integers',
    section: 'C.1',
    category: 'series',
    level: 'elementary',
    icon: '📊',
    description: 'Quickly find the sum of consecutive odd integers starting from 1.',
    lesson: `
      <p>The sum of the first \\( n \\) odd integers is always perfectly equal to \\( n^2 \\).</p>
      \\[ 1 + 3 + 5 + \\dots + (2n - 1) = n^2 \\]
      <p><strong>Example:</strong> \\( 1 + 3 + 5 + 7 + 9 \\).</p>
      <p>We are adding the first 5 odd integers. The sum is simply \\( 5^2 = 25 \\).</p>
      <p>If the sequence ends at a specific odd number \\( L \\), you can find \\( n \\) by adding 1 and dividing by 2:</p>
      \\[ n = \\frac{L + 1}{2} \\]
      <p>If \\( L = 19 \\), then \\( n = \\frac{20}{2} = 10 \\). The sum is \\( 10^2 = 100 \\).</p>
    `,
    examples: [
      { problem: '\\( 1 + 3 + 5 + \\dots + 15 \\)', steps: ['Find \\( n \\): \\( (15+1) \\div 2 = 8 \\)', 'Square \\( n \\): \\( 8^2 = 64 \\)'], answer: '64' },
      { problem: '\\( 1 + 3 + 5 + \\dots + 29 \\)', steps: ['Find \\( n \\): \\( (29+1) \\div 2 = 15 \\)', 'Square \\( n \\): \\( 15^2 = 225 \\)'], answer: '225' },
    ],
    practiceGenerator(level) {
      const diff = LEVEL_ORD[level] || 0;
      let n;
      if (diff === 0) n = randInt(5, 15);
      else n = randInt(15, 35);
      const L = (n * 2) - 1;
      return { question: `1 + 3 + 5 + ... + ${L}`, answer: n * n };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  62. FIBONACCI-LIKE SEQUENCES                               │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'fibonacci-sum',
    title: 'Fibonacci-Like Sequences',
    section: 'C.2',
    category: 'series',
    level: 'middle',
    icon: '🐚',
    description: 'Find the sum of the first 10 terms of any Fibonacci-like sequence.',
    lesson: `
      <p>A Fibonacci-like sequence is one where each term is the sum of the two preceding terms. (e.g., \\( 1, 1, 2, 3, 5\\dots \\) or \\( 2, 5, 7, 12, 19\\dots \\)).</p>
      <p><strong>The Trick:</strong> The sum of the first 10 terms of ANY Fibonacci sequence is exactly \\( 11 \\times \\text{the 7th term} \\).</p>
      \\[ S_{10} = 11 \\times a_7 \\]
      <p>If a problem asks for the sum of the first 10 terms, quickly generate the sequence up to the 7th term and multiply by 11 using the standard multiply-by-11 trick.</p>
    `,
    examples: [
      { problem: 'If a sequence starts \\( 2, 4, 6... \\) and follows the Fibonacci rule, sum the first 10 terms.', steps: ['Generate 7 terms: \\( 2, 4, 6, 10, 16, 26, 42 \\)', '7th term is 42', 'Multiply by 11: \\( 42 \\times 11 = 462 \\)'], answer: '462' },
    ],
    practiceGenerator(level) {
      const t1 = randInt(1, 5);
      const t2 = randInt(1, 5) + t1;
      let fib = [t1, t2];
      for (let i = 2; i < 7; i++) fib.push(fib[i-1] + fib[i-2]);
      const last = fib[6];
      return { question: `Sum 1st 10 terms of Fib seq: ${t1}, ${t2}, ${fib[2]}...`, answer: last * 11 };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  63. INTEGRAL DIVISORS                                      │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'integral-divisors',
    title: 'Integral Divisors',
    section: 'C.3',
    category: 'number-theory',
    level: 'elementary',
    icon: '🔮',
    description: 'Find the total number of positive divisors of an integer.',
    lesson: `
      <p>To find how many numbers evenly divide a number \\( N \\):</p>
      <ol>
        <li>Find the prime factorization of \\( N \\). Let \\( N = p_{1}^{a} \\times p_{2}^{b} \\times p_{3}^{c} \\dots \\)</li>
        <li>Add 1 to each of the exponents: \\( a+1, b+1, c+1 \\)</li>
        <li>Multiply these numbers together. \\( \\text{Divisors} = (a+1)(b+1)(c+1)\\dots \\)</li>
      </ol>
      <p><strong>Example: How many divisors does 24 have?</strong></p>
      \\[ 24 = 8 \\times 3 = 2^3 \\times 3^1 \\]
      \\[ \\text{Exponents are } 3 \\text{ and } 1. \\]
      \\[ (3 + 1)(1 + 1) = 4 \\times 2 = 8 \\]
      <p>24 has 8 divisors (1, 2, 3, 4, 6, 8, 12, 24).</p>
    `,
    examples: [
      { problem: 'How many positive integral divisors does 36 have?', steps: ['Prime factor: \\( 36 = 2^2 \\times 3^2 \\)', 'Exponents: 2 and 2', 'Add 1 and multiply: \\( (2+1)(2+1) = 3 \\times 3 = 9 \\)'], answer: '9' },
      { problem: 'Number of divisors of 40', steps: ['Factor: \\( 40 = 2^3 \\times 5^1 \\)', 'Add 1 to powers: \\( 4 \\times 2 \\)', '8 divisors'], answer: '8' },
    ],
    practiceGenerator(level) {
      const diff = LEVEL_ORD[level] || 0;
      let p1 = pick([2, 3, 5]);
      let p2 = pick([2, 3, 5]);
      while (p1 === p2) p2 = pick([2, 3, 5]);
      let e1, e2, e3 = 0, p3 = 1;
      if (diff === 0) { e1 = randInt(2, 4); e2 = randInt(1, 2); }
      else { 
        e1 = randInt(2, 4); e2 = randInt(1, 3); 
        if (Math.random() > 0.5) { 
          p3 = pick([2, 3, 5, 7]);
          while (p3 === p1 || p3 === p2) p3 = pick([2, 3, 5, 7]);
          e3 = 1;
        }
      }
      const n = Math.pow(p1, e1) * Math.pow(p2, e2) * Math.pow(p3, e3);
      const ans = (e1 + 1) * (e2 + 1) * (e3 + 1);
      return { question: `Num divisors of ${n}`, answer: ans };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  64. DIAGONALS OF A POLYGON                                 │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'diagonals-polygon',
    title: 'Diagonals of a Polygon',
    section: 'C.4',
    category: 'geometry',
    level: 'middle',
    icon: '🕸️',
    description: 'Calculate the total number of diagonals in an n-sided polygon.',
    lesson: `
      <p>A diagonal is a line connecting two non-adjacent vertices of a polygon. To find the total number of diagonals for an \\( n \\)-sided polygon, use the formula:</p>
      <div class="formula-block">\\( D = \\frac{n(n-3)}{2} \\)</div>
      <ul>
        <li>\\( n \\): number of sides/vertices</li>
        <li>\\( n-3 \\): number of diagonals you can draw from a single vertex (you can't draw a diagonal to yourself, or the 2 adjacent points).</li>
        <li>Divide by 2 because each diagonal is counted from both ends.</li>
      </ul>
      <p><strong>Example: Heptagon (7 sides)</strong></p>
      \\[ D = \\frac{7 \\times (7-3)}{2} = \\frac{7 \\times 4}{2} = \\frac{28}{2} = 14 \\]
    `,
    examples: [
      { problem: 'How many diagonals does a nonagon have?', steps: ['Nonagon has 9 sides. \\( n=9 \\)', '\\( (9 \\times 6) \\div 2 \\)', '\\( 54 \\div 2 = 27 \\)'], answer: '27' },
      { problem: 'Diagonals in a 12-sided polygon (dodecagon)', steps: ['\\( (12 \\times 9) \\div 2 \\)', '\\( 108 \\div 2 = 54 \\)'], answer: '54' },
    ],
    practiceGenerator(level) {
      const names = { 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon', 12: 'dodecagon' };
      const n = randInt(5, 20);
      const label = names[n] || `${n}-gon`;
      const txt = Math.random() > 0.5 ? `Diagonals in a ${label}` : `Diagonals of an ${n}-sided polygon`;
      return { question: txt, answer: n * (n - 3) / 2 };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  65. INTERIOR & EXTERIOR ANGLES                             │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'polygon-angles',
    title: 'Polygonal Angles',
    section: 'C.5',
    category: 'geometry',
    level: 'elementary',
    icon: '📏',
    description: 'Calculate interior and exterior angles of regular polygons.',
    lesson: `
      <p>For any polygon with \\( n \\) sides:</p>
      <p><strong>1. Sum of Interior Angles:</strong></p>
      \\[ (n-2) \\times 180^{\\circ} \\]
      <p>(Since an \\( n \\)-gon can be split into \\( n-2 \\) triangles).</p>
      
      <p><strong>2. Single Interior Angle (Regular):</strong></p>
      \\[ \\frac{(n-2) \\times 180^{\\circ}}{n} \\]
      
      <p><strong>3. Sum of Exterior Angles:</strong></p>
      \\[ \\text{Always } 360^{\\circ} \\text{ (for any convex polygon!)} \\]
      
      <p><strong>4. Single Exterior Angle (Regular):</strong></p>
      \\[ \\frac{360^{\\circ}}{n} \\]
      <p><strong>Trick:</strong> The interior and exterior angles of a polygon are supplementary (they add to 180). Often, it's faster to find the exterior angle (\\( 360/n \\)) and subtract from 180 to find the interior angle!</p>
    `,
    examples: [
      { problem: 'Sum of interior angles of an octagon', steps: ['\\( n=8 \\)', '\\( (8-2) \\times 180 \\)', '\\( 6 \\times 180 = 1080^{\\circ} \\)'], answer: '1080' },
      { problem: 'Interior angle of a regular decagon', steps: ['\\( n=10 \\)', 'Find exterior first: \\( 360 \\div 10 = 36 \\)', 'Interior is \\( 180 - 36 = 144^{\\circ} \\)'], answer: '144' },
    ],
    practiceGenerator(level) {
      const types = ['sum_int', 'single_ext', 'single_int'];
      const t = pick(types);
      const names = { 5: 'pentagon', 6: 'hexagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon', 12: 'dodecagon' };
      const n = pick([5, 6, 8, 9, 10, 12, 15, 18, 20]);
      const label = names[n] || `${n}-gon`;
      
      if (t === 'sum_int') return { question: `Sum of int. angles of ${label} (degrees)`, answer: (n - 2) * 180 };
      if (t === 'single_ext') return { question: `Ext. angle of reg. ${label} (degrees)`, answer: 360 / n };
      return { question: `Int. angle of reg. ${label} (degrees)`, answer: 180 - (360 / n) };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  66. TRIANGULAR NUMBERS                                     │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'triangular-numbers',
    title: 'Triangular Numbers',
    section: 'C.6',
    category: 'patterns',
    level: 'elementary',
    icon: '🔺',
    description: 'Find the nth triangular number quickly.',
    lesson: `
      <p>Triangular numbers are generated by arranging dots in an equilateral triangle. They represent the sum of the first \\( n \\) consecutive integers (\\( 1+2+3+\\dots+n \\)).</p>
      <p>The sequence goes: \\( 1, 3, 6, 10, 15, 21, 28, 36, 45, 55\\dots \\)</p>
      <p><strong>The Formula:</strong> To find the \\( n \\)th triangular number \\( T_n \\):</p>
      <div class="formula-block">\\( T_n = \\frac{n(n+1)}{2} \\)</div>
      <p><strong>Example: 8th Triangular Number</strong></p>
      \\[ T_8 = \\frac{8 \\times 9}{2} = \\frac{72}{2} = 36 \\]
    `,
    examples: [
      { problem: 'What is the 10th triangular number?', steps: ['Formula: \\( n(n+1)/2 \\)', '\\( (10 \\times 11)/2 \\)', '\\( 110/2 = 55 \\)'], answer: '55' },
      { problem: 'Find \\( T_{12} \\)', steps: ['\\( (12 \\times 13)/2 \\)', '\\( 6 \\times 13 = 78 \\)'], answer: '78' },
    ],
    practiceGenerator(level) {
      const n = randInt(5, 25);
      return { question: `${n}th triangular number`, answer: n * (n + 1) / 2 };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  67. FIGURATE NUMBERS (PENT/HEX)                            │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'figurate-numbers',
    title: 'Figurate Numbers',
    section: 'C.7',
    category: 'patterns',
    level: 'middle',
    icon: '⬟',
    description: 'Formulas for Pentagonal and Hexagonal numbers.',
    lesson: `
      <p>Just like triangular numbers, we can arrange dots into pentagons and hexagons. The formulas to find the \\( n \\)th figurate number are critical to memorize:</p>
      <ul>
        <li><strong>Pentagonal Numbers (\\( P_n \\)):</strong> \\( \\frac{n(3n - 1)}{2} \\)<br/>
          <em>Sequence: 1, 5, 12, 22, 35...</em>
        </li>
        <li><strong>Hexagonal Numbers (\\( H_n \\)):</strong> \\( n(2n - 1) \\)<br/>
          <em>Sequence: 1, 6, 15, 28, 45...</em>
        </li>
      </ul>
      <p><strong>Note:</strong> Every hexagonal number is also a triangular number!</p>
    `,
    examples: [
      { problem: 'What is the 5th pentagonal number?', steps: ['Using \\( P_5 = 5(3(5)-1)/2 \\)', '\\( \\( 5 \\times 14 \\) / 2 \\)', '\\( 70 / 2 = 35 \\)'], answer: '35' },
      { problem: 'Find the 8th hexagonal number.', steps: ['Using \\( H_8 = 8(2(8)-1) \\)', '\\( \\( 8 \\times 15 \\) = 120 \\)'], answer: '120' },
    ],
    practiceGenerator(level) {
      const type = pick(['pentagonal', 'hexagonal']);
      const n = randInt(5, 15);
      if (type === 'pentagonal') {
        return { question: `${n}th pentagonal number`, answer: n * (3 * n - 1) / 2 };
      } else {
        return { question: `${n}th hexagonal number`, answer: n * (2 * n - 1) };
      }
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  68. PYTHAGOREAN TRIPLES                                    │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'pythagorean-triples',
    title: 'Pythagorean Triples',
    section: 'C.8',
    category: 'geometry',
    level: 'elementary',
    icon: '📐',
    description: 'Find missing sides of right triangles instantly.',
    lesson: `
      <p>Do not waste time doing \\( a^2 + b^2 = c^2 \\). The vast majority of UIL problems use scaled versions of famous Pythagorean Triples.</p>
      <p><strong>Memorize these primitives:</strong></p>
      <ul>
        <li><strong>3 - 4 - 5</strong> (e.g. 6-8-10, 9-12-15, 30-40-50)</li>
        <li><strong>5 - 12 - 13</strong>  (e.g. 10-24-26, 15-36-39)</li>
        <li><strong>8 - 15 - 17</strong></li>
        <li><strong>7 - 24 - 25</strong></li>
        <li><strong>9 - 40 - 41</strong></li>
      </ul>
      <p>Watch out: The largest number is ALWAYS the hypotenuse.</p>
    `,
    examples: [
      { problem: 'Find hypotenuse of right triangle with legs 10 and 24', steps: ['Notice 10 and 24 are double 5 and 12.', 'This is a \\( 5 \\times 2 \\) - \\( 12 \\times 2 \\) - \\( 13 \\times 2 \\) triangle', 'Hypotenuse: \\( 13 \\times 2 = 26 \\)'], answer: '26' },
      { problem: 'Legs are 15, x. Hypotenuse is 25.', steps: ['Divide by 5: \\( 3, x/5, 5 \\)', 'Missing piece is 4. (\\( 3-4-5 \\))', '\\( x = 4 \\times 5 = 20 \\)'], answer: '20' },
    ],
    practiceGenerator(level) {
      const prims = [[3,4,5], [5,12,13], [8,15,17], [7,24,25]];
      const scale = randInt(1, 4);
      let [a, b, c] = pick(prims);
      a *= scale; b *= scale; c *= scale;
      if (Math.random() > 0.5) [a, b] = [b, a];
      
      const missing = pick(['hypot', 'leg']);
      if (missing === 'hypot') return { question: `Right \\( \\Delta \\) legs ${a}, ${b}. Hypotenuse?`, answer: c };
      return { question: `Right \\( \\Delta \\) leg ${a}, hypotenuse ${c}. Other leg?`, answer: b };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  69. EQUILATERAL TRIANGLE FORMULAS                          │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'equilateral-formulas',
    title: 'Equilateral Triangle',
    section: 'C.9',
    category: 'geometry',
    level: 'middle',
    icon: '⛰️',
    description: 'Calculate the height and area of equilateral triangles.',
    lesson: `
      <p>For an equilateral triangle with side length \\( s \\), memorize the direct formulas for height (\\( h \\)) and Area (\\( A \\)):</p>
      <ul>
        <li><strong>Height:</strong> \\( \\quad h = \\frac{s \\sqrt{3}}{2} \\)</li>
        <li><strong>Area:</strong> \\( \\quad A = \\frac{s^2 \\sqrt{3}}{4} \\)</li>
      </ul>
      <p>Notice how area requires the \\( s \\) to be squared (because area is 2-dimensional!), while height does not.</p>
      <p><strong>Note:</strong> Typical UIL formats will ask for the <em>coefficient</em> of \\( \\sqrt{3} \\), so your answer is just the number proceeding \\( \\sqrt{3} \\).</p>
    `,
    examples: [
      { problem: 'Area of equilateral triangle with side length 8 = \\( k\\sqrt{3} \\). Find \\( k \\).', steps: ['Area formula is \\( s^2\\sqrt{3}/4 \\)', '\\( 8^2 / 4 = 64 / 4 = 16 \\)', 'The coefficient \\( k \\) is 16'], answer: '16' },
    ],
    practiceGenerator(level) {
      const type = pick(['area', 'height']);
      const s = randInt(2, 12) * 2; // Always even
      if (type === 'area') {
        return { question: `Area of equil. \\( \\Delta \\) side ${s}=\\( k\\sqrt{3} \\). \\( k= \\)?`, answer: (s * s) / 4 };
      }
      return { question: `Height of equil. \\( \\Delta \\) side ${s}=\\( k\\sqrt{3} \\). \\( k= \\)?`, answer: s / 2 };
    },
  },

  // ┌──────────────────────────────────────────────────────────────┐
  // │  70. VOLUME OF SOLIDS                                       │
  // └──────────────────────────────────────────────────────────────┘
  {
    id: 'volume-solids',
    title: 'Volume of Solids',
    section: 'C.10',
    category: 'geometry',
    level: 'middle',
    icon: '🧊',
    description: 'Find volumes of spheres, cylinders, and cones in terms of pi.',
    lesson: `
      <p>Memorize the formulas for 3D shapes. Most UIL questions ask for the answer "in terms of \\( \\pi \\)".</p>
      <ul>
        <li><strong>Cylinder:</strong> \\( V = \\pi r^2 h \\)</li>
        <li><strong>Cone:</strong> \\( V = \\frac{1}{3} \\pi r^2 h \\) (It's exactly \\( \\frac{1}{3} \\) of a cylinder!)</li>
        <li><strong>Sphere:</strong> \\( V = \\frac{4}{3} \\pi r^3 \\)</li>
      </ul>
    `,
    examples: [
      { problem: 'Volume of sphere with radius 6 = \\( k\\pi \\). \\( k= \\)?', steps: ['\\( 4/3 \\times 6^3 \\)', '\\( 4/3 \\times 216 = 288 \\)'], answer: '288' },
      { problem: 'Volume of cone with radius 4, height 6 = \\( k\\pi \\)', steps: ['\\( 1/3 \\times 4^2 \\times 6 \\)', '\\( 1/3 \\times 16 \\times 6 = 32 \\)'], answer: '32' },
    ],
    practiceGenerator(level) {
      const t = pick(['cylinder', 'cone', 'sphere']);
      const r = randInt(2, 6);
      if (t === 'cylinder') {
        const h = randInt(3, 10);
        return { question: `Vol of cylinder \\( r= \\){r}, h=${h}\\( is \\)k\\pi\\( . \\)k=\\( ?`, answer: r * r * h };
      } else if (t === 'cone') {
        const h = randInt(1, 5) * 3; // multiple of 3
        return { question: `Vol of cone \\)r=${r}, h=${h}\\( is \\)k\\pi\\( . \\)k=\\( ?`, answer: (r * r * h) / 3 };
      } else {
        const sphR = randInt(1, 3) * 3; // 3, 6, 9
        return { question: `Vol of sphere \\)r=${sphR}\\( is \\)k\\pi\\( . \\)k=$?`, answer: (4 * sphR * sphR * sphR) / 3 };
      }
    },
  },
]

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
