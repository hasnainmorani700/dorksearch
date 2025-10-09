import React, { useState, useEffect } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

interface ResultCardProps {
  query: string;
  searchEngine: string;
}

const searchEngineUrls: Record<string, string> = {
    Google: 'https://www.google.com/search?q=',
    Googol: 'https://googol.leegd.workers.dev/search?q=',
    Startpage: 'https://www.startpage.com/sp/search?query=',
    Searx: 'https://searx.be/search?q=',
    FilePursuit: 'https://filepursuit.com/pursuit?q='
};


const ResultCard: React.FC<ResultCardProps> = ({ query, searchEngine }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setIsCopied(false);
  }, [query]);

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSearch = () => {
    const baseUrl = searchEngineUrls[searchEngine] || searchEngineUrls.Google;
    const searchUrl = `${baseUrl}${encodeURIComponent(query)}`;
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mt-16 p-8 bg-slate-800 border border-slate-700 rounded-xl w-full max-w-5xl mx-auto animate-fade-in shadow-xl">
      <h3 className="text-lg font-semibold text-slate-400 mb-4">Generated Dork:</h3>
      <div className="bg-slate-900 p-6 rounded-lg text-slate-200 font-mono text-xl break-all select-all border border-slate-700">
        {query}
      </div>
      <div className="mt-8 flex flex-col sm:flex-row gap-6">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-3 bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium py-4 px-8 rounded-lg transition-colors duration-200 border border-slate-600 text-lg"
        >
          {isCopied ? <CheckIcon className="h-7 w-7 text-green-400" /> : <CopyIcon className="h-7 w-7" />}
          <span>{isCopied ? 'Copied!' : 'Copy to Clipboard'}</span>
        </button>
        <button
          onClick={handleSearch}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 text-lg shadow-md hover:shadow-lg"
        >
          <ExternalLinkIcon className="h-7 w-7" />
          <span>Search on {searchEngine}</span>
        </button>
      </div>
    </div>
  );
};

export default ResultCard;