
import mongoose from 'mongoose';

const positionSchema = new mongoose.Schema({
  left: Number,
  right: Number,
  value: String
});

const optionSchema = new mongoose.Schema({
  id: Number,
  value: String,
  categoryId: Number // Only for categorize questions
});

const categorySchema = new mongoose.Schema({
  id: Number,
  value: String
});

const clozeQuestionSchema = new mongoose.Schema({
  id: Number,
  point: Number,
  type: { type: String, default: "cloze" },
  preview: String,
  optionLastId: Number,
  position: [positionSchema],
  options: [optionSchema],
  image: String
});

const categorizeQuestionSchema = new mongoose.Schema({
  id: Number,
  point: Number,
  type: { type: String, default: "categorize" },
  categoryLastId: Number,
  optionLastId: Number,
  title: String,
  categories: [categorySchema],
  options: [optionSchema],
  image: String
});

const comprehensiveQuestionSchema = new mongoose.Schema({
  id: Number,
  point: Number,
  type: { type: String, default: "comprehensive" },
  optionLastId: Number,
  options: [optionSchema],
  optionCorrect: Number,
  image: String,
  title: String
});


const FormSchema = new mongoose.Schema({
  id: {
    type: String,
    index: true
  },
  title: String,
  description: String,
  image: String,
  questionLastId: Number,
  questions: [mongoose.Schema.Types.Mixed]

});

const IndividualQuestionResp = new mongoose.Schema({
  questionId: Number,
  answer: mongoose.Schema.Types.Mixed
})

const ResponseSchema = new mongoose.Schema({
  id: {
    type: String,
    index: true
  },
  response: [IndividualQuestionResp]
});

const Form = mongoose.model('Forms', FormSchema);
const Response = mongoose.model('Responses', ResponseSchema);

export {Form, Response}