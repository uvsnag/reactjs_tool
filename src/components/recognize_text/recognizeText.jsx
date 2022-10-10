import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechRecogn = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const messagesEndRef = React.createRef()

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Browser does not support speech to text");
    }
    document.getElementById(`numClear`).value = 0;
  }, []);
  useEffect(() => {
    let num = Number(document.getElementById(`numClear`).value)
    if (num > 0 && wordcount(transcript) > num) {
      console.log(transcript)
      resetTranscript()
    }
    scrollToBottom()
  }, [transcript]);

  const wordcount = (s) => {
    console.log('count')
    if (s) {
      return s.replace(/-/g, ' ').trim().split(/\s+/g).length;
    }
    return 0
  }
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  }
  const stopListening = () => {
    SpeechRecognition.stopListening();
  }
  const showHideContr = () => {
    onHideInput('control')
  }
  const onHideInput = (idName) => {
    var prac = document.getElementById(`${idName}`);
    if (prac.style.display === "block" || prac.style.display === "") {
      document.getElementById(`${idName}`).style.display = "none";
    } else {
      document.getElementById(`${idName}`).style.display = "block";
    }
  };
  return (
    <div className='container'>
      <div id='control'>
        <button className='button' onClick={() => startListening()}>
          Start
        </button>
        <button className='button' onClick={() => stopListening()}>
          Stop
        </button>
        <button className='button' onClick={resetTranscript}>
          reset
        </button>
        <input type="number" id='numClear' className='width-30' />
      </div>
      <div className='content-log' >
        {transcript}
        <div ref={messagesEndRef} />
      </div>
      <button onClick={() => showHideContr()}>
        -
      </button>

    </div>
  )
}


export default SpeechRecogn