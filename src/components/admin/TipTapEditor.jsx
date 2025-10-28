import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { 
  Bold, Italic, Strikethrough, List, ListOrdered, 
  Undo, Redo, Link2, Image as ImageIcon,
  Underline as UnderlineIcon, Quote, Highlighter
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function TipTapEditor({ content, onChange }) {
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const isInitialMount = useRef(true);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#D2F159] hover:underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
      }),
    ],
    content: content || '<p></p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log('=== RAW HTML FROM TIPTAP EDITOR ===');
      console.log(html);
      console.log('=== END RAW HTML ===');
      onChange(html);
    },
  });

  useEffect(() => {
    if (!editor) return;

    // Set initial content when editor is first loaded
    if (isInitialMount.current && content) {
      console.log('=== LOADING CONTENT INTO EDITOR ===');
      console.log(content);
      console.log('=== END LOADING CONTENT ===');
      editor.commands.setContent(content);
      isInitialMount.current = false;
      return;
    }

    // Update content if it changes externally and is different from current content
    if (content && content !== editor.getHTML()) {
      console.log('=== UPDATING EDITOR WITH EXTERNAL CONTENT ===');
      console.log(content);
      console.log('=== END EXTERNAL CONTENT ===');
      const { from, to } = editor.state.selection;
      editor.commands.setContent(content);
      // Restore cursor position if possible
      try {
        editor.commands.setTextSelection({ from, to });
      } catch (e) {
        // If cursor position is invalid, just focus the editor
        editor.commands.focus('end');
      }
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    setLinkUrl(previousUrl || '');
    setShowLinkModal(true);
  };

  const handleLinkSubmit = () => {
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    }
    setShowLinkModal(false);
    setLinkUrl('');
  };

  const addImage = () => {
    setImageUrl('');
    setShowImageModal(true);
  };

  const handleImageSubmit = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }
    setShowImageModal(false);
    setImageUrl('');
  };

  const setHighlightColor = (color) => {
    editor.chain().focus().toggleHighlight({ color }).run();
    setShowHighlightMenu(false);
  };

  const removeHighlight = () => {
    editor.chain().focus().unsetHighlight().run();
    setShowHighlightMenu(false);
  };

  const ToolbarButton = ({ onClick, active, disabled, children, title }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2.5 rounded-lg transition-all ${
        active 
          ? 'bg-[#D2F159] text-gray-900' 
          : 'bg-white dark:bg-[#101214] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1c1f]'
      } disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );

  const isEmpty = !editor.getText().trim();

  return (
    <>
      <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="bg-white dark:bg-[#101214] border-b border-gray-200 dark:border-gray-700 p-3 flex flex-wrap gap-2">
          {/* Undo/Redo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-9 bg-gray-200 dark:bg-gray-700 mx-1" />

          {/* Heading Dropdown */}
          <select
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'paragraph') {
                editor.chain().focus().setParagraph().run();
              } else {
                const level = parseInt(value);
                editor.chain().focus().toggleHeading({ level }).run();
              }
            }}
            value={
              editor.isActive('heading', { level: 1 }) ? '1' :
              editor.isActive('heading', { level: 2 }) ? '2' :
              editor.isActive('heading', { level: 3 }) ? '3' :
              'paragraph'
            }
            className="px-3 py-2 rounded-lg bg-white dark:bg-[#101214] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1a1c1f]"
          >
            <option value="paragraph">Normal</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>

          <div className="w-px h-9 bg-gray-200 dark:bg-gray-700 mx-1" />

          {/* Text Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-9 bg-gray-200 dark:bg-gray-700 mx-1" />

          {/* Highlight with Popup */}
          <div className="relative">
            <ToolbarButton
              onClick={() => setShowHighlightMenu(!showHighlightMenu)}
              active={editor.isActive('highlight') || showHighlightMenu}
              title="Highlight Text"
            >
              <Highlighter className="w-4 h-4" />
            </ToolbarButton>
            
            {showHighlightMenu && (
              <div className="absolute top-full mt-2 left-0 bg-white dark:bg-[#101214] border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg z-20 min-w-[200px]">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Select Highlight Color</p>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setHighlightColor('#fef08a')}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-[#1a1c1f] transition-colors"
                  >
                    <div className="w-5 h-5 rounded border border-gray-300" style={{ backgroundColor: '#fef08a' }}></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Yellow</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHighlightColor('#bbf7d0')}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-[#1a1c1f] transition-colors"
                  >
                    <div className="w-5 h-5 rounded border border-gray-300" style={{ backgroundColor: '#bbf7d0' }}></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Green</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHighlightColor('#bfdbfe')}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-[#1a1c1f] transition-colors"
                  >
                    <div className="w-5 h-5 rounded border border-gray-300" style={{ backgroundColor: '#bfdbfe' }}></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Blue</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHighlightColor('#fbcfe8')}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-[#1a1c1f] transition-colors"
                  >
                    <div className="w-5 h-5 rounded border border-gray-300" style={{ backgroundColor: '#fbcfe8' }}></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Pink</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHighlightColor('#fed7aa')}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-[#1a1c1f] transition-colors"
                  >
                    <div className="w-5 h-5 rounded border border-gray-300" style={{ backgroundColor: '#fed7aa' }}></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Orange</span>
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <button
                    type="button"
                    onClick={removeHighlight}
                    className="px-3 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm text-red-600 dark:text-red-400"
                  >
                    Remove Highlight
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-9 bg-gray-200 dark:bg-gray-700 mx-1" />

          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>

          {/* Quote */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-9 bg-gray-200 dark:bg-gray-700 mx-1" />

          {/* Link & Image */}
          <ToolbarButton
            onClick={addLink}
            active={editor.isActive('link')}
            title="Add Link"
          >
            <Link2 className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={addImage}
            title="Insert Image"
          >
            <ImageIcon className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Editor */}
        <div className="relative bg-white dark:bg-[#0a0b0c]">
          {isEmpty && (
            <div className="absolute top-6 left-6 text-gray-400 dark:text-gray-500 pointer-events-none select-none z-10">
              Start writing your blog content here...
            </div>
          )}
          <EditorContent 
            editor={editor}
            className="prose prose-lg max-w-none dark:prose-invert
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-[#D2F159] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
              prose-ul:list-disc prose-ul:pl-6 prose-ul:text-gray-700 dark:prose-ul:text-gray-300
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-gray-700 dark:prose-ol:text-gray-300
              prose-li:my-1
              prose-blockquote:border-l-4 prose-blockquote:border-[#D2F159] prose-blockquote:pl-4 prose-blockquote:italic
              prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
              prose-code:text-[#D2F159] prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded
              prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg
              prose-img:rounded-lg prose-img:shadow-lg
              p-6 min-h-[400px] focus:outline-none"
          />
        </div>
      </div>

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#17191C] rounded-3xl shadow-2xl max-w-md w-full p-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#D2F159]">
                  <Link2 className="w-5 h-5 text-gray-900" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {linkUrl ? 'Edit Link' : 'Add Link'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowLinkModal(false);
                  setLinkUrl('');
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                URL
              </label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 rounded-full bg-gray-50 dark:bg-[#101214] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D2F159] focus:border-transparent"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLinkSubmit();
                  if (e.key === 'Escape') {
                    setShowLinkModal(false);
                    setLinkUrl('');
                  }
                }}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Leave empty to remove the link
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowLinkModal(false);
                  setLinkUrl('');
                }}
                className="flex-1 px-4 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLinkSubmit}
                className="flex-1 px-4 py-3 rounded-full bg-[#D2F159] hover:bg-lime-500 text-gray-900 font-semibold transition-colors"
              >
                {linkUrl ? 'Update Link' : 'Remove Link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#17191C] rounded-3xl shadow-2xl max-w-md w-full p-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#D2F159]">
                  <ImageIcon className="w-5 h-5 text-gray-900" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Insert Image
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowImageModal(false);
                  setImageUrl('');
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 rounded-full bg-gray-50 dark:bg-[#101214] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D2F159] focus:border-transparent"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && imageUrl) handleImageSubmit();
                  if (e.key === 'Escape') {
                    setShowImageModal(false);
                    setImageUrl('');
                  }
                }}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Enter the full URL of the image you want to insert
              </p>
              
              {imageUrl && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-[#101214] rounded-2xl">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden items-center justify-center h-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500">Invalid image URL</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowImageModal(false);
                  setImageUrl('');
                }}
                className="flex-1 px-4 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleImageSubmit}
                disabled={!imageUrl}
                className="flex-1 px-4 py-3 rounded-full bg-[#D2F159] hover:bg-lime-500 text-gray-900 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
