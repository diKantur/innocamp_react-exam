import React from 'react';
import './item.css';
import Image from '../image/Image'

export default function Item ({ posterUrl, title, type, year, imdbID, onClick }) {

    return (
        <li className="item" onClick={onClick}>
            <span className="title">{`title: ${title}`}</span>
            <span className="year">{`year: ${year}`}</span>
            <div><a href={posterUrl} target='_blank' rel="noopener noreferrer"><Image src={posterUrl} alt={title} /></a></div>
        </li>
    )

};