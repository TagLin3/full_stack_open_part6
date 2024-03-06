import { useContext } from "react";
import NotificationContext from "../NotificationContext";

export const notificationReducer = (state, action) => {
  switch (action.type) {
  case "SET":
    return action.payload;
  case "CLEAR":
    return null;
  default:
    return state;
  }
};

const Notification = () => {
  const [state] = useContext(NotificationContext);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (state === null) {
    return null;
  }

  return (
    <div style={style}>{state}</div>
  );
};

export default Notification;
