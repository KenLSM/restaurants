import React from 'react';
import ItemRow from './Components/ItemRow';
import SearchBar from './Components/SearchBar';

const Home = () => {
    const itemLength = [].length;
    return (
        <>
            <div>
                <SearchBar />
            </div>
            <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
                <h2>Total entries: {itemLength}</h2>
                <ItemRow />
            </div>
        </>
    );
}

export default Home;