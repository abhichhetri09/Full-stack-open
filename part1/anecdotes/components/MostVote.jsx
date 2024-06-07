const MostVote = ({ anecdotes, vote }) => {
  const mostVotedIndex = vote.indexOf(Math.max(...vote));

  // Retrieve the most voted anecdote using the index
  const mostVotedAnecdote = anecdotes[mostVotedIndex];
  return (
    <div>
      <h1>Anectode with most votes</h1>
      <p>{mostVotedAnecdote}</p>
    </div>
  );
};
export default MostVote;
