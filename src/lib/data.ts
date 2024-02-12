import axios from "axios";
import { Events } from "./definitions";
import { unstable_noStore as noStore } from 'next/cache';

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


export async function createEvent() {
    noStore();
    try {
        const response = await axios.post(`/api/events}`);
        return response.data;        
    } catch (err) {
        console.log(err);
    }
}

export async function getProfile(id: string) {
    noStore();
    try {
        const response = await axios.get(`/api/events/${id}`);
        return response;        
    } catch (err) {
        console.log(err);
    }
}