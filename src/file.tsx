import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
	setSelectedFile(event.target.files[0]); // Store the selected file
  };

  const handleUpload = async () => {
	if (!selectedFile) {
	  alert("Please select a file first.");
	  return;
	}

	const formData = new FormData();
	formData.append("image", selectedFile); // Send the selected file to the backend

	try {
	  const response = await axios.post("http://localhost:3001/api/analyze-image", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	  });

	  console.log("Analysis Result:", response.data);
	} catch (error) {
	  console.error("Error analyzing image:", error);
	}
  };

  return (
	<div>
	  <input type="file" accept="image/*" onChange={handleFileChange} />
	  <button onClick={handleUpload}>Upload & Analyze</button>
	</div>
  );
};

export default ImageUploader;