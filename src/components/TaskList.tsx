import Table from 'react-bootstrap/Table';
import { Task } from '../interfaces/task';
import TaskItem from './TaskItem';

interface ITaskListProps {
	tasks: Task[];
	completeTask: (id: number) => void;
	deleteTask: (id: number) => void;
}

const TaskList = ({ tasks, completeTask, deleteTask }: ITaskListProps) => {
	return (
		<div>
			<Table className="shadow">
				<thead>
					<tr>
						<th className="bg-dark-subtle">Title</th>
						<th className="bg-dark-subtle">Category</th>
						<th className="bg-dark-subtle">Due Time</th>
						<th className="bg-dark-subtle">Actions</th>
					</tr>
				</thead>
				<tbody>
					{tasks.length === 0 && (
						<tr>
							<td colSpan={4}>You have no pending tasks.</td>
						</tr>
					)}
					{tasks
						.sort((a, b) => {
							return (
								new Date(a.dueTime).getTime() -
								new Date(b.dueTime).getTime()
							);
						})
						.map((task) => (
							<TaskItem
								key={task.id}
								task={task}
								completeTask={completeTask}
								deleteTask={deleteTask}
							/>
						))}
				</tbody>
			</Table>
		</div>
	);
};

export default TaskList;
