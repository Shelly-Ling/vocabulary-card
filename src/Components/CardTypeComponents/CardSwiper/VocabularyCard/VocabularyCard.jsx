import { useState } from "react"
import FlipSection from "../FlipSection/FlipSection"

const ENUM_TENSE_IN_MANDARIN = {
    verb: '動詞',
    noun: '名詞',
    adjective: '形容詞',
    adverb: '副詞',
    preposition: '介系詞'
}

/**
 * @description swiper 卡片樣式的單字卡
 */
export default function VocabularyCard({
    cardData:{
        vocabulary = null,
        //用表單上傳的資料
        tense = null ,
        translation = null,
        verbTenseAndTranslation = null,
        adverbTenseAndTranslation = null,
        nounTenseAndTranslation = null,
        exampleSentences = null,
        prefixOrRootAndMeaning = null,
        synonyms = null,
        antonyms = null,
        note = null,

        //專案中的資料
        spellingByTense = {
            // verb = {
            //     // meaning: '',
            //     // spelling: ''
            // },
            // noun = {},
            // adjective = {},
            // adverb = {},
            // preposition = {}
        },
        // exampleSentences = [],
        grammarNote = '',
        confusingWord = [],
        synonymList = []
    },
}) {
    const [showAllAnswer, setShowAllAnswer] = useState(false)
    
    return(
        <div className="col-12 py-20">
                {
                    <div 
                        className="btn col-6 text-center cursor-pointer" 
                        onClick={() => setShowAllAnswer(!showAllAnswer)}
                        style={{background: "#BAF5FF"}}
                    >
                        { showAllAnswer ? "隱藏全部答案" : "顯示全部答案" }
                    </div>
                }
            <div className="vocabulary py-20 text-center"
                style={{background: "#BAF5FF", color: "#B50300", fontSize: "22px"}}
            >
                {vocabulary}
            </div>
            {
                Object.entries(spellingByTense).map(([tenseName, data])=>(
                    <FlipSection 
                        key={data.spelling || data.meaning}
                        title={ENUM_TENSE_IN_MANDARIN[tenseName]}
                        showAllAnswer={showAllAnswer}
                    >
                        {
                            Object.entries(spellingByTense[tenseName]).map(([key,value], index) => (
                                <span 
                                    className="px-10" 
                                    key={`${key}-${value}-${index}`}
                                    style={index === 0 ? {color: "#0092CC" } : {}}
                                >
                                    {value}
                                </span>
                            ))
                        }
                    </FlipSection>
                ))  
            }
            {
                synonymList && 
                    (
                        synonymList.map((item,index)=>(
                            <FlipSection
                                key={`${item.spelling || item.meaning}-${index}`}
                                title={`近義詞 - ${index + 1}`}
                                showAllAnswer={showAllAnswer}
                                childrenStyle={{color: "#0092CC" }}
                            >
                                {item.spelling} 
                                {item.meaning && `/ ${item.meaning}`}
                            </FlipSection>
                        ))
                    )
            }
            {
                grammarNote && 
                    <FlipSection
                        key={grammarNote}
                        title="文法Tips"
                        showAllAnswer={showAllAnswer}
                        childrenStyle={{color: "#0092CC" }}
                    >
                        {grammarNote}
                    </FlipSection>
            }
            {
                exampleSentences &&  (
                    exampleSentences.map((item,index)=>(
                        <FlipSection
                            key={`${item}-${index}`}
                            title={`例句 - ${index + 1}`}
                            showAllAnswer={showAllAnswer}
                            childrenStyle={{color: "#0092CC" }}
                        >
                            {item}
                        </FlipSection>
                    ))
                )

            }
        </div>
    )
}

