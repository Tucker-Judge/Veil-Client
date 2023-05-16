import useAuth from '../hooks/useAuth'
import { useState, useEffect } from 'react'
import axios from 'axios'
import times from 'lodash.times'
function CMS(){
    const [language, setLanguage] = useState("")
    const [translation, setTranslation] = useState("")
    const [type, setType] = useState("")
    const [title, setTitle] = useState("")
    const [frontArr, setFrontArr] = useState([])
    const [backArr, setBackArr] = useState([])
    const [translationAdded, setTranslationAdded] = useState(1)
    const[frontInput, setFrontInput] = useState("")
    // const[backInput, setBackInput] = useState("")

    const [translations, setTranslations] = useState([])
    const [backInputs, setBackInputs] = useState([''])

    const {getAuthHeaders} = useAuth()
    const handleFront = () => {
        if(frontInput.length === 0){
            return
        }
        let split = frontInput.split(' ')
        for(let i=0;i<split.length;i++){
            split[i] = split[i].replace(/_/g, " ")
        }
        console.log(split)
        setFrontArr(split)
    }
    const handleBack = (i) => {
        if (!backInputs[i] || backInputs[i].length === 0){return}
        let split = backInputs[i].split(' ')
        for(let j=0;j<split.length;j++){
            split[j] = split[j].replace(/_/g, " ")
        }
        console.log(split)
        const copyArr = [...backInputs]
        copyArr[i] = split
        setBackInputs(copyArr)
    }
    const handleSubmit = async () => {
        // return console.log(backInputs, translations)
        const authHeaders = getAuthHeaders();
        try {
            const response = await axios.post(
                'http://localhost:3000/vocab', 
                {
                    language,
                    card_type: type,
                    title,
                    front_arr: frontArr,
                    back_arr: backInputs,
                    translation
                },
                {
                    headers: {
                        ...authHeaders,
                    },
                }
            );
            // Handle response here
            console.log(response);
        } catch (error) {
            // Handle error here
            console.error(error);
        }
    };
    
    const handleClick = () => {
        if(translationAdded === 3){
            return
        }
        setTranslationAdded((prev) => prev + 1)
        setTranslations([...translations, ""])
        setBackInputs([...backInputs, []])
    }
    const handleRemove = () => {
        if(translationAdded === 1){
            return
        }
        setTranslationAdded((prev) => prev - 1)
        setTranslations(translations.slice(0, -1))
        setBackInputs(backInputs.slice(0, -1))
    }
    const handleTranslationChanged = (index, e)=> {
        const snapshot = [...translations]
        snapshot[index] = e.target.value
        setTranslations(snapshot)

    }
    const handleBackInputChanged = (index, e)=> {
        const snapshot = [...backInputs]
        snapshot[index] = e.target.value
        setBackInputs(snapshot)
    }
return (
        <div>
            {/* Language */}
            <div>
                <h1>Language</h1>
                <select onChange={(e) => setLanguage(e.target.value)}>
                    <option value="French">French</option>
                    <option value="English">English</option>
                    <option value="German">German</option>
                </select>
                <h1>Card Type</h1>
                <select onChange={(e) => setType(e.target.value)}>
                    <option value="Vocab">Vocab</option>
                    <option value="Common Words">Common Words</option>
                    <option value="Sentences">Sentences</option>
                    <option value="Short Stories">Short Stories</option>
                </select>
                <h1>Title</h1>
                <input onChange={(e)=> setTitle(e.target.value)}/>
            </div>
            <div>
            <h1>Front</h1>
            <textarea onChange={(e) => setFrontInput(e.target.value)} onBlur= {handleFront} />
            </div>
            <div>
                <h2>Translation</h2>
                {translationAdded > 1 && <button onClick={handleRemove}>-</button>}

                {translationAdded < 3 && <button onClick={handleClick}>+</button>}
                <h2>Back</h2>
                {times(translationAdded, (index) => {
                    return (
                        <div key = {index}> 
                            <select onChange={(e) => handleTranslationChanged(index, e)}>
                                <option value="French">French</option>
                                <option value="English">English</option>
                                <option value="German">German</option>
                            </select>
                        <textarea onChange={(e)=> handleBackInputChanged(index, e)} onBlur= {() => handleBack(index)} />
                        </div>
                    )
                })}
            </div>
            <button onClick={handleSubmit}>Submit</button>
            
            
            
        </div>
    )
}
export default CMS