import React, { useState } from "react";
import { createClient } from "../../../../lib/utils/supabase/supabaseClient"; // Ensure you have a setup file for supabase client
import { useUser } from "@clerk/nextjs";

const ProfilePicture = ({ onSuccess, onError }) => {
  const supabase = createClient();
  const [file, setFile] = useState(null);
  const { user, isSignedIn } = useUser();

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const uploadProfilePicture = async () => {
    if (!file) {
      onError("Please select a file.");
      return;
    }

    if (!isSignedIn || !user) {
      onError("No authenticated user.");
      return;
    }

    const filePath = `public/${user.id}/${file.name}`;
    let { error, data } = await supabase.storage
      .from("user_profile_pictures")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false
      });

    if (error) {
      onError(error.message);
      return;
    }

    const { publicURL, error: urlError } = supabase.storage
      .from("user_profile_pictures")
      .getPublicUrl(filePath);

    if (urlError) {
      onError(urlError.message);
      return;
    }

    onSuccess(publicURL);
  };

  return (
    <div className="flex flex-row">
      <p className="flex-grow text-sm font-medium">Upload Profile Picture</p>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button className="rounded-xl bg-blue-200 p-2" onClick={uploadProfilePicture}>Upload Picture</button>
    </div>
  );
};

export default ProfilePicture;
