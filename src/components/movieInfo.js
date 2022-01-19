import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_KEY } from '../App';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 30px;
    justify-content: center;
    border-bottom: 1px solid lightgray;
`;

const CoverImage = styled.img`
    object-fit: cover;
    height: 352px;
`;

const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
`;

const MovieName = styled.span`
    font-size: 20px;
    font-family: 'Limelight', cursive;
    color: black;
    margin: 15px 0;
    white-space: nowrap;
    text-transform: capitalize;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const MovieInfo = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: black;
    overflow: hidden;
    margin: 4px 0;
    text-transform: capitalize;
    text-overflow: ellipsis;
`;

const Close = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: black;
    background: lightgray;
    height: fit-content;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
`

const MovieInfoComponent = (props) => {
    const [movieInfo, setMovieInfo] = useState();
    const { selectedMovie } = props;
    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
            .then((response) => setMovieInfo(response.data));
    }, [selectedMovie]);
    return (
        <Container>
            {movieInfo ? (
                <>
                    <CoverImage src={movieInfo?.Poster} />
                    <InfoColumn>
                        <MovieName>Title: {movieInfo?.Title}</MovieName>
                        <MovieInfo>
                            IMDb Rating: <span>{movieInfo?.Ratings[0].Value}</span>
                        </MovieInfo>
                        <MovieInfo>
                            Rotten Tomatoes Rating: <span>{movieInfo?.Ratings[1].Value}</span>
                        </MovieInfo>
                        <MovieInfo>
                            Metacritic Rating: <span>{movieInfo?.Ratings[2].Value}</span>
                        </MovieInfo>
                        <MovieInfo>
                            Director: <span>{movieInfo?.Director}</span>
                        </MovieInfo>
                        <MovieInfo>
                            Cast: <span>{movieInfo?.Actors}</span>
                        </MovieInfo>
                        <MovieInfo>
                            MPAA Rating: <span>{movieInfo?.Rated}</span>
                        </MovieInfo>
                        <MovieInfo>
                            Release Year: <span>{movieInfo?.Year}</span>
                        </MovieInfo>
                        <MovieInfo>
                            Box Office: <span>{movieInfo?.BoxOffice}</span>
                        </MovieInfo>
                        <MovieInfo>
                            Plot: <span>{movieInfo?.Plot}</span>
                        </MovieInfo>
                    </InfoColumn>
                    <Close onClick={() => props.onMovieSelect()}>X</Close>
                </>
            ) : (
                "Loading..."
            )}
        </Container>
    );
};
export default MovieInfoComponent;