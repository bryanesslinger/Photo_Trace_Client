var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/ImageUpload.tsx
import { useState } from "react";
import axios from "axios";
import './ImageUpload.css';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState('prompt1');

  const handleImageUpload = (event) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
      setResult("");
      setUploadedImageUrl(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("promptType", selectedPrompt);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/photos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log('Server Response:', response.data);
      const { photo } = response.data;

      const imageUrl = `http://localhost:3001/api/photos/${photo._id}/image`;
      setUploadedImageUrl(imageUrl);
      setResult(photo.aiResponse);

    } catch (error) {
      console.error("Error analyzing image:", error);
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
            className={`prompt-button ${selectedPrompt === 'prompt1' ? 'selected' : ''}`}
            onClick={() => setSelectedPrompt('prompt1')}
          >
            Basic Description
          </button>
          <button
            type="button"
            className={`prompt-button ${selectedPrompt === 'prompt2' ? 'selected' : ''}`}
            onClick={() => setSelectedPrompt('prompt2')}
          >
            Humorous Description
          </button>
          <button
            type="button"
            className={`prompt-button ${selectedPrompt === 'prompt3' ? 'selected' : ''}`}
            onClick={() => setSelectedPrompt('prompt3')}
          >
            Shakespearean Description
          </button>
        </div>

        <button type="submit" className="analyze-button">
          Analyze Image
        </button>
      </form>

      {uploadedImageUrl && (
        <div className="results-container">
          <div className="image-container">
            <h2>Uploaded Image</h2>
            <img
              src={uploadedImageUrl}
              alt="Uploaded"
              className="uploaded-image"
            />
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
