import { PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

import { CreateNotebook, Notebook, NotebooksState, UpdateNotebook } from "@/notebooks/models";
import * as repository from '@/notebooks/repository';

export function load(state: NotebooksState, action: PayloadAction<Notebook[]>) {
	state.notebooks = sortNotebooks(action.payload);
}

export function select(state: NotebooksState, action: PayloadAction<string>) {
	state.notebooks = state.notebooks
		.map(notebook => ({
			...notebook,
			active: notebook.id === action.payload
		}));
	repository.select(action.payload);
}

export function create(state: NotebooksState, action: PayloadAction<CreateNotebook>) {
	const newNotebook: Notebook = {
		id: v4(),
		active: true,
		...action.payload
	};
	const notebooks = state.notebooks.map(notebook => ({
		...notebook,
		active: false
	}));
	state.notebooks = sortNotebooks([...notebooks, newNotebook]);
	repository.create(newNotebook);
}

export function remove(state: NotebooksState, action: PayloadAction<string>) {
	state.notebooks = state.notebooks.filter(notebook => notebook.id !== action.payload);
	repository.remove(action.payload);
}

export function update(state: NotebooksState, action: PayloadAction<UpdateNotebook>) {
	let revisedNotebook: Notebook | undefined;
	const notebooks = state.notebooks.map(notebook => {
		if (notebook.id === action.payload.id) {
			revisedNotebook = { ...notebook, ...action.payload };
			return revisedNotebook;
		}
		return notebook;
	});
	state.notebooks = sortNotebooks(notebooks);
	if (revisedNotebook) {
		repository.update(revisedNotebook);
	}
}

function sortNotebooks(notebooks: Notebook[]): Notebook[] {
	return notebooks.sort((a, b) => {
		return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
	});
}
