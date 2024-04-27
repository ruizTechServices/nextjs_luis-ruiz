import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";

export default function BlogArticle() {
    const blog_post = {
        title: "This is a blog post title",
        summary: "This is a blog post summary",
        body: "ipsum lorem dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Repeated for content length.",
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <article className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-center mb-4">
                        {blog_post.title}
                    </h1>
                    <p className="text-lg text-gray-700 italic text-center mb-6">
                        {blog_post.summary}
                    </p>
                    <p className="text-gray-600">
                        {blog_post.body}
                    </p>
                </article>
        <div className="mt-5 flex justify-center items-center space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        <BsHandThumbsUp />
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        <BsHandThumbsDown />
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        <IoShareOutline />
                    </button>
                </div>

                <div className="max-w-4xl mx-auto mt-10">
                    <h2 className="text-2xl font-bold mb-4">Comments:</h2>
                    <form className="mb-6">
                        <textarea
                            className="w-full p-3 text-gray-800 border rounded shadow-inner focus:ring-2 focus:ring-blue-300"
                            rows="4"
                            placeholder="Add a comment..."
                        ></textarea>
                        <button
                            className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Post Comment
                        </button>
                    </form>
                    <div className="space-y-4 overflow-y-scroll max-h-[300px]">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow">
                                <p className="text-sm text-gray-700">
                                    &quot;Ut enim ad minim veniam, quis nostrud exercitation
                                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                                    aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore eu fugiat nulla pariatur.&quot;
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
