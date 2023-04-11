
import "./BookTypeVocabularyCard.scss";
import { useState, useEffect } from 'react'
import imageForWeb from '../../Images/notebook_1920.png'
import imageForMobile from '../../Images/notebook_640.png'
import axios from 'axios';

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
    dictionaryData: {
        keyName: 'dictionaryData',
        mandarin: '辭典說明'
    }
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
    // 被點播放的 單字 API 資料
    const [ wordAPIData, setWordAPIData ] = useState(null)

    function handleTabClick(tabName) {
        const tabIsOnDictionary = tabName === ENUM_NOTE_SUBJECT.dictionaryData 
        setCurrentTabName(tabName)
        setNoteContent(tabIsOnDictionary ? null : currentWordData[tabName])
    }

    function handleResetClick() {
        setCurrentTabName('')
        setNoteContent(null)
    }

    function audioSectionRender(){
        // phonetics array 中可能不只一個物件，也不一定有 audio 資料在其中
        const audioUrl = wordAPIData.phonetics ? wordAPIData.phonetics.find((item)=> item.audio) : false
        if (!audioUrl) {
            return <p className="note-text-small">(沒有音訊可播放)</p>
        } else {
            return (
                <audio src={audioUrl.audio} controls >
                    <p>此瀏覽器不支援播放唷!建議使用 Chrome ~</p>
                </audio>
            )
        }
    }

    function splitSentencesByDot(sentence){
        const sentenceArray = sentence.split('.')
        const newArray = []
        sentenceArray.forEach((item)=> {
            if (item.trim().length) {
                newArray.push(`${item.trim() + '.'}`)
            }
        })
        return (
            newArray.map((item, index)=>(
                <p key={`${item}_${index}`}>
                    {item}
                </p>
            ))
            
        )
    }

    useEffect(()=> {
        setCurrentWordData(vocabularyData[currentWordDataIndex])
        setNoteContent(null)
        setCurrentTabName(null)
    },[currentWordDataIndex, vocabularyData])

    useEffect(()=>{
        console.log('currentWordData',currentWordData)
        if (currentWordData.vocabulary) {
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentWordData.vocabulary}`)
            .then(function (res) {
                setWordAPIData(res.data[0])
            })
            .catch(function (error) {
                alert(`無法取得詞彙詳細資料,錯誤：${error}`)
            })
        }
    },[currentWordData,currentWordData.vocabulary])


    return (
        <div className="BookTypeVocabularyCard">
            <div className="book-wrapper">
                <img className="notebook-img" src={imageForWeb} alt="noteBook" width="auto" height="auto"/>
                <div className="page-wrapper">
                    <div className="note-list col-3">
                        <h1>筆記項目</h1>
                        {
                            Object.entries(currentWordData).map(([key, value], index)=>
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
                            wordAPIData &&  
                                <button 
                                    className={`btn-reset notes-subject ${currentTabName === ENUM_NOTE_SUBJECT['dictionaryData'].keyName? 'active' : ''}`}
                                    onMouseEnter={()=> handleTabClick('dictionaryData')}
                                >
                                    {ENUM_NOTE_SUBJECT['dictionaryData'].mandarin}
                                </button>
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
                    <div className="right-section col-9">
                        <div className="note-head" >
                            <p className="mb-5">{currentWordData.vocabulary}</p>
                            <p className="phonetic mb-5">{wordAPIData && wordAPIData.phonetic}</p>
                            {
                                wordAPIData?.phonetics && audioSectionRender()
                            }
                        </div>
                        <div className="note-body">
                            {
                                currentTabName ? (
                                    <p className="note-text">內容超出時請滾動此區</p>
                                ) : (
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
                                (currentTabName === ENUM_NOTE_SUBJECT.exampleSentences.keyName || currentTabName === ENUM_NOTE_SUBJECT.grammarNote.keyName) && (
                                    noteContent.map((item,index)=>(
                                        <div className="grammar-note" key={`${item}_${index}`}>
                                            {item}
                                        </div>
                                    ))
                                )
                            }
                            {
                                currentTabName === ENUM_NOTE_SUBJECT.dictionaryData.keyName && (
                                    wordAPIData.meanings.map((item, index)=> 
                                        <div className="dictionary-section" key={`${item}_${index}`}>
                                            {
                                                item.synonyms.length > 0 && (
                                                    <div className="synonym-list antonyms-list">
                                                        <p>同義詞 synonyms:</p>
                                                        {
                                                            item.synonyms.map((word, wordIndex)=>(
                                                                <p key={`synonyms_${wordIndex}_${wordIndex}`}>{word}</p>  
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            }
                                            {
                                                item.antonyms.length > 0 && (
                                                    <div className="antonyms-list">
                                                        <span>反義詞 antonyms:</span>
                                                        {
                                                            item.antonyms.map((word, wordIndex)=>(
                                                                <span key={`synonyms_${wordIndex}_${wordIndex}`}>{word}</span>  
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            }
                                            <p className="part-of-speech">{item.partOfSpeech}</p>
                                            {
                                                item.definitions.map((defineItem, itemIndex)=>(
                                                    <div className="session-bottom-line" key={`${defineItem}_${itemIndex}`}>
                                                        <p key={`${defineItem.definition}_${itemIndex}`} className="definition ml-20">
                                                            {`定義-${itemIndex + 1}：`}<span className="ml-10">{`${defineItem.definition}`}</span>
                                                        </p>
                                                        {
                                                            defineItem.synonyms.length > 0 && (
                                                                <div className="ml-40">
                                                                    <p className="my-10">同義詞 synonyms：</p>
                                                                    {
                                                                        defineItem.synonyms.map((word, wordIndex)=>(
                                                                            <p key={`${word}_${wordIndex}`}>{word}</p>
                                                                        ))
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            defineItem.antonyms.length > 0 && (
                                                                <div className="ml-40">
                                                                    <span>反義詞 antonyms：</span>
                                                                    {
                                                                        defineItem.antonyms.map((word, wordIndex)=>(
                                                                            <span key={`${word}_${wordIndex}`}>{word}</span>
                                                                        ))
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            defineItem.example && (
                                                                <div className="ml-40">
                                                                    <p>例句 example：</p>
                                                                    {splitSentencesByDot(defineItem.example)}
                                                                </div>
                                                            )
                                                        }
                                                    </div> 
                                                ))
                                            }
                                        </div>
                                    )
                                )
                            }
                            {/* {
                                <div className="note-text text-center mt-20">------筆記終止線------</div>
                            } */}
                        </div>                   
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