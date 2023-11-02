// import { CategorizeType, GeneralQuestion } from "@/types/Question";

export const categorizeQuestion: any = {
  point: 10,
  type: "categorize",
  categoryLastId: 2,
  optionLastId: 2,
  title: "",
  categories: [
    { id: 1, value: "" },
    { id: 2, value: "" },
  ],
  options: [
    { id: 1, value: "" },
    { id: 2, value: "" },
  ],
  image: null,
};

export const defaultFormData: any = {
  title: "",
  description: "",
  image: "",
  questionLastId: 1,
  questions: [{ id:1, ...categorizeQuestion }],
};

export const comprehensiveQuestion: any = {
  point: 10,
  type: "comprehensive",
  optionLastId: 2,
  options: [
    { id: 1, value: "" },
    { id: 2, value: "" },
  ],
  optionCorrect: null,
  image: null,
};

export const clozeQuestion: any = {
  point: 10,
  type: "cloze",
  preview: "",
  optionLastId: 0,
  position: [],
  options: [],
  image: null,
};

// export const clozeQuestion: any = {
//     "point": 10,
//     "type": "cloze",
//     "preview": "Joyal ______ Thott",
//     "position": [
//         {
//             "left": 6,
//             "right": 12,
//             "value": "Raphel"
//         }
//     ],
//     "options": [
//         "Raphel"
//     ]
// }
