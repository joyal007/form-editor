import { CategorizeType, ClozeType, ComprehensiveType } from "@/types/Question";
import React from "react";
import CategoryPreview from "./CategoryPreview";
import ClozePreview from "./ClozePreview";
import ComprehensivePreview from "./ComprehensivePreview";

type QuestionT = CategorizeType | ComprehensiveType | ClozeType;

function SurveyPreview<T extends QuestionT>({ question , updateResponse,updateQuestion, response}: { question: T,response: any, updateQuestion: (questiond: number, questionAttribute: any) => void , updateResponse: (questionId: number, value: any) => void }) {
  return (
    <>
      {question.type == "categorize" ? (
        <CategoryPreview question={question as CategorizeType} updateQuestion={updateQuestion} updateResponse={updateResponse} response={response} />
      ) : question.type == "cloze" ? (
        <ClozePreview question={question as ClozeType} updateQuestion={updateQuestion} updateResponse={updateResponse} response={response} />
      ) : (
        <ComprehensivePreview question={question as ComprehensiveType} updateQuestion={updateQuestion} updateResponse={updateResponse} response={response} />
      )}
    </>
  );
}

export default SurveyPreview;
