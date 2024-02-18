"use client"
import { getProfile, getEventById } from "@/lib/data";
import { Profile, Events } from "@/lib/definitions";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const UserProfile: React.FC<{username: string}> = ({username}) => {

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
                setError('An error occurred while fetching the profile.');
            }  
        };

        fetchProfile();

    },[username])

    if (!profile) {
        return <h3>Loading Profile Info...</h3>;
    }


    return (
        <>
            <div className="">
                <h3>Your Registered Events</h3>
                <div className="flex overflow-x-scroll overflow-y-hidden ">
                    {profile.registrations.map((events, index) => (
                    <RegisteredEvent key={index} eventId={events.eventId} />
                    ))}
                </div>
                
            </div>
            

            <div className="">
                <h3>Your Comments</h3>
                {profile.comments.map((comment, index) => (
                <p key={index}>{comment.username} {comment.content}</p>
            ))}
            </div>
                
        </>
    )
}

interface EventDetailProps {
    eventId: number;
}

const RegisteredEvent = ({ eventId }: EventDetailProps) => {
    const [event, setEvent] = useState<Events | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await getEventById(eventId);
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
        <>
        <Link href={`/discover/${eventId}`}>
        <div className="card h-[200px] w-[300px] w-96 bg-secondary shadow-xl image-full m-2 overflow-hidden">
            <h4 className="text-neutral m-1 z-10 text-center">{event.name}</h4>
            <Image
            src={event.image}
            alt={`${event.name} event image`}
            fill
            style={{ objectFit: 'cover'}}
            ></Image>
        </div>
        </Link>
        </>
    );
};

export default UserProfile