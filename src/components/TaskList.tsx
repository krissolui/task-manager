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
						{tasks.map((task) => (
							<TaskItem
								key={task.id}
								task={task}
								completeTask={completeTask}
								deleteTask={deleteTask}
							/>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default TaskList;
