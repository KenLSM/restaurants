import React from 'react';
import { useSelector } from 'react-redux';
import RestaurantRow from '@/Components/RestaurantRow';
import FilterBar from './Components/FilterBar';
import type { RootStore } from '@/Redux/Reducers';

const Collection = () => {
  const item = useSelector((state: RootStore) => {
    console.log(state);
    return state.results.results;
  });
  const itemLength = item.length;

  console.log({ item });

  return (
    <>
      <div>
        <FilterBar />
      </div>
      <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
        <h2>Total Collection entries: {itemLength}</h2>
        {item.map(datum => (
          <RestaurantRow key={datum.id} data={datum} />
        ))}
      </div>
    </>
  );
};

export default Collection;
