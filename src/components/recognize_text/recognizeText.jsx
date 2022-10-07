import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechRecogn = () => {
  const [content, setContent] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Browser does not support speech to text");
    }
  }, []);

  const startListening = () =>{
    SpeechRecognition.startListening({ continuous: true });
    console.log("Now listening...");
  }
  const stopListening = () =>{
    SpeechRecognition.stopListening();
    console.log("Stopped Listening");
  }
  return (
    <div className='container'>
      <button className='button' onClick={() => startListening()}>
        Start
      </button>
      <button className='button' onClick={() => stopListening()}>
        Stop
      </button>
      <button className='button' onClick={resetTranscript}>
        reset
      </button>
      <div className='content'>
        {transcript}
      </div>
    </div>
  )
}


export default SpeechRecogn