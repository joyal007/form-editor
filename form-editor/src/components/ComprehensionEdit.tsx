// @ts-nocheck

import { ComprehensiveType } from "@/types/Question";
import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Image, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import QuestionSelector from "./QuestionSelector";

function ComprehensionEdit({
  question,
  updateQuestion,
  resetQuestion,
}: {
  resetQuestion: (questionId: number, defaultValue: any) => void;
  question: ComprehensiveType;
  updateQuestion: (questionId: number, updateAttribute: any) => void;
}) {
  const inputImgRef = React.useRef<HTMLInputElement>(null);
  
  return (
    <div className="w-full bg-white p-5 rounded-md gap-2 space-y-3">
      <div className="flex w-full">
        <div className="flex-1 space-y-2">
          <Textarea
            value={question?.title}
            onChange={(e) =>
              updateQuestion(question.id, {
                title: e.target.value as string,
              })
            }
            placeholder="Comprehsive passage goes here.."
            className="w-full"
          />

          <Button
            onClick={() =>
              updateQuestion(question.id, {
                optionLastId: question.optionLastId + 1,
                options: [
                  ...question.options,
                  { id: question.optionLastId + 1, value: "" },
                ],
              })
            }
          >
            Add Options
          </Button>

          <div className=" space-y-1">
            {question.options.map((option, index) => {
              return (
                <div className="flex gap-2 items-center" key={index}>
                  <Input
                    type="radio"
                    name="options"
                    className="h-4 w-4"
                    checked={question.optionCorrect == option.id}
                    onChange={(e) => {
                      updateQuestion(question.id, {
                        optionCorrect: e.target.value,
                      });
                    }}
                    value={option.id}
                  />
                  <Input
                    type="text"
                    value={option.value}
                    onChange={(e) => {
                      const updateOptions = [...question.options];
                      updateOptions[index] = {
                        ...updateOptions[index],
                        value: e.target.value as string,
                      };
                      updateQuestion(question.id, { options: updateOptions });
                    }}
                    placeholder={"Item " + (index + 1)}
                    className="w-full"
                  />
                  {question.options.length > 2 && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const updateOptions = [...question.options];
                        updateOptions.splice(index, 1);
                        updateQuestion(question.id, { options: updateOptions });
                      }}
                    >
                      <XIcon size="20px" strokeWidth={2} />
                    </Button>
                  )}
                  {/* <Input
                    type="text"
                    placeholder="Belonging 1"
                    className="w-[120px]"
                  /> */}
                  {/* <BelongingCategorize categories={question.categories}/> */}
                </div>
              );
            })}
          </div>
        </div>
        <div>
            <input
              ref={inputImgRef}
              type="file"
              accept="image/*"
              className="hidden "
              onChange={(event) => {
                if(!event.target.files || event.target.files.length == 0) return; 
                const file = event.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    updateQuestion(question.id,{image: reader.result});
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          <Button variant="ghost" onClick={() => {inputImgRef?.current?.click()}}>
            <Image size="20px" strokeWidth={2} />
          </Button>
        </div>
        <div className="space-y-2">
          <QuestionSelector
            resetQuestion={resetQuestion}
            questionId={question.id}
            type={question.type}
          />
          <div>
            <p>Point</p>
            <Input
              type="number"
              value={question.point}
              onChange={(e) =>
                updateQuestion(question.id, { point: e.target.value })
              }
              placeholder="Point"
              className="w-20"
            />
          </div>
          {
            question.image && 
          <img src={question.image} className="w-[200px] object-contain"/>
          }
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default ComprehensionEdit;
