import { useEffect, useState } from "react"
import "./VocabularyCard.scss"

function FlipCard ({
    showAllAnswer = false,
    cardSwitch,
    title = "", 
    data = "",
}) {
    useEffect(()=>{
        if (showAllAnswer){
            setShowAnswer(true)
        } else {
            setShowAnswer(false)
        }
    },[showAllAnswer])

    useEffect(()=>{
        setShowAnswer(false)
    },[cardSwitch])

    const [showAnswer, setShowAnswer] = useState(false)

    return (
        <>
            {data && (
                <div
                    className="flip-card-style cursor-pointer" 
                    onClick={() => setShowAnswer(!showAnswer)}
                >
                    <div className="title p-5">{title}: </div>
                    {
                        showAnswer && 
                        <div className="inline-block answer-style p-5">{data}</div>
                    }
                </div> 
            )}
        </>
    )
}

export default function VocabularyCard({
    cardData = {},
    cardSwitch
}) {
    const [showAllAnswer, setShowAllAnswer] = useState(false)

    const {
        vocabulary,
        tense,
        translation,
        verbTenseAndTranslation,
        adverbTenseAndTranslation,
        nounTenseAndTranslation,
        exampleSentences,
        prefixOrRootAndMeaning,
        synonyms,
        antonyms,
        note
    } = cardData

    const ENUM_CARD_DATA = {
        // vocabulary: {
        //     title: "單字",
        //     data: vocabulary
        // },
        tense: {
            title: "時態",
            data: tense
        },
        translation: {
            title: "翻譯",
            data: translation
        },
        verbTenseAndTranslation: {
            title: "動詞時態/翻譯",
            data: verbTenseAndTranslation
        },
        adverbTenseAndTranslation: {
            title: "副詞時態/翻譯",
            data: adverbTenseAndTranslation
        },
        nounTenseAndTranslation: {
            title: "名詞時態/翻譯",
            data: nounTenseAndTranslation
        },
        exampleSentences: {
            title: "例句",
            data: exampleSentences
        },
        prefixOrRootAndMeaning: {
            title: "字根/字首意義",
            data: prefixOrRootAndMeaning
        },
        synonyms: {
            title: "近義詞",
            data: synonyms
        },
        antonyms: {
            title: "反義詞",
            data: antonyms
        },
        note: {
            title: "其它備註",
            data: note
        }
    }
    
    return(
        <div className="col-12 py-20">
                { showAllAnswer 
                    ? (
                        <div className="btn text-center cursor-pointer" onClick={() => setShowAllAnswer(false)}>
                            隱藏全部答案
                        </div>
                    ):(
                        <div className="btn text-center cursor-pointer" onClick={() => setShowAllAnswer(true)}>
                            顯示全部答案
                        </div>
                    )
                }
            <div className="vocabulary py-20 text-center">
                {vocabulary}
            </div>
            {
                Object.entries(ENUM_CARD_DATA).map(([key,value]) => (
                        value.data
                        ? (       
                            <div key={`${key}-${value.title}`} className="p-10 text-center">
                                <FlipCard 
                                    title={value.title}
                                    data={value.data}
                                    showAllAnswer={showAllAnswer}
                                    cardSwitch={cardSwitch}
                                />
                            </div>
                        )
                        : null
                    )
                )
            }
        </div>
    )
}

