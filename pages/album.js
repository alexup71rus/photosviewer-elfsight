import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Albums } from '../components/Albums';
import { getPhoto, getAlbums, getPhotos } from '../apis';
import { getUsers } from '../apis';
import { ImageBlock } from '../components/ImageBlock';
import { Popup } from '../components/Popup';

export class AlbumPage extends Component {
  constructor(props) {
    super(props);
    const self = this;
    this.state = {
      albumId: this.props.routeLocation.match.params[0],
      album: {},
      popupImageId: 0,
      images: []
    }

    getAlbums(this.state.albumId)
    .then(album => {
      this.setState({album: album[0]});
      getPhotos(album[0].uid, {album_id: this.state.albumId})
      .then(images => {
        this.setState({images: images});
      });
    });

    document.onkeyup = function (e) {
      console.log(e.key, e.code);
      if (e.key == "Escape" || e.code == "Escape") {
        self.props.routeLocation.history.push('?');
      } else if (e.key === 'ArrowRight' && e.code === 'ArrowRight') {

      } else if (e.key === 'ArrowLeft' && e.code === 'ArrowLeft') {

      }
    }
  }

  componentDidUpdate() {
    if (this.props.routeLocation.location.search) {
      const chunk = this.props.routeLocation.location.search.match(/\image=(\d)/);
      if (chunk[0] && chunk[1] > 0 && (this.state.popupImageId === 0 || this.state.popupImageId !== chunk[1])) {
        this.setState({popupImageId: chunk[1]});
      } else if (!chunk && this.state.popupImageId !== 0) {
        this.setState({popupImageId: 0});
      }
    }
  }

  render() {
    return (
      <div>
        {
          this.props.routeLocation.location.search && this.state.popupImageId > 0 ?
            <Popup
              image={this.state.images.filter(image => {
                if (image.id === +this.state.popupImageId) {
                  return image;
                }
              })}
              routeLocation={this.props.routeLocation}
              /> :
            null
        }
        <Link to={this.state.album.uid ? `/id${this.state.album.uid}` : '/'}>Назад</Link>
        <h1>Album {this.state.album.name}</h1>
        <ImageBlock images={this.state.images} />
      </div>
    );
  }
}

