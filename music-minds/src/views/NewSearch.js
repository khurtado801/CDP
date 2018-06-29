import React, { Component } from 'react';
import axios from 'axios';
import "./index.css";

class NewSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bioResults: '',
            userInput: '',
            img_path: '',
            albumResults: '',
            alt: 'Artist Image'
        }
    }

    getRequest = (e) => {
        e.preventDefault()
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&artist=${this.state.userInput}&format=json`)
            .then((response) => {
                this.setState({
                    bioResults: response.data.artist.bio.content,
                    img_path: response.data.artist.image[5]["#text"]
                });
                this.clearInputs();
            })
            .catch((err) => console.error(err));
        axios.get(`http://www.theaudiodb.com/api/v1/json/195003/searchalbum.php?s=${this.state.userInput}`)
            .then((res) => {
                // console.log('res', res.data.album);
                // console.log('res', res.data.album.forEach());
                // console.log(JSON.stringify(res, [strAlbum, ], 2));
                this.data = res.data.album;
                this.data.forEach((item) => {
                    console.log("Found: Item", item)
                    console.log("Found Album: ", item.strAlbum)
                    console.log("Found Thumb: ", item.strAlbumThumb)
                })
            })
    };

    clearInputs = () => {
        this.setState({
            userInput: ''
        })
    };

    handleChange = (e) => {
        let { value } = e.target;
        this.setState((prevState) => {
            return { userInput: value }
        })
    };

    // displayAlbum = (strAlbum) => {
    //     return strAlbum.concat(strAlbum);
    // }

    render() {
        let { userInput, bioResults, img_path, albumResults } = this.state;
        return (
            <div className="component-wrapper">
                <h2>Start Your Search For Some Tasty Tunes</h2>
                <form onSubmit={this.getRequest}>
                    <fieldset>
                        <label>
                            <input onChange={this.handleChange} value={userInput} name="artist" type="text"/>
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
