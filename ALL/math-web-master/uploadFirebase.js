const { initializeApp } = require('firebase/app');
const { getDatabase, ref, update } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyBa1aBN563ach8soWSP1QeCvrqZFq8yWaM",
  authDomain: "tarl-53b8f.firebaseapp.com",
  databaseURL: "https://tarl-53b8f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tarl-53b8f",
  storageBucket: "tarl-53b8f.appspot.com",
  messagingSenderId: "955448808832",
  appId: "1:955448808832:web:3777761dfdb484caf55d65"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// انسخ بياناتك من الثلاث ملفات وضعها هنا
const data = {
  users: {
      "uid_123": {
        "uid": "uid_123",
        "email": "principal@school.com",
        "role": "Principal",
        "firstName": "Amine",
        "lastName": "Bakkali",
        "school": "Tangier Science Academy"
      },
      "uid_456": {
        "uid": "uid_456",
        "email": "admin@school.com",
        "role": "Administrator",
        "firstName": "Salma",
        "lastName": "Zahra",
        "school": "Tangier Science Academy"
      },
      "uid_789": {
        "uid": "uid_789",
        "email": "teacher1@school.com",
        "role": "Teacher",
        "firstName": "Younes",
        "lastName": "El Idrissi",
        "school": "Tangier Science Academy"
      },
      "uid_999": {
        "uid": "uid_999",
        "email": "mom@gmail.com",
        "role": "Parent",
        "firstName": "Khadija",
        "lastName": "Abarghache",
        "linkedStudentIds": [
          "cPcF70DhyUgaL38pU37csaf8Ns23",
          "anotherStudentId"
        ]
      },
    //   "cPcF70DhyUgaL38pU37csaf8Ns23": {
    //     "uid": "cPcF70DhyUgaL38pU37csaf8Ns23",
    //     "email": "najlaeabarghache@etu.uae.ac.ma",
    //     "role": "Student",
    //     "firstName": "Najlae",
    //     "lastName": "Abarghache",
    //     "gender": "Female",
    //     "birthday": "2001-07-26",
    //     "schoolGrade": 6,
    //     "linkedTeacherId": "uid_789",
  
    //     "playerProfile": {
    //       "playerName": "Najlae",
    //       "gameLevel": 1,
    //       "mathLevel": 4,
    //       "coins": 25,
    //       "questionsSolved": 320,
    //       "skillsToImprove" : ["Vertical Operation Accuracy", "Multiplication", "Division"],
    //       "rewardProfile": {
    //         "score": 85,
    //         "rank": 3,
    //         "iScore": 44,
    //         "rewardCount": 7,
    //         "positives": 120,
    //         "negatives": 15
    //       }
    //     },
    //     "gameProgress": {
    //       "find_compositions": {
    //         "lastScore": 10,
    //         "bestScore": 15,
    //         "completedAt": "2025-04-05T16:40:00Z"
    //       },
    //       "vertical_operations": {
    //         "lastScore": 8,
    //         "bestScore": 10,
    //         "completedAt": "2025-04-04T18:00:00Z"
    //       }
    //     },
    //     "achievements": {
    //       "badges": ["Quick Thinker", "Accuracy Master"]
    //     }
    //   }
    // }
//   }
//   ,
//   tests: {
//     "tests": {
//       "test_001": {
//         "testName": {
//           "ar": "الصف الرابع - تقييم الفصل الدراسي الربيعي",
//           "fr": "4e année - Évaluation du trimestre de printemps",
//           "en": "Grade 4 - Spring Term Assessment"
//         },
//         "teacherId": "uid_789",
//         "grade": 4,
//         "testDuration": 120,
//         "isDraft": false,
//         "createdAt": "2025-04-07T10:00:00Z",
//         "updatedAt": "2025-04-08T14:30:00Z",
//         "miniGameOrder": [
//           "find_compositions", 
//           "vertical_operations", 
//           "choose_answer", 
//           "multi_step_problem",
//           "find_previous_next_number",
//           "tap_matching_pairs",
//           "order_numbers",
//           "compare_numbers",
//           "what_number_do_you_hear",
//           "decompose_number",
//           "write_number_in_letters",
//           "identify_place_value",
//           "read_number_aloud"
//         ],
//         "groupsMiniGameOrder": {
//           "group_1": [
//             "choose_answer", "find_compositions", "vertical_operations"
//           ],
//           "group_2": [
//             "vertical_operations", "choose_answer", "find_compositions"
//           ]
//         },
//         "miniGameConfigs": {
//           "find_compositions": {
//             "gradeConfig": {
//               "config": {
//                 "minNumCompositions": 5, 
//                 "maxNumberRange": 3, 
//                 "operation": "Subtraction", 
//                 "requiredCorrectAnswersMinimumPercent": 75
//               },
//               "updatedAt": "2025-04-08T13:00:00Z"
//             },
//             "groupsConfig": {
//               "group_1": {
//                 "config": {
//                   "minNumCompositions": 3, 
//                   "maxNumberRange": 3, 
//                   "operation": "Addition", 
//                   "requiredCorrectAnswersMinimumPercent": 75
//                 },
//                 "studentIds": [
//                   "cPcF70DhyUgaL38pU37csaf8Ns23",
//                   "anotherStudentId"
//                 ]
//               },
//               "group_2": {
//                 "config": {
//                   "minNumCompositions": 2, 
//                   "maxNumberRange": 3, 
//                   "operation": "Addition", 
//                   "requiredCorrectAnswersMinimumPercent": 60
//                 },
//                 "studentIds": [
//                   "anotherStudentId_1"
//                 ]
//               }
//             }
//           },
//           "vertical_operations": {
//             "gradeConfig": {
//               "config": {
//                 "numOperations": 3,
//                 "maxNumberRange": 4,
//                 "operationsAllowed": ["Addition", "Subtraction"],
//                 "requiredCorrectAnswersMinimumPercent": 75
//               },
//               "updatedAt": "2025-04-08T13:15:00Z"
//             }
//           },
//           "choose_answer": {
//             "gradeConfig": {
//               "config": {
//                 "numOptions": 3,
//                 "maxNumberRange": 4,
//                 "operationsAllowed": ["Addition", "Subtraction"],
//                 "requiredCorrectAnswersMinimumPercent": 75
//               },
//               "updatedAt": "2025-04-08T13:25:00Z"
//             }
//           },
//           "multi_step_problem": {
//             "gradeConfig": {
//               "config": {
//                 "numSteps": 2,
//                 "operationsAllowed": ["Addition", "Subtraction"],
//                 "numQuestions": 2,
//                 "maxNumberRange": 3, 
//                 "requiredCorrectAnswersMinimumPercent": 75
//               },
//               "updatedAt": "2025-04-08T13:40:00Z"
//             }
//           },
//           "find_previous_next_number": {
//             "gradeConfig": {
//               "config": {
//                 "numQuestions": 2,
//                 "maxNumberRange": 3, 
//                 "requiredCorrectAnswersMinimumPercent": 75
//               },
//               "updatedAt": "2025-04-08T13:45:00Z"
//             }
//           },
//           "tap_matching_pairs": {
//             "gradeConfig": {
//               "config": {
//                 "numPairs": 2, 
//                 "maxNumberRange": 2, 
//                 "requiredCorrectAnswersMinimumPercent": 75
//               },
//               "updatedAt": "2025-04-08T13:50:00Z"
//             }
//           },
//           "order_numbers": {
//             "gradeConfig": {
//               "config": {
//                 "numQuestions": 2,
//                 "maxNumberRange": 3, 
//                 "maxNumbersInSequence": 4,
//                 "requiredCorrectAnswersMinimumPercent": 75
//               },
//               "updatedAt": "2025-04-08T13:55:00Z"
//             }
//           },
//           "compare_numbers": {
//             "gradeConfig": {
//               "config": {
//                 "numQuestions": 2,
//                 "maxNumberRange": 3, 
//                 "requiredCorrectAnswersMinimumPercent": 75
//               },
//               "updatedAt": "2025-04-08T14:00:00Z"
//             }
//           },
//           "what_number_do_you_hear": {
//             "gradeConfig": {
//               "config": {
//                 "numQuestions": 5,
//                 "maxNumberRange": 3, 
//                 "requiredCorrectAnswersMinimumPercent": 75
//               },
//               "uploadedNumbersAudioLinks": {
//                 "27": { "ar": "", "fr": "", "en": "" },
//                 "45": { "ar": "", "fr": "", "en": "" }
//               },
//               "updatedAt": "2025-04-08T14:05:00Z"
//             }
//           },
//           "decompose_number": {
//             "gradeConfig": {
//               "config": {
//                 "numQuestions": 1,
//                 "maxNumberRange": 4, 
//                 "requiredCorrectAnswersMinimumPercent": 75
//               },
//               "updatedAt": "2025-04-08T14:10:00Z"
//             }
//           },
//           "write_number_in_letters": {
//             "gradeConfig": {
//               "config": {
//                 "numQuestions": 2, 
//                 "maxNumberRange": 1,
//                 "requiredCorrectAnswersMinimumPercent": 75
//               },
//               "updatedAt": "2025-04-08T14:15:00Z"
//             }
//           },
//           "identify_place_value": {
//             "gradeConfig": {
//               "config": {
//                 "numQuestions": 5,
//                 "maxNumberRange": 3, 
//                 "requiredCorrectAnswersMinimumPercent": 75
//               },
//               "updatedAt": "2025-04-08T14:20:00Z"
//             }
//           },
//           "read_number_aloud": {
//             "gradeConfig": {
//               "config": {
//                 "numQuestions": 6,
//                 "maxNumberRange": 3, 
//                 "displayTime": -1,
//                 "requiredCorrectAnswersMinimumPercent": 75
//               },
//               "updatedAt": "2025-04-08T14:20:00Z"
//             }
//           }
//         }
//       }
//     }
//   }
//   ,
//   miniGames:   {
//     "miniGames": {
//     "find_compositions": {
//       "id": "find_compositions",
//       "title": {
//         "ar": "ابحث عن التركيبات",
//         "fr": "Trouve les compositions",
//         "en": "Find Compositions"
//       },
//       "description": {
//         "ar": "ابحث عن كل التركيبات الممكنة للنتيجة المطلوبة",
//         "fr": "Trouve toutes les compositions possibles pour le résultat cible",
//         "en": "Find all possible compositions for the target result"
//       },
//       "version": "1.0",
//       "suggestedGradeRange": { "min": 2, "max": 5 },
//       "defaultConfig": {
//         "gradeConfig": {
//           "2": {"minNumCompositions": 2, "maxNumberRange": 2, "operation": "Addition", "requiredCorrectAnswersMinimumPercent": 50},
//           "3": {"minNumCompositions": 3, "maxNumberRange": 3, "operation": "Subtraction", "requiredCorrectAnswersMinimumPercent": 75},
//           "4": {"minNumCompositions": 5, "maxNumberRange": 4, "operation": "Multiplication", "requiredCorrectAnswersMinimumPercent": 75},
//           "5": {"minNumCompositions": 7, "maxNumberRange": 4, "operation": "Division", "requiredCorrectAnswersMinimumPercent": 75}
//         },
//         "skills": ["Addition", "Subtraction", "Multiplication", "Division"]
//       }
//     },
//     "vertical_operations": {
//       "id": "vertical_operations",
//       "title": {
//         "ar": "العمليات العمودية",
//         "fr": "Opérations verticales",
//         "en": "Vertical Operations"
//       },
//       "description": {
//         "ar": "حل العمليات العمودية",
//         "fr": "Résous les opérations verticales",
//         "en": "Solve vertical operations"
//       },
//       "version": "1.0",
//       "suggestedGradeRange": { "min": 3, "max": 6 },
//       "defaultConfig": {
//         "gradeConfig": {
//           "3": {"numOperations": 1, "maxNumberRange": 2,  "operationsAllowed": ["Addition",  "Subtraction"], "requiredCorrectAnswersMinimumPercent": 50},
//           "4": {"numOperations": 3, "maxNumberRange": 3,  "operationsAllowed": ["Addition",  "Subtraction"], "requiredCorrectAnswersMinimumPercent": 75},
//           "5": {"numOperations": 4, "maxNumberRange": 4,  "operationsAllowed": ["Addition",  "Subtraction", "Multiplication"], "requiredCorrectAnswersMinimumPercent": 75},
//           "6": {"numOperations": 5, "maxNumberRange": 5,  "operationsAllowed": ["Addition",  "Subtraction", "Multiplication", "Division"], "requiredCorrectAnswersMinimumPercent": 75}
//         },
//         "skills": ["Vertical Operation Accuracy", "Addition", "Subtraction", "Multiplication", "Division"]
//       }
//     },
//     "choose_answer": {
//       "id": "choose_answer",
//       "title": {
//         "ar": "اختر الجواب الصحيح",
//         "fr": "Choisis la bonne réponse",
//         "en": "Choose the Right Answer"
//       },
//       "description": {
//         "ar": "اختر الجواب الصحيح من بين الخيارات",
//         "fr": "Choisis la bonne réponse parmi les options",
//         "en": "Select the correct answer from the options"
//       },
//       "version": "1.0",
//       "suggestedGradeRange": { "min": 2, "max": 5 },
//       "defaultConfig": {
//         "gradeConfig": {
//           "2": {"numOptions": 3, "maxNumberRange": 2,  "operationsAllowed": ["Addition"]},
//           "3": {"numOptions": 3, "maxNumberRange": 2,  "operationsAllowed": ["Addition",  "Subtraction"]},
//           "4": {"numOptions": 4, "maxNumberRange": 3,  "operationsAllowed": ["Addition",  "Subtraction", "Multiplication"]},
//           "5": {"numOptions": 4, "maxNumberRange": 4,  "operationsAllowed": ["Addition",  "Subtraction", "Multiplication", "Division"]}
//         },
//         "skills": ["One-Step Problem Solving", "Operation Identification from Context"]
//       }
//     },
//     "multi_step_problem": {
//       "id": "multi_step_problem",
//       "title": {
//         "ar": "حل مسألة متعددة الخطوات",
//         "fr": "Résous un problème à plusieurs étapes",
//         "en": "Solve a Multi-Step Word Problem"
//       },
//       "description": {
//         "ar": "حل مسائل تحتوي على عدة عمليات",
//         "fr": "Résous des problèmes à plusieurs opérations",
//         "en": "Solve multi-step problems with multiple operations"
//       },
//       "version": "1.0",
//       "suggestedGradeRange": { "min": 5, "max": 6 },
//       "defaultConfig": {
//         "gradeConfig": {
//           "5": {"numQuestions": 2, "maxNumberRange": 4, "numSteps": 2, "operationsAllowed": ["Addition",  "Subtraction", "Multiplication"], "requiredCorrectAnswersMinimumPercent": 75},
//           "6": {"numQuestions": 3, "maxNumberRange": 6, "numSteps": 2, "operationsAllowed": ["Addition",  "Subtraction", "Multiplication", "Division"], "requiredCorrectAnswersMinimumPercent": 75}
//         },
//         "skills": ["Multi-Step Problem Solving", "Operation Identification from Context", "Addition", "Subtraction", "Multiplication", "Division"]
//       }
//     },
//     "find_previous_next_number": {
//       "id": "find_previous_next_number",
//       "title": {
//         "ar": "ابحث عن الرقم السابق واللاحق",
//         "fr": "Trouve le nombre précédent et suivant",
//         "en": "Find the Previous and Next Number"
//       },
//       "description": {
//         "ar": "حدد الرقم السابق واللاحق في السلسلة",
//         "fr": "Identifie le nombre précédent et suivant dans la séquence",
//         "en": "Identify the previous and next number in the sequence"
//       },
//       "version": "1.0",
//       "suggestedGradeRange": { "min": 2, "max": 3 },
//       "defaultConfig": {
//         "gradeConfig": {
//           "2": {"numQuestions": 3, "maxNumberRange": 1, "requiredCorrectAnswersMinimumPercent": 75},
//           "3": {"numQuestions": 2, "maxNumberRange": 2, "requiredCorrectAnswersMinimumPercent": 75}
//         },
//         "skills": ["Previous and Next Number Identification"]
//       }
//     },
//     "tap_matching_pairs": {
//       "id": "tap_matching_pairs",
//       "title": {
//         "ar": "اضغط على الأزواج المتطابقة",
//         "fr": "Tape les paires correspondantes",
//         "en": "Tap the Matching Pairs"
//       },
//       "description": {
//         "ar": "طابق الأرقام مع كتابتها بالكلمات",
//         "fr": "Associe les nombres avec leur écriture en lettres",
//         "en": "Match numbers with their corresponding words"
//       },
//       "version": "1.0",
//       "suggestedGradeRange": { "min": 1, "max": 3 },
//       "defaultConfig": {
//         "gradeConfig": {
//           "1": {"numPairs": 2, "maxNumberRange": 2, "requiredCorrectAnswersMinimumPercent": 50},
//           "2": {"numPairs": 3, "maxNumberRange": 4, "requiredCorrectAnswersMinimumPercent": 75},
//           "3": {"numPairs": 5, "maxNumberRange": 6, "requiredCorrectAnswersMinimumPercent": 75}
//         },
//         "skills": ["Matching Numbers with Written Form"]
//       }
//     },
//     "order_numbers": {
//       "id": "order_numbers",
//       "title": {
//         "ar": "رتب الأرقام",
//         "fr": "Ordonne les nombres",
//         "en": "Order the Numbers"
//       },
//       "description": {
//         "ar": "رتب الأرقام تصاعدياً أو تنازلياً",
//         "fr": "Range les nombres dans l’ordre croissant ou décroissant",
//         "en": "Arrange the numbers in ascending or descending order"
//       },
//       "version": "1.0",
//       "suggestedGradeRange": { "min": 2, "max": 4 },
//       "defaultConfig": {
//         "gradeConfig": {
//           "2": {"numQuestions": 2, "maxNumberRange": 2, "maxNumbersInSequence": 3, "requiredCorrectAnswersMinimumPercent": 50},
//           "3": {"numQuestions": 3, "maxNumberRange": 4, "maxNumbersInSequence": 5, "requiredCorrectAnswersMinimumPercent": 75},
//           "4": {"numQuestions": 5, "maxNumberRange": 6, "maxNumbersInSequence": 7, "requiredCorrectAnswersMinimumPercent": 75}
//         },
//         "skills": ["Numbers Ordering"]
//       }
//     },
//     "compare_numbers": {
//       "id": "compare_numbers",
//       "title": {
//         "ar": "قارن الأرقام",
//         "fr": "Compare les nombres",
//         "en": "Compare Numbers"
//       },
//       "description": {
//         "ar": "ضع علامة المقارنة الصحيحة بين الأرقام",
//         "fr": "Place les signes de comparaison entre les nombres",
//         "en": "Place comparison signs between numbers"
//       },
//       "version": "1.0",
//       "suggestedGradeRange": { "min": 2, "max": 3 },
//       "defaultConfig": {
//         "gradeConfig": {
//           "2": {"numQuestions": 3, "maxNumberRange": 1, "requiredCorrectAnswersMinimumPercent": 75},
//           "3": {"numQuestions": 2, "maxNumberRange": 2, "requiredCorrectAnswersMinimumPercent": 75}
//         },
//         "skills": ["Numbers Comparison"]
//       }
//     },
//     "what_number_do_you_hear": {
//       "id": "what_number_do_you_hear",
//       "title": {
//         "ar": "ما الرقم الذي تسمعه؟",
//         "fr": "Quel nombre entends-tu ?",
//         "en": "What Number Do You Hear?"
//       },
//       "description": {
//         "ar": "تعرف على الأرقام من خلال الاستماع إليها",
//         "fr": "Identifie les nombres en les écoutant",
//         "en": "Identify numbers by listening to them"
//       },
//       "version": "1.0",
//       "suggestedGradeRange": { "min": 1, "max": 2 },
//       "defaultConfig": {
//         "gradeConfig": {
//           "1": {"numQuestions": 6, "maxNumberRange": 1, "requiredCorrectAnswersMinimumPercent": 75},
//           "2": {"numQuestions": 4, "maxNumberRange": 2, "requiredCorrectAnswersMinimumPercent": 75}
//         },
//         "skills": ["Number Audio Recognition"],
//         "numbersAudioLinks":
//         {
//           "0":{ "ar": "", "fr": "", "en": "" },
//           "1":{ "ar": "", "fr": "", "en": "" },
//           "2":{ "ar": "", "fr": "", "en": "" },
//           "3":{ "ar": "", "fr": "", "en": "" },
//           "4":{ "ar": "", "fr": "", "en": "" },
//           "5":{ "ar": "", "fr": "", "en": "" },
//           "6":{ "ar": "", "fr": "", "en": "" },
//           "7":{ "ar": "", "fr": "", "en": "" }
//         }
//       }
//     },
//     "decompose_number": {
//       "id": "decompose_number",
//       "title": {
//         "ar": "فكك الرقم التالي",
//         "fr": "Décompose le nombre suivant",
//         "en": "Decompose the Following Number"
//       },
//       "description": {
//         "ar": "فكك الرقم إلى مكوناته حسب القيمة المكانية",
//         "fr": "Décompose un nombre en ses composantes de valeur de position",
//         "en": "Decompose a number into its place value components"
//       },
//       "version": "1.0",
//       "suggestedGradeRange": { "min": 2, "max": 4 },
//       "defaultConfig": {
//         "gradeConfig": {
//           "2": {"numQuestions": 2, "maxNumberRange": 1, "requiredCorrectAnswersMinimumPercent": 75},
//           "3": {"numQuestions": 4, "maxNumberRange": 2, "requiredCorrectAnswersMinimumPercent": 75},
//           "4": {"numQuestions": 4, "maxNumberRange": 4, "requiredCorrectAnswersMinimumPercent": 75}
//         },
//         "skills": ["Number Decomposition"]
//       }
//     },
//     "write_number_in_letters": {
//       "id": "write_number_in_letters",
//       "title": {
//         "ar": "اكتب الرقم التالي بالحروف",
//         "fr": "Écris le nombre suivant en lettres",
//         "en": "Write the Following Number in Letters"
//       },
//       "description": {
//         "ar": "اكتب الرقم بالكلمات",
//         "fr": "Écris le nombre en toutes lettres",
//         "en": "Write the number in words"
//       },
//       "version": "1.0",
//       "suggestedGradeRange": { "min": 1, "max": 3 },
//       "defaultConfig": {
//         "gradeConfig": {
//           "1": {"numQuestions": 2, "maxNumberRange": 1, "requiredCorrectAnswersMinimumPercent": 75},
//           "2": {"numQuestions": 3, "maxNumberRange": 2, "requiredCorrectAnswersMinimumPercent": 75},
//           "3": {"numQuestions": 4, "maxNumberRange": 4, "requiredCorrectAnswersMinimumPercent": 75}
//         },
//         "skills": ["Numbers to Words"]
//       }
//     },
//     "identify_place_value": {
//       "id": "identify_place_value",
//       "title": {
//         "ar": "حدد الوحدات والعشرات والمئات والآلاف",
//         "fr": "Identifie les unités, dizaines, centaines et milliers",
//         "en": "Identify the Units, Tens, Hundreds, and Thousands"
//       },
//       "description": {
//         "ar": "حدد القيمة المكانية لكل رقم",
//         "fr": "Identifie la valeur de position de chaque chiffre",
//         "en": "Identify the place value of each digit in a number"
//       },
//       "version": "1.0",
//       "suggestedGradeRange": { "min": 3, "max": 6 },
//       "defaultConfig": {
//         "gradeConfig": {
//           "3": {"numQuestions": 10, "maxNumberRange": 3, "requiredCorrectAnswersMinimumPercent": 75},
//           "4": {"numQuestions": 10, "maxNumberRange": 4, "requiredCorrectAnswersMinimumPercent": 75},
//           "5": {"numQuestions": 8, "maxNumberRange": 6, "requiredCorrectAnswersMinimumPercent": 75},
//           "6": {"numQuestions": 8, "maxNumberRange": 7, "requiredCorrectAnswersMinimumPercent": 75}
//         },
//         "skills": ["Place Value Identification"]
//       }
//     },
//     "read_number_aloud": {
//       "id": "read_number_aloud",
//       "title": {
//         "ar": "اقرأ الرقم التالي بصوت عالٍ",
//         "fr": "Lis le numéro suivant à voix haute",
//         "en": "Read the Number Aloud"
//       },
//       "description": {
//         "ar": "اقرأ الرقم التالي بصوت عالٍ",
//         "fr": "Lisez le numéro suivant à voix haute",
//         "en": "Read the following number aloud"
//       },
//       "version": "1.0",
//       "suggestedGradeRange": { "min": 1, "max": 4 },
//       "defaultConfig": {
//         "gradeConfig": {
//           "1": {"numQuestions": 6, "maxNumberRange": 1, "displayTime": -1, "requiredCorrectAnswersMinimumPercent": 50},
//           "2": {"numQuestions": 8, "maxNumberRange": 2, "displayTime": 30, "requiredCorrectAnswersMinimumPercent": 75},
//           "3": {"numQuestions": 10, "maxNumberRange": 3, "displayTime": 25, "requiredCorrectAnswersMinimumPercent": 75},
//           "4": {"numQuestions": 10, "maxNumberRange": 4, "displayTime": 20, "requiredCorrectAnswersMinimumPercent": 75}
//         },
//         "skills": ["Number Recognition"]
//       }
//     }
//   }
// },
// School:
//   [
//     {
//       "name":"Atlas Academy",
//       "address":"987 Liberty St",
//       "phone":"+212 660-787854",
//       "email":"contact0@school.ma",
//       "academy":"Oriental"
//     },
//     {
//       "name":"Renaissance School",
//       "address":"222 Freedom Ave",
//       "phone":"+212 643-381232",
//       "email":"contact1@school.ma",
//       "academy":"Guelmim-Oued Noun"
//     },
//     {
//       "name":"Al Amal School",
//       "address":"101 Cedar Dr",
//       "phone":"+212 665-756106",
//       "email":"contact2@school.ma",
//       "academy":"Tangier-Tetouan-Al Hoceima"
//     },
//     {
//       "name":"Al Nour School",
//       "address":"789 Atlas Rd",
//       "phone":"+212 648-930721",
//       "email":"contact3@school.ma",
//       "academy":"Oriental"
//     },
//     {
//       "name":"Al Mostaqbal School",
//       "address":"222 Freedom Ave",
//       "phone":"+212 691-572971",
//       "email":"contact4@school.ma",
//       "academy":"Rabat-Sal\u00e9-K\u00e9nitra"
//     },
//     {
//       "name":"Al Amal School",
//       "address":"456 Ocean Ave",
//       "phone":"+212 658-489949",
//       "email":"contact5@school.ma",
//       "academy":"Dr\u00e2a-Tafilalet"
//     },
//     {
//       "name":"Al Mostaqbal School",
//       "address":"654 Horizon St",
//       "phone":"+212 668-777777",
//       "email":"contact6@school.ma",
//       "academy":"Marrakech-Safi"
//     },
//     {
//       "name":"Yassamine School",
//       "address":"123 Main St",
//       "phone":"+212 677-475850",
//       "email":"contact7@school.ma",
//       "academy":"F\u00e8s-Mekn\u00e8s"
//     },
//     {
//       "name":"Yassamine School",
//       "address":"987 Liberty St",
//       "phone":"+212 665-178248",
//       "email":"contact8@school.ma",
//       "academy":"Dakhla-Oued Ed-Dahab"
//     },
//     {
//       "name":"Al Farabi School",
//       "address":"456 Ocean Ave",
//       "phone":"+212 672-920264",
//       "email":"contact9@school.ma",
//       "academy":"Casablanca-Settat"
//     },
//     {
//       "name":"Al Mostaqbal School",
//       "address":"987 Liberty St",
//       "phone":"+212 673-755434",
//       "email":"contact10@school.ma",
//       "academy":"Dr\u00e2a-Tafilalet"
//     },
//     {
//       "name":"Al Nour School",
//       "address":"123 Main St",
//       "phone":"+212 613-942929",
//       "email":"contact11@school.ma",
//       "academy":"Guelmim-Oued Noun"
//     },
//     {
//       "name":"Future Leaders",
//       "address":"123 Main St",
//       "phone":"+212 620-239202",
//       "email":"contact12@school.ma",
//       "academy":"Tangier-Tetouan-Al Hoceima"
//     },
//     {
//       "name":"Atlas Academy",
//       "address":"123 Main St",
//       "phone":"+212 613-298623",
//       "email":"contact13@school.ma",
//       "academy":"Rabat-Sal\u00e9-K\u00e9nitra"
//     },
//     {
//       "name":"Al Mostaqbal School",
//       "address":"123 Main St",
//       "phone":"+212 660-425414",
//       "email":"contact14@school.ma",
//       "academy":"Souss-Massa"
//     },
//     {
//       "name":"Bright Minds School",
//       "address":"123 Main St",
//       "phone":"+212 655-752559",
//       "email":"contact15@school.ma",
//       "academy":"Souss-Massa"
//     },
//     {
//       "name":"Renaissance School",
//       "address":"987 Liberty St",
//       "phone":"+212 668-496304",
//       "email":"contact16@school.ma",
//       "academy":"La\u00e2youne-Sakia El Hamra"
//     },
//     {
//       "name":"Future Leaders",
//       "address":"222 Freedom Ave",
//       "phone":"+212 668-758719",
//       "email":"contact17@school.ma",
//       "academy":"La\u00e2youne-Sakia El Hamra"
//     },
//     {
//       "name":"Al Mostaqbal School",
//       "address":"101 Cedar Dr",
//       "phone":"+212 672-184772",
//       "email":"contact18@school.ma",
//       "academy":"Dakhla-Oued Ed-Dahab"
//     },
//     {
//       "name":"Zahrat Al Madaen",
//       "address":"789 Atlas Rd",
//       "phone":"+212 629-962950",
//       "email":"contact19@school.ma",
//       "academy":"Casablanca-Settat"
//     },
//     {
//       "name":"Renaissance School",
//       "address":"123 Main St",
//       "phone":"+212 618-616300",
//       "email":"contact20@school.ma",
//       "academy":"B\u00e9ni Mellal-Kh\u00e9nifra"
//     },
//     {
//       "name":"Bright Minds School",
//       "address":"222 Freedom Ave",
//       "phone":"+212 658-658364",
//       "email":"contact21@school.ma",
//       "academy":"B\u00e9ni Mellal-Kh\u00e9nifra"
//     },
//     {
//       "name":"Yassamine School",
//       "address":"222 Freedom Ave",
//       "phone":"+212 635-837758",
//       "email":"contact22@school.ma",
//       "academy":"F\u00e8s-Mekn\u00e8s"
//     },
//     {
//       "name":"Bright Minds School",
//       "address":"654 Horizon St",
//       "phone":"+212 643-736625",
//       "email":"contact23@school.ma",
//       "academy":"Marrakech-Safi"
//     }
//   ]
 

"xZHGOCwsgkP22g7ijGXRWAY4jG72": {
  "academy": "Tangier-Tetouan-Al Hoceima",
  "data_completed": true,
  "dateEmbauche": "2025-05-03",
  "dateNaissance": "2025-05-01",
  "ecole": "Al Amal School",
  "email": "mussumuhand@gmail.com",
  "emailVerified": false,
  "firstName": "moussa",
  "frozen": false,
  "lastName": "mohand",
  "matieres_enseignees": "R",
  "photo": "P2.png",
  "role": "Teacher",
  "telephone": "3",
  "uid": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  "updatedAt": "2025-05-08T19:18:42.289Z",
  "userId": "xZHGOCwsgkP22g7ijGXRWAY4jG72"
},
    "stu_1746732217285_5529": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:00:00Z",
      "firstName": "student1",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "3",
      "uid": "stu_1746732217285_5529"
    },
    "stu_1746732217285_1708": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:00:20Z",
      "firstName": "student2",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "1",
      "uid": "stu_1746732217285_1708"
    },
    "stu_1746732217285_6217": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:00:40Z",
      "firstName": "student3",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "3",
      "uid": "stu_1746732217285_6217"
    },
    "stu_1746732217285_5666": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:01:00Z",
      "firstName": "student4",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "5",
      "uid": "stu_1746732217285_5666"
    },
    "stu_1746732217285_6629": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:01:20Z",
      "firstName": "student5",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "4",
      "uid": "stu_1746732217285_6629"
    },
    "stu_1746732217285_8596": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:01:40Z",
      "firstName": "student6",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "1",
      "uid": "stu_1746732217285_8596"
    },
    "stu_1746732217285_6602": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:02:00Z",
      "firstName": "student7",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "1",
      "uid": "stu_1746732217285_6602"
    },
    "stu_1746732217285_6835": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:02:20Z",
      "firstName": "student8",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "2",
      "uid": "stu_1746732217285_6835"
    },
    "stu_1746732217285_3893": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:02:40Z",
      "firstName": "student9",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "4",
      "uid": "stu_1746732217285_3893"
    },
    "stu_1746732217285_3262": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:03:00Z",
      "firstName": "student10",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "4",
      "uid": "stu_1746732217285_3262"
    },
    "stu_1746732217285_8986": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:03:20Z",
      "firstName": "student11",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "4",
      "uid": "stu_1746732217285_8986"
    },
    "stu_1746732217285_3320": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:03:40Z",
      "firstName": "student12",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "1",
      "uid": "stu_1746732217285_3320"
    },
    "stu_1746732217285_2504": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:04:00Z",
      "firstName": "student13",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "1",
      "uid": "stu_1746732217285_2504"
    },
    "stu_1746732217285_7199": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:04:20Z",
      "firstName": "student14",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "4",
      "uid": "stu_1746732217285_7199"
    },
    "stu_1746732217285_3022": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:04:40Z",
      "firstName": "student15",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "4",
      "uid": "stu_1746732217285_3022"
    },
    "stu_1746732217285_4069": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:05:00Z",
      "firstName": "student16",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "3",
      "uid": "stu_1746732217285_4069"
    },
    "stu_1746732217285_6559": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:05:20Z",
      "firstName": "student17",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "1",
      "uid": "stu_1746732217285_6559"
    },
    "stu_1746732217285_3515": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:05:40Z",
      "firstName": "student18",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "4",
      "uid": "stu_1746732217285_3515"
    },
    "stu_1746732217285_9967": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:06:00Z",
      "firstName": "student19",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "6",
      "uid": "stu_1746732217285_9967"
    },
    "stu_1746732217285_8257": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:06:20Z",
      "firstName": "student20",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "5",
      "uid": "stu_1746732217285_8257"
    },
    "stu_1746732217285_4757": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:06:40Z",
      "firstName": "student21",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "4",
      "uid": "stu_1746732217285_4757"
    },
    "stu_1746732217285_7813": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:07:00Z",
      "firstName": "student22",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "1",
      "uid": "stu_1746732217285_7813"
    },
    "stu_1746732217285_6742": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:07:20Z",
      "firstName": "student23",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "3",
      "uid": "stu_1746732217285_6742"
    },
    "stu_1746732217285_4614": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:07:40Z",
      "firstName": "student24",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "5",
      "uid": "stu_1746732217285_4614"
    },
    "stu_1746732217285_6509": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:08:00Z",
      "firstName": "student25",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "3",
      "uid": "stu_1746732217285_6509"
    },
    "stu_1746732217285_7761": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:08:20Z",
      "firstName": "student26",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "5",
      "uid": "stu_1746732217285_7761"
    },
    "stu_1746732217285_9858": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:08:40Z",
      "firstName": "student27",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "6",
      "uid": "stu_1746732217285_9858"
    },
    "stu_1746732217285_6241": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:09:00Z",
      "firstName": "student28",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "4",
      "uid": "stu_1746732217285_6241"
    },
    "stu_1746732217285_3050": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:09:20Z",
      "firstName": "student29",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "2",
      "uid": "stu_1746732217285_3050"
    },
    "stu_1746732217285_7271": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:09:40Z",
      "firstName": "student30",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "2",
      "uid": "stu_1746732217285_7271"
    },
    "stu_1746732217285_6370": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:10:00Z",
      "firstName": "student31",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "4",
      "uid": "stu_1746732217285_6370"
    },
    "stu_1746732217285_6692": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:10:20Z",
      "firstName": "student32",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "2",
      "uid": "stu_1746732217285_6692"
    },
    "stu_1746732217285_9062": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:10:40Z",
      "firstName": "student33",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "3",
      "uid": "stu_1746732217285_9062"
    },
    "stu_1746732217285_7671": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:11:00Z",
      "firstName": "student34",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "1",
      "uid": "stu_1746732217285_7671"
    },
    "stu_1746732217285_9236": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:11:20Z",
      "firstName": "student35",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "2",
      "uid": "stu_1746732217285_9236"
    },
    "stu_1746732217285_7460": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:11:40Z",
      "firstName": "student36",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "5",
      "uid": "stu_1746732217285_7460"
    },
    "stu_1746732217285_4741": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:12:00Z",
      "firstName": "student37",
      "lastName": "test",
      "gender": "Female",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "4",
      "uid": "stu_1746732217285_4741"
    },
    "stu_1746732217285_1235": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:12:20Z",
      "firstName": "student38",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "1",
      "uid": "stu_1746732217285_1235"
    },
    "stu_1746732217285_3548": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:12:40Z",
      "firstName": "student39",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "6",
      "uid": "stu_1746732217285_3548"
    },
    "stu_1746732217285_8887": {
      "birthday": "2025-05-04",
      "createdAt": "2025-05-01T00:13:00Z",
      "firstName": "student40",
      "lastName": "test",
      "gender": "Male",
      "linkedSchoolId": "Al Amal School",
      "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
      "password": "1234",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
      "role": "Student",
      "schoolGrade": "3",
      "uid": "stu_1746732217285_8887"
    }
      }
    
};

const updates = {
  '/users': data.users,
  // '/tests': data.tests,
  // '/miniGames': data.miniGames,
  // '/School': data.School
};

update(ref(db), updates)
  .then(() => console.log('✅ تم إدخال البيانات بنجاح'))
  .catch(err => console.error('❌ خطأ أثناء الإدخال:', err));
