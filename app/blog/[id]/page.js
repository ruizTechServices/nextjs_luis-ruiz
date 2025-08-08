//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\blog\[id]\page.js
'use client';
// import AuthButton from "../../components/main/AuthButton";
import { createClient } from "../../../lib/utils/supabase/supabaseClient";
import React from 'react';
import { useState, useEffect, useMemo, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";


export default function BlogArticle({ params }) {
    const { user } = useUser();
    const [title, setTitle] = React.useState("blogTitle");
    const [summary, setSummary] = React.useState("");
    const [body, setBody] = React.useState("");
    const [error, setError] = React.useState(null);
    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentError, setCommentError] = React.useState('');
    const [voteError, setVoteError] = useState('');
    const [upvotes, setUpvotes] = React.useState(0);
    const [downvotes, setDownvotes] = React.useState(0);
    const [upvote, setUpvote] = React.useState(false);
    const [downvote, setDownvote] = React.useState(false);

    const blog_post = {
        title: { title },
        summary: { summary },
        body: { body },
    };

    const supabase = useMemo(() => createClient(), []);

    const fetchVotes = useCallback(async () => {
        const { data: votesData, error: votesError } = await supabase
            .from('votes')
            .select('vote_type')
            .eq('post_id', params.id);
    
        if (votesError) {
            console.error("Error fetching votes:", votesError);
        } else {
            const upVoteCount = votesData.filter(vote => vote.vote_type === 'up').length;
            const downVoteCount = votesData.filter(vote => vote.vote_type === 'down').length;
            setUpvotes(upVoteCount);
            setDownvotes(downVoteCount);
        }
    }, [supabase, params.id]);
    

    useEffect(() => {
        const fetchBlogAndComments = async () => {
            const { data: postData, error: postError } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('id', params.id);
    
            const { data: commentsData, error: commentsError } = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', params.id);
    
            if (postError) {
                console.error('Error fetching post:', postError);
                setError(postError);
            } else if (commentsError) {
                console.error('Error fetching comments:', commentsError);
            } else {
                setComments(commentsData);
                if (postData.length > 0) {
                    setTitle(postData[0].title);
                    setSummary(postData[0].summary);
                    setBody(postData[0].body);
                }
            }
    
            await fetchVotes(); // Ensures votes are fetched when component mounts
        };
    
        fetchBlogAndComments();
    }, [fetchVotes, params.id, supabase]);

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        const userEmail = user?.primaryEmailAddress?.emailAddress;

        if (!user) {
            setCommentError("You are not logged in. Login to comment.");
            return;
        }
        if (!newComment.trim()) return;

        const { error } = await supabase
            .from("comments")
            .insert([
                { post_id: params.id, user_email: userEmail, content: newComment },
            ]);

        if (error) {
            console.error("Error posting comment:", error);
        } else {
            setComments([
                ...comments,
                { content: newComment, user_email: userEmail },
            ]);
            setNewComment("");
        }
    };

    const handleVote = async (type) => {
        const userEmail = user?.primaryEmailAddress?.emailAddress;

        // Check if the user email exists and the user is logged in
        if (!userEmail) {
            setVoteError("You are not logged in. Login to vote.");
            return;
        }

        const { error } = await supabase
            .from("votes")
            .insert([
                { post_id: params.id, user_email: userEmail, vote_type: type }
            ]);

        if (error) {
            console.error("Error posting vote:", error);
            if (error.message.includes('unique constraint')) {
                setVoteError("You have already voted on this post.");
            } else {
                setVoteError("Failed to post vote. Please try again.");
            }
        } else {
            if (type === 'up') {
                setUpvotes(prevUpvotes => prevUpvotes + 1); // Use functional update for state
            } else if (type === 'down') {
                setDownvotes(prevDownvotes => prevDownvotes + 1); // Use functional update for state
            }
            setVoteError('');
        }
    };





    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <article className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-center mb-4">
                        {title}
                    </h1>
                    <p className="text-lg text-gray-700 italic text-center mb-6">
                        {summary}
                    </p>
                    <p className="text-gray-600">
                        {body}
                    </p>
                </article>
                <div className="mt-5 flex justify-center items-center space-x-4">
                    <p>{upvotes}</p>

                    <button
                        onClick={() => handleVote('up')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        <BsHandThumbsUp />
                    </button>
                    <p>{downvotes}</p>
                    <button
                        onClick={() => handleVote('down')}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        <BsHandThumbsDown />
                    </button>
                    {voteError && (
                        <p className="text-red-500 text-center mt-2">
                            {voteError}
                        </p>
                    )}
                </div>



                <div className="max-w-4xl mx-auto mt-10">
                    <h2 className="text-2xl font-bold mb-4">Comments:</h2>
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            className="w-full p-3 text-gray-800 border rounded shadow-inner focus:ring-2 focus:ring-blue-300"
                            rows="4"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                        <button
                            className="mt-3 mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Post Comment
                        </button>
                        {commentError && (
                            <p className="mt-2 text-red-500">
                                {commentError}
                            </p>
                        )}
                    </form>

                    <div className="space-y-4 overflow-y-scroll max-h-[300px]">
                        {comments.map((comment, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow">
                                <p className="text-sm text-gray-700">
                                    {comment.content}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Commented by: {comment.user_email}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

