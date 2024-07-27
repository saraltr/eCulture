"use client"
import { getProfile, getEventById, deleteRegistration, updateLikes } from "@/lib/data";
import { Profile, Events } from "@/lib/definitions";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const UserProfile: React.FC<{ username: string }> = ({ username }) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [liked, setLiked] = useState<{ [key: number]: boolean }>({});
    

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
                setError("Internal error. Try again later!")
                // console.error(error);
            }
        };

        fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);


    const handleLikes = async (postId: number | undefined, currentLikes: number | undefined) => {

        if (postId === undefined || currentLikes === undefined) {
        console.error("ID not valid");
        return;
        }

        const action = !liked[postId];

        const result = await updateLikes(postId, action);

        if (result.error) {
        console.error(result.error);
    } else {
        // console.log(result.likes);
        setLiked((prevLikedPosts => ({
            ...prevLikedPosts,
            [postId]: action
        })));
    }

    }

    if (!profile) {
        return <h3>Loading Profile Info...</h3>;
    }

    const sortedPosts = profile.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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

                <div className="my-4">
                    <h3 className="bg-secondary text-neutral p-2 rounded-md">Your Posts</h3>
                    <div className="my-2 grid grid-cols-2 md:grid-cols-3 gap-1">
                        {profile && sortedPosts.map((post, index) => (
                            <div key={index} className="relative overflow-hidden rounded-md bg-gray-50">
                                <div className="w-full h-56 relative">
                                    <Image
                                        src={post.image}
                                        alt={`${post.id}'s post image`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-t-md" 
                                    />
                                </div>
                                <div className="p-2 rounded-b-md">
                                    <div className="flex items-center">

                                        <button type="button" className="btn flex  btn-outline text-white bg-gradient-to-r from-red-700 to-red-900 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:gray-50 rounded-lg text-center px-2 py-2"
                                        onClick={() => handleLikes(post.id, post.likes)}> {liked[post.id] ? 'Unlike' : 'Like'}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            
                                        </button>
                                        <p className="ml-2">{post.likes} Likes</p>
                                    </div>
                                    <p className="mt-2">
                                        <span className="font-bold">@{username}:</span> <span className="text-accent">{post.description}</span>
                                    </p>
                                    <p className="text-gray-400 font-light text-xs my-2">{new Date(post.createdAt).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'numeric', 
                                        day: 'numeric', 
                                        hour: 'numeric',
                                        minute: 'numeric'
                                        })}
                                    </p>
                                </div>
                                
                                
                            </div>
                        ))}
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-secondary">
                    <input type="checkbox" />
                    <div className="collapse-title text-neutral"><h3>Comments</h3></div>
                    <div className="collapse-content">
                        <div className="bg-neutral rounded-md">
                        {profile && profile.comments.map((comment, index) => (
                        <div key={index} className="border-b-2 border-accent">
                            <p className="mt-2">
                                <span className="font-bold mr-1">
                                    @{comment.username}:  
                                </span>
                                <span className="text-accent">
                                    {comment.content}
                                </span>
                            </p>
                            {/* <p>Event ID: {comment.eventId}</p> */}
                        </div>
                    ))}
                    </div>
                    </div>
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
        setupdated(true);
    };  

    useEffect(()=> {
        const fetchEvent = async () => {
            try {
                const eventData = await getEventById(eventId);
                setEvent(eventData);

                if(updated){
                    const response = await deleteRegistration(eventId, username);
                    //console.log(response);
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
        return <div className="skeleton w-42 h-42 bg-secondary m-2"></div>;
    }

    return (
        <>
        
        <div className="rounded-3xl h-[200px] w-3/4 md:w-1/4 bg-secondary shadow-xl m-2 relative">
            <Link href={`/discover/${eventId}`}>
            <h4 className=" text-neutral absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-1 z-20 text-center rounded-3xl">{event.name}</h4>
            </Link>
            <Image
            src={event.image}
            alt={`${event.name} event image`}
            fill={true}
            style={{ objectFit: 'cover'}}
            className="rounded-3xl"
            ></Image>

            <button onClick={openModal} className="btn absolute right-0 bg-primary hover:bg-secondary text-white w-fit z-20">X</button>

            {isOpen && (
            <div className="fixed z-30 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white max-w-xs rounded-lg p-3 border-2">
                    <h2 className="text-lg font-semibold mb-4">Unregister from {event.name}</h2>
                    <p>Are you sure you want to unregister from the event?</p>
                    <div className="flex justify-end gap-2">
                        <button className=" btn my-2 bg-accent text-neutral p-2 rounded-md hover:bg-blue-700" onClick={closeModal}>Keep Registration</button>
                        <button className="btn my-2 self-end bg-primary hover:bg-secondary text-neutral p-2 rounded-md" onClick={confirm}>Confirm</button>
                    </div>
                </div>
                </div>
            </div>
            )}
        </div>
        </>
    );
};

export default UserProfile