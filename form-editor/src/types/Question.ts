
type QuestionType = 'categorize' | 'comprehensive' | 'cloze';

type GeneralQuestion = {
    id: number,
    type: QuestionType,
    point: number,
    image: string | null,
}

type category = {
    id: number,
    value: string,
}

type categoryOption = {
    id: number,
    value: string,
    categoryId: number
}

type Categorize = {
    title?: string,
    categories: category[]
    categoryLastId: number,
    optionLastId: number,
    options: categoryOption[]
}

type ComprehensiveOption = {
    id: number,
    value: string,
}

type Comprehensive = {
    title: string,
    optionLastId: number,
    optionCorrect: number,
    options: ComprehensiveOption[],
}

type Cloze = {
    preview: string,
    optionLastId: number,
    position: clozePosition[]
    options: ComprehensiveOption[]
}


type clozePosition = {
    left: number;
    right: number;
    value: string;
}

export type CategorizeType = Categorize & GeneralQuestion;
export type ComprehensiveType = Comprehensive & GeneralQuestion;
export type ClozeType = Cloze & GeneralQuestion;