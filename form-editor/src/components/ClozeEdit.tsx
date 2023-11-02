import { ClozeType } from "@/types/Question";
import React from "react";
import { Input } from "./ui/input";
import { GripVerticalIcon, Image, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import QuestionSelector from "./QuestionSelector";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function ClozeEdit({
  question,
  updateQuestion,
  resetQuestion,
}: {
  resetQuestion: (questionId: number, defaultValue: any) => void;
  question: ClozeType;
  updateQuestion: (questionId: number, updateAttribute: any) => void;
}) {
  const [input, setInput] = React.useState("");
  const inputImgRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (question.position.length > 0) {
      let previewText = question.preview;
      const positions = question.position;
      positions.sort((a, b) => a.left - b.left);
      // console.log(positions);
      positions.forEach((pos) => {
        // console.log("foreach", question.preview.substring(0, pos.left));
        previewText =
          previewText.substring(0, pos.left) +
          `<u>${pos.value}</u>` +
          question.preview.substring(pos.right);
      });
      // console.log("<p>" + previewText + "</p>");
      setInput("<p>" + previewText + "</p>");
    } else setInput(question.preview);
  }, []);


  

  console.log(question, "question");

  React.useEffect(() => {
    const position = [];
    const options = [];
    let id = 1;
    const processedText = input.slice(3, -4).trim();
    let firstTime = true;
    const convertedString = processedText.replace(
      /<u>(.*?)<\/u>/g,
      (val, text) => {
        console.log(val,text)
        let left = processedText.indexOf(val);
        if(!firstTime)
          left -= 7 * options.length
        const right = left + text.length;
        position.push({ left, right, value: text });
        options.push({id, value:text});
        id++;
        firstTime = false
        return "_".repeat(text.length);

        // add option value get's deleted in this case
      }
    );

    console.log(position)

    updateQuestion(question.id, {
      options,
      preview: convertedString,
      position,
      optionLastId: id-1,
    });
  }, [input]);

  return (
    <div className="w-full bg-white p-5 rounded-md gap-2 space-y-3">
      <div className="flex w-full">
        <div className="flex-1 space-y-2">
          <p className="text-sm">Preview</p>
          <Input
            value={question.preview}
            type="text"
            className="tracking-[2px] "
            placeholder="Preview"
          />
          <p className="text-sm">Sentence</p>

          <ReactQuillComp input={input} setInput={setInput} />

          <Button
            onClick={() =>
              updateQuestion(question.id, {
                options: [...question.options, {id: question.optionLastId+1 ,value: ""}],
                optionLastId: question.optionLastId+1
                // options: [...question.options, ""],
              })
            }
          >
            Add Options
          </Button>

          <div className="">
            <DragDropContext onDragEnd={(result) => {
              if(result.source.droppableId != "optionCloze" || result.destination == null) return;
              const updateOptions = [...question.options];
              const [removed] = updateOptions.splice(result.source.index, 1);
              updateOptions.splice(result.destination.index, 0, removed);
              updateQuestion(question.id, { options: updateOptions });
            }}>
              <Droppable droppableId="optionCloze">
                {(provided) => (
                  <div {...provided.droppableProps} className="space-y-2" ref={provided.innerRef}>
                    {question.options.map((option, index) => {
                      const answerOptions = question.position.map(
                        (pos) => pos.value
                      );
                      return (
                        <Draggable
                          key={option.id}
                          draggableId={option.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="flex gap-2 w-full"
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <div className="flex items-center">
                                <div
                                  {...provided.dragHandleProps}
                                  className="h-[18px] "
                                >
                                  <GripVerticalIcon size="18px" />
                                </div>
                                <Input
                                  disabled={answerOptions.includes(option.value)}
                                  type="text"
                                  value={option.value}
                                  onChange={(e) => {
                                    const updateOptions = [...question.options];
                                    // updateOptions[index] = {
                                    //   ...updateOptions[index],
                                    //   value: e.target.value as string,
                                    // }
                                    updateOptions[index] = {
                                      ...updateOptions[index],
                                      value: e.target.value as string,
                                    }
                                    updateQuestion(question.id, {
                                      options: updateOptions,
                                    });
                                  }}
                                  placeholder={"Item " + (index + 1)}
                                  
                                />
                              </div>
                              {!answerOptions.includes(option.value) && (
                                <Button
                                  variant={"ghost"}
                                  onClick={() => {
                                    const updateOptions = [...question.options];
                                    updateOptions.splice(index, 1);
                                    updateQuestion(question.id, {
                                      options: updateOptions,
                                    });
                                  }}
                                >
                                  <XIcon size="20px" strokeWidth={2} />
                                </Button>
                              )}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
        <div>
        <input
              type="file"
              accept="image/*"
              ref={inputImgRef}
              className="h-0 w-0"
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
            !!question.image && <img src={question.image} className="w-[200px]" />
          }
          
        </div>
      </div>
    </div>
  );
}

const ReactQuillComp = ({ input: value, setInput: setValue }:{input: string, setInput: React.Dispatch<React.SetStateAction<string>>}) => {
  // const [value, setValue] = React.useState('');

  const handleChange = (value: string) => {
    console.log(value);
    setValue(value);
  };

  const toolbarOptions = [["underline"]];

  return (
    <ReactQuill
      value={value}
      placeholder="Sentence goes here..."
      onChange={handleChange}
      modules={{ toolbar: toolbarOptions }}
    />
  );
};

export default ClozeEdit;
