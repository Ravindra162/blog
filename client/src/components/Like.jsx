import React, { useState } from 'react';
import'../css/Like.css'
const Like = ({upvotes}) => {
    const [likes, setLikes] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1);
        console.log(upvotes)
    };

    return (
        <button onClick={handleLike} className="like-button">
            👍 Like {upvotes}
        </button>
    );
};

export default Like;
