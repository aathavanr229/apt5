import fs from 'fs';
import path from 'path';
import { Subject, Topic, Question, Attempt, StudentUser } from '../src/types.js';

const DB_FILE = path.join(process.cwd(), 'db.json');
const TMP_DB_FILE = path.join('/tmp', 'db.json');

interface DatabaseSchema {
  subjects: Subject[];
  topics: Topic[];
  questions: Question[];
  attempts: Attempt[];
  users: StudentUser[];
}

const DEFAULT_USERS: StudentUser[] = [
  {
    id: 'usr-101',
    name: 'Aathavan R',
    roll: '24CSE101',
    email: 'aathavanr.24cse@kongu.edu',
    department: 'Computer Science & Engineering',
    password: 'password123',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'usr-042',
    name: 'Priyadharshini K',
    roll: '24ECE042',
    email: 'priyadharshini.24ece@kongu.edu',
    department: 'Electronics & Communication',
    password: 'password123',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: 'usr-018',
    name: 'Karthik V',
    roll: '24MECH018',
    email: 'karthik.24mech@kongu.edu',
    department: 'Mechanical Engineering',
    password: 'password123',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: 'usr-102',
    name: 'Divya Bharathi S',
    roll: '24CSE102',
    email: 'divya.24cse@kongu.edu',
    department: 'Computer Science & Engineering',
    password: 'password123',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'usr-055',
    name: 'Gokul Prasath N',
    roll: '24IT055',
    email: 'gokul.24it@kongu.edu',
    department: 'Information Technology',
    password: 'password123',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'usr-033',
    name: 'Harini M',
    roll: '24EEE033',
    email: 'harini.24eee@kongu.edu',
    department: 'Electrical & Electronics',
    password: 'password123',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'usr-110',
    name: 'Vignesh Kumar R',
    roll: '24CSE110',
    email: 'vignesh.24cse@kongu.edu',
    department: 'Computer Science & Engineering',
    password: 'password123',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'usr-078',
    name: 'Sneha Priya T',
    roll: '24ECE078',
    email: 'sneha.24ece@kongu.edu',
    department: 'Electronics & Communication',
    password: 'password123',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 'usr-045',
    name: 'Naveen Raj B',
    roll: '24MECH045',
    email: 'naveen.24mech@kongu.edu',
    department: 'Mechanical Engineering',
    password: 'password123',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 'usr-115',
    name: 'Keerthana S',
    roll: '24CSE115',
    email: 'keerthana.24cse@kongu.edu',
    department: 'Computer Science & Engineering',
    password: 'password123',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

const DEFAULT_ATTEMPTS: Attempt[] = [
  {
    id: 'att-demo-1',
    topicId: 'topic-percentages',
    topicName: 'Percentages',
    subjectId: 'subj-aptitude',
    bloomLevel: 'Apply',
    studentName: 'Aathavan R',
    studentRoll: '24CSE101',
    studentEmail: 'aathavanr.24cse@kongu.edu',
    studentDepartment: 'Computer Science & Engineering',
    score: 9,
    total: 10,
    percentage: 90,
    timeTakenSeconds: 245,
    answers: [],
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString()
  },
  {
    id: 'att-demo-2',
    topicId: 'topic-percentages',
    topicName: 'Percentages',
    subjectId: 'subj-aptitude',
    bloomLevel: 'Apply',
    studentName: 'Priyadharshini K',
    studentRoll: '24ECE042',
    studentEmail: 'priyadharshini.24ece@kongu.edu',
    studentDepartment: 'Electronics & Communication',
    score: 8,
    total: 10,
    percentage: 80,
    timeTakenSeconds: 280,
    answers: [],
    createdAt: new Date(Date.now() - 3600000 * 7).toISOString()
  },
  {
    id: 'att-demo-3',
    topicId: 'topic-percentages',
    topicName: 'Percentages',
    subjectId: 'subj-aptitude',
    bloomLevel: 'Apply',
    studentName: 'Divya Bharathi S',
    studentRoll: '24CSE102',
    studentEmail: 'divya.24cse@kongu.edu',
    studentDepartment: 'Computer Science & Engineering',
    score: 8,
    total: 10,
    percentage: 80,
    timeTakenSeconds: 310,
    answers: [],
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    id: 'att-demo-4',
    topicId: 'topic-percentages',
    topicName: 'Percentages',
    subjectId: 'subj-aptitude',
    bloomLevel: 'Apply',
    studentName: 'Gokul Prasath N',
    studentRoll: '24IT055',
    studentEmail: 'gokul.24it@kongu.edu',
    studentDepartment: 'Information Technology',
    score: 7,
    total: 10,
    percentage: 70,
    timeTakenSeconds: 260,
    answers: [],
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'att-demo-5',
    topicId: 'topic-percentages',
    topicName: 'Percentages',
    subjectId: 'subj-aptitude',
    bloomLevel: 'Apply',
    studentName: 'Karthik V',
    studentRoll: '24MECH018',
    studentEmail: 'karthik.24mech@kongu.edu',
    studentDepartment: 'Mechanical Engineering',
    score: 7,
    total: 10,
    percentage: 70,
    timeTakenSeconds: 340,
    answers: [],
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'att-demo-6',
    topicId: 'topic-percentages',
    topicName: 'Percentages',
    subjectId: 'subj-aptitude',
    bloomLevel: 'Apply',
    studentName: 'Harini M',
    studentRoll: '24EEE033',
    studentEmail: 'harini.24eee@kongu.edu',
    studentDepartment: 'Electrical & Electronics',
    score: 6,
    total: 10,
    percentage: 60,
    timeTakenSeconds: 295,
    answers: [],
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 'att-demo-7',
    topicId: 'topic-percentages',
    topicName: 'Percentages',
    subjectId: 'subj-aptitude',
    bloomLevel: 'Apply',
    studentName: 'Vignesh Kumar R',
    studentRoll: '24CSE110',
    studentEmail: 'vignesh.24cse@kongu.edu',
    studentDepartment: 'Computer Science & Engineering',
    score: 6,
    total: 10,
    percentage: 60,
    timeTakenSeconds: 360,
    answers: [],
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'att-demo-8',
    topicId: 'topic-percentages',
    topicName: 'Percentages',
    subjectId: 'subj-aptitude',
    bloomLevel: 'Apply',
    studentName: 'Sneha Priya T',
    studentRoll: '24ECE078',
    studentEmail: 'sneha.24ece@kongu.edu',
    studentDepartment: 'Electronics & Communication',
    score: 5,
    total: 10,
    percentage: 50,
    timeTakenSeconds: 275,
    answers: [],
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString()
  },
  {
    id: 'att-demo-9',
    topicId: 'topic-percentages',
    topicName: 'Percentages',
    subjectId: 'subj-aptitude',
    bloomLevel: 'Apply',
    studentName: 'Naveen Raj B',
    studentRoll: '24MECH045',
    studentEmail: 'naveen.24mech@kongu.edu',
    studentDepartment: 'Mechanical Engineering',
    score: 5,
    total: 10,
    percentage: 50,
    timeTakenSeconds: 380,
    answers: [],
    createdAt: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: 'att-demo-10',
    topicId: 'topic-percentages',
    topicName: 'Percentages',
    subjectId: 'subj-aptitude',
    bloomLevel: 'Apply',
    studentName: 'Keerthana S',
    studentRoll: '24CSE115',
    studentEmail: 'keerthana.24cse@kongu.edu',
    studentDepartment: 'Computer Science & Engineering',
    score: 4,
    total: 10,
    percentage: 40,
    timeTakenSeconds: 390,
    answers: [],
    createdAt: new Date(Date.now() - 900000).toISOString()
  }
];

const DEFAULT_SUBJECTS: Subject[] = [
  {
    id: 'subj-aptitude',
    name: 'Quantitative Aptitude',
    code: 'QA101',
    summary: 'Master the core mathematical and logical concepts required for technical assessments, entrance examinations, and high-performance problem solving. This course covers everything from simple ratios to complex probability.',
    department: 'General Engineering / Placement Cell',
    status: 'active'
  },
  {
    id: 'subj-maths',
    name: 'Engineering Mathematics',
    code: 'MA3151',
    summary: 'Linear algebra, calculus, differential equations, Fourier series, and numerical methods crucial for all engineering streams.',
    department: 'Mathematics',
    status: 'coming_soon'
  },
  {
    id: 'subj-dbms',
    name: 'Database Management Systems',
    code: 'CS3401',
    summary: 'Relational database design, SQL querying, transactional integrity, index strategies, and modern NoSQL architectures.',
    department: 'Computer Science and Engineering',
    status: 'coming_soon'
  },
  {
    id: 'subj-dsa',
    name: 'Data Structures & Algorithms',
    code: 'CS3301',
    summary: 'Asymptotic complexity analysis, linked structures, trees, graphs, sorting, searching, and advanced dynamic programming patterns.',
    department: 'Computer Science and Engineering',
    status: 'coming_soon'
  },
  {
    id: 'subj-os',
    name: 'Operating Systems',
    code: 'CS3402',
    summary: 'Process scheduling, synchronization, deadlock mitigation, memory virtualization, caching, and file system layouts.',
    department: 'Computer Science and Engineering',
    status: 'coming_soon'
  }
];

const DEFAULT_TOPICS: Topic[] = [
  {
    id: 'topic-percentages',
    subjectId: 'subj-aptitude',
    name: 'Percentages',
    syllabusUnit: 'Unit I: Basics of Percentages, Conversions, and Applications',
    learningOutcomes: 'Understand core concepts of percentages, express fractions as percentages and vice versa, and compute successive percentage changes.',
    summary: 'Percentages represent numbers as fractions of 100. They serve as the standardized relative comparison scale across financial, technical, and statistical datasets.',
    formulas: [
      {
        name: 'Percentage Representation',
        formula: 'P% = (Part / Whole) × 100',
        note: 'Determines what percentage of the Whole is represented by the Part.'
      },
      {
        name: 'Percentage Increase',
        formula: 'New Value = Original Value × (1 + R / 100)',
        note: 'Where R is the percentage increase rate.'
      },
      {
        name: 'Percentage Decrease',
        formula: 'New Value = Original Value × (1 - R / 100)',
        note: 'Where R is the percentage decrease rate.'
      },
      {
        name: 'Successive Percentage Change',
        formula: 'Net Change% = A + B + (A × B) / 100',
        note: 'Use positive for increases and negative for decreases.'
      }
    ],
    formulaCount: 4,
    comparisons: [
      {
        relatedTopicName: 'Ratio & Proportion',
        keyDifference: 'Percentages standardize comparisons to a constant base denominator of 100, whereas Ratios express the direct relative proportion between two or more independent quantities.',
        points: [
          { feature: 'Denominator Base', topicA: 'Fixed to 100 (e.g., 25/100)', topicB: 'Arbitrary parts sum (e.g., 1:3)' },
          { feature: 'Multi-variable Split', topicA: 'Limited to relative slice of total 100%', topicB: 'Can partition across 3+ entities (A : B : C)' },
          { feature: 'Primary Application', topicA: 'Growth rates, profit margins, discounts', topicB: 'Share allocation, mixtures, scale maps' }
        ]
      },
      {
        relatedTopicName: 'Fractions',
        keyDifference: 'Percentages are decimal fractions scaled by 100, while general fractions represent rational part-whole ratios (a/b).',
        points: [
          { feature: 'Notation', topicA: '25%', topicB: '1/4' },
          { feature: 'Ease of Comparison', topicA: 'Higher (constant base of 100)', topicB: 'Requires common denominator conversion' }
        ]
      }
    ]
  },
  {
    id: 'topic-ratios',
    subjectId: 'subj-aptitude',
    name: 'Ratio & Proportion',
    syllabusUnit: 'Unit I: Ratios, Proportions, and Variations',
    learningOutcomes: 'Identify ratio structures, solve proportional relationships, compute continuous proportions, and partition quantities.',
    summary: 'Ratios compare physical quantities of identical units, whereas proportions verify the mathematical equivalence of two distinct ratios. Widely applied in mixtures, scaling, partnerships, and sharing.',
    formulas: [
      {
        name: 'Ratio Partitioning',
        formula: 'Share of A = (a / (a + b)) × Total',
        note: 'Determines A\'s share when a total sum is partitioned in the ratio a : b.'
      },
      {
        name: 'Direct Proportion',
        formula: 'x1 / y1 = x2 / y2',
        note: 'Indicates that as quantity x scales up, y increases at a constant scalar rate.'
      },
      {
        name: 'Inverse Proportion',
        formula: 'x1 × y1 = x2 × y2',
        note: 'As x scales up, y decreases proportionally (e.g. Speed and travel time).'
      },
      {
        name: 'Mean Proportional',
        formula: 'Mean Proportional = √(a × b)',
        note: 'Represents the geometric mean proportional between values a and b.'
      }
    ],
    formulaCount: 4,
    comparisons: [
      {
        relatedTopicName: 'Direct vs Inverse Proportion',
        keyDifference: 'In Direct Proportion, two quantities increase or decrease together in ratio constant k = x/y. In Inverse Proportion, one increases as the other decreases in constant product k = x × y.',
        points: [
          { feature: 'Mathematical Rule', topicA: 'x / y = constant k', topicB: 'x × y = constant k' },
          { feature: 'Real-world Example', topicA: 'Items bought vs Total Cost', topicB: 'Speed vs Travel Time (or Workers vs Days)' }
        ]
      }
    ]
  },
  {
    id: 'topic-averages',
    subjectId: 'subj-aptitude',
    name: 'Averages',
    syllabusUnit: 'Unit II: Arithmetic Mean, Weighted Averages, and Deviations',
    learningOutcomes: 'Calculate simple arithmetic means, evaluate weighted sets, and compute average shifts when items are added or replaced.',
    summary: 'Averages represent the central value of a given set of data points. It is computed as the sum of all values divided by their count.',
    formulas: [
      {
        name: 'Arithmetic Mean',
        formula: 'Average = Sum of Observations / Count of Observations',
        note: 'The basic central tendency metric.'
      },
      {
        name: 'Weighted Average',
        formula: 'Weighted Average = (w1 × x1 + w2 × x2) / (w1 + w2)',
        note: 'Applied when combining sets of different sizes or distinct priorities.'
      },
      {
        name: 'Replacement average shift',
        formula: 'New Value = Excluded Value + (Count × Change in Average)',
        note: 'Fast method to find replacement entity value without calculating totals.'
      }
    ],
    formulaCount: 3,
    comparisons: [
      {
        relatedTopicName: 'Simple Mean vs Weighted Average',
        keyDifference: 'Simple Mean assumes every observation carries identical importance (weight = 1). Weighted Average assigns distinct weight factors according to set sizes or importance.',
        points: [
          { feature: 'Weight Factors', topicA: 'All items weighted equally (1/N)', topicB: 'Each group weighted by count or priority (w_i)' },
          { feature: 'Sensitivity to Set Size', topicA: 'Ignores set sizes', topicB: 'Accounted for dynamically via (w1*x1 + w2*x2)/(w1+w2)' }
        ]
      }
    ]
  },
  {
    id: 'topic-profit-loss',
    subjectId: 'subj-aptitude',
    name: 'Profit & Loss',
    syllabusUnit: 'Unit II: Cost Price, Selling Price, and Discount Structures',
    learningOutcomes: 'Calculate profit and loss margins, translate percentages into absolute monetary margins, and handle complex discounts.',
    summary: 'Evaluates transactional margins. Profit occurs when Selling Price exceeds Cost Price, and Loss occurs when Cost Price exceeds Selling Price. Discounts are applied on the Marked Price.',
    formulas: [
      {
        name: 'Profit Percentage',
        formula: 'Profit% = ((SP - CP) / CP) × 100',
        note: 'Where CP is Cost Price and SP is Selling Price.'
      },
      {
        name: 'Loss Percentage',
        formula: 'Loss% = ((CP - SP) / CP) × 100',
        note: 'Always calculated with CP as the baseline denominator.'
      },
      {
        name: 'Selling Price with Profit',
        formula: 'SP = CP × (100 + Profit%) / 100',
        note: 'Direct conversion to find selling price.'
      },
      {
        name: 'Marked Price & Discount',
        formula: 'SP = MP × (1 - Discount% / 100)',
        note: 'Marked Price is marked up from Cost Price; discount is applied on MP.'
      }
    ],
    formulaCount: 4,
    comparisons: [
      {
        relatedTopicName: 'Margin on CP vs Margin on SP',
        keyDifference: 'Standard Profit Percentage is calculated on Cost Price (CP). Commercial Profit Margin is calculated on Selling Price (SP).',
        points: [
          { feature: 'Baseline Denominator', topicA: 'Cost Price (CP)', topicB: 'Selling Price (SP)' },
          { feature: 'Formula', topicA: '(Profit / CP) × 100', topicB: '(Profit / SP) × 100' }
        ]
      }
    ]
  },
  {
    id: 'topic-time-work',
    subjectId: 'subj-aptitude',
    name: 'Time & Work',
    syllabusUnit: 'Unit III: Work Efficiency, Group Work, and Pipes & Cisterns',
    learningOutcomes: 'Analyze joint work rates, apply man-days equivalence equations, and model inlet-outlet pipe dynamics.',
    summary: 'Models the inverse relationship between speed of completion and human efficiency. It forms the foundation for scheduling algorithms and resource allocation models.',
    formulas: [
      {
        name: 'Combined Work Rate',
        formula: '1 / Tab = 1 / Ta + 1 / Tb',
        note: 'If A takes Ta days and B takes Tb, they work together in Tab = (Ta × Tb) / (Ta + Tb) days.'
      },
      {
        name: 'Work Equivalence Rule',
        formula: '(M1 × D1 × H1) / W1 = (M2 × D2 × H2) / W2',
        note: 'Where M is men, D is days, H is hours, and W is the amount of work completed.'
      },
      {
        name: 'Inlet & Outlet Pipes',
        formula: 'Net Rate = 1 / InletTime - 1 / OutletTime',
        note: 'Positive result means the cistern fills; negative means it empties.'
      }
    ],
    formulaCount: 3,
    comparisons: [
      {
        relatedTopicName: 'Pipes & Cisterns',
        keyDifference: 'Time & Work involves positive work done by human agents. Pipes & Cisterns includes negative work performed by outlet drain pipes.',
        points: [
          { feature: 'Work Direction', topicA: 'Always additive (+ Rate)', topicB: 'Can be negative (- Rate for leak/outlet)' },
          { feature: 'Capacity Measure', topicA: 'Abstract unit work = 1', topicB: 'Tank volume in Liters or LCM capacity' }
        ]
      }
    ]
  },
  {
    id: 'topic-time-speed-distance',
    subjectId: 'subj-aptitude',
    name: 'Time-Speed-Distance',
    syllabusUnit: 'Unit III: Linear Motion, Relative Speed, and Train Problems',
    learningOutcomes: 'Translate speed units, compute average velocity, and model relative speed of bodies moving in identical or opposing vectors.',
    summary: 'Deals with rates of physical translation over space. Extends to relative speed (approaching vs separating) and moving media (trains, rivers, boats).',
    formulas: [
      {
        name: 'Fundamental Formula',
        formula: 'Distance = Speed × Time',
        note: 'Must maintain matching dimensions.'
      },
      {
        name: 'Speed Conversion Metric',
        formula: '1 km/h = 5 / 18 m/s',
        note: 'Multiply by 5/18 to convert km/h to m/s, or 18/5 for m/s to km/h.'
      },
      {
        name: 'Average Speed (Equal Distances)',
        formula: 'Average Speed = (2 × S1 × S2) / (S1 + S2)',
        note: 'Used for equal distance segments traveled at speeds S1 and S2.'
      },
      {
        name: 'Relative Speed (Opposite Directions)',
        formula: 'Relative Speed = S1 + S2',
        note: 'Used when entities move directly toward or away from each other.'
      },
      {
        name: 'Relative Speed (Same Direction)',
        formula: 'Relative Speed = |S1 - S2|',
        note: 'Used when one entity chases another.'
      }
    ],
    formulaCount: 5,
    comparisons: [
      {
        relatedTopicName: 'Boats & Streams vs Linear Trains',
        keyDifference: 'Linear Train motion deals with stationary or moving tracks. Boats & Streams deals with motion inside a fluid medium where current speed adds to (downstream) or subtracts from (upstream) still water speed.',
        points: [
          { feature: 'Medium Effect', topicA: 'No external water current', topicB: 'Downstream (S+C), Upstream (S-C)' },
          { feature: 'Reference Frame', topicA: 'Ground reference', topicB: 'Water current reference frame' }
        ]
      }
    ]
  },
  {
    id: 'topic-interest',
    subjectId: 'subj-aptitude',
    name: 'Simple & Compound Interest',
    syllabusUnit: 'Unit IV: Simple Interest and Compound Interest with Multi-cycle Compounding',
    learningOutcomes: 'Determine fixed returns versus compounding rates, model varying interest periods, and evaluate geometric asset growth.',
    summary: 'Examines capital appreciation over time. Simple interest pays gains strictly on the original principal, whereas compound interest incorporates gains back into the active principal.',
    formulas: [
      {
        name: 'Simple Interest',
        formula: 'SI = (P × R × T) / 100',
        note: 'P = Principal, R = Annual Rate, T = Time in years.'
      },
      {
        name: 'Compound Interest Maturity',
        formula: 'Amount = P × (1 + R / 100)^T',
        note: 'Total maturity value. Interest accrued is Amount - Principal.'
      },
      {
        name: 'Multi-cycle Compounding',
        formula: 'Amount = P × (1 + R / (n × 100))^(n × T)',
        note: 'Where n represents times compounded per year (e.g. n=2 for half-yearly).'
      }
    ],
    formulaCount: 3,
    comparisons: [
      {
        relatedTopicName: 'Simple Interest vs Compound Interest',
        keyDifference: 'Simple Interest stays constant each year because principal remains fixed. Compound Interest grows exponentially because interest earned in previous cycles earns interest in future cycles.',
        points: [
          { feature: 'Growth Curve', topicA: 'Linear growth (I_1 = I_2 = I_3)', topicB: 'Exponential geometric curve' },
          { feature: '2-Year Difference Formula', topicA: 'Difference = 0', topicB: 'Difference = P × (R/100)^2' }
        ]
      }
    ]
  },
  {
    id: 'topic-number-system',
    subjectId: 'subj-aptitude',
    name: 'Number System',
    syllabusUnit: 'Unit IV: Divisibility Rules, Prime Numbers, and LCM/HCF Applications',
    learningOutcomes: 'Evaluate prime factors, solve divisibility checks, and identify periodic remainders using GCD and LCM applications.',
    summary: 'The study of number properties, algebraic expressions of integer sets, divisions, divisibility shortcuts, factor counts, and modulus cycles.',
    formulas: [
      {
        name: 'LCM and HCF Identity',
        formula: 'LCM(a, b) × HCF(a, b) = a × b',
        note: 'Valid for any two positive integers.'
      },
      {
        name: 'Euclidean Division',
        formula: 'Dividend = (Divisor × Quotient) + Remainder',
        note: 'Where 0 <= Remainder < Divisor.'
      },
      {
        name: 'Sum of First N Numbers',
        formula: 'Sum = N × (N + 1) / 2',
        note: 'Computes sum of 1 + 2 + 3 + ... + N.'
      }
    ],
    formulaCount: 3,
    comparisons: [
      {
        relatedTopicName: 'HCF (GCD) vs LCM',
        keyDifference: 'HCF is the largest common divisor that divides all numbers without remainder. LCM is the smallest common multiple that is divisible by all numbers.',
        points: [
          { feature: 'Mathematical Role', topicA: 'Greatest Common Divisor (Factors)', topicB: 'Least Common Multiple (Multiples)' },
          { feature: 'Value Constraint', topicA: 'HCF <= min(a, b)', topicB: 'LCM >= max(a, b)' }
        ]
      }
    ]
  },
  {
    id: 'topic-permutations',
    subjectId: 'subj-aptitude',
    name: 'Permutations & Combinations',
    syllabusUnit: 'Unit V: Principles of Counting, Arrangements, and Selection',
    learningOutcomes: 'Implement fundamental counting principles, analyze order-based arrangements, and solve combination selection constraints.',
    summary: 'Combinatorics forms the foundation of probability and statistics. Permutations represent ordered arrangements, whereas Combinations cover order-independent groups.',
    formulas: [
      {
        name: 'Factorial Multiplication',
        formula: 'n! = n × (n - 1) × (n - 2) × ... × 1',
        note: 'By definition, 0! = 1.'
      },
      {
        name: 'Permutations (Arrangement)',
        formula: 'nPr = n! / (n - r)!',
        note: 'Arranging r items selected out of a set of n unique items.'
      },
      {
        name: 'Combinations (Selection)',
        formula: 'nCr = n! / (r! × (n - r)!)',
        note: 'Selecting a group of r items out of n unique items, order does not matter.'
      }
    ],
    formulaCount: 3,
    comparisons: [
      {
        relatedTopicName: 'Permutation vs Combination',
        keyDifference: 'Order matters in Permutations (e.g. Passwords, Rank positions, Line seating). Order does NOT matter in Combinations (e.g. Team selection, Handshakes, Card hands).',
        points: [
          { feature: 'Order Importance', topicA: 'Strictly Order Dependent (AB != BA)', topicB: 'Order Independent ({A, B} == {B, A})' },
          { feature: 'Mathematical Count', topicA: 'nPr = n! / (n-r)! (Larger count)', topicB: 'nCr = n! / (r!*(n-r)!) = nPr / r!' }
        ]
      }
    ]
  },
  {
    id: 'topic-probability',
    subjectId: 'subj-aptitude',
    name: 'Probability',
    syllabusUnit: 'Unit V: Sample Spaces, Basic Probability, and Conditional Events',
    learningOutcomes: 'Define and map sample spaces, calculate event ratios, and resolve conditional dependency problems.',
    summary: 'Probability quantifies the likelihood of a specified outcome. Essential for statistical models, randomized testing, and predictive modeling.',
    formulas: [
      {
        name: 'Classical Likelihood',
        formula: 'P(A) = Favorable Outcomes / Total Sample Space',
        note: 'Assumes all outcomes in the space are equally likely.'
      },
      {
        name: 'Addition of Probabilities',
        formula: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)',
        note: 'Probability of A or B occurring.'
      },
      {
        name: 'Conditional Probability',
        formula: 'P(A | B) = P(A ∩ B) / P(B)',
        note: 'Probability of A occurring given that event B has occurred.'
      }
    ],
    formulaCount: 3,
    comparisons: [
      {
        relatedTopicName: 'Probability vs Odds',
        keyDifference: 'Probability compares favorable outcomes to the TOTAL sample space. Odds compares favorable outcomes to UNFAVORABLE outcomes.',
        points: [
          { feature: 'Denominator', topicA: 'Total Outcomes (Favorable + Unfavorable)', topicB: 'Unfavorable Outcomes' },
          { feature: 'Value Range', topicA: 'Bounded between 0 and 1 (0% to 100%)', topicB: 'Can range from 0 to infinity (e.g. 3 to 1)' }
        ]
      }
    ]
  },
  {
    id: 'topic-comprehensive-all',
    subjectId: 'subj-aptitude',
    name: 'Comprehensive All-Topic Mock Examination (Grand Mixed Paper)',
    syllabusUnit: 'Full Syllabus Grand Evaluation: Units I to V Integrated',
    learningOutcomes: 'Integrate multi-domain quantitative, reasoning, numerical, and probability paradigms into a complete placement/entrance assessment simulation.',
    summary: 'A unified comprehensive assessment spanning Percentages, Ratios, Averages, Profit & Loss, Time & Work, Time-Speed-Distance, Interest, Number System, Permutations, and Probability. Simulates real-world recruitment drives (TCS, Infosys, Cognizant, Wipro, GATE, CAT).',
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
      },
      {
        name: 'Combinatorial Selection',
        formula: 'nCr = n! / (r! * (n - r)!)',
        note: 'Unordered combinations'
      },
      {
        name: 'Net Percentage Change',
        formula: 'Net% = A + B + (A*B)/100',
        note: 'Successive adjustments'
      }
    ],
    formulaCount: 5,
    comparisons: [
      {
        relatedTopicName: 'Modular Chapters vs Comprehensive Grand Paper',
        keyDifference: 'Single-topic tests measure isolated chapter mastery. Comprehensive papers test cognitive agility, context-switching between diverse mathematical rules, and stamina under timed conditions.',
        points: [
          { feature: 'Topic Coverage', topicA: 'All 10 syllabus chapters mixed evenly', topicB: 'Single focused chapter' },
          { feature: 'Max Questions Capacity', topicA: 'Supports up to 100 questions per exam paper', topicB: 'Standard 5 to 45 questions' },
          { feature: 'Exam Simulation', topicA: 'Real-world Placement / GATE Mock', topicB: 'Topic-wise formative drill' }
        ]
      }
    ]
  }
];

class Database {
  private data: DatabaseSchema = {
    subjects: [],
    topics: [],
    questions: [],
    attempts: [],
    users: []
  };

  constructor() {
    this.load();
  }

  private load() {
    try {
      let targetFile = '';
      if (fs.existsSync(TMP_DB_FILE)) {
        targetFile = TMP_DB_FILE;
      } else if (fs.existsSync(DB_FILE)) {
        targetFile = DB_FILE;
      }

      if (targetFile) {
        const fileContent = fs.readFileSync(targetFile, 'utf-8');
        this.data = JSON.parse(fileContent);
        if (!this.data.subjects || this.data.subjects.length === 0) {
          this.data.subjects = DEFAULT_SUBJECTS;
        }
        if (!this.data.topics || this.data.topics.length === 0) {
          this.data.topics = DEFAULT_TOPICS;
        } else {
          // Merge any newly introduced topics from defaults if not already present in persisted db
          for (const defTopic of DEFAULT_TOPICS) {
            if (!this.data.topics.some(t => t.id === defTopic.id)) {
              this.data.topics.push(defTopic);
            }
          }
        }
        if (!this.data.attempts || this.data.attempts.length === 0) {
          this.data.attempts = DEFAULT_ATTEMPTS;
        }
        if (!this.data.users || this.data.users.length === 0) {
          this.data.users = DEFAULT_USERS;
        }
      } else {
        this.data = {
          subjects: DEFAULT_SUBJECTS,
          topics: DEFAULT_TOPICS,
          questions: [],
          attempts: DEFAULT_ATTEMPTS,
          users: DEFAULT_USERS
        };
        this.save();
      }
    } catch (e) {
      console.warn('Notice: Loading in-memory database defaults:', e);
      this.data = {
        subjects: DEFAULT_SUBJECTS,
        topics: DEFAULT_TOPICS,
        questions: [],
        attempts: DEFAULT_ATTEMPTS,
        users: DEFAULT_USERS
      };
    }
  }

  private save() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    try {
      fs.writeFileSync(TMP_DB_FILE, jsonStr, 'utf-8');
    } catch {
      try {
        fs.writeFileSync(DB_FILE, jsonStr, 'utf-8');
      } catch {
        // In-memory fallback if all filesystems are restricted
      }
    }
  }

  // Users Auth (Email or Roll Number)
  getUsers(): StudentUser[] {
    this.load();
    return this.data.users || [];
  }

  getUserByRoll(roll: string): StudentUser | undefined {
    this.load();
    const cleanRoll = roll.trim().toUpperCase();
    return this.data.users.find(u => u.roll.toUpperCase() === cleanRoll);
  }

  getUserByIdentifier(identifier: string): StudentUser | undefined {
    this.load();
    const clean = identifier.trim().toLowerCase();
    return this.data.users.find(u => 
      u.roll.toLowerCase() === clean || 
      (u.email && u.email.toLowerCase() === clean)
    );
  }

  createUser(user: Omit<StudentUser, 'id' | 'createdAt'>): StudentUser {
    this.load();
    const cleanRoll = user.roll.trim().toUpperCase();
    const cleanEmail = user.email ? user.email.trim().toLowerCase() : `${cleanRoll.toLowerCase()}@kongu.edu`;

    const existingRoll = this.data.users.find(u => u.roll.toUpperCase() === cleanRoll);
    if (existingRoll) {
      throw new Error(`Student account with Roll Number ${cleanRoll} already exists! Please Log In instead.`);
    }

    if (user.email) {
      const existingEmail = this.data.users.find(u => u.email && u.email.toLowerCase() === cleanEmail);
      if (existingEmail) {
        throw new Error(`Account with email address ${user.email} is already registered! Please Log In.`);
      }
    }

    const newUser: StudentUser = {
      ...user,
      id: `usr-${Date.now()}`,
      roll: cleanRoll,
      email: cleanEmail,
      createdAt: new Date().toISOString()
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  // Subjects
  getSubjects(): Subject[] {
    this.load();
    return this.data.subjects;
  }

  // Topics
  getTopics(subjectId?: string): Topic[] {
    this.load();
    if (subjectId) {
      return this.data.topics.filter(t => t.subjectId === subjectId);
    }
    return this.data.topics;
  }

  getTopicById(id: string): Topic | undefined {
    this.load();
    return this.data.topics.find(t => t.id === id);
  }

  // Questions
  getQuestions(): Question[] {
    this.load();
    return this.data.questions;
  }

  getQuestionsByFilters(filters: { topicId?: string; bloomLevel?: string; approved?: boolean }): Question[] {
    this.load();
    let list = this.data.questions;
    if (filters.topicId) {
      list = list.filter(q => q.topicId === filters.topicId);
    }
    if (filters.bloomLevel) {
      const levels = filters.bloomLevel.split(',').map(l => l.trim().toLowerCase());
      list = list.filter(q => levels.includes(q.bloomLevel.toLowerCase()));
    }
    if (filters.approved !== undefined) {
      list = list.filter(q => q.approved === filters.approved);
    }
    return list;
  }

  addQuestions(questions: Question[]) {
    this.load();
    this.data.questions.push(...questions);
    this.save();
  }

  approveQuestion(id: string): boolean {
    this.load();
    const idx = this.data.questions.findIndex(q => q.id === id);
    if (idx !== -1) {
      this.data.questions[idx].approved = true;
      this.save();
      return true;
    }
    return false;
  }

  updateQuestion(id: string, updated: Partial<Question>): boolean {
    this.load();
    const idx = this.data.questions.findIndex(q => q.id === id);
    if (idx !== -1) {
      this.data.questions[idx] = {
        ...this.data.questions[idx],
        ...updated
      };
      this.save();
      return true;
    }
    return false;
  }

  deleteQuestion(id: string): boolean {
    this.load();
    const len = this.data.questions.length;
    this.data.questions = this.data.questions.filter(q => q.id !== id);
    if (this.data.questions.length < len) {
      this.save();
      return true;
    }
    return false;
  }

  // Attempts
  getAttempts(filters?: { topicId?: string; subjectId?: string; testCode?: string }): Attempt[] {
    this.load();
    let list = this.data.attempts || [];
    if (filters?.topicId && filters.topicId !== 'all') {
      list = list.filter(a => a.topicId === filters.topicId);
    }
    if (filters?.subjectId && filters.subjectId !== 'all') {
      list = list.filter(a => a.subjectId === filters.subjectId);
    }
    if (filters?.testCode) {
      list = list.filter(a => a.testCode === filters.testCode);
    }
    return list;
  }

  getAttemptById(id: string): Attempt | undefined {
    this.load();
    return this.data.attempts.find(a => a.id === id);
  }

  addAttempt(attempt: Attempt) {
    this.load();
    this.data.attempts.push(attempt);
    this.save();
  }

  // Leaderboard & Rank Calculation
  getLeaderboard(topicId?: string, subjectId?: string, testCode?: string) {
    this.load();
    let attempts = this.getAttempts({ topicId, subjectId, testCode });

    // Deduplicate by student (best attempt per student per topic, or latest attempt)
    // To rank all attending candidates accurately:
    const bestAttemptMap = new Map<string, Attempt>();

    for (const att of attempts) {
      const key = `${att.studentRoll}-${att.topicId}`;
      const existing = bestAttemptMap.get(key);
      const attPct = att.percentage || Math.round((att.score / Math.max(1, att.total)) * 100);

      if (!existing) {
        bestAttemptMap.set(key, { ...att, percentage: attPct });
      } else {
        const existPct = existing.percentage || Math.round((existing.score / Math.max(1, existing.total)) * 100);
        if (attPct > existPct || (attPct === existPct && (att.timeTakenSeconds || 9999) < (existing.timeTakenSeconds || 9999))) {
          bestAttemptMap.set(key, { ...att, percentage: attPct });
        }
      }
    }

    const uniqueAttempts = Array.from(bestAttemptMap.values());

    // Sort by Percentage DESC, Score DESC, TimeTaken ASC, Date ASC
    uniqueAttempts.sort((a, b) => {
      const pctA = a.percentage || Math.round((a.score / Math.max(1, a.total)) * 100);
      const pctB = b.percentage || Math.round((b.score / Math.max(1, b.total)) * 100);
      if (pctB !== pctA) return pctB - pctA;
      if (b.score !== a.score) return b.score - a.score;
      const timeA = a.timeTakenSeconds || 300;
      const timeB = b.timeTakenSeconds || 300;
      if (timeA !== timeB) return timeA - timeB;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    const entries = uniqueAttempts.map((a, index) => {
      const topic = this.getTopicById(a.topicId);
      return {
        rank: index + 1,
        attemptId: a.id,
        studentName: a.studentName,
        studentRoll: a.studentRoll,
        studentEmail: a.studentEmail || `${a.studentRoll.toLowerCase()}@kongu.edu`,
        studentDepartment: a.studentDepartment || 'Engineering',
        topicId: a.topicId,
        topicName: a.topicName || topic?.name || a.topicId,
        bloomLevel: a.bloomLevel,
        score: a.score,
        total: a.total,
        percentage: a.percentage || Math.round((a.score / Math.max(1, a.total)) * 100),
        timeTakenSeconds: a.timeTakenSeconds || 180,
        createdAt: a.createdAt
      };
    });

    const totalAttended = entries.length;
    const avgPct = totalAttended > 0 ? Math.round(entries.reduce((sum, e) => sum + e.percentage, 0) / totalAttended) : 0;
    const topPct = totalAttended > 0 ? entries[0].percentage : 0;
    const passCount = entries.filter(e => e.percentage >= 50).length;
    const passRate = totalAttended > 0 ? Math.round((passCount / totalAttended) * 100) : 0;

    return {
      entries,
      stats: {
        totalAttended,
        averagePercentage: avgPct,
        topPercentage: topPct,
        passPercentage: passRate
      }
    };
  }
}

export const db = new Database();

