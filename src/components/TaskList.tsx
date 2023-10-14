import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Task } from '../interfaces/task';

interface ITaskListProps {
	tasks: Task[];
	completeTask: (id: number) => void;
	deleteTask: (id: number) => void;
}

const TaskList = ({ tasks, completeTask, deleteTask }: ITaskListProps) => {
	return (
		<div>
			{tasks.length === 0 && <div>No task</div>}
			{tasks.length > 0 && (
				<Table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Category</th>
							<th>Due Time</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{tasks.map(({ id, title, dueTime, category }) => (
							<tr key={id}>
								<td>{title}</td>
								<td>{category}</td>
								<td>{dueTime.toLocaleString()}</td>
								<td>
									<Button onClick={() => completeTask(id)}>
										&#10003;
									</Button>
									<Button onClick={() => deleteTask(id)}>
										X
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default TaskList;
