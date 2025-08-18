import React, { useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { uploadFile } from "../services/api"; // <-- import the API function

const Uploads = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".csv")) {
      setSelectedFile(file);
      setError(null);
    } else {
      setSelectedFile(null);
      setError("Please select a valid CSV file.");
    }
  };

  const handleProcessFile = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary(null);

    try {
      const data = await uploadFile(selectedFile); // <-- use api.js function
      setSummary(data.summary);
      console.log("File processed successfully:", data);
    } catch (err) {
      setError(err.message);
      console.error("Error processing file:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Upload Data</h1>
      <p className="text-gray-400 mb-8">
        Upload a new dataset to be processed by the fraud detection model.
      </p>
      <form onSubmit={handleProcessFile} className="space-y-6">
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
              accept=".csv"
            />
          </label>
        </div>
        {selectedFile && !error && (
          <p className="text-gray-400 text-center">
            Selected file:{" "}
            <span className="font-semibold">{selectedFile.name}</span>
          </p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-highlight text-white font-medium py-3 px-8 rounded-lg text-lg hover:bg-highlight-dark"
            disabled={!selectedFile || isLoading || error}
          >
            {isLoading ? "Processing..." : "Process File"}
          </button>
        </div>
      </form>
      {summary && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Summary of Predictions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-lg font-medium text-gray-300">
                Total Transactions
              </p>
              <p className="text-3xl font-bold text-white">
                {summary.totalTransactions}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-lg font-medium text-gray-300">
                Fraudulent Transactions
              </p>
              <p className="text-3xl font-bold text-red-500">
                {summary.fraudCount}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-lg font-medium text-gray-300">
                Non-Fraudulent Transactions
              </p>
              <p className="text-3xl font-bold text-green-500">
                {summary.nonFraudCount}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-lg font-medium text-gray-300">
                Total Fraud Amount
              </p>
              <p className="text-3xl font-bold text-white">
                ${summary.totalFraudAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Uploads;
