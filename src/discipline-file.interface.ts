export enum DcpSectionItemType {
    QUESTION = "question",
    GROUP = "group",
}

export enum DcpQuestionType {
    CHECKBOX = "checkbox",
    RADIO = "radio",
}

export interface DcpQStatement {
    statement: string
}

export interface DcpQText {
    title?: string
    text: string
    caption?: string
}

export interface DcpQImage {
    title?: string
    image_source: string
    caption?: string
}

export interface DcpTip {
    order?: number
    text: string
}

export interface DcpQOption {
    order?: number
    hash: string
    text?: number | string
    value?: number | string
    image?: DcpQImage
}

interface DcpSectionItem {
    _comment?: string
    order?: number
    hash: string
    type: DcpSectionItemType.QUESTION | DcpSectionItemType.GROUP
    header: (DcpQStatement | DcpQText | DcpQImage)[]
}

export interface DcpQuestion extends DcpSectionItem {
    question_type: DcpQuestionType
    options: DcpQOption[]
    correct_answer: string
    tips?: DcpTip[]
}

export interface DcpQGroup extends DcpSectionItem {
    questions: DcpQuestion[]
}

export interface DcpSection {
    title?: string
    items: (DcpQGroup | DcpQuestion)[]
}

export interface DcpQAnswer {
    q_hash: string,
    answer: string
}

export interface DisciplineFileData {
    hash: string,
    title: string,
    description?: string
    created_at: string
    updated_at: string
    sections: DcpSection[]
    answers?: DcpQAnswer[]
};