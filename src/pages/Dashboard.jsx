// import { Suspense, lazy, useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import { SongsContext } from '../contexts/SongsContext'; // Import SongsContext

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const { songs, dispatch } = useContext(SongsContext);
//   const MusicLibrary = lazy(() => import('../../../music-library/src/MusicLibrary'));

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl mb-4">Music Library Dashboard</h1>
//       <Suspense fallback={<div>Loading Music Library...</div>}>
//         <MusicLibrary role={user.role} songs={songs} dispatch={dispatch} />
//       </Suspense>
//     </div>
//   );
// };

// export default Dashboard;


import { Suspense, lazy, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { SongsContext } from "../contexts/SongsContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { songs, dispatch } = useContext(SongsContext);
  const MusicLibrary = lazy(() =>
    import("music_library/MusicLibrary")
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          🎵 Music Library Dashboard
        </h1>
        <Suspense
          fallback={<div className="text-gray-600 dark:text-gray-400">Loading Music Library...</div>}
        >
          <MusicLibrary role={user.role} songs={songs} dispatch={dispatch} />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
