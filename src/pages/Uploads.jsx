import React, { useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const Uploads = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Upload Data</h1>
      <p className="text-gray-400 mb-8">
        Upload a new dataset to be processed by the fraud detection model.
      </p>
      <form onSubmit={handleFileUpload} className="space-y-6">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                CSV, XLSX, or JSON files
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {selectedFile && (
          <p className="text-gray-400 text-center">
            Selected file:{" "}
            <span className="font-semibold">{selectedFile.name}</span>
          </p>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-highlight text-white font-medium py-3 px-8 rounded-lg text-lg hover:bg-highlight-dark"
            disabled={!selectedFile}
          >
            Process File
          </button>
        </div>
      </form>
    </>
  );
};

export default Uploads;
