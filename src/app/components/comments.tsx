"use client"

import React, { useState, useEffect, FormEvent } from 'react';
import { Comments } from "@/lib/definitions";
import { addNewComment } from '@/lib/data';

interface CommentsProps {
  eventId: string;
}

const CommentForm: React.FC<CommentsProps> = ({ eventId }) => {
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentData: Comments = { username, rating, comment };
    console.log(commentData);

    try {
      await addNewComment(eventId, commentData);
      setUsername('');
      setRating(0);
      setComment('');
      console.log('Comment submitted!');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Add your Comment</h3>
      <form onSubmit={handleSubmit} className="bg-neutral space-y-4 m-4 p-3">
        <label htmlFor="username" className="block">Username*:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 border-red-50 bg-white focus:ring-primary focus:border-primary block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        <label htmlFor="rating" className="block">Rating out of 5*:</label>
        <input
          type="number"
          id="rating"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          required
          className="mt-1 border-red-50 bg-white  focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        <label htmlFor="comment" className="block">Review*:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="mt-1 border-red-50 bg-white  focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        <div className="flex justify-center">
          <button className="btn m-0 bg-secondary px-15 text-white hover:bg-primary transform hover:scale-110" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;