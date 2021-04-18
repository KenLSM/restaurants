import { Colors } from '@/Constants/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const Row = ({ to, label }) => (
  <div style={{ padding: '12px' }}>
    <Link to={to}>{label}</Link>
  </div>
);

const SideBar = () => {
  return (
    <div style={{ width: '200px', background: Colors.auxiliary, minHeight: '100vh' }}>
      <Row to="/" label="Search" />
      <Row to="/collection" label="My Collections" />
    </div>
  );
};
export default SideBar;
