import { createContext, useReducer, useEffect } from "react";

const initialSongs = [
  { id: 1, title: "Ram Siya Ram", artist: "Sachet-Parampara", album: "Album Y", url: "/ramsiyaram.mp3", image: "https://c.saavncdn.com/215/Ram-Siya-Ram-Hindi-2021-20210222031001-500x500.jpg" },
  { id: 2, title: "Sapphire", artist: "Ed Sheeran", album: "Album X", url: "/Sapphire.mp3", image: "https://cdn.britannica.com/17/249617-050-4575AB4C/Ed-Sheeran-performs-Rockefeller-Plaza-Today-Show-New-York-2023.jpg?w=300" },
  { id: 3, title: "Song One", artist: "Ed Sheeran", album: "Album X", url: "/i_will_be_there_4_u.mp3", image: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFpbnxlbnwwfHwwfHx8MA%3D%3D" },
  // { id: 4, title: "Bulleya", artist: "Arijit Singh", album: "Album Y", url: "/bulleya.mp3", image: "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFpbnxlbnwwfHwwfHx8MA%3D%3D" },
  // { id: 5, title: "Song Three", artist: "Arijit Singh", album: "Album Z", url: "/i_will_be_there_4_u.mp3", image: "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFpbnxlbnwwfHwwfHx8MA%3D%3D" },
];

const songsReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case "ADD_SONG":
      return [...state, action.payload];
    case "DELETE_SONG":
      return state.filter((song) => song.id !== action.payload);
    default:
      return state;
  }
};

export const SongsContext = createContext();

export const SongsProvider = ({ children }) => {
  const [songs, dispatch] = useReducer(songsReducer, []);

  useEffect(() => {
  const stored = localStorage.getItem("songs");
  if (stored && JSON.parse(stored).length > 0) {
    dispatch({ type: "INITIALIZE", payload: JSON.parse(stored) });
  } else {
    dispatch({ type: "INITIALIZE", payload: initialSongs });
  }
}, []);


  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
  }, [songs]);

  return (
    <SongsContext.Provider value={{ songs, dispatch }}>
      {children}
    </SongsContext.Provider>
  );
};
