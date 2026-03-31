'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Type, Paperclip } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  onSend: () => void;
  placeholder?: string;
}

const RichTextEditor = ({ content, onChange, onSend, placeholder }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none max-w-none w-full min-h-[60px] cursor-text font-[family-name:var(--font-inter)] text-[14px] text-[#1a1a1a] placeholder:text-[#aaa]',
      },
      handleKeyDown: (view, event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          onSend();
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Keep editor content in sync with external state if needed (mostly for clearing after send)
  useEffect(() => {
    if (editor && content === '' && editor.getHTML() !== '<p></p>') {
      editor.commands.setContent('');
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-2">
        <EditorContent editor={editor} />
        {editor.isEmpty && (
          <div className="absolute top-[16px] left-[16px] pointer-events-none text-[#aaa] font-[family-name:var(--font-inter)] font-medium text-[14px]">
            {placeholder || "Write your message here"}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-[16px] text-[#5a5a5a]">
            {/* Formatting Toolbar */}
            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`hover:text-[#1a1a1a] transition-colors p-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-100 text-[#1a1a1a]' : ''}`}
              title="Heading 1"
            >
              <Type className="size-[18px]" strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`hover:text-[#1a1a1a] transition-colors p-1 rounded font-bold ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-100 text-[#1a1a1a]' : ''}`}
              title="Heading 2"
            >
              <span className="text-[14px] leading-none">H2</span>
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`hover:text-[#1a1a1a] transition-colors p-1 rounded ${editor.isActive('bold') ? 'bg-gray-100 text-[#1a1a1a]' : ''}`}
              title="Bold"
            >
              <Bold className="size-[18px]" />
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`hover:text-[#1a1a1a] transition-colors p-1 rounded ${editor.isActive('italic') ? 'bg-gray-100 text-[#1a1a1a]' : ''}`}
              title="Italic"
            >
              <Italic className="size-[18px]" />
            </button>
            <button className="hover:text-[#1a1a1a] transition-colors p-1 rounded" title="Attach file">
              <Paperclip className="size-[18px]" />
            </button>
        </div>
        
        <button 
          onClick={onSend}
          className="bg-[var(--cta,#f95c4b)] hover:bg-[#ff7a6c] transition-colors border border-[var(--light-shade1,#ff7a6c)] rounded-[40px] px-[24px] py-[10px] text-white font-[family-name:var(--font-inter)] font-medium text-[14px] shadow-sm ml-4"
        >
          Send
        </button>
      </div>
      
      {/* Editor Styles (scoped or global) */}
      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #aaa;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror h1 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .ProseMirror h2 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }
        .ProseMirror {
          min-height: 60px;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
