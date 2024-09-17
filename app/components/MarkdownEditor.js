import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-markdown';
import 'prismjs/themes/prism.css';
import Button from '@/components/ui/button';
import { Bold, Italic, List, Link } from 'lucide-react';

const MarkdownEditor = () => {
  const [code, setCode] = useState('');

  const handleFormat = (format) => {
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = code.substring(start, end);

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'list':
        formattedText = `\n- ${selectedText}`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      default:
        formattedText = selectedText;
    }

    const newCode = code.substring(0, start) + formattedText + code.substring(end);
    setCode(newCode);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-4 flex space-x-2">
        <Button onClick={() => handleFormat('bold')}><Bold size={16} /></Button>
        <Button onClick={() => handleFormat('italic')}><Italic size={16} /></Button>
        <Button onClick={() => handleFormat('list')}><List size={16} /></Button>
        <Button onClick={() => handleFormat('link')}><Link size={16} /></Button>
      </div>
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.markdown)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          backgroundColor: '#f5f5f5',
          borderRadius: '0.375rem',
        }}
        className="min-h-[200px] border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default MarkdownEditor;