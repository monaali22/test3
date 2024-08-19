/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import template1 from '../certificate1.jpg';
import template2 from '../cr2.jpg';

const Sidebar = ({ onTemplateChange, onAddElement, onTemplateSizeChange }) => {
  const [textSize, setTextSize] = useState('h1');
  const [textColor, setTextColor] = useState('#000000'); // Default text color
  const [fontFamily, setFontFamily] = useState('Arial'); // Default font family
  const [showTextOptions, setShowTextOptions] = useState(false);
  const [showLogoOptions, setShowLogoOptions] = useState(false);
  const [showTemplateOptions, setShowTemplateOptions] = useState(false);
  const [logo, setLogo] = useState(null);
  const [templateSize, setTemplateSize] = useState(500); // Default size

  const handleTextAdd = () => {
    onAddElement({
      type: 'text',
      content: 'Your Text Here',
      size: textSize,
      color: textColor,
      fontFamily: fontFamily,
      x: 100,
      y: 100,
      currentValue: '', // Initially empty value for text
    });
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
        onAddElement({
          type: 'image',
          src: reader.result,
          x: 50,
          y: 50,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTemplateSizeChange = (event) => {
    const size = parseInt(event.target.value, 10);
    setTemplateSize(size);
    onTemplateSizeChange(size);
  };

  return (
    <div className="w-80 p-6 bg-white border-r border-gray-200 h-full shadow-lg flex flex-col">
      <h3 className="text-2xl font-semibold mb-6">Design Your Certificate</h3>

      {/* Template Section */}
      <div className="mb-6">
        <button
          onClick={() => setShowTemplateOptions(!showTemplateOptions)}
          className="w-full p-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-300"
        >
          Templates
        </button>
        {showTemplateOptions && (
          <div className="mt-4 grid grid-cols-1 gap-4">
            <img
              src={template1}
              alt="Template 1"
              className="cursor-pointer w-full h-40 object-cover border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105"
              onClick={() => {
                onTemplateChange(template1);
                onTemplateSizeChange(templateSize);
              }}
            />
            <img
              src={template2}
              alt="Template 2"
              className="cursor-pointer w-full h-40 object-cover border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105"
              onClick={() => {
                onTemplateChange(template2);
                onTemplateSizeChange(templateSize);
              }}
            />
          </div>
        )}
      </div>

      {/* Text Section */}
      <div className="mb-6">
        <button
          onClick={() => setShowTextOptions(!showTextOptions)}
          className="w-full p-4 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition duration-300"
        >
          Add Text
        </button>
        {showTextOptions && (
          <div className="mt-4">
            <button
              onClick={handleTextAdd}
              className="block w-full mb-2 p-4 text-white bg-green-700 hover:bg-green-800 rounded-lg shadow-md transition duration-300"
            >
              Add Text
            </button>
            <select
              onChange={(e) => setTextSize(e.target.value)}
              value={textSize}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm"
            >
              <option value="h1">H1</option>
              <option value="h2">H2</option>
              <option value="h3">H3</option>
            </select>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full mt-2"
            />
            <select
              onChange={(e) => setFontFamily(e.target.value)}
              value={fontFamily}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-white shadow-sm"
            >
              <option value="Arial">Arial</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
        )}
      </div>

      {/* Logo Section */}
      <div className="mb-6">
        <button
          onClick={() => setShowLogoOptions(!showLogoOptions)}
          className="w-full p-4 text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition duration-300"
        >
          Upload Logo
        </button>
        {showLogoOptions && (
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm"
            />
            {logo && (
              <div className="mt-4">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-24 h-24 object-contain border border-gray-300 rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Template Size Section */}
      <div>
        <label className="block text-lg font-semibold mb-2">Template Size</label>
        <input
          type="range"
          min="200"
          max="800"
          value={templateSize}
          onChange={handleTemplateSizeChange}
          className="w-full mt-2"
        />
      </div>
    </div>
  );
};

export default Sidebar;
