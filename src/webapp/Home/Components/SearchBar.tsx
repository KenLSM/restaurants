import React from 'react';
import { TextField } from 'glints-aries';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';

import { Colors } from '@/Constants/styles';
import { updateQuery, getSearch } from '@/Redux/Reducers/results';

const SearchBar = () => {
  const [query, setQuery] = React.useState('');
  const dispatch = useDispatch();

  const debouncedSetQuery = React.useRef(debounce(v => dispatch(updateQuery(v)), 500));
  const debouncedSearchQuery = React.useRef(
    debounce(v => {
      dispatch(getSearch());
      console.log('effect2');
    }, 500)
  );
  React.useEffect(() => {
    // debouncedSearchQuery.current(1);
    dispatch(getSearch());
    console.log('effect');
  }, [query]);

  return (
    <div style={{ background: Colors.compliment }}>
      <TextField
        allowClear
        removeFloatingLabel
        label="Restaurant Name"
        type="text"
        startIcon={<FontAwesomeIcon icon={faSearch} style={{ color: Colors.primary }} />}
        onChange={event => setQuery(event.target.value)}
        value={query}
      />
    </div>
  );
};
export default SearchBar;
