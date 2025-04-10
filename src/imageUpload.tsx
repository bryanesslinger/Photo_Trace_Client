import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./ImageUpload.css";

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string>("prompt1");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
      setResult("");
      setUploadedImageUrl(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) return;

    // Use production URL in production, fallback to localhost in development
    const apiUrl = import.meta.env.PROD 
      ? 'https://photo-trace.onrender.com'  // Production server URL
      : 'http://localhost:3001';

    console.log('Current API URL:', apiUrl);
    console.log('Environment:', import.meta.env.MODE);
    
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("promptType", selectedPrompt);

    try {
      console.log('Attempting to connect to:', `${apiUrl}/api/photos/upload`);
      const response = await axios.post(`${apiUrl}/api/photos/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Server Response:", response.data);
      const { photo } = response.data;

      const imageUrl = `${apiUrl}/api/photos/${photo._id}/image`;
      setUploadedImageUrl(imageUrl);
      setResult(photo.aiResponse);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setResult("Failed to analyze image. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="image-upload-container">
      <h1 className="image-upload-title">Upload an Image</h1>

      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="file-input-container">
          <input
            type="file"
            id="file-input"
            className="file-input"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <label htmlFor="file-input" className="file-input-label">
            Choose Image
          </label>
          {image && <span className="file-name">{image.name}</span>}
        </div>

        <div className="prompt-buttons">
          <button
            type="button"
            className={`prompt-button ${selectedPrompt === "prompt1" ? "selected" : ""}`}
            onClick={() => setSelectedPrompt("prompt1")}
          >
            Trace the Place
          </button>
          <button
            type="button"
            className={`prompt-button ${selectedPrompt === "prompt2" ? "selected" : ""}`}
            onClick={() => setSelectedPrompt("prompt2")}
          >
            Trace the Time
          </button>
          <button
            type="button"
            className={`prompt-button ${selectedPrompt === "prompt3" ? "selected" : ""}`}
            onClick={() => setSelectedPrompt("prompt3")}
          >
            Humor Me
          </button>
        </div>

        <button type="submit" className="analyze-button">
          Analyze Image
        </button>
      </form>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-container">
            <div className="loading-text">Analyzing your image...</div>
            <div className="loading-bar"></div>
          </div>
        </div>
      )}

      {uploadedImageUrl && (
        <div className="results-container">
          <div className="image-container">
            <h2>Uploaded Image</h2>
            <img src={uploadedImageUrl} alt="Uploaded" className="uploaded-image" />
          </div>

          {result && (
            <div className="analysis-container">
              <h2>Analysis</h2>
              <p className="analysis-text">{result}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;