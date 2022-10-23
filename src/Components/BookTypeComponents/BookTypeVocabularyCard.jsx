
import "./BookTypeVocabularyCard.scss";
import { useState, useEffect } from 'react'
import imageForWeb from '../../Images/notebook_1920.png'
import imageForMobile from '../../Images/notebook_640.png'

const ENUM_NOTE_SUBJECT = {
    vocabulary: {
        keyName: 'vocabulary',
        mandarin: '單字'
    },
    spellingByTense:  {
        keyName: 'spellingByTense',
        mandarin: '中文翻譯'
    },
    synonymList:  {
        keyName: 'synonymList',
        mandarin: '同義詞'
    },
    confusingWord:  {
        keyName: 'confusingWord',
        mandarin: '易混淆詞'
    },
    exampleSentences:  {
        keyName: 'exampleSentences',
        mandarin: '例句'
    },
    grammarNote:  {
        keyName: 'grammarNote',
        mandarin: '文法筆記'
    },
}

function BookTypeVocabularyCard({
    vocabularyData
}) {
    // 單字資料
    const [ currentWordDataIndex, setCurrentWordDataIndex ] = useState(0)
    const [ currentWordData, setCurrentWordData ] = useState(vocabularyData[currentWordDataIndex])
    // 當前筆記 tab name
    const [ currentTabName, setCurrentTabName ] = useState('')
    const [ noteContent, setNoteContent ] = useState(null)

    function handleTabClick(tabName) {
        setCurrentTabName(tabName)
        setNoteContent(currentWordData[tabName])
    }

    function handleResetClick() {
        setCurrentTabName('')
        setNoteContent(null)
    }

    useEffect(()=> {
        setCurrentWordData(vocabularyData[currentWordDataIndex])
        setNoteContent(null)
        setCurrentTabName(null)
    },[currentWordDataIndex, vocabularyData])

    return (
        <div className="BookTypeVocabularyCard">
            <div className="book-wrapper">
                <img className="notebook-img" src={imageForWeb} alt="noteBook" width="auto" height="auto"/>
                <div className="page-wrapper">
                    <div className="note-list col-3">
                        <h1>筆記項目</h1>
                        {
                            Object.entries(currentWordData).map(([key, value])=>
                                key !== ENUM_NOTE_SUBJECT.vocabulary.keyName && (
                                    <button 
                                        key={`${key}_${value}`} 
                                        className={`btn-reset notes-subject ${key === currentTabName ? 'active' : ''}`}
                                        onClick={()=> handleTabClick(key)}
                                        onMouseEnter={()=> handleTabClick(key)}
                                    >
                                        {ENUM_NOTE_SUBJECT[key].mandarin}
                                    </button>
                                )
                            )
                        }
                        {
                            currentTabName &&  
                                <button 
                                    className="btn-reset btn-clear"
                                    onClick={handleResetClick}
                                >
                                    清除選取內容
                                </button>
                        }
                    </div>
                    <div className="note-text col-9">
                        <div className="main-word">{currentWordData.vocabulary}</div>
                        {/* <p>往下滾動此區以閱讀所有筆記</p> */}
                        {
                            !noteContent && currentWordDataIndex < 1 && (
                                <div className="text-center pt-5">
                                    多項研究指出，<br/><br/>
                                    “記憶提取法” 能有效幫助記憶<br/><br/>
                                    上方單字先想想辭義，<br/><br/>
                                    再選左邊中文翻譯對答案～
                                </div>
                            )
                        }
                        <div className="note-title">{currentTabName && ENUM_NOTE_SUBJECT[currentTabName].mandarin}</div>
                        {
                            currentTabName === ENUM_NOTE_SUBJECT.spellingByTense.keyName && (
                                noteContent.map((item,index)=>(
                                    <div className="session-bottom-line" key={`${item}_${index}`}>
                                        <p className="word">{item.spelling}</p>
                                        <span className="pr-10">{`.${item.type}`}</span>
                                        <span>{item.meaning}</span>
                                    </div>
                                ))
                            )
                        }
                        {
                            (currentTabName === ENUM_NOTE_SUBJECT.synonymList.keyName || currentTabName === ENUM_NOTE_SUBJECT.confusingWord.keyName) && (
                                noteContent.map((item,index)=>(
                                    <div className="session-bottom-line" key={`${item}_${index}`}>
                                        <p className="word">{item.spelling}</p>
                                        <span className="pr-10">{`.${item.type}`}</span>
                                        <span>{item.meaning}</span>
                                    </div>
                                ))
                            )
                        }
                        {
                            (currentTabName === ENUM_NOTE_SUBJECT.exampleSentences.keyName || currentTabName === ENUM_NOTE_SUBJECT.grammarNote.keyName ) && (
                                noteContent.map((item,index)=>(
                                    <div className="grammar-note" key={`${item}_${index}`}>
                                        {item}
                                    </div>
                                ))
                            )
                        }
                    </div>
                    <div className={`page-btns ${(currentWordDataIndex === 0 && 'justify-content-end') ||(currentWordDataIndex === vocabularyData.length - 1 && 'justify-content-start')}`}>
                        {
                            <button 
                                className={`btn-reset page-btn ${currentWordDataIndex === 0 ? 'd-none' : ''}`}
                                onClick={() => setCurrentWordDataIndex(currentWordDataIndex - 1)}
                            >{'< 前一頁'}</button>
                        }
                        {
                            <button 
                                className={`btn-reset page-btn ${currentWordDataIndex === vocabularyData.length - 1 ? 'd-none' : '' }`}
                                onClick={() => setCurrentWordDataIndex(currentWordDataIndex + 1)}
                            >{'後一頁 >'}</button>
                        }
                        {
                            <div className="page-info">{`${currentWordDataIndex + 1} / ${vocabularyData.length}`}</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookTypeVocabularyCard