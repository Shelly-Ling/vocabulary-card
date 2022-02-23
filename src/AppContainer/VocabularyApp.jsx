import { useState, useRef } from 'react';
import CardSwiper from '../Components/CardSwiper/CardSwiper'
import './VocabularyApp.scss';

function App() {
	const [vocabularyData, setVocabularyData] = useState([])
	const inputElement = useRef(null);

	const onFileUpload = event => {

		if (event.target.files.length){
			let file = event.target.files[0];
			const endOfFileName = file.type
			console.log('file.type',file.type)

			if (endOfFileName.includes('csv')){
					let reader = new FileReader();

				reader.onload = function(e) {
					csvToArray(e.target.result)
				};

				reader.readAsText(file);
			} else {
				window.alert('請上傳 csv 檔')
				console.log(inputElement)
				inputElement.current.value= ''
				setVocabularyData([])
			}
		}
	}

	function csvToArray(str, delimiter = ",") {
		// 假使從表單第一行取 header 
		// const header_cols = str.slice(0, str.indexOf("\n")).split(delimiter);
		// console.log('header_cols',header_cols)
		const header_cols = ['vocabulary', 'translation', 'verbTenseAndTranslation', 'nounTenseAndTranslation', 'adverbTenseAndTranslation', 'exampleSentences', 'synonyms', 'antonyms', 'prefixOrRootAndMeaning', 'note']
		
		const row_data = str.slice(str.indexOf("\n") + 1).split("\n");

		const arr = row_data.map(function (row) {
			// console.log('row >>>>>>>>>',row)
			const values = row.split(delimiter);
			// console.log('values',values)
			const el = header_cols.reduce(function (object, header, index) {
				const keyName = header.trim().replace(/\r/,"")
				object[keyName] = values[index].trim().replace(/\r/,"");
				
				return object;
			}, {});
			return el;
		});

		// return the array
		setVocabularyData(arr.filter((item)=> item.vocabulary))
	}

	return (
		<div className="App">
			<input
				ref={inputElement}
				component="label"
				type={"file"}
				onChange={onFileUpload} 
			/>
			
			{
				vocabularyData.map((item,index)=> (
					<div key={item.vocabulary + index}>{item.vocabulary}</div>
				))
			}
			<CardSwiper data={vocabularyData} />
		</div>
	);
}

export default App;
