import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const storeKey = "notepad";
	const [text, setText] = useState({});

	useEffect(() => {
		if(localStorage.getItem(storeKey)){
			const history = JSON.parse(localStorage.getItem(storeKey)); 
			setText(history);
			document.getElementById('currentTimestamp').innerText = history.timestamp
		}
	}, [])

	const handleChange = (event) => {
		const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
		localStorage.setItem(storeKey , JSON.stringify({
			"text": event.target.value , 
			"timestamp": timestamp 
		}));

		document.getElementById('currentTimestamp').innerText = timestamp;
	}
	
	return (
		<div className='App'>
			<textarea name="nodepad" id="notepad" defaultValue={text.text} onChange={(event) => handleChange(event)}></textarea>
			<p className="timestamp" style={{color: 'grey', fontFamily: 'monospace'}}>Last Saved: <span id='currentTimestamp'></span></p>
		</div>
	);
}

export default App;
