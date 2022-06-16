import { createSlice } from '@reduxjs/toolkit';

import * as actions from '@/notebooks/actions';
import { NotebooksState } from '@/notebooks/models';

const initialState: NotebooksState = {
	notebooks: []
}

export const notebooksSlice = createSlice({
	name: 'notebooks',
	initialState,
	reducers: {
		load: actions.load,
		select: actions.select,
		create: actions.create,
		remove: actions.remove,
		update: actions.update
	}
});

export const { load, select, create, remove, update } = notebooksSlice.actions;

export default notebooksSlice.reducer;
