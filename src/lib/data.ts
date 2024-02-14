import axios from "axios";
import { Events, Posts, Comments } from "./definitions";
import { unstable_noStore as noStore } from 'next/cache';

type ApiResponse<T> = T | { error: string };

export async function getEvents(): Promise<Events[]> {
    try {
        const response = await axios.get<Events[]>("/api/events");
        return response.data;        
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getCommentsForEvent(eventId: string): Promise<Comments[]> {
  try {
    // Example of fetching comments from an API endpoint
    const response = await fetch(`/api/comments?eventId=${eventId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await response.json();
    return data.comments; 
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

export default getCommentsForEvent;

export async function getEventById(eventId: string): Promise<Events | null> {
    noStore();
    try {
        const response = await axios.get<Events>(`/api/events?id=${eventId}`);
        return response.data;        
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function addNewComment(eventId: string, commentData: Comments): Promise<ApiResponse<Comments>> {
    noStore();
    try {
        const response = await axios.put(`/api/events?eventId=${eventId}`, { commentData });
        return response.data;
    } catch (err) {
        return { error: `Error adding comment: ${err}. Please try again later.` };
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

export async function getProfile(id: string) {
    try {
        const response = await axios.get(`/api/events/${id}`);
        return response;        
    } catch (err) {
        console.log(err);
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