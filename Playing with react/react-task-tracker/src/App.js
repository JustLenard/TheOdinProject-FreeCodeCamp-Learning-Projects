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
		console.log('deleteTask', id);
	};
	return (
		<div className="container">
			<Header />
			<Tasks tasks={tasks} onDelete={deleteTask} />
		</div>
	);
}

export default App;
