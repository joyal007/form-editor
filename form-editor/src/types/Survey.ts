import { CategorizeType, ClozeType, ComprehensiveType } from "./Question";

export type FormType = {
    id: string,
    title: string,
    questionLastId: number,
    description?: string,
    image?: string,
    questions: (CategorizeType | ComprehensiveType | ClozeType )[],
}