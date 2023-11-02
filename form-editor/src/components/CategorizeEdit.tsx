import React from "react";
import QuestionSelector from "./QuestionSelector";
import { Input } from "./ui/input";
import { GripVerticalIcon, Image, Plus, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { CategorizeType } from "@/types/Question";
import BelongingCategorize from "./BelongingCategorize";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function CategorizeEdit({
  question,
  resetQuestion,
  updateQuestion,
}: {
  resetQuestion: (questionId: number, defaultValue: any) => void;
  question: CategorizeType;
  updateQuestion: (questionId: number, updateAttribute: any) => void;
}) {
  const inputImgRef = React.useRef<HTMLInputElement>(null);
 
  return (
    <div className="w-full bg-white p-5 rounded-md gap-2 space-y-3">
      <div className="flex w-full">
        <div className="flex-1 space-y-2">
          <Input
            value={question?.title}
            onChange={(e) =>
              updateQuestion(question.id, { title: e.target.value as string })
            }
            type="text"
            placeholder="Question Title"
            className="w-full"
          />
          <div className="w-full space-y-1">
            <div className="flex items-center gap-1">
              <p>Categories</p>
              <Button
                variant="ghost"
                className="p-2 rounded-full h-8 w-8"
                onClick={() => {
                  updateQuestion(question.id, {
                    categories: [
                      ...question.categories,
                      {
                        id: question.categoryLastId + 1,
                        value: "",
                      },
                    ],
                    categoryLastId: question.categoryLastId + 1,
                  });
                }}
              >
                <Plus size="18" strokeWidth={2} />
              </Button>
            </div>
            <DragDropContext
              onDragEnd={(result) => {
                // console.log(result, "result");
                if (!result.destination) return;
                if (result.source.droppableId != "category") return;
                const items = Array.from(question.categories);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);
                updateQuestion(question.id, { categories: items });
              }}
            >
              <Droppable droppableId="category">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    className=" space-y-2"
                    ref={provided.innerRef}
                  >
                    {question.categories.map((category, index) => {
                      return (
                        <Draggable
                          key={category.id}
                          draggableId={category.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="flex items-center"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <div
                                {...provided.dragHandleProps}
                                className="h-[18px] "
                              >
                                <GripVerticalIcon size="18px" />
                              </div>
                              <Input
                                value={category.value}
                                onChange={(e) => {
                                  const updateCategories = [
                                    ...question.categories,
                                  ];
                                  updateCategories[index] = {
                                    id: category.id,
                                    value: e.target.value as string,
                                  };
                                  updateQuestion(question.id, {
                                    categories: updateCategories,
                                  });
                                }}
                                type="text"
                                placeholder={"Category " + (index + 1)}
                                className="w-full"
                              />
                              {question.categories.length > 2 && (
                                <Button
                                  variant={"ghost"}
                                  onClick={() => {
                                    const updateCategories = [
                                      ...question.categories,
                                    ];
                                    updateCategories.splice(index, 1);
                                    updateQuestion(question.id, {
                                      categories: updateCategories,
                                    });
                                  }}
                                >
                                  <XIcon size="18px" strokeWidth={2} />
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
          <div className=" space-y-1 gap-10">
            <div className="flex gap-3 mb-2">
              <div className="w-[160px]">
                Items{" "}
                <Button
                  variant="ghost"
                  className="p-2 rounded-full h-8 w-8"
                  onClick={() => {
                    updateQuestion(question.id, {
                      options: [
                        ...question.options,
                        {
                          id: question.optionLastId + 1,
                          value: "",
                        },
                      ],
                      optionLastId: question.optionLastId + 1,
                    });
                  }}
                >
                  <Plus size="18" strokeWidth={2} />
                </Button>{" "}
              </div>
              <p className="w-[160px]">Belongs To</p>
            </div>
            <DragDropContext
              onDragEnd={(result) => {
                if (result.source.droppableId != "options") return;
                if (!result.destination) return;
                const items = Array.from(question.options);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);
                updateQuestion(question.id, { options: items });
              }}
            >
              <Droppable droppableId="options">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    className=" space-y-2"
                    ref={provided.innerRef}
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
                              className="flex gap-3 items-center"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <div className="flex items-center">
                                <div
                                  {...provided.dragHandleProps}
                                  className="h-full "
                                >
                                  <GripVerticalIcon size="18px" />
                                </div>
                                <Input
                                  type="text"
                                  value={option.value}
                                  onChange={(e) => {
                                    const updateOptions = [...question.options];
                                    updateOptions[index] = {
                                      id: option.id,
                                      value: e.target.value as string,
                                      categoryId: option.categoryId,
                                    };
                                    updateQuestion(question.id, {
                                      options: updateOptions,
                                    });
                                  }}
                                  placeholder={"Item " + (index + 1)}
                                  className="w-[120px]"
                                />
                              </div>

                              {question.options.length >
                                question.categories.length && (
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
                                  <XIcon size="18px" strokeWidth={2} />
                                </Button>
                              )}

                              <BelongingCategorize
                                index={index}
                                categoryId={option.categoryId}
                                questionId={question.id}
                                options={question.options}
                                updateQuestion={updateQuestion}
                                categories={question.categories}
                              />
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
              if (!event.target.files || event.target.files.length == 0) return;
              const file = event.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  updateQuestion(question.id, { image: reader.result });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <Button
            variant="ghost"
            onClick={() => {
              inputImgRef?.current?.click();
            }}
          >
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
          {question.image && <img src={question.image} />}
        </div>
      </div>
    </div>
  );
}

export default CategorizeEdit;
