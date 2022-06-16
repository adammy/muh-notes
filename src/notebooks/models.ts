export type Notebook = {
	id: string;
	name: string;
	active: boolean;
}

export type NotebookDB = {
	id: string;
	name: string;
	active: number;
}

export type CreateNotebook = {
	name: string;
}

export type UpdateNotebook = {
	id: string;
	name?: string;
}

export type NotebooksState = {
	notebooks: Notebook[];
}
