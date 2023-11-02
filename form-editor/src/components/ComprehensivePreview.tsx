// @ts-nocheck
import { ComprehensiveType } from '@/types/Question';

function ComprehensivePreview({
  question,
  updateResponse,
  updateQuestion,
  response,
}: {
  question: ComprehensiveType;
  response: any;
  updateQuestion: (questiond: number, questionAttribute: any) => void;
  updateResponse: (questionId: number, value: any) => void;
}) {
  return (
    <div className="w-full bg-white p-5 rounded-md gap-2 space-y-3">
      <p>{question.title}</p>
      <div>
        {question.options.map((option) => {
          return(
            <div key={option.id}>
            <input type="radio" name={question.id.toString()} onChange={() => {updateResponse(question.id, {answer: option.value})}}/>
            {option.value}
            </div>
          )
        }
        )}
      </div>
      
    </div>
  )
}

export default ComprehensivePreview