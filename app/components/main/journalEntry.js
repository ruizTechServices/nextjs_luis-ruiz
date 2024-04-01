// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\journalEntry.js
//Technically this is the card component that displays the journal entry

import React from 'react'; // Import React

export const JournalEntry = ({ id, title, content }) => {
    const [showMore, setShowMore] = React.useState(false);
    const toggleShowMore = () => setShowMore(!showMore);
    const previewContent = content.split(". ").slice(0, 2).join(". ") + ".";

    return (
        <>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md mb-5 ml-10 mr-10 text-center w-full md:w-1/3">
              <p className="text-4xl font-bold text-black dark:text-white">{title}</p>
              <p className="italic text-gray-900 dark:text-gray-100">
                  {showMore ? content : previewContent}
                 <button
                     onClick={toggleShowMore}
                     className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
                 >
                     {showMore ? " less" : " more"}
                 </button>
              </p>
          </div>
        </>
    );
};
