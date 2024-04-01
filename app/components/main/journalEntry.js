// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\journalEntry.js
//Technically this is the card component that displays the journal entry
import Link from "next/link";
// import { useEffect, useState } from "react";
// import supabase from "../../utils/supabase/supabaseClient";

export const JournalEntry = ({ id, title, content }) => (
  <>
    <div className="w-1/2 p-4 border-2 rounded-lg shadow-xl mb-5">
      <p className="text-4xl font-bold">{title}</p>
      <p className="italic">{content}</p>
      <div className="flex justify-end button">
        <Link className="text-blue-600" href={`/journal/${id}`}>
          View Entry
        </Link>
      </div>
    </div>
  </>
);
