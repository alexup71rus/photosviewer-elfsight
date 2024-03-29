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
    this._isMounted = false;
    this.state = {
      albums: []
    }
  }

  componentDidMount() {
    this._isMounted = true;

    if (!this.state.albums.length) {
      this._isMounted && getAlbums(this.props.routeLocation.match.params[0]).then(albums => {
        this.setState({albums: albums});
        this.state.albums.forEach((album, i) => {
          this._isMounted && getPhotos(album.uid, {
            limit: 1,
            page: album.count
          }).then(image => {
            this._isMounted && this.setState(prevState => {
              prevState.albums[i].cover = imageVendor + image[0].url;
              return prevState;
            });
          });
        });
      });
    }    
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <Link to={`/`}>Назад</Link>
        <h1>Albums by {
          this.props.globalState.users.map(user => {
            if (user.id == this.props.routeLocation.match.params[0]) {
              return user.name;
            }
          })
        }</h1>
        <Albums albums={this.state.albums} />
      </div>
    );
  }
}
