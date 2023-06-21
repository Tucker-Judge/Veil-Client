import useAuth from '../hooks/useAuth'
import { useState, useEffect } from 'react'
import axios from 'axios'
import times from 'lodash.times'
import styles from '../styles/Cms.module.css'
// import usePersistentState from '@/hooks/usePersistentState'

function CMS(){
    const [language, setLanguage] = useState("")
    const [type, setType] = useState([])
    const [backArr, setBackArr] = useState([])
    const [translationAdded, setTranslationAdded] = useState(1)
    
    const[frontInput, setFrontInput] = useState("")
    const [translations, setTranslations] = useState([Object.keys(cardTypes)[0]])
    // custom hook for session storage
    const [backInputs, setBackInputs] = useState([''])
    const [title, setTitle] = useState([])
    const [frontArr, setFrontArr] = useState([])
    const [currLanguage, setCurrLanguage] = useState('')

    const {getAuthHeaders} = useAuth()

    useEffect(() => {
        // sessionStorage.clear()
        if(sessionStorage.getItem('titles')) setTitle(JSON.parse(sessionStorage.getItem('titles')))
        if(sessionStorage.getItem('backInputs')) setBackInputs(JSON.parse(sessionStorage.getItem('backInputs')))
        if(sessionStorage.getItem('frontArr')) setFrontArr(JSON.parse(sessionStorage.getItem('frontArr')))
        if(sessionStorage.getItem('types')) setType(JSON.parse(sessionStorage.getItem('types')))
        if(sessionStorage.getItem('translationsAdded')) setTranslationAdded(JSON.parse(sessionStorage.getItem('translationsAdded')))
        console.log(sessionStorage.getItem('translationsAdded'))
        console.log(sessionStorage.getItem('types'))
        console.log(sessionStorage.getItem('titles'))
        console.log(sessionStorage.getItem('backInputs'))
        console.log(sessionStorage.getItem('frontArr'))
    },[])
    const handleFront = () => {
        if(frontInput.length === 0){
            return
        }
        let split = frontInput.split(' ')
        for(let i=0;i<split.length;i++){
            split[i] = split[i].replace(/_/g, " ")
            // split[i] = 
        }
        console.log(split.join(' '))
        setFrontArr(split.join(' '))
        sessionStorage.removeItem('frontArr')
        sessionStorage.setItem('frontArr', JSON.stringify(split.join(' ')))
    }
    const handleBack = (i) => {
        if (!backInputs[i] || backInputs[i].length === 0){return}
        let split = backInputs[i].split(' ')
        for(let j=0;j<split.length;j++){
            split[j] = split[j].replace(/_/g, " ")
        }
        const copyArr = [...backInputs]
        copyArr[i] = split
        console.log(copyArr[i])
        setBackInputs(copyArr)

        sessionStorage.removeItem('backInputs')
        sessionStorage.setItem('backInputs', JSON.stringify(copyArr))
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
                    translations
                },
                {
                    headers: {
                        ...authHeaders,
                    },
                }
            );
            // Handle response here
            console.log(response);
            sessionStorage.clear()
        } catch (error) {
            // Handle error here
            console.error(error);
        }
    };
    
    const handleClick = () => {
        if(translationAdded === 3){
            return
        }
        sessionStorage.removeItem('translationsAdded')
        sessionStorage.setItem('translationsAdded', translationAdded + 1)
        setTranslationAdded((prev) => prev + 1)
        setTranslations([...translations, ""])
        setBackInputs([...backInputs, [""]])
        setTitle([...title, ""])
        setType([...type,""])
    }
    const handleRemove = () => {
        if(translationAdded === 1){
            return
        }
        setTranslationAdded((prev) => prev - 1)
        setTranslations(translations.slice(0, -1))
        setBackInputs(backInputs.slice(0, -1))
        setTitle(title.slice(0, -1))
        setType(type.slice(0, -1))

        sessionStorage.removeItem('translationsAdded')
        sessionStorage.setItem('translationsAdded', translationAdded - 1)
    }
    const handleTranslationChanged = (index, e)=> {
        setCurrLanguage(e.target.value)
        const snapshot = [...translations]
        snapshot[index] = e.target.value
        setTranslations(snapshot)

        sessionStorage.removeItem('translations')
        sessionStorage.setItem('translations', JSON.stringify(snapshot))
    }
    const handleBackInputChanged = (index, e)=> {
        // console.log(e.target.value)
        
        const snapshot = [...backInputs]
        snapshot[index] = e.target.value
        // console.log(snapshot[index])
        setBackInputs(snapshot)
        
        sessionStorage.removeItem('backInputs')
        sessionStorage.setItem('backInputs', JSON.stringify(snapshot))
    }
    const handleTitleChange = (index, e)=> {
        const snapshot = [...title]
        snapshot[index] = e.target.value
        setTitle(snapshot)

        sessionStorage.removeItem('titles')
        sessionStorage.setItem('titles', JSON.stringify(snapshot))

    }
    const handleTypeChange = (index, e)=> {
        const snapshot = [...type]
        snapshot[index] = e.target.value
        setType(snapshot)

        sessionStorage.removeItem('types')
        sessionStorage.setItem('types', JSON.stringify(snapshot))
    }
console.log(backInputs)
return (
        <div className = {styles.container}>
            {/* <p>{title}</p> */}
            {/* Language */}
            <div>
                <h1>Language</h1>
                <select onChange={(e) => setLanguage(e.target.value)}>
                    <option value="French">French</option>
                    <option value="English">English</option>
                    <option value="German">German</option>
                </select>
            </div>
            <div>
            <h1>Front</h1>
            <textarea defaultValue={frontArr} onChange={(e) => setFrontInput(e.target.value)} onBlur= {handleFront} />
            </div>
            <div>
                {translationAdded > 1 && <button onClick={handleRemove}>-</button>}

                {translationAdded < 3 && <button onClick={handleClick}>+</button>}
                {/* <h2>Back</h2> */}
                {times(translationAdded, (index) => {
                    return (
                        <div key = {index} className={styles.ughh}> 
                        <h2>Translation</h2>
                            <select value={translations[index]} onChange={(e) => handleTranslationChanged(index, e)}>
                                {Object.keys(cardTypes).filter(language => !translations.includes(language) || language === translations[index]).map(language => {
                                    return (
                                    <option key={language} value={language}>{language}</option>
                                    )
                                })}
                                {/* <option value="French">French</option>
                                <option value="English">English</option>
                                <option value="German">German</option> */}
                            </select>
                            <div className={styles.putTheMoneyInTheBag}>
                                <h1>Card Type</h1>
                            <select value={type[index]? type[index]: null} onChange={(e) => handleTypeChange(index, e)}>
                                    <option value="Vocab">Vocab</option>
                                    <option value="Common Words">Common Words</option>
                                    <option value="Sentences">Sentences</option>
                                    <option value="Short Stories">Short Stories</option>
                                </select>
                            {type !== 'Common Words' && (
                                <>
                                    <h1>Title</h1>
                                    <input defaultValue = {title[index]} onChange={(e)=> handleTitleChange(index, e)}/>
                                </>
                )}
                </div>
                <h2>Back Content</h2>
                    <textarea defaultValue={backInputs[index]}onChange={(e)=> handleBackInputChanged(index, e)} onBlur= {() => handleBack(index)} />
                    {index >= translationAdded-1 && (
                        <>
                    <br/>
                    <button onClick={handleSubmit}>Submit</button>
                        </>
                    )}
                    </div>
                    )
                })}
            </div>
            
            
            
        </div>
    )
}
export default CMS

const cardTypes = {
    "French": {
      "Vocab": "Vocabulaire",
      "Common Words": "Mots communs",
      "Sentences": "Phrases",
      "Short Stories": "Petites histoires"
    },
    "English": {
      "Vocab": "Vocab",
      "Common Words": "Common Words",
      "Sentences": "Sentences",
      "Short Stories": "Short Stories"
    },
    "German": {
      "Vocab": "Wortschatz",
      "Common Words": "Gewöhnliche Worte",
      "Sentences": "Sätze",
      "Short Stories": "Kurzgeschichten"
    }
  }
  
//   cant import because node cant read sessionStorage at runtime
  function usePersistentState(key, defaultValue) {

    const [state, setState] = useState(() => {
      const persistedState = sessionStorage.getItem(key);
      return persistedState ? JSON.parse(persistedState) : defaultValue;
    }); 
    return [state, setState];
  }