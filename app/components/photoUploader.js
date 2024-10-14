// app/components/photoUpload.js
"use client";
import { useState } from "react";

function PhotoUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newFileName, setNewFileName] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !newFileName) {
      setUploadStatus("Please select a file and provide a new file name.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("newFileName", newFileName);

    try {
      const res = await fetch(
        "https://chrome-24hourgpt-5bb1bcb92d7e.herokuapp.com/upload/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        setUploadStatus("File uploaded successfully!");
      } else {
        setUploadStatus("File upload failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setUploadStatus("An error occurred during file upload.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Photo Upload</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          placeholder="New file name"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="btn w-full bg-blue-500 text-white rounded p-2"
        >
          Upload
        </button>
      </form>
      {uploadStatus && (
        <div className="mt-4 p-2 bg-white rounded shadow">
          {uploadStatus}
        </div>
      )}
    </div>
  );
}

export default PhotoUploader;
