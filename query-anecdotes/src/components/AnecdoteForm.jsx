import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = ({ newNoteMutation }) => {
  const [, notificationDispatch] = useContext(NotificationContext);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newNoteMutation.mutate({ content, votes: 0 });
    notificationDispatch({
      type: "SET",
      payload: `you created ${content}`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
