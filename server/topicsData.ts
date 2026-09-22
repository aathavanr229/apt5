import { Topic } from '../src/types.js';

export const COMPREHENSIVE_TOPICS: Topic[] = [
  // ==========================================
  // QUANTITATIVE APTITUDE
  // ==========================================
  {
    id: 'topic-percentages',
    subjectId: 'subj-aptitude',
    name: 'Percentages',
    category: 'quantitative',
    syllabusUnit: 'Unit I: Basics of Percentages, Conversions, and Successive Changes',
    learningOutcomes: 'Understand core concepts of percentages, express fractions as percentages, calculate successive percentage changes, and apply rapid mental split tricks.',
    summary: 'Percentages represent numbers as fractions of 100. Standardized comparison scale across recruitment exams, financial evaluation, growth calculations, and statistical problem sets.',
    formulas: [
      {
        name: 'Percentage Representation',
        formula: 'P% = (Part / Whole) × 100',
        note: 'Determines what percentage of the Whole is represented by the Part.'
      },
      {
        name: 'Percentage Increase / Decrease',
        formula: 'New Value = Original × (1 ± R / 100)',
        note: 'Use (+) for percentage gain/increase, (-) for reduction/decrease.'
      },
      {
        name: 'Successive Percentage Change',
        formula: 'Net Change% = A + B + (A × B) / 100',
        note: 'Apply algebraic signs: positive for growth, negative for decline.'
      },
      {
        name: 'Expenditure Invariance',
        formula: 'Consumption Reduction% = (P / (100 + P)) × 100',
        note: 'When price rises by P% and total budget remains constant.'
      }
    ],
    formulaCount: 4,
    speedShortcuts: [
      {
        method: 'Base Deviation & Mental Splitting',
        title: 'Percentage 10% / 1% Anchor Split Trick',
        rule: 'Any percentage can be evaluated mentally by splitting into 50%, 25%, 10%, 5%, and 1% building blocks without column multiplication.',
        example: 'Calculate 64% of 450: 50% of 450 = 225, 10% = 45, 1% = 4.5 -> 4% = 18. Total = 225 + 45 + 18 = 288.',
        mentalStep: 'Shift decimal left by 1 place for 10% (45), halve it for 5% (22.5), shift left by 2 places for 1% (4.5).'
      },
      {
        method: 'Antyayordashake Reversal',
        title: 'Reversibility Rule: X% of Y = Y% of X',
        rule: 'Since (X × Y)/100 = (Y × X)/100, interchange the percentage and the number to compute mentally on simpler numbers.',
        example: 'Calculate 16% of 25: Flip to 25% of 16. 25% is 1/4th, so 16 / 4 = 4 instantly.',
        mentalStep: 'Whenever you see an awkward percent with a friendly number (25, 50, 20, 75), flip them immediately.'
      },
      {
        method: 'Fraction-Percentage Speed Ladder',
        title: 'Reciprocal Fraction Ladder Mastery',
        rule: 'Instant substitution of fractions: 1/2=50%, 1/3=33.3%, 1/4=25%, 1/5=20%, 1/6=16.67%, 1/7=14.28%, 1/8=12.5%, 1/9=11.11%, 1/11=9.09%, 1/12=8.33%.',
        example: 'Find 37.5% of 640: Recognize 37.5% = 3 × 12.5% = 3/8. So (3/8) × 640 = 3 × 80 = 240.',
        mentalStep: 'Convert the decimal percent into its base mental fraction, divide by denominator and multiply by numerator.'
      }
    ],
    comparisons: [
      {
        relatedTopicName: 'Ratio & Proportion',
        keyDifference: 'Percentages standardize comparisons to a fixed denominator base of 100, while Ratios express relative proportion between independent integer quantities.',
        points: [
          { feature: 'Denominator Base', topicA: 'Fixed to 100 (e.g. 25%)', topicB: 'Dynamic integer parts (e.g. 1:4)' },
          { feature: 'Multi-slice Partition', topicA: 'Single relative share of total 100%', topicB: 'Partitions across 3+ entities (A:B:C)' }
        ]
      }
    ]
  },
  {
    id: 'topic-profit-loss',
    subjectId: 'subj-aptitude',
    name: 'Profit & Loss',
    category: 'quantitative',
    syllabusUnit: 'Unit II: Cost Price, Selling Price, Marked Price, and Discounts',
    learningOutcomes: 'Master trade margins, understand markup and cash discounts, calculate successive discount chains, and identify false-weight tricks.',
    summary: 'Core commercial mathematics. Evaluates financial transactions. Profit arises when SP > CP, Loss when CP > SP. Discounts are calculated on Marked Price (MP).',
    formulas: [
      {
        name: 'Profit / Loss Percentage',
        formula: 'Profit% = ((SP - CP) / CP) × 100 | Loss% = ((CP - SP) / CP) × 100',
        note: 'Cost Price (CP) is always the authoritative baseline denominator.'
      },
      {
        name: 'Marked Price & Discount',
        formula: 'SP = MP × (1 - Discount% / 100)',
        note: 'Discount is applied exclusively on Marked Price.'
      },
      {
        name: 'Successive Discounts',
        formula: 'Effective Discount% = d1 + d2 - (d1 × d2) / 100',
        note: 'For two consecutive commercial discounts d1% and d2%.'
      },
      {
        name: 'Dishonest Shopkeeper / Faulty Weight',
        formula: 'Gain% = (Error / (True Value - Error)) × 100',
        note: 'Example: using 900g instead of 1000g yields Error = 100g.'
      }
    ],
    formulaCount: 4,
    speedShortcuts: [
      {
        method: 'Ekadhikena Fraction Multiplier',
        title: 'Multiplying Factor (MF) Rapid Conversion',
        rule: 'Do not use traditional 3-line formulas. Convert profit/loss directly into a decimal or fractional multiplier on CP.',
        example: '25% profit means SP = 1.25 × CP = (5/4) × CP. If SP = ₹750, CP = 750 × (4/5) = ₹600.',
        mentalStep: 'Add profit fraction to 1 (1 + 1/4 = 5/4). To get CP from SP, multiply SP by reciprocal (4/5).'
      },
      {
        method: 'Successive Discount Netting',
        title: 'Consecutive Discount Net Shortcut',
        rule: 'Net discount of A% and B% is (A + B) - (A×B/100).',
        example: 'Two discounts of 20% and 10%: Net = 20 + 10 - (200/100) = 30 - 2 = 28%.',
        mentalStep: 'Add both numbers, subtract the product of their tens digits.'
      },
      {
        method: 'Equal SP Profit-Loss Neutralization',
        title: 'Identical Selling Price Equal Gain & Loss Loss Rule',
        rule: 'When two items are sold at the same SP, one at X% profit and the other at X% loss, the transaction ALWAYS results in a net loss of (X / 10)^2 %.',
        example: 'Two watches sold for ₹990 each, one at 10% gain and other at 10% loss: Net Loss = (10/10)² = 1% loss. Always loss, never break-even!',
        mentalStep: 'Divide the shared percent by 10 and square it to get the net loss percentage.'
      }
    ]
  },
  {
    id: 'topic-ratios',
    subjectId: 'subj-aptitude',
    name: 'Ratio & Proportion',
    category: 'quantitative',
    syllabusUnit: 'Unit I: Direct, Inverse, and Compound Proportions',
    learningOutcomes: 'Solve multi-variable proportional splits, calculate continuous ratios (A:B:C:D), and model joint variations.',
    summary: 'Ratios compare quantities of identical physical dimensions. Proportions equate two ratios. Crucial for partnership investments, scale drawings, and recipe mixtures.',
    formulas: [
      {
        name: 'Ratio Partitioning',
        formula: 'Share of A = (a / (a + b + ...)) × Total',
        note: 'Divides a sum among entities in designated ratio.'
      },
      {
        name: 'Direct & Inverse Proportion',
        formula: 'Direct: x1/y1 = x2/y2 | Inverse: x1 × y1 = x2 × y2',
        note: 'Direct maintains ratio; inverse maintains product.'
      },
      {
        name: 'Mean Proportional',
        formula: 'Mean Proportional = √(a × b)',
        note: 'Geometric mean between numbers a and b.'
      }
    ],
    formulaCount: 3,
    speedShortcuts: [
      {
        method: 'Urdhva Tiryagbhyam Ratio Bridging',
        title: 'N-Shape Bridge for Combining Ratios (A:B and B:C -> A:B:C)',
        rule: 'Place A:B above B:C. Multiply vertically down (A×B), cross (B×B), and vertically down (B×C).',
        example: 'If A:B = 2:3 and B:C = 4:5: A = 2×4 = 8, B = 3×4 = 12, C = 3×5 = 15 -> A:B:C = 8:12:15.',
        mentalStep: 'Draw an inverted N: Left vertical product, diagonal product, right vertical product.'
      },
      {
        method: 'Anurupyena Constant Proportion',
        title: 'Difference Invariance in Age Ratios',
        rule: 'When the same quantity is added to both terms of a ratio, the absolute difference between the individuals remains unchanged.',
        example: 'A and B present age ratio 3:4. In 5 years, ratio becomes 4:5. The step change is 1 part = 5 years. Present ages: 3×5=15 and 4×5=20.',
        mentalStep: 'Equalize unit differences between numerator and denominator to map 1 ratio unit to real years.'
      }
    ]
  },
  {
    id: 'topic-averages',
    subjectId: 'subj-aptitude',
    name: 'Averages',
    category: 'quantitative',
    syllabusUnit: 'Unit II: Arithmetic Mean, Weighted Averages, and Deviation Method',
    learningOutcomes: 'Compute arithmetic averages, apply assumed mean / deviation method, and solve replacement problem shifts.',
    summary: 'Measures central tendency. Represents the equal distribution of a combined sum across all members of a group.',
    formulas: [
      {
        name: 'Arithmetic Mean',
        formula: 'Average = Sum of Observations / Count',
        note: 'Fundamental definition of central value.'
      },
      {
        name: 'Weighted Average',
        formula: 'Weighted Avg = (w1×x1 + w2×x2) / (w1 + w2)',
        note: 'Used when combining groups of unequal size.'
      },
      {
        name: 'Net Deviation Law',
        formula: 'Σ (x_i - Assumed_Mean) = Net Deviation',
        note: 'True Average = Assumed Mean + (Net Deviation / N).'
      }
    ],
    formulaCount: 3,
    speedShortcuts: [
      {
        method: 'Net Deviation Method',
        title: 'Assumed Mean Deviation Method',
        rule: 'Never add large numbers to divide by N. Pick a round reference number, calculate deviations (+ or -), sum deviations and divide by count.',
        example: 'Find average of 88, 92, 95, 87, 98: Pick 90 as assumed mean. Deviations: -2, +2, +5, -3, +8 = +10. Add 10/5 = +2. True average = 90 + 2 = 92.',
        mentalStep: 'Sums of small deviations (-2 to +8) take 2 seconds, eliminating 3-digit long division.'
      },
      {
        method: 'Replacement Shift Trick',
        title: 'Replacement Value = Excluded ± (Count × ΔAvg)',
        rule: 'When a new member replaces an existing member, the difference is strictly the group size multiplied by the change in average.',
        example: 'Average weight of 10 students increases by 1.5 kg when a 40 kg student is replaced: New student = 40 + (10 × 1.5) = 40 + 15 = 55 kg.',
        mentalStep: 'Multiply count by average shift and add/subtract from old value in one mental operation.'
      }
    ]
  },
  {
    id: 'topic-time-work',
    subjectId: 'subj-aptitude',
    name: 'Time & Work',
    category: 'quantitative',
    syllabusUnit: 'Unit III: Efficiency Models, Alternative Days, and Man-Days Equivalence',
    learningOutcomes: 'Model combined work rates using LCM units, evaluate worker efficiencies, and resolve alternative-day schedules.',
    summary: 'Examines inverse relationship between worker efficiency and completion time. Core question category for IT placement and GATE.',
    formulas: [
      {
        name: 'Combined Rate',
        formula: '1 / T_total = 1 / T_A + 1 / T_B',
        note: 'T_total = (T_A × T_B) / (T_A + T_B).'
      },
      {
        name: 'Man-Days Equivalence',
        formula: '(M1 × D1 × H1 × E1) / W1 = (M2 × D2 × H2 × E2) / W2',
        note: 'Where M=Men, D=Days, H=Hours/day, E=Efficiency, W=Work completed.'
      }
    ],
    formulaCount: 2,
    speedShortcuts: [
      {
        method: 'LCM Total Capacity Unit Method',
        title: 'Total Work Unit Shortcut',
        rule: 'Never use fractions (1/A + 1/B). Assume Total Work = LCM of individual times. Find daily unit capacity of each worker.',
        example: 'A completes work in 12 days, B in 15 days. LCM(12, 15) = 60 units. Daily work: A = 60/12 = 5 units/day, B = 60/15 = 4 units/day. Together = 9 units/day. Time = 60/9 = 6.67 days.',
        mentalStep: 'Integer addition (5 + 4 = 9) is 10x faster and error-free compared to fraction addition.'
      },
      {
        method: 'Alternative Day Cycle Grouping',
        title: 'Cycle Block Method for Alternate Day Work',
        rule: 'Pair two consecutive days into a single 2-day work cycle block.',
        example: 'A (5 units/day) and B (4 units/day) work alternately on 60 units. 2-day cycle = 5 + 4 = 9 units. 6 cycles = 12 days = 54 units. Day 13: A finishes remaining 6 units in 6/5 days.',
        mentalStep: 'Divide total units by cycle units to get completed full periods before tackling remainder.'
      }
    ]
  },
  {
    id: 'topic-pipes-cisterns',
    subjectId: 'subj-aptitude',
    name: 'Pipes & Cisterns',
    category: 'quantitative',
    syllabusUnit: 'Unit III: Fluid Dynamics, Inlets, Outlets, and Tank Leakages',
    learningOutcomes: 'Calculate filling and emptying rates, handle leak drains, and model intermittent valve scheduling.',
    summary: 'Fluid variant of Time & Work. Inlets perform positive work (+rate), while emptying drains and leaks perform negative work (-rate).',
    formulas: [
      {
        name: 'Net Rate of Filling',
        formula: 'Net Rate = 1/T_inlet1 + 1/T_inlet2 - 1/T_outlet',
        note: 'If positive, tank fills; if negative, tank empties.'
      },
      {
        name: 'Leak Time Formula',
        formula: 'Time to Empty = (T_fill_with_leak × T_fill_normal) / (T_fill_with_leak - T_fill_normal)',
        note: 'Derived from rate differences.'
      }
    ],
    formulaCount: 2,
    speedShortcuts: [
      {
        method: 'Signed LCM Tank Capacity Shortcut',
        title: 'Signed Integer Tank Units Method',
        rule: 'Assign positive units (+ve) to inlet taps and negative units (-ve) to outlet leaks based on LCM capacity.',
        example: 'Pipe A fills in 10h, Pipe B in 15h, Pipe C empties in 20h. Capacity = LCM(10, 15, 20) = 60L. A = +6 L/h, B = +4 L/h, C = -3 L/h. Net rate = +6 + 4 - 3 = +7 L/h. Time = 60/7 = 8.57 hours.',
        mentalStep: 'Simply add signed integers: +6 + 4 - 3 = 7. Divide total capacity 60 by 7.'
      }
    ]
  },
  {
    id: 'topic-time-speed-distance',
    subjectId: 'subj-aptitude',
    name: 'Time, Speed & Distance',
    category: 'quantitative',
    syllabusUnit: 'Unit III: Linear Motion, Relative Velocity, and Average Speed',
    learningOutcomes: 'Master unit conversions, relative speed in identical vs opposite directions, and harmonic average speeds.',
    summary: 'Translational motion dynamics. Relates distance, speed, and time. Crucial for train pacing, police-thief chases, and race track problems.',
    formulas: [
      {
        name: 'Core Relation',
        formula: 'Distance = Speed × Time',
        note: 'Maintain uniform metric units.'
      },
      {
        name: 'Average Speed (Equal Distances)',
        formula: 'S_avg = (2 × S1 × S2) / (S1 + S2)',
        note: 'Harmonic mean of two journey speeds.'
      },
      {
        name: 'Relative Speed',
        formula: 'Opposite: S1 + S2 | Same: |S1 - S2|',
        note: 'Opposite directions sum; same directions subtract.'
      }
    ],
    formulaCount: 3,
    speedShortcuts: [
      {
        method: '18:5 Ratio Ladder for km/h to m/s',
        title: '18-Table Multiples Speed Ladder',
        rule: 'Every 18 km/h is exactly equal to 5 m/s. Never multiply by 5/18 on paper!',
        example: '36 km/h = 10 m/s; 54 km/h = 15 m/s; 72 km/h = 20 m/s; 90 km/h = 25 m/s; 108 km/h = 30 m/s.',
        mentalStep: 'Divide km/h by 18 and multiply by 5. For 90 km/h: 90 / 18 = 5 -> 5 × 5 = 25 m/s in 1 second.'
      },
      {
        method: 'Inverse Ratio Distance Shortcut',
        title: 'Speed-Time Inverse Ratio Swap',
        rule: 'When distance is constant, Speed Ratio (S1 : S2) is strictly inversely proportional to Time Ratio (T2 : T1).',
        example: 'Walking at 3/4th of regular speed, a person is 15 minutes late. Speed ratio = 3:4, so Time ratio = 4:3. Difference is 1 unit = 15 mins. Regular time = 3 units = 45 mins.',
        mentalStep: 'Invert the fraction: 3/4 speed means 4/3 time. Extra 1/3rd time = 15 mins -> Original time = 3 × 15 = 45 mins.'
      }
    ]
  },
  {
    id: 'topic-trains',
    subjectId: 'subj-aptitude',
    name: 'Problems on Trains (100 Questions Official Module)',
    category: 'quantitative',
    syllabusUnit: 'Unit III: Train Problems - Official 100 Questions Bank across 10 Rules',
    learningOutcomes: 'Master all 10 standard rules of train problems: Unit Conversions, Point Objects, Extended Objects, Train & Moving Person, Two Trains, Man Inside Train, Meeting Point Formula, and Stoppages Exclusion.',
    summary: 'Official 100-question comprehensive numerical module. Live assessments draw strictly from this verified 100-question PDF repository with exact formulas, options, and step-by-step solutions.',
    formulas: [
      {
        name: 'Rule 1: Unit Conversion (km/h <-> m/s)',
        formula: 'S (m/s) = S (km/h) × (5 / 18) | S (km/h) = S (m/s) × (18 / 5)',
        note: 'Every 18 km/h equals exactly 5 m/s (e.g. 54 km/h = 15 m/s, 72 km/h = 20 m/s, 90 km/h = 25 m/s, 108 km/h = 30 m/s).'
      },
      {
        name: 'Rule 2: Crossing Stationary Point Object (Pole / Tree / Standing Person)',
        formula: 'Time = Length_Train / Speed',
        note: 'Point objects have negligible length (Length = 0).'
      },
      {
        name: 'Rule 3: Crossing Extended Stationary Object (Platform / Bridge / Tunnel)',
        formula: 'Time = (Length_Train + Length_Platform) / Speed',
        note: 'Total distance traversed is the sum of train length and platform length.'
      },
      {
        name: 'Rule 4: Train & Moving Person (Same Direction)',
        formula: 'Relative Speed = Speed_Train - Speed_Person | Time = Length_Train / Relative_Speed',
        note: 'Speeds subtract when moving in the same direction.'
      },
      {
        name: 'Rule 5: Train & Moving Person (Opposite Direction)',
        formula: 'Relative Speed = Speed_Train + Speed_Person | Time = Length_Train / Relative_Speed',
        note: 'Speeds add when moving in opposite directions.'
      },
      {
        name: 'Rule 6: Two Trains Moving in Opposite Directions',
        formula: 'Time = (Length_1 + Length_2) / (Speed_1 + Speed_2)',
        note: 'Total distance is Length_1 + Length_2; speeds add.'
      },
      {
        name: 'Rule 7: Two Trains Moving in Same Direction (Overtaking)',
        formula: 'Time = (Length_1 + Length_2) / (Speed_1 - Speed_2)',
        note: 'Total distance is Length_1 + Length_2; faster speed minus slower speed.'
      },
      {
        name: 'Rule 8: Man Sitting Inside a Moving Train',
        formula: 'Time = Length_Passing_Train / (Speed_1 ± Speed_2)',
        note: 'Distance is ONLY the length of the passing/overtaking train, NOT both trains!'
      },
      {
        name: 'Rule 9: Meeting Point Ratio Formula',
        formula: 'Speed_A / Speed_B = √(Time_B / Time_A)',
        note: 'When two trains start simultaneously from A & B towards each other, after crossing their speeds are inversely proportional to square root of times.'
      },
      {
        name: 'Rule 10: Stoppages Exclusion Formula',
        formula: 'Stoppage Time (min/hr) = [(Speed_Without_Stoppage - Speed_With_Stoppage) / Speed_Without_Stoppage] × 60',
        note: 'Drop in average speed directly yields idle halt time per hour.'
      }
    ],
    formulaCount: 10,
    speedShortcuts: [
      {
        method: '18:5 Ratio Ladder',
        title: 'Instant km/h to m/s Mental Conversion',
        rule: 'Divide km/h by 18 and multiply by 5. 36->10, 54->15, 72->20, 90->25, 108->30.',
        example: '90 km/h = (90/18)*5 = 25 m/s. 250m train crosses pole in 250/25 = 10s.',
        mentalStep: 'Identify multiple of 18: 90 is 5×18, so speed is 5×5 = 25 m/s.'
      },
      {
        method: 'Passenger Object Exclusion',
        title: 'Man in Train Only Uses Crossing Train Length',
        rule: 'Do not sum both train lengths when finding time to pass a passenger sitting inside. Use ONLY the length of the train that is passing the passenger.',
        example: 'A 180m train at 75 km/h passes a man in a 250m train at 33 km/h opposite. Distance = 180m (not 430m!). Rel Speed = 75+33 = 108 km/h = 30 m/s. Time = 180/30 = 6s.',
        mentalStep: 'Passenger is a point object. Distance = 180m. Relative Speed = 108 km/h = 30 m/s. 180/30 = 6s.'
      },
      {
        method: 'Square Root Inverse Time Ratio',
        title: 'Post-Meeting Speed Determination',
        rule: 'Speed ratio is square root of inverse time ratio: Sa / Sb = √(Tb / Ta).',
        example: 'Trains take 9h and 16h after meeting. Sa / Sb = √(16 / 9) = 4 : 3.',
        mentalStep: 'Swap the times (16/9), take square root -> 4/3.'
      },
      {
        method: 'Stoppage Minute Factor',
        title: 'Difference over Original times 60',
        rule: 'Stoppage min/hr = (Diff in Speeds / Fast Speed) × 60.',
        example: '50 km/h without, 40 km/h with. Diff = 10. (10/50)*60 = 12 mins/hr.',
        mentalStep: '10/50 is 1/5th of an hour. 60/5 = 12 minutes.'
      }
    ]
  },
  {
    id: 'topic-boats-streams',
    subjectId: 'subj-aptitude',
    name: 'Boats & Streams',
    category: 'quantitative',
    syllabusUnit: 'Unit III: Upstream, Downstream, and River Velocity Dynamics',
    learningOutcomes: 'Differentiate still water speed vs stream speed, and resolve round-trip river travel problems.',
    summary: 'Fluid motion vector modeling. Stream velocity aids downstream motion and opposes upstream motion.',
    formulas: [
      {
        name: 'Downstream Speed (D)',
        formula: 'D = u + v',
        note: 'u = Still water speed, v = Stream speed.'
      },
      {
        name: 'Upstream Speed (U)',
        formula: 'U = u - v',
        note: 'Stream opposes boat speed.'
      },
      {
        name: 'Still Water Boat Speed',
        formula: 'u = (D + U) / 2',
        note: 'Average of downstream and upstream speeds.'
      },
      {
        name: 'Stream / River Speed',
        formula: 'v = (D - U) / 2',
        note: 'Half the difference between speeds.'
      }
    ],
    formulaCount: 4,
    speedShortcuts: [
      {
        method: 'Half-Sum / Half-Difference Rule',
        title: 'Mental Stream Separation Shortcut',
        rule: 'Boat in still water is Half of the Sum (D+U)/2; River current is Half of the Difference (D-U)/2.',
        example: 'Downstream speed = 16 km/h, Upstream speed = 10 km/h. Boat speed = (16+10)/2 = 13 km/h. River speed = (16-10)/2 = 3 km/h.',
        mentalStep: 'Sum and divide by 2 for boat; subtract and divide by 2 for stream. Instant mental arithmetic.'
      }
    ]
  },
  {
    id: 'topic-alligation-mixtures',
    subjectId: 'subj-aptitude',
    name: 'Alligation & Mixtures',
    category: 'quantitative',
    syllabusUnit: 'Unit II: Rule of Alligation, Solution Replacements, and Concentrations',
    learningOutcomes: 'Apply cross-alligation to find mixture ratios, price combinations, and successive dilution formulas.',
    summary: 'The Rule of Alligation enables instantaneous calculation of the ratio in which two ingredients at different prices or strengths must be blended to produce a desired mean.',
    formulas: [
      {
        name: 'Rule of Alligation Ratio',
        formula: '(Quantity of Cheaper) / (Quantity of Dearer) = (d - m) / (m - c)',
        note: 'Where c=cheaper price, d=dearer price, m=mean target price.'
      },
      {
        name: 'Successive Dilution / Replacement',
        formula: 'Final Pure Liquid = Initial Pure × (1 - x / V)^n',
        note: 'Where V=total volume, x=volume replaced each cycle, n=number of cycles.'
      }
    ],
    formulaCount: 2,
    speedShortcuts: [
      {
        method: 'Alligation Cross Matrix',
        title: 'Cross-Subtraction Visual Ratio Matrix',
        rule: 'Place Cheaper (C) on left top, Dearer (D) on right top, Mean (M) in center. Subtract diagonally downwards: (D - M) on left, (M - C) on right.',
        example: 'Mix rice at ₹25/kg with rice at ₹40/kg to get a blend worth ₹30/kg. Left = 40 - 30 = 10. Right = 30 - 25 = 5. Ratio = 10 : 5 = 2 : 1.',
        mentalStep: 'Never set up linear equation 25x + 40y = 30(x+y). Just cross subtract: (40-30):(30-25) = 10:5 = 2:1.'
      }
    ]
  },
  {
    id: 'topic-interest',
    subjectId: 'subj-aptitude',
    name: 'Simple & Compound Interest',
    category: 'quantitative',
    syllabusUnit: 'Unit IV: Simple Interest, Compounding Cycles, and 2-Year / 3-Year Differences',
    learningOutcomes: 'Calculate linear growth vs exponential compounding, handle quarterly compounding, and use shortcut difference formulas.',
    summary: 'Capital appreciation metrics. SI charges interest exclusively on initial principal; CI adds accumulated interest back to principal.',
    formulas: [
      {
        name: 'Simple Interest',
        formula: 'SI = (P × R × T) / 100',
        note: 'Principal remains unchanged.'
      },
      {
        name: 'Compound Interest Maturity',
        formula: 'Amount = P × (1 + R / 100)^T',
        note: 'Total accrued balance at end of T years.'
      },
      {
        name: '2-Year CI - SI Difference',
        formula: 'Difference = P × (R / 100)^2',
        note: 'Shortcut valid strictly for 2-year horizon.'
      },
      {
        name: '3-Year CI - SI Difference',
        formula: 'Difference = P × (R/100)^2 × (3 + R/100)',
        note: 'Shortcut for 3 years without calculating exponential amount.'
      }
    ],
    formulaCount: 4,
    speedShortcuts: [
      {
        method: 'Pascals Triangle Compounding Multipliers',
        title: '2:1 and 3:3:1 Compound Interest Shortcut',
        rule: 'For 2 years CI, multiplier is 2A + 1B (where A is R% of P, and B is R% of A). For 3 years CI, multiplier is 3A + 3B + 1C.',
        example: 'Find CI on ₹10,000 at 10% for 3 years: A = 10% of 10,000 = 1,000. B = 10% of 1,000 = 100. C = 10% of 100 = 10. CI = 3(1000) + 3(100) + 1(10) = 3000 + 300 + 10 = ₹3,310.',
        mentalStep: 'No messy exponents (1.1)³ = 1.331 needed! Just 3A + 3B + 1C computed in 10 seconds.'
      },
      {
        method: 'Rule of 72 for Doubling Time',
        title: 'Rule of 72 Doubling Approximation',
        rule: 'Doubling Time ≈ 72 / Interest Rate (R).',
        example: 'At 8% compounded annually, money doubles in approximately 72 / 8 = 9 years.',
        mentalStep: 'Divide 72 by the annual percentage rate to find doubling period.'
      }
    ]
  },
  {
    id: 'topic-number-system',
    subjectId: 'subj-aptitude',
    name: 'Number System',
    category: 'quantitative',
    syllabusUnit: 'Unit IV: Divisibility Rules, Prime Factorization, HCF/LCM, and Unit Digits',
    learningOutcomes: 'Identify divisibility rules, compute cyclicity of unit digits, and apply GCD-LCM identities.',
    summary: 'The arithmetic foundation of numbers: integer properties, remainders, factor counts, and power cyclicity cycles.',
    formulas: [
      {
        name: 'HCF & LCM Identity',
        formula: 'LCM(a, b) × HCF(a, b) = a × b',
        note: 'Valid for two positive integers.'
      },
      {
        name: 'Sum of First N Integers',
        formula: 'Sum = N × (N + 1) / 2',
        note: 'Arithmetic progression sum.'
      },
      {
        name: 'Sum of Squares of First N Integers',
        formula: 'Sum = [N × (N + 1) × (2N + 1)] / 6',
        note: 'Used in analytical number series.'
      }
    ],
    formulaCount: 3,
    speedShortcuts: [
      {
        method: 'Beejank / Digital Root Navashesh',
        title: 'Instant MCQ Elimination via Digital Roots (Mod 9)',
        rule: 'The digital root (sum of digits reduced to single digit) of the LHS must equal the digital root of the correct answer. Drop 9s while adding.',
        example: 'Multiply 43 × 52 = ? Digital root of 43 = 4+3 = 7. Digital root of 52 = 5+2 = 7. Product = 7 × 7 = 49 -> 4+9 = 13 -> 1+3 = 4. Check options: 2236 -> 2+2+3+6 = 13 -> 4. Any option not having root 4 is eliminated!',
        mentalStep: 'Sum digits, ignore all 9s or combinations summing to 9. Eliminate 3 out of 4 options in 3 seconds.'
      },
      {
        method: 'Ekadhikena Purvena Squaring',
        title: 'Squaring Numbers Ending in 5',
        rule: 'To square any number ending in 5: Multiply the tens part by (tens part + 1), and append 25.',
        example: '75² = (7 × 8) | 25 = 5625. 115² = (11 × 12) | 25 = 13225.',
        mentalStep: 'Multiply the preceding digits by the next integer, write 25 at the end.'
      },
      {
        method: 'Nikhilam Navatashcaramam Dashatah',
        title: 'Base 100 Multiplication Near 100',
        rule: 'To multiply numbers close to 100: write deficits from 100, cross-subtract for left part, multiply deficits for right part.',
        example: '97 × 94: Deficits are -3 and -6. Left: 97 - 6 = 91. Right: (-3) × (-6) = 18. Result = 9118.',
        mentalStep: 'Cross-subtract deficits for left side, multiply deficits for right side.'
      }
    ]
  },
  {
    id: 'topic-permutations',
    subjectId: 'subj-aptitude',
    name: 'Permutations & Combinations',
    category: 'quantitative',
    syllabusUnit: 'Unit V: Principles of Counting, Factorial Shortcuts, and Selections',
    learningOutcomes: 'Differentiate permutations (order-dependent) from combinations (order-independent), and resolve circular/vowel arrangement constraints.',
    summary: 'Combinatorics study. Forms the mathematical foundation for probability, coding theory, and algorithm complexity analysis.',
    formulas: [
      {
        name: 'Permutation (Arrangement)',
        formula: 'nPr = n! / (n - r)!',
        note: 'Order matters (e.g. passwords, ranks, codes).'
      },
      {
        name: 'Combination (Selection)',
        formula: 'nCr = n! / [r! × (n - r)!]',
        note: 'Order does NOT matter (e.g. team members, hands).'
      },
      {
        name: 'Circular Permutation',
        formula: 'Circular = (n - 1)!',
        note: 'For round table arrangements.'
      }
    ],
    formulaCount: 3,
    speedShortcuts: [
      {
        method: 'Factorial Countdown Shortcut',
        title: 'Countdown Ratio Evaluation for nCr',
        rule: 'Never write full factorials. Write r descending terms in numerator starting from n, and r terms in denominator starting from r.',
        example: 'Evaluate 10C3: Write (10 × 9 × 8) / (3 × 2 × 1) = (10 × 3 × 4) = 120.',
        mentalStep: 'Count down 3 terms on top, 3 terms on bottom, cancel 9/3=3 and 8/2=4, multiply 10×3×4 = 120.'
      },
      {
        method: 'Complementary Combination Identity',
        title: 'Symmetry Rule: nCr = nC(n-r)',
        rule: 'When r is large, compute nC(n-r) instead.',
        example: 'Evaluate 50C48: Compute 50C(50-48) = 50C2 = (50 × 49) / (2 × 1) = 25 × 49 = 1,225.',
        mentalStep: 'Replace big r with the difference (50 - 48 = 2).'
      }
    ]
  },
  {
    id: 'topic-probability',
    subjectId: 'subj-aptitude',
    name: 'Probability',
    category: 'quantitative',
    syllabusUnit: 'Unit V: Sample Spaces, Mutually Exclusive Events, and Conditional Odds',
    learningOutcomes: 'Map sample spaces, apply addition and multiplication theorems, and solve dice, coin, and card problems.',
    summary: 'Quantification of likelihood. Key pillar of risk modeling, AI decision algorithms, and competitive evaluations.',
    formulas: [
      {
        name: 'Classical Probability',
        formula: 'P(E) = n(E) / n(S)',
        note: 'Favorable outcomes divided by total sample space.'
      },
      {
        name: 'Addition Theorem',
        formula: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)',
        note: 'Probability of either event occurring.'
      },
      {
        name: 'Complementary Event Law',
        formula: 'P(At least 1) = 1 - P(None)',
        note: 'Extremely fast shortcut for "at least one" problems.'
      }
    ],
    formulaCount: 3,
    speedShortcuts: [
      {
        method: 'Complement Inversion for At-Least-One',
        title: 'Complement Inversion Shortcut: 1 - P(None)',
        rule: 'Whenever a problem asks for "probability of at least 1 success", calculate the probability of ZERO successes and subtract from 1.',
        example: 'A coin is tossed 4 times. What is the probability of getting at least 1 head? P(No heads) = (1/2)^4 = 1/16. P(At least 1 head) = 1 - 1/16 = 15/16.',
        mentalStep: 'Calculating zero heads takes 2 seconds vs summing 1, 2, 3, 4 heads combinations.'
      }
    ]
  },
  {
    id: 'topic-ages',
    subjectId: 'subj-aptitude',
    name: 'Problems on Ages',
    category: 'quantitative',
    syllabusUnit: 'Unit I: Age Equations, Temporal Ratios, and Difference Invariance',
    learningOutcomes: 'Set up past and future age equations and apply ratio invariance tricks.',
    summary: 'Age problems measure linear temporal progression. The fundamental property is that the difference between the ages of two persons is invariant across time.',
    formulas: [
      {
        name: 'Age Invariance Principle',
        formula: '(Age_A + t) - (Age_B + t) = Age_A - Age_B',
        note: 'Age gap remains completely constant regardless of years elapsed.'
      }
    ],
    formulaCount: 1,
    speedShortcuts: [
      {
        method: 'Anurupyena Constant Gap Rule',
        title: 'Ratio Difference Balancing Shortcut',
        rule: 'Multiply ratios so that the difference between the two terms is identical in both time periods.',
        example: 'Ratio 5 years ago was 2:3 (diff=1). Ratio 5 years hence is 3:4 (diff=1). The 1-part increase corresponds to elapsed 5 + 5 = 10 years. 1 part = 10 years.',
        mentalStep: 'Map unit ratio increment directly to elapsed years between timeframes.'
      }
    ]
  },
  {
    id: 'topic-clocks-calendars',
    subjectId: 'subj-aptitude',
    name: 'Clocks & Calendars',
    category: 'quantitative',
    syllabusUnit: 'Unit IV: Angle Between Clock Hands, Leap Years, and Odd Days',
    learningOutcomes: 'Calculate hour-hand and minute-hand angles, handle coincidence positions, and find days of week for historical dates.',
    summary: 'Periodic circular motion and modular calendar arithmetic. Crucial for placement screening tests (Infosys, TCS, Cognizant).',
    formulas: [
      {
        name: 'Angle Between Hands',
        formula: 'θ = |30H - (11/2)M|',
        note: 'Where H = hour (1-12) and M = minutes (0-59).'
      },
      {
        name: 'Relative Hand Speed',
        formula: 'Relative Speed = 5.5 degrees / minute',
        note: 'Minute hand gains 55 minutes spaces in 60 minutes.'
      },
      {
        name: 'Calendar Odd Days',
        formula: 'Normal Year = 1 odd day | Leap Year = 2 odd days',
        note: 'Century 100 yrs = 5 odd days; 400 yrs = 0 odd days.'
      }
    ],
    formulaCount: 3,
    speedShortcuts: [
      {
        method: 'Direct Modulo Hand Angle Formula',
        title: '|30H - 5.5M| Mental Calculation',
        rule: 'Multiply hour by 30, multiply minutes by 5.5 (multiply by 5, add half the minutes), take absolute difference.',
        example: 'Find angle at 4:20. 30 × 4 = 120. 5.5 × 20 = 110. Angle = |120 - 110| = 10°.',
        mentalStep: '120 - 110 = 10 degrees in 3 seconds!'
      },
      {
        method: 'Calendar Month Code Anchor',
        title: '144-025-036-146 Month Code Anchor',
        rule: 'Month codes (Jan-Dec): 1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6. Day of week = (Date + MonthCode + YearCode + LeapYears) mod 7.',
        example: 'August 15, 1947: Date = 15, Aug Code = 3, Year = 47, Leaps = 11. Sum = 15 + 3 + 47 + 11 = 76. Century 1900 = 0. 76 mod 7 = 6 (Friday).',
        mentalStep: 'Modular addition mod 7 delivers instant day of week for any date in history.'
      }
    ]
  },
  {
    id: 'topic-mensuration',
    subjectId: 'subj-aptitude',
    name: 'Mensuration (Area & Volume)',
    category: 'quantitative',
    syllabusUnit: 'Unit IV: 2D Plane Geometry, Circles, and 3D Solid Geometry',
    learningOutcomes: 'Compute surface areas, volumes of cylinders/cones/spheres, and perimeter optimizations.',
    summary: 'Geometric quantitative metrics. Calculates boundary perimeters, cross-sectional areas, and volumetric capacities of 2D and 3D solids.',
    formulas: [
      {
        name: 'Circle Area & Circumference',
        formula: 'Area = πr² | Perimeter = 2πr',
        note: 'Use π ≈ 22/7.'
      },
      {
        name: 'Cylinder Volume & Curved Surface',
        formula: 'V = πr²h | CSA = 2πrh',
        note: 'Total Surface Area = 2πr(r + h).'
      },
      {
        name: 'Sphere Volume & Surface Area',
        formula: 'Volume = (4/3)πr³ | Surface Area = 4πr²',
        note: 'Hemisphere volume = (2/3)πr³.'
      }
    ],
    formulaCount: 3,
    speedShortcuts: [
      {
        method: '11-Divisibility Check for Mensuration',
        title: 'Pi Multiple 11-Divisibility MCQ Elimination',
        rule: 'Because formulas for circle, cylinder, cone, and sphere involve π = 22/7, the numerical answer is almost always divisible by 11! Sum of odd-position digits minus sum of even-position digits must be 0 or a multiple of 11.',
        example: 'Question asks for volume of cylinder. Options: (A) 1420, (B) 1540, (C) 1620, (D) 1530. Check (B) 1540: (1+4) - (5+0) = 5 - 5 = 0 (Divisible by 11). (B) is the correct answer without doing full formula multiplication!',
        mentalStep: 'Perform alternate digit sum check on the MCQ options to identify the correct answer in 5 seconds.'
      }
    ]
  },
  {
    id: 'topic-data-interpretation',
    subjectId: 'subj-aptitude',
    name: 'Data Interpretation & Analysis',
    category: 'quantitative',
    syllabusUnit: 'Unit V: Tables, Bar Charts, Pie Charts, and Line Graphs',
    learningOutcomes: 'Interpret tabular data, analyze pie-chart percentage/degree splits, and calculate compound growth rates.',
    summary: 'Analytical synthesis of quantitative information presented in tables, histograms, pie charts, and trend line plots. Central component of banking and IT recruitment.',
    formulas: [
      {
        name: 'Pie Chart Degree to Percent',
        formula: 'Percentage = (Degrees / 360) × 100 | Degrees = (Percent / 100) × 360',
        note: '3.6 degrees = 1%.'
      },
      {
        name: 'Percentage Growth Rate',
        formula: 'Growth% = ((Final - Initial) / Initial) × 100',
        note: 'Always relative to initial baseline year.'
      }
    ],
    formulaCount: 2,
    speedShortcuts: [
      {
        method: '3.6 Speed Conversion Multiplier',
        title: 'Pie Chart 3.6x Degree Shortcut',
        rule: 'To convert % to degrees, multiply by 3.6 (or multiply by 18/5).',
        example: 'A sector is 15%. Angle = 15 × 3.6 = 15 × 3 + 15 × 0.6 = 45 + 9 = 54°.',
        mentalStep: 'Multiply by 3 and add 60% of original number.'
      }
    ]
  },

  // ==========================================
  // LOGICAL REASONING
  // ==========================================
  {
    id: 'topic-blood-relations',
    subjectId: 'subj-aptitude',
    name: 'Blood Relations',
    category: 'logical',
    syllabusUnit: 'Logical Reasoning Unit I: Family Trees, Generational Hierarchies, and Coded Relationships',
    learningOutcomes: 'Construct family tree hierarchies, track generational levels, and decode symbolic genealogical relations (A + B means A is father of B).',
    summary: 'Evaluates logical mapping of familial genealogies. Requires distinguishing maternal vs paternal relations, generational levels, and sibling structures.',
    formulas: [
      {
        name: 'Generational Level Rule',
        formula: 'Level 0 = Self / Siblings / Spouse | Level +1 = Parents | Level -1 = Children',
        note: 'Keep generational tracking consistent.'
      }
    ],
    formulaCount: 1,
    speedShortcuts: [
      {
        method: 'Generational Level & Gender Coding Trick',
        title: 'Fast Symbolic Notation (+ for Male, - for Female, = for Married, | for Child)',
        rule: 'Assign (+) for male, (-) for female, (=) for marriage, and (|) for vertical generation descent. Never draw elaborate pictorial trees.',
        example: '"Pointing to a man, a woman said: His mother is the only daughter of my mother." Woman\'s mother\'s only daughter = The woman herself! So his mother = The woman. The man is her son.',
        mentalStep: 'Break down statements backwards starting from "my mother" to deduce identity instantly.'
      }
    ]
  },
  {
    id: 'topic-syllogisms',
    subjectId: 'subj-aptitude',
    name: 'Syllogisms & Logical Deductions',
    category: 'logical',
    syllabusUnit: 'Logical Reasoning Unit II: Categorical Propositions, Venn Diagrams, and Either-Or Conditions',
    learningOutcomes: 'Analyze universal affirmative, universal negative, and existential statements; verify conclusion validity.',
    summary: 'Formal deductive logic. Tests the ability to derive strictly necessary conclusions from hypothetical premises irrespective of real-world facts.',
    formulas: [
      {
        name: 'Categorical Types',
        formula: 'A: All X are Y | E: No X is Y | I: Some X are Y | O: Some X are not Y',
        note: 'Two negative premises yield no valid definite deduction.'
      }
    ],
    formulaCount: 1,
    speedShortcuts: [
      {
        method: '100-50 Distribution Shortcut',
        title: '100/50 Term Distribution Method (No Venn Diagrams Needed)',
        rule: 'Universal terms (All, No) distribute subject as 100. Negative terms distribute predicate as 100. Particular terms (Some) give 50. A term cannot have 100 in conclusion if it had 50 in premises.',
        example: 'All A are B (A=100, B=50). All B are C (B=100, C=50). Valid conclusion: All A are C (A=100, C=50). Conclusion "All C are A" is invalid because C is only 50 in premises!',
        mentalStep: 'Check term weights (100 vs 50) to validate conclusions without drawing messy overlapping Venn circles.'
      }
    ]
  },
  {
    id: 'topic-seating-arrangement',
    subjectId: 'subj-aptitude',
    name: 'Seating Arrangement & Puzzles',
    category: 'logical',
    syllabusUnit: 'Logical Reasoning Unit III: Linear Rows, Circular Tables (Inward/Outward Facing), and Multi-Attribute Puzzles',
    learningOutcomes: 'Map relative positions, determine left/right vectors under inward vs outward orientation, and resolve multi-variable constraints.',
    summary: 'Spatial and constraint-satisfaction reasoning. Central to high-scoring sections in corporate hiring assessments.',
    formulas: [
      {
        name: 'Circular Orientation Rule',
        formula: 'Facing Center: Clockwise = Left, Anticlockwise = Right | Facing Outside: Reversed',
        note: 'Crucial to determine relative sides.'
      }
    ],
    formulaCount: 1,
    speedShortcuts: [
      {
        method: 'Definite Anchor Elimination Method',
        title: 'Definite Anchor Placement Protocol',
        rule: 'Never guess or branch early. Start strictly with the person whose position is absolute (e.g., "sitting 2nd from left extreme" or "opposite to B"). Fill floating clues relative to this anchor.',
        example: 'In a 6-person circle facing center: Place Anchor at bottom (6 o\'clock position). Left is immediate clockwise, right is counter-clockwise.',
        mentalStep: 'Anchor the absolute clue at the bottom, then thread conditional statements.'
      }
    ]
  },
  {
    id: 'topic-coding-decoding',
    subjectId: 'subj-aptitude',
    name: 'Coding-Decoding & Series Completion',
    category: 'logical',
    syllabusUnit: 'Logical Reasoning Unit IV: Alphabetical Shifts, Number Series, and Coded Language Matrix',
    learningOutcomes: 'Identify forward and reverse alphabetical positions, identify prime/square series, and decode substitution ciphers.',
    summary: 'Pattern recognition under symbolic transformations. Essential benchmark for cognitive agility and technical problem solving.',
    formulas: [
      {
        name: 'Alphabet Position Formula',
        formula: 'Reverse Position = 27 - Forward Position',
        note: 'A=1, Z=26; A+Z = 1+26 = 27.'
      }
    ],
    formulaCount: 1,
    speedShortcuts: [
      {
        method: 'EJOTY & Reverse 27 Rule',
        title: 'EJOTY Index & 27 Alphabet Complement',
        rule: 'Memorize E(5), J(10), O(15), T(20), Y(25). Any opposite letter sum equals 27 (e.g. Opposite of C(3) is 27 - 3 = 24 = X).',
        example: 'Decode word "ZEBRA" shifted by +3: Z(26)->C(3), E(5)->H(8), B(2)->E(5), R(18)->U(21), A(1)->D(4) = CHEUD.',
        mentalStep: 'Use EJOTY anchors to convert letters into numbers mentally in seconds.'
      }
    ]
  },

  // ==========================================
  // VERBAL ABILITY
  // ==========================================
  {
    id: 'topic-sentence-correction',
    subjectId: 'subj-aptitude',
    name: 'Sentence Correction & Spotting Errors',
    category: 'verbal',
    syllabusUnit: 'Verbal Ability Unit I: Subject-Verb Agreement, Modifiers, Parallelism, and Tenses',
    learningOutcomes: 'Identify grammatical inaccuracies, resolve dangling modifiers, maintain parallel structure, and ensure pronoun antecedent agreement.',
    summary: 'Verbal precision and grammatical rigor. Assesses clarity of expression, structural coherence, and standard business English usage.',
    formulas: [
      {
        name: 'Subject-Verb Core Rule',
        formula: 'Singular Subject -> Singular Verb | Plural Subject -> Plural Verb',
        note: 'Phrases between subject and verb (e.g. "along with", "as well as") do not change subject number.'
      }
    ],
    formulaCount: 1,
    speedShortcuts: [
      {
        method: 'Parenthetical Stripping Rule',
        title: 'Middle Phrase Deletion Test',
        rule: 'Mentally cross out all prepositional phrases between commas or between subject and verb. The isolated subject must match the verb directly.',
        example: '"The captain, along with all his experienced crew members, (was/were) awarded." Strip the middle phrase: "The captain ... was awarded." Correct verb is WAS (singular)!',
        mentalStep: 'Mentally erase words between commas to expose the true grammatical backbone.'
      }
    ]
  },
  {
    id: 'topic-reading-comprehension',
    subjectId: 'subj-aptitude',
    name: 'Reading Comprehension & Critical Reasoning',
    category: 'verbal',
    syllabusUnit: 'Verbal Ability Unit II: Inference, Central Idea, Tone Analysis, and Logical Parajumbles',
    learningOutcomes: 'Identify thesis statements, distinguish explicit facts from implicit inferences, and determine narrative tone.',
    summary: 'Evaluates analytical reading stamina, argument deconstruction, contextual vocabulary, and rapid thematic synthesis under strict time limits.',
    formulas: [
      {
        name: 'Inference vs Assumption',
        formula: 'Assumption = Unstated Premise | Inference = Valid Logical Conclusion',
        note: 'Inferences must never extrapolate beyond given evidence.'
      }
    ],
    formulaCount: 1,
    speedShortcuts: [
      {
        method: 'Extreme Option Elimination Filter',
        title: 'Extreme Word Elimination Shortcut',
        rule: 'In reading comprehension and critical reasoning MCQs, options containing extreme absolute words (Always, Never, Completely, Entirely, Impossible) are almost 90% INCORRECT. Prefer moderate options (Can, May, Likely, Often).',
        example: 'Question asks for author conclusion. Option A: "Technology always causes unemployment." Option B: "Technology may displace certain workforce sectors." Choose Option B (moderate)!',
        mentalStep: 'Scan for absolute words and immediately discard them in critical reasoning questions.'
      }
    ]
  },

  // ==========================================
  // COMPREHENSIVE GRAND PAPER
  // ==========================================
  {
    id: 'topic-comprehensive-all',
    subjectId: 'subj-aptitude',
    name: 'Comprehensive All-Topic Mock Examination (Grand Mixed Paper)',
    category: 'mock',
    syllabusUnit: 'Full Syllabus Grand Evaluation: Quantitative, Logical & Verbal Integrated',
    learningOutcomes: 'Integrate multi-domain quantitative, reasoning, numerical, and verbal paradigms into a complete placement/entrance assessment simulation.',
    summary: 'A unified comprehensive assessment spanning Percentages, Ratios, Time & Work, Speed, Interest, Permutations, Probability, Syllogisms, Blood Relations, and Verbal Logic. Simulates real-world recruitment drives (TCS, Infosys, Cognizant, Wipro, Accenture, GATE).',
    formulas: [
      {
        name: 'Harmonic Mean Speed',
        formula: 'S_avg = 2*S1*S2 / (S1 + S2)',
        note: 'Equal distance segments'
      },
      {
        name: 'Compound Growth',
        formula: 'A = P*(1 + R/100)^T',
        note: 'Annual compounding'
      },
      {
        name: 'Man-Days Equivalence',
        formula: '(M1*D1*H1)/W1 = (M2*D2*H2)/W2',
        note: 'Resource scaling'
      }
    ],
    formulaCount: 3,
    speedShortcuts: [
      {
        method: 'Composite Examination Strategy',
        title: 'Round-1 Speed Pass Protocol',
        rule: 'In a 100-question mixed assessment, complete all speed mental math shortcuts first in Round 1 (0 to 30 seconds each). Mark multi-step algebra for Round 2.',
        example: 'Solve digital roots, 18:5 speed ladder, and percentages in Round 1 to secure 60% marks in first 35% of allocated time.',
        mentalStep: 'Prioritize instant speed shortcut questions first to build an unassailable time cushion.'
      }
    ],
    comparisons: [
      {
        relatedTopicName: 'Modular Chapters vs Comprehensive Grand Paper',
        keyDifference: 'Single-topic tests measure isolated chapter mastery. Comprehensive papers test cognitive agility, context-switching between diverse mathematical rules, and stamina under timed conditions.',
        points: [
          { feature: 'Topic Coverage', topicA: 'All syllabus chapters mixed evenly', topicB: 'Single focused chapter' },
          { feature: 'Exam Simulation', topicA: 'Real-world Placement / GATE Mock', topicB: 'Topic-wise formative drill' }
        ]
      }
    ]
  }
];
