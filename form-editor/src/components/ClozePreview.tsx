// @ts-nocheck

import { ClozeType } from "@/types/Question";
import React, { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


function ClozePreview({
  question,
  updateResponse,
  updateQuestion,
  response,
}: {
  question: ClozeType;
  response: any;
  updateQuestion: (questiond: number, questionAttribute: any) => void;
  updateResponse: (questionId: number, value: any) => void;
}) {
  // console.log(question);
  const ref = React.useRef<HTMLDivElement>(null);
  const [preview, setPreview] = React.useState([]);

  useEffect(() => {
    const temp = [];
    let start = 0;
    question.position.map((pos) => {
      temp.push(question.preview.substring(start, pos.left));
      start = pos.right;
    });
    if (start != question.preview.length)
      temp.push(question.preview.substring(start, question.preview.length));
    // console.log(temp);
    setPreview(temp);
  }, []);

  //   useEffect(() => {
  //   let previewText = ``;
  //   let start = 0;
  //   question?.position.map((pos, idx) => {
  //     previewText += question.preview.substring(start, pos.left)
  //     previewText += `
  //     <Droppable droppableId=${idx}>
  //     {(provided) => (
  //       <div {...provided.droppableProps} ref={provided.innerRef} className="flex gap-2 justify-center p-2">

  //             <Draggable
  //               draggableId="${idx}"
  //               index={0}
  //             >
  //               {(provided) => <div className="p-2 border border-slate-200 w-32 rounded-md" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} >
  //               Hiii
  //                 </div>}
  //             </Draggable>

  //         {provided.placeholder}
  //       </div>

  //     )}
  //   </Droppable>
  //     `
  //     start = pos.right;
  //     console.log(pos)
  //   })

  //   updateQuestion(question.id, {preview: previewText})

  // }, [])

  // useEffect(() => {

  //   ref.current.innerHTML = question.preview
  // })

  return (
    <div className="w-full bg-white p-5 rounded-md gap-2 space-y-3">
      <DragDropContext
        onDragEnd={(result) => {
          if (result.destination == null) return;
          if (result.source.droppableId == result.destination.droppableId)
            return;
          if(response.answer?.find((res: any) => res.position == result?.destination?.droppableId)) return 
          
          let draggedValue;
          if (result.source.droppableId == "options-" + question.id) {
            const updateOptions = [...question.options];
            [draggedValue] = updateOptions.splice(result.source.index, 1);
            updateQuestion(question.id, { options: updateOptions });
          } else {
            const updateResponse = response.answer;
            [draggedValue] = updateResponse.splice(result.source.index, 1);
            if (
              result.destination.droppableId.startsWith("options") ||
              result.source.droppableId.startsWith("options")
            ) {
              // updateResponse(question.id, { answer: updateResponse });
            }
          }
          if (result.destination.droppableId == "options-" + question.id) {
            const updateOptions = [...question.options, draggedValue];
            // updateOptions.splice(result.destination.index, 0, draggedValue);
            updateQuestion(question.id, { options: updateOptions });
          } else {
            let responses = response.answer;
            draggedValue["position"] = result.destination.droppableId;
            // updateResponse[result.destination.droppableId] = [...updateResponse[result.destination.droppableId], draggedValue]
            if (responses == undefined) responses = [];
            responses = [...responses, draggedValue];
            updateResponse(question.id, { answer: responses });
          }
        }}
      >
        <Droppable droppableId={"options-" + question.id}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-2 justify-center p-2"
            >
              {question.options.map((option, index) => {
                return (
                  <Draggable
                    key={option.id}
                    draggableId={option.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="p-2 border border-slate-200 rounded-md"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        key={option.id}
                      >
                        {option.value}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="flex justify-center p-3  gap-2" ref={ref}>
          {preview.map((item, idx) => {
            return (
              <section className="flex gap-2" key={idx}>
                <p>{item}</p>
                {idx + 1 <= question.position.length && (
                  <Droppable droppableId={idx.toString()}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex gap-2 justify-center w-20 bg-yellow-300/70 rounded-md p-2"
                      >
                        {response.answer?.map((res, index) => {
                          if (res.position != idx) return;

                          return (
                            <Draggable draggableId={res.id.toString()} key={res.id} index={index}>
                              {(provided) => (
                                <div
                                  className="p-2 border border-slate-200 rounded-md"
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                >
                                  {res.value}
                                </div>
                              )}
                            </Draggable>
                          );
                        })}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </section>
            );
          })}

          {/* <Droppable droppableId='vannu'>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="flex gap-2 justify-center p-2">
                    
                        <Draggable
                          draggableId="2"
                          index={0}
                        >
                          {(provided) => <div className="p-2 border border-slate-200 rounded-md" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}></div>}
                        </Draggable>
                      
                    
                    {provided.placeholder}
                  </div>
                
                )}
              </Droppable> */}
          {/* {question.preview} */}
        </div>
      </DragDropContext>
    </div>
  );
}

export default ClozePreview;
