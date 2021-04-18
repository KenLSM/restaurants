import React from 'react';
import { TextField } from 'glints-aries';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';

import { Colors } from '@/Constants/styles';
import { updateQuery, getSearch } from '@/Redux/Reducers/results';

const SearchBar = () => {
  const [query, setQuery] = React.useState('ke');
  const dispatch = useDispatch();

  const debouncedSearchQuery = React.useRef(
    debounce(
      q => {
        if (!q) {
          return;
        }
        dispatch(getSearch(q));
      },
      1000,
      { trailing: true }
    )
  );
  React.useEffect(() => {
    debouncedSearchQuery.current(query);
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
