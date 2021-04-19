import React from 'react';
import { useSelector } from 'react-redux';
import RestaurantRow from '@/Components/RestaurantRow';
import SearchBar from './Components/SearchBar';
import type { RootStore } from '@/Redux';

const Home = () => {
  const item = useSelector((state: RootStore) => {
    return state.results.results;
  });
  const itemLength = item.length;

  return (
    <>
      <div>
        <SearchBar />
      </div>
      <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
        <h2>Total entries: {itemLength}</h2>
        {item.map(datum => (
          <RestaurantRow key={datum.id} data={datum} />
        ))}
      </div>
    </>
  );
};

export default Home;
