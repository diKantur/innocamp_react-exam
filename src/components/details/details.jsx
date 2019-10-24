import React from 'react';

const Details = ({ 
    title, director, actors, released, boxOffice, country, genre, runtime, plot, imdbRating, year, posterUrl 
}) => (
    <li className="item">
      <div className="description">
        <span className="title">{title}</span>
        <span className="director">{director}</span>
        <span className="actors">{actors}</span>
        <span className="released">{released}</span>
        <span className="boxOffice">{boxOffice}</span>
        <span className="country">{country}</span>
        <span className="genre">{genre}</span>
        <span className="runtime">{runtime}</span>
        <span className="plot">{plot}</span>
        <span className="imdbRating">{imdbRating}</span>
        <span className="year">{year}</span>
        <img src={posterUrl} alt={title}/>
      </div>
    </li>
  );

  export default Details;