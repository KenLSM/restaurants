import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from 'glints-aries';

import FilterBar from './Components/FilterBar';
import LoginPanel from './Components/LoginPanel';
import type { RootStore } from '@/Redux';
import { getUserCollection } from '@/Redux/Reducers/collection';
import { newCollection } from '@/Redux/Reducers/collection';
import { debounce } from 'lodash';
import CollectionRow from './Components/CollectionRow';

const Collection = () => {
  const collectionState = useSelector((state: RootStore) => {
    return state.collection;
  });
  const userState = useSelector((state: RootStore) => {
    return state.user;
  });
  const [collectionName, setCollectionName] = React.useState('');

  const item = collectionState.collections;

  const dispatch = useDispatch();
  const itemLength = item.length;
  const isLoggedIn = userState?.username;

  React.useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserCollection());
    }
  }, [isLoggedIn]);

  const debouncedCreateCollection = React.useRef(
    debounce(
      value => {
        if (!value) {
          return;
        }
        dispatch(newCollection(value));
      },
      1000,
      { leading: true }
    )
  );

  if (!isLoggedIn) {
    return <LoginPanel />;
  }

  return (
    <>
      <div>
        <FilterBar />
      </div>
      <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
        <TextField
          allowClear
          removeFloatingLabel
          label="collectionName"
          onChange={event => setCollectionName(event.target.value)}
          type="text"
          value={collectionName}
        />
        <div style={{ marginTop: '12px' }}>
          <Button onClick={() => debouncedCreateCollection.current(collectionName)} variant="ghost">
            Create New Collection
          </Button>
        </div>
      </div>
      <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
        <h2>Total Collection entries: {itemLength}</h2>
        {collectionState.collections.map(datum => (
          <CollectionRow key={datum.id} data={datum} />
        ))}
      </div>
    </>
  );
};

export default Collection;
