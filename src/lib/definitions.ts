import { DateTime } from "next-auth/providers/kakao"

export type Events = {
    id: string
    name: string
    description: string
    startDate: DateTime
    endDate: DateTime
    image: string
    content: string
    comments: Comments[]
}

export type Comments = {
  username: string
  rating: number
  comment: string
}

export type Profile = {
    id: string
    startDate: string
    endDate: string
    image: string
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
    id: string
    userId: string
    image: string
    description: string
    date: DateTime
    likes: number
}

export type PostData = {
    userId: string
    image: string
    description: string
    date: DateTime
};

export type Article = {
    id: string
    image: string
    headline: string
    content: string
    date: string
    likes: number
}