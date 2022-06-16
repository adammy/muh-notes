import { createSlice } from '@reduxjs/toolkit';

import * as actions from '@/notes/actions';
import { NotesState } from '@/notes/models';

const initialState: NotesState = {
	notes: []
};

export const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		load: actions.load,
		select: actions.select,
		create: actions.create,
		remove: actions.remove,
		update: actions.update
	}
});

export const { load, select, create, remove, update } = notesSlice.actions;

export default notesSlice.reducer;
