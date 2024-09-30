"use client"
import { useState, useRef, useEffect } from "react";

const FileDropZone = ({ maxFiles, onFileUpload, resetUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const dropZoneRef = useRef(null);

  useEffect(() => {
    // Reset uploaded files when resetUpload changes
    if (resetUpload) {
      setSelectedFiles([]);
    }
  }, [resetUpload]);

  const handleFiles = (fileList) => {
    const filesArray = Array.from(fileList);
    if (filesArray.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} file(s).`);
      return;
    }
    setSelectedFiles(filesArray);
    onFileUpload(filesArray);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    dropZoneRef.current.classList.add("border-blue-500", "text-blue-500");
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    dropZoneRef.current.classList.remove("border-blue-500", "text-blue-500");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    dropZoneRef.current.classList.remove("border-blue-500", "text-blue-500");
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    handleFiles(files);
  };

  const removeFile = (fileIndex) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== fileIndex);
    setSelectedFiles(updatedFiles);
    onFileUpload(updatedFiles); 
  };

  return (
    <div className="w-full">
      <label
        htmlFor="file-input"
        className="mb-2 font-medium flex justify-between items-center"
      >
        <span>Choose files</span>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          onClick={() => document.getElementById("file-input").click()}
        >
          Select
        </button>
      </label>
      <input
        id="file-input"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Show drop zone or images */}
      {selectedFiles.length === 0 ? (
        <div
          ref={dropZoneRef}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center text-gray-400 text-lg mb-4"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <span>Drag and drop files here</span>
        </div>
      ) : (
        <div className="flex flex-wrap -mx-2 mt-6">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative mx-2 mb-2">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                className="absolute top-1 right-1 h-6 w-6 bg-gray-700 text-white text-xs rounded-full flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity focus:outline-none"
                onClick={() => removeFile(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="text-gray-500 text-sm font-medium">
        {selectedFiles.length} file{selectedFiles.length !== 1 && "s"} selected
      </div>
    </div>
  );
};

export default FileDropZone;
