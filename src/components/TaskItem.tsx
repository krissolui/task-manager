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
		<tr key={id} className="text-danger">
			<td>{title}</td>
			<td>{category}</td>
			<td>{new Date(dueTime).toLocaleString()}</td>
			<td className="w-100 d-inline-flex gap-3 justify-content-evenly">
				<Button
					className="btn-success border-0"
					onClick={() => completeTask(id)}
				>
					&#10003;
				</Button>
				<Button
					className="btn-danger border-0"
					onClick={() => deleteTask(id)}
				>
					&#10005;
				</Button>
			</td>
		</tr>
	);
};

export default TaskItem;
