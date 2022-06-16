import { db } from '@/core/db';
import { Notebook } from '@/notebooks/models';

export async function getAll(): Promise<Notebook[]> {
	return await db.transaction('r', db.notebooks, async() => {
		const notebooks = await db.notebooks.toArray();
		return notebooks.map(notebook => ({
			...notebook,
			active: (notebook.active === 1) ? true : false 
		}));
	});
}

export async function select(id: string): Promise<void> {
	db.transaction('rw', db.notebooks, async() => {
		db.notebooks.where('active').equals(1).modify({ active: 0 });
		db.notebooks.where('id').equals(id).modify({ active: 1 });
	});
}

export async function create(notebook: Notebook): Promise<void> {
	const notebookDb = { 
		...notebook,
		active: notebook.active ? 1 : 0 
	};
	db.transaction('rw', db.notebooks, async() => {
		db.notebooks.where('active').equals(1).modify({ active: 0 });
		db.notebooks.add(notebookDb);
	});
}

export async function remove(id: string): Promise<void> {
	db.transaction('rw', db.notebooks, async() => {
		db.notebooks.where('id').equals(id).delete();
	});
}

export async function update(notebook: Notebook): Promise<void> {
	const notebookDb = { 
		...notebook,
		active: notebook.active ? 1 : 0 
	};
	db.transaction('rw', db.notebooks, async() => {
		db.notebooks.where('id').equals(notebook.id).modify(notebookDb);
	});
}
