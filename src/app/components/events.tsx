"use client"
import { getEvents, getEventById } from "@/lib/data"
import { Events } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation"
import path from "path";

interface Props {
  eventId: string;
}

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
                </div>
            ))}
        </>
    );
}

export function EventDetail() {
    const [event, setEvent] = useState<Events | null>(null);
    const pathname = usePathname();
    const eventId = pathname?.split("/").pop();

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
    }, [eventId]);

    if (!event) {
        return <div>Loading Event...</div>;
    }

    return (
        <div>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>Start Date: {formatDate(event.startDate)}</p>
            <p>End Date: {formatDate(event.endDate)}</p>
        </div>
    );
}