import axios from "axios";
import { useEffect, useState } from "react";
import Joke from "./Joke";
import GetMoreButton from "./GetMoreButton";

export default function JokeList({
  fetchedJokes,
  seenJokes,
  setFetchedJokes,
  setSeenJokes,
}) {
  const [isLoading, setIsLoading] = useState(true);

  let sortedJokes = [...fetchedJokes].sort((a, b) => b.votes - a.votes);

  async function getJokes() {
    let jokes = [];
    let duplicates = new Set(seenJokes);

    while (jokes.length < 5) {
      const res = await axios.get("https://icanhazdadjoke.com", {
        headers: { Accept: "application/json" },
      });
      const { ...joke } = res.data;

      if (!duplicates.has(joke.id)) {
        duplicates.add(joke.id);
        jokes.push({ ...joke, votes: 0 });
      } else {
        console.log("Duplicate Found");
      }
    }
    setFetchedJokes([...jokes]);
    setSeenJokes(new Set(duplicates));
    setIsLoading(false);
  }

  function vote(id, delta) {
    setFetchedJokes(
      fetchedJokes.map((joke) =>
        joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
      )
    );
  }

  useEffect(() => {
    function getJokesOnLoad() {
      getJokes();
    }
    getJokesOnLoad();
  }, []);

  return (
    <div>
      <div>
        <GetMoreButton getJokes={getJokes} />
      </div>
      <div>
        <ul>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            sortedJokes.map((joke) => (
              <Joke
                key={joke.id}
                id={joke.id}
                joke={joke.joke}
                votes={joke.votes}
                vote={vote}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
