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

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleImageUpload = (event) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
      setResult("");
      setUploadedImageUrl(null);
    }
  };
  const handleSubmit = async (event) =>
    __awaiter(void 0, void 0, void 0, function* () {
      event.preventDefault();
      if (!image) return;
      const formData = new FormData();
      formData.append("image", image);
      formData.append("promptType", "prompt1");

      try {
        const response = yield axios.post(
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

        // Use the photo ID to construct the URL
        const imageUrl = `http://localhost:3001/api/photos/${photo._id}/image`;
        setUploadedImageUrl(imageUrl);
        setResult(photo.aiResponse);

      } catch (error) {
        console.error("Error analyzing image:", error);
      }
    });
	
  return _jsxs("div", {
    children: [
      _jsx("h1", { children: "Upload an Image" }),
      _jsxs("form", {
        onSubmit: handleSubmit,
        children: [
          _jsx("input", {
            type: "file",
            accept: "image/*",
            onChange: handleImageUpload,
          }),
          _jsx("button", { type: "submit", children: "Analyze Image" }),
        ],
      }),
      
      uploadedImageUrl && _jsxs("div", {
        className: "results-container",
        children: [
          _jsxs("div", {
            className: "image-container",
            children: [
              _jsx("h2", { children: "Uploaded Image:" }),
              _jsx("img", {
                src: uploadedImageUrl,
                alt: "Uploaded",
                style: {
                  maxWidth: "100%",
                  maxHeight: "400px",
                  objectFit: "contain"
                }
              })
            ]
          }),
          result && _jsxs("div", {
            className: "analysis-container",
            children: [
              _jsx("h2", { children: "Analysis:" }),
              _jsx("p", { 
                className: "analysis-text",
                children: result 
              })
            ]
          })
        ]
      })
    ]
  });
};

export default ImageUpload;
