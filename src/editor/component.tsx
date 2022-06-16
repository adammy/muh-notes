import { Editor as DraftEditor } from 'draft-js';
import 'draft-js/dist/Draft.css';

import { useAppDispatch } from '@/core/hooks';
import { Name, Text, Wrapper } from '@/editor/styled';
import { Note } from '@/notes/models';
import { update } from '@/notes/slice';

type Props = {
	note?: Note;
}

export default function Editor({ note }: Props): JSX.Element {
	const dispatch = useAppDispatch();

	return (
		<>
		 {note &&
		 	<Wrapper>
				<Name>{note.name}</Name>
				<Text>
					<DraftEditor
						editorState={note.editorState}
						onChange={(state) => {
							dispatch(update({
								id: note.id,
								preview: state.getCurrentContent().getPlainText().substring(0, 100), 
								editorState: state
							}));
						}} />
				</Text>
			</Wrapper>
		 }
		</>
		
	);
}
