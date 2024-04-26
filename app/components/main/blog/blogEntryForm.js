// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\journalEntryForm.js
"use client";
import { useState } from "react";
import supabase from "../../../../lib/utils/supabase/supabaseClient";

export const BlogEntryForm = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [tags, setTags] = useState("");
    const [body, setBody] = useState("");
    const [references, setReferences] = useState("");
    const [fetchError, setFetchError] = useState(null);
    const [blog_posts, setBlog_Posts] = useState([]);

    const fetchBlogPosts = async () => {
        try {
            const { data, error } = await supabase.from("blog_posts").select();
            if (error) {
                setFetchError("Could not fetch the blog posts' data...", error.message);
                setBlog_Posts([]);
            } else {
                setBlog_Posts(data);
                setFetchError(null);
            }
        } catch (err) {
            setFetchError(err.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('blog_posts')
            .insert([
                {
                    title: title,
                    summary: summary,
                    tags: tags,
                    references: references,
                    body: body,
                },
            ])
            .select()


        if (error) {
            console.error(error);
        } else {
            console.log("Entry added");
            await fetchBlogPosts();
            setTitle("");
            setSummary("");
            setTags("");
            setBody("");
            setReferences("");
        }

    };

    return (
        <section className="container mx-auto p-4 w-3/4 shadow-2xl m-10 rounded-lg bg-white dark:bg-gray-800">
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Form fields */}
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="summary"
                        className="block text-sm font-medium text-gray-700"
                    >
                        summary
                    </label>
                    <textarea
                        name="summary"
                        id="summary"
                        rows="3"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-400 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    ></textarea>
                </div>
                <div>
                    <label
                        htmlFor="body"
                        className="block text-sm font-medium text-gray-700"
                    >
                        body
                    </label>
                    <textarea
                        name="body"
                        id="body"
                        rows="3"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-400 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    ></textarea>
                </div>
                <div>
                    <label
                        htmlFor="references"
                        className="block text-sm font-medium text-gray-700"
                    >
                        references
                    </label>
                    <input
                        type="text"
                        name="references"
                        id="references"
                        value={references}
                        onChange={(e) => setReferences(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Separate tags with commas"
                    />
                </div>
                <div>
                    <label
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Tags
                    </label>
                    <input
                        type="text"
                        name="tags"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Separate tags with commas"
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-2xl text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </section>
    );
};