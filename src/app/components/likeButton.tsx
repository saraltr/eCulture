import React, { useState, useEffect } from 'react';
import { updateLikes } from '@/lib/data';

interface LikeButtonProps {
  postId: number;
  initialLikes: number;
  isLiked: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, initialLikes, isLiked }) => {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(initialLikes);

  const handleLikeClick = async () => {
    const action = !liked;
    const result = await updateLikes(postId, action);
    if (!result.error) {
      setLiked(action);
      setLikes(action ? likes + 1 : likes - 1);
    } else {
      console.error(result.error);
    }
  };

  return (
    <>

        <button
      type="button"
      className="btn flex btn-outline text-white bg-gradient-to-r from-red-700 to-red-900 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:gray-50 rounded-lg text-center px-2 py-2"
      onClick={handleLikeClick}
    >
      {liked ? 'Unlike' : 'Like'}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
    <p className="ml-2">{likes} Likes</p>
    </>
  );
};

export default LikeButton;
