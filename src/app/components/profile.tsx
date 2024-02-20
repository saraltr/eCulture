"use client"
import { getProfile, getEventById, deleteRegistration } from "@/lib/data";
import { Profile, Events } from "@/lib/definitions";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const UserProfile: React.FC<{ username: string }> = ({ username }) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileInfo = await getProfile(username);
                if ('error' in profileInfo) {
                    setError(profileInfo.error);
                } else {
                    setProfile(profileInfo);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);

    if (!profile) {
        return <h3>Loading Profile Info...</h3>;
    }

return (
    <>
        {error && <div>Error: {error}</div>}
        {profile && (
            <div className="my-5">
                <h3 className="bg-secondary text-neutral p-2 rounded-md">Your Registered Events</h3>
                {profile.registrations && profile.registrations.length === 0 ? (
                    <p>No registered events.</p>
                ) : (
                    <div className="flex overflow-x-scroll rounded-md bg-neutral overflow-y-hidden">
                        {profile.registrations.map((events, index) => (
                            <RegisteredEvent key={index} eventId={events.eventId} username={username} />
                        ))}
                    </div>
                )}
            </div>
        )}
        <div className="">
            <h3>Your Comments</h3>
            {profile && profile.comments.map((comment, index) => (
                <p key={index}>
                    {comment.username} {comment.content}
                </p>
            ))}
        </div>
    </>
    );
}


interface EventDetailProps {
    eventId: number;
    username: string;
}

const RegisteredEvent = ({ eventId, username }: EventDetailProps) => {
    const [event, setEvent] = useState<Events | null>(null);
    const [message, setMessage] = useState<string>("");
    const [updated, setupdated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

        const openModal = () => {
        setIsOpen(true);
        };

        const confirm = () => {
            setIsOpen(false);
            updateList();
        };

        const closeModal = () => {
            setIsOpen(false);
        };

    const updateList = async () => {

        try{
            setupdated(true);

        } catch (error) {
            console.error(error);
        }
    };  

    useEffect(()=> {
        const fetchEvent = async () => {
            try {
                const eventData = await getEventById(eventId);
                setEvent(eventData);

                if(updated){
                    const response = await deleteRegistration(eventId, username);
                    console.log(response);
                    setEvent(eventData);
                    setupdated(false);
                }

            } catch (error) {
                console.error(error);
            }
        }; 
            fetchEvent();
    }, [eventId, event, updated, username]);    


    if (!event) {
        return <p>Loading Event...</p>;
    }

    return (
        <>
        
        <div className="card h-[200px] w-[300px] w-96 bg-secondary shadow-xl m-2 overflow-hidden relative">
            <Link href={`/discover/${eventId}`}>
            <h4 className="text-neutral absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-1 z-20 text-center rounded-md">{event.name}</h4>
            </Link>
            <Image
            src={event.image}
            alt={`${event.name} event image`}
            fill={true}
            style={{ objectFit: 'cover'}}
            ></Image>



            <button onClick={openModal} className="btn absolute right-0 bg-primary text-white w-fit rounded-md z-20">X</button>


            {isOpen && (
            <div className="fixed z-30 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0" onClick={closeModal}>
                    <div className="absolute inset-0 "></div>
                </div>
                <div className="bg-white max-w-xs rounded-lg p-3 border-2">
                    <h2 className="text-lg font-semibold mb-4">Unregister from {event.name}</h2>
                    <p>Are you sure you want to unregister from the event?</p>
                    <div className="flex justify-end gap-2">
                        <button className="my-2 bg-accent text-neutral p-2 rounded-md" onClick={closeModal}>Keep Registration</button>
                        <button className="my-2 self-end bg-primary text-neutral p-2 rounded-md" onClick={confirm}>Confirm</button>
                    </div>
                </div>
                </div>
            </div>
            )}
        </div>
        </>
    );
};

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
    setIsOpen(true);
    };

    const closeModal = () => {
    setIsOpen(false);
    };

    return (
    <>
        <button onClick={openModal}>Open Modal</button>
        {isOpen && (
        <div className="fixed z-30 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" onClick={closeModal}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="bg-white rounded-lg p-8">
                <h2 className="text-lg font-semibold mb-4">Modal Title</h2>
                <p>This is the content of the modal.</p>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={closeModal}>Close</button>
            </div>
            </div>
        </div>
        )}
    </>
    );
};

export default UserProfile