import { PayloadAction } from "@reduxjs/toolkit";
import { EditorState } from 'draft-js';
import { v4 } from "uuid";

import { CreateNote, Note, NotesState, SelectNote, UpdateNote } from '@/notes/models';
import * as repository from '@/notes/repository';

export function load(state: NotesState, action: PayloadAction<Note[]>) {
	state.notes = sortNotes(action.payload);
}

export function select(state: NotesState, action: PayloadAction<SelectNote>) {
	state.notes = state.notes
		.map(note => (
			note.notebookId === action.payload.notebookId ?
				{ ...note, active: note.id === action.payload.id} : note
		));
	repository.select(action.payload.id, action.payload.notebookId);
}

export function create(state: NotesState, action: PayloadAction<CreateNote>) {
	const newNote: Note = {
		id: v4(),
		notebookId: action.payload.notebookId,
		name: action.payload.name,
		preview: '',
		editorState: EditorState.createEmpty(),
		active: true,
		datetimeUpdated: new Date()
	};
	const notes = state.notes
		.map(note => (
			note.notebookId === action.payload.notebookId ?
				{ ...note, active: false } : note
		));
	state.notes = [newNote, ...notes];
	repository.create(newNote);
}

export function remove(state: NotesState, action: PayloadAction<string>) {
	state.notes = state.notes.filter(note => note.id !== action.payload);
	repository.remove(action.payload);
}

export function update(state: NotesState, action: PayloadAction<UpdateNote>) {
	let revisedNote: Note | undefined;
	const notes = state.notes.map(note => {
		if (note.id === action.payload.id) {
			revisedNote = { ...note, ...action.payload };
			return revisedNote;
		}
		return note;
});
	state.notes = sortNotes(notes);
	if (revisedNote) {
		repository.update(revisedNote);
	}
}

function sortNotes(notes: Note[]): Note[] {
	return notes.sort((a, b) => {
		return a.datetimeUpdated < b.datetimeUpdated ? -1 : 1;
	});
}
