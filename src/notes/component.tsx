import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceToNow } from 'date-fns';

import { lightAlternate, negativeLight } from '@/core/colors';
import { Panel, Title } from '@/core/components/panel';
import { useAppDispatch } from "@/core/hooks";
import { Notebook } from '@/notebooks/models';
import { Note } from '@/notes/models';
import { create, select } from '@/notes/slice';
import { Add, LastUpdated, Name, NoteItem, Preview } from '@/notes/styled';

type Props = {
	notebook?: Notebook;
	notes?: Note[];
}

export default function Notes({ notebook, notes }: Props): JSX.Element {
	const dispatch = useAppDispatch();

	return (
		<>
			{notebook && notes &&
				<Panel backgroundColor={lightAlternate} textColor={negativeLight}>
					<Title>Notes in {notebook.name} ({notes.length})</Title>
					{notes.map(note => 
						<NoteItem key={note.id} active={note.active} onClick={() => dispatch(select({ id: note.id, notebookId: notebook.id}))}>
							<Name>{note.name}</Name>
							<LastUpdated>{formatDistanceToNow(note.datetimeUpdated)} ago</LastUpdated>
							<Preview>{note.preview}</Preview>
						</NoteItem>
					)}
					<Add onClick={() => {
						const name = window.prompt('Name your new note:');
						if (name) {
							dispatch(create({ notebookId: notebook?.id, name }));
						}
					}}>
						<FontAwesomeIcon icon={faPlusCircle} /> Add a Note
					</Add>
				</Panel>
			}
		</>
	);
}
