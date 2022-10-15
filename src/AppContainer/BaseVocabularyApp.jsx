import { useState } from 'react';
import CardSwiper from '../Components/CardSwiper/CardSwiper'
import './VocabularyApp.scss';
import LETTER_START_A from '../vocabularyData/A.js'

function BaseVocabularyApp() {
	const [vocabularyData, setVocabularyData] = useState(LETTER_START_A)

	return (
		<div className="App">
			<CardSwiper
				setStyleClass={`${vocabularyData.length ? "" : "d-none"}`} 
				data={vocabularyData}
			/>
		</div>
	);
}

export default BaseVocabularyApp;
