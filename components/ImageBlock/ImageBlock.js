import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { imageVendor } from '../../settings';

export const ImageBlock = (props) => <ul>
    {
      props.images.map(image => <li key={image.id}>
          <Link to={`?image=${image.id}`}>
            <img src={imageVendor + image.url} className='image-block' />
          </Link>
        </li>)
    }
  </ul>;