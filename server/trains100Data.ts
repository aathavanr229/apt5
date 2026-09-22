/**
 * Official Aptitude Test Bank: Train Problems
 * 100 Comprehensive Numerical Questions across 10 Rules
 * Extracted directly from official PDF curriculum module for live examinations.
 */

export interface TrainProblemQuestion {
  id: string;
  qNum: number;
  ruleNum: number;
  ruleTitle: string;
  bloomLevel: string;
  qtype: 'mcq';
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topicId: 'topic-trains';
  subjectId: 'subj-aptitude';
}

export const TRAIN_PROBLEMS_100_BANK: TrainProblemQuestion[] = [
  {
    "id": "q-train-pdf-1",
    "qNum": 1,
    "ruleNum": 1,
    "ruleTitle": "Rule 1: Unit Conversions (km/h <-> m/s)",
    "bloomLevel": "Remember",
    "qtype": "mcq",
    "questionText": "[Q1 - Rule 1: Unit Conversions (km/h <-> m/s)] Convert a train speed of 108 km/h into meters per second (m/s).",
    "options": [
      "20 m/s",
      "30 m/s",
      "25 m/s",
      "35 m/s"
    ],
    "correctAnswer": "30 m/s",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed in m/s = Speed in km/h × (5 / 18) = 108 × (5 / 18) = 6 × 5 = 30 m/s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-2",
    "qNum": 2,
    "ruleNum": 1,
    "ruleTitle": "Rule 1: Unit Conversions (km/h <-> m/s)",
    "bloomLevel": "Remember",
    "qtype": "mcq",
    "questionText": "[Q2 - Rule 1: Unit Conversions (km/h <-> m/s)] A high-speed bullet train travels at 45 m/s. What is its speed in km/h?",
    "options": [
      "175 km/h",
      "180 km/h",
      "162 km/h",
      "150 km/h"
    ],
    "correctAnswer": "162 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed in km/h = Speed in m/s × (18 / 5) = 45 × (18 / 5) = 9 × 18 = 162 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-3",
    "qNum": 3,
    "ruleNum": 1,
    "ruleTitle": "Rule 1: Unit Conversions (km/h <-> m/s)",
    "bloomLevel": "Understand",
    "qtype": "mcq",
    "questionText": "[Q3 - Rule 1: Unit Conversions (km/h <-> m/s)] Express 63 km/h in m/s as a simplified fraction or decimal.",
    "options": [
      "16.2 m/s",
      "18.5 m/s",
      "19.0 m/s",
      "17.5 m/s"
    ],
    "correctAnswer": "17.5 m/s",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed in m/s = 63 × (5 / 18) = 7 × (5 / 2) = 35 / 2 = 17.5 m/s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-4",
    "qNum": 4,
    "ruleNum": 1,
    "ruleTitle": "Rule 1: Unit Conversions (km/h <-> m/s)",
    "bloomLevel": "Remember",
    "qtype": "mcq",
    "questionText": "[Q4 - Rule 1: Unit Conversions (km/h <-> m/s)] Convert 12.5 m/s into km/h.",
    "options": [
      "45 km/h",
      "40 km/h",
      "50 km/h",
      "42.5 km/h"
    ],
    "correctAnswer": "45 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed in km/h = 12.5 × (18 / 5) = 2.5 × 18 = 45 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-5",
    "qNum": 5,
    "ruleNum": 1,
    "ruleTitle": "Rule 1: Unit Conversions (km/h <-> m/s)",
    "bloomLevel": "Understand",
    "qtype": "mcq",
    "questionText": "[Q5 - Rule 1: Unit Conversions (km/h <-> m/s)] A local train speed is recorded as 40 m/s. Express this speed in km/h.",
    "options": [
      "120 km/h",
      "144 km/h",
      "136 km/h",
      "152 km/h"
    ],
    "correctAnswer": "144 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed in km/h = 40 × (18 / 5) = 8 × 18 = 144 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-6",
    "qNum": 6,
    "ruleNum": 1,
    "ruleTitle": "Rule 1: Unit Conversions (km/h <-> m/s)",
    "bloomLevel": "Remember",
    "qtype": "mcq",
    "questionText": "[Q6 - Rule 1: Unit Conversions (km/h <-> m/s)] Convert 144 km/h into m/s.",
    "options": [
      "45 m/s",
      "48 m/s",
      "40 m/s",
      "36 m/s"
    ],
    "correctAnswer": "40 m/s",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed in m/s = 144 × (5 / 18) = 8 × 5 = 40 m/s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-7",
    "qNum": 7,
    "ruleNum": 1,
    "ruleTitle": "Rule 1: Unit Conversions (km/h <-> m/s)",
    "bloomLevel": "Remember",
    "qtype": "mcq",
    "questionText": "[Q7 - Rule 1: Unit Conversions (km/h <-> m/s)] Express 15 m/s in km/h.",
    "options": [
      "50 km/h",
      "60 km/h",
      "48 km/h",
      "54 km/h"
    ],
    "correctAnswer": "54 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed in km/h = 15 × (18 / 5) = 3 × 18 = 54 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-8",
    "qNum": 8,
    "ruleNum": 1,
    "ruleTitle": "Rule 1: Unit Conversions (km/h <-> m/s)",
    "bloomLevel": "Remember",
    "qtype": "mcq",
    "questionText": "[Q8 - Rule 1: Unit Conversions (km/h <-> m/s)] Convert a freight train's speed of 36 km/h to m/s.",
    "options": [
      "10 m/s",
      "12 m/s",
      "8 m/s",
      "15 m/s"
    ],
    "correctAnswer": "10 m/s",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed in m/s = 36 × (5 / 18) = 2 × 5 = 10 m/s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-9",
    "qNum": 9,
    "ruleNum": 1,
    "ruleTitle": "Rule 1: Unit Conversions (km/h <-> m/s)",
    "bloomLevel": "Understand",
    "qtype": "mcq",
    "questionText": "[Q9 - Rule 1: Unit Conversions (km/h <-> m/s)] If a train moves at 35 m/s, calculate its speed in km/h.",
    "options": [
      "140 km/h",
      "126 km/h",
      "115 km/h",
      "135 km/h"
    ],
    "correctAnswer": "126 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed in km/h = 35 × (18 / 5) = 7 × 18 = 126 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-10",
    "qNum": 10,
    "ruleNum": 1,
    "ruleTitle": "Rule 1: Unit Conversions (km/h <-> m/s)",
    "bloomLevel": "Understand",
    "qtype": "mcq",
    "questionText": "[Q10 - Rule 1: Unit Conversions (km/h <-> m/s)] Convert 81 km/h into m/s.",
    "options": [
      "24.0 m/s",
      "25.0 m/s",
      "22.5 m/s",
      "20.5 m/s"
    ],
    "correctAnswer": "22.5 m/s",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed in m/s = 81 × (5 / 18) = 9 × (5 / 2) = 45 / 2 = 22.5 m/s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-11",
    "qNum": 11,
    "ruleNum": 2,
    "ruleTitle": "Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q11 - Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)] A 250 m long train runs at 90 km/h. How many seconds will it take to cross a signal pole?",
    "options": [
      "12 seconds",
      "8 seconds",
      "15 seconds",
      "10 seconds"
    ],
    "correctAnswer": "10 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed = 90 × (5 / 18) = 25 m/s. Distance = length of train = 250 m. Time = 250 / 25 = 10 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-12",
    "qNum": 12,
    "ruleNum": 2,
    "ruleTitle": "Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q12 - Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)] How long does a 140 m long train moving at 54 km/h take to pass a standing person?",
    "options": [
      "9.33 seconds",
      "8.50 seconds",
      "10.25 seconds",
      "9.00 seconds"
    ],
    "correctAnswer": "9.33 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed = 54 × (5 / 18) = 15 m/s. Time = Distance / Speed = 140 / 15 = 28 / 3 ≈ 9.33 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-13",
    "qNum": 13,
    "ruleNum": 2,
    "ruleTitle": "Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q13 - Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)] A train traveling at 72 km/h passes a tree on the side of the track in 11 seconds. Find the length of the train.",
    "options": [
      "210 m",
      "220 m",
      "200 m",
      "240 m"
    ],
    "correctAnswer": "220 m",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed = 72 × (5 / 18) = 20 m/s. Length of train = Speed × Time = 20 × 11 = 220 m.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-14",
    "qNum": 14,
    "ruleNum": 2,
    "ruleTitle": "Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q14 - Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)] A 300 m long express train crosses a telegraph pole in 12 seconds. Calculate the train's speed in km/h.",
    "options": [
      "85 km/h",
      "96 km/h",
      "90 km/h",
      "80 km/h"
    ],
    "correctAnswer": "90 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed in m/s = 300 / 12 = 25 m/s. Speed in km/h = 25 × (18 / 5) = 90 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-15",
    "qNum": 15,
    "ruleNum": 2,
    "ruleTitle": "Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q15 - Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)] Find the time taken by a 180 m long train to pass a lamp post if its speed is 45 km/h.",
    "options": [
      "12.5 seconds",
      "15.0 seconds",
      "16.2 seconds",
      "14.4 seconds"
    ],
    "correctAnswer": "14.4 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed = 45 × (5 / 18) = 12.5 m/s. Time = 180 / 12.5 = 14.4 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-16",
    "qNum": 16,
    "ruleNum": 2,
    "ruleTitle": "Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q16 - Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)] A train moving at 108 km/h crosses a standing man in 6 seconds. What is the length of the train?",
    "options": [
      "180 m",
      "160 m",
      "200 m",
      "175 m"
    ],
    "correctAnswer": "180 m",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed = 108 × (5 / 18) = 30 m/s. Length = Speed × Time = 30 × 6 = 180 m.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-17",
    "qNum": 17,
    "ruleNum": 2,
    "ruleTitle": "Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q17 - Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)] A 400 m train crosses a post in 16 seconds. Find its speed in m/s and km/h.",
    "options": [
      "22.5 m/s (81 km/h)",
      "25 m/s (90 km/h)",
      "20 m/s (72 km/h)",
      "30 m/s (108 km/h)"
    ],
    "correctAnswer": "25 m/s (90 km/h)",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed = 400 / 16 = 25 m/s. In km/h: 25 × (18 / 5) = 90 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-18",
    "qNum": 18,
    "ruleNum": 2,
    "ruleTitle": "Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q18 - Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)] How many seconds will a 120 m long train moving at 36 km/h take to completely cross a milestone?",
    "options": [
      "14 seconds",
      "15 seconds",
      "12 seconds",
      "10 seconds"
    ],
    "correctAnswer": "12 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed = 36 × (5 / 18) = 10 m/s. Time = 120 / 10 = 12 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-19",
    "qNum": 19,
    "ruleNum": 2,
    "ruleTitle": "Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q19 - Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)] A train running at 60 km/h crosses a pole in 9 seconds. Calculate the length of the train in meters.",
    "options": [
      "140 m",
      "160 m",
      "175 m",
      "150 m"
    ],
    "correctAnswer": "150 m",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed = 60 × (5 / 18) = 50 / 3 m/s. Length = (50 / 3) × 9 = 50 × 3 = 150 m.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-20",
    "qNum": 20,
    "ruleNum": 2,
    "ruleTitle": "Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q20 - Rule 2: Crossing Stationary Point Objects (Pole / Tree / Standing Person)] A 160 m train takes 8 seconds to pass a standing commuter. What is the speed of the train in km/h?",
    "options": [
      "72 km/h",
      "64 km/h",
      "80 km/h",
      "68 km/h"
    ],
    "correctAnswer": "72 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed = 160 / 8 = 20 m/s. In km/h: 20 × (18 / 5) = 72 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-21",
    "qNum": 21,
    "ruleNum": 3,
    "ruleTitle": "Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q21 - Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)] A 200 m long train running at 72 km/h crosses a bridge of length 300 m. Find the time taken.",
    "options": [
      "22.5 seconds",
      "25 seconds",
      "20 seconds",
      "30 seconds"
    ],
    "correctAnswer": "25 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 200 + 300 = 500 m. Speed = 72 × (5 / 18) = 20 m/s. Time = 500 / 20 = 25 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-22",
    "qNum": 22,
    "ruleNum": 3,
    "ruleTitle": "Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q22 - Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)] A train 150 m long takes 20 seconds to cross a 250 m long platform. Find the speed of the train in km/h.",
    "options": [
      "80 km/h",
      "64 km/h",
      "72 km/h",
      "60 km/h"
    ],
    "correctAnswer": "72 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 150 + 250 = 400 m. Speed = 400 / 20 = 20 m/s. In km/h = 20 × (18 / 5) = 72 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-23",
    "qNum": 23,
    "ruleNum": 3,
    "ruleTitle": "Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q23 - Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)] A train traveling at 54 km/h passes through a 400 m long tunnel in 36 seconds. Find the length of the train.",
    "options": [
      "120 m",
      "150 m",
      "160 m",
      "140 m"
    ],
    "correctAnswer": "140 m",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed = 54 × (5 / 18) = 15 m/s. Total Distance = 15 × 36 = 540 m. Train Length = 540 - 400 = 140 m.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-24",
    "qNum": 24,
    "ruleNum": 3,
    "ruleTitle": "Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q24 - Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)] A 240 m long train crosses a platform equal to its own length in 24 seconds. Find the speed of the train in km/h.",
    "options": [
      "72 km/h",
      "64 km/h",
      "70 km/h",
      "80 km/h"
    ],
    "correctAnswer": "72 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nPlatform length = 240 m. Total Distance = 240 + 240 = 480 m. Speed = 480 / 24 = 20 m/s. In km/h = 20 × (18 / 5) = 72 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-25",
    "qNum": 25,
    "ruleNum": 3,
    "ruleTitle": "Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q25 - Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)] A train of length 350 m running at 90 km/h crosses a 150 m long platform. Find the time taken to cross the platform.",
    "options": [
      "25 seconds",
      "20 seconds",
      "18 seconds",
      "22 seconds"
    ],
    "correctAnswer": "20 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 350 + 150 = 500 m. Speed = 90 × (5 / 18) = 25 m/s. Time = 500 / 25 = 20 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-26",
    "qNum": 26,
    "ruleNum": 3,
    "ruleTitle": "Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q26 - Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)] A 220 m long train running at 60 km/h crosses a platform in 30 seconds. Find the length of the platform.",
    "options": [
      "300 m",
      "270 m",
      "280 m",
      "250 m"
    ],
    "correctAnswer": "280 m",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed = 60 × (5 / 18) = 50 / 3 m/s. Total Distance = (50 / 3) × 30 = 500 m. Platform Length = 500 - 220 = 280 m.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-27",
    "qNum": 27,
    "ruleNum": 3,
    "ruleTitle": "Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q27 - Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)] A train 180 m long crosses a 120 m bridge in 15 seconds. Find the speed of the train in km/h.",
    "options": [
      "68 km/h",
      "75 km/h",
      "80 km/h",
      "72 km/h"
    ],
    "correctAnswer": "72 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 180 + 120 = 300 m. Speed = 300 / 15 = 20 m/s. In km/h = 20 × (18 / 5) = 72 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-28",
    "qNum": 28,
    "ruleNum": 3,
    "ruleTitle": "Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q28 - Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)] A 320 m long train moving at 108 km/h crosses a 280 m platform. How many seconds will it take to pass?",
    "options": [
      "20 seconds",
      "18 seconds",
      "22 seconds",
      "24 seconds"
    ],
    "correctAnswer": "20 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 320 + 280 = 600 m. Speed = 108 × (5 / 18) = 30 m/s. Time = 600 / 30 = 20 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-29",
    "qNum": 29,
    "ruleNum": 3,
    "ruleTitle": "Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q29 - Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)] A train traveling at 45 km/h crosses a 300 m bridge in 40 seconds. Calculate the length of the train in meters.",
    "options": [
      "250 m",
      "200 m",
      "180 m",
      "220 m"
    ],
    "correctAnswer": "200 m",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nSpeed = 45 × (5 / 18) = 12.5 m/s. Total Distance = 12.5 × 40 = 500 m. Train Length = 500 - 300 = 200 m.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-30",
    "qNum": 30,
    "ruleNum": 3,
    "ruleTitle": "Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q30 - Rule 3: Crossing Extended Stationary Objects (Platform / Bridge / Tunnel)] How much time will a 260 m long train running at 72 km/h take to cross a 140 m platform?",
    "options": [
      "22 seconds",
      "25 seconds",
      "20 seconds",
      "18 seconds"
    ],
    "correctAnswer": "20 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 260 + 140 = 400 m. Speed = 72 × (5 / 18) = 20 m/s. Time = 400 / 20 = 20 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-31",
    "qNum": 31,
    "ruleNum": 4,
    "ruleTitle": "Rule 4: Train & Moving Person (Same Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q31 - Rule 4: Train & Moving Person (Same Direction)] A 180 m train running at 63 km/h passes a man running at 9 km/h in the same direction. Find time taken.",
    "options": [
      "10 seconds",
      "14 seconds",
      "15 seconds",
      "12 seconds"
    ],
    "correctAnswer": "12 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 63 - 9 = 54 km/h = 54 × (5 / 18) = 15 m/s. Time = 180 / 15 = 12 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-32",
    "qNum": 32,
    "ruleNum": 4,
    "ruleTitle": "Rule 4: Train & Moving Person (Same Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q32 - Rule 4: Train & Moving Person (Same Direction)] A train 200 m long at 75 km/h overtakes a jogger running at 3 km/h in same direction. Find time in seconds.",
    "options": [
      "10 seconds",
      "12 seconds",
      "8 seconds",
      "15 seconds"
    ],
    "correctAnswer": "10 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 75 - 3 = 72 km/h = 20 m/s. Time = 200 / 20 = 10 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-33",
    "qNum": 33,
    "ruleNum": 4,
    "ruleTitle": "Rule 4: Train & Moving Person (Same Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q33 - Rule 4: Train & Moving Person (Same Direction)] A 120 m train moving at 50 km/h passes a man running in same direction in 10 s. Find speed of the man.",
    "options": [
      "8.0 km/h",
      "6.8 km/h",
      "6.0 km/h",
      "7.2 km/h"
    ],
    "correctAnswer": "6.8 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 120 / 10 = 12 m/s = 12 × (18 / 5) = 43.2 km/h. S_man = 50 - 43.2 = 6.8 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-34",
    "qNum": 34,
    "ruleNum": 4,
    "ruleTitle": "Rule 4: Train & Moving Person (Same Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q34 - Rule 4: Train & Moving Person (Same Direction)] A man running at 5 km/h is overtaken by a 150 m train in 18 seconds. Find the speed of the train in km/h.",
    "options": [
      "38 km/h",
      "40 km/h",
      "35 km/h",
      "32 km/h"
    ],
    "correctAnswer": "35 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 150 / 18 = 25 / 3 m/s = (25 / 3) × (18 / 5) = 30 km/h. S_train = 30 + 5 = 35 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-35",
    "qNum": 35,
    "ruleNum": 4,
    "ruleTitle": "Rule 4: Train & Moving Person (Same Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q35 - Rule 4: Train & Moving Person (Same Direction)] A train 300 m long running at 80 km/h passes a person moving at 8 km/h in same direction. Calculate time.",
    "options": [
      "12 seconds",
      "18 seconds",
      "20 seconds",
      "15 seconds"
    ],
    "correctAnswer": "15 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 80 - 8 = 72 km/h = 20 m/s. Time = 300 / 20 = 15 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-36",
    "qNum": 36,
    "ruleNum": 4,
    "ruleTitle": "Rule 4: Train & Moving Person (Same Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q36 - Rule 4: Train & Moving Person (Same Direction)] A 220 m train moving at 65 km/h overtakes a walker at 11 km/h. How long does the passing take?",
    "options": [
      "14.67 seconds",
      "13.50 seconds",
      "15.25 seconds",
      "16.00 seconds"
    ],
    "correctAnswer": "14.67 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 65 - 11 = 54 km/h = 15 m/s. Time = 220 / 15 ≈ 14.67 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-37",
    "qNum": 37,
    "ruleNum": 4,
    "ruleTitle": "Rule 4: Train & Moving Person (Same Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q37 - Rule 4: Train & Moving Person (Same Direction)] Find time taken by a 160 m train running at 58 km/h to pass a boy running at 4 km/h in the same direction.",
    "options": [
      "12.00 seconds",
      "10.67 seconds",
      "9.50 seconds",
      "11.33 seconds"
    ],
    "correctAnswer": "10.67 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 58 - 4 = 54 km/h = 15 m/s. Time = 160 / 15 ≈ 10.67 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-38",
    "qNum": 38,
    "ruleNum": 4,
    "ruleTitle": "Rule 4: Train & Moving Person (Same Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q38 - Rule 4: Train & Moving Person (Same Direction)] A train passes a man running at 6 km/h in same direction in 12 s. If train length is 100 m, find train speed.",
    "options": [
      "34 km/h",
      "40 km/h",
      "36 km/h",
      "32 km/h"
    ],
    "correctAnswer": "36 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 100 / 12 = 25 / 3 m/s = 30 km/h. S_train = 30 + 6 = 36 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-39",
    "qNum": 39,
    "ruleNum": 4,
    "ruleTitle": "Rule 4: Train & Moving Person (Same Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q39 - Rule 4: Train & Moving Person (Same Direction)] A 250 m long train at 92 km/h overtakes a runner at 10 km/h. Find crossing time in seconds.",
    "options": [
      "12.15 seconds",
      "10.20 seconds",
      "11.50 seconds",
      "10.98 seconds"
    ],
    "correctAnswer": "10.98 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 92 - 10 = 82 km/h = 82 × (5 / 18) = 205 / 9 m/s. Time = 250 / (205 / 9) = 2250 / 205 ≈ 10.98 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-40",
    "qNum": 40,
    "ruleNum": 4,
    "ruleTitle": "Rule 4: Train & Moving Person (Same Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q40 - Rule 4: Train & Moving Person (Same Direction)] A 140 m train passes a cyclist moving at 12 km/h in same direction in 14 seconds. Find speed of train.",
    "options": [
      "48 km/h",
      "42 km/h",
      "45 km/h",
      "52 km/h"
    ],
    "correctAnswer": "48 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 140 / 14 = 10 m/s = 10 × (18 / 5) = 36 km/h. S_train = 36 + 12 = 48 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-41",
    "qNum": 41,
    "ruleNum": 5,
    "ruleTitle": "Rule 5: Train & Moving Person (Opposite Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q41 - Rule 5: Train & Moving Person (Opposite Direction)] A 150 m train running at 54 km/h passes a man running towards it at 6 km/h. Find crossing time.",
    "options": [
      "11 seconds",
      "9 seconds",
      "8 seconds",
      "10 seconds"
    ],
    "correctAnswer": "9 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 54 + 6 = 60 km/h = 60 × (5 / 18) = 50 / 3 m/s. Time = 150 / (50 / 3) = 9 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-42",
    "qNum": 42,
    "ruleNum": 5,
    "ruleTitle": "Rule 5: Train & Moving Person (Opposite Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q42 - Rule 5: Train & Moving Person (Opposite Direction)] A train 220 m long at 60 km/h passes a runner coming from opposite direction at 12 km/h. Calculate time.",
    "options": [
      "12 seconds",
      "13 seconds",
      "11 seconds",
      "10 seconds"
    ],
    "correctAnswer": "11 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 60 + 12 = 72 km/h = 20 m/s. Time = 220 / 20 = 11 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-43",
    "qNum": 43,
    "ruleNum": 5,
    "ruleTitle": "Rule 5: Train & Moving Person (Opposite Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q43 - Rule 5: Train & Moving Person (Opposite Direction)] A man running at 10 km/h crosses a 180 m long train approaching him in 8 seconds. Find train speed.",
    "options": [
      "68 km/h",
      "75 km/h",
      "81 km/h",
      "71 km/h"
    ],
    "correctAnswer": "71 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 180 / 8 = 22.5 m/s = 22.5 × (18 / 5) = 81 km/h. S_train = 81 - 10 = 71 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-44",
    "qNum": 44,
    "ruleNum": 5,
    "ruleTitle": "Rule 5: Train & Moving Person (Opposite Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q44 - Rule 5: Train & Moving Person (Opposite Direction)] A 200 m long train running at 82 km/h passes a cyclist coming in opposite direction at 8 km/h. Find time.",
    "options": [
      "8 seconds",
      "7 seconds",
      "9 seconds",
      "10 seconds"
    ],
    "correctAnswer": "8 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 82 + 8 = 90 km/h = 25 m/s. Time = 200 / 25 = 8 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-45",
    "qNum": 45,
    "ruleNum": 5,
    "ruleTitle": "Rule 5: Train & Moving Person (Opposite Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q45 - Rule 5: Train & Moving Person (Opposite Direction)] How long will a 160 m train at 48 km/h take to pass a person walking towards it at 6 km/h?",
    "options": [
      "12.00 seconds",
      "10.67 seconds",
      "9.50 seconds",
      "11.20 seconds"
    ],
    "correctAnswer": "10.67 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 48 + 6 = 54 km/h = 15 m/s. Time = 160 / 15 ≈ 10.67 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-46",
    "qNum": 46,
    "ruleNum": 5,
    "ruleTitle": "Rule 5: Train & Moving Person (Opposite Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q46 - Rule 5: Train & Moving Person (Opposite Direction)] A train 250 m long passes a person running towards it at 5 km/h in 10 seconds. Find train speed in km/h.",
    "options": [
      "90 km/h",
      "75 km/h",
      "85 km/h",
      "80 km/h"
    ],
    "correctAnswer": "85 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 250 / 10 = 25 m/s = 90 km/h. S_train = 90 - 5 = 85 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-47",
    "qNum": 47,
    "ruleNum": 5,
    "ruleTitle": "Rule 5: Train & Moving Person (Opposite Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q47 - Rule 5: Train & Moving Person (Opposite Direction)] Find time taken by a 300 m train moving at 70 km/h to pass a person running opposite at 2 km/h.",
    "options": [
      "12 seconds",
      "16 seconds",
      "18 seconds",
      "15 seconds"
    ],
    "correctAnswer": "15 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 70 + 2 = 72 km/h = 20 m/s. Time = 300 / 20 = 15 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-48",
    "qNum": 48,
    "ruleNum": 5,
    "ruleTitle": "Rule 5: Train & Moving Person (Opposite Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q48 - Rule 5: Train & Moving Person (Opposite Direction)] A 120 m long train running at 31 km/h meets a man running opposite at 5 km/h. Find crossing time.",
    "options": [
      "12 seconds",
      "10 seconds",
      "14 seconds",
      "15 seconds"
    ],
    "correctAnswer": "12 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 31 + 5 = 36 km/h = 10 m/s. Time = 120 / 10 = 12 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-49",
    "qNum": 49,
    "ruleNum": 5,
    "ruleTitle": "Rule 5: Train & Moving Person (Opposite Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q49 - Rule 5: Train & Moving Person (Opposite Direction)] A train moving at 90 km/h passes a man coming opposite at 18 km/h in 5 seconds. Find train length.",
    "options": [
      "175 m",
      "150 m",
      "140 m",
      "160 m"
    ],
    "correctAnswer": "150 m",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 90 + 18 = 108 km/h = 30 m/s. Train Length = 30 × 5 = 150 m.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-50",
    "qNum": 50,
    "ruleNum": 5,
    "ruleTitle": "Rule 5: Train & Moving Person (Opposite Direction)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q50 - Rule 5: Train & Moving Person (Opposite Direction)] A 210 m train passes a man running opposite at 6 km/h in 9 seconds. Calculate train speed in km/h.",
    "options": [
      "84 km/h",
      "80 km/h",
      "78 km/h",
      "72 km/h"
    ],
    "correctAnswer": "78 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 210 / 9 = 70 / 3 m/s = (70 / 3) × (18 / 5) = 84 km/h. S_train = 84 - 6 = 78 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-51",
    "qNum": 51,
    "ruleNum": 6,
    "ruleTitle": "Rule 6: Two Trains Moving in Opposite Directions",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q51 - Rule 6: Two Trains Moving in Opposite Directions] Two trains 140 m and 160 m long move in opposite directions at 42 km/h and 30 km/h. Find crossing time.",
    "options": [
      "12 seconds",
      "18 seconds",
      "20 seconds",
      "15 seconds"
    ],
    "correctAnswer": "15 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 140 + 160 = 300 m. Relative Speed = 42 + 30 = 72 km/h = 20 m/s. Time = 300 / 20 = 15 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-52",
    "qNum": 52,
    "ruleNum": 6,
    "ruleTitle": "Rule 6: Two Trains Moving in Opposite Directions",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q52 - Rule 6: Two Trains Moving in Opposite Directions] Two trains of lengths 200 m and 250 m travel opposite at 60 km/h and 30 km/h. Calculate crossing time.",
    "options": [
      "18 seconds",
      "15 seconds",
      "20 seconds",
      "22 seconds"
    ],
    "correctAnswer": "18 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 200 + 250 = 450 m. Relative Speed = 60 + 30 = 90 km/h = 25 m/s. Time = 450 / 25 = 18 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-53",
    "qNum": 53,
    "ruleNum": 6,
    "ruleTitle": "Rule 6: Two Trains Moving in Opposite Directions",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q53 - Rule 6: Two Trains Moving in Opposite Directions] Train A (120 m, 45 km/h) and Train B (180 m, 63 km/h) move opposite. How long to completely pass?",
    "options": [
      "15 seconds",
      "10 seconds",
      "12 seconds",
      "8 seconds"
    ],
    "correctAnswer": "10 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 120 + 180 = 300 m. Relative Speed = 45 + 63 = 108 km/h = 30 m/s. Time = 300 / 30 = 10 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-54",
    "qNum": 54,
    "ruleNum": 6,
    "ruleTitle": "Rule 6: Two Trains Moving in Opposite Directions",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q54 - Rule 6: Two Trains Moving in Opposite Directions] Two trains of equal length 150 m run opposite. They cross each other in 10 seconds. Find sum of speeds in km/h.",
    "options": [
      "100 km/h",
      "120 km/h",
      "108 km/h",
      "90 km/h"
    ],
    "correctAnswer": "108 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 150 + 150 = 300 m. Relative Speed = 300 / 10 = 30 m/s = 30 × (18 / 5) = 108 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-55",
    "qNum": 55,
    "ruleNum": 6,
    "ruleTitle": "Rule 6: Two Trains Moving in Opposite Directions",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q55 - Rule 6: Two Trains Moving in Opposite Directions] Train 1 (220 m, 70 km/h) meets Train 2 (180 m) running opposite at 38 km/h. Find crossing time.",
    "options": [
      "12.00 seconds",
      "14.50 seconds",
      "15.00 seconds",
      "13.33 seconds"
    ],
    "correctAnswer": "13.33 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 220 + 180 = 400 m. Relative Speed = 70 + 38 = 108 km/h = 30 m/s. Time = 400 / 30 ≈ 13.33 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-56",
    "qNum": 56,
    "ruleNum": 6,
    "ruleTitle": "Rule 6: Two Trains Moving in Opposite Directions",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q56 - Rule 6: Two Trains Moving in Opposite Directions] Two trains 300 m and 200 m long move opposite at 50 km/h and 40 km/h. Find time taken to cross.",
    "options": [
      "20 seconds",
      "18 seconds",
      "22 seconds",
      "25 seconds"
    ],
    "correctAnswer": "20 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 300 + 200 = 500 m. Relative Speed = 50 + 40 = 90 km/h = 25 m/s. Time = 500 / 25 = 20 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-57",
    "qNum": 57,
    "ruleNum": 6,
    "ruleTitle": "Rule 6: Two Trains Moving in Opposite Directions",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q57 - Rule 6: Two Trains Moving in Opposite Directions] Two trains running opposite at 36 km/h and 54 km/h cross in 12 seconds. If one is 140 m, find other's length.",
    "options": [
      "180 m",
      "160 m",
      "150 m",
      "170 m"
    ],
    "correctAnswer": "160 m",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 36 + 54 = 90 km/h = 25 m/s. Total Distance = 25 × 12 = 300 m. Other length = 300 - 140 = 160 m.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-58",
    "qNum": 58,
    "ruleNum": 6,
    "ruleTitle": "Rule 6: Two Trains Moving in Opposite Directions",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q58 - Rule 6: Two Trains Moving in Opposite Directions] Two trains of length 175 m and 125 m travel in opposite directions at 62 km/h and 46 km/h. Calculate time taken to cross each other.",
    "options": [
      "8 seconds",
      "14 seconds",
      "10 seconds",
      "12 seconds"
    ],
    "correctAnswer": "10 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 175 + 125 = 300 m. Relative Speed = 62 + 46 = 108 km/h = 30 m/s. Time = 300 / 30 = 10 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-59",
    "qNum": 59,
    "ruleNum": 6,
    "ruleTitle": "Rule 6: Two Trains Moving in Opposite Directions",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q59 - Rule 6: Two Trains Moving in Opposite Directions] Two trains of equal length 250 m each run in opposite directions at 80 km/h and 100 km/h. Find the time taken to cross each other.",
    "options": [
      "12 seconds",
      "8 seconds",
      "15 seconds",
      "10 seconds"
    ],
    "correctAnswer": "10 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 250 + 250 = 500 m. Relative Speed = 80 + 100 = 180 km/h = 50 m/s. Time = 500 / 50 = 10 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-60",
    "qNum": 60,
    "ruleNum": 6,
    "ruleTitle": "Rule 6: Two Trains Moving in Opposite Directions",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q60 - Rule 6: Two Trains Moving in Opposite Directions] Two trains of length 100 m and 150 m travel in opposite directions. Train A travels at 50 km/h and crosses Train B in 9 seconds. Find the speed of Train B in km/h.",
    "options": [
      "50 km/h",
      "45 km/h",
      "55 km/h",
      "60 km/h"
    ],
    "correctAnswer": "50 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 100 + 150 = 250 m. Relative Speed = 250 / 9 m/s = (250 / 9) × (18 / 5) = 100 km/h. Speed of Train B = 100 - 50 = 50 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-61",
    "qNum": 61,
    "ruleNum": 7,
    "ruleTitle": "Rule 7: Two Trains Moving in Same Direction (Overtaking)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q61 - Rule 7: Two Trains Moving in Same Direction (Overtaking)] Two trains 160 m and 140 m long run same direction at 78 km/h and 42 km/h. Find overtaking time.",
    "options": [
      "40 seconds",
      "30 seconds",
      "25 seconds",
      "35 seconds"
    ],
    "correctAnswer": "30 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 160 + 140 = 300 m. Relative Speed = 78 - 42 = 36 km/h = 10 m/s. Time = 300 / 10 = 30 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-62",
    "qNum": 62,
    "ruleNum": 7,
    "ruleTitle": "Rule 7: Two Trains Moving in Same Direction (Overtaking)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q62 - Rule 7: Two Trains Moving in Same Direction (Overtaking)] Train A (200 m, 90 km/h) overtakes Train B (300 m, 54 km/h) in same direction. Calculate time required.",
    "options": [
      "55 seconds",
      "60 seconds",
      "50 seconds",
      "45 seconds"
    ],
    "correctAnswer": "50 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 200 + 300 = 500 m. Relative Speed = 90 - 54 = 36 km/h = 10 m/s. Time = 500 / 10 = 50 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-63",
    "qNum": 63,
    "ruleNum": 7,
    "ruleTitle": "Rule 7: Two Trains Moving in Same Direction (Overtaking)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q63 - Rule 7: Two Trains Moving in Same Direction (Overtaking)] Two trains of lengths 120 m and 180 m move same direction at 65 km/h and 29 km/h. Find overtaking time.",
    "options": [
      "28 seconds",
      "32 seconds",
      "36 seconds",
      "30 seconds"
    ],
    "correctAnswer": "30 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 120 + 180 = 300 m. Relative Speed = 65 - 29 = 36 km/h = 10 m/s. Time = 300 / 10 = 30 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-64",
    "qNum": 64,
    "ruleNum": 7,
    "ruleTitle": "Rule 7: Two Trains Moving in Same Direction (Overtaking)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q64 - Rule 7: Two Trains Moving in Same Direction (Overtaking)] A 150 m train at 70 km/h overtakes a 100 m train at 52 km/h. Calculate time taken to completely cross.",
    "options": [
      "50 seconds",
      "45 seconds",
      "55 seconds",
      "60 seconds"
    ],
    "correctAnswer": "50 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 150 + 100 = 250 m. Relative Speed = 70 - 52 = 18 km/h = 5 m/s. Time = 250 / 5 = 50 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-65",
    "qNum": 65,
    "ruleNum": 7,
    "ruleTitle": "Rule 7: Two Trains Moving in Same Direction (Overtaking)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q65 - Rule 7: Two Trains Moving in Same Direction (Overtaking)] Faster train (85 km/h) overtakes slower train (49 km/h) in 30 s. If slower train is 120 m, find faster train length.",
    "options": [
      "175 m",
      "180 m",
      "160 m",
      "200 m"
    ],
    "correctAnswer": "180 m",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 85 - 49 = 36 km/h = 10 m/s. Total Distance = 10 × 30 = 300 m. Faster Train Length = 300 - 120 = 180 m.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-66",
    "qNum": 66,
    "ruleNum": 7,
    "ruleTitle": "Rule 7: Two Trains Moving in Same Direction (Overtaking)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q66 - Rule 7: Two Trains Moving in Same Direction (Overtaking)] Two trains 220 m and 180 m run same direction at 80 km/h and 44 km/h. Find time taken by faster to pass slower.",
    "options": [
      "45 seconds",
      "50 seconds",
      "40 seconds",
      "35 seconds"
    ],
    "correctAnswer": "40 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 220 + 180 = 400 m. Relative Speed = 80 - 44 = 36 km/h = 10 m/s. Time = 400 / 10 = 40 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-67",
    "qNum": 67,
    "ruleNum": 7,
    "ruleTitle": "Rule 7: Two Trains Moving in Same Direction (Overtaking)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q67 - Rule 7: Two Trains Moving in Same Direction (Overtaking)] Train 1 (250 m, 60 km/h) overtakes Train 2 (150 m, 24 km/h). Find overtaking time in seconds.",
    "options": [
      "36 seconds",
      "44 seconds",
      "48 seconds",
      "40 seconds"
    ],
    "correctAnswer": "40 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 250 + 150 = 400 m. Relative Speed = 60 - 24 = 36 km/h = 10 m/s. Time = 400 / 10 = 40 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-68",
    "qNum": 68,
    "ruleNum": 7,
    "ruleTitle": "Rule 7: Two Trains Moving in Same Direction (Overtaking)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q68 - Rule 7: Two Trains Moving in Same Direction (Overtaking)] Two trains 100 m each run same direction at 56 km/h and 38 km/h. Calculate overtaking time.",
    "options": [
      "40 seconds",
      "30 seconds",
      "35 seconds",
      "45 seconds"
    ],
    "correctAnswer": "40 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 100 + 100 = 200 m. Relative Speed = 56 - 38 = 18 km/h = 5 m/s. Time = 200 / 5 = 40 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-69",
    "qNum": 69,
    "ruleNum": 7,
    "ruleTitle": "Rule 7: Two Trains Moving in Same Direction (Overtaking)",
    "bloomLevel": "Evaluate",
    "qtype": "mcq",
    "questionText": "[Q69 - Rule 7: Two Trains Moving in Same Direction (Overtaking)] Faster train (210 m) overtakes slower train (140 m) in 28 s. Relative speed is 45 km/h. Is overtaking possible? Verify time.",
    "options": [
      "32 seconds",
      "28 seconds (Verified)",
      "25 seconds",
      "30 seconds"
    ],
    "correctAnswer": "28 seconds (Verified)",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nRelative Speed = 45 × (5 / 18) = 12.5 m/s. Total Distance = 210 + 140 = 350 m. Time = 350 / 12.5 = 28 s. Verified.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-70",
    "qNum": 70,
    "ruleNum": 7,
    "ruleTitle": "Rule 7: Two Trains Moving in Same Direction (Overtaking)",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q70 - Rule 7: Two Trains Moving in Same Direction (Overtaking)] Two trains move in same direction at 92 km/h and 74 km/h. If faster is 180 m and slower is 170 m, find time.",
    "options": [
      "65 seconds",
      "75 seconds",
      "70 seconds",
      "60 seconds"
    ],
    "correctAnswer": "70 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nTotal Distance = 180 + 170 = 350 m. Relative Speed = 92 - 74 = 18 km/h = 5 m/s. Time = 350 / 5 = 70 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-71",
    "qNum": 71,
    "ruleNum": 8,
    "ruleTitle": "Rule 8: Man Sitting Inside a Moving Train",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q71 - Rule 8: Man Sitting Inside a Moving Train] A 180 m train at 75 km/h passes a man sitting in another train moving opposite at 33 km/h. Find time.",
    "options": [
      "5 seconds",
      "7 seconds",
      "8 seconds",
      "6 seconds"
    ],
    "correctAnswer": "6 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nDistance = length of crossing train = 180 m. Relative Speed = 75 + 33 = 108 km/h = 30 m/s. Time = 180 / 30 = 6 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-72",
    "qNum": 72,
    "ruleNum": 8,
    "ruleTitle": "Rule 8: Man Sitting Inside a Moving Train",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q72 - Rule 8: Man Sitting Inside a Moving Train] A 150 m train at 80 km/h passes a passenger in a train moving same direction at 44 km/h. Find time.",
    "options": [
      "15 seconds",
      "12 seconds",
      "18 seconds",
      "20 seconds"
    ],
    "correctAnswer": "15 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nDistance = length of overtaking train = 150 m. Relative Speed = 80 - 44 = 36 km/h = 10 m/s. Time = 150 / 10 = 15 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-73",
    "qNum": 73,
    "ruleNum": 8,
    "ruleTitle": "Rule 8: Man Sitting Inside a Moving Train",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q73 - Rule 8: Man Sitting Inside a Moving Train] A passenger in a 250 m train moving at 30 km/h sees a 120 m train passing opposite in 6 s. Find speed of 2nd train.",
    "options": [
      "50 km/h",
      "42 km/h",
      "36 km/h",
      "48 km/h"
    ],
    "correctAnswer": "42 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nDistance = length of 2nd train = 120 m. Relative Speed = 120 / 6 = 20 m/s = 72 km/h. Speed of 2nd train = 72 - 30 = 42 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-74",
    "qNum": 74,
    "ruleNum": 8,
    "ruleTitle": "Rule 8: Man Sitting Inside a Moving Train",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q74 - Rule 8: Man Sitting Inside a Moving Train] A 200 m train at 90 km/h overtakes a man in a slower train (same direction) at 54 km/h. Find time.",
    "options": [
      "22 seconds",
      "25 seconds",
      "20 seconds",
      "18 seconds"
    ],
    "correctAnswer": "20 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nDistance = length of faster train = 200 m. Relative Speed = 90 - 54 = 36 km/h = 10 m/s. Time = 200 / 10 = 20 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-75",
    "qNum": 75,
    "ruleNum": 8,
    "ruleTitle": "Rule 8: Man Sitting Inside a Moving Train",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q75 - Rule 8: Man Sitting Inside a Moving Train] Train A (160 m) passes a passenger sitting in Train B moving opposite at 20 km/h in 8 s. Find Train A speed.",
    "options": [
      "48 km/h",
      "55 km/h",
      "60 km/h",
      "52 km/h"
    ],
    "correctAnswer": "52 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nDistance = 160 m. Relative Speed = 160 / 8 = 20 m/s = 72 km/h. Speed of Train A = 72 - 20 = 52 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-76",
    "qNum": 76,
    "ruleNum": 8,
    "ruleTitle": "Rule 8: Man Sitting Inside a Moving Train",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q76 - Rule 8: Man Sitting Inside a Moving Train] A 140 m long train moving at 60 km/h passes a man in another train moving opposite at 30 km/h. Find time.",
    "options": [
      "5.6 seconds",
      "5.0 seconds",
      "6.2 seconds",
      "6.5 seconds"
    ],
    "correctAnswer": "5.6 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nDistance = 140 m. Relative Speed = 60 + 30 = 90 km/h = 25 m/s. Time = 140 / 25 = 5.6 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-77",
    "qNum": 77,
    "ruleNum": 8,
    "ruleTitle": "Rule 8: Man Sitting Inside a Moving Train",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q77 - Rule 8: Man Sitting Inside a Moving Train] Find time taken by a 220 m train at 70 km/h to pass a sitting passenger in a train moving same direction at 34 km/h.",
    "options": [
      "25 seconds",
      "22 seconds",
      "20 seconds",
      "24 seconds"
    ],
    "correctAnswer": "22 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nDistance = 220 m. Relative Speed = 70 - 34 = 36 km/h = 10 m/s. Time = 220 / 10 = 22 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-78",
    "qNum": 78,
    "ruleNum": 8,
    "ruleTitle": "Rule 8: Man Sitting Inside a Moving Train",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q78 - Rule 8: Man Sitting Inside a Moving Train] A man in a train at 40 km/h observes a 100 m freight train pass him opposite in 4 s. Find freight train speed.",
    "options": [
      "55 km/h",
      "60 km/h",
      "50 km/h",
      "45 km/h"
    ],
    "correctAnswer": "50 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nDistance = 100 m. Relative Speed = 100 / 4 = 25 m/s = 90 km/h. Freight Train Speed = 90 - 40 = 50 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-79",
    "qNum": 79,
    "ruleNum": 8,
    "ruleTitle": "Rule 8: Man Sitting Inside a Moving Train",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q79 - Rule 8: Man Sitting Inside a Moving Train] Train A (130 m, 68 km/h) passes a man in Train B (same direction, 50 km/h). Find passing time in seconds.",
    "options": [
      "24 seconds",
      "28 seconds",
      "30 seconds",
      "26 seconds"
    ],
    "correctAnswer": "26 seconds",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nDistance = 130 m. Relative Speed = 68 - 50 = 18 km/h = 5 m/s. Time = 130 / 5 = 26 s.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-80",
    "qNum": 80,
    "ruleNum": 8,
    "ruleTitle": "Rule 8: Man Sitting Inside a Moving Train",
    "bloomLevel": "Analyze",
    "qtype": "mcq",
    "questionText": "[Q80 - Rule 8: Man Sitting Inside a Moving Train] A 175 m train passes a commuter in an opposite train moving at 47 km/h in 7 seconds. Find train speed.",
    "options": [
      "43 km/h",
      "40 km/h",
      "46 km/h",
      "50 km/h"
    ],
    "correctAnswer": "43 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nDistance = 175 m. Relative Speed = 175 / 7 = 25 m/s = 90 km/h. S_train = 90 - 47 = 43 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-81",
    "qNum": 81,
    "ruleNum": 9,
    "ruleTitle": "Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]",
    "bloomLevel": "Evaluate",
    "qtype": "mcq",
    "questionText": "[Q81 - Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]] Trains start from A & B towards each other. After meeting, they take 9 hrs & 16 hrs to reach B & A. Ratio of speeds?",
    "options": [
      "9 : 16",
      "4 : 3",
      "3 : 4",
      "16 : 9"
    ],
    "correctAnswer": "4 : 3",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nFormula: S_A / S_B = √(T_B / T_A) = √(16 / 9) = 4 / 3 = 4 : 3.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-82",
    "qNum": 82,
    "ruleNum": 9,
    "ruleTitle": "Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]",
    "bloomLevel": "Evaluate",
    "qtype": "mcq",
    "questionText": "[Q82 - Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]] Two trains start from X & Y. After meeting, they take 4 hrs and 25 hrs to reach destinations. If Train 1 is 100 km/h, find Train 2 speed.",
    "options": [
      "45 km/h",
      "50 km/h",
      "40 km/h",
      "35 km/h"
    ],
    "correctAnswer": "40 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nFormula: S_1 / S_2 = √(T_2 / T_1) ⇒ 100 / S_2 = √(25 / 4) = 5 / 2 ⇒ S_2 = (100 × 2) / 5 = 40 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-83",
    "qNum": 83,
    "ruleNum": 9,
    "ruleTitle": "Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]",
    "bloomLevel": "Evaluate",
    "qtype": "mcq",
    "questionText": "[Q83 - Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]] Trains start simultaneously. After meeting, Train A takes 1 hr 40 min (100 min) and Train B takes 2 hrs 30 min (150 min). Find Speed A : Speed B.",
    "options": [
      "3 : 2",
      "√2 : √3",
      "2 : 3",
      "√3 : √2"
    ],
    "correctAnswer": "√3 : √2",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nS_A / S_B = √(T_B / T_A) = √(150 / 100) = √(3 / 2) = √3 : √2.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-84",
    "qNum": 84,
    "ruleNum": 9,
    "ruleTitle": "Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]",
    "bloomLevel": "Evaluate",
    "qtype": "mcq",
    "questionText": "[Q84 - Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]] After passing each other, two trains take 3.6 hours and 6.4 hours to reach destinations. If Speed B = 45 km/h, find Speed A.",
    "options": [
      "60 km/h",
      "55 km/h",
      "64 km/h",
      "72 km/h"
    ],
    "correctAnswer": "60 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nS_A / 45 = √(6.4 / 3.6) = √(64 / 36) = √(16 / 9) = 4 / 3 ⇒ S_A = (45 × 4) / 3 = 60 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-85",
    "qNum": 85,
    "ruleNum": 9,
    "ruleTitle": "Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]",
    "bloomLevel": "Evaluate",
    "qtype": "mcq",
    "questionText": "[Q85 - Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]] Two trains start simultaneously from A and B towards each other. After crossing, Train A takes 16 hours and Train B takes 9 hours to reach B and A respectively. If Train A's speed is 60 km/h, find Train B's speed.",
    "options": [
      "90 km/h",
      "80 km/h",
      "75 km/h",
      "85 km/h"
    ],
    "correctAnswer": "80 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\n60 / S_B = √(9 / 16) = 3 / 4 ⇒ S_B = (60 × 4) / 3 = 80 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-86",
    "qNum": 86,
    "ruleNum": 9,
    "ruleTitle": "Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]",
    "bloomLevel": "Evaluate",
    "qtype": "mcq",
    "questionText": "[Q86 - Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]] Two trains start from P and Q towards each other simultaneously. After meeting, they take 2 hours and 8 hours to reach Q and P respectively. Find the ratio of their speeds.",
    "options": [
      "4 : 1",
      "1 : 4",
      "2 : 1",
      "1 : 2"
    ],
    "correctAnswer": "2 : 1",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nS_1 / S_2 = √(8 / 2) = √4 = 2 / 1 = 2 : 1.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-87",
    "qNum": 87,
    "ruleNum": 9,
    "ruleTitle": "Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]",
    "bloomLevel": "Evaluate",
    "qtype": "mcq",
    "questionText": "[Q87 - Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]] Two trains start from stations X and Y towards each other. After crossing, they take 49 hours and 81 hours to reach destinations. If the second train's speed is 35 km/h, what is the first train's speed?",
    "options": [
      "40 km/h",
      "50 km/h",
      "54 km/h",
      "45 km/h"
    ],
    "correctAnswer": "45 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nS_1 / 35 = √(81 / 49) = 9 / 7 ⇒ S_1 = (35 × 9) / 7 = 45 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-88",
    "qNum": 88,
    "ruleNum": 9,
    "ruleTitle": "Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]",
    "bloomLevel": "Evaluate",
    "qtype": "mcq",
    "questionText": "[Q88 - Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]] Two trains leave stations simultaneously towards each other. After meeting, they take 12 hours and 3 hours to arrive at their destinations. If the first train travels at 40 km/h, find the speed of the second train.",
    "options": [
      "80 km/h",
      "70 km/h",
      "75 km/h",
      "90 km/h"
    ],
    "correctAnswer": "80 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\n40 / S_2 = √(3 / 12) = √(1 / 4) = 1 / 2 ⇒ S_2 = 40 × 2 = 80 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-89",
    "qNum": 89,
    "ruleNum": 9,
    "ruleTitle": "Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]",
    "bloomLevel": "Evaluate",
    "qtype": "mcq",
    "questionText": "[Q89 - Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]] Two trains start from A and B towards each other. After meeting, they take 16 hours and 25 hours to reach destinations. Find the ratio of Speed A to Speed B.",
    "options": [
      "16 : 25",
      "5 : 4",
      "4 : 5",
      "25 : 16"
    ],
    "correctAnswer": "5 : 4",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nS_A / S_B = √(25 / 16) = 5 / 4 = 5 : 4.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-90",
    "qNum": 90,
    "ruleNum": 9,
    "ruleTitle": "Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]",
    "bloomLevel": "Evaluate",
    "qtype": "mcq",
    "questionText": "[Q90 - Rule 9: Meeting Point Ratio Formula [Sa/Sb = √(Tb/Ta)]] Two trains start simultaneously towards each other. After meeting, they take 1 hour and 4 hours to reach destinations. If Train A travels at 80 km/h, find the speed of Train B.",
    "options": [
      "45 km/h",
      "50 km/h",
      "40 km/h",
      "35 km/h"
    ],
    "correctAnswer": "40 km/h",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\n80 / S_B = √(4 / 1) = 2 / 1 ⇒ S_B = 80 / 2 = 40 km/h.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-91",
    "qNum": 91,
    "ruleNum": 10,
    "ruleTitle": "Rule 10: Stoppages Exclusion Formula",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q91 - Rule 10: Stoppages Exclusion Formula] Excluding stoppages, the speed of a train is 50 km/h and including stoppages it is 40 km/h. For how many minutes does the train stop per hour?",
    "options": [
      "10 minutes",
      "15 minutes",
      "8 minutes",
      "12 minutes"
    ],
    "correctAnswer": "12 minutes",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nStoppage time per hour = [(Speed without - Speed with) / Speed without] × 60 = [(50 - 40) / 50] × 60 = (10 / 50) × 60 = 12 minutes.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-92",
    "qNum": 92,
    "ruleNum": 10,
    "ruleTitle": "Rule 10: Stoppages Exclusion Formula",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q92 - Rule 10: Stoppages Exclusion Formula] Excluding stoppages, the speed of a train is 80 km/h and including stoppages it is 60 km/h. For how many minutes per hour does the train stop?",
    "options": [
      "15 minutes",
      "12 minutes",
      "18 minutes",
      "20 minutes"
    ],
    "correctAnswer": "15 minutes",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nStoppage time per hour = [(80 - 60) / 80] × 60 = (20 / 80) × 60 = 15 minutes.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-93",
    "qNum": 93,
    "ruleNum": 10,
    "ruleTitle": "Rule 10: Stoppages Exclusion Formula",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q93 - Rule 10: Stoppages Exclusion Formula] A train travels at 90 km/h without stoppages and 75 km/h with stoppages. How many minutes does it stop per hour?",
    "options": [
      "8 minutes",
      "10 minutes",
      "12 minutes",
      "15 minutes"
    ],
    "correctAnswer": "10 minutes",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nStoppage time per hour = [(90 - 75) / 90] × 60 = (15 / 90) × 60 = 10 minutes.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-94",
    "qNum": 94,
    "ruleNum": 10,
    "ruleTitle": "Rule 10: Stoppages Exclusion Formula",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q94 - Rule 10: Stoppages Exclusion Formula] Without stoppages, the speed of a train is 45 km/h, and with stoppages, it is 36 km/h. How many minutes per hour does it halt?",
    "options": [
      "14 minutes",
      "15 minutes",
      "12 minutes",
      "10 minutes"
    ],
    "correctAnswer": "12 minutes",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nStoppage time per hour = [(45 - 36) / 45] × 60 = (9 / 45) × 60 = 12 minutes.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-95",
    "qNum": 95,
    "ruleNum": 10,
    "ruleTitle": "Rule 10: Stoppages Exclusion Formula",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q95 - Rule 10: Stoppages Exclusion Formula] Without stoppages a train travels at 60 km/h and with stoppages at 50 km/h. Find stoppage time per hour in minutes.",
    "options": [
      "12 minutes",
      "8 minutes",
      "15 minutes",
      "10 minutes"
    ],
    "correctAnswer": "10 minutes",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nStoppage time per hour = [(60 - 50) / 60] × 60 = (10 / 60) × 60 = 10 minutes.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-96",
    "qNum": 96,
    "ruleNum": 10,
    "ruleTitle": "Rule 10: Stoppages Exclusion Formula",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q96 - Rule 10: Stoppages Exclusion Formula] An express train travels at 120 km/h excluding stoppages and 100 km/h including stoppages. For how many minutes does it stop per hour?",
    "options": [
      "10 minutes",
      "12 minutes",
      "15 minutes",
      "8 minutes"
    ],
    "correctAnswer": "10 minutes",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nStoppage time per hour = [(120 - 100) / 120] × 60 = (20 / 120) × 60 = 10 minutes.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-97",
    "qNum": 97,
    "ruleNum": 10,
    "ruleTitle": "Rule 10: Stoppages Exclusion Formula",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q97 - Rule 10: Stoppages Exclusion Formula] Excluding stoppages, the speed of a train is 54 km/h and including stoppages, 45 km/h. What is the stoppage time per hour?",
    "options": [
      "15 minutes",
      "10 minutes",
      "9 minutes",
      "12 minutes"
    ],
    "correctAnswer": "10 minutes",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nStoppage time per hour = [(54 - 45) / 54] × 60 = (9 / 54) × 60 = 10 minutes.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-98",
    "qNum": 98,
    "ruleNum": 10,
    "ruleTitle": "Rule 10: Stoppages Exclusion Formula",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q98 - Rule 10: Stoppages Exclusion Formula] A train runs at 72 km/h without stoppages and 60 km/h with stoppages. How many minutes per hour does it stop?",
    "options": [
      "15 minutes",
      "8 minutes",
      "10 minutes",
      "12 minutes"
    ],
    "correctAnswer": "10 minutes",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nStoppage time per hour = [(72 - 60) / 72] × 60 = (12 / 72) × 60 = 10 minutes.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-99",
    "qNum": 99,
    "ruleNum": 10,
    "ruleTitle": "Rule 10: Stoppages Exclusion Formula",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q99 - Rule 10: Stoppages Exclusion Formula] Without stoppages, a train moves at 100 km/h, and with stoppages at 85 km/h. Calculate stoppage time in minutes per hour.",
    "options": [
      "10 minutes",
      "12 minutes",
      "15 minutes",
      "9 minutes"
    ],
    "correctAnswer": "9 minutes",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nStoppage time per hour = [(100 - 85) / 100] × 60 = 0.15 × 60 = 9 minutes.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  },
  {
    "id": "q-train-pdf-100",
    "qNum": 100,
    "ruleNum": 10,
    "ruleTitle": "Rule 10: Stoppages Exclusion Formula",
    "bloomLevel": "Apply",
    "qtype": "mcq",
    "questionText": "[Q100 - Rule 10: Stoppages Exclusion Formula] Excluding halts, a train's average speed is 40 km/h; including halts, it is 30 km/h. How many minutes per hour does it halt?",
    "options": [
      "15 minutes",
      "12 minutes",
      "10 minutes",
      "18 minutes"
    ],
    "correctAnswer": "15 minutes",
    "explanation": "Step-by-step Solution (PDF Answer Key):\\nStoppage time per hour = [(40 - 30) / 40] × 60 = (10 / 40) × 60 = 15 minutes.",
    "topicId": "topic-trains",
    "subjectId": "subj-aptitude"
  }
];

/**
 * Returns a randomized subset of exactly 'count' questions from the official 100-question PDF bank.
 * If count is 100, returns all 100 questions.
 */
export function getTrain100Questions(count: number = 10, seed?: number): TrainProblemQuestion[] {
  const total = TRAIN_PROBLEMS_100_BANK.length;
  const targetCount = Math.min(Math.max(count, 1), total);

  if (targetCount === total) {
    return [...TRAIN_PROBLEMS_100_BANK];
  }

  // Shuffle and pick targetCount
  const shuffled = [...TRAIN_PROBLEMS_100_BANK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, targetCount);
}

/**
 * Returns questions filtered by rule number (1 to 10)
 */
export function getTrainQuestionsByRule(ruleNum: number): TrainProblemQuestion[] {
  return TRAIN_PROBLEMS_100_BANK.filter((q) => q.ruleNum === ruleNum);
}
