import { CategorizeType, ClozeType, ComprehensiveType } from "@/types/Question";
import { categorizeQuestion, defaultFormData } from "@/defaultValues/formData";
import SurveyQuestion from "@/components/SurveyQuestion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, PlusIcon, SaveIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "@/lib/constants";

type QuestionT = CategorizeType | ComprehensiveType | ClozeType;

function FormEditor() {
  const params = useParams();

  const [formData, setFormData] = useState<Record<string, any>>();
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(API_URL + "form/" + params.id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }else if(res.status == 404){
          return {
            id: params.id,
            ...defaultFormData
          }
        }
      })
      .then((data) => {
        setFormData(data)
      });
  }, []);

  // useEffect(() => {
  //   if(formData?.image){
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       if(e.target){
  //         imagePreview.current!.src = e.target.result as string;
  //       }
  //    }
  //     reader.readAsDataURL(formData.image);

  //   }
  // })


  const updateQuestion = (questionId: number, updateAttribute: any) => {
    const updatedQuestions = formData?.questions?.map((q: any) => {
      if (q.id == questionId) {
        return { ...q, ...updateAttribute };
      }
      return q;
    });
    console.log(updatedQuestions, "updatedQuestions");
    setFormData({
      ...formData,
      questions: updatedQuestions as QuestionT[],
    });
  };
  const resetQuestion = (questionId: number, defaultValue: any) => {
    const updatedQuestions = formData?.questions?.map((q: any) => {
      if (q.id == questionId) {
        return { id: q.id, ...defaultValue };
      }
      return q;
    });
    setFormData({
      ...formData,
      questions: updatedQuestions as QuestionT[],
    });
  };

  return (
    <section className="pt-10 px-4 bg-neutral-400/50 min-h-screen">
      <div className="max-w-[640px] w-full mx-auto space-y-3">
        <div className="bg-white before:block before:w-full relative space-y-2 before:h-3 before:rounded-t-md rounded-md before:bg-blue-600">
          <div className="flex flex-col absolute -right-12 gap-2">
            <Button
              variant="ghost"
              className=" bg-black/70 p-3 text-white  rounded-full "
              onClick={() => {
                if (formData)
                  setFormData({
                    ...formData,
                    questionLastId: formData?.questionLastId + 1,
                    questions: [
                      ...formData.questions,
                      {
                        id: formData?.questionLastId + 1,
                        ...categorizeQuestion,
                      },
                    ],
                  });
              }}
            >
              <PlusIcon strokeWidth={2} size="18px" />
            </Button>
            <Button
              variant="ghost"
              className=" bg-blue-700/70 p-3 text-white rounded-full"
              onClick={() => {
                fetch(API_URL+"form/upload", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formData),
                });
              }}
            >
              <SaveIcon strokeWidth={2} size="18px" />
            </Button>
            <Button
              variant="ghost"
              className=" bg-blue-700/70 p-3 text-white rounded-full"
              asChild
            >
              <Link to={`/form/${params.id}`}>
              <Eye strokeWidth={2} size="18px" />
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-between px-3 py-2 gap-4">
            <div className="w-full">
              <Input
                type="text"
                value={formData?.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e?.target?.value as string,
                  })
                }
                className="min-w-[100px] w-full text-base py-0 px-0 pl-3  focus-visible:ring-offset-0 border-0 focus-visible:ring-0"
                placeholder="Untitled form"
              />
              <Input
                type="text"
                value={formData?.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e?.target?.value as string,
                  })
                }
                className="min-w-[100px] w-full h-7 text-sm border-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-0 px-0   pl-3 "
                placeholder="Description (optional)"
              />
            </div>
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              onChange={(event) => {
                if (!event.target.files || event.target.files.length == 0)
                  return;
                const file = event.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setFormData({ ...formData, image: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
            <div
              onClick={() => {
                imageRef.current?.click();
              }}
              className="h-20 bg-transparent max-w-[80px] w-full rounded-sm border border-slate-100 after:absolute after:z-20 after:left-0 after:bottom-0 after:w-full relative after:h-10 after:block after:bg-black/5 "
            >
              {formData?.image && (
                <img className="w-20 h-full" src={formData?.image} />
              )}
            </div>
          </div>
        </div>
        {formData?.questions?.map((question: any) => (
          <SurveyQuestion
            key={question.id}
            question={question}
            resetQuestion={resetQuestion}
            updateQuestion={updateQuestion}
          />
        ))}
        {/* <CategorizeType/>
        <ClozeType/>
        <ComprehensionType/> */}
      </div>
    </section>
  );
}

export default FormEditor;
