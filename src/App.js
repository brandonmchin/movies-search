import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import MovieRow from './MovieRow';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.search('');
  }

  search(searchQuery) {
    const apiKey = "817bc5b4c56cf9ca2760025cc158ed97";
    // const url = "https://api.themoviedb.org/3/movie/550?api_key=817bc5b4c56cf9ca2760025cc158ed97";
    const url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + searchQuery;
    axios.get(url)
    .then((result) => {
      console.log('Fetched data successfully');
      console.log(result);
      const results = result.data.results;
      let movieRows = [];
      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
        console.log(movie.title);
        const movieRow = <MovieRow key={movie.id} movie={movie}/>
        movieRows.push(movieRow);
      });

      this.setState({rows: movieRows});
    })
    .catch((error) => {
      console.error(error);
    });
    // axios.get(url, {
    //   params: {
    //     id: 12345
    //   }
    // })
  }

  searchHandler(event) {
    const searchQuery = event.target.value;
    this.search(searchQuery);
  }

  render() {
    return (
      <div>
        <table className="App-header">
          <tbody>
            <tr>
              <td>
                <img alt="app_icon" width="50" src="app_icon.png"/>
              </td>
              <td width="16"/>
              <td>
                <h1>The Movies DB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input className="search-bar" placeholder="Search" onChange={this.searchHandler.bind(this)}/>

        {this.state.rows}
        
      </div>
    );
  }
}

export default App;
