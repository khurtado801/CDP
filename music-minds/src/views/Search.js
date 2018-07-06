import React, { Component } from 'react';
import axios from 'axios';


class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: '',
            userInput: '',
            img_path: '',
            // alt: 'Artist Image'
        };
    }

    getRequest = (e) => {
        e.preventDefault();
        // axios.get(`http://www.theaudiodb.com/api/v1/json/195003/search.php?s=crazy%p`)
        // axios.get(`http://www.theaudiodb.com/api/v1/json/195003/search.php?s=${this.state.artistQuery}`)
        // axios.get(`http://www.theaudiodb.com/api/v1/json/195003/search.php?s=${this.state.userInput}`)
            axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&artist=${this.state.userInput}&format=json`)
            .then((response) => {
                this.setState({
                    results: response.data.artist.bio.content,
                    img_path: response.data.artist.image[5]['#text']
                });
                this.clearInputs();
            })
            .catch((err) => console.error(err));
    };

    clearInputs = () => {
        this.setState({
            userInput: ''
        });
    }

    handleChange = (e) => {
        let { value } = e.target;
        this.setState((prevState) => {
            return { userInput: value };
        });
    }

    render() {
        let { userInput, results, img_path } = this.state;
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
                    <p>{results}</p>
                    <img src={img_path} />
                </div>
            </div>
        );
    }
}

export default SearchForm;
