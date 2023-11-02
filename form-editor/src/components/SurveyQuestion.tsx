import { CategorizeType, ClozeType, ComprehensiveType } from "@/types/Question";
import CategorizeEdit from "@/components/CategorizeEdit";
import ClozeEdit from "@/components/ClozeEdit";
import ComprehensiveEdit from "@/components/ComprehensionEdit";

type QuestionT = CategorizeType | ComprehensiveType | ClozeType;

function SurveyQuestion<T extends QuestionT>({ question, updateQuestion, resetQuestion }: { question: T,resetQuestion: (questionId: number, defaultValue: any) => void , updateQuestion: (questionId: number, updateAttribute: any) => void }) {
  return (
    <>
      {question.type == "categorize" ? (
        <CategorizeEdit resetQuestion={resetQuestion} question={question as CategorizeType} updateQuestion={updateQuestion}  />
      ) : question.type == "cloze" ? (
        <ClozeEdit resetQuestion={resetQuestion} question={question as ClozeType} updateQuestion={updateQuestion} />
      ) : (
        <ComprehensiveEdit resetQuestion={resetQuestion} question={question as ComprehensiveType} updateQuestion={updateQuestion} />
      )}
    </>
  );
}

export default SurveyQuestion;
