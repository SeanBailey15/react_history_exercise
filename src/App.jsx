import { useState } from "react";
import JokeList from "./components/JokeList";

const App = () => {
  const [fetchedJokes, setFetchedJokes] = useState([]);
  const [seenJokes, setSeenJokes] = useState(new Set());

  return (
    <>
      <div>
        <JokeList
          fetchedJokes={fetchedJokes}
          setFetchedJokes={setFetchedJokes}
          seenJokes={seenJokes}
          setSeenJokes={setSeenJokes}
        />
      </div>
    </>
  );
};

export default App;
