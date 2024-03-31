import React, { useCallback, useState } from "react";

import "./SearchBar.css"

function SearchBar({ onSearch }) {

    const [searchString, setSearchString] = useState('');

    const handleUserInput = (e) => {
        setSearchString(e.target.value);
    }

    const search = useCallback(() => {
        onSearch(searchString);
    }, [onSearch, searchString])

    return (
        <div className='SearchBar'>
            <label htmlFor="trackSearch">Track Search</label>
            <input
                placeholder="Enter A Song Title"
                type='text'
                name='trackSearch'
                value={searchString}
                onChange={handleUserInput}
                id='trackSearch'></input>
            <button className='SearchButton' type='submit' onClick={search}>Search</button>
        </div>
    )
}

export default SearchBar;