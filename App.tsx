import React, { useState, useCallback } from 'react';
import SearchForm from './components/SearchForm';
import ResultCard from './components/ResultCard';

export interface SearchParams {
  query: string;
  filetype: string;
  searchEngine: string;
}

const App: React.FC = () => {
  const [generatedDork, setGeneratedDork] = useState<string>('');
  const [searchEngine, setSearchEngine] = useState<string>('Google');

  const handleSearch = useCallback((params: SearchParams) => {
    const { query, filetype, searchEngine } = params;
    if (!query.trim()) {
      setGeneratedDork('');
      return;
    }

    const dorkParts = [
      `intitle:"index of" "${query.trim()}"`,
      filetype ? `filetype:${filetype}` : '',
      '-inurl:(jsp|pl|php|html|aspx|htm|cf|shtml)',
      '-inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|index-of|wallywashis|downloadmana)',
    ];
    
    const dork = dorkParts.filter(Boolean).join(' ');
    setGeneratedDork(dork);
    setSearchEngine(searchEngine);
  }, []);

  return (
    <div className="min-h-screen font-sans flex flex-col items-center justify-center p-8 sm:p-12">
      <main className="w-full max-w-5xl mx-auto flex flex-col items-center">
        <header className="text-center mb-16">
            <h1 className="font-thin" style={{fontSize: '10rem', letterSpacing: '-0.5rem', lineHeight: 1}}>
                <span style={{color: '#4285F4'}}>G</span>
                <span style={{color: '#EA4335'}}>o</span>
                <span style={{color: '#FBBC05'}}>o</span>
                <span style={{color: '#4285F4'}}>g</span>
                <span style={{color: '#34A853'}}>l</span>
                <span style={{color: '#EA4335'}}>e</span>
            </h1>
          <p className="mt-6 text-2xl text-slate-400">
            Get direct download links for almost anything.
          </p>
        </header>

        <div className="w-full">
          <SearchForm onSearch={handleSearch} />
          {generatedDork && <ResultCard query={generatedDork} searchEngine={searchEngine} />}
        </div>
      </main>
    </div>
  );
};

export default App;