import { useState, useRef } from 'react';
import CardSwiper from '../Components/CardSwiper/CardSwiper'
import './VocabularyApp.scss';
import UploadIcon from '../Images/upload-file.svg';

function App() {
	const exampleSheetDownloadUrl = "https://docs.google.com/spreadsheets/d/1Sdj3BPDsu9dEievt0GAqsI341j_N3V0VqSncmYJKEsQ/edit?usp=sharing"

	const [vocabularyData, setVocabularyData] = useState([
		{
			adverbTenseAndTranslation: "adverbTenseAndTranslation",
			antonyms: "antonyms",
			exampleSentences: "exampleSentences exampleSentences exampleSentences exampleSentences exampleSentences",
			note: "note",
			nounTenseAndTranslation: "nounTenseAndTranslation",
			prefixOrRootAndMeaning: "a/an: without",
			synonyms: "synonyms",
			translation: "adj. 非典型的",
			verbTenseAndTranslation: "verbTenseAndTranslation",
			vocabulary: "vocabularyTest",
			tense: "answer 時態"
		},
		{
			adverbTenseAndTranslation: "answer 副詞時態 與 翻譯",
			antonyms: "answer 反義詞",
			exampleSentences: "answer 例句",
			note: "answer 其他備註",
			nounTenseAndTranslation: "answer 名詞時態 與 翻譯",
			prefixOrRootAndMeaning: "answer 字首/字根 與 意義 a/an: without",
			synonyms: "answer 近義詞",
			translation: "answer adj. 非典型的",
			verbTenseAndTranslation: "answer 動詞時態 與 翻譯",
			vocabulary: "vocabularyTest",
			tense: "answer 時態"
		},
	])
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
		// 從表單第一行取 header 可以這樣寫
		// const header_cols = str.slice(0, str.indexOf("\n")).split(delimiter);
		const header_cols = ['vocabulary','tense', 'translation', 'verbTenseAndTranslation', 'nounTenseAndTranslation', 'adverbTenseAndTranslation', 'exampleSentences', 'synonyms', 'antonyms', 'prefixOrRootAndMeaning', 'note']

		//依資料組成陣列
		const row_data = str.slice(str.indexOf("\n") + 1).split("\n");
		
		//map 陣列處理成 json
		const arr = row_data.map(function (row) {
			const values = row.split(delimiter);
			
			const el = header_cols.reduce(function (object, header, index) {
				const keyName = header.trim().replace(/\r/,"")
				object[keyName] = values[index].trim().replace(/\r/,"");
				
				return object;
			}, {});

			return el;
		});

		// return the array 篩選掉沒單字資料的
		setVocabularyData(arr.filter((item)=> item.vocabulary))
	}

	return (
		<div className="App">
			<label htmlFor="input-upload">
				<img className="icon-upload hover-pointer" src={UploadIcon} alt="上傳資料圖示" />
				<p>請上傳檔案</p>
				<input
					id="input-upload"
					ref={inputElement}
					type={"file"}
					style={{ display: "none" }}
					onChange={onFileUpload} 
				/>
				
			</label>
			
			<a href={exampleSheetDownloadUrl} target="_blank" title="表單下載" rel="noreferrer">表單下載</a>
			
			
			{
				vocabularyData.map((item,index)=> (
					<div key={item.vocabulary + index}>{item.vocabulary}</div>
				))
			}
			<CardSwiper
				setStyleClass={`${vocabularyData.length ? "" : "d-none"}`} 
				data={vocabularyData}
			/>
		</div>
	);
}

export default App;
