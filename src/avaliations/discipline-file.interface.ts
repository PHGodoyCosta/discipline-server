interface DcpMessage {
    text: string
    caption?: string
}

interface DcpImage {
    source: string
    caption?: string
}

interface DcpTip {
    order: number
    text: string
}

interface DcpQuestionOption {
    order: number
    text?: number | string
    value: number | string
    image?: DcpImage
}

interface DcpItemHeader {
    order: number
    title?: string
    message?: DcpMessage
    image?: DcpImage
}

interface DcpSectionItem {
    _comment?: string
    order: number
    hash: string
    type: 'question' | 'group'
    header: DcpItemHeader[]
}

interface DcpQuestion extends DcpSectionItem {
    questionType: 'radio' | 'checkbox'
    options: DcpQuestionOption[]
    correctAnswer: string
    tips?: DcpTip[]
}

interface DcpQuestionGroup extends DcpSectionItem {
    questions: DcpQuestion[]
}

interface DcpSection {
    title?: string
    items: (DcpQuestionGroup | DcpQuestion)[]
}

interface QuestionAnswer {
    questionHash: string,
    value: number | string
}

interface DisciplineFileData {
    hash: string,
    title: string,
    description?: string
    created_at: string
    updated_at: string
    sections: DcpSection[]
    answers?: QuestionAnswer[]
};