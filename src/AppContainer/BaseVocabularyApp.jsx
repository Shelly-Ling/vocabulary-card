import { useState } from 'react';
import CardSwiper from '../Components/CardTypeComponents/CardSwiper/CardTypeVocabularyCard'
import './VocabularyApp.scss';
import LETTER_START_A from '../vocabularyData/A.js'

/**
 * @description Swiper 卡片樣式的組件
 */
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
