'use client';

import React, { useState } from 'react';
import EnhancedTipTapEditor from './EnhancedTipTapEditor';

const TableTest: React.FC = () => {
  const [content, setContent] = useState(`
    <h1>تست جدول</h1>
    <p>این یک پاراگراف نمونه است.</p>
    <table>
      <thead>
        <tr>
          <th>نام</th>
          <th>سن</th>
          <th>شغل</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>علی</td>
          <td>25</td>
          <td>برنامه‌نویس</td>
        </tr>
        <tr>
          <td>فاطمه</td>
          <td>30</td>
          <td>طراح</td>
        </tr>
      </tbody>
    </table>
    <p>این یک پاراگراف دیگر است.</p>
  `);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">تست جدول</h1>
        <p className="text-gray-600">این صفحه برای تست عملکرد جدول ایجاد شده است.</p>
      </div>

      <div className="mb-4">
        <EnhancedTipTapEditor
          config={{ classes: '', label: 'محتوا', name: 'content' }}
          value={content}
          change={setContent}
          errorMsg=""
          placeholder="محتوا را اینجا بنویسید..."
          showImageUpload={true}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">HTML Output:</h2>
          <pre className="bg-white p-4 rounded border text-sm overflow-x-auto">
            {content}
          </pre>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">نمایش رندر شده:</h2>
          <div
            className="border p-4 rounded bg-white min-h-[200px] rendered-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <style jsx>{`
            .rendered-content table {
              border-collapse: collapse;
              margin: 1rem 0;
              overflow: hidden;
              table-layout: fixed;
              width: 100%;
              border: 2px solid #374151;
            }

            .rendered-content table td,
            .rendered-content table th {
              border: 1px solid #6b7280;
              box-sizing: border-box;
              min-width: 1em;
              padding: 8px 12px;
              position: relative;
              vertical-align: top;
              background-color: #ffffff;
            }

            .rendered-content table th {
              background-color: #f3f4f6;
              font-weight: bold;
              border-bottom: 2px solid #374151;
            }

            .rendered-content table p {
              margin: 0;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default TableTest; 