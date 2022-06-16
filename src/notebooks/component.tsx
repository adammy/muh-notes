import { faEdit, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { negativeLight, secondary } from '@/core/colors';
import { Panel, Title } from '@/core/components/panel';
import { useAppDispatch } from '@/core/hooks';
import { Notebook } from '@/notebooks/models';
import { create, remove, select, update } from '@/notebooks/slice';
import { Action, Actions, Add, Name, NotebookItem } from '@/notebooks/styled';

type Props = {
	notebooks?: Notebook[];
}

export default function Notebooks({ notebooks }: Props): JSX.Element {
	const dispatch = useAppDispatch();

	return (
		<>
			{notebooks &&
				<Panel backgroundColor={secondary} textColor={negativeLight}>
					<Title>Notebooks ({notebooks.length})</Title>
					{notebooks.map(notebook => 
						<NotebookItem key={notebook.id} active={notebook.active} onClick={() => dispatch(select(notebook.id))}>
							<Name>{notebook.name}</Name>
							<Actions>
								<Action>
									<FontAwesomeIcon icon={faEdit} onClick={e => {
										e.stopPropagation();
										dispatch(update({ id: notebook.id, name: window.prompt(`Rename ${notebook.name} to:`) || notebook.name }))
									}} />
								</Action>
								<Action>
									<FontAwesomeIcon icon={faTrash} onClick={e => {
										e.stopPropagation();
										window.confirm(`Confirm you want to delete the ${notebook.name} notebook:`) && dispatch(remove(notebook.id))
									}} />
								</Action>
							</Actions>
						</NotebookItem>
					)}
					<Add onClick={() => {
						const name = window.prompt('Name your new notebook:');
						if (name) {
							dispatch(create({ name }));
						}
					}}>
						<FontAwesomeIcon icon={faPlusCircle} /> Add a Notebook
					</Add>
				</Panel>
			}
		</>
	);
}
