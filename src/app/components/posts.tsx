"use client"
import { getPosts } from "@/lib/data"
import { Posts } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";
import React, { useState, useEffect, FormEvent } from 'react';

export function PostList() {
    const [posts, setPosts] = useState<Posts[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await getPosts();
                setPosts(eventsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvents();
    }, [posts]);

    if (!posts) {
        return <div>Loading Posts...</div>;
    }

    return (
        <>
            {posts.map(post => (
                <div key={post.id}>
                    <p>{post.description}</p>
                </div>
            ))}
        </>
    );
}

interface NewPostFormProps {
    userId: string;
}

export const NewPostForm: React.FC<NewPostFormProps> = ({ userId }) => {
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        const now = new Date();
        const datetime = now.toLocaleString();
        const date = datetime;
        const postData = { userId, image, description, date };
        console.log(postData);
        setImage("");
        setDescription("");
        
    }

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="image">Image URL:</label>
            <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            />
        </div>
        <div>
            <label htmlFor="description">Description:</label>
            <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            ></textarea>
        </div>
        <button type="submit">Submit</button>
        </form>
    );
};