import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { SearchParams } from '../App';

interface SearchFormProps {
  onSearch: (params: Omit<SearchParams, 'dork'>) => void;
}

const filetypeOptions = [
    { value: '', label: 'Choose Filetype' },
    { value: 'mkv', label: 'MKV Video' },
    { value: 'mp4', label: 'MP4 Video' },
    { value: 'avi', label: 'AVI Video' },
    { value: 'pdf', label: 'PDF Document' },
    { value: 'iso', label: 'ISO Image' },
    { value: 'zip', label: 'ZIP Archive' },
    { value: 'rar', label: 'RAR Archive' },
    { value: 'mp3', label: 'MP3 Audio' },
];

const searchEngineOptions = [
    { value: 'Google', label: 'Google' },
    { value: 'Googol', label: 'Googol' },
    { value: 'Startpage', label: 'Startpage' },
    { value: 'Searx', label: 'Searx' },
    { value: 'FilePursuit', label: 'FilePursuit' },
];

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [filetype, setFiletype] = useState('');
  const [searchEngine, setSearchEngine] = useState('Google');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, filetype, searchEngine });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto">
      <div className="flex items-center w-full h-20 border border-slate-700 rounded-full hover:border-slate-600 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-cyan-500 transition-all duration-300 bg-slate-800 shadow-lg">
        
        <div className="relative h-full">
            <select
                value={filetype}
                onChange={(e) => setFiletype(e.target.value)}
                className="h-full pl-8 pr-12 text-lg text-slate-300 bg-transparent rounded-l-full appearance-none focus:outline-none cursor-pointer border-r border-slate-700"
                aria-label="Choose Filetype"
            >
                {filetypeOptions.map(opt => (
                     <option key={opt.value} value={opt.value} className="bg-slate-800 text-slate-200">{opt.label}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-slate-400">
                <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>

        <div ref={dropdownRef} className="relative h-full">
            <button
                type="button"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center h-full pl-6 pr-5 border-r border-slate-700 text-lg text-slate-300 hover:bg-slate-700/50"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
            >
                <SearchIcon className="h-6 w-6 mr-3 flex-shrink-0" />
                <span className="whitespace-nowrap">{searchEngine}</span>
                <svg className="ml-2.5 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10 py-3">
                    {searchEngineOptions.map(opt => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                                setSearchEngine(opt.value);
                                setDropdownOpen(false);
                            }}
                            className="block w-full text-left px-6 py-3 text-lg text-slate-200 hover:bg-slate-700"
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>


        <div className="flex-grow h-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything e.g The.Blacklist.S01.E01"
            className="w-full h-full px-8 text-xl text-slate-100 placeholder-slate-500 focus:outline-none bg-transparent"
            required
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center w-24 h-full text-slate-400 rounded-r-full hover:bg-cyan-600 hover:text-white focus:outline-none focus:bg-cyan-600 focus:text-white transition-colors duration-300"
          aria-label="Search"
        >
          <SearchIcon className="h-8 w-8" />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;