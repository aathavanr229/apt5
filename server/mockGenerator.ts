import { Question } from '../src/types.js';

// Helper to generate a random integer in a range [min, max]
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper to pick random element from array
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateMockQuestions(
  topicId: string,
  bloomLevel: string,
  count: number
): Omit<Question, 'id' | 'approved' | 'createdAt'>[] {
  // If comprehensive all-topic paper is requested, distribute questions across all standard syllabus topics
  if (topicId === 'topic-comprehensive-all') {
    const allTopics = [
      'topic-percentages',
      'topic-ratios',
      'topic-averages',
      'topic-profit-loss',
      'topic-time-work',
      'topic-pipes-cisterns',
      'topic-time-speed-distance',
      'topic-trains',
      'topic-boats-streams',
      'topic-alligation-mixtures',
      'topic-interest',
      'topic-number-system',
      'topic-permutations',
      'topic-probability',
      'topic-ages',
      'topic-clocks-calendars',
      'topic-mensuration',
      'topic-data-interpretation',
      'topic-blood-relations',
      'topic-syllogisms',
      'topic-seating-arrangement',
      'topic-coding-decoding',
      'topic-sentence-correction',
      'topic-reading-comprehension'
    ];
    const combined: Omit<Question, 'id' | 'approved' | 'createdAt'>[] = [];
    const perTopic = Math.max(1, Math.ceil((count * 1.3) / allTopics.length));
    for (const tId of allTopics) {
      const qs = generateMockQuestions(tId, bloomLevel, perTopic);
      combined.push(...qs);
    }
    
    // Deduplicate internally
    const seen = new Set<string>();
    const unique: Omit<Question, 'id' | 'approved' | 'createdAt'>[] = [];
    for (const q of combined.sort(() => Math.random() - 0.5)) {
      const key = q.questionText.trim().toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(q);
      }
    }
    
    // If still need more, keep generating until reaching count
    let safetyCounter = 0;
    while (unique.length < count && safetyCounter < 100) {
      safetyCounter++;
      const randomTopic = pickRandom(allTopics);
      const extra = generateMockQuestions(randomTopic, bloomLevel, 5);
      for (const q of extra) {
        const key = q.questionText.trim().toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(q);
          if (unique.length >= count) break;
        }
      }
    }
    return unique.slice(0, count);
  }

  const list: Omit<Question, 'id' | 'approved' | 'createdAt'>[] = [];
  const seenTexts = new Set<string>();
  const mcqCount = Math.round(count * 0.7);

  let attempts = 0;
  const maxAttempts = count * 20;

  while (list.length < count && attempts < maxAttempts) {
    attempts++;
    const idx = list.length;
    const isMcq = idx < mcqCount;
    const qtype = isMcq ? 'mcq' : 'short';

    let questionText = '';
    let options: string[] = [];
    let correctAnswer = '';
    let explanation = '';
    let syllabusUnit = '';
    let learningOutcomes = '';

    switch (topicId) {
      case 'topic-percentages': {
        syllabusUnit = 'Unit I: Basics of Percentages, Conversions, and Applications';
        learningOutcomes = 'Understand core concepts of percentages, express fractions as percentages and vice versa, and compute successive percentage changes.';
        const qSubtype = (idx + attempts) % 5;
        if (qSubtype === 0) {
          // Commodity price increase/decrease
          const p = pickRandom([5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 40, 45, 50, 60]);
          const commodity = pickRandom(['petrol', 'diesel', 'sugar', 'cooking oil', 'coffee', 'wheat flour', 'electricity tariff']);
          const reduction = parseFloat(((p / (100 + p)) * 100).toFixed(2));
          questionText = `If the market rate of ${commodity} increases by ${p}%, by what percentage must a consumer reduce consumption so that overall expenditure remains unchanged? (Variant #${idx + 1})`;
          correctAnswer = `${reduction}%`;
          if (isMcq) {
            options = [
              `${reduction}%`,
              `${(reduction - 2.5).toFixed(2)}%`,
              `${(reduction + 3.2).toFixed(2)}%`,
              `${(p * 0.8).toFixed(2)}%`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Using the Expenditure Invariance rule: [R / (100 + R)] × 100 = [${p} / (100 + ${p})] × 100 = ${reduction}%.`;
        } else if (qSubtype === 1) {
          // Successive percentage changes
          const a = pickRandom([10, 12, 15, 20, 25, 30, 35, 40]);
          const b = pickRandom([5, 8, 10, 12, 15, 20, 25]);
          const net = parseFloat((a + b + (a * b) / 100).toFixed(2));
          const person = pickRandom(['an IT systems engineer', 'a software specialist', 'a research analyst', 'a university professor']);
          questionText = `The monthly stipend of ${person} is increased by ${a}% during first evaluation, and subsequently increased by another ${b}%. What is the net overall percentage increase? (Variant #${idx + 1})`;
          correctAnswer = `${net}%`;
          if (isMcq) {
            options = [
              `${net}%`,
              `${a + b}%`,
              `${(net * 1.12).toFixed(2)}%`,
              `${(net - 2.8).toFixed(2)}%`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Successive percentage increase formula: Net = A + B + (A × B)/100 = ${a} + ${b} + (${a * b})/100 = ${net}%.`;
        } else if (qSubtype === 2) {
          // Exam pass/fail
          const totalCandidates = randomInt(200, 3000);
          const failPct = pickRandom([12, 15, 18, 20, 22, 25, 28, 30, 35, 40, 45]);
          const passPct = 100 - failPct;
          const passedCount = Math.round((passPct / 100) * totalCandidates);
          questionText = `In a regional technical recruitment test, ${failPct}% of participants failed the preliminary stage. If total attendees were ${totalCandidates}, how many participants successfully cleared the test? (Variant #${idx + 1})`;
          correctAnswer = `${passedCount}`;
          if (isMcq) {
            options = [
              `${passedCount}`,
              `${passedCount - 25}`,
              `${passedCount + 30}`,
              `${totalCandidates - passedCount}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Passed candidates = Total × (100 - failPct)% = ${totalCandidates} × ${passPct}% = ${passedCount}.`;
        } else if (qSubtype === 3) {
          // A is x% more than B
          const x = pickRandom([10, 20, 25, 40, 50, 60]);
          const ansPct = parseFloat(((x / (100 + x)) * 100).toFixed(2));
          const name1 = pickRandom(['Engineer Vikram', 'Analyst Rohan', 'Officer Suresh']);
          const name2 = pickRandom(['Engineer Priya', 'Analyst Sneha', 'Officer Ananya']);
          questionText = `If ${name1}'s income is ${x}% more than that of ${name2}, by what percentage is ${name2}'s income less than ${name1}'s income? (Variant #${idx + 1})`;
          correctAnswer = `${ansPct}%`;
          if (isMcq) {
            options = [
              `${ansPct}%`,
              `${x}%`,
              `${(ansPct - 3.4).toFixed(2)}%`,
              `${(ansPct + 4.1).toFixed(2)}%`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Percentage less = [x / (100 + x)] × 100 = [${x} / (100 + ${x})] × 100 = ${ansPct}%.`;
        } else {
          // Population compounding by percent
          const initPop = pickRandom([50000, 80000, 100000, 120000, 150000, 200000]);
          const r = pickRandom([4, 5, 8, 10]);
          const finalPop = Math.round(initPop * Math.pow(1 + r / 100, 2));
          questionText = `The population of an industrial smart city is currently ${initPop}. If it grows at a steady rate of ${r}% per annum, what will be the population after 2 years? (Variant #${idx + 1})`;
          correctAnswer = `${finalPop}`;
          if (isMcq) {
            options = [
              `${finalPop}`,
              `${finalPop - 1200}`,
              `${Math.round(initPop * (1 + (2 * r) / 100))}`,
              `${finalPop + 1800}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `P_final = P × (1 + R/100)^2 = ${initPop} × (1 + ${r}/100)^2 = ${finalPop}.`;
        }
        break;
      }

      case 'topic-ratios': {
        syllabusUnit = 'Unit I: Ratios, Proportions, and Variations';
        learningOutcomes = 'Identify ratio structures, solve proportional relationships, compute continuous proportions, and partition quantities.';
        const qSubtype = (idx + attempts) % 4;
        if (qSubtype === 0) {
          // Share partitioning
          const multiplier = randomInt(50, 400);
          const r1 = pickRandom([2, 3, 4, 5]);
          const r2 = pickRandom([3, 5, 7]);
          const r3 = pickRandom([4, 6, 8]);
          const sumRatio = r1 + r2 + r3;
          const total = sumRatio * multiplier;
          const bShare = r2 * multiplier;
          questionText = `A total research bounty of Rs. ${total} is divided among three developers A, B, and C in the ratio ${r1} : ${r2} : ${r3}. What is the exact monetary allocation for developer B? (Variant #${idx + 1})`;
          correctAnswer = `Rs. ${bShare}`;
          if (isMcq) {
            options = [
              `Rs. ${bShare}`,
              `Rs. ${bShare - 150}`,
              `Rs. ${bShare + 200}`,
              `Rs. ${r1 * multiplier}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Sum of ratio parts = ${r1} + ${r2} + ${r3} = ${sumRatio}. B's share = (${r2}/${sumRatio}) × ${total} = Rs. ${bShare}.`;
        } else if (qSubtype === 1) {
          // Mean proportional
          const x = pickRandom([2, 3, 4, 5, 6, 7, 8, 9, 10]);
          const a = x * 2;
          const b = x * 8; // a * b = 16 * x^2 => mean = 4x
          const mean = 4 * x;
          questionText = `Compute the geometric Mean Proportional between the mathematical values ${a} and ${b}. (Variant #${idx + 1})`;
          correctAnswer = `${mean}`;
          if (isMcq) {
            options = [
              `${mean}`,
              `${mean + 2}`,
              `${Math.round((a + b) / 2)}`,
              `${mean - 4}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Mean Proportional = √(a × b) = √(${a} × ${b}) = √${a * b} = ${mean}.`;
        } else if (qSubtype === 2) {
          // Coin bag problem
          const factor = pickRandom([10, 15, 20, 25, 30, 35, 40]);
          const r1 = 1, r2 = 2, r3 = 3;
          const totalVal = (1 * r1 + 2 * r2 + 5 * r3) * factor; // 20 * factor
          const num5c = r3 * factor;
          questionText = `A lockbox contains Rs. 1, Rs. 2, and Rs. 5 denominations in the ratio ${r1} : ${r2} : ${r3}. If the total monetary value inside is Rs. ${totalVal}, find the total count of Rs. 5 coins. (Variant #${idx + 1})`;
          correctAnswer = `${num5c}`;
          if (isMcq) {
            options = [
              `${num5c}`,
              `${num5c - 10}`,
              `${num5c + 15}`,
              `${r1 * factor}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Total value equation: 1(x) + 2(2x) + 5(3x) = 20x = ${totalVal} => x = ${factor}. Count of Rs. 5 coins = 3x = ${num5c}.`;
        } else {
          // Third proportional
          const aVal = pickRandom([12, 15, 18, 20, 24, 30]);
          const bVal = pickRandom([24, 30, 36, 40, 48, 60]);
          const thirdProp = parseFloat(((bVal * bVal) / aVal).toFixed(2));
          questionText = `Find the third proportional to the numbers ${aVal} and ${bVal}. (Variant #${idx + 1})`;
          correctAnswer = `${thirdProp}`;
          if (isMcq) {
            options = [
              `${thirdProp}`,
              `${(thirdProp - 5).toFixed(2)}`,
              `${(thirdProp + 8).toFixed(2)}`,
              `${bVal * 2}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Third proportional c to a and b satisfies a : b = b : c => c = b² / a = (${bVal} × ${bVal}) / ${aVal} = ${thirdProp}.`;
        }
        break;
      }

      case 'topic-averages': {
        syllabusUnit = 'Unit II: Arithmetic Mean, Weighted Averages, and Deviations';
        learningOutcomes = 'Calculate simple arithmetic means, evaluate weighted sets, and compute average shifts when items are added or replaced.';
        const qSubtype = (idx + attempts) % 4;
        if (qSubtype === 0) {
          // Inclusion of one student
          const countObs = pickRandom([10, 12, 15, 18, 20, 24, 25, 30, 35, 40]);
          const oldAvg = pickRandom([42, 45, 48, 50, 52, 55, 60, 65, 70]);
          const addedVal = pickRandom([72, 75, 80, 85, 90, 92, 95]);
          const newAvg = parseFloat(((countObs * oldAvg + addedVal) / (countObs + 1)).toFixed(2));
          questionText = `The average test score of ${countObs} students in an algorithmic aptitude assessment is ${oldAvg}. When one exceptional student joins with a score of ${addedVal}, what is the new average score? (Variant #${idx + 1})`;
          correctAnswer = `${newAvg}`;
          if (isMcq) {
            options = [
              `${newAvg}`,
              `${(newAvg - 1.5).toFixed(2)}`,
              `${(newAvg + 2.1).toFixed(2)}`,
              `${oldAvg}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `New Total = (${countObs} × ${oldAvg}) + ${addedVal}. New Count = ${countObs + 1}. New Average = ${newAvg}.`;
        } else if (qSubtype === 1) {
          // Replacement of one person
          const n = pickRandom([8, 10, 12, 14, 15, 16, 20]);
          const exWeight = pickRandom([50, 55, 60, 65, 70, 75]);
          const inc = pickRandom([1.5, 2, 2.5, 3]);
          const repWeight = exWeight + n * inc;
          questionText = `The average weight of ${n} laboratory researchers increases by ${inc} kg when a member weighing ${exWeight} kg is replaced by a new recruit. Determine the weight of the new recruit. (Variant #${idx + 1})`;
          correctAnswer = `${repWeight} kg`;
          if (isMcq) {
            options = [
              `${repWeight} kg`,
              `${repWeight - 4} kg`,
              `${repWeight + 6} kg`,
              `${exWeight + inc} kg`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Weight of new member = Excluded Weight + (Total Count × Increase) = ${exWeight} + (${n} × ${inc}) = ${repWeight} kg.`;
        } else if (qSubtype === 2) {
          // Average speed across two equal distances
          const s1 = pickRandom([30, 40, 45, 50, 60, 75]);
          const s2 = pickRandom([20, 30, 40, 50, 60]);
          const avgSpeed = parseFloat(((2 * s1 * s2) / (s1 + s2)).toFixed(2));
          questionText = `An autonomous courier vehicle travels from warehouse A to delivery hub B at a speed of ${s1} km/h and returns along the identical route at ${s2} km/h. What is the vehicle's average speed for the complete round trip? (Variant #${idx + 1})`;
          correctAnswer = `${avgSpeed} km/h`;
          if (isMcq) {
            options = [
              `${avgSpeed} km/h`,
              `${((s1 + s2) / 2).toFixed(2)} km/h`,
              `${(avgSpeed - 3).toFixed(2)} km/h`,
              `${(avgSpeed + 4).toFixed(2)} km/h`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Harmonic Mean of velocities for equal distances: Average Speed = (2 × S1 × S2) / (S1 + S2) = (2 × ${s1} × ${s2}) / (${s1} + ${s2}) = ${avgSpeed} km/h.`;
        } else {
          // Batting average / cricket problem
          const innings = pickRandom([10, 11, 14, 15, 19, 20]);
          const score = pickRandom([60, 70, 75, 80, 85, 90, 100]);
          const inc = pickRandom([2, 3, 4]);
          const newAvg = score - innings * inc;
          questionText = `In his ${innings + 1}th innings, a batsman scores ${score} runs, thereby increasing his overall batting average by ${inc} runs. What is his new average after this match? (Variant #${idx + 1})`;
          correctAnswer = `${newAvg}`;
          if (isMcq) {
            options = [
              `${newAvg}`,
              `${newAvg - inc}`,
              `${newAvg + 5}`,
              `${score - 10}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Let previous average be A. Total runs = ${innings}A + ${score} = (${innings + 1})(A + ${inc}) => A = ${score} - (${innings + 1})(${inc}). New average = A + ${inc} = ${score} - ${innings * inc} = ${newAvg}.`;
        }
        break;
      }

      case 'topic-profit-loss': {
        syllabusUnit = 'Unit II: Cost Price, Selling Price, and Discount Structures';
        learningOutcomes = 'Calculate profit and loss margins, translate percentages into absolute monetary margins, and handle complex discounts.';
        const qSubtype = (idx + attempts) % 4;
        if (qSubtype === 0) {
          // Direct Profit
          const cp = pickRandom([200, 400, 500, 600, 800, 1200, 1500, 2000, 2400, 3000]);
          const pPct = pickRandom([8, 10, 12, 15, 20, 25, 30, 35]);
          const sp = Math.round((cp * (100 + pPct)) / 100);
          const item = pickRandom(['oscilloscope', 'GPU accelerator module', 'microcontroller kit', 'laboratory sensor', 'optical switch']);
          questionText = `An engineering unit purchases a specialized ${item} for Rs. ${cp}. If it is sold to a research consortium at a profit of ${pPct}%, find the Selling Price. (Variant #${idx + 1})`;
          correctAnswer = `Rs. ${sp}`;
          if (isMcq) {
            options = [
              `Rs. ${sp}`,
              `Rs. ${sp - 50}`,
              `Rs. ${sp + 80}`,
              `Rs. ${cp + pPct}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Selling Price = CP × (100 + Profit%) / 100 = ${cp} × (1 + ${pPct}/100) = Rs. ${sp}.`;
        } else if (qSubtype === 1) {
          // Marked Price and Discount
          const mp = pickRandom([1000, 1200, 1500, 1800, 2000, 2500, 3000, 4000, 5000]);
          const disc = pickRandom([10, 12, 15, 20, 25, 30]);
          const sp = Math.round(mp * (1 - disc / 100));
          questionText = `A technical workstation has a catalogued Marked Price of Rs. ${mp}. If an educational discount of ${disc}% is applied, what is the final transaction price? (Variant #${idx + 1})`;
          correctAnswer = `Rs. ${sp}`;
          if (isMcq) {
            options = [
              `Rs. ${sp}`,
              `Rs. ${sp - 100}`,
              `Rs. ${sp + 120}`,
              `Rs. ${mp - disc}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Selling Price = MP × (1 - Discount% / 100) = ${mp} × (1 - ${disc}/100) = Rs. ${sp}.`;
        } else if (qSubtype === 2) {
          // False weight / dishonest merchant
          const claimed = 1000;
          const actual = pickRandom([800, 850, 900, 950]);
          const gainPct = parseFloat((((claimed - actual) / actual) * 100).toFixed(2));
          questionText = `A vendor claims to sell goods at cost price but utilizes a false measuring balance of ${actual} grams instead of a standard 1 kg weight. What is the vendor's actual percentage gain? (Variant #${idx + 1})`;
          correctAnswer = `${gainPct}%`;
          if (isMcq) {
            options = [
              `${gainPct}%`,
              `${((claimed - actual) / 10).toFixed(2)}%`,
              `${(gainPct - 2.5).toFixed(2)}%`,
              `${(gainPct + 3.2).toFixed(2)}%`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Gain% = [Error / (True Value - Error)] × 100 = [${claimed - actual} / ${actual}] × 100 = ${gainPct}%.`;
        } else {
          // Selling at loss then gain
          const loss = pickRandom([5, 8, 10, 12]);
          const gain = pickRandom([5, 8, 10, 12]);
          const diff = (loss + gain) * pickRandom([10, 20, 30, 40]);
          const cp = (diff * 100) / (loss + gain);
          questionText = `A server component is sold at a loss of ${loss}%. If it had been sold for Rs. ${diff} more, there would have been a profit of ${gain}%. What is the cost price of the component? (Variant #${idx + 1})`;
          correctAnswer = `Rs. ${cp}`;
          if (isMcq) {
            options = [
              `Rs. ${cp}`,
              `Rs. ${cp - 200}`,
              `Rs. ${cp + 300}`,
              `Rs. ${diff * 2}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Difference in selling price corresponds to (${loss}% + ${gain}%) = ${loss + gain}% of CP. Hence CP = (${diff} / ${loss + gain}) × 100 = Rs. ${cp}.`;
        }
        break;
      }

      case 'topic-time-work': {
        syllabusUnit = 'Unit III: Work Efficiency, Group Work, and Pipes & Cisterns';
        learningOutcomes = 'Analyze joint work rates, apply man-days equivalence equations, and model inlet-outlet pipe dynamics.';
        const qSubtype = (idx + attempts) % 4;
        if (qSubtype === 0) {
          // Combined work 2 people
          const ta = pickRandom([6, 8, 10, 12, 15, 18, 20, 24]);
          const tb = pickRandom([12, 15, 20, 24, 30, 36, 40]);
          const tab = parseFloat(((ta * tb) / (ta + tb)).toFixed(2));
          questionText = `Developer A can implement an authentication microservice in ${ta} days, while Developer B takes ${tb} days for the identical module. In how many days can they complete it working collaboratively? (Variant #${idx + 1})`;
          correctAnswer = `${tab} days`;
          if (isMcq) {
            options = [
              `${tab} days`,
              `${ta + tb} days`,
              `${(tab + 1.2).toFixed(2)} days`,
              `${((ta + tb) / 2).toFixed(2)} days`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Together time = (Ta × Tb) / (Ta + Tb) = (${ta} × ${tb}) / (${ta} + ${tb}) = ${tab} days.`;
        } else if (qSubtype === 1) {
          // Man-days equivalence
          const m1 = pickRandom([10, 12, 15, 18, 20, 24, 30]);
          const d1 = pickRandom([10, 14, 16, 20, 25, 30]);
          const m2 = pickRandom([8, 10, 12, 15, 16, 20]);
          const d2 = parseFloat(((m1 * d1) / m2).toFixed(1));
          questionText = `If ${m1} engineers can assemble a drone payload in ${d1} working days, how many days will ${m2} engineers take under identical productivity? (Variant #${idx + 1})`;
          correctAnswer = `${d2} days`;
          if (isMcq) {
            options = [
              `${d2} days`,
              `${(d2 - 3).toFixed(1)} days`,
              `${(d2 + 4).toFixed(1)} days`,
              `${Math.round(d1 * 1.5)} days`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Work Equivalence: M1 × D1 = M2 × D2 => ${m1} × ${d1} = ${m2} × D2 => D2 = ${d2} days.`;
        } else if (qSubtype === 2) {
          // Pipes & Cisterns inlet & outlet
          const tIn = pickRandom([10, 12, 15, 20]);
          const tOut = pickRandom([24, 30, 40, 60]);
          const netTime = parseFloat(((tIn * tOut) / (tOut - tIn)).toFixed(2));
          questionText = `An intake pump can fill a cooling reservoir in ${tIn} hours, while a discharge valve empties the full reservoir in ${tOut} hours. If both operate simultaneously, how many hours will it take to fill the empty reservoir? (Variant #${idx + 1})`;
          correctAnswer = `${netTime} hours`;
          if (isMcq) {
            options = [
              `${netTime} hours`,
              `${tOut - tIn} hours`,
              `${(netTime + 2.5).toFixed(2)} hours`,
              `${(netTime * 1.2).toFixed(2)} hours`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Net filling rate per hour = (1/${tIn}) - (1/${tOut}) = (${tOut} - ${tIn}) / (${tIn} × ${tOut}). Total time = (${tIn} × ${tOut}) / (${tOut} - ${tIn}) = ${netTime} hours.`;
        } else {
          // Three workers
          const t1 = 12, t2 = 15, t3 = 20; // 1/12 + 1/15 + 1/20 = (5+4+3)/60 = 12/60 = 1/5 => 5 days
          const scale = pickRandom([1, 2, 3]);
          const ansDays = 5 * scale;
          questionText = `Three CAD modelers P, Q, and R take ${t1 * scale} days, ${t2 * scale} days, and ${t3 * scale} days respectively to finish an airframe simulation. If all three work together, in how many days will the model be completed? (Variant #${idx + 1})`;
          correctAnswer = `${ansDays} days`;
          if (isMcq) {
            options = [
              `${ansDays} days`,
              `${ansDays + 2} days`,
              `${ansDays - 1} days`,
              `${(t1 + t2 + t3) * scale / 3} days`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `1-day combined work = (1/${t1 * scale}) + (1/${t2 * scale}) + (1/${t3 * scale}) = 12 / (${60 * scale}) = 1 / (${5 * scale}). Time = ${ansDays} days.`;
        }
        break;
      }

      case 'topic-time-speed-distance': {
        syllabusUnit = 'Unit III: Linear Motion, Relative Speed, and Train Problems';
        learningOutcomes = 'Translate speed units, compute average velocity, and model relative speed of bodies moving in identical or opposing vectors.';
        const qSubtype = (idx + attempts) % 4;
        if (qSubtype === 0) {
          // Unit conversion
          const kmh = pickRandom([36, 45, 54, 63, 72, 81, 90, 108, 126, 144]);
          const ms = parseFloat(((kmh * 5) / 18).toFixed(2));
          questionText = `A high-speed train in an electrified rail transit corridor travels at a uniform velocity of ${kmh} km/h. Express this speed in meters per second (m/s). (Variant #${idx + 1})`;
          correctAnswer = `${ms} m/s`;
          if (isMcq) {
            options = [
              `${ms} m/s`,
              `${(ms + 3).toFixed(2)} m/s`,
              `${(kmh / 2).toFixed(2)} m/s`,
              `${(ms - 2.5).toFixed(2)} m/s`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Speed (m/s) = Speed (km/h) × (5 / 18) = ${kmh} × (5/18) = ${ms} m/s.`;
        } else if (qSubtype === 1) {
          // Train crossing stationary pole
          const length = pickRandom([120, 150, 180, 200, 240, 300, 360]);
          const speedKmh = pickRandom([36, 54, 72, 90, 108]);
          const speedMs = (speedKmh * 5) / 18;
          const timeSec = parseFloat((length / speedMs).toFixed(2));
          questionText = `A locomotive of length ${length} meters travels at ${speedKmh} km/h. How many seconds will it take to cross a stationary signal post? (Variant #${idx + 1})`;
          correctAnswer = `${timeSec} seconds`;
          if (isMcq) {
            options = [
              `${timeSec} seconds`,
              `${(timeSec + 2).toFixed(2)} seconds`,
              `${(timeSec - 1.5).toFixed(2)} seconds`,
              `${Math.round(length / speedKmh)} seconds`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Speed in m/s = ${speedKmh} × (5/18) = ${speedMs} m/s. Time = Distance / Speed = ${length} / ${speedMs} = ${timeSec} seconds.`;
        } else if (qSubtype === 2) {
          // Relative speed opposite
          const s1 = pickRandom([35, 40, 45, 50, 60, 70]);
          const s2 = pickRandom([25, 30, 40, 50, 60]);
          const dist = pickRandom([120, 150, 180, 200, 240, 300]);
          const timeHours = parseFloat((dist / (s1 + s2)).toFixed(2));
          questionText = `Two electric cars start simultaneously from two points ${dist} km apart and travel towards each other at speeds of ${s1} km/h and ${s2} km/h. In how many hours will they cross each other? (Variant #${idx + 1})`;
          correctAnswer = `${timeHours} hours`;
          if (isMcq) {
            options = [
              `${timeHours} hours`,
              `${(timeHours + 0.5).toFixed(2)} hours`,
              `${(dist / s1).toFixed(2)} hours`,
              `${(dist / Math.abs(s1 - s2)).toFixed(2)} hours`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Relative speed for opposing directions = ${s1} + ${s2} = ${s1 + s2} km/h. Meeting time = Distance / Relative Speed = ${dist} / ${s1 + s2} = ${timeHours} hours.`;
        } else {
          // Distance = Speed * Time
          const speed = pickRandom([45, 55, 60, 65, 75, 80]);
          const minutes = pickRandom([20, 30, 40, 45, 50]);
          const dist = parseFloat(((speed * minutes) / 60).toFixed(2));
          questionText = `An autonomous drone cruises at an average speed of ${speed} km/h for a duration of ${minutes} minutes. Find the total distance covered in kilometers. (Variant #${idx + 1})`;
          correctAnswer = `${dist} km`;
          if (isMcq) {
            options = [
              `${dist} km`,
              `${(dist + 5).toFixed(2)} km`,
              `${(dist - 3.5).toFixed(2)} km`,
              `${Math.round(speed * minutes)} km`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Distance = Speed × Time = ${speed} × (${minutes}/60) = ${dist} km.`;
        }
        break;
      }

      case 'topic-interest': {
        syllabusUnit = 'Unit IV: Simple Interest and Compound Interest with Multi-cycle Compounding';
        learningOutcomes = 'Determine fixed returns versus compounding rates, model varying interest periods, and evaluate geometric asset growth.';
        const qSubtype = (idx + attempts) % 3;
        if (qSubtype === 0) {
          // Simple interest
          const p = pickRandom([3000, 4000, 5000, 6000, 8000, 10000, 12000, 15000, 20000, 25000]);
          const r = pickRandom([4, 5, 6, 7.5, 8, 9, 10, 12]);
          const t = pickRandom([2, 3, 4, 5]);
          const si = (p * r * t) / 100;
          questionText = `Calculate the Simple Interest accrued on a principal endowment of Rs. ${p} invested at ${r}% per annum over a duration of ${t} years. (Variant #${idx + 1})`;
          correctAnswer = `Rs. ${si}`;
          if (isMcq) {
            options = [
              `Rs. ${si}`,
              `Rs. ${si - 120}`,
              `Rs. ${si + 180}`,
              `Rs. ${p * (r / 100)}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `SI = (P × R × T) / 100 = (${p} × ${r} × ${t}) / 100 = Rs. ${si}.`;
        } else if (qSubtype === 1) {
          // Compound Interest 2 years
          const p = pickRandom([2000, 4000, 5000, 8000, 10000, 12000, 16000, 20000]);
          const r = pickRandom([5, 10, 15, 20]);
          const amt = p * Math.pow(1 + r / 100, 2);
          const ci = Math.round(amt - p);
          questionText = `Find the Compound Interest accrued on Rs. ${p} for 2 years compounded annually at ${r}% per annum. (Variant #${idx + 1})`;
          correctAnswer = `Rs. ${ci}`;
          if (isMcq) {
            options = [
              `Rs. ${ci}`,
              `Rs. ${(p * r * 2) / 100}`, // simple interest distractor
              `Rs. ${ci + 60}`,
              `Rs. ${ci - 50}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Amount = P × (1 + R/100)^2 = ${p} × ${(1 + r/100).toFixed(2)}^2 = ${amt}. CI = Amount - Principal = Rs. ${ci}.`;
        } else {
          // Difference between CI and SI for 2 years: D = P * (R/100)^2
          const p = pickRandom([5000, 8000, 10000, 15000, 20000]);
          const r = pickRandom([5, 8, 10, 12]);
          const diff = parseFloat((p * Math.pow(r / 100, 2)).toFixed(2));
          questionText = `What is the difference between Compound Interest and Simple Interest on a principal of Rs. ${p} at ${r}% per annum for 2 years? (Variant #${idx + 1})`;
          correctAnswer = `Rs. ${diff}`;
          if (isMcq) {
            options = [
              `Rs. ${diff}`,
              `Rs. ${(diff * 1.5).toFixed(2)}`,
              `Rs. ${(diff - 10).toFixed(2)}`,
              `Rs. ${((p * r) / 100).toFixed(2)}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Difference formula for 2 years: Diff = P × (R/100)^2 = ${p} × (${r}/100)^2 = Rs. ${diff}.`;
        }
        break;
      }

      case 'topic-number-system': {
        syllabusUnit = 'Unit IV: Divisibility Rules, Prime Numbers, and LCM/HCF Applications';
        learningOutcomes = 'Evaluate prime factors, solve divisibility checks, and identify periodic remainders using GCD and LCM applications.';
        const qSubtype = (idx + attempts) % 4;
        if (qSubtype === 0) {
          // LCM * HCF = a * b
          const hcf = pickRandom([6, 8, 12, 14, 15, 16, 20, 24]);
          const k1 = pickRandom([2, 3, 5]);
          const k2 = pickRandom([7, 9, 11]);
          const a = hcf * k1;
          const b = hcf * k2;
          const lcm = hcf * k1 * k2;
          questionText = `The LCM of two mathematical integers is ${lcm} and their HCF is ${hcf}. If one of the numbers is ${a}, what is the value of the other number? (Variant #${idx + 1})`;
          correctAnswer = `${b}`;
          if (isMcq) {
            options = [
              `${b}`,
              `${b + 12}`,
              `${b - 10}`,
              `${Math.round(lcm / hcf)}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `LCM × HCF = a × b => ${lcm} × ${hcf} = ${a} × b => b = (${lcm} × ${hcf}) / ${a} = ${b}.`;
        } else if (qSubtype === 1) {
          // Sum of first N natural numbers
          const n = pickRandom([25, 30, 40, 50, 60, 75, 80, 90, 100, 120]);
          const sum = (n * (n + 1)) / 2;
          questionText = `Compute the exact arithmetic sum of the first ${n} consecutive positive natural numbers (1 + 2 + 3 + ... + ${n}). (Variant #${idx + 1})`;
          correctAnswer = `${sum}`;
          if (isMcq) {
            options = [
              `${sum}`,
              `${sum - 40}`,
              `${sum + 50}`,
              `${n * n}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Sum = N(N + 1)/2 = (${n} × ${n + 1})/2 = ${sum}.`;
        } else if (qSubtype === 2) {
          // Divisibility rule of 9 / 11
          const d1 = randomInt(1, 8);
          const d2 = randomInt(0, 9);
          const d3 = randomInt(0, 9);
          // Find missing digit * such that d1 + d2 + * + d3 is divisible by 9
          const currentSum = d1 + d2 + d3;
          let star = (9 - (currentSum % 9)) % 9;
          questionText = `What is the smallest single-digit digit * that must replace the placeholder in the number ${d1}${d2}*${d3} so that it is strictly divisible by 9? (Variant #${idx + 1})`;
          correctAnswer = `${star}`;
          if (isMcq) {
            options = [
              `${star}`,
              `${(star + 2) % 9}`,
              `${(star + 4) % 9}`,
              `${(star + 5) % 9}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `For divisibility by 9, the sum of digits must be a multiple of 9. Sum = ${d1} + ${d2} + * + ${d3} = ${currentSum} + *. Smallest digit = ${star}.`;
        } else {
          // Unit digit of a power
          const base = pickRandom([2, 3, 7, 8]);
          const exp = pickRandom([41, 42, 43, 44, 45, 51, 53, 57, 63, 67, 73]);
          const rem = exp % 4 || 4;
          const unitDigit = Math.pow(base, rem) % 10;
          questionText = `Find the unit's digit in the mathematical exponential expression (${base})^${exp}. (Variant #${idx + 1})`;
          correctAnswer = `${unitDigit}`;
          if (isMcq) {
            options = [
              `${unitDigit}`,
              `${(unitDigit + 2) % 10}`,
              `${(unitDigit + 4) % 10}`,
              `${(unitDigit + 6) % 10}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Cyclicity of ${base} is 4. Power ${exp} mod 4 = ${rem}. Hence unit digit is ${base}^${rem} mod 10 = ${unitDigit}.`;
        }
        break;
      }

      case 'topic-permutations': {
        syllabusUnit = 'Unit V: Principles of Counting, Arrangements, and Selection';
        learningOutcomes = 'Implement fundamental counting principles, analyze order-based arrangements, and solve combination selection constraints.';
        const qSubtype = (idx + attempts) % 3;
        if (qSubtype === 0) {
          // Word permutations
          const words = [
            { w: 'VITE', count: 24, len: 4 },
            { w: 'RUST', count: 24, len: 4 },
            { w: 'NODE', count: 24, len: 4 },
            { w: 'REACT', count: 120, len: 5 },
            { w: 'KONGU', count: 120, len: 5 },
            { w: 'CLOUD', count: 120, len: 5 },
            { w: 'PYTHON', count: 720, len: 6 },
            { w: 'VECTOR', count: 720, len: 6 }
          ];
          const item = pickRandom(words);
          questionText = `In how many different unique arrangements can the letters of the technical term "${item.w}" be ordered? (Variant #${idx + 1})`;
          correctAnswer = `${item.count}`;
          if (isMcq) {
            options = [
              `${item.count}`,
              `${item.count - 6}`,
              `${item.count + 12}`,
              `${item.len * 2}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `All ${item.len} letters in "${item.w}" are distinct. Number of permutations = ${item.len}! = ${item.count}.`;
        } else if (qSubtype === 1) {
          // Combinations nCr
          const n = pickRandom([6, 7, 8, 9, 10, 11, 12]);
          const r = pickRandom([2, 3]);
          const fact = (num: number): number => (num <= 1 ? 1 : num * fact(num - 1));
          const nCr = Math.round(fact(n) / (fact(r) * fact(n - r)));
          questionText = `From a cohort of ${n} software developers, in how many ways can a code-review sub-committee of ${r} members be chosen? (Variant #${idx + 1})`;
          correctAnswer = `${nCr}`;
          if (isMcq) {
            options = [
              `${nCr}`,
              `${nCr - 5}`,
              `${nCr + 8}`,
              `${n * r}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Selection without order: nCr = ${n}! / (${r}! × ${n - r}!) = ${nCr} ways.`;
        } else {
          // Handshake problem: n * (n - 1) / 2
          const people = pickRandom([8, 10, 12, 14, 15, 16, 18, 20, 25]);
          const handshakes = (people * (people - 1)) / 2;
          questionText = `At a research conference banquet, ${people} attendees shake hands with each other exactly once. How many total handshakes occur? (Variant #${idx + 1})`;
          correctAnswer = `${handshakes}`;
          if (isMcq) {
            options = [
              `${handshakes}`,
              `${handshakes - 8}`,
              `${handshakes + 10}`,
              `${people * (people - 1)}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Each pair forms 1 handshake: Combinations of 2 from ${people} = (${people} × ${people - 1}) / 2 = ${handshakes}.`;
        }
        break;
      }

      case 'topic-probability': {
        syllabusUnit = 'Unit V: Sample Spaces, Basic Probability, and Conditional Events';
        learningOutcomes = 'Define and map sample spaces, calculate event ratios, and resolve conditional dependency problems.';
        const qSubtype = (idx + attempts) % 3;
        if (qSubtype === 0) {
          // Colored balls in a box
          const red = pickRandom([3, 4, 5, 6, 7, 8]);
          const blue = pickRandom([4, 5, 6, 7, 8, 9]);
          const total = red + blue;
          questionText = `An urn contains ${red} red microchips and ${blue} blue microchips. If one chip is sampled at random, what is the probability that it is red? (Variant #${idx + 1})`;
          correctAnswer = `${red}/${total}`;
          if (isMcq) {
            options = [
              `${red}/${total}`,
              `${blue}/${total}`,
              `1/${total}`,
              `${red}/${blue}`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `P(Red) = Favorable Outcomes / Total Sample Space = ${red} / (${red} + ${blue}) = ${red}/${total}.`;
        } else if (qSubtype === 1) {
          // Two dice sum
          const target = pickRandom([4, 5, 6, 7, 8, 9, 10, 11]);
          const favorableMap: Record<number, number> = {
            4: 3,
            5: 4,
            6: 5,
            7: 6,
            8: 5,
            9: 4,
            10: 3,
            11: 2
          };
          const ways = favorableMap[target];
          questionText = `Two balanced six-sided dice are thrown simultaneously. What is the probability that the sum of the numbers appearing on top is exactly ${target}? (Variant #${idx + 1})`;
          correctAnswer = `${ways}/36`;
          if (isMcq) {
            options = [
              `${ways}/36`,
              `${ways + 1}/36`,
              `1/6`,
              `${ways}/18`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Total possible outcomes = 6 × 6 = 36. Favorable outcomes summing to ${target} = ${ways}. Probability = ${ways}/36.`;
        } else {
          // Deck of 52 cards: picking king, queen, or ace
          const targetCard = pickRandom(['King', 'Queen', 'Ace', 'Spade', 'Heart']);
          const favorable = targetCard === 'Spade' || targetCard === 'Heart' ? 13 : 4;
          questionText = `A card is drawn at random from a thoroughly shuffled standard deck of 52 playing cards. What is the probability of obtaining a ${targetCard}? (Variant #${idx + 1})`;
          correctAnswer = `${favorable}/52`;
          if (isMcq) {
            options = [
              `${favorable}/52`,
              `${favorable + 2}/52`,
              `1/52`,
              `${favorable}/13`
            ].sort(() => Math.random() - 0.5);
          }
          explanation = `Standard deck contains 52 cards. Count of ${targetCard}s = ${favorable}. Probability = ${favorable}/52.`;
        }
        break;
      }

      case 'topic-pipes-cisterns': {
        syllabusUnit = 'Unit III: Fluid Dynamics, Inlets, Outlets, and Tank Leakages';
        learningOutcomes = 'Calculate filling and emptying rates and handle leak drains.';
        const t1 = pickRandom([6, 8, 10, 12, 15, 20]);
        const t2 = pickRandom([10, 12, 15, 20, 24, 30]);
        const netFill = parseFloat(((t1 * t2) / (t1 + t2)).toFixed(2));
        questionText = `Pipe A can fill a tank in ${t1} hours and Pipe B can fill it in ${t2} hours. If both pipes are opened simultaneously, in how many hours will the tank be full? (Variant #${idx + 1})`;
        correctAnswer = `${netFill} hours`;
        if (isMcq) {
          options = [`${netFill} hours`, `${(netFill + 1.5).toFixed(2)} hours`, `${(netFill - 1).toFixed(2)} hours`, `${(t1 + t2) / 2} hours`].sort(() => Math.random() - 0.5);
        }
        explanation = `Combined Rate = 1/${t1} + 1/${t2} = (${t1}+${t2})/(${t1}×${t2}). Time = (${t1}×${t2})/(${t1}+${t2}) = ${netFill} hours.`;
        break;
      }

      case 'topic-trains': {
        syllabusUnit = 'Unit III: Train Lengths, Platform Crossing, and Relative Motion';
        learningOutcomes = 'Calculate train crossing times across poles and platforms.';
        const length = pickRandom([120, 150, 180, 200, 240, 300]);
        const speedKmph = pickRandom([36, 54, 72, 90, 108]);
        const speedMs = speedKmph * (5 / 18);
        const timeSec = parseFloat((length / speedMs).toFixed(1));
        questionText = `A train of length ${length} meters is traveling at a constant speed of ${speedKmph} km/h. How many seconds will it take to cross a stationary signal post? (Variant #${idx + 1})`;
        correctAnswer = `${timeSec} seconds`;
        if (isMcq) {
          options = [`${timeSec} seconds`, `${(timeSec + 3).toFixed(1)} seconds`, `${(timeSec - 2).toFixed(1)} seconds`, `${(timeSec * 1.5).toFixed(1)} seconds`].sort(() => Math.random() - 0.5);
        }
        explanation = `Speed in m/s = ${speedKmph} × 5/18 = ${speedMs} m/s. Time = Distance / Speed = ${length} / ${speedMs} = ${timeSec} seconds.`;
        break;
      }

      case 'topic-boats-streams': {
        syllabusUnit = 'Unit III: Upstream, Downstream, and River Velocity Dynamics';
        learningOutcomes = 'Calculate still water boat speed and river stream speed.';
        const boatSpeed = pickRandom([10, 12, 14, 15, 16, 18, 20]);
        const streamSpeed = pickRandom([2, 3, 4, 5]);
        const downstream = boatSpeed + streamSpeed;
        const upstream = boatSpeed - streamSpeed;
        questionText = `A motorboat travels at a speed of ${downstream} km/h downstream and ${upstream} km/h upstream. What is the speed of the boat in still water? (Variant #${idx + 1})`;
        correctAnswer = `${boatSpeed} km/h`;
        if (isMcq) {
          options = [`${boatSpeed} km/h`, `${boatSpeed + 2} km/h`, `${streamSpeed} km/h`, `${boatSpeed - 3} km/h`].sort(() => Math.random() - 0.5);
        }
        explanation = `Speed in still water = (Downstream + Upstream) / 2 = (${downstream} + ${upstream}) / 2 = ${boatSpeed} km/h.`;
        break;
      }

      case 'topic-alligation-mixtures': {
        syllabusUnit = 'Unit II: Rule of Alligation, Solution Replacements, and Concentrations';
        learningOutcomes = 'Apply cross-alligation to determine blending ratios.';
        const cheap = pickRandom([15, 20, 25, 30]);
        const dear = cheap + pickRandom([15, 20, 25, 30]);
        const mean = cheap + Math.round((dear - cheap) * 0.4);
        const r1 = dear - mean;
        const r2 = mean - cheap;
        questionText = `In what proportion must a merchant mix grain at ₹${cheap}/kg with grain at ₹${dear}/kg so that the resulting mixture is worth ₹${mean}/kg? (Variant #${idx + 1})`;
        correctAnswer = `${r1}:${r2}`;
        if (isMcq) {
          options = [`${r1}:${r2}`, `${r2}:${r1}`, `${r1 + 1}:${r2}`, `${r1}:${r2 + 2}`].sort(() => Math.random() - 0.5);
        }
        explanation = `Rule of Alligation: (Dearer - Mean) / (Mean - Cheaper) = (${dear} - ${mean}) / (${mean} - ${cheap}) = ${r1} : ${r2}.`;
        break;
      }

      case 'topic-ages': {
        syllabusUnit = 'Unit I: Age Equations, Temporal Ratios, and Difference Invariance';
        learningOutcomes = 'Calculate present ages from temporal ratio changes.';
        const ageA = pickRandom([15, 20, 24, 30, 36]);
        const ageB = ageA + pickRandom([6, 8, 10, 12]);
        const years = 5;
        questionText = `The sum of the present ages of a father and his son is ${ageA + ageB} years. 5 years ago, the father was ${ageB - 5} years old. What is the present age of the son? (Variant #${idx + 1})`;
        correctAnswer = `${ageA} years`;
        if (isMcq) {
          options = [`${ageA} years`, `${ageA + 4} years`, `${ageA - 3} years`, `${ageA + 6} years`].sort(() => Math.random() - 0.5);
        }
        explanation = `Father present age = (${ageB - 5}) + 5 = ${ageB} years. Son present age = Total (${ageA + ageB}) - ${ageB} = ${ageA} years.`;
        break;
      }

      case 'topic-clocks-calendars': {
        syllabusUnit = 'Unit IV: Angle Between Clock Hands, Leap Years, and Odd Days';
        learningOutcomes = 'Determine the angle between the hour and minute hands of a clock.';
        const hour = pickRandom([2, 3, 4, 5, 6, 7, 8]);
        const minute = pickRandom([10, 15, 20, 25, 30, 40]);
        const angle = Math.abs(30 * hour - 5.5 * minute);
        const cleanAngle = angle > 180 ? 360 - angle : angle;
        questionText = `What is the acute angle between the hour hand and the minute hand of a clock at ${hour}:${minute < 10 ? '0' : ''}${minute}? (Variant #${idx + 1})`;
        correctAnswer = `${cleanAngle}°`;
        if (isMcq) {
          options = [`${cleanAngle}°`, `${cleanAngle + 15}°`, `${Math.max(0, cleanAngle - 10)}°`, `${cleanAngle + 25}°`].sort(() => Math.random() - 0.5);
        }
        explanation = `Angle formula = |30H - (11/2)M| = |30(${hour}) - 5.5(${minute})| = |${30 * hour} - ${5.5 * minute}| = ${cleanAngle}°.`;
        break;
      }

      case 'topic-blood-relations': {
        syllabusUnit = 'Logical Reasoning Unit I: Family Trees, Generational Hierarchies, and Coded Relationships';
        learningOutcomes = 'Deduce genealogical relationships from descriptive clues.';
        const scenarios = [
          { q: 'Pointing to a photograph, Rohit said: "She is the daughter of the only son of my grandfather." How is the girl in the photograph related to Rohit?', a: 'Sister', exp: 'Rohit grandfather only son is Rohit father. The daughter of Rohit father is Rohit sister.' },
          { q: 'A is the father of B, but B is not the son of A. What is B to A?', a: 'Daughter', exp: 'Since A is the father and B is not the son, B must logically be the daughter.' },
          { q: 'Introducing a man, a woman said: "His wife is the only daughter of my father." How is the man related to the woman?', a: 'Husband', exp: 'Only daughter of woman\'s father is the woman herself. So the man\'s wife is the woman, meaning he is her husband.' }
        ];
        const sc = pickRandom(scenarios);
        questionText = `${sc.q} (Variant #${idx + 1})`;
        correctAnswer = sc.a;
        if (isMcq) {
          options = ['Sister', 'Mother', 'Daughter', 'Husband', 'Aunt'].filter(o => o !== sc.a).slice(0, 3);
          options.push(sc.a);
          options.sort(() => Math.random() - 0.5);
        }
        explanation = sc.exp;
        break;
      }

      case 'topic-coding-decoding': {
        syllabusUnit = 'Logical Reasoning Unit IV: Alphabetical Shifts and Pattern Matrix';
        learningOutcomes = 'Decode letter substitution ciphers and sequence shifts.';
        const shift = pickRandom([1, 2, 3]);
        const words = ['CLOUD', 'BRAIN', 'SMART', 'LIGHT', 'FORGE'];
        const word = pickRandom(words);
        const coded = word.split('').map(c => String.fromCharCode(c.charCodeAt(0) + shift)).join('');
        questionText = `In a certain code language, if "${word}" is coded as "${coded}", each letter is shifted by +${shift}. What is the shift rule applied? (Variant #${idx + 1})`;
        correctAnswer = `+${shift} forward shift`;
        if (isMcq) {
          options = [`+${shift} forward shift`, `+${shift + 1} forward shift`, `-${shift} reverse shift`, `+${shift * 2} position step`].sort(() => Math.random() - 0.5);
        }
        explanation = `Comparing each character in "${word}" to "${coded}" reveals a uniform forward shift of +${shift} in the English alphabet.`;
        break;
      }

      default: {
        const a = randomInt(2, 9);
        const b = randomInt(5, 45);
        const x = randomInt(2, 20);
        const rhs = a * x + b;
        questionText = `Solve for the unknown quantitative variable x in the linear algebraic equation: ${a}x + ${b} = ${rhs}. (Variant #${idx + 1})`;
        correctAnswer = `${x}`;
        if (isMcq) {
          options = [`${x}`, `${x + 2}`, `${x - 1}`, `${x * 2}`].sort(() => Math.random() - 0.5);
        }
        explanation = `Subtract ${b} from both sides: ${a}x = ${rhs - b}. Divide by ${a}: x = ${x}.`;
      }
    }

    const clean = questionText.trim().toLowerCase();
    if (!seenTexts.has(clean)) {
      seenTexts.add(clean);
      list.push({
        topicId,
        subjectId: 'subj-aptitude',
        bloomLevel,
        qtype,
        questionText,
        options,
        correctAnswer,
        explanation,
        syllabusUnit,
        learningOutcomes
      });
    }
  }

  return list;
}
