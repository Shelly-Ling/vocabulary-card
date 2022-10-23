import { useState } from 'react'
import BookTypeVocabularyCard from '../Components/BookTypeComponents/BookTypeVocabularyCard'
import LETTER_START_A from '../vocabularyData/A.js'


function BookTypeVocabularyApp() {
    const [vocabularyData, setVocabularyData] = useState(LETTER_START_A)

    return <BookTypeVocabularyCard vocabularyData={vocabularyData}/>
}

export default BookTypeVocabularyApp