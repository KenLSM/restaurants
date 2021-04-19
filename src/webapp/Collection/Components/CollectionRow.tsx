import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { Accordion } from 'glints-aries';

import { Colors } from '@/Constants/styles';
import { Collection, setCollectionId } from '@/Redux/Reducers/collection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootStore } from '@/Redux';
import { faCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';

const Restaurants = ({ restaurants }) => {
  return (
    <div>
      {restaurants.map(restaurant => (
        <div key={restaurant.id}>
          <p>
            <strong>{restaurant.name}</strong> <span>{restaurant.updatedAt}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

const CollectionRow = ({ data }: { data: Collection }) => {
  const dispatch = useDispatch();
  const { selectedCollectionId } = useSelector((state: RootStore) => state.collection);

  const handleToggleSelect = event => {
    event.stopPropagation();
    dispatch(setCollectionId(data.id));
  };

  const isActive = data.id === selectedCollectionId;
  return (
    <div
      style={{
        background: Colors.auxiliary,
        paddingLeft: '0.5em',
        paddingRight: '0.5em',
        marginBottom: '0.2em',
        border: `1px solid ${Colors.secondary}`,
        color: Colors.primary,
        borderRadius: '4px',
      }}
    >
      <Accordion iconPosition="right">
        <Accordion.Panel
          label={
            <>
              <FontAwesomeIcon
                onClick={handleToggleSelect}
                icon={isActive ? faCheckCircle : faCircle}
                style={{ color: 'red', marginRight: '12px' }}
              />
              <span>Collection Name:{data.name}</span>
              <br />
              <span style={{ fontSize: '12px' }}>{isActive ? 'Selected!' : ''}</span>
            </>
          }
          content={<Restaurants restaurants={data.Restaurants} />}
        />
      </Accordion>
    </div>
  );
};

export default CollectionRow;
