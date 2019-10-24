import React, { useState } from 'react';
import './item.css';
import Image from '../image/Image'

export default function Item ({ posterUrl, title, type, year, imdbID, onClick }) {

    return (
        <li className="item" onclick={onClick}>
            <span className="title">{`title: ${title}`}</span>
            <span className="year">{`year: ${year}`}</span>
            <a href={posterUrl} target='_blank' rel="noopener noreferrer"><Image src={posterUrl} alt={title} /></a>
        </li>
    )
};