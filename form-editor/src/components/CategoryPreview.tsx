/* eslint-disable*/
// @ts-nocheck

import { CategorizeType } from "@/types/Question";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function CategoryPreview({ question, updateResponse, updateQuestion,  response }: { question: CategorizeType, response: Record<string,any> ,updateQuestion: (questionId: number, updateAttribute: any) => void,updateResponse: (questionId: number, value: any) => void }) {
    

  return (
    <div className="w-full bg-white p-5 rounded-md gap-2 space-y-3">
      <h4>{question.title}</h4>
      <DragDropContext onDragEnd={(result) => {
        if(result.destination == null) return;
        if(result.source.droppableId == result.destination.droppableId) return;

        let draggedValue;

        if(result.source.droppableId == "options-"+question.id){
          const updateOptions = [...question.options];
          [draggedValue] = updateOptions.splice(result.source.index, 1);
          updateQuestion(question.id, { options: updateOptions });
        }else{
          const updateResponse = response.answer;
          [draggedValue] = updateResponse.splice(result.source.index, 1);
          if(result.destination.droppableId.startsWith("options") || result.source.droppableId.startsWith("options")){
            // updateResponse(question.id, { answer: updateResponse });
          }
          
        }
      
        if(result.destination.droppableId == "options-"+question.id){
         
          const updateOptions = [...question.options, draggedValue];
          // updateOptions.splice(result.destination.index, 0, draggedValue);
          updateQuestion(question.id, { options: updateOptions });
        }else{

          let responses = response.answer;
          draggedValue["categoryId"] = result.destination.droppableId;
          // updateResponse[result.destination.droppableId] = [...updateResponse[result.destination.droppableId], draggedValue]
          if(responses == undefined) responses = []
          responses = [...responses, draggedValue]
          updateResponse(question.id, { answer: responses })
        }


      }} >
        <Droppable droppableId={"options-"+question.id}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="flex gap-2 justify-center p-2">
              {question.options?.map((option, index) => {
                return (
                  <Draggable
                    key={option.id}
                    draggableId={option.id.toString()}
                    index={index}
                  >
                    {(provided) => <div className="p-2 border border-slate-200 rounded-md" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} key={option.id}>{option.value}</div>}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
          <div className="flex justify-center p-3  gap-2">
        {
            question.categories?.map((category, index) => (
        <Droppable key={category.id} droppableId={category.id.toString()}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className=" p-2 min-w-[150px] text-center space-y-2 bg-orange-300 rounded-md">
                <h3 className="text-white mb-3 border-b border-white">{category.value}</h3>
              {response.answer?.map((option: any, index: any) => {
                if(category.id != option.categoryId) return;
                return (
                  <Draggable
                    key={option.id}
                    draggableId={option.id.toString()}
                    index={index}
                  >
                    {(provided) => <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} key={option.id}><p className="w-full p-2 border border-slate-200 rounded-md">{option.value}</p></div>}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>))
            
        }
        </div>
      </DragDropContext>
    </div>
  );
}

export default CategoryPreview;
