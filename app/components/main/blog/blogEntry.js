// C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\components\main\blog\blogEntry.js
"use client";

import React, { useState } from "react"; // Import React
import { useRouter } from 'next/navigation'

export const BlogEntry = ({
  id,
  created_at,
  title,
  summary,
  tags,
  body,
  references,
}) => {
  const [showMore, setShowMore] = React.useState(false);
  const toggleShowMore = () => setShowMore(!showMore);
  const [showMoreBody, setShowMoreBody] = React.useState(false);
  const toggleShowMoreBody = () => setShowMoreBody(!showMoreBody);
  const previewSummary = summary.split(". ").slice(0, 2).join(". ") + ".";
  const previewBody = body.split(". ").slice(0, 2).join(". ") + ".";
  const [tagsVisible, setTagsVisible] = useState(false);
  const [referencesVisible, setReferencesVisible] = useState(false);
  const router = useRouter()

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Customize the options as needed for your desired date and time format
    return date.toLocaleString('en-US', {
      weekday: 'long', // "Monday"
      year: 'numeric', // "2024"
      month: 'long', // "April"
      day: 'numeric', // "25"
      hour: '2-digit', // "08 PM"
      minute: '2-digit' // "42"
    });
  };


  return (
    <>
      <div className="border-4 border-blue-300 m-10 p-10 rounded-lg overflow-scroll max-h-[438px]">
        <div className="">
          <p className="font-bold text-3xl ">
            <div className="hover:cursor-pointer" onClick={() => router.push(`/blog/${id}`)}>
              {title}
            </div>{/*<=====We are discussing this code now.. All I want is when the user clicks here, the user gets routed to the blog entry page with the id of the blog entry.*/}
          </p>
          <p className="text-xl">{formatDate(created_at)}</p>
          <div className="italic">
            {showMore ? summary : previewSummary}
            <button onClick={toggleShowMore} className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
          <div className="">
            {showMoreBody ? body : previewBody}
            <button onClick={toggleShowMoreBody} className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">
              {showMoreBody ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>


        <div className="mx-auto p-5 flex justify-around gap-3 rounded w-fit border-4 border-blue-200">
          <div className="">
            <button className="w-fit rounded-xl p-2 hover:bg-green-400 before:content-['tags']" type="button" onClick={() => setTagsVisible(!tagsVisible)}>
            </button>
            <div className="">
              {tagsVisible && (
                <div className="absolute left-20 bg-white rounded-xl p-2">
                  {tags}
                </div>
              )}
            </div>
          </div>
          <div className="">
            <button className="w-fit rounded-xl p-2 hover:bg-green-400 before:content-['references']" type="button" onClick={() => setReferencesVisible(!referencesVisible)}>
            </button>
            <div className="">
              {referencesVisible && (
                <div className="absolute left-20 bg-white rounded-xl p-2">
                  {references}
                </div>
              )}
            </div>
          </div>
        </div>


      </div>

    </>
  );
};
          

//I need to create a comments section where users can comment
//or at least see the comments of other users
//
//I also want to implement a thumbs up and thumbs down button
//to give users a way to give feedback on the blog post
