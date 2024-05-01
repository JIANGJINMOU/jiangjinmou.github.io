// components/MarkdownPage.tsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './../styles/MarkdownPage.css';

interface Props {
  content: string;
}

const MarkdownPage: React.FC<Props> = ({ content }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="markdown-container">
      <ReactMarkdown className="markdown-content">{content}</ReactMarkdown>
      <button onClick={copyToClipboard}>
        {copySuccess ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default MarkdownPage;
