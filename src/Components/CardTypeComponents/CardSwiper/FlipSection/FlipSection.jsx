import { useState, useEffect } from 'react'

function FlipSection ({
    showAllAnswer = false,
    title = "", 
    children,
    childrenStyle = {}
}) {
    useEffect(()=>{
        if (showAllAnswer){
            setShowAnswer(true)
        } else {
            setShowAnswer(false)
        }
    },[showAllAnswer])

    const [showAnswer, setShowAnswer] = useState(false)

    return (
        <>
            {title && children && (
                <div
                    className="border-radius-8 text-center cursor-pointer py-10 m-10" 
                    onMouseEnter={() => setShowAnswer(true)}
                    onMouseLeave={() => setShowAnswer(false)}
                    style={showAnswer ? {backgroundColor: "#F2FCF6"} : {}}
                >
                    {
                        <div className="white-space-nowrap p-5 pt-10">{title}</div>
                    }
                    {
                        showAnswer && (                        
                            <div className="pt-10"
                                style={childrenStyle}
                            >{children}</div> 
                        )
                    }
                </div> 
            )}
        </>
    )
}

export default FlipSection