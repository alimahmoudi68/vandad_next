"use client";

import React, { useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";

import ImageUpload from "./ImageUpload";

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
  value = "",
  config,
  change,
  placeholder = "محتوا را اینجا بنویسید...",
  className = "",
  errorMsg = "",
  showImageUpload = true,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

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
        types: ["heading", "paragraph"],
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
    onFocus: ({ editor }) => {
      // Ensure cursor is visible when editor is focused
      const cursorElement = editor.view.dom.querySelector(
        ".ProseMirror-cursor"
      );
      if (cursorElement) {
        cursorElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    },
    immediatelyRender: false,
  });

  const addImage = useCallback(() => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
    }
  }, [editor, imageUrl]);

  const handleImageUpload = useCallback(
    (imageUrl: string) => {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      setShowImageUploadModal(false);
    },
    [editor]
  );

  const insertTable = useCallback(() => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
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
        <label className="w-full text-[0.8rem] min-[500px]:text-[1rem] text-start mb-2 block">
          {config.label}
        </label>
        {showGuide && (
          <div className="mb-3 rounded-md border border-blue-200 bg-blue-50 text-blue-800 p-3 text-sm text-right">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold">راهنمای سریع ویرایشگر</p>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowGuide(false);
                }}
                className="text-blue-700 hover:text-blue-900"
                aria-label="بستن راهنما"
                title="بستن راهنما"
              >
                ✕
              </button>
            </div>
            <ul className="mt-2 list-disc pr-5 space-y-1">
              <li>
                <span className="font-bold">B / I / U / S</span>: پررنگ، مورب،
                زیرخط و خط‌خورده
              </li>
              <li>
                <span className="font-bold">H1 / H2 / H3</span>: تیترهای بزرگ تا
                کوچک
              </li>
              <li>
                <span className="font-bold">• / 1.</span>: لیست نشانه‌دار و
                شماره‌دار
              </li>
              <li>
                <span className="font-bold">تراز ← ↔ →</span>: چیدمان متن چپ،
                وسط، راست
              </li>
              <li>
                <span className="font-bold">📊 جدول</span>: افزودن جدول و مدیریت
                سطر/ستون‌ها
              </li>
              {showImageUpload && (
                <li>
                  <span className="font-bold">🖼️ / 📁 تصویر</span>: آدرس تصویر
                  را وارد و روی 🖼️ بزنید یا با 📁 آپلود کنید
                </li>
              )}
            </ul>
          </div>
        )}
        {/* Toolbar */}
        <div className="border border-gray-300 rounded-t-lg p-3 bg-gradient-to-r from-gray-50 to-gray-100 flex flex-wrap gap-2 shadow-sm">
          {/* Text Formatting */}
          <div className="flex gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                editor.chain().focus().toggleBold().run();
              }}
              className={`p-2 rounded transition-all duration-200 ${
                editor.isActive("bold")
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-white hover:bg-blue-50 hover:shadow-sm border border-gray-200"
              }`}
              title="Bold"
            >
              <strong className="text-sm font-bold">B</strong>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                editor.chain().focus().toggleItalic().run();
              }}
              className={`p-2 rounded ${
                editor.isActive("italic")
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              title="Italic"
            >
              <em>I</em>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                editor.chain().focus().toggleUnderline().run();
              }}
              className={`p-2 rounded ${
                editor.isActive("underline")
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              title="Underline"
            >
              <u>U</u>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                editor.chain().focus().toggleStrike().run();
              }}
              className={`p-2 rounded ${
                editor.isActive("strike")
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              title="Strike"
            >
              <s>S</s>
            </button>
          </div>

          {/* Headings */}
          <div className="flex gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              }}
              className={`p-2 rounded ${
                editor.isActive("heading", { level: 1 })
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              title="Heading 1"
            >
              H1
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              }}
              className={`p-2 rounded ${
                editor.isActive("heading", { level: 2 })
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              title="Heading 2"
            >
              H2
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                editor.chain().focus().toggleHeading({ level: 3 }).run();
              }}
              className={`p-2 rounded ${
                editor.isActive("heading", { level: 3 })
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              title="Heading 3"
            >
              H3
            </button>
          </div>

          {/* Lists */}
          <div className="flex gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                editor.chain().focus().toggleBulletList().run();
              }}
              className={`p-2 rounded ${
                editor.isActive("bulletList")
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              title="Bullet List"
            >
              •
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                editor.chain().focus().toggleOrderedList().run();
              }}
              className={`p-2 rounded ${
                editor.isActive("orderedList")
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              title="Ordered List"
            >
              1.
            </button>
          </div>

          {/* Text Alignment */}
          <div className="flex gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                editor.chain().focus().setTextAlign("left").run();
              }}
              className={`p-2 rounded ${
                editor.isActive({ textAlign: "left" })
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              title="Align Left"
            >
              ←
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                editor.chain().focus().setTextAlign("center").run();
              }}
              className={`p-2 rounded ${
                editor.isActive({ textAlign: "center" })
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              title="Align Center"
            >
              ↔
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                editor.chain().focus().setTextAlign("right").run();
              }}
              className={`p-2 rounded ${
                editor.isActive({ textAlign: "right" })
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              title="Align Right"
            >
              →
            </button>
          </div>

          {/* Table Controls */}
          <div className="flex gap-1 border-l border-gray-300 pl-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                insertTable();
              }}
              className="p-2 rounded bg-white hover:bg-gray-100"
              title="Insert Table"
            >
              📊
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addColumnBefore();
              }}
              className="p-2 rounded bg-white hover:bg-gray-100"
              title="Add Column Before"
            >
              ➕←
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addColumnAfter();
              }}
              className="p-2 rounded bg-white hover:bg-gray-100"
              title="Add Column After"
            >
              ➕→
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteColumn();
              }}
              className="p-2 rounded bg-white hover:bg-gray-100"
              title="Delete Column"
            >
              ❌
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addRowBefore();
              }}
              className="p-2 rounded bg-white hover:bg-gray-100"
              title="Add Row Before"
            >
              ➕↑
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addRowAfter();
              }}
              className="p-2 rounded bg-white hover:bg-gray-100"
              title="Add Row After"
            >
              ➕↓
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteRow();
              }}
              className="p-2 rounded bg-white hover:bg-gray-100"
              title="Delete Row"
            >
              ❌
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteTable();
              }}
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
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (e.key === "Enter") {
                    addImage();
                  }
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addImage();
                }}
                className="p-2 rounded bg-white hover:bg-blue-50 border border-gray-200 transition-all duration-200 hover:shadow-sm"
                title="Add Image URL"
              >
                🖼️
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowImageUploadModal(true);
                }}
                className="p-2 rounded bg-white hover:bg-blue-50 border border-gray-200 transition-all duration-200 hover:shadow-sm"
                title="Upload Image"
              >
                📁
              </button>
            </div>
          )}
        </div>

        {/* Editor Content */}
        <div
          className={`border  ${
            errorMsg !== "" ? "border border-red-500" : "border-t-0"
          } rounded-b-lg`}
        >
          <EditorContent
            editor={editor}
            className="prose max-w-none p-4 min-h-[300px] focus:outline-none editor-content"
          />
        </div>

        {/* Image Upload Modal */}
        {showImageUploadModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowImageUploadModal(false);
            }}
          >
            <div
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">آپلود تصویر</h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowImageUploadModal(false);
                  }}
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
            font-family: "Tahoma", "Arial", sans-serif;
            font-size: 14px;
            line-height: 1.6;
            color: #374151;
            padding: 12px 24px;
            position: relative;
            overflow-x: auto;
            word-wrap: break-word;
            white-space: pre-wrap;
            border: none !important;
            box-shadow: none !important;
          }

          /* Cursor Styles */
          .enhanced-tiptap-editor .ProseMirror {
            caret-color: #3b82f6;
            caret-shape: block;
            --cursor-color: #3b82f6;
            --cursor-width: 2px;
          }

          .enhanced-tiptap-editor .ProseMirror:focus {
            caret-color: #3b82f6;
          }

          /* Ensure cursor is always visible */
          .enhanced-tiptap-editor .ProseMirror .ProseMirror-cursor {
            position: relative;
            display: inline-block;
          }

          /* Custom cursor animation */
          .enhanced-tiptap-editor .ProseMirror .ProseMirror-cursor {
            position: relative;
            min-width: 1px;
            display: inline-block;
          }

          /* Create a more visible cursor using pseudo-element */
          .enhanced-tiptap-editor .ProseMirror .ProseMirror-cursor::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: var(--cursor-width, 2px);
            height: 1.2em;
            background-color: var(--cursor-color, #3b82f6);
            animation: cursor-blink 1s infinite;
            z-index: 10;
            pointer-events: none;
            border-radius: 1px;
            transform: translateX(0);
            min-width: 2px;
          }

          /* Ensure cursor is visible at the beginning of lines */
          .enhanced-tiptap-editor
            .ProseMirror
            p:first-child
            .ProseMirror-cursor {
            margin-left: 0;
          }

          /* Special handling for cursor at the beginning of paragraphs */
          .enhanced-tiptap-editor
            .ProseMirror
            p:first-child
            .ProseMirror-cursor::before {
            left: 0;
          }

          /* Special handling for cursor at the beginning of the editor */
          .enhanced-tiptap-editor
            .ProseMirror
            .ProseMirror-cursor:first-child::before {
            left: 0;
          }

          /* Ensure cursor is visible in empty paragraphs */
          .enhanced-tiptap-editor
            .ProseMirror
            p.is-editor-empty
            .ProseMirror-cursor::before {
            left: 0;
          }

          /* Ensure cursor is visible in all cases */
          .enhanced-tiptap-editor .ProseMirror .ProseMirror-cursor::before {
            left: 0 !important;
          }

          /* Additional cursor visibility improvements */
          .enhanced-tiptap-editor .ProseMirror {
            scroll-behavior: smooth;
          }

          /* Make cursor more prominent */
          .enhanced-tiptap-editor .ProseMirror .ProseMirror-cursor::before {
            box-shadow: 0 0 4px rgba(59, 130, 246, 0.5);
            border-radius: 1px;
          }

          /* Ensure cursor is visible even when scrolled */
          .enhanced-tiptap-editor .ProseMirror .ProseMirror-cursor {
            position: relative;
            z-index: 100;
          }

          /* Direct ProseMirror element styling */
          .ProseMirror {
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
            padding: 12px 24px !important;
          }

          /* Remove any default borders from the editor container */
          .enhanced-tiptap-editor .ProseMirror,
          .enhanced-tiptap-editor .ProseMirror:focus,
          .enhanced-tiptap-editor .ProseMirror:focus-within {
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
          }

          @keyframes cursor-blink {
            0%,
            50% {
              opacity: 1;
            }
            51%,
            100% {
              opacity: 0;
            }
          }

          /* Selection Styles */
          .enhanced-tiptap-editor .ProseMirror ::selection {
            background-color: #dbeafe;
            color: #1e40af;
          }

          .enhanced-tiptap-editor .ProseMirror ::-moz-selection {
            background-color: #dbeafe;
            color: #1e40af;
          }

          /* Focus Styles */
          .enhanced-tiptap-editor .ProseMirror:focus {
            outline: none;
            border: none;
          }

          .enhanced-tiptap-editor .ProseMirror:focus-within {
            box-shadow: none !important;
          }

          /* Placeholder Styles */
          .enhanced-tiptap-editor
            .ProseMirror
            p.is-editor-empty:first-child::before {
            color: #9ca3af;
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
            font-style: italic;
          }

          /* Typography Improvements */
          .enhanced-tiptap-editor .ProseMirror h1 {
            font-size: 2em;
            font-weight: bold;
            margin: 1em 0 0.5em 0;
            color: #111827;
          }

          .enhanced-tiptap-editor .ProseMirror h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin: 1em 0 0.5em 0;
            color: #111827;
          }

          .enhanced-tiptap-editor .ProseMirror h3 {
            font-size: 1.25em;
            font-weight: bold;
            margin: 1em 0 0.5em 0;
            color: #111827;
          }

          .enhanced-tiptap-editor .ProseMirror p {
            margin: 0.5em 0;
            line-height: 1.6;
          }

          .enhanced-tiptap-editor .ProseMirror ul,
          .enhanced-tiptap-editor .ProseMirror ol {
            margin: 0.5em 0;
            padding-left: 1.5em;
          }

          .enhanced-tiptap-editor .ProseMirror li {
            margin: 0.25em 0;
          }

          .enhanced-tiptap-editor .ProseMirror blockquote {
            border-left: 4px solid #3b82f6;
            margin: 1em 0;
            padding-left: 1em;
            color: #6b7280;
            font-style: italic;
          }

          /* Table Styles */
          .enhanced-tiptap-editor table {
            border-collapse: collapse;
            margin: 1rem 0;
            overflow: hidden;
            table-layout: fixed;
            width: 100%;
            border: 2px solid #374151;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }

          .enhanced-tiptap-editor table td,
          .enhanced-tiptap-editor table th {
            border: 1px solid #6b7280;
            box-sizing: border-box;
            min-width: 1em;
            padding: 12px 16px;
            position: relative;
            vertical-align: top;
            background-color: #ffffff;
          }

          .enhanced-tiptap-editor table th {
            background-color: #f3f4f6;
            font-weight: bold;
            border-bottom: 2px solid #374151;
            color: #374151;
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

          /* Image Styles */
          .enhanced-tiptap-editor img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }

          .enhanced-tiptap-editor img.ProseMirror-selectednode {
            outline: 3px solid #3b82f6;
            border-radius: 8px;
          }

          /* Link Styles */
          .enhanced-tiptap-editor .ProseMirror a {
            color: #3b82f6;
            text-decoration: underline;
            text-decoration-color: #93c5fd;
          }

          .enhanced-tiptap-editor .ProseMirror a:hover {
            color: #1d4ed8;
            text-decoration-color: #3b82f6;
          }

          /* Code Styles */
          .enhanced-tiptap-editor .ProseMirror code {
            background-color: #f3f4f6;
            padding: 2px 4px;
            border-radius: 4px;
            font-family: "Courier New", monospace;
            font-size: 0.9em;
          }

          .enhanced-tiptap-editor .ProseMirror pre {
            background-color: #1f2937;
            color: #f9fafb;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 1rem 0;
          }

          .enhanced-tiptap-editor .ProseMirror pre code {
            background-color: transparent;
            padding: 0;
            color: inherit;
          }

          /* Dark Mode Support */
          @media (prefers-color-scheme: dark) {
            .enhanced-tiptap-editor .ProseMirror {
              color: #e5e7eb;
            }

            .enhanced-tiptap-editor .ProseMirror h1,
            .enhanced-tiptap-editor .ProseMirror h2,
            .enhanced-tiptap-editor .ProseMirror h3 {
              color: #f9fafb;
            }

            .enhanced-tiptap-editor .ProseMirror blockquote {
              color: #9ca3af;
            }

            .enhanced-tiptap-editor table td {
              background-color: #374151;
              border-color: #4b5563;
            }

            .enhanced-tiptap-editor table th {
              background-color: #4b5563;
              color: #f9fafb;
              border-color: #6b7280;
            }
          }
        `}</style>
      </div>
      {errorMsg !== "" ? (
        <span className="text-sm text-red-500">{errorMsg}</span>
      ) : null}
    </>
  );
};

export default EnhancedTipTapEditor;
