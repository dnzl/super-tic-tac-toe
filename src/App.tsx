import GameBoard from "./GameBoard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Super tic-tac-toe</h1>
        <h2>Rules:</h2>
        <ul>
          <li>Click on an empty child box</li>
          <li>
            Next player plays in the parent box corresponding to the position of
            the previous child
          </li>
          <li>
            Once you tic-tac-toe a parent box (by marking 3 child boxes in a
            row), you win that parent box
          </li>
          <li>
            If a player tics a child box and next player falls in a "won" box,
            then they can choose any available child box to play next
          </li>
          <li>
            First player to tic-tac-toe the game board (by winning 3 parent
            boxes in a row) wins the game
          </li>
        </ul>
      </header>
      <main>
        <GameBoard />
      </main>
    </div>
  );
}

export default App;
