var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	return new (P || (P = Promise))(function (resolve, reject) {
		function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/ImageUpload.tsx
import { useState } from 'react';
import axios from 'axios';
const ImageUpload = () => {
	const [image, setImage] = useState(null);
	const [result, setResult] = useState('');
	const handleImageUpload = (event) => {
		if (event.target.files) {
			setImage(event.target.files[0]);
		}
	};
	const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
		event.preventDefault();
		if (!image)
			return;
		const formData = new FormData();
		formData.append('image', image);
		try {
			const response = yield axios.post('/api/photos/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			setResult(response.data.result);
		}
		catch (error) {
			console.error('Error analyzing image:', error);
		}
	});
	return (_jsxs("div", { children: [_jsx("h1", { children: "Upload an Image" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: "file", accept: "image/*", onChange: handleImageUpload }), _jsx("button", { type: "submit", children: "Analyze Image" })] }), result && (_jsxs("div", { children: [_jsx("h2", { children: "Result:" }), _jsx("p", { children: result })] }))] }));
};
export default ImageUpload;
