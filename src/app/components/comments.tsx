"use client"

import { useSession } from "next-auth/react"
import React, { useState, FormEvent } from 'react';
import { Comment } from "@/lib/definitions";
import { addNewComment } from '@/lib/data';

interface CommentProps {
  eventId: number;
}

const CommentForm: React.FC<CommentProps> = ({ eventId }) => {
  const { data: session } = useSession()
  const sessionUsername = session?.user?.name || "anonymous";
  const [comment, setComment] = useState("");
  const [username] = useState(sessionUsername);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentData: Comment = { content: comment, username: username };
    // console.log(commentData);

    try {
      await addNewComment(eventId, commentData);
      setComment("");
      // console.log("Comment submitted!");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-neutral space-y-4 m-4 p-3">
        <label htmlFor="comment" className="block">Comment*:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Add a public comment..."
          className="mt-1 border-red-50 bg-white  focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        <div className="flex justify-center">
          <button className="btn bg-secondary hover:bg-primary text-white py-2 px-4 rounded-md" type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;