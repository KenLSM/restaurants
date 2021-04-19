import { Colors } from '@/Constants/styles';
import { RootStore } from '@/Redux';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Row = ({ to, label }) => (
  <div style={{ padding: '12px' }}>
    <Link to={to}>{label}</Link>
  </div>
);

const SideBar = () => {
  const { selectedCollectionId } = useSelector((state: RootStore) => state.collection);

  return (
    <div style={{ width: '200px', background: Colors.auxiliary, minHeight: '100vh' }}>
      <Row to="/" label="Search" />
      <Row to="/collection" label={`My Collections: (${selectedCollectionId})`} />
    </div>
  );
};
export default SideBar;
