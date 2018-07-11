import React from 'react';

function SearchList(props) {
    let { strAlbum, name } = props;
    return (
        <div>
            <p>Album Name: {strAlbum}</p>
            <p>Album Name: {name}</p>
        </div>
    );
}

export default SearchList;
