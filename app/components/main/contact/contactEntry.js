//Technically this is the card component that displays the contact entry
"use client";

import React, { useState } from "react"; // Import React

export const ContactEntry = ({ id, fullname, phone, email, message }) => {
  const [showMore, setShowMore] = React.useState(false);
  const toggleShowMore = () => setShowMore(!showMore);
  const [contactVisible, setContactVisible] = useState(false);

  return (
    <>
      <div className="bg-white flex flex-col dark:bg-gray-800 p-4 rounded-2xl shadow-md mb-5 ml-10 mr-10 text-center items-center align-middle w-full">
        <p className="">{fullname}</p>
        <div className="italic text-center flex flex-col justify-center items-center m-4 p-4 border-2 text-gray-900 dark:text-gray-100 md:w-3/4 mx-auto"> 
          <div>
            <button className="border-2 rounded-full p-4 hover:bg-gradient-to-br from-teal-600 via-pink-500 to-blue-600" type="button" onClick={() => setContactVisible(!contactVisible)}>
              PII
            </button>
            {contactVisible && (
              <div className="font-bold not-italic text-xl border rounded w-fit border-red-500">
                phone:{phone}
                <br />
                email:{email}
                <br />
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  );
};
