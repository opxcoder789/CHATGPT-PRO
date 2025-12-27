import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyIcon, CheckIcon } from './Icons';

interface MarkdownRendererProps {
  content: string;
}

const CodeBlock = ({ language, children }: { language: string, children: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(children);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="rounded-xl overflow-hidden border border-[#424242]/50 my-5 w-full max-w-[calc(100vw-4rem)] md:max-w-full shadow-md">
            <div className="bg-[#2F2F2F] px-4 py-2.5 flex justify-between items-center border-b border-[#424242]/50">
                <span className="text-xs text-gray-400 font-sans font-medium lowercase tracking-wide">{language}</span>
                <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                >
                    {isCopied ? <CheckIcon className="w-3.5 h-3.5 text-green-400" /> : <CopyIcon className="w-3.5 h-3.5" />}
                    {isCopied ? "Copied!" : "Copy code"}
                </button>
            </div>
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                <SyntaxHighlighter
                    style={oneDark}
                    language={language || 'text'}
                    PreTag="div"
                    customStyle={{ 
                        margin: 0, 
                        padding: '1.5rem', 
                        background: '#171717', 
                        fontSize: '0.875rem',
                        lineHeight: '1.7',
                        fontFamily: 'monospace',
                        minWidth: '100%' 
                    }}
                    codeTagProps={{
                        style: { fontFamily: 'monospace' }
                    }}
                >
                    {children}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-invert prose-base max-w-none text-gray-100 prose-p:text-gray-200 prose-p:leading-7 prose-headings:text-gray-50 prose-headings:font-semibold prose-strong:text-white prose-li:text-gray-200 prose-ol:text-gray-200 prose-ul:text-gray-200 prose-blockquote:text-gray-400 font-['Inter'] w-full min-w-0 break-words overflow-hidden">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => <a {...props} className="text-blue-400 hover:text-blue-300 hover:underline transition-colors" target="_blank" rel="noopener noreferrer" />,
          code: ({ node, inline, className, children, ...props }: any) => {
             const match = /language-(\w+)/.exec(className || '');
             return !inline && match ? (
               <CodeBlock language={match[1]}>
                   {String(children).replace(/\n$/, '')}
               </CodeBlock>
             ) : (
                inline ? 
               <code className="bg-[#383838] text-gray-200 px-1.5 py-0.5 rounded text-[0.9em] font-mono whitespace-pre-wrap break-all border border-white/5" {...props}>{children}</code>
               : 
               <CodeBlock language="text">
                   {String(children).replace(/\n$/, '')}
               </CodeBlock>
             )
          },
          ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4 text-gray-200 space-y-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4 text-gray-200 space-y-2" {...props} />,
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white break-words border-b border-white/10 pb-2" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-white break-words" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3 text-white break-words" {...props} />,
          p: ({node, ...props}) => <p className="mb-4 text-gray-200 leading-7 break-words" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-600 pl-4 py-1 italic text-gray-400 my-6 break-words bg-[#2F2F2F]/30 rounded-r-lg" {...props} />,
          table: ({node, ...props}) => <div className="overflow-x-auto my-6 border border-[#424242] rounded-xl shadow-sm"><table className="min-w-full divide-y divide-[#424242]" {...props} /></div>,
          th: ({node, ...props}) => <th className="px-4 py-3 bg-[#2F2F2F] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider" {...props} />,
          td: ({node, ...props}) => <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200 border-t border-[#333]" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;