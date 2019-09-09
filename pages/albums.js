import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Albums } from '../components/Albums';
import { getUsers, getAlbums, getPhotos } from '../apis';
import { imageVendor } from '../settings';

export class AlbumsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    }

    if (!this.state.albums.length) {
      getAlbums(this.props.routes.match.params[0]).then(albums => {
        this.setState({albums: albums});
        this.state.albums.forEach((album, i) => {
          getPhotos(album.uid, {
            limit: 1,
            page: album.count
          }).then(image => {
            this.setState(prevState => {
              prevState.albums[i].cover = imageVendor + image[0].url;
              return prevState;
            });
          });
        });
      });
    }
  }

  render() {
    return (
      <div>
        <Link to={`/`}>Назад</Link>
        <h1>Albums by {
          this.props.globalState.users.length ? this.props.globalState.users[this.props.routes.match.params[0]-1].name : "..."
        }</h1>
        <Albums albums={this.state.albums} />
      </div>
    );
  }
}
