import { DateTime } from "next-auth/providers/kakao"

export type Events = {
    id: string
    name: string
    description: string
    startDate: DateTime
    endDate: DateTime
    image: string
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
    image: string
    description: string
    date: string
    likes: number
}

export type Article = {
    id: string
    image: string
    headline: string
    content: string
    date: string
    likes: number
}