// SettingsForm.js
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Corrected from 'next/navigation'
import { createClient } from "../../../../lib/utils/supabase/supabaseClient";


function SettingsForm() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState(null);

  // if (!user) {
  //   return   <>
  //   <div className="h-screen p-4 max-w-4xl mx-auto">
  //       <p>Loading...</p>
  //   </div>
  //   </>
    
  // }
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <form className="space-y-6">
        {/* Notifications Setting */}
        <div className="flex items-center justify-between">
          <label htmlFor="notifications" className="flex-grow text-sm font-medium">
            Notifications
          </label>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" name="notifications" id="notifications" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
            <label htmlFor="notifications" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
        </div>

        {/* Visibility Setting */}
        <div className="flex items-center justify-between">
          <label htmlFor="visibility" className="flex-grow text-sm font-medium">
            Profile Visibility
          </label>
          <select id="visibility" name="visibility" className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Saved Payments */}
        <div className="flex items-center justify-between">
          <label htmlFor="saved-payments" className="flex-grow text-sm font-medium">
            Saved Payments
          </label>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" name="saved-payments" id="saved-payments" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
            <label htmlFor="saved-payments" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default SettingsForm;
