import React from 'react';

const SearchBar = () => {
  const [query, setQuery] = React.useState('');
  return (
    <div>
      <span>Search: </span>
    </div>
  );
};

export default SearchBar;
