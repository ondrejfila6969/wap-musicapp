import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="w-xl p-2 h-10 rounded-full sonus-bg-linear-gradient flex items-center">
      <Search color="white" />
      <input
        type="text"
        placeholder="Invenire Sonus"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="ml-2 bg-transparent outline-none text-sm text-white placeholder-white w-full"
      />
    </div>
  );
}
