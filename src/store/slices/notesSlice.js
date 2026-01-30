import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_URL = `${BASE_URL}/notes`;

// Async Thunks
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addNote = createAsyncThunk('notes/addNote', async (initialNote) => {
  const response = await axios.post(API_URL, initialNote);
  return response.data;
});

export const updateNote = createAsyncThunk('notes/updateNote', async ({ id, note }) => {
  const response = await axios.put(`${API_URL}/${id}`, note);
  return response.data;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Notes
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add Note
      .addCase(addNote.fulfilled, (state, action) => {
        if (action.payload.note) {
          state.notes.push(action.payload.note);
        }
      })
      // Update Note
      .addCase(updateNote.fulfilled, (state, action) => {
        const updatedNote = action.payload.note;
        if (updatedNote) {
          const index = state.notes.findIndex((note) => note._id === updatedNote._id);
          if (index !== -1) {
            state.notes[index] = updatedNote;
          }
        }
      })
      // Delete Note
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note._id !== action.payload);
      });
  },
});

export default notesSlice.reducer;