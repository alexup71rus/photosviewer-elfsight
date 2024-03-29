import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { getPhotos } from '../apis';
import { imageVendor } from '../../settings';

export const Popup = ({image, routeLocation}) => {
  return <div className='modal'>
      <button className='close' onClick={ev => routeLocation.history.push('?')}>x</button>
      {
        image ?
          <img src={imageVendor + image.url} /> :
          <div className='loading-label'>Loading</div>
      }
    </div>;
  };