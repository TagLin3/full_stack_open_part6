import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    incrementVote(state, action) {
      return state.map((anecdote) => (anecdote.id === action.payload.id
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : anecdote));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, incrementVote, setAnecdotes } = anecdoteSlice.actions;

export const addAnecdote = (content) => async (dispatch) => {
  const createdAnecdote = await anecdoteService.createNew(content);
  dispatch(appendAnecdote(createdAnecdote));
};

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export const addVote = (anecdote) => async (dispatch) => {
  await anecdoteService.addVote(anecdote);
  dispatch(incrementVote(anecdote));
};

export default anecdoteSlice.reducer;
