export interface User {
    id: string
    userName: string
    email: string
    password: string
}

export interface Team {
    createdBy: string
    createdByEmail: string
    id: string
    members: Member[]
    teamName: string
    timestamp: string
}

export interface Member {
    id: string
    age: number
    comments: Comment[]
    customAnswers: CustomAnswer[]
    customQuestion: string
    hobbies: string
    linkedIn: string
    name: string
    place: string
    question1: string
    question2: string
}

export interface Comment {
    id: string
    comment: string
    name: string
}

export interface CustomAnswer {
    id: string
    answer: string
    email: string
    name: string
}
