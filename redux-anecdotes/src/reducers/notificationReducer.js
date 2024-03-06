import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    emptyNotification() {
      return null;
    },
  },
});

export const { setNotification, emptyNotification } = notificationSlice.actions;

export const setNotificationWithTimeout = (content, timeInSeconds) => async (dispatch) => {
  dispatch(setNotification(content));
  setTimeout(() => {
    dispatch(emptyNotification());
  }, timeInSeconds * 1000);
};

export default notificationSlice.reducer;
