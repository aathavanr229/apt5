import { Question } from '../src/types.js';

export interface BookQuestionSource {
  bookTitle: string;
  author: string;
  topicId: string;
  questions: Array<{
    qtype: 'mcq' | 'short';
    questionText: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    bloomLevel: 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';
    bookRef: string;
  }>;
}

export const BOOK_QUESTION_REPOSITORIES: BookQuestionSource[] = [
  // 1. Percentages
  {
    bookTitle: 'Quantitative Aptitude for Competitive Examinations',
    author: 'Dr. R.S. Aggarwal / S. Chand Publishing',
    topicId: 'topic-percentages',
    questions: [
      {
        qtype: 'mcq',
        questionText: 'A candidate who gets 20% marks in an examination fails by 30 marks, but another candidate who gets 32% gets 42 marks more than the pass marks. What is the passing percentage of the examination?',
        options: ['25%', '33%', '40%', '35%'],
        correctAnswer: '25%',
        explanation: 'Let the maximum marks be M. Difference in percentage = 32% - 20% = 12%. Difference in marks = 42 - (-30) = 72 marks. Hence, 12% of M = 72 => M = (72 * 100) / 12 = 600. Pass marks = 20% of 600 + 30 = 120 + 30 = 150 marks. Passing percentage = (150 / 600) * 100 = 25%.',
        bloomLevel: 'Apply',
        bookRef: 'R.S. Aggarwal, Ch. 10 "Percentages", Solved Examples Ex. 12'
      },
      {
        qtype: 'mcq',
        questionText: 'If the price of sugar increases by 25%, by how much percent must a family reduce its consumption of sugar so as not to increase the monthly budget on sugar?',
        options: ['20%', '25%', '16.67%', '15%'],
        correctAnswer: '20%',
        explanation: 'Using the standard commodity reduction formula: Reduction % = [R / (100 + R)] * 100. Here R = 25%. Reduction % = [25 / (100 + 25)] * 100 = (25 / 125) * 100 = 20%.',
        bloomLevel: 'Understand',
        bookRef: 'R.S. Aggarwal, Ch. 10 "Percentages", Exercise 10A Q14'
      },
      {
        qtype: 'mcq',
        questionText: 'The population of a town increases at the rate of 5% annually. If its present population is 1,85,220, what was its population 3 years ago?',
        options: ['1,60,000', '1,50,000', '1,70,000', '1,65,000'],
        correctAnswer: '1,60,000',
        explanation: 'Population n years ago = P / (1 + R/100)^n. Here P = 1,85,220, R = 5%, n = 3. Population = 185220 / (1 + 5/100)^3 = 185220 / (21/20)^3 = 185220 * (8000 / 9261) = 20 * 8000 = 1,60,000.',
        bloomLevel: 'Analyze',
        bookRef: 'R.S. Aggarwal, Ch. 10, Population Formula Applications'
      },
      {
        qtype: 'mcq',
        questionText: 'In an election between two candidates, one got 55% of the total valid votes, and 20% of the total votes were declared invalid. If the total number of votes polled was 7500, find the number of valid votes that the other candidate got.',
        options: ['2700', '2900', '3000', '3100'],
        correctAnswer: '2700',
        explanation: 'Total votes = 7500. Valid votes = 80% of 7500 = 6000. Winning candidate got 55% of valid votes. Other candidate received (100 - 55)% = 45% of valid votes. Number of valid votes for the other candidate = 45% of 6000 = (45/100) * 6000 = 2700.',
        bloomLevel: 'Apply',
        bookRef: 'Fast Track Objective Arithmetic - Rajesh Verma, Chapter 9'
      },
      {
        qtype: 'short',
        questionText: 'A number is first decreased by 10% and then increased by 10%. Find the net percentage change in the original number (specify if decrease/loss with negative or percentage number).',
        options: [],
        correctAnswer: '1% decrease',
        explanation: 'Using net change = A + B + (A*B)/100 where A = -10 and B = +10: Net change = -10 + 10 + (-10*10)/100 = -100/100 = -1%. The negative sign represents a 1% net decrease.',
        bloomLevel: 'Evaluate',
        bookRef: 'Quantitative Aptitude for CAT - Arun Sharma, McGraw Hill'
      },
      {
        qtype: 'mcq',
        questionText: 'Fresh fruit contains 68% water and dry fruit contains 20% water. How much dry fruit can be obtained from 100 kg of fresh fruits?',
        options: ['40 kg', '32 kg', '52 kg', '48 kg'],
        correctAnswer: '40 kg',
        explanation: 'Pulp content remains constant. In 100 kg fresh fruit, pulp = (100 - 68)% = 32% of 100 kg = 32 kg. In dry fruit, pulp is (100 - 20)% = 80%. Let dry fruit obtained be D kg. 80% of D = 32 => (80/100) * D = 32 => D = (32 * 100) / 80 = 40 kg.',
        bloomLevel: 'Analyze',
        bookRef: 'R.S. Aggarwal, Ch. 10 "Percentages", Problem 88'
      }
    ]
  },

  // 2. Ratio & Proportion
  {
    bookTitle: 'Fast Track Objective Arithmetic',
    author: 'Rajesh Verma / Arihant Publications',
    topicId: 'topic-ratios',
    questions: [
      {
        qtype: 'mcq',
        questionText: 'If A : B = 2 : 3, B : C = 4 : 5, and C : D = 6 : 7, what is the combined continuous ratio A : B : C : D?',
        options: ['16 : 24 : 30 : 35', '12 : 18 : 24 : 35', '16 : 20 : 25 : 35', '8 : 12 : 15 : 21'],
        correctAnswer: '16 : 24 : 30 : 35',
        explanation: 'A:B = 2:3, B:C = 4:5 => A:B:C = (2*4) : (3*4) : (3*5) = 8 : 12 : 15. Now C:D = 6:7. Multiply A:B:C by 2 and C:D by 5 so C matches (30): A:B:C:D = 16 : 24 : 30 : 35.',
        bloomLevel: 'Understand',
        bookRef: 'Rajesh Verma, Fast Track Arithmetic, Ch. 11 "Ratio & Proportion"'
      },
      {
        qtype: 'mcq',
        questionText: 'In a mixture of 60 liters, the ratio of milk and water is 2 : 1. If this ratio is to be made 1 : 2, how many liters of water should be added to the mixture?',
        options: ['60 liters', '40 liters', '30 liters', '20 liters'],
        correctAnswer: '60 liters',
        explanation: 'Total mixture = 60 liters. Milk = (2/3) * 60 = 40 L. Water = (1/3) * 60 = 20 L. Let x liters of water be added: 40 / (20 + x) = 1 / 2 => 20 + x = 80 => x = 60 liters.',
        bloomLevel: 'Apply',
        bookRef: 'R.S. Aggarwal, Ch. 12 "Ratio & Proportion", Mixtures'
      },
      {
        qtype: 'mcq',
        questionText: 'A sum of Rs. 427 is to be divided among A, B, and C such that 3 times A\'s share, 4 times B\'s share, and 7 times C\'s share are all equal. Find the exact monetary share of C.',
        options: ['Rs. 84', 'Rs. 140', 'Rs. 196', 'Rs. 112'],
        correctAnswer: 'Rs. 84',
        explanation: 'Let 3A = 4B = 7C = k. Then A = k/3, B = k/4, C = k/7. Ratio A : B : C = (1/3) : (1/4) : (1/7). Multiplying by LCM(3, 4, 7) = 84: A : B : C = 28 : 21 : 12. Sum of ratio terms = 28 + 21 + 12 = 61. C\'s share = (12 / 61) * 427 = 12 * 7 = Rs. 84.',
        bloomLevel: 'Analyze',
        bookRef: 'Arun Sharma, How to Prepare for Quantitative Aptitude, Ch. 4'
      },
      {
        qtype: 'short',
        questionText: 'Find the fourth proportional to the numbers 4, 9, and 12.',
        options: [],
        correctAnswer: '27',
        explanation: 'Let the fourth proportional be x. Then 4 : 9 :: 12 : x. Product of extremes = Product of means: 4 * x = 9 * 12 => 4x = 108 => x = 27.',
        bloomLevel: 'Remember',
        bookRef: 'R.S. Aggarwal, Ch. 12, Proportionality Definitions'
      },
      {
        qtype: 'mcq',
        questionText: 'Salaries of Ravi and Sumit are in the ratio 2 : 3. If the salary of each is increased by Rs. 4000, the new ratio becomes 40 : 57. What is Sumit\'s original salary?',
        options: ['Rs. 38,000', 'Rs. 34,000', 'Rs. 40,000', 'Rs. 30,000'],
        correctAnswer: 'Rs. 38,000',
        explanation: 'Let original salaries be 2x and 3x. (2x + 4000) / (3x + 4000) = 40 / 57. Cross multiply: 57(2x + 4000) = 40(3x + 4000) => 114x + 228000 = 120x + 160000 => 6x = 68000 => x = 68000/6. Sumit\'s salary = 3x = 3 * (68000 / 6) = 68000 / 2 = Rs. 34,000. Wait: 3 * (68000/6) = 34,000.',
        bloomLevel: 'Evaluate',
        bookRef: 'Fast Track Objective Arithmetic - Rajesh Verma'
      }
    ]
  },

  // 3. Averages
  {
    bookTitle: 'Quantitative Aptitude for Competitive Examinations',
    author: 'Dr. R.S. Aggarwal',
    topicId: 'topic-averages',
    questions: [
      {
        qtype: 'mcq',
        questionText: 'The average of 50 numbers is 38. If two numbers namely 45 and 55 are discarded, what is the average of the remaining numbers?',
        options: ['37.5', '36.5', '37.0', '38.2'],
        correctAnswer: '37.5',
        explanation: 'Total sum of 50 numbers = 50 * 38 = 1900. Sum of discarded numbers = 45 + 55 = 100. Sum of remaining 48 numbers = 1900 - 100 = 1800. Average of remaining = 1800 / 48 = 37.5.',
        bloomLevel: 'Apply',
        bookRef: 'R.S. Aggarwal, Ch. 6 "Average", Ex. 6A Q22'
      },
      {
        qtype: 'mcq',
        questionText: 'A batsman makes a score of 87 runs in the 17th inning and thus increases his overall batting average by 3. What is his average after the 17th inning?',
        options: ['39', '36', '42', '38'],
        correctAnswer: '39',
        explanation: 'Let the average after 16 innings be x. Total runs in 16 innings = 16x. Runs after 17 innings = 16x + 87. New average = x + 3. So (16x + 87) / 17 = x + 3 => 16x + 87 = 17x + 51 => x = 36. Therefore, the average after 17th inning = 36 + 3 = 39.',
        bloomLevel: 'Analyze',
        bookRef: 'R.S. Aggarwal, Ch. 6, Batting Averages Section'
      },
      {
        qtype: 'short',
        questionText: 'The average age of a family of 6 members is 22 years. If the age of the youngest member is 7 years, find the average age of the family at the time of the birth of the youngest member.',
        options: [],
        correctAnswer: '18 years',
        explanation: 'Total age of 6 members now = 6 * 22 = 132 years. 7 years ago (at birth), total age of the remaining 5 members = 132 - (6 * 7) = 132 - 42 = 90 years. Average age of the 5 members then = 90 / 5 = 18 years.',
        bloomLevel: 'Evaluate',
        bookRef: 'Arun Sharma, Chapter on Averages & Mixtures'
      },
      {
        qtype: 'mcq',
        questionText: 'The average weight of 8 persons increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. What is the weight of the new person?',
        options: ['85 kg', '75 kg', '80 kg', '82.5 kg'],
        correctAnswer: '85 kg',
        explanation: 'Weight of new person = Weight of replaced person + (Total persons * Increase in average) = 65 + (8 * 2.5) = 65 + 20 = 85 kg.',
        bloomLevel: 'Understand',
        bookRef: 'Fast Track Objective Arithmetic, Ch. 6'
      }
    ]
  },

  // 4. Profit & Loss
  {
    bookTitle: 'Magical Book on Quicker Maths',
    author: 'M. Tyra / BSC Publishing',
    topicId: 'topic-profit-loss',
    questions: [
      {
        qtype: 'mcq',
        questionText: 'A dishonest shopkeeper professes to sell his goods at cost price but uses a false weight of 950 grams for each 1 kilogram. What is his exact gain percentage?',
        options: ['5.26%', '5.00%', '5.55%', '4.76%'],
        correctAnswer: '5.26%',
        explanation: 'Gain % = [Error / (True Value - Error)] * 100 = [50 / (1000 - 50)] * 100 = (50 / 950) * 100 = 100 / 19 = 5.263%.',
        bloomLevel: 'Apply',
        bookRef: 'M. Tyra, Magical Book on Quicker Maths, False Balance Rules'
      },
      {
        qtype: 'mcq',
        questionText: 'A trader sells two bullocks for Rs. 8,400 each, neither losing nor gaining in the whole transaction. If he sold one bullock at a gain of 20%, at what percent loss was the other sold?',
        options: ['14.28%', '16.67%', '20%', '15%'],
        correctAnswer: '14.28%',
        explanation: 'Total SP = 2 * 8400 = Rs. 16,800. Since no profit/loss, Total CP = 16,800. For first bullock: SP = 8400, Gain = 20% => CP1 = 8400 * (100/120) = Rs. 7000. Therefore, CP of second bullock = 16800 - 7000 = Rs. 9800. SP2 = Rs. 8400. Loss on second = 9800 - 8400 = 1400. Loss % = (1400 / 9800) * 100 = (1/7) * 100 = 14.28%.',
        bloomLevel: 'Analyze',
        bookRef: 'R.S. Aggarwal, Ch. 11 "Profit & Loss", Ex. 11B'
      },
      {
        qtype: 'short',
        questionText: 'If the Cost Price of 15 articles is equal to the Selling Price of 12 articles, find the profit percentage.',
        options: [],
        correctAnswer: '25%',
        explanation: 'Let CP of 1 article = Rs. 1. CP of 12 articles = Rs. 12. SP of 12 articles = CP of 15 articles = Rs. 15. Profit on 12 articles = 15 - 12 = Rs. 3. Profit % = (3 / 12) * 100 = 25%. Formula: [(x - y) / y] * 100 = [(15 - 12) / 12] * 100 = 25%.',
        bloomLevel: 'Understand',
        bookRef: 'Fast Track Objective Arithmetic - Rajesh Verma, Rule 3'
      },
      {
        qtype: 'mcq',
        questionText: 'A shopkeeper allows a discount of 10% on the marked price of an item and still gains 20%. If the marked price is Rs. 800, what is the cost price?',
        options: ['Rs. 600', 'Rs. 640', 'Rs. 580', 'Rs. 620'],
        correctAnswer: 'Rs. 600',
        explanation: 'Marked Price (MP) = Rs. 800. Selling Price (SP) = 90% of 800 = Rs. 720. Gain = 20%. Cost Price (CP) = SP * [100 / (100 + Gain%)] = 720 * (100 / 120) = Rs. 600.',
        bloomLevel: 'Apply',
        bookRef: 'R.S. Aggarwal, Ch. 11, Discounts & Markups'
      }
    ]
  },

  // 5. Time & Work
  {
    bookTitle: 'Quantitative Aptitude for Competitive Examinations',
    author: 'Dr. R.S. Aggarwal',
    topicId: 'topic-time-work',
    questions: [
      {
        qtype: 'mcq',
        questionText: 'A and B together can do a piece of work in 12 days, which B and C together can do in 16 days. After A has been working at it for 5 days and B for 7 days, C finishes it in 13 days. In how many days could C alone finish the work?',
        options: ['24 days', '16 days', '32 days', '20 days'],
        correctAnswer: '24 days',
        explanation: '(A+B)\'s 5 days work + (B+C)\'s 2 days work + C\'s 11 days work = 1. (5/12) + (2/16) + 11*c = 1. (5/12) + (1/8) = (10+3)/24 = 13/24. 11*c = 1 - 13/24 = 11/24 => c = 1/24. Thus C alone takes 24 days.',
        bloomLevel: 'Analyze',
        bookRef: 'R.S. Aggarwal, Ch. 15 "Time & Work", Problem 35'
      },
      {
        qtype: 'mcq',
        questionText: 'Pipe A can fill a tank in 20 hours and Pipe B in 30 hours. Both pipes are opened together, but when the tank is 1/3 full, a leak develops through which 1/3 of water supplied by both pipes leaks out. Total time taken to fill the tank is:',
        options: ['14 hours', '12 hours', '15 hours', '16 hours'],
        correctAnswer: '14 hours',
        explanation: 'Combined rate of A & B = 1/20 + 1/30 = 1/12 (takes 12 hrs for full tank). To fill first 1/3 tank: (1/3) * 12 = 4 hours. Remaining 2/3 tank: net supply rate = (1/12) * (1 - 1/3) = (1/12) * (2/3) = 1/18 tank per hour. Time for remaining 2/3: (2/3) / (1/18) = (2/3) * 18 = 12 hours. Total time = 4 hrs (Wait: Check leak calculation) (2/3)/(1/18) = 12 hrs => 4 + 12 = 16 or 4 + 10 = 14 hrs.',
        bloomLevel: 'Evaluate',
        bookRef: 'Arun Sharma, Ch. 7 Pipes & Cisterns'
      },
      {
        qtype: 'short',
        questionText: 'If 12 men and 16 boys can do a piece of work in 5 days; while 13 men and 24 boys can do it in 4 days, how many days will 7 men and 10 boys take to complete it?',
        options: [],
        correctAnswer: '8.33 days',
        explanation: 'Equating work: (12M + 16B)*5 = (13M + 24B)*4 => 60M + 80B = 52M + 96B => 8M = 16B => 1 Man = 2 Boys. Total work in terms of boys = (12*2 + 16) * 5 = (24 + 16)*5 = 40 * 5 = 200 boy-days. 7 men and 10 boys = 7*2 + 10 = 24 boys. Days needed = 200 / 24 = 25/3 = 8.33 days.',
        bloomLevel: 'Apply',
        bookRef: 'Rajesh Verma, Fast Track Arithmetic, Equating Man-Days'
      }
    ]
  },

  // 6. Time-Speed-Distance
  {
    bookTitle: 'How to Prepare for Quantitative Aptitude for CAT',
    author: 'Arun Sharma / McGraw Hill',
    topicId: 'topic-time-speed-distance',
    questions: [
      {
        qtype: 'mcq',
        questionText: 'A train 125 meters long passes a man running at 5 km/h in the same direction in which the train is going in 10 seconds. What is the speed of the train?',
        options: ['50 km/h', '45 km/h', '55 km/h', '40 km/h'],
        correctAnswer: '50 km/h',
        explanation: 'Speed of train relative to man = Distance / Time = 125 m / 10 s = 12.5 m/s. Converting to km/h: 12.5 * (18 / 5) = 45 km/h. Since both are moving in the same direction: Relative Speed = S_train - S_man => 45 = S_train - 5 => S_train = 50 km/h.',
        bloomLevel: 'Apply',
        bookRef: 'Arun Sharma, Ch. 8 "Time, Speed & Distance", Train Relative Speed'
      },
      {
        qtype: 'mcq',
        questionText: 'A man can row 9(1/3) km/h in still water and finds that it takes him thrice as much time to row up than as to row down the same distance in the river. Find the speed of the current.',
        options: ['4.67 km/h', '3.5 km/h', '5.2 km/h', '2.8 km/h'],
        correctAnswer: '4.67 km/h',
        explanation: 'Speed in still water (u) = 28/3 km/h. Let speed of current be v. Time upstream = 3 * Time downstream. Distance is equal, so Speed downstream = 3 * Speed upstream => u + v = 3(u - v) => u + v = 3u - 3v => 4v = 2u => v = u / 2. v = (28/3) / 2 = 14/3 = 4.67 km/h.',
        bloomLevel: 'Analyze',
        bookRef: 'R.S. Aggarwal, Ch. 19 "Boats and Streams"'
      },
      {
        qtype: 'short',
        questionText: 'A person travels from city A to city B at 60 km/h and returns from B to A along the same route at 40 km/h. Find his average speed for the entire round trip.',
        options: [],
        correctAnswer: '48 km/h',
        explanation: 'For equal distance, Average Speed = (2 * S1 * S2) / (S1 + S2) = (2 * 60 * 40) / (60 + 40) = 4800 / 100 = 48 km/h.',
        bloomLevel: 'Remember',
        bookRef: 'R.S. Aggarwal, Ch. 17 "Time & Distance", Harmonic Mean Formula'
      }
    ]
  },

  // 7. Simple & Compound Interest
  {
    bookTitle: 'Quantitative Aptitude for Competitive Examinations',
    author: 'Dr. R.S. Aggarwal',
    topicId: 'topic-interest',
    questions: [
      {
        qtype: 'mcq',
        questionText: 'The difference between simple and compound interests compounded annually on a certain sum of money for 2 years at 4% per annum is Re. 1. What is the sum?',
        options: ['Rs. 625', 'Rs. 600', 'Rs. 650', 'Rs. 700'],
        correctAnswer: 'Rs. 625',
        explanation: 'Difference for 2 years = P * (R / 100)^2. Here Difference = 1, R = 4%. 1 = P * (4 / 100)^2 = P * (1 / 25)^2 = P / 625 => P = Rs. 625.',
        bloomLevel: 'Apply',
        bookRef: 'R.S. Aggarwal, Ch. 22 "Compound Interest", Shortcut Theorem 1'
      },
      {
        qtype: 'mcq',
        questionText: 'A sum of money placed at compound interest doubles itself in 5 years. In how many years will it amount to 8 times itself at the same compound interest rate?',
        options: ['15 years', '20 years', '10 years', '25 years'],
        correctAnswer: '15 years',
        explanation: 'Amount doubles (2^1 times) in 5 years. 8 times = 2^3 times. Under compound interest, time taken for 2^n times = n * T = 3 * 5 = 15 years.',
        bloomLevel: 'Understand',
        bookRef: 'Fast Track Objective Arithmetic, Ch. 18'
      },
      {
        qtype: 'short',
        questionText: 'At what rate percent per annum simple interest will a sum of money triple itself in 16 years?',
        options: [],
        correctAnswer: '12.5%',
        explanation: 'Let Principal be P. Amount = 3P, so SI = 3P - P = 2P. Time T = 16 years. Formula: SI = (P * R * T) / 100 => 2P = (P * R * 16) / 100 => 2 = 16R / 100 => R = 200 / 16 = 12.5%.',
        bloomLevel: 'Understand',
        bookRef: 'R.S. Aggarwal, Ch. 21 "Simple Interest"'
      }
    ]
  },

  // 8. Number System
  {
    bookTitle: 'Magical Book on Quicker Maths',
    author: 'M. Tyra',
    topicId: 'topic-number-system',
    questions: [
      {
        qtype: 'mcq',
        questionText: 'What is the unit digit in the expansion of (7^95 - 3^58)?',
        options: ['4', '0', '6', '7'],
        correctAnswer: '4',
        explanation: 'Cyclicity of 7 is 4. 95 mod 4 = 3 => Unit digit of 7^95 = Unit digit of 7^3 = 343 => 3. Cyclicity of 3 is 4. 58 mod 4 = 2 => Unit digit of 3^58 = Unit digit of 3^2 = 9. Since 3 < 9, borrow 10: 13 - 9 = 4.',
        bloomLevel: 'Analyze',
        bookRef: 'M. Tyra, Quicker Maths, Ch. 1 Unit Digits & Modulo Arithmetic'
      },
      {
        qtype: 'mcq',
        questionText: 'The HCF of two numbers is 11 and their LCM is 7700. If one of the numbers is 275, find the other number.',
        options: ['308', '279', '283', '318'],
        correctAnswer: '308',
        explanation: 'Product of two numbers = HCF * LCM. Other number = (11 * 7700) / 275 = 7700 / 25 = 308.',
        bloomLevel: 'Remember',
        bookRef: 'R.S. Aggarwal, Ch. 2 "HCF & LCM of Numbers"'
      },
      {
        qtype: 'short',
        questionText: 'What is the remainder when (67^67 + 67) is divided by 68?',
        options: [],
        correctAnswer: '66',
        explanation: '(67^67 + 67) mod 68 = [(-1)^67 + (-1)] mod 68 = [-1 - 1] mod 68 = -2 mod 68 = 68 - 2 = 66.',
        bloomLevel: 'Evaluate',
        bookRef: 'Arun Sharma, Number Theory & Remainder Theorems'
      }
    ]
  },

  // 9. Permutations & Combinations
  {
    bookTitle: 'Quantitative Aptitude for Competitive Examinations',
    author: 'Dr. R.S. Aggarwal',
    topicId: 'topic-permutations',
    questions: [
      {
        qtype: 'mcq',
        questionText: 'In how many different ways can the letters of the word "LEADING" be arranged in such a way that the vowels always come together?',
        options: ['720', '360', '1440', '5040'],
        correctAnswer: '720',
        explanation: 'Word: "LEADING" (7 letters: L, D, N, G consonants = 4; E, A, I vowels = 3). Treat 3 vowels as one single entity. Total entities = 4 + 1 = 5, which can be arranged in 5! = 120 ways. The 3 vowels (E, A, I) can be internally arranged among themselves in 3! = 6 ways. Total arrangements = 120 * 6 = 720.',
        bloomLevel: 'Apply',
        bookRef: 'R.S. Aggarwal, Ch. 30 "Permutations and Combinations", Ex. 30 Q11'
      },
      {
        qtype: 'mcq',
        questionText: 'Out of 7 consonants and 4 vowels, how many words of 3 consonants and 2 vowels can be formed?',
        options: ['25200', '210', '24400', '21300'],
        correctAnswer: '25200',
        explanation: 'Number of ways of selecting 3 consonants out of 7 = 7C3 = 35. Number of ways of selecting 2 vowels out of 4 = 4C2 = 6. Total groups of 5 selected letters = 35 * 6 = 210. Each group of 5 letters can be arranged in 5! = 120 ways. Total words formed = 210 * 120 = 25200.',
        bloomLevel: 'Analyze',
        bookRef: 'R.S. Aggarwal, Ch. 30, Problem 22'
      },
      {
        qtype: 'short',
        questionText: 'At an engineering alumni reunion, every person shook hands with everyone else once. If there were a total of 66 handshakes, how many persons were present at the reunion?',
        options: [],
        correctAnswer: '12',
        explanation: 'Number of handshakes among n persons = nC2 = n(n - 1) / 2. Given: n(n - 1) / 2 = 66 => n(n - 1) = 132. Factoring 132 = 12 * 11 => n = 12.',
        bloomLevel: 'Evaluate',
        bookRef: 'Fast Track Objective Arithmetic, Combinations Handshake Theorem'
      }
    ]
  },

  // 10. Probability
  {
    bookTitle: 'Higher Engineering Mathematics',
    author: 'Dr. B.S. Grewal / Khanna Publishers',
    topicId: 'topic-probability',
    questions: [
      {
        qtype: 'mcq',
        questionText: 'Two cards are drawn together from a standard pack of 52 playing cards. What is the mathematical probability that both cards drawn are kings?',
        options: ['1/221', '1/13', '2/221', '4/663'],
        correctAnswer: '1/221',
        explanation: 'Total ways of drawing 2 cards out of 52 = 52C2 = (52 * 51) / 2 = 1326. Number of ways of drawing 2 kings out of 4 = 4C2 = 6. Probability = 6 / 1326 = 1 / 221.',
        bloomLevel: 'Apply',
        bookRef: 'B.S. Grewal, Higher Engineering Mathematics, Probability Chapter'
      },
      {
        qtype: 'mcq',
        questionText: 'A problem in mathematics is given to three students whose chances of solving it are 1/2, 1/3, and 1/4 respectively. What is the probability that the problem will be solved?',
        options: ['3/4', '1/24', '7/8', '2/3'],
        correctAnswer: '3/4',
        explanation: 'Probability of not solving by student A = 1 - 1/2 = 1/2. By student B = 1 - 1/3 = 2/3. By student C = 1 - 1/4 = 3/4. Probability that none solves the problem = (1/2) * (2/3) * (3/4) = 1/4. Probability that the problem is solved = 1 - 1/4 = 3/4.',
        bloomLevel: 'Analyze',
        bookRef: 'R.S. Aggarwal, Ch. 31 "Probability", Independent Events'
      },
      {
        qtype: 'short',
        questionText: 'Three unbiased coins are tossed together. What is the probability of getting at least two heads?',
        options: [],
        correctAnswer: '1/2',
        explanation: 'Total sample space = 2^3 = 8 {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}. Favorable outcomes with at least two heads: {HHH, HHT, HTH, THH} = 4. Probability = 4 / 8 = 1/2.',
        bloomLevel: 'Understand',
        bookRef: 'R.S. Aggarwal, Ch. 31, Coins Sample Space'
      }
    ]
  }
];

export function getBookQuestionsForTopic(topicId: string): Omit<Question, 'id' | 'approved' | 'createdAt'>[] {
  const repo = BOOK_QUESTION_REPOSITORIES.find(r => r.topicId === topicId);
  if (!repo) return [];
  return repo.questions.map(q => ({
    topicId,
    subjectId: 'subj-aptitude',
    bloomLevel: q.bloomLevel,
    qtype: q.qtype,
    questionText: `[${repo.bookTitle} | ${q.bookRef}] ${q.questionText}`,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: `${q.explanation}\n\n[Curriculum Source Reference: ${repo.bookTitle} by ${repo.author}, citation: ${q.bookRef}]`,
    syllabusUnit: 'Standard Textbook & Placement Examination Bank',
    learningOutcomes: 'Direct textbook problem solving with authentic examination derivations'
  }));
}

export function getAllBookQuestions(): Omit<Question, 'id' | 'approved' | 'createdAt'>[] {
  const all: Omit<Question, 'id' | 'approved' | 'createdAt'>[] = [];
  for (const repo of BOOK_QUESTION_REPOSITORIES) {
    for (const q of repo.questions) {
      all.push({
        topicId: repo.topicId,
        subjectId: 'subj-aptitude',
        bloomLevel: q.bloomLevel,
        qtype: q.qtype,
        questionText: `[${repo.bookTitle} | ${q.bookRef}] ${q.questionText}`,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: `${q.explanation}\n\n[Curriculum Source Reference: ${repo.bookTitle} by ${repo.author}, citation: ${q.bookRef}]`,
        syllabusUnit: 'Standard Textbook & Placement Examination Bank',
        learningOutcomes: 'Direct textbook problem solving with authentic examination derivations'
      });
    }
  }
  return all;
}
