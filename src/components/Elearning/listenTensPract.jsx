// this is a tools for studying english
import React, { useEffect, useState, useRef } from "react";
import '../../common/style.css';
import '../../common/styleTemplate.css';
import { FaEyeSlash } from 'react-icons/fa';
import { useSpeechSynthesis } from "react-speech-kit";
import { replaceArr, isEqualStr } from "../../common/common.js";
import {
    validateArrStrCheck, arrStrCheckToStr,
    autoCorrectLetter, genHintStrAns, TYPE_WRONG
} from "../Elearning/commonElearn";
import _ from 'lodash';

let arrSentence = []
let indexST = -1;
let sentence = "";
const ListenTensPract = () => {
    const onEnd = () => {
        // You could do something here after speaking has finished
    };
    const [voiceIndex, setVoiceIndex] = useState(0);
    const { speak, voices } = useSpeechSynthesis({
        onEnd,
    });
    const [rate, setRate] = useState(1);
    const [answer, setAnswer] = useState("");
    /* const [errorMs, setErrorMs] = useState(""); */
    const [lastAnsw, setLastAnsw] = useState('');
    const inputAns = useRef(null)

    useEffect(() => {
        // document.getElementById('inputTxt').value =`table, column, newValue, oldValue, date, system(if need), ip, UserAgent, clumnReference, operatorReference, valueReference. All tables/columns/actions that need to log are configurable.`
    }, []);
    useEffect(() => {
        voices.forEach((option, index) => {
            if (option.lang.includes("en-US")) {
                setVoiceIndex(index);
            }
        });
    }, [voices]);
    const onHideInput = (idName) => {
        var prac = document.getElementById(`${idName}`);
        if (prac.style.display === "block" || prac.style.display === "") {
            document.getElementById(`${idName}`).style.display = "none";
        } else {
            document.getElementById(`${idName}`).style.display = "block";
        }
    };

    const onStart = () => {
        let input = document.getElementById('inputTxt').value;
        let arrReg = [',', '?', '(', ')', '!', '—', '-', '=', '”', '“', '\n',
            ';']
        input = replaceArr(input, arrReg, '.')
        arrSentence = input.split('.')
        indexST = -1
        setAnswer('')
        changeSentence()
        document.getElementById(`inputTxt`).style.display = "none";
        inputAns.current.focus()
    };
    const changeSentence = () => {
        indexST = indexST + 1;
        if (indexST >= arrSentence.length) {
            indexST = 0;
        }
        setLastAnsw(sentence)
        sentence = arrSentence[indexST].trim();
        speakAns();
    };
    const speakAns = () => {
        speakText(sentence)
    };
    const onCheck = () => {
        let ans = document.getElementById('answer').value;
        if (isEqualStr(sentence, ans, true)) {
            let arr = validateArrStrCheck(ans, sentence)
            setAnswer(arrStrCheckToStr(arr))
            changeSentence()
            /* setErrorMs('correct!'); */
            document.getElementById('answer').value = "";
        } else {
            let arr = validateArrStrCheck(ans, sentence)
            setAnswer(arrStrCheckToStr(arr))
            /* setErrorMs('wrong!'); */
        }

    }
    const handleKeyDownInput = (e) => {
        if (e.nativeEvent.code === 'PageUp') {
            onHideInput('inputTxt')
            inputAns.current.focus()
        }
        if (e.nativeEvent.code === 'PageDown' ) {
            onHideInput('control')
            inputAns.current.focus()
        }
    }

    const handleKeyDown = (e) => {
        console.log(e.nativeEvent.code)
        if (e.key === 'Enter') {
            onCheck();
        }
        if (e.nativeEvent.code === 'ShiftLeft') {
            let arr = genHintStrAns('answer', sentence);
            setAnswer(arrStrCheckToStr(arr))
        }
        if (e.nativeEvent.code === 'ControlLeft') {
            let preAnsInput =  document.getElementById('answer').value
            autoCorrectLetter('answer', sentence);
            let afterAnsInput =  document.getElementById('answer').value
            if(_.isEqual(preAnsInput, afterAnsInput)&&(preAnsInput.length < sentence.length)){
                let len = preAnsInput.length
                preAnsInput = preAnsInput + sentence.substring(len, len+1)
                document.getElementById('answer').value = preAnsInput;
            }
        }
        if (e.nativeEvent.code === 'ShiftRight') {
            let ansInput =  document.getElementById('answer').value
            if(ansInput===""){
                speakText(lastAnsw);
            }else{
                let indexFirstErr = 0;
                let arrStrCheck = validateArrStrCheck(ansInput, sentence)
                for(let i=0; i< arrStrCheck.length; i++){
                    if(_.isEqual(arrStrCheck[i].type, TYPE_WRONG)){
                        indexFirstErr = i
                        break;
                    }
                }
                let strSpeak = sentence.substring(0, indexFirstErr)
                let index = strSpeak.lastIndexOf(" ")
                speakText(sentence.substring(index, sentence.length));
            }
        }
        if (e.nativeEvent.code === 'ControlRight') {
            speakAns();
        }
        if (e.nativeEvent.code === 'End') {
            changeSentence();
        }
        if (e.nativeEvent.code === 'Home') {
            onStart();
        }
        if (e.nativeEvent.code === 'PageUp') {
            onHideInput('inputTxt')
        }
        if (e.nativeEvent.code === 'PageDown' ) {
            onHideInput('control')
            
        }
    }
    const speakText = (speakStr) => {

        var vVoice = document.getElementById('voice').value;
        var vrate = document.getElementById('rate').value;
        var utterance = new window.SpeechSynthesisUtterance();
        utterance.text = speakStr;
        utterance.rate = vrate;
        utterance.voice = voices[vVoice];
        utterance.volume = 1;
        speak(utterance);
    }
    return (
        <div className='container-left'>
            <div id="control">

                <textarea id='inputTxt' className='area-input' onKeyDown={e => handleKeyDownInput(e)}></textarea>
                <br />
                <button className='button-12 inline' id='hideBtn' onClick={() => onHideInput('inputTxt')} ><FaEyeSlash /></button>
                <span> </span>
                <button className='button-12 inline' id='Start' onClick={() => onStart()} >Start</button>
                <span> </span>
                <select className='button-12 inline width-120 '
                    id="voice"
                    name="voice"
                    value={voiceIndex || ''}
                    onChange={(event) => {
                        setVoiceIndex(event.target.value);
                    }}
                >
                    <option value="" >Default</option>
                    {voices.map((option, index) => (
                        <option key={option.voiceURI} value={index}>
                            {`${option.lang} - ${option.name}`}
                        </option>
                    ))}
                </select>
                <span> </span>
                <br />
                <input className="width-220 range-color"
                    type="range"
                    min="0.2"
                    max="1.5"
                    defaultValue="1"
                    step="0.1"
                    id="rate"
                    onChange={(event) => {
                        setRate(event.target.value);
                    }}
                />
                <span className="rate-value">{rate}</span>
                <br />
            </div>
            <div className="">
                <div dangerouslySetInnerHTML={{ __html: answer }}></div>
                <br />
                <input type="text" id='answer' ref={inputAns} onKeyDown={e => handleKeyDown(e)} /><br />
            </div>
        </div>
    );
}

export default ListenTensPract;