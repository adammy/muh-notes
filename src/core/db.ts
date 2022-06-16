import Dexie, { Table } from "dexie";

import { NotebookDB } from "@/notebooks/models";
import { NoteDB } from '@/notes/models';

class NotesDatabase extends Dexie {
	notes!: Table<NoteDB>;
	notebooks!: Table<NotebookDB>

	constructor() {
		super('NotesDatabase');
		this.version(1).stores({
			notes: 'id,notebookId,name,preview,active,datetimeUpdated',
			notebooks: 'id,name,active'
		});
	}
}

export const db = new NotesDatabase();
