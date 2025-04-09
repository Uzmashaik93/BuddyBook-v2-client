export interface User {
    id: string
    username: string
    email: string
    password: string
}

export interface Team {
    createdBy: User
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
    invites: TeamInvite[]
    imageUrl: string
    userId: string
}

enum InviteStatus {
    PENDING,
    ACCEPTED,
    DECLINED
}

export interface TeamInvite {
    id: string
    teamId: string
    invitedUserEmail: string
    status: InviteStatus
    team: Team
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


export interface Feature {
    icon: string;
    title: string;
    description: string;
}

export interface Step {
    number: number;
    title: string;
    description: string;
}