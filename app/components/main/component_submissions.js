import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/themes/prism.css';

const CodepenLikeEditor = () => {
  const [code, setCode] = useState('');
  return (
    <div className="code-editor">
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.js, 'javascript')}
        padding={10}
        style={{
          fontFamily: 'monospace',
          fontSize: 16,
        }}
      />
      <div className="code-output">
        <iframe
          srcDoc={code}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default CodepenLikeEditor;