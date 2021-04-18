import React from 'react';
import { useSelector } from 'react-redux';
import type { RootStore } from '@/Redux';

const FilterBar = () => {
  const user = useSelector((state: RootStore) => state.user);
  const firstName = user.firstName;
  return (
    <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
      <p>Hello: {firstName}</p>
    </div>
  );
};

export default FilterBar;
