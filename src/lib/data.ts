import axios from "axios";
import { Events, Posts, Comments, Comment, Registration, Profile, Post, Event } from "./definitions";
import { unstable_noStore as noStore } from 'next/cache';

type ApiResponse<T> = T | { error: string };

// get events

export async function getEvents(): Promise<Events[]> {
    noStore();
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

// creates new event
export async function addNewEvent(eventData: Event):
Promise<ApiResponse<Event>>{
    noStore();
    try{
        const response = await axios.post<Event>(`/api/events`, eventData);
        return response.data;
    } catch (err) {
        console.log(err);
        return{ error: 'Failed to create new event'}
    }
}

// creates registration
export async function registerForEvent(eventId: number, registerStatus: Registration): Promise<ApiResponse<Registration>> {
    noStore();
    try {
        const response = await axios.post(`/api/events?eventId=${eventId}`, { registerStatus });
        return response.data;
    } catch (err: any) {
        if (err.response && err.response.status === 400) {
            return { error: "You are already registered for this event." };
        } else {
            return { error: `Error registering for the event: ${err}. Please try again later.` };
        }
    }
}

// get all posts
export async function getPosts(): Promise<Posts[]> {
    noStore();
    try {
        const response = await axios.get<Posts[]>("/api/posts");
        return response.data;        
    } catch (err) {
        console.log(err);
        return [];
    }
}

// most liked posts
export async function getMostLiked() {
    noStore();
    try {
        const response = await axios.get('/api/posts', {
        params: {
            mostLiked: true
        }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching most liked posts:', error);
        throw error; 
    }
};

// add new post
export async function addNewPost(postData: Post): Promise<ApiResponse<Post>> {
    noStore();
    try {
        const response = await axios.post<Post>(`/api/posts`, postData);
        return response.data;
    } catch(err) {
        console.log(err);
        return { error: 'Failed to add new post' };
    }
}


// get logged profile
export async function getProfile(username: string): Promise<ApiResponse<Profile>> {
    noStore();
    try {
        const response = await axios.get(`/api/profile?user=${username}`);
        return response.data;
    } catch (err) {
        return { error: `Error adding comment: ${err}. Please try again later.` };
    }
}

// to add likes
export async function updateLikes(postId: number, action: boolean) {
    noStore();
    try {
        const response = await axios.put("/api/posts", {postId, action });
        return response.data;
    } catch (err) {
        return { error: `Error liking the post: ${err}`}
    } 
}

// remove event registration
export async function deleteRegistration(eventId: number, username: string): Promise<Profile | null> {
    noStore();
    try {
        const response = await axios.delete<Profile>(`/api/profile?id=${eventId}`, {
            data: username
        });
        return response.data;        
    } catch (err) {
        console.log(err);
        return null;
    }
}