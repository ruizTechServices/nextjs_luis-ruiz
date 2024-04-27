//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\components\main\blog\blogEntryList.js
// Import necessary hooks and utilities
import React, { useEffect, useState } from "react";
import supabase from "../../../../lib/utils/supabase/supabaseClient"; // Ensure correct import path
import { BlogEntry } from "../blog/blogEntry"; // Ensure you have this component

export const BlogEntriesList = () => {
    const [fetchError, setFetchError] = useState(null);
    const [blogPosts, setBlogPosts] = useState([]); // State to store blog posts

    useEffect(() => {
        // Function to fetch blog posts
        const fetchBlogPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from("blog_posts") // Adjust if your table name differs
                    .select();
                if (error) throw error;
                setBlogPosts(data); // Set blog posts data to state
            } catch (error) {
                setFetchError(`Could not fetch the blog posts' data: ${error.message}`); // Handle errors
            }
        };
        fetchBlogPosts(); // Call the fetch function

        // Set up realtime updates
        const myChannel = supabase.channel("blog_posts", { presence: true });
        myChannel
            .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {
                console.log("Change received!", payload);
                fetchBlogPosts(); // Refetch blog posts on changes
            })
            .subscribe();

        // Cleanup function to unsubscribe from changes
        return () => {
            myChannel.unsubscribe();
        };
    }, []);

    // Render function
    return (
    <section className="border-b border-gray-200 mb-10">
            {fetchError && (
                <div className="bg-red-500 text-black p-4 rounded-md">
                    <p>{fetchError}</p>
                </div>
            )}
            {blogPosts.length > 0 ? (
                <div className="dark:bg-gray-800 dark:text-white">
                    {blogPosts.map((entry) => (
                        <BlogEntry
                            key={entry.id}
                            id={entry.id}
                            created_at={entry.created_at}
                            title={entry.title}
                            summary={entry.summary}
                            body={entry.body}
                            tags={entry.tags}
                            references={entry.references}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center p-4">No blog posts found.</div>
            )}
        </section>
    );
};
