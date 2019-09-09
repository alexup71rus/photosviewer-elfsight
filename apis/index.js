const vendor = "https://my-json-server.typicode.com/";

export const getUsers = (limit) => {
  return fetch(vendor + "alexup71rus/photosviewer-elfsight/users").then(res => res.json());
}

export const getPhotos = (album, limit) => {
  return fetch(vendor + "alexup71rus/photosviewer-elfsight/photos?uid=" + album).then(res => res.json());
}

export const getAllPhotos = (limit) => {
  return fetch(vendor + "alexup71rus/photosviewer-elfsight/photos").then(res => res.json());
}

export const getAlbums = (limit) => {
  return fetch(vendor + "alexup71rus/photosviewer-elfsight/albums").then(res => res.json());
}