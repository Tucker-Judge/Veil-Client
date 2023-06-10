import styles from './styles/Chatbot.module.css';
import { useState, useEffect, useRef } from 'react'
import 'regenerator-runtime/runtime'
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import axios from 'axios'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMicrophone,faArrowUp } from '@fortawesome/free-solid-svg-icons';
function Chatbot() {
  if(typeof window !== 'undefined') {
// first message can be a prompt taken from json file
  
  const [messages, setMessages] = useState(['try asking what the weather is like today', 'messages', 'messages','messages', 'messages', 'messages','messages', 'messages', 'messages'])
  const [prevMessages, setPrevMessages] = useState(['whateva', 'doubly'])
  const [msg, setMsg] = useState('testing')
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState()
  const [toggle, setToggle] = useState(false)
  const textAreaRef = useRef("10rem")
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition, 
  } = useSpeechRecognition();

  const browserSupport = () => {
    if (!browserSupportsSpeechRecognition) {
    return (
      <div>
          no... are you on fucking bing rn?
        </div>
      )
  }
}
  function handleMessageSpeech(){
    let previousLength
    let elapsedTranscriptionTime = 0
    
    SpeechRecognition.startListening({language: language, continuous: true});

    // SpeechRecognition.onerror = () => {
    //   console.error('SpeechRecognition error')
    // }
    
    console.log(transcript)
    let checkTranscriptTimer = setInterval(() => {
      console.log(transcript)
      // Stop recognition if there is no new content for 5 seconds or if 20 seconds have elapsed
      if (transcript.length ===  previousLength || elapsedTranscriptionTime >= 20000) {
        // debugger
        console.log(transcript)
        SpeechRecognition.stopListening()
        let emission = transcript
        console.log(emission)
        
        apiRequest()
        clearInterval(checkTranscriptTimer)
      }

      // Update the previous length of the transcription
      previousLength = transcript.length
      elapsedTranscriptionTime += 5000
    }, 5000)
  }
  const apiRequest = () => {
    axios.post('/api/chat', {msg, prevMessages})
  }
  return (
    <div className={styles.container}>
      <div className={styles.chatMessages}>
        {messages.map((message, index)=> {
          return (
            <p key={index}>{message}</p>
          )
        })}
      </div>

      <div className={styles.sendChat}>
        <div ref={textAreaRef} style={{height: `${textAreaRef.current}`}} className = {styles.manageChat}>
        <button className={styles.regenerate}>⟳ Regenerate Response</button>
        <textarea
   
    style={{height: `${textAreaRef.current}`}}
    value = {msg}
    onChange={(e)=> {
      setMsg(e.target.value)
      
      let newHeight = Math.max(e.target.scrollHeight, parseInt(textAreaRef.current.style.height, 10)) / 16;
  textAreaRef.current.style.height = `${newHeight}rem`;
    }}
    type="text"
/>
        </div>
      {msg ? 
      <button className={styles.icons} onClick = {apiRequest}>⇪</button> 
      : <>
      <FontAwesomeIcon className= {styles.microphone} size={"2x"} onClick = {handleMessageSpeech} icon={faMicrophone} />
      </>
      }
        </div>
    </div>
  )
      }
}
export default Chatbot;
