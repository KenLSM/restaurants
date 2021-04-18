import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RestaurantRow from '@/Components/RestaurantRow';
import FilterBar from './Components/FilterBar';
import LoginPanel from './Components/LoginPanel';
import type { RootStore } from '@/Redux';
import { getCollection } from '@/Redux/Reducers/user';

const Collection = () => {
  const user = useSelector((state: RootStore) => {
    return state.user;
  });
  // const item = useSelector((state: RootStore) => {
  //   return state.results.results;
  // });

  const item = user.collections;

  const dispatch = useDispatch();
  const itemLength = item.length;
  const isLoggedIn = user?.username;

  console.log({ item });
  React.useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCollection());
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <LoginPanel />;
  }

  return (
    <>
      <div>
        <FilterBar />
      </div>
      <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
        <h2>Total Collection entries: {itemLength}</h2>
        {item.map(datum => (
          // @ts-ignore
          <RestaurantRow key={datum.id} data={datum} />
        ))}
      </div>
    </>
  );
};

export default Collection;
