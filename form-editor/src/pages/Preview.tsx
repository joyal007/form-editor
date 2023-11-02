import { CategorizeType, ClozeType, ComprehensiveType } from "@/types/Question";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/constants";
import { useParams } from "react-router-dom";
import SurveyPreview from "@/components/SurveyPreview";
import { Button } from "@/components/ui/button";

type QuestionT = CategorizeType | ComprehensiveType | ClozeType;

function Preview() {
  const [formData, setFormData] = useState<Record<string, any>>();
  const [response, setResponse] = useState<Record<string, any>>({});
  const [notFound, setNotFound] = useState(false)
  const params = useParams();
  

  function updateResponse(questionId: number, value: any){

    const updateResp = response.response.map((res: any) => {
      if(res.questionId == questionId){
        const test =  {...res, ...value}
        return test
      }
      return res
    })
    setResponse({...response, response: updateResp})
  }


  const updateQuestion = (questionId: number, updateAttribute: any) => {
    const updatedQuestions = formData?.questions?.map((q: any) => {
      if (q.id == questionId) {
        return { ...q, ...updateAttribute };
      }
      return q;
    });
    setFormData({
      ...formData,
      questions: updatedQuestions as QuestionT[],
    });
  };
  


  console.log("response", response)
  useEffect(() => {
    fetch(API_URL + "form/" + params.id, {mode: "cors",}).then(res => {
      if(res.ok){
        return res.json()
      }else if(res.status == 404){
        setNotFound(true)
      }
    }).then(data => {
      console.log(data)
      setFormData(data)
      setResponse({id: data.id, response: data.questions.map((question: any) => ({questionId :question.id}))})
    })
    
  }, []);



  console.log(formData)
  

  if(notFound)
    return <div>Not Found</div>

  return (
    <section className="pt-10 px-4 bg-neutral-400/50 min-h-screen">
      <div className="max-w-[640px] w-full mx-auto space-y-3">
        <div className="bg-white before:block before:w-full relative space-y-2 before:h-3 before:rounded-t-md rounded-md before:bg-blue-600">
          
          <div className="flex items-center justify-between px-3 py-2 gap-4">
            <div className="w-full">
              <h3
                
                className="min-w-[100px] w-full text-xl py-0 px-0 pl-3  focus-visible:ring-offset-0 border-0 focus-visible:ring-0"
              >
                {formData?.title}
              </h3>
              <h4
                
                className="min-w-[100px] w-full h-7 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-0 px-0   pl-3 "
              >
                {formData?.description}
              </h4>
            </div>
              
            <div  className="h-20 bg-transparent w-20 rounded-sm border border-slate-100  ">
              {
                formData?.image && 
              <img className="w-20 h-full" src={formData?.image} />
              }
            </div>
          </div>
        </div>
        {formData?.questions?.map((question: any) => (
          <SurveyPreview
            key={question.id}
            question={question}
            updateQuestion={updateQuestion}
            updateResponse={updateResponse}
            response={response.response.find((res: any) => res.questionId == question.id)}
          />
        ))}
        <div className="flex justify-center">
        <Button onClick={() => {
          fetch(API_URL +"form/submit", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(response),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            if(res.ok){
              return res.json()
            }
          }).then(data => {
            console.log(data)
          })
        }}>Submit Form</Button>
        </div>
      </div>
    </section>
  );
}

export default Preview;
