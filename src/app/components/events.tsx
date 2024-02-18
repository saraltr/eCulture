"use client"
// data functions
import { getEvents, getEventById, registerForEvent } from "@/lib/data"
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
// data defs types
import { Events, Registration } from "@/lib/definitions";
import { formatDate, monthDay } from "@/lib/utils";
import { usePathname } from "next/navigation"
import CommentForm from "./comments";
import Image from "next/image";
import Link from "next/link";
// icons
import { CalendarDaysIcon, ArrowLeftCircleIcon, MapPinIcon } from "@heroicons/react/24/solid";


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
        <section className="grid">
            <div className="max-w-sm flex flex-col justify-self-center shadow-xl m-5">

                {events.map(event => (
                    
                <div key={event.id}>
                    <Link 
                    href={`/discover/${event.id}`}
                    >
                        <Image
                        src={event.image}
                        alt={`${event.name} image`}
                        width={100}
                        height={100}
                        layout="responsive"
                        priority
                        ></Image>
                        <div className="p-3">
                            <h3 className="card-title">{event.name}</h3>
                            <p>{event.description}</p>
                        </div>
                    </Link>
                    <div className="p-3">
                        {event.category.map((category, index) => ( <span key={index} className="badge badge-primary mr-1 badge-lg text-neutral bg-accent">{category}</span>
                            ))}
                        <p>Start Date: {monthDay(event.startDate)}</p>
                    </div>

                </div>
                ))}
            </div>
        </section>
    );
}

// single event 
export function EventDetail() {
    const [event, setEvent] = useState<Events | null>(null);
    // gets event Id using path
    const pathname = usePathname();
    const eventString = pathname?.split("/").pop() ?? ""
    const eventId = parseInt(eventString);

    const goBack = () => {
        window.history.back();
    };

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // sets eventId
                const eventData = await getEventById(eventId);
                setEvent(eventData);
                

            } catch (error) {
                console.error(error);
            }
        };

        fetchEvent();
    }, [event, eventId]);

    if (!event) {
        return <div>Loading Event...</div>;
    }
    return (
        <>
        <section className="">

            {/* image container */}
            <div className="relative w-full h-80 sm:h-100 bg-black bg-opacity-70 rounded-b-2xl">
                <button onClick={goBack} className="absolute top-0 left-0 m-2 cursor-pointer text-neutral text-opacity-90 w-15 h-11 z-10" aria-label="Go back">
                <ArrowLeftCircleIcon className="w-full h-full" />
                <span className="sr-only">Go back</span>
                </button>
                <div className="absolute bottom-0 left-0 w-full text-white p-4 flex justify-center items-center">
                <h1 className="text-4xl text-center bg-black p-4 bg-opacity-40 font-bold rounded-lg z-10 sm:text-6xl">{event.name}</h1>
                </div>
                <Image
                src={event.image}
                alt={`${event.name} image`}
                layout="fill"
                priority
                objectFit="cover"
                className="rounded-b-2xl overflow-hidden"
                />
            </div>

                {/* categories */}
                <div className=" m-4 flex flex-wrap justify-center">
                    {event.category.map((category, index) => (
                        <p key={index} className="mr-2 badge badge-primary badge-lg text-neutral bg-accent">{category}</p>
                    ))}
                </div>

                {/* date and location */}
                <div className="m-4">
                    <div className="flex my-2">
                        <CalendarDaysIcon className="w-10 mx-1 self-center" />
                        <div>
                            <p><strong>From: </strong>{formatDate(event.startDate)}</p>
                            <p><strong>Until: </strong>{formatDate(event.endDate)}</p>
                        </div>
                        
                    </div>
                </div>
                <div className="m-4">
                    <div className="flex items-center my-2">
                        <MapPinIcon className="w-10 mx-1" />
                        <div>
                            <p><strong>Location: </strong>{event.location}</p>
                        </div>
                        
                    </div>
                </div>
                
                {/* description */}
                <div className="mx-6 my-7">
                    <h2>About this event</h2>
                    <p>{event.description}</p>
                    <h2 className="mt-5">Interested in participing?</h2>
                    <p>Register now!</p>
                    <RegistrationBox eventId={eventId} />
                </div>
            </section>

            
            <section className="md:grid md:grid-cols-2 gap-4">
                {/* first column */}
                <div className="md:col-span-1">
                    {/* comments */}
                    <div className="m-4 text-neutral">
                    {event.comments && event.comments.length > 0 ? (
                        <div>
                        <h3 className="font-semibold mb-2 bg-accent p-2 rounded-md">Comments ( {event.comments.length} )</h3>
                        <div className="bg-neutral text-primary p-2">
                            {event.comments.map(comment => (
                            <div key={comment.id} className="mb-4">
                                <h4 className="font-semibold">{comment.username}</h4>
                                <p className="text-accent">{comment.createdAt}</p>
                                <p className="border-b-2 border-accent">{comment.content}</p>
                            </div>
                            ))}
                        </div>
                        </div>
                    ) : (
                        <h3 className="font-semibold mb-2 bg-accent p-2 rounded-md">No comments available.</h3>
                    )}
                    </div>
                    <CommentForm eventId={eventId} />
                </div>

                {/* second column */}
                <div className="md:col-span-1">
                    <div className="m-4">
                    <h3 className="bg-primary text-neutral p-2 rounded-md">Recommendations</h3>
                    </div>
                </div>
            </section>

        </>       
);
}


const RegistrationBox: React.FC<{ eventId: number; }> = ({ eventId }) => {
    const { data: session, status } = useSession();
    const [isChecked, setIsChecked] = useState(false);
    const [message, setMessage] = useState<string>("");

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleRegistration = async () => {
        if (isChecked && session?.user?.name) {
            const username = session.user.name || "anonymous";

            const registerStatus: Registration = {
                eventId: eventId,
                participant: username
            };

            try {
                const response = await registerForEvent(eventId, registerStatus);

                if ("error" in response) {
                    setMessage(response.error);
                } else {
                    setMessage("Successfully registered for the event!");
                }

            } catch (error) {
                setMessage("Error registering for the event. Try again later.");
            }
        }
    };

    return (
        <div>
            {status === 'authenticated' && (
                <>
                    {message && <p>{message}</p>}
                    <label className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="mr-2 checkbox checkbox-accent"
                        required
                    />
                    <span className={`${isChecked ? ' text-green-700 font-bold' : 'text-gray-700 font-bold text-red-600'}`}>Check to register</span>
                    </label>
                    <div className="flex justify-center">
                        <button
                        onClick={handleRegistration}
                        className="btn bg-secondary hover:bg-primary text-white py-2 px-4 rounded-md"
                        >
                        Submit Registration
                        </button>
                    </div>
                    
                </>
            )}
            {status === 'unauthenticated' && <p className="font-bold text-red-500">You need to be authenticated to register.</p>}
        </div>
    );
};