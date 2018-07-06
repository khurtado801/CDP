import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

class NewSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bioResults: '',
            userInput: '',
            img_path: '',
            albumResults: '',
        };
    }

    getRequest = (e) => {
        let { userInput } = this.state;
        e.preventDefault();
        
        // Search results from query by artist name, bio and artist image returned
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&artist=${userInput}&format=json`)
            .then((response) => {
                this.setState({
                    bioResults: response.data.artist.bio.content,
                    img_path: response.data.artist.image[5]['#text']
                });
                this.clearInputs();
            })
            .catch((err) => console.error(err));

        // Search results from query by artist name, album name and album image returned
        axios.get(`http://www.theaudiodb.com/api/v1/json/195003/searchalbum.php?s=${userInput}`)
            .then((res) => {
                this.data = res.data.album;
                this.data.forEach((item) => {
                    // console.log('Found: Item1', item);
                    // console.log('Found Album1: ', item.strAlbum);
                    console.log('Found Thumb1: ', item.strAlbumThumb);
                });
                this.data.map((item, index) => {
                    console.log('Search1 Albums: ', item.strAlbum);
                });
                this.clearInputs();
            })
            .catch((err) => console.error('Err1: ', err));

        // Search results from query by artist name, album name and album image returned
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${userInput}&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&format=json`)
            .then((res) => {
                this.data = res.data.topalbums.album;
                // this.data.albumResults = this.data.albumResults || `{album: []}`;
                this.data.forEach((item) => {
                    // console.log('Found Item2: ', item);
                    console.log('Found Image2: ', item.image[3]['#text']);
                    // console.log('Found Album2: ', item.name);
                });
                this.data.map((item, index) => {
                    console.log('Search2 Albums: ', item.name);
                });
                this.clearInputs();
            })
            .catch((err) => console.error('Err2: ', err));

        // Search results from query by album name, returns album name and album image
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${userInput}&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&format=json`)
            .then((res) => {
                this.data = res.data.albummatches.album;
                this.data.forEach((item) => {
                    console.log('Found Item3: ', item);
                    console.log('Found Image3: ', item.image[3]['#text']);
                    console.log('Found Album3: ', item.name);
                });
                this.clearInputs();
            })
            .catch((err) => console.error('Err3: ', err));

        // Search results by artist name, returns release group ID to be used to find album
        axios.get(`http://musicbrainz.org/ws/2/release/?query=release:${userInput}&fmt=json`)
            .then((res) => {
                this.data = res.data.releases;
                this.data.forEach((item) => {
                    console.log('Found Item4: ', item);
                    console.log('Found Item4: ', item.id);
                });
                this.clearInputs();
            })
            .catch((err) => console.error('Err4: ', err));
    };

    clearInputs = () => {
        this.setState({
            userInput: ''
        });
    };

    handleChange = (e) => {
        let { value } = e.target;
        this.setState((prevState) => {
            return { userInput: value };
        });
    };

    render() {
        let { userInput, bioResults, img_path, albumResults } = this.state;
        return (
            <div className="component-wrapper">
                <h2>Start Your Search For Some Tasty Tunes</h2>
                <form onSubmit={this.getRequest}>
                    <fieldset>
                        <label>
                            <input onChange={this.handleChange} value={userInput} name="artist" type="text" />
                            <button type="submit">Search</button>
                        </label>
                    </fieldset>
                </form>
                <div>
                    <p>{bioResults}</p>
                    <img src={img_path} />
                    <p>{albumResults}</p>
                </div>
            </div>
        );
    }
}

export default NewSearch;
