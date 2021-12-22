import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState } from 'react';

function App() {
	const [tasks, setTasks] = useState([
		{
			id: 1,
			text: 'Doctor appointment',
			day: 'Feb 5th 2:30pm',
			reminder: true,
		},
	]);

	//Delete task
	const deleteTask = id => {
		setTasks(tasks.filter(task => task.id !== id));
	};

	// Toggle reminder
	const toggleReminder = id => {
		console.log(id);
	};

	return (
		<div className="container">
			<Header />
			{tasks.length > 0 ? (
				<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
			) : (
				'No tasks to show'
			)}
		</div>
	);
}

export default App;
