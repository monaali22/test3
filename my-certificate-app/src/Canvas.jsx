/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

const Canvas = ({ template, elements, templateSize, onUpdateElement }) => {
  // Define sizes for h1, h2, h3
  const getFontSize = (size) => {
    switch (size) {
      case 'h1':
        return '2rem'; // Larger size for h1
      case 'h2':
        return '1.5rem'; // Medium size for h2
      case 'h3':
        return '1.25rem'; // Smaller size for h3
      default:
        return '1rem'; // Default size
    }
  };

  const handleInput = (index, e) => {
    onUpdateElement(index, e.target.innerText);
  };

  const handleFocus = (e) => {
    const placeholder = e.target.getAttribute('data-placeholder');
    if (e.target.innerText === placeholder) {
      e.target.innerText = ''; // Clear placeholder text
      e.target.style.color = 'black'; // Set text color to black
    }
  };

  const handleBlur = (index, e) => {
    const placeholder = e.target.getAttribute('data-placeholder');
    if (!e.target.innerText.trim()) {
      e.target.innerText = placeholder; // Restore placeholder text
      e.target.style.color = 'gray'; // Set placeholder color
    }
    onUpdateElement(index, e.target.innerText);
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center bg-gray-100 overflow-hidden">
      {template && (
        <img
          src={template}
          alt="Template"
          className="absolute"
          style={{
            width: `${templateSize}px`,
            height: 'auto',
          }}
        />
      )}
      {elements.map((element, index) => (
        <Draggable key={index} defaultPosition={{ x: element.x, y: element.y }}>
          <div
            className={`absolute ${
              element.type === 'text' ? 'text-black font-semibold' : ''
            }`}
            style={{
              fontSize: getFontSize(element.size),
              color: element.color,
              fontFamily: element.fontFamily,
              pointerEvents: 'all',
              resize: 'both',
              overflow: 'hidden',
              background: 'transparent',
              border: 'none',
              padding: '0',
              margin: '0',
              boxShadow: 'none',
            }}
          >
            {element.type === 'text' ? (
              <div
                contentEditable
                data-placeholder={element.content}
                onInput={(e) => handleInput(index, e)}
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => handleBlur(index, e)}
                className="w-full h-full outline-none"
                style={{
                  fontSize: getFontSize(element.size),
                  color: element.currentValue ? element.color : 'gray', // Set color for placeholder
                  fontFamily: element.fontFamily,
                  background: 'transparent',
                  border: 'none',
                  padding: '0',
                  margin: '0',
                  whiteSpace: 'pre-wrap',
                  boxShadow: 'none',
                  minHeight: '1em', // Ensure minimum height to make it visible
                }}
              >
                {element.currentValue || element.content} {/* Use currentValue if present */}
              </div>
            ) : (
              <img src={element.src} alt="Logo" className="w-24 h-24 object-contain" />
            )}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default Canvas;
