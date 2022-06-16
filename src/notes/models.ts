import { EditorState, RawDraftContentState } from 'draft-js';

export type Note = {
	id: string;
	notebookId: string;
	name: string;
	preview: string;
	editorState: EditorState;
	active: boolean;
	datetimeUpdated: Date;
}

export type NoteDB = {
	id: string;
	notebookId: string;
	name: string;
	preview: string;
	content: RawDraftContentState;
	active: number;
	datetimeUpdated: Date;
}

export type SelectNote = {
	id: string;
	notebookId: string;
}

export type CreateNote = {
	notebookId: string;
	name: string;
}

export type UpdateNote = {
	id: string;
	notebookId?: string;
	name?: string;
	preview?: string;
	editorState?: EditorState;
}

export type NotesState = {
	notes: Note[];
}
