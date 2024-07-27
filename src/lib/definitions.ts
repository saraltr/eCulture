export type Events = {
    id: number
    name: string
    description: string
    startDate: string
    endDate: string
    image: string
    content: string
    likes:  number
    location: string
    category: string[]
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
  name: string
  likes?: number
}

export type Post = {
  image: string;
  description: string;
  username: string
}

export type Registration = {
  eventId: number;
  participant: string;
}

export type Profile = {
  username: string;
  comments: Comment[];
  posts:  Posts[];
  registrations: Registration[];
}

export type Event = {
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  image: string;
  category: string[]
  likes: number | null;
}