import Button from 'react-bootstrap/Button';
import { Task } from '../interfaces/task';

interface ITaskItemProps {
	task: Task;
	completeTask: (id: number) => void;
	deleteTask: (id: number) => void;
}

const TaskItem = ({ task, completeTask, deleteTask }: ITaskItemProps) => {
	const { id, title, category, dueTime } = task;

	return (
		<tr key={id}>
			<td>{title}</td>
			<td>{category}</td>
			<td>{new Date(dueTime).toLocaleString()}</td>
			<td>
				<Button onClick={() => completeTask(id)}>&#10003;</Button>
				<Button onClick={() => deleteTask(id)}>X</Button>
			</td>
		</tr>
	);
};

export default TaskItem;
