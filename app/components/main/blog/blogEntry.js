// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\journalEntry.js
//Technically this is the card component that displays the journal entry
"use client";

import React, { useState } from "react"; // Import React

export const BlogEntry = ({ id, title, summary, tags, body, references }) => {
  const [showMore, setShowMore] = React.useState(false);
  const toggleShowMore = () => setShowMore(!showMore);
  const [showMoreBody, setShowMoreBody] = React.useState(false);
  const toggleShowMoreBody = () => setShowMoreBody(!showMoreBody);
  const previewSummary = summary.split(". ").slice(0, 2).join(". ") + ".";
  const previewBody = body.split(". ").slice(0, 2).join(". ") + ".";
  const [tagsVisible, setTagsVisible] = useState(false);
  const [referencesVisible, setReferencesVisible] = useState(false);


  return (
    <>
      <div className="border-4 border-blue-500 m-10 p-10 rounded-lg overflow-scroll max-h-[438px]">
        <div className="">
          <p className="font-bold text-3xl ">
            {title}
          </p>
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


        <div className="mx-auto p-5 flex justify-around gap-3 rounded w-fit border-4 border-blue-500">
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
