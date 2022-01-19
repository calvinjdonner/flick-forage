import React, { useState } from "react";
import styled from "styled-components";
import Movies from './components/movie.js';
import MovieInfoComponent from './components/movieInfo.js';
import axios from "axios";

export const API_KEY = '2f2afafe';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  color: white;
  align-items: center;
  padding: 10px;
  font-size: 40px;
  box-shadow: 0 3px 6px 0 #555;
  font-family: 'Limelight', cursive;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  align-items: center;

`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  gap: 24px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();


  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
      );
      updateMovieList(response.data.Search)
  };
  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout)
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/movie-icon.png" />
          Flick Forage
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.png" />
          <SearchInput 
            placeholder="Forage..."
            value={searchQuery} 
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <Movies 
              key={index} 
              movie={movie} 
              onMovieSelect={onMovieSelect} 
            />
          ))
          ) : ( 
            <Placeholder src="movie-icon.png" />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
