// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\journalEntry.js
//Technically this is the card component that displays the journal entry
"use client";

import React, { useState } from "react"; // Import React

export const JournalEntry = ({ id, title, content, tags }) => {
  const [showMore, setShowMore] = React.useState(false);
  const toggleShowMore = () => setShowMore(!showMore);
  const previewContent = content.split(". ").slice(0, 2).join(". ") + ".";
  const [tagsVisible, setTagsVisible] = useState(false);

  return (
    <>
      <div className="">
        <p className="font-bold text-3xl text-center">{title}</p>
        <div className="italic flex flex-col justify-center items-center m-4 p-4 border-2 text-gray-900 dark:text-gray-100 md:w-3/4 mx-auto">
          {showMore ? content : previewContent}
          <button
            onClick={toggleShowMore}
            className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
          <button className="border-2 rounded-full p-3 hover:bg-gradient-to-br from-teal-600 via-pink-500 to-blue-600" type="button" onClick={() => setTagsVisible(!tagsVisible)}>
              Tags
            </button>
          <div className="">            
            {tagsVisible && (
              <div className="text-center font-bold not-italic text-xl border rounded w-fit mt-5">
                {tags}
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  );
};
