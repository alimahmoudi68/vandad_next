'use client';

import React, { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';

import ImageUpload from './ImageUpload';

interface Config {
  classes: string;
  label: string;
  type?: string;
  name: string;
}

interface EnhancedTipTapEditorProps {
  config: Config;
  change: (content: string) => void;
  value: string;
  errorMsg: string;
  placeholder?: string;
  className?: string;
  showImageUpload?: boolean;
}

const EnhancedTipTapEditor: React.FC<EnhancedTipTapEditorProps> = ({
  value = '',
  config,
  change,
  placeholder = 'محتوا را اینجا بنویسید...',
  className = '',
  errorMsg = '',
  showImageUpload = true,
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      change?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const addImage = useCallback(() => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
    }
  }, [editor, imageUrl]);

  const handleImageUpload = useCallback((imageUrl: string) => {
    editor?.chain().focus().setImage({ src: imageUrl }).run();
    setShowImageUploadModal(false);
  }, [editor]);

  const insertTable = useCallback(() => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  const addColumnBefore = useCallback(() => {
    editor?.chain().focus().addColumnBefore().run();
  }, [editor]);

  const addColumnAfter = useCallback(() => {
    editor?.chain().focus().addColumnAfter().run();
  }, [editor]);

  const deleteColumn = useCallback(() => {
    editor?.chain().focus().deleteColumn().run();
  }, [editor]);

  const addRowBefore = useCallback(() => {
    editor?.chain().focus().addRowBefore().run();
  }, [editor]);

  const addRowAfter = useCallback(() => {
    editor?.chain().focus().addRowAfter().run();
  }, [editor]);

  const deleteRow = useCallback(() => {
    editor?.chain().focus().deleteRow().run();
  }, [editor]);

  const deleteTable = useCallback(() => {
    editor?.chain().focus().deleteTable().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
    <div className={`w-full rounded-lg enhanced-tiptap-editor ${className}`}>
      <label className="w-full text-[0.8rem] min-[500px]:text-[1rem] text-start mb-2 block">{config.label}</label>
      {/* Toolbar */}
      <div className="border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex flex-wrap gap-2">
        {/* Text Formatting */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded ${editor.isActive('underline') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            title="Underline"
          >
            <u>U</u>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded ${editor.isActive('strike') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            title="Strike"
          >
            <s>S</s>
          </button>
        </div>

        {/* Headings */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Lists */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            title="Bullet List"
          >
            •
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            title="Ordered List"
          >
            1.
          </button>
        </div>

        {/* Text Alignment */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            title="Align Left"
          >
            ←
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            title="Align Center"
          >
            ↔
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            title="Align Right"
          >
            →
          </button>
        </div>

        {/* Table Controls */}
        <div className="flex gap-1 border-l border-gray-300 pl-2">
          <button
            onClick={insertTable}
            className="p-2 rounded bg-white hover:bg-gray-100"
            title="Insert Table"
          >
            📊
          </button>
          <button
            onClick={addColumnBefore}
            className="p-2 rounded bg-white hover:bg-gray-100"
            title="Add Column Before"
          >
            ➕←
          </button>
          <button
            onClick={addColumnAfter}
            className="p-2 rounded bg-white hover:bg-gray-100"
            title="Add Column After"
          >
            ➕→
          </button>
          <button
            onClick={deleteColumn}
            className="p-2 rounded bg-white hover:bg-gray-100"
            title="Delete Column"
          >
            ❌
          </button>
          <button
            onClick={addRowBefore}
            className="p-2 rounded bg-white hover:bg-gray-100"
            title="Add Row Before"
          >
            ➕↑
          </button>
          <button
            onClick={addRowAfter}
            className="p-2 rounded bg-white hover:bg-gray-100"
            title="Add Row After"
          >
            ➕↓
          </button>
          <button
            onClick={deleteRow}
            className="p-2 rounded bg-white hover:bg-gray-100"
            title="Delete Row"
          >
            ❌
          </button>
          <button
            onClick={deleteTable}
            className="p-2 rounded bg-white hover:bg-gray-100"
            title="Delete Table"
          >
            🗑️
          </button>
        </div>

        {/* Image Controls */}
        {showImageUpload && (
          <div className="flex gap-1 border-l border-gray-300 pl-2">
            <input
              type="text"
              placeholder="آدرس تصویر را وارد کنید..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
              onKeyPress={(e) => e.key === 'Enter' && addImage()}
            />
            <button
              onClick={addImage}
              className="p-2 rounded bg-white hover:bg-gray-100"
              title="Add Image URL"
            >
              🖼️
            </button>
            <button
              onClick={() => setShowImageUploadModal(true)}
              className="p-2 rounded bg-white hover:bg-gray-100"
              title="Upload Image"
            >
              📁
            </button>
          </div>
        )}
      </div>

      {/* Editor Content */}
      <div className={`border  ${errorMsg !== "" ? 'border border-red-500' : 'border-t-0'} rounded-b-lg`}>
        <EditorContent 
          editor={editor} 
          className="prose max-w-none p-4 min-h-[300px] focus:outline-none"
        />
      </div>

      {/* Image Upload Modal */}
      {showImageUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">آپلود تصویر</h3>
              <button
                onClick={() => setShowImageUploadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .enhanced-tiptap-editor .ProseMirror {
          outline: none;
          min-height: 300px;
        }
        
        .enhanced-tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }

        .enhanced-tiptap-editor table {
          border-collapse: collapse;
          margin: 1rem 0;
          overflow: hidden;
          table-layout: fixed;
          width: 100%;
          border: 2px solid #374151;
        }

        .enhanced-tiptap-editor table td,
        .enhanced-tiptap-editor table th {
          border: 1px solid #6b7280;
          box-sizing: border-box;
          min-width: 1em;
          padding: 8px 12px;
          position: relative;
          vertical-align: top;
          background-color: #ffffff;
        }

        .enhanced-tiptap-editor table th {
          background-color: #f3f4f6;
          font-weight: bold;
          border-bottom: 2px solid #374151;
        }

        .enhanced-tiptap-editor table .selectedCell:after {
          background: rgba(59, 130, 246, 0.3);
          content: "";
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          pointer-events: none;
          position: absolute;
          z-index: 2;
        }

        .enhanced-tiptap-editor table .column-resize-handle {
          background-color: #3b82f6;
          bottom: -2px;
          position: absolute;
          right: -2px;
          pointer-events: none;
          top: 0;
          width: 4px;
        }

        .enhanced-tiptap-editor table p {
          margin: 0;
        }

        .enhanced-tiptap-editor table .selectedCell {
          background-color: #eff6ff;
        }

        .enhanced-tiptap-editor table .grip-column {
          background-color: #3b82f6;
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          cursor: col-resize;
        }

        .enhanced-tiptap-editor table .grip-row {
          background-color: #3b82f6;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          cursor: row-resize;
        }

        .enhanced-tiptap-editor img {
          max-width: 100%;
          height: auto;
        }

        .enhanced-tiptap-editor img.ProseMirror-selectednode {
          outline: 3px solid #3b82f6;
        }
      `}</style>
    </div>
    {
      errorMsg !== '' ?
      (
        <span className="text-sm text-red-500">
        { errorMsg }
        </span>
      )
      :
      (
        null
      )
    }
    </>
  );
};

export default EnhancedTipTapEditor; 