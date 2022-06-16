import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';

import { db } from '@/core/db';
import { Note, NoteDB } from '@/notes/models';

export async function getAll(): Promise<Note[]> {
	return await db.transaction('r', db.notes, async() => {
		const notes = await db.notes.toArray();
		return notes.map(note => ({
			id: note.id,
			notebookId: note.notebookId,
			name: note.name,
			preview: note.preview,
			editorState: EditorState.createWithContent(convertFromRaw(note.content)),
			active: (note.active === 1) ? true : false,
			datetimeUpdated: note.datetimeUpdated
		}));
	});
}

export async function select(id: string, notebookId: string): Promise<void> {
	db.transaction('rw', db.notes, async() => {
		db.notes.where('notebookId').equals(notebookId).modify({ active: 0 });
		db.notes.where('id').equals(id).modify({ active: 1 });
	});
}

export async function create(note: Note): Promise<void> {
	const noteDb: NoteDB = {
		id: note.id,
		notebookId: note.notebookId,
		name: note.name,
		preview: note.preview,
		content: convertToRaw(note.editorState.getCurrentContent()),
		active: note.active ? 1 : 0,
		datetimeUpdated: note.datetimeUpdated
	};
	db.transaction('rw', db.notes, async() => {
		db.notes.where('notebookId').equals(note.notebookId).modify({ active: 0 });
		db.notes.add(noteDb);
	});
}

export async function remove(id: string): Promise<void> {
	db.transaction('rw', db.notes, async() => {
		db.notes.where('id').equals(id).delete();
	});
}

export async function update(note: Note): Promise<void> {
	const noteDb: NoteDB = {
		id: note.id,
		notebookId: note.notebookId,
		name: note.name,
		preview: note.preview,
		content: convertToRaw(note.editorState.getCurrentContent()),
		active: note.active ? 1 : 0,
		datetimeUpdated: note.datetimeUpdated
	};
	db.transaction('rw', db.notes, async() => {
		db.notes.where('id').equals(note.id).modify(noteDb);
	});
}
