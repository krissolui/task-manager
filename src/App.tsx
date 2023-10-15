import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from './components/TaskList';
import { Task } from './interfaces/task';
import TaskForm, { FormFields } from './components/TaskForm';
import { useEffect, useState } from 'react';

const isLocalStorageAvailable = (): boolean => {
	const test = 'test' + new Date().toISOString();
	try {
		window.localStorage.setItem(test, test);
		window.localStorage.removeItem(test);
		return true;
	} catch (e) {
		return false;
	}
};

const getStoredTasks = (): Task[] => {
	if (!isLocalStorageAvailable()) return [];
	const storedTasks = window.localStorage.getItem('tasks');
	if (!storedTasks) return [];
	return JSON.parse(storedTasks);
};

function App() {
	const [tasks, setTasks] = useState<Task[]>(getStoredTasks);

	useEffect(() => {
		if (!isLocalStorageAvailable()) return;
		window.localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	const addTask = (task: FormFields) => {
		const id = (tasks.slice(-1)[0]?.id ?? 0) + 1;
		setTasks([...tasks, { id, ...task }]);
	};

	const completeTask = (id: number) => {
		const idx = tasks.findIndex((task) => task.id === id);
		if (idx < 0) return;

		const newTasks = [...tasks];
		newTasks.splice(idx, 1);
		setTasks(newTasks);
	};

	const deleteTask = (id: number) => {
		const idx = tasks.findIndex((task) => task.id === id);
		if (idx < 0) return;

		const newTasks = [...tasks];
		newTasks.splice(idx, 1);
		setTasks(newTasks);
	};

	return (
		<div className="container p-2 my-5">
			<div className="row justify-content-center row-gap-5">
				<TaskForm addTask={addTask} />
				<TaskList
					tasks={tasks}
					completeTask={completeTask}
					deleteTask={deleteTask}
				/>
			</div>
		</div>
	);
}

export default App;
