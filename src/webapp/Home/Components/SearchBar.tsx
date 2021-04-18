import React from 'react';
import { TextField, Dropdown } from 'glints-aries';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';

import { Colors } from '@/Constants/styles';
import { getSearch, getSearchWithDate } from '@/Redux/Reducers/results';

const SearchBar = () => {
  const [strQuery, setStrQuery] = React.useState('t');
  const [dateQuery, setDateQuery] = React.useState<Date>(null);
  const dispatch = useDispatch();

  const debouncedSearchQuery = React.useRef(
    debounce(
      (strQ, dateQ) => {
        if (!strQ) {
          return;
        }
        if (dateQ) {
          dispatch(getSearchWithDate({ strQ, dateQ }));
        }
        dispatch(getSearch(strQ));
      },
      1000,
      { trailing: true }
    )
  );
  React.useEffect(() => {
    debouncedSearchQuery.current(strQuery, dateQuery);
  }, [strQuery, dateQuery]);

  return (
    <div
      style={{
        background: Colors.compliment,
        display: 'flex',
        color: Colors.primary,
        paddingLeft: '12px',
        paddingRight: '12px',
      }}
    >
      <div style={{ alignSelf: 'center' }}>
        <DatePicker
          dateFormat="MMMM d, yyyy h:mm aa"
          selected={dateQuery}
          showTimeSelect
          onChange={(event: Date) => setDateQuery(event)}
        />
      </div>
      <div style={{ flex: 1, alignSelf: 'center' }}>
        <TextField
          allowClear
          removeFloatingLabel
          label="Restaurant Name"
          type="text"
          startIcon={<FontAwesomeIcon icon={faSearch} style={{ color: Colors.primary }} />}
          onChange={event => setStrQuery(event.target.value)}
          value={strQuery}
        />
      </div>
    </div>
  );
};
export default SearchBar;
