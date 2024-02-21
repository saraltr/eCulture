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
import { notFound } from 'next/navigation';


// icons
import { CalendarDaysIcon, ArrowLeftCircleIcon, MapPinIcon } from "@heroicons/react/24/solid";

interface CatBtn {
    category: string;
    onClick: () => void;
}

const CategoryButton: React.FC<CatBtn> = ({ category, onClick }) => {
    return (
        <button onClick={onClick}>{category}</button>
    );
};

interface Recs {
    filter?: string; 
}

export function EventsList({filter}: Recs) {
    const [events, setEvents] = useState<Events[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Events[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchLocation, setSearchLocation] = useState<string>("");
    const [searchName, setSearchName] = useState<string>("");
    const [searchDate, setSearchDate] = useState<string>("");


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await getEvents();
                setEvents(eventsData);
                setFilteredEvents(eventsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        let filtered = events;

        // for recs
        if (filter) {
            filtered = events.filter(event => event.category.includes(filter));
        }

        if (searchName.trim() != ""){
            filtered = filtered.filter(event => event.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()));
        }

        if (searchLocation.trim() !== "") {
            filtered = filtered.filter(event => event.location.toLowerCase().includes(searchLocation.toLowerCase()));
        }

        if (searchDate.trim() !== "") {
            filtered = filtered.filter(event => event.startDate.includes(searchDate));
        }

        setFilteredEvents(filtered);
    }, [filter, events, searchName, searchLocation, searchDate]);


    const filterEvents = (category: string) => {
        setSelectedCategory(category);
        if (category === "All") {
            setFilteredEvents(events);
        } else {
            const filteredEvents = events.filter(event => event.category.includes(category));
            setFilteredEvents(filteredEvents);
        }
    };


    if (!events) {
        return <h2>Loading Events...</h2>;
    }

    return (
        <section className="p-1">
            {!filter && (
                <>
                    <h2 className="text-center my-2">Discover Upcoming Events</h2>
                    <div className="mt-2">
                        <form className="drop-shadow">
                            <label htmlFor="name">Title</label>
                            <input type="text" 
                            name="name" 
                            id="name"
                            placeholder="Event name"
                            value={searchName} 
                            onChange={e => setSearchName(e.target.value)}
                            className=" px-3 py-2 w-full"
                            />
                            <label htmlFor="location">Location</label>
                            <input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="Search by Location"
                            value={searchLocation}
                            onChange={e => setSearchLocation(e.target.value)}
                            className=" px-3 py-2 w-full"
                            />

                            <label className="Date" htmlFor="Date">Date</label>
                                <input
                                id="Date"
                                name="Date"
                                type="date"
                                placeholder="Search by Date"
                                value={searchDate}
                                onChange={e => setSearchDate(e.target.value)}
                                className="border rounded-md px-3 py-2 w-full"
                                />
                        </form>
                    
                    </div>

                    <div className=" mb-5 p-3 flex justify-center space-x-2">
                        <div className="self-center btn bg-secondary hover:bg-primary text-white py-2 px-4 rounded-md">
                        <CategoryButton category="All Events" onClick={() => filterEvents("All")} />
                    </div>
                
                    <div className="dropdown dropdown-hover">
                    <p tabIndex={0} role="button" className=" m-1 btn bg-secondary hover:bg-primary text-white py-2 px-4 rounded-md">Categories ⬇️</p>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-neutral rounded-box w-52">
                        <li><CategoryButton category="Art" onClick={() => filterEvents("Art")} /></li>
                        <li><CategoryButton category="Festival" onClick={() => filterEvents("Music")} /></li>
                        <li><CategoryButton category="Music" onClick={() => filterEvents("Music")} /></li>
                        <li><CategoryButton category="History" onClick={() => filterEvents("History")} /></li>
                        <li><CategoryButton category="Celebrations" onClick={() => filterEvents("Celebrations")} /></li>
                        <li><CategoryButton category="Community" onClick={() => filterEvents("Community")} /></li>
                        <li><CategoryButton category="Crafts" onClick={() => filterEvents("Crafts")} /></li>
                        <li><CategoryButton category="Food" onClick={() => filterEvents("Food")} /></li>
                        <li><CategoryButton category="Exhibition" onClick={() => filterEvents("Exhibition")} /></li>
                    </ul>
                    
                    </div>
                
                    </div>     
                </>
                )}

            <div className="max-w-sm m-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:max-w-none gap-2">
                {filteredEvents.map(event => (
                <div key={event.id} className="shadow-xl m-5 relative rounded-xl justify-self-center hover:scale-105 md:w-3/4 lg:w-2/3 ">
                    <Link href={`/discover/${event.id}`}>
                        <div>
                            <div className="relative h-[180px] md:h-[200px] lg:h-[300px] overflow-hidden">
                                <Image
                                src={event.image}
                                alt={`${event.name} image`}
                                fill
                                style={{ objectFit: 'cover'}}
                                className="rounded-xl"
                                />
                            </div>
                            
                            <div className="p-3">
                                <h3 className="">{event.name}</h3>
                                <p className="truncate">{event.description}</p>
                            </div>
                            <div className="p-1 absolute inset-2 bg-secondary max-h-fit max-w-fit rounded-md">
                                <p className="text-neutral"> 📅Date: {monthDay(event.startDate)}</p>
                            </div>
                            
                        </div>  
                    </Link>
                    <div className="p-3 border-t text-center">
                        {event.category.map((category, index) => (
                            <button key={index} 
                            onClick={() => filterEvents(category)}
                            title={`Filter by ${category}`}
                            className="badge badge-primary mr-1 badge-lg text-neutral bg-accent">{category}</button>
                        ))}
                        
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
    const [loading, setLoading] = useState<boolean>(true);

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
                setLoading(false);
                

            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchEvent();
    }, [event, eventId]);

     if (loading) {
        return <p>Loading...</p>;
    }

    if (!event) {
        notFound();
        return null; 
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
                fill={true}
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

            
            <section className="lg:grid lg:grid-cols-2 gap-4">
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
                    <div className="">
                        <EventsList filter={event.category[0]}></EventsList>
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