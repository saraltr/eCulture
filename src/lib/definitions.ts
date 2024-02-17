export type Events = {
    id: number
    name: string
    description: string
    startDate: string
    endDate: string
    image: string
    content: string
    likes:  number
    category: []
    comments: Comments[];
    registrations: Registration[];
}

export type Comments = {
    id: number;
    content: string;
    eventId: number;
    username: string;
    createdAt: string;
}

export type Comment = {
    content: string;
    username: string;
}

export type Users = {
    id: string
    name: string
    description: string
    startDate: string
    endDate: string
    image: string
}

export type Posts = {
  id: number;
  image: string;
  description: string;
  createdAt: Date;
  user: Users;
  userId: number;
}

export type Registration = {
  eventId: number;
  participant: string;
}