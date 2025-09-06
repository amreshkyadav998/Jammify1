import { createContext, useReducer, useEffect } from 'react';

const initialSongs = [
  { id: 1, title: 'Song A', artist: 'Artist X', album: 'Album 1' },
  { id: 2, title: 'Song B', artist: 'Artist Y', album: 'Album 2' },
  { id: 3, title: 'Song C', artist: 'Artist X', album: 'Album 1' },
];

const songsReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.payload;
    case 'ADD_SONG':
      return [...state, { id: Date.now(), ...action.payload }];
    case 'DELETE_SONG':
      return state.filter((song) => song.id !== action.payload);
    default:
      return state;
  }
};

export const SongsContext = createContext();

export const SongsProvider = ({ children }) => {
  const [songs, dispatch] = useReducer(songsReducer, []);

  useEffect(() => {
    const savedSongs = localStorage.getItem('songs');
    if (savedSongs) {
      dispatch({ type: 'INITIALIZE', payload: JSON.parse(savedSongs) });
    } else {
      dispatch({ type: 'INITIALIZE', payload: initialSongs });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('songs', JSON.stringify(songs));
  }, [songs]);

  return (
    <SongsContext.Provider value={{ songs, dispatch }}>
      {children}
    </SongsContext.Provider>
  );
};