export default function Joke({ id, joke, votes, vote }) {
  return (
    <div>
      <p>{votes}</p>
      <button onClick={(e) => vote(id, +1)}>Bump Up</button>
      <button onClick={(e) => vote(id, -1)}>Drop Down</button>
      <p>{joke}</p>
    </div>
  );
}
