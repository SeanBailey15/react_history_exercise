export default function GetMoreButton({ getJokes }) {
  return (
    <div>
      <button onClick={() => getJokes()}>Get More Jokes</button>
    </div>
  );
}
