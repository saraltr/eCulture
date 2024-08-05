"use client"
import { getPosts, addNewPost, getMostLiked } from "@/lib/data"
import { Posts } from "@/lib/definitions";
import React, { useState, useEffect, FormEvent } from 'react';
import LikeButton from "./likeButton";
import Pagination from "./pagination";

export function PostList() {
    const [posts, setPosts] = useState<Posts[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;

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
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    if (!posts) {
        return <div>Loading Posts...</div>;
    }

    return (
      <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Recent Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentPosts.length > 0 ? (
          currentPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img loading="lazy" src={post.image} alt={post.description} className="w-full h-40 object-cover object-center" />
              <div className="p-4">

                <div className="flex items-center">

                 <LikeButton 
                    postId={post.id} 
                    initialLikes={post.likes ?? 0}
                    isLiked={false} 
                /> 
                </div>
                
                <p className="text-primary text-lg font-semibold mb-2">{post.description}</p>
                <p className="text-accent">Posted by: {post.name}</p>

                <p className="text-gray-400 font-light text-xs my-2">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })}
                </p>
                
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-800">No recent posts found</p>
        )}
      </div>

        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        />

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
    }, []);

    if (!posts) {
        return <div>Loading Posts...</div>;
    }

    return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img loading="lazy" src={post.image} alt={`Post ${post.id} by ${post.name}`} className="w-full h-40 object-cover object-center" />
              <div className="p-4">
                <div className="flex items-center">

                 <LikeButton 
                    postId={post.id} 
                    initialLikes={post.likes ?? 0}
                    isLiked={false} 
                /> 
                </div>
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
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const likes = 0;
    const [message, setMessage] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
      }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      if (!file || !description) {
        setMessage("Please fill out all fields");
        return;
      }

      const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        formData.append('username', username);
        
        // console.log(formData);

        try {
            const response = await fetch("/api/posts", {
              method: "POST",
              body: formData
            })

            if (response.ok) {
              setMessage("Post created successfully")
              setFile(null);
              setDescription("");
            } else {
              setMessage("Error creating post. Try again later.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Error creating post. Try again later.");
        }
        
    }

    return (
      <>

        <div className="collapse collapse-arrow bg-secondary">
              <input type="checkbox" />
              <div className="collapse-title text-neutral"><h3>Create a New Post</h3></div>
              <div className="collapse-content">
                  <div className="bg-neutral rounded-md">
                    <form className="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="postFile">Image:</label>
                        <input
                        type="file"
                        id="postFile"
                        onChange={handleFileChange}
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
                    <div className="">
                      {message && <p>{message}</p>}
                    </div>
                    </form>
                  </div>
              </div>
        </div>
    </>
    );
};