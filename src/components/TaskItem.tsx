import { Task } from '../interfaces/task';

interface ITaskItemProps {
	task: Task;
	deleteTask: () => void;
}

const TaskItem = ({ task }: ITaskItemProps) => {
	return <div>{task.title}</div>;
};

export default TaskItem;
