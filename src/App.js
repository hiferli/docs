import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const storeKey = "notepad";
	const [text, setText] = useState("");

	useEffect(() => {
		if(localStorage.getItem(storeKey)){
			setText(localStorage.getItem(storeKey));
		}
	}, [])

	const handleChange = (event) => {
		localStorage.setItem(storeKey , event.target.value);
		console.log(localStorage.getItem(storeKey))
	}
	
	return (
		<div className='App'>
			<textarea name="nodepad" id="notepad" defaultValue={text} onChange={(event) => handleChange(event)}></textarea>
		</div>
	);
}

export default App;
