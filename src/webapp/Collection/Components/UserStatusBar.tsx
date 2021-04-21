import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'glints-aries';

import type { RootStore } from '@/Redux';
import { logout } from '@/Redux/Reducers/user';

const FilterBar = () => {
  const user = useSelector((state: RootStore) => state.user);
  const dispatch = useDispatch();
  const firstName = user.firstName;
  return (
    <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
      <p>
        Hello: {firstName} <button onClick={() => dispatch(logout())}>Logout</button>
      </p>
    </div>
  );
};

export default FilterBar;
