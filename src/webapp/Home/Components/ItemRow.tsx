import React from 'react';
import { SearchRow } from '@/Redux/Reducers/results';
import { Colors } from '@/Constants/styles';

const ItemRow = ({ data }: { data: SearchRow }) => {
  console.log(data);
  const { name } = data;
  return (
    <div
      style={{
        flex: 1,
        background: Colors.auxiliary,
        marginTop: '1em',
        marginBottom: '1em',
        padding: '1em',
        border: `1px solid ${Colors.compliment}`,
        color: Colors.primary,
        borderRadius: '2px',
      }}
    >
      <span>{name} </span>
    </div>
  );
};

export default ItemRow;
