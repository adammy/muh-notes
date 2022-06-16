import { useEffect } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '@/core/hooks';
import Editor from '@/editor/component';
import Notebooks from '@/notebooks/component';
import { getAll as getAllNotebooks } from '@/notebooks/repository';
import { load as loadNotebooks } from '@/notebooks/slice';
import Notes from '@/notes/component';
import { getAll as getAllNotes } from '@/notes/repository';
import { load as loadNotes } from '@/notes/slice';

const AppWrapper = styled.div`
	display: flex;
`;

const NotebooksWrapper = styled.div`
	width: 240px;
	flex-shrink: 0;
`;

const NotesWrapper = styled.div`
	width: 320px;
	flex-shrink: 0;
`;

const EditorWrapper = styled.div`
	background: #fff;
	width: calc(100vw - 560px);
`;

export default function App(): JSX.Element {
	const dispatch = useAppDispatch();
	
	const notebooks = useAppSelector(state => state.notebooks.notebooks);
	const activeNotebook = notebooks.find(notebook => notebook.active) || notebooks[0];
	const notes = useAppSelector(state => state.notes.notes)
		.filter(note => note.notebookId === activeNotebook?.id);
	const activeNote = notes.find(note => note.active);

	useEffect(() => {
		async function getNotebooks() {
			const notebooks = await getAllNotebooks();
			dispatch(loadNotebooks(notebooks));
		}
		getNotebooks();
	}, [dispatch]);

	useEffect(() => {
		async function getNotes() {
			const notes = await getAllNotes();
			dispatch(loadNotes(notes));
		}
		getNotes();
	}, [dispatch]);

  return (
    <>
			{/* {notebooks.length > 0 &&  */}
				<AppWrapper>
					<NotebooksWrapper>
						<Notebooks notebooks={notebooks} />
					</NotebooksWrapper>
					<NotesWrapper>
						<Notes notebook={activeNotebook} notes={notes} />
					</NotesWrapper>
					<EditorWrapper>
						<Editor note={activeNote!}></Editor>
					</EditorWrapper>
				</AppWrapper>
			{/* } */}
			{notebooks.length <= 0 && <div>Empty State</div>}
    </>
  );
}
