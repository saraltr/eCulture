"use client"
import { getPosts, addNewPost, getMostLiked } from "@/lib/data"
import { Posts } from "@/lib/definitions";
import React, { useState, useEffect, FormEvent } from 'react';
import Image from "next/image";

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
      <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Recent Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img loading="lazy" src={post.image} alt={post.description} className="w-full h-40 object-cover object-center" />
              <div className="p-4">
                <p className="text-primary text-lg font-semibold mb-2">{post.description}</p>
                <p className="text-accent">Posted by: {post.name}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-800">No recent posts found</p>
        )}
      </div>
    </div>

    );
}

export function MostLiked() {
    const [posts, setPosts] = useState<Posts[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await getMostLiked();
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img loading="lazy" src={post.image} alt={post.description} className="w-full h-40 object-cover object-center" />
              <div className="p-4">
                <p className="text-primary text-lg font-semibold mb-2">{post.description}</p>
                <p className="text-accent">Posted by: {post.name}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-800">No recent posts found</p>
        )}
      </div>
    </div>

    );
}

interface NewPostFormProps {
    username: string;
}

export const NewPostForm: React.FC<NewPostFormProps> = ({ username }) => {
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        const postData = { image, description, username };
        // console.log(postData);

        try {
            const response = await addNewPost(postData);
            setMessage("Post created!")

        } catch (error) {
            setMessage("Error registering for the event. Try again later.");
        }

        setImage("");
        setDescription("");
        
    }

    return (
        <>
        <h3 className="bg-secondary m-4 text-neutral p-2 rounded-md">Create a New Post</h3>
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
        <div className="flex justify-center">
          <button className="btn my-2 bg-primary hover:bg-secondary text-white w-fit" type="submit">Submit</button>
        </div>
        
        </form>
        </>
    );
};