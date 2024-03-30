import React, { useCallback, useState } from "react";

function SearchBar({onSearch }) {

    const [searchString, setSearchString] = useState('');

    const handleUserInput = (e) => {
        setSearchString(e.target.value);
    }

    const search = useCallback(()=>{
        onSearch(searchString);
    }, [onSearch, searchString])

    return (
        <div>
            <label htmlFor="trackSearch">Track Search</label>
            <input
                type='text'
                name='trackSearch'
                value={searchString}
                onChange={handleUserInput}
                id='trackSearch'></input>
            <button type='submit' onClick={search}>Search</button>
        </div>
    )
}

export default SearchBar;