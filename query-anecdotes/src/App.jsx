import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useReducer } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification, { notificationReducer } from "./components/Notification";
import { getAnecdotes, createAnecdote, voteForAnecdote } from "./requests";
import NotificationContext from "./NotificationContext";

const App = () => {
  const [notificationState, notificationDispatch] = useReducer(notificationReducer, null);

  const queryClient = useQueryClient();

  const newNoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
    onError: (error) => {
      notificationDispatch({
        type: "SET",
        payload: error.response.data.error,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
  });

  const voteMutation = useMutation({
    mutationFn: voteForAnecdote,
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueriesData(["anecdotes"], anecdotes.map(
        (anecdote) => (anecdote.id === votedAnecdote.id
          ? votedAnecdote
          : anecdote),
      ));
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
    notificationDispatch({
      type: "SET",
      payload: `you voted for ${anecdote.content}`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  if (result.isLoading) {
    return <div>loading anecdotes...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <NotificationContext.Provider value={[notificationState, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm newNoteMutation={newNoteMutation} />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has
              {" "}
              {anecdote.votes}
              <button type="button" onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default App;
