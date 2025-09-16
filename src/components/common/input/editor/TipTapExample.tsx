'use client';

import React, { useState } from 'react';
import EnhancedTipTapEditor from './EnhancedTipTapEditor';

const TipTapExample: React.FC = () => {
  const [editorContent, setEditorContent] = useState('');

  const handleSave = () => {
    console.log('Editor content:', editorContent);
    // Here you can save the content to your database
    alert('محتوا ذخیره شد!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">مثال استفاده از TipTap Editor</h1>
        <p className="text-gray-600">این یک مثال ساده از نحوه استفاده از ویرایشگر TipTap است.</p>
      </div>

      <div className="mb-4">
        <EnhancedTipTapEditor
          config={{ classes: '', label: 'محتوا', name: 'content' }}
          value={editorContent}
          change={setEditorContent}
          errorMsg=""
          placeholder="محتوا را اینجا بنویسید..."
          showImageUpload={true}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ذخیره محتوا
        </button>
        <button
          onClick={() => setEditorContent('')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          پاک کردن
        </button>
      </div>

      {editorContent && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">پیش‌نمایش:</h2>
          <div 
            className="border border-gray-300 rounded p-4 bg-white"
            dangerouslySetInnerHTML={{ __html: editorContent }}
          />
        </div>
      )}
    </div>
  );
};

export default TipTapExample; 