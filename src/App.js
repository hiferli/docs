import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const storeKey = "notepad";
	const [text, setText] = useState({});
	
	document.addEventListener("keydown", function (e) {
		if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
			e.preventDefault();
		}
	}, false);

	useEffect(() => {
		const getData = async () => {
			await axios.get('http://localhost:2000/getText')
			.then((response) => {
				localStorage.setItem(storeKey , JSON.stringify(response.data.storedText));
			})
			.catch((error) => console.log(error))
		}
		
		getData();
		
		if(localStorage.getItem(storeKey)){
			const history = JSON.parse(localStorage.getItem(storeKey)); 
			setText(history);
			document.getElementById('currentTimestamp').innerText = history.timestamp
		}
		
	}, [])

	const storeData = async () => {
		await axios.post('http://localhost:2000/storeText' , JSON.parse(localStorage.getItem(storeKey)))
		.then((response) => console.log(response))
		.catch((error) => console.log(error))
	}
	
	window.onbeforeunload = async (event) => {
		await storeData();
	}
	
	const handleChange = (event) => {
		const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
		localStorage.setItem(storeKey , JSON.stringify({
			"_id": 1,
			"text": event.target.value , 
			"timestamp": timestamp 
		}));

		document.getElementById('currentTimestamp').innerText = timestamp;
	}
	
	return (
		<div className='App'>
			<textarea name="nodepad" id="notepad" defaultValue={text.text} onChange={(event) => handleChange(event)}></textarea>
			<p className="timestamp" style={{color: 'grey', fontFamily: 'monospace'}}>Last AutoSaved: <span id='currentTimestamp'></span></p>
		</div>
	);
}

export default App;
