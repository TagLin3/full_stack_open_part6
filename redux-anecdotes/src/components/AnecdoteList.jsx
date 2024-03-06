import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, voteFor }) => (
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has
      {" "}
      {anecdote.votes}
      <button type="button" onClick={() => voteFor(anecdote.id)}>vote</button>
    </div>
  </div>
);

const AnecdoteList = () => {
  const anecdotesToShow = useSelector(({ anecdotes, filter }) => anecdotes.filter(
    (a) => a.content.toLowerCase().includes(filter.toLowerCase()),
  ));
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(addVote(anecdote));
    dispatch(setNotificationWithTimeout(`you voted for "${anecdote.content}"`, 5));
  };

  return (
    <div>
      {anecdotesToShow.toSorted((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            voteFor={() => vote(anecdote)}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
