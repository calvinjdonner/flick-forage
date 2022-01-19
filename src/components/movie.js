import React from 'react'
import styled from "styled-components";

const MovieContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 280px;
    box-shadow: 0 2px 5px 0 #aaa;
    cursor: pointer;
`;

const CoverImage = styled.img`
    object-fit: cover;
    height: 362px;
`;

const MovieName = styled.span`
    font-size: 20px;
    font-family: 'Limelight', cursive;
    color: black;
    margin: 15px 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const InfoColumn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const MovieInfo = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: black;
    text-transform: capitalize;
`;

const Movies = (props) => {
    const { Title, Year, imdbID, Type, Poster } = props.movie;
    return (
        <MovieContainer onClick={() => props.onMovieSelect(imdbID)}>
            <CoverImage src={Poster}/>
            <MovieName>{Title}</MovieName>
            <InfoColumn>
                <MovieInfo>Year: {Year}</MovieInfo>
                <MovieInfo>Type: {Type}</MovieInfo>
            </InfoColumn>
        </MovieContainer>
    )
}

export default Movies
