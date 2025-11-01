
import React from 'react';
import { Loader } from './Loader';

interface SolutionOutputProps {
  solutions: string;
  isLoading: boolean;
  error: string | null;
}

// Simple component to render markdown-like content
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');
  
  return (
    <div>
      {lines.map((line, index) => {
        if (line.startsWith('```')) {
          // This is a simple toggle, doesn't handle nested blocks or language hints
          return null; // Don't render the backticks themselves
        }
        
        // Very basic markdown parsing for demonstration
        let processedLine = line;

        // Headers
        if (line.startsWith('# ')) {
          return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 border-b border-gray-600 pb-2">{line.substring(2)}</h2>;
        }
        if (line.startsWith('## ')) {
          return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{line.substring(3)}</h3>;
        }

        // Bold text
        processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-emerald-400">$1</strong>');
        
        // Inline code
        processedLine = processedLine.replace(/`(.*?)`/g, '<code class="bg-gray-700 text-red-300 rounded px-1.5 py-0.5 text-sm">$1</code>');
        
        if (line.startsWith('- ')) {
           return <li key={index} className="ml-5 list-disc" dangerouslySetInnerHTML={{ __html: processedLine.substring(2) }} />;
        }

        return <p key={index} className="my-2" dangerouslySetInnerHTML={{ __html: processedLine }} />;
      })}
    </div>
  );
};

// Component to render code blocks separately for better styling
const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
    return (
        <div className="bg-gray-900 rounded-md my-4 overflow-hidden border border-gray-700">
          <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-sans">
            Code Example
          </div>
          <pre className="p-4 text-sm overflow-x-auto">
            <code className="font-mono text-gray-200">{code}</code>
          </pre>
        </div>
    );
};


export const SolutionOutput: React.FC<SolutionOutputProps> = ({ solutions, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return (
        <div className="text-center text-red-400 bg-red-900/50 border border-red-700 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">An Error Occurred</h3>
          <p>{error}</p>
        </div>
      );
    }
    if (!solutions) {
      return (
        <div className="text-center text-gray-500 p-10">
          <p>Your solutions will appear here.</p>
        </div>
      );
    }
    
    // Split content into regular text and code blocks
    const parts = solutions.split(/```[\w]*\n/);
    
    return parts.map((part, index) => {
        if (index % 2 === 1) { // Odd indexes are code blocks
          const codeContent = part.replace(/```$/, '').trim();
          return <CodeBlock key={index} code={codeContent} />;
        } else { // Even indexes are regular text
          return <MarkdownRenderer key={index} content={part} />;
        }
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 min-h-[200px] w-full prose prose-invert prose-sm md:prose-base max-w-none">
       <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-gray-100 prose-li:text-gray-300">
         {renderContent()}
       </div>
    </div>
  );
};
