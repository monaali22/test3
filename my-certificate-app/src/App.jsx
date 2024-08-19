/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';

const App = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [elements, setElements] = useState([]);
  const [templateSize, setTemplateSize] = useState(500);

  const handleAddElement = (element) => {
    setElements([...elements, element]);
  };

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };

  const handleTemplateSizeChange = (size) => {
    setTemplateSize(size);
  };

  const handleUpdateElement = (index, newValue) => {
    const updatedElements = elements.map((el, i) =>
      i === index ? { ...el, currentValue: newValue } : el
    );
    setElements(updatedElements);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        onTemplateChange={handleTemplateChange}
        onAddElement={handleAddElement}
        onTemplateSizeChange={handleTemplateSizeChange}
      />
      <Canvas
        template={selectedTemplate}
        elements={elements}
        templateSize={templateSize}
        onUpdateElement={handleUpdateElement}
      />
    </div>
  );
};

export default App;
