import styles from './styles/Chatbot.module.css';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

// below is valid and required for the chatbot component to work
import 'regenerator-runtime/runtime'
// my apologies

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

// !!!!!!!!!!!!!!!!!!!!!!!
// must cache soon!
// !!!!!!!!!!!!!!!!!!!!!!!

function Chatbot() {
  if(typeof window !== 'undefined') {
// first message can be a prompt taken from json file
  
  const [messages, setMessages] = useState(['try asking what the weather is like today', 'messages', 'messages','messages', 'messages', 'messages','messages', 'messages', 'messages'])
  const [prevMessages, setPrevMessages] = useState(['whateva', 'doubly'])
  const [msg, setMsg] = useState('testing')
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState()
  const [toggle, setToggle] = useState(false)
  const [error, setError] = useState('')
  
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition, 
  } = useSpeechRecognition();

  const browserSupport = () => {
    if (!browserSupportsSpeechRecognition) {
    return (
      <div>
          no... are you on bing rn?
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

  // Legally obligated to say that nothing it says matters
  const apiRequest = () => {
    console.log('u rang??')
    axios.post('http://localhost:3002/api/chat', {msg, prevMessages, messages})
    .then((response) => {
      console.log(response.data)
      setMsg('')
      setPrevMessages(response.data.prevMessages)
      setMessages(response.data.messages)
    })
    .catch((err) => {
      throw err
    })
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
        
        <button className={styles.regenerate} onClick={(()=> console.log("FUCK"))}>⟳ Regenerate Response</button>
        <textarea
    value = {transcript ? transcript : msg}
    onChange={(e)=>setMsg(e.target.value)}
    type="text"
/>
        
      {msg ? 
      <button className={styles.icons} onClick = {() => apiRequest()}>⇪</button> 
      : 
      <FontAwesomeIcon className= {styles.microphone} size={"2x"} onClick = {handleMessageSpeech} icon={faMicrophone} />
      }
        </div>
        <button onClick={()=> console.log('just do itttt')}>{error}</button>
    </div>
  )
      }
}
export default Chatbot;
