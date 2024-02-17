import axios from "axios";
import { Events, Posts, Comments, Comment, Registration } from "./definitions";
import { unstable_noStore as noStore } from 'next/cache';

type ApiResponse<T> = T | { error: string };

// get events

export async function getEvents(): Promise<Events[]> {
    try {
        const response = await axios.get<Events[]>("/api/events");
        return response.data;        
    } catch (err) {
        console.log(err);
        return [];
    }
}


export async function getEventById(eventId: number): Promise<Events | null> {
    noStore();
    try {
        const response = await axios.get<Events>(`/api/events?singleId=${eventId}`);
        return response.data;        
    } catch (err) {
        console.log(err);
        return null;
    }
}

// put req for individual event
export async function addNewComment(eventId: number, commentData: Comment): Promise<ApiResponse<Comments>> {
    noStore();
    try {
        const response = await axios.post(`/api/events?eventId=${eventId}`, { commentData });
        return response.data;
    } catch (err) {
        return { error: `Error adding comment: ${err}. Please try again later.` };
    }
}

// creates registration
export async function registerForEvent(eventId: number, registerStatus: Registration): Promise<ApiResponse<Registration>> {
    noStore();
    try {
        const response = await axios.post(`/api/events?eventId=${eventId}`, { registerStatus });
        return response.data;
    } catch (err) {
        return { error: `Error adding comment: ${err}. Please try again later.` };
    }
}

export async function getPosts(): Promise<Posts[]> {
    try {
        const response = await axios.get<Posts[]>("/api/posts");
        return response.data;        
    } catch (err) {
        console.log(err);
        return [];
    }
}


export async function createEvent() {
    try {
        const response = await axios.post(`/api/events}`);
        return response.data;        
    } catch (err) {
        console.log(err);
    }
}