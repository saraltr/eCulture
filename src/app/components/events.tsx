"use client"
import { getEvents, getEventById } from "@/lib/data"
import { Events } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation"
import CommentForm from "./comments";

export function EventsList() {
    const [events, setEvents] = useState<Events[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await getEvents();
                setEvents(eventsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvents();
    }, []);

    if (!events) {
        return <div>Loading Events...</div>;
    }

    return (
        <>
            {events.map(event => (
                <div key={event.id}>
                    <Link 
                    href={`/discover/${event.id}`}
                    >
                        <h3>{event.name}</h3>
                        <p>{event.description}</p>
                    </Link>
                    <p>Start Date: {formatDate(event.startDate)}</p>
                    <p>End Date: {formatDate(event.endDate)}</p>
                    <p>{event.content}</p>
                </div>
            ))}
        </>
    );
}

export function EventDetail() {
    const [event, setEvent] = useState<Events | null>(null);
    const pathname = usePathname();
    const eventId = pathname?.split("/").pop() ?? ""

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await getEventById(eventId as string);
                setEvent(eventData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvent();
    }, [eventId, event]);

    if (!event) {
        return <div>Loading Event...</div>;
    }

    return (
        <div>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>Start Date: {formatDate(event.startDate)}</p>
            <p>End Date: {formatDate(event.endDate)}</p>
            <p>{event.content}</p>
            <div>
                <h2>Comments</h2>
                {event.comments.map((comment, index) => (
                <div key={index}>
                <p>Username: {comment.username}</p>
                <p>Rating: {comment.rating}</p>
                <p>{comment.comment}</p>
                </div>
                ))}
            </div>
            <div>
                <CommentForm eventId={eventId}></CommentForm>
            </div>
        </div>
    );
}