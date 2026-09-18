export interface ShortcutChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  writtenFormula: string;
  visualPattern: string;
  rule: string;
  whyItWorks?: string;
  workedExamples: {
    title: string;
    problem: string;
    steps: string[];
    result: string;
  }[];
  practiceProblems: {
    question: string;
    answer: string;
    hint?: string;
  }[];
}

export const SPEED_HANDBOOK_METADATA = {
  title: 'Speed Mental Math & Calculation Shortcuts Handbook',
  subtitle: 'Fast Mental Math, Speed Calculation Shortcuts, and Aptitude-Ready Master Techniques',
  edition: 'Engineering Examination & Campus Recruitment Edition',
  stats: '15 Master Chapters • 60+ Worked Solutions • 200+ Practice Problems'
};

export const HANDBOOK_CHAPTERS: ShortcutChapter[] = [
  {
    id: 'ch-1',
    chapterNumber: 1,
    title: 'Multiplying Any Number by 11',
    subtitle: 'The fastest mental multiplication trick — add adjacent digits and slide the sum between.',
    writtenFormula: '11 × (10a + b) = 100a + 10(a + b) + b',
    visualPattern: 'ab × 11   ⟶   a  |  (a + b)  |  b',
    rule: 'To multiply any two-digit number by 11, add its two digits together and slide the sum between them. If the sum is 10 or greater, write down only the units digit and carry 1 to the hundreds digit. For 3+ digits, write the outer digits and insert consecutive sums of adjacent pairs from right to left.',
    whyItWorks: '11 × (10a + b) = 10(10a + b) + (10a + b) = 100a + 10(a+b) + b. The hundreds digit is a, units digit is b, and tens digit is exactly (a+b).',
    workedExamples: [
      {
        title: 'Worked Example 1: 34 × 11 (no carry)',
        problem: '34 × 11',
        steps: ['Digits: 3 and 4.', 'Sum: 3 + 4 = 7.', 'Slide the sum between the digits: 3 _7_ 4 → 374.'],
        result: '374'
      },
      {
        title: 'Worked Example 2: 58 × 11 (with carry)',
        problem: '58 × 11',
        steps: ['Digits: 5 and 8.', 'Sum: 5 + 8 = 13 (too big for one digit).', 'Write down the units digit (3), carry 1 to left digit: 5 + 1 = 6.', 'Result: 6 _3_ 8 → 638.'],
        result: '638'
      },
      {
        title: 'Worked Example 3: 72 × 11',
        problem: '72 × 11',
        steps: ['Digits: 7 and 2. Sum: 7 + 2 = 9.', 'Slide sum between: 7 _9_ 2 → 792.'],
        result: '792'
      },
      {
        title: 'Worked Example 4: 132 × 11 (three-digit number)',
        problem: '132 × 11',
        steps: ['Digits: 1, 3, 2.', 'Pairs: (1+3)=4, (3+2)=5. No carries needed.', 'Result: 1 _4_ 5 _2_ → 1452.'],
        result: '1452'
      }
    ],
    practiceProblems: [
      { question: '25 × 11', answer: '275', hint: '2 + 5 = 7. Insert between 2 and 5.' },
      { question: '47 × 11', answer: '517', hint: '4 + 7 = 11. Write 1, carry 1 to 4 → 517.' },
      { question: '83 × 11', answer: '913', hint: '8 + 3 = 11. Carry 1 to 8.' },
      { question: '95 × 11', answer: '1045', hint: '9 + 5 = 14. 9 + 1 = 10.' },
      { question: '243 × 11', answer: '2673', hint: '2, (2+4=6), (4+3=7), 3.' }
    ]
  },
  {
    id: 'ch-2',
    chapterNumber: 2,
    title: 'Multiplying by 12: Direct One-Step Method',
    subtitle: 'Double each digit and add the neighbor on its right.',
    writtenFormula: 'N × 12 = [ Double current digit ] + [ Neighbor to the right ]',
    visualPattern: 'Digit D_k × 12   ⟶   (2 × D_k) + D_{k-1}',
    rule: 'To multiply any number by 12 from right to left: (1) Double the units digit. (2) For every other digit, double it and add the digit to its right (plus any carry). (3) For the leading digit, double it and add its right neighbor; prefix 0 if needed for any leftover carry.',
    whyItWorks: '12 × N = (10 + 2) × N = 10N + 2N. Shifting 10N to the left aligns each digit with the doubled digit of its right neighbor.',
    workedExamples: [
      {
        title: 'Worked Example 1: 34 × 12',
        problem: '34 × 12',
        steps: [
          'Units: Double 4 = 8.',
          'Tens: Double 3 + neighbor 4 = 6 + 4 = 10. Write 0, carry 1.',
          'Hundreds: Double 0 (implicit) + neighbor 3 + carry 1 = 4.',
          'Result: 408.'
        ],
        result: '408'
      },
      {
        title: 'Worked Example 2: 53 × 12',
        problem: '53 × 12',
        steps: [
          'Units: Double 3 = 6.',
          'Tens: Double 5 + neighbor 3 = 10 + 3 = 13. Write 3, carry 1.',
          'Hundreds: 0 + neighbor 5 + carry 1 = 6.',
          'Result: 636.'
        ],
        result: '636'
      },
      {
        title: 'Worked Example 3: 124 × 12',
        problem: '124 × 12',
        steps: [
          'Units: 2 × 4 = 8.',
          'Tens: 2 × 2 + 4 = 8.',
          'Hundreds: 2 × 1 + 2 = 4.',
          'Thousands: 0 + 1 = 1.',
          'Result: 1488.'
        ],
        result: '1488'
      }
    ],
    practiceProblems: [
      { question: '23 × 12', answer: '276', hint: 'Units: 2×3=6. Tens: 2×2+3=7. Hundreds: 2.' },
      { question: '45 × 12', answer: '540', hint: 'Units: 2×5=10 (0 carry 1). Tens: 2×4+5+1=14. Left: 4+1=5.' },
      { question: '71 × 12', answer: '852', hint: 'Units: 2×1=2. Tens: 2×7+1=15 (carry 1). Left: 7+1=8.' },
      { question: '112 × 12', answer: '1344', hint: 'Step through from right to left.' }
    ]
  },
  {
    id: 'ch-3',
    chapterNumber: 3,
    title: 'Squaring Numbers Ending in 5 (Ekadhikena Method)',
    subtitle: 'Speed Rule: By One More than the Previous One.',
    writtenFormula: '(10a + 5)² = [ a × (a + 1) ] × 100 + 25',
    visualPattern: '[ a 5 ]²   ⟶   [ a × (a + 1) ]  _  [ 25 ]',
    rule: 'To square any number ending in 5: (1) Multiply the number preceding 5 (let it be a) by the next consecutive integer (a + 1). (2) Place 25 at the end. The answer is always [a × (a + 1)] followed by 25.',
    whyItWorks: '(10a + 5)² = 100a² + 100a + 25 = 100a(a + 1) + 25. The hundreds place is always a(a + 1) and the last two digits are unconditionally 25.',
    workedExamples: [
      {
        title: 'Worked Example 1: 35²',
        problem: '35²',
        steps: ['Preceding digit a = 3.', 'Multiply by next integer: 3 × (3 + 1) = 3 × 4 = 12.', 'Append 25: 1225.'],
        result: '1225'
      },
      {
        title: 'Worked Example 2: 75²',
        problem: '75²',
        steps: ['Preceding digit a = 7.', 'Multiply: 7 × 8 = 56.', 'Append 25: 5625.'],
        result: '5625'
      },
      {
        title: 'Worked Example 3: 105² (three-digit number)',
        problem: '105²',
        steps: ['Preceding part a = 10.', 'Multiply: 10 × 11 = 110.', 'Append 25: 11025.'],
        result: '11025'
      },
      {
        title: 'Worked Example 4: 115²',
        problem: '115²',
        steps: ['Preceding part a = 11.', 'Multiply: 11 × 12 = 132.', 'Append 25: 13225.'],
        result: '13225'
      }
    ],
    practiceProblems: [
      { question: '25²', answer: '625', hint: '2 × 3 = 6, append 25.' },
      { question: '45²', answer: '2025', hint: '4 × 5 = 20, append 25.' },
      { question: '65²', answer: '4225', hint: '6 × 7 = 42, append 25.' },
      { question: '85²', answer: '7225', hint: '8 × 9 = 72, append 25.' },
      { question: '95²', answer: '9025', hint: '9 × 10 = 90, append 25.' }
    ]
  },
  {
    id: 'ch-4',
    chapterNumber: 4,
    title: 'Multiplying Numbers with Same Tens Digit Whose Units Sum to 10',
    subtitle: 'Extension of Ekadhikena: Left part = a(a+1), Right part = b × c.',
    writtenFormula: '(10a + b)(10a + c) = [ a × (a + 1) ] × 100 + (b × c)   [where b + c = 10]',
    visualPattern: '[ a b ] × [ a c ]   ⟶   [ a × (a + 1) ]  _  [ b × c (2 digits) ]',
    rule: 'When two numbers have identical tens digits and their units digits add up to 10: (1) Left part = tens digit × (tens digit + 1). (2) Right part = product of units digits (always written as a 2-digit number, e.g., 1 × 9 = 09).',
    whyItWorks: '(10a + b)(10a + c) = 100a² + 10a(b + c) + bc. Since b + c = 10, this becomes 100a² + 10a(10) + bc = 100a(a + 1) + bc.',
    workedExamples: [
      {
        title: 'Worked Example 1: 43 × 47',
        problem: '43 × 47',
        steps: ['Check: Tens digits equal (4), units 3 + 7 = 10.', 'Left: 4 × (4 + 1) = 4 × 5 = 20.', 'Right: 3 × 7 = 21.', 'Combine: 2021.'],
        result: '2021'
      },
      {
        title: 'Worked Example 2: 72 × 78',
        problem: '72 × 78',
        steps: ['Tens = 7, units 2 + 8 = 10.', 'Left: 7 × 8 = 56.', 'Right: 2 × 8 = 16.', 'Combine: 5616.'],
        result: '5616'
      },
      {
        title: 'Worked Example 3: 81 × 89 (watch single digit product)',
        problem: '81 × 89',
        steps: ['Tens = 8, units 1 + 9 = 10.', 'Left: 8 × 9 = 72.', 'Right: 1 × 9 = 9 → write as two digits "09".', 'Combine: 7209.'],
        result: '7209'
      }
    ],
    practiceProblems: [
      { question: '34 × 36', answer: '1224', hint: '3 × 4 = 12, 4 × 6 = 24.' },
      { question: '52 × 58', answer: '3016', hint: '5 × 6 = 30, 2 × 8 = 16.' },
      { question: '61 × 69', answer: '4209', hint: '6 × 7 = 42, 1 × 9 = 09.' },
      { question: '93 × 97', answer: '9021', hint: '9 × 10 = 90, 3 × 7 = 21.' }
    ]
  },
  {
    id: 'ch-5',
    chapterNumber: 5,
    title: 'Multiplying Numbers Just Below 100 (Base Complement Method)',
    subtitle: 'Speed Rule: All from 9 and the Last from 10 — Base 100 subtraction.',
    writtenFormula: '(100 - d₁)(100 - d₂) = [ (100 - d₁) - d₂ ] × 100 + (d₁ × d₂)',
    visualPattern: 'N₁ (-d₁)  ×  N₂ (-d₂)   ⟶   [ N₁ - d₂ ]  |  [ d₁ × d₂ (2 digits) ]',
    rule: 'To multiply numbers slightly below 100: (1) Find deficits d₁ and d₂ from 100. (2) Left part = Cross-subtract: Number 1 - Deficit 2 (or Number 2 - Deficit 1). (3) Right part = Multiply deficits (d₁ × d₂), written as two digits.',
    whyItWorks: '(100 - d₁)(100 - d₂) = 10000 - 100(d₁ + d₂) + d₁d₂ = 100[100 - d₁ - d₂] + d₁d₂ = 100[N₁ - d₂] + d₁d₂.',
    workedExamples: [
      {
        title: 'Worked Example 1: 96 × 97',
        problem: '96 × 97',
        steps: [
          'Deficits: 96 is -4 below 100; 97 is -3 below 100.',
          'Left part: 96 - 3 = 93 (or 97 - 4 = 93).',
          'Right part: (-4) × (-3) = 12.',
          'Combine: 9312.'
        ],
        result: '9312'
      },
      {
        title: 'Worked Example 2: 94 × 98',
        problem: '94 × 98',
        steps: [
          'Deficits: -6 and -2.',
          'Left part: 94 - 2 = 92.',
          'Right part: (-6) × (-2) = 12.',
          'Result: 9212.'
        ],
        result: '9212'
      },
      {
        title: 'Worked Example 3: 88 × 98',
        problem: '88 × 98',
        steps: [
          'Deficits: -12 and -2.',
          'Left part: 88 - 2 = 86.',
          'Right part: (-12) × (-2) = 24.',
          'Result: 8624.'
        ],
        result: '8624'
      }
    ],
    practiceProblems: [
      { question: '95 × 95', answer: '9025', hint: 'Deficits: 5 and 5. 95 - 5 = 90; 5 × 5 = 25.' },
      { question: '93 × 96', answer: '8928', hint: 'Deficits: 7 and 4. 93 - 4 = 89; 7 × 4 = 28.' },
      { question: '91 × 97', answer: '8827', hint: 'Deficits: 9 and 3. 91 - 3 = 88; 9 × 3 = 27.' },
      { question: '89 × 98', answer: '8722', hint: 'Deficits: 11 and 2. 89 - 2 = 87; 11 × 2 = 22.' }
    ]
  },
  {
    id: 'ch-6',
    chapterNumber: 6,
    title: 'Multiplying Numbers Just Above 100',
    subtitle: 'Base Complement Method for positive surpluses above base 100.',
    writtenFormula: '(100 + s₁)(100 + s₂) = [ (100 + s₁) + s₂ ] × 100 + (s₁ × s₂)',
    visualPattern: 'N₁ (+s₁)  ×  N₂ (+s₂)   ⟶   [ N₁ + s₂ ]  |  [ s₁ × s₂ (2 digits) ]',
    rule: 'To multiply two numbers slightly above 100: (1) Find surpluses s₁ and s₂ above 100. (2) Left part = Cross-add: Number 1 + Surplus 2 (or Number 2 + Surplus 1). (3) Right part = Product of surpluses (s₁ × s₂), formatted as 2 digits.',
    whyItWorks: '(100 + s₁)(100 + s₂) = 10000 + 100(s₁ + s₂) + s₁s₂ = 100[100 + s₁ + s₂] + s₁s₂.',
    workedExamples: [
      {
        title: 'Worked Example 1: 104 × 107',
        problem: '104 × 107',
        steps: [
          'Surpluses: +4 and +7.',
          'Left part: 104 + 7 = 111 (or 107 + 4 = 111).',
          'Right part: 4 × 7 = 28.',
          'Result: 11128.'
        ],
        result: '11128'
      },
      {
        title: 'Worked Example 2: 102 × 106',
        problem: '102 × 106',
        steps: [
          'Surpluses: +2 and +6.',
          'Left part: 102 + 6 = 108.',
          'Right part: 2 × 6 = 12.',
          'Result: 10812.'
        ],
        result: '10812'
      },
      {
        title: 'Worked Example 3: 103 × 103',
        problem: '103 × 103',
        steps: [
          'Surpluses: +3 and +3.',
          'Left: 103 + 3 = 106.',
          'Right: 3 × 3 = 9 → 2 digits "09".',
          'Result: 10609.'
        ],
        result: '10609'
      }
    ],
    practiceProblems: [
      { question: '105 × 108', answer: '11340', hint: '105 + 8 = 113; 5 × 8 = 40.' },
      { question: '106 × 109', answer: '11554', hint: '106 + 9 = 115; 6 × 9 = 54.' },
      { question: '102 × 104', answer: '10608', hint: '102 + 4 = 106; 2 × 4 = 08.' },
      { question: '112 × 103', answer: '11536', hint: '112 + 3 = 115; 12 × 3 = 36.' }
    ]
  },
  {
    id: 'ch-7',
    chapterNumber: 7,
    title: 'Multiplying Numbers on Either Side of 100',
    subtitle: 'One surplus and one deficit around base 100.',
    writtenFormula: '(100 + s)(100 - d) = [ (100 + s - d) × 100 ] - (s × d)',
    visualPattern: '[ N₁ (+s) ]  ×  [ N₂ (-d) ]   ⟶   [ (N₁ - d)00 ]  -  [ s × d ]',
    rule: 'When one number is above 100 (+s) and one is below 100 (-d): (1) Left part = Number above 100 minus deficit (or number below plus surplus). (2) Append two zeros: Left × 100. (3) Subtract the product of surplus and deficit: (s × d).',
    whyItWorks: '(100 + s)(100 - d) = 10000 + 100(s - d) - sd = 100(100 + s - d) - sd.',
    workedExamples: [
      {
        title: 'Worked Example 1: 104 × 96',
        problem: '104 × 96',
        steps: [
          '104 is +4, 96 is -4.',
          'Combined base: 104 - 4 = 100 (or 96 + 4 = 100).',
          'Multiply by 100: 100 × 100 = 10000.',
          'Subtract product: 4 × 4 = 16.',
          '10000 - 16 = 9984.'
        ],
        result: '9984'
      },
      {
        title: 'Worked Example 2: 107 × 97',
        problem: '107 × 97',
        steps: [
          'Surplus: +7, Deficit: -3.',
          'Base: 107 - 3 = 104. Base hundreds: 10400.',
          'Subtract: 7 × 3 = 21.',
          '10400 - 21 = 10379.'
        ],
        result: '10379'
      }
    ],
    practiceProblems: [
      { question: '105 × 95', answer: '9975', hint: '105 - 5 = 100 → 10000 - 25 = 9975.' },
      { question: '106 × 98', answer: '10388', hint: '106 - 2 = 104 → 10400 - 12 = 10388.' },
      { question: '103 × 97', answer: '9991', hint: '103 - 3 = 100 → 10000 - 9 = 9991.' }
    ]
  },
  {
    id: 'ch-8',
    chapterNumber: 8,
    title: 'Criss-Cross Multiplication of Any 2-Digit Numbers',
    subtitle: 'Urdhva-Tiryagbhyam: Vertically and Crosswise calculation.',
    writtenFormula: '(10a + b)(10c + d) = [ a·c ]·100 + [ a·d + b·c ]·10 + [ b·d ]',
    visualPattern: '[ a b ] × [ c d ]   ⟶   (a·c)  |  (a·d + b·c)  |  (b·d)',
    rule: 'To multiply ANY two-digit numbers (ab × cd): (1) Multiply units vertically: b × d (keep units, carry tens). (2) Multiply crosswise and add: (a × d) + (b × c) + carry (keep units, carry tens). (3) Multiply tens vertically: (a × c) + carry.',
    whyItWorks: '(10a + b)(10c + d) = 100(ac) + 10(ad + bc) + bd. Standard algebraic expansion calculated right-to-left in a single mental sweep.',
    workedExamples: [
      {
        title: 'Worked Example 1: 23 × 14',
        problem: '23 × 14',
        steps: [
          'Step 1 (Vertical Right): 3 × 4 = 12. Write 2, carry 1.',
          'Step 2 (Crosswise): (2 × 4) + (3 × 1) + 1 = 8 + 3 + 1 = 12. Write 2, carry 1.',
          'Step 3 (Vertical Left): (2 × 1) + 1 = 3.',
          'Result: 322.'
        ],
        result: '322'
      },
      {
        title: 'Worked Example 2: 43 × 21',
        problem: '43 × 21',
        steps: [
          'Step 1: 3 × 1 = 3.',
          'Step 2: (4 × 1) + (3 × 2) = 4 + 6 = 10. Write 0, carry 1.',
          'Step 3: (4 × 2) + 1 = 8 + 1 = 9.',
          'Result: 903.'
        ],
        result: '903'
      },
      {
        title: 'Worked Example 3: 56 × 34',
        problem: '56 × 34',
        steps: [
          'Step 1: 6 × 4 = 24. Write 4, carry 2.',
          'Step 2: (5 × 4) + (6 × 3) + 2 = 20 + 18 + 2 = 40. Write 0, carry 4.',
          'Step 3: (5 × 3) + 4 = 15 + 4 = 19.',
          'Result: 1904.'
        ],
        result: '1904'
      }
    ],
    practiceProblems: [
      { question: '31 × 22', answer: '682', hint: '1×2=2; 3×2+1×2=8; 3×2=6 → 682.' },
      { question: '42 × 31', answer: '1302', hint: '2×1=2; 4×1+2×3=10 (0 carry 1); 4×3+1=13.' },
      { question: '52 × 24', answer: '1248', hint: 'Follow the 3 criss-cross steps.' }
    ]
  },
  {
    id: 'ch-9',
    chapterNumber: 9,
    title: 'Rapid Division by 9 (Paravartya Method)',
    subtitle: 'Transpose and Apply: Division without dividing.',
    writtenFormula: 'Quotient digits = Cumulative prefix sums of dividend digits',
    visualPattern: 'd₁ d₂ d₃ ÷ 9   ⟶   Q = d₁ , (d₁ + d₂) ;   Remainder = (d₁ + d₂ + d₃)',
    rule: 'To divide by 9: (1) First quotient digit = First digit of dividend. (2) Each subsequent quotient digit = Previous quotient digit + next digit of dividend. (3) The remainder = Final sum of all digits. If remainder ≥ 9, adjust quotient.',
    whyItWorks: 'Since 10 ≡ 1 (mod 9), 100 ≡ 1 (mod 9), 10^k ≡ 1 (mod 9). Every place value can be represented as multiples of 9 plus the digit itself.',
    workedExamples: [
      {
        title: 'Worked Example 1: 123 ÷ 9',
        problem: '123 ÷ 9',
        steps: [
          'First quotient digit: 1.',
          'Second quotient digit: 1 + 2 = 3. Quotient = 13.',
          'Remainder: 3 + 3 = 6.',
          'Answer: 13 with remainder 6 (13 6/9 = 13.666...).'
        ],
        result: '13 R 6'
      },
      {
        title: 'Worked Example 2: 2131 ÷ 9',
        problem: '2131 ÷ 9',
        steps: [
          'Q1 = 2.',
          'Q2 = 2 + 1 = 3.',
          'Q3 = 3 + 3 = 6.',
          'Remainder = 6 + 1 = 7.',
          'Answer: 236 with remainder 7.'
        ],
        result: '236 R 7'
      }
    ],
    practiceProblems: [
      { question: '132 ÷ 9', answer: '14 R 6', hint: 'Q: 1, (1+3=4) → 14. Remainder: 4+2 = 6.' },
      { question: '221 ÷ 9', answer: '24 R 5', hint: 'Q: 2, (2+2=4) → 24. Remainder: 4+1 = 5.' },
      { question: '312 ÷ 9', answer: '34 R 6', hint: 'Q: 3, (3+1=4) → 34. Remainder: 4+2 = 6.' }
    ]
  },
  {
    id: 'ch-10',
    chapterNumber: 10,
    title: 'Rapid Percentage Calculations (10%, 5%, 1% Split & Add)',
    subtitle: 'Calculate any percentage mentally in under 5 seconds without pen and paper.',
    writtenFormula: 'X% of N = Σ (Standard Benchmarks: 50%, 25%, 10%, 5%, 1%)',
    visualPattern: '10% = Shift 1 decimal   |   1% = Shift 2 decimals   |   5% = Half of 10%',
    rule: 'Deconstruct arbitrary percentages into elementary building blocks: (1) 10% = Move decimal left 1 place. (2) 5% = Half of 10%. (3) 1% = Move decimal left 2 places. (4) 20% = Double of 10%. Combine and sum mentally.',
    whyItWorks: 'Percentages are linear functions: f(a + b) = f(a) + f(b). 15% of N = 10%(N) + 5%(N).',
    workedExamples: [
      {
        title: 'Worked Example 1: 15% of 240',
        problem: '15% of 240',
        steps: [
          '10% of 240 = 24.',
          '5% of 240 = half of 24 = 12.',
          '15% = 24 + 12 = 36.'
        ],
        result: '36'
      },
      {
        title: 'Worked Example 2: 35% of 420',
        problem: '35% of 420',
        steps: [
          '10% of 420 = 42.',
          '30% = 3 × 42 = 126.',
          '5% = half of 42 = 21.',
          '35% = 126 + 21 = 147.'
        ],
        result: '147'
      },
      {
        title: 'Worked Example 3: 18% of 250',
        problem: '18% of 250',
        steps: [
          'Reversible percentage principle: 18% of 250 = 250% of 18.',
          '200% of 18 = 36.',
          '50% of 18 = 9.',
          'Total = 36 + 9 = 45.'
        ],
        result: '45'
      }
    ],
    practiceProblems: [
      { question: '15% of 180', answer: '27', hint: '10% = 18, 5% = 9. 18 + 9 = 27.' },
      { question: '25% of 360', answer: '90', hint: 'Divide by 4.' },
      { question: '12% of 400', answer: '48', hint: '10% = 40, 1% = 4. 40 + 8 = 48.' },
      { question: '45% of 200', answer: '90', hint: '50% = 100, 5% = 10. 100 - 10 = 90.' }
    ]
  },
  {
    id: 'ch-11',
    chapterNumber: 11,
    title: 'Squaring Any 2-Digit Number (Algebraic Identity Method)',
    subtitle: '(a + b)² = a² + 2ab + b² computed left-to-right or right-to-left.',
    writtenFormula: '(10a + b)² = 100a² + 20ab + b²',
    visualPattern: '[ a b ]²   ⟶   a²  |  (2 × a × b)  |  b²',
    rule: 'To square any 2-digit number ab: (1) Units = b² (write unit digit, carry tens). (2) Tens = 2 × a × b + carry (write unit, carry tens). (3) Hundreds = a² + carry.',
    whyItWorks: '(10a + b)² = 100a² + 20ab + b². This directly maps to the place values in base 10.',
    workedExamples: [
      {
        title: 'Worked Example 1: 43²',
        problem: '43²',
        steps: [
          'b² = 3² = 9.',
          '2ab = 2 × 4 × 3 = 24. Write 4, carry 2.',
          'a² + carry = 4² + 2 = 16 + 2 = 18.',
          'Result: 1849.'
        ],
        result: '1849'
      },
      {
        title: 'Worked Example 2: 67²',
        problem: '67²',
        steps: [
          '7² = 49. Write 9, carry 4.',
          '2 × 6 × 7 + 4 = 84 + 4 = 88. Write 8, carry 8.',
          '6² + 8 = 36 + 8 = 44.',
          'Result: 4489.'
        ],
        result: '4489'
      }
    ],
    practiceProblems: [
      { question: '32²', answer: '1024', hint: '2²=4; 2×3×2=12 (2 carry 1); 3²+1=10.' },
      { question: '51²', answer: '2601', hint: '1²=1; 2×5×1=10 (0 carry 1); 5²+1=26.' },
      { question: '73²', answer: '5329', hint: '3²=9; 2×7×3=42 (2 carry 4); 7²+4=53.' }
    ]
  },
  {
    id: 'ch-12',
    chapterNumber: 12,
    title: 'Rapid Multiplication by 25 and 50',
    subtitle: 'Fractional base conversion: Multiply by 100 and divide by 4 or 2.',
    writtenFormula: 'N × 25 = (N × 100) ÷ 4   |   N × 50 = (N × 100) ÷ 2',
    visualPattern: 'N × 25   ⟶   (N ÷ 4) × 100',
    rule: 'To multiply any number by 25: Divide the number by 4, then multiply by 100. If there is a remainder: remainder 1 → append 25; remainder 2 → append 50; remainder 3 → append 75. For 50: Halve the number and append 00 (or shift decimal).',
    whyItWorks: '25 = 100 / 4 and 50 = 100 / 2. Division by 4 is two consecutive divisions by 2.',
    workedExamples: [
      {
        title: 'Worked Example 1: 48 × 25',
        problem: '48 × 25',
        steps: ['48 ÷ 4 = 12 (no remainder).', 'Append 00: 1200.'],
        result: '1200'
      },
      {
        title: 'Worked Example 2: 73 × 25',
        problem: '73 × 25',
        steps: ['73 ÷ 4 = 18 with remainder 1.', 'Quotient is 18, remainder 1 gives 25.', 'Result: 1825.'],
        result: '1825'
      },
      {
        title: 'Worked Example 3: 86 × 50',
        problem: '86 × 50',
        steps: ['86 ÷ 2 = 43.', 'Append 00: 4300.'],
        result: '4300'
      }
    ],
    practiceProblems: [
      { question: '36 × 25', answer: '900', hint: '36 ÷ 4 = 9 → 900.' },
      { question: '64 × 25', answer: '1600', hint: '64 ÷ 4 = 16 → 1600.' },
      { question: '58 × 50', answer: '2900', hint: 'Half of 58 is 29 → 2900.' },
      { question: '85 × 25', answer: '2125', hint: '85 ÷ 4 = 21 R 1 → 2125.' }
    ]
  },
  {
    id: 'ch-13',
    chapterNumber: 13,
    title: 'Subtraction from Base Numbers (All from 9, Last from 10)',
    subtitle: 'Base Complement Method: Subtracting numbers from 1,000, 10,000, or 100,000 in one step.',
    writtenFormula: '10^k - N = Subtract every digit from 9, and the last non-zero digit from 10',
    visualPattern: '1000 - abc   ⟶   (9 - a)  |  (9 - b)  |  (10 - c)',
    rule: 'To subtract any number from 1,000, 10,000, or any power of 10: (1) Subtract each digit from 9 going left to right. (2) Subtract the final units digit from 10. No borrowing required!',
    whyItWorks: '1000 - N = (999 + 1) - N = (999 - N) + 1. Since 999 - abc never involves any borrow (each digit ≤ 9), we simply complement against 9 and add 1 to the end.',
    workedExamples: [
      {
        title: 'Worked Example 1: 1000 - 357',
        problem: '1000 - 357',
        steps: [
          'From 9: 9 - 3 = 6.',
          'From 9: 9 - 5 = 4.',
          'From 10: 10 - 7 = 3.',
          'Result: 643.'
        ],
        result: '643'
      },
      {
        title: 'Worked Example 2: 10,000 - 4,826',
        problem: '10000 - 4826',
        steps: [
          '9 - 4 = 5.',
          '9 - 8 = 1.',
          '9 - 2 = 7.',
          '10 - 6 = 4.',
          'Result: 5174.'
        ],
        result: '5174'
      }
    ],
    practiceProblems: [
      { question: '1000 - 468', answer: '532', hint: '9-4=5, 9-6=3, 10-8=2.' },
      { question: '1000 - 729', answer: '271', hint: '9-7=2, 9-2=7, 10-9=1.' },
      { question: '10000 - 3456', answer: '6544', hint: '9-3=6, 9-4=5, 9-5=4, 10-6=4.' }
    ]
  },
  {
    id: 'ch-14',
    chapterNumber: 14,
    title: 'Fast Fractions: Cross-Multiplication for Adding & Comparing',
    subtitle: 'Add, subtract, or compare fractions without computing LCD.',
    writtenFormula: 'a/b + c/d = (ad + bc) ÷ (bd)   |   Compare: a/b > c/d ⟺ ad > bc',
    visualPattern: 'a/b  +  c/d   ⟶   [ (a × d) + (b × c) ]  ÷  [ b × d ]',
    rule: 'To add two fractions a/b and c/d: Numerator = (a × d) + (b × c). Denominator = (b × d). To compare which is larger: Compare (a × d) with (b × c). If ad > bc, then a/b > c/d.',
    whyItWorks: 'Finding a common denominator bd scales a/b to ad/bd and c/d to bc/bd. Cross-multiplication checks the numerators directly.',
    workedExamples: [
      {
        title: 'Worked Example 1: Compare 4/7 vs 5/9',
        problem: 'Compare 4/7 and 5/9',
        steps: [
          'Cross-multiply: 4 × 9 = 36.',
          'Other cross: 7 × 5 = 35.',
          'Since 36 > 35, 4/7 > 5/9.'
        ],
        result: '4/7 > 5/9'
      },
      {
        title: 'Worked Example 2: 3/5 + 2/7',
        problem: '3/5 + 2/7',
        steps: [
          'Numerator = (3 × 7) + (5 × 2) = 21 + 10 = 31.',
          'Denominator = 5 × 7 = 35.',
          'Result: 31/35.'
        ],
        result: '31/35'
      }
    ],
    practiceProblems: [
      { question: 'Compare 5/8 and 7/11 (Enter > or <)', answer: '5/8 < 7/11', hint: '5×11 = 55 vs 8×7 = 56. 55 < 56.' },
      { question: '1/3 + 2/5', answer: '11/15', hint: '(1×5 + 3×2)/(3×5) = 11/15.' },
      { question: '4/5 - 2/3', answer: '2/15', hint: '(4×3 - 5×2)/(5×3) = 2/15.' }
    ]
  },
  {
    id: 'ch-15',
    chapterNumber: 15,
    title: 'Rapid Unit Conversions for Engineering & Aptitude',
    subtitle: 'Instant mental conversions for Speed, Time, and Distance problems.',
    writtenFormula: 'km/h ⟶ m/s : Multiply by 5/18   |   m/s ⟶ km/h : Multiply by 18/5',
    visualPattern: 'Speed (m/s) = Speed (km/h) × [ 5 ÷ 18 ]',
    rule: 'To convert km/h to m/s: Multiply by 5/18 (divide by 18, multiply by 5). Benchmark table: 18 km/h = 5 m/s, 36 km/h = 10 m/s, 54 km/h = 15 m/s, 72 km/h = 20 m/s, 90 km/h = 25 m/s. To reverse (m/s to km/h), multiply by 18/5.',
    whyItWorks: '1 km = 1,000 m and 1 hour = 3,600 seconds. Ratio = 1000 / 3600 = 10 / 36 = 5 / 18.',
    workedExamples: [
      {
        title: 'Worked Example 1: Convert 72 km/h to m/s',
        problem: '72 km/h to m/s',
        steps: [
          'Formula: 72 × (5/18).',
          'Divide by 18: 72 ÷ 18 = 4.',
          'Multiply by 5: 4 × 5 = 20 m/s.'
        ],
        result: '20 m/s'
      },
      {
        title: 'Worked Example 2: Convert 25 m/s to km/h',
        problem: '25 m/s to km/h',
        steps: [
          'Formula: 25 × (18/5).',
          'Divide by 5: 25 ÷ 5 = 5.',
          'Multiply by 18: 5 × 18 = 90 km/h.'
        ],
        result: '90 km/h'
      },
      {
        title: 'Worked Example 3: Convert 108 km/h to m/s',
        problem: '108 km/h to m/s',
        steps: [
          '108 ÷ 18 = 6.',
          '6 × 5 = 30 m/s.'
        ],
        result: '30 m/s'
      }
    ],
    practiceProblems: [
      { question: '54 km/h to m/s', answer: '15 m/s', hint: '54 ÷ 18 = 3; 3 × 5 = 15.' },
      { question: '90 km/h to m/s', answer: '25 m/s', hint: '90 ÷ 18 = 5; 5 × 5 = 25.' },
      { question: '15 m/s to km/h', answer: '54 km/h', hint: '15 ÷ 5 = 3; 3 × 18 = 54.' },
      { question: '36 km/h to m/s', answer: '10 m/s', hint: '36 ÷ 18 = 2; 2 × 5 = 10.' }
    ]
  }
];
