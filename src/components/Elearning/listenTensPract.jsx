// this is a tools for studying english
import React, { useEffect, useState, useRef } from "react";
import '../../common/style.css';
import _ from 'lodash';
import '../../common/styleTemplate.css';
import { FaEyeSlash, FaRegSmile, FaVolumeUp, FaRegFrown } from 'react-icons/fa';
import { useSpeechSynthesis } from "react-speech-kit";
import { replaceArr, isEqualStr } from "../../common/common.js";

let arrSentence = []
let indexST = -1;
let arrIndexErr = []
let arrIndexErr2 = []
let currIndexErr = -1
let sentence = "";
const ListenTensPract = () => {
    const onEnd = () => {
        // You could do something here after speaking has finished
    };
    const [input, setInput] = useState("");
    const [voiceIndex, setVoiceIndex] = useState(0);
    const { speak, voices } = useSpeechSynthesis({
        onEnd,
    });
    const [rate, setRate] = useState(1);
    const [answer, setAnswer] = useState("");
    const [errorMs, setErrorMs] = useState("");
    const [lastAnsw, setLastAnsw] = useState('');
    const inputAns = useRef(null)

    useEffect(() => {
       document.getElementById('inputTxt').value =`table, column, newValue, oldValue, date, system(if need), ip, UserAgent, clumnReference, operatorReference, valueReference. All tables/columns/actions that need to log are configurable.`
    }, []);
    useEffect(() => {
        voices.forEach((option, index) => {
            if (option.lang.includes("en-US")) {
                setVoiceIndex(index);
            }
        });
    }, [voices]);
    const onHideInput = (idName) => {
        console.log(idName)
        var prac = document.getElementById(`${idName}`);
        if (prac.style.display === "block" || prac.style.display === "") {
            document.getElementById(`${idName}`).style.display = "none";
        } else {
            document.getElementById(`${idName}`).style.display = "block";
        }
    };

    const onStart = () => {
        let input = document.getElementById('inputTxt').value;
        let arrReg= [',', '?', '(', ')', '!', '—', '-', '=', '”', '“',
        ';']
        input = replaceArr(input,arrReg, '.' )
        arrSentence = input.split('.')
        console.log(arrSentence)
        indexST = -1
        changeSentence()
        document.getElementById(`inputTxt`).style.display = "none";
    };
    const changeSentence = () => {
        indexST = indexST + 1;
        if(indexST >= arrSentence.length){
            indexST = 0;
        }
        setAnswer('')
        setLastAnsw(sentence)
        sentence = arrSentence[indexST];
        speakAns();
    };
    const speakAns = () => {
        speakText(sentence)
    };
    const onGenStrCheck = (inputAns) =>{
        let htmlCheck =''
        let arrAns = sentence.split('')
        let arrInput = inputAns.split('')

        let flagRight = false;
        let flagWrong = false;

        for( let i=0; i<arrAns.length; i++){
            if(isEqualStr(arrAns[i], arrInput[i], true)){
                if(flagWrong === true){
                    htmlCheck = htmlCheck.concat("</span>")
                    flagWrong = false
                }
                if(flagRight === false){
                    htmlCheck = htmlCheck.concat("<span class ='ans-check-right'>")
                    flagRight = true
                }
            }else{
                arrIndexErr.push(i)
                arrIndexErr2.push(htmlCheck.length)
                if(flagRight === true){
                    htmlCheck = htmlCheck.concat("</span>")
                    flagRight = false
                }
                if(flagWrong === false){
                    htmlCheck = htmlCheck.concat("<span class ='ans-check-wrong'>")
                    flagWrong = true
                }
            }
            if(arrInput[i]){
                htmlCheck = htmlCheck.concat(arrInput[i])
            }
        }
        if(flagWrong === true){
            htmlCheck = htmlCheck.concat("</span>")
            flagWrong = false
        }
        if(flagRight === true){
            htmlCheck = htmlCheck.concat("</span>")
            flagRight = false
        }
        console.log(arrIndexErr)
       console.log(arrIndexErr2)
        return htmlCheck
    }
    const onCheck = () =>{
        let ans = document.getElementById('answer').value;
        if(isEqualStr(sentence, ans, true)){
            changeSentence()
            setErrorMs('correct!');
        }else{
            setAnswer(onGenStrCheck(ans))
            setErrorMs('wrong!');
        }

    }
    const handleKeyDownInput = (e) => {
        if (e.nativeEvent.code === 'End' || e.nativeEvent.code === 'Home') {
            onHideInput('inputTxt')
        }
    }

    const genHintStrAns = () => {
       // let strClassErr = `<span class ='ans-check-wrong'>`
        let inputAns = document.getElementById('answer').value;
        let strHtml = onGenStrCheck(inputAns)
        let resStr = ""

        currIndexErr = currIndexErr + 1;
        
        let firstStr = strHtml.substring(0, arrIndexErr2[currIndexErr])
        let lastStr = strHtml.substring(arrIndexErr2[currIndexErr] + 1, strHtml.length)
        console.log(firstStr)
        console.log(lastStr)
        resStr = firstStr 
            + "<span class ='ans-check-hint'>"
            + sentence.substring(arrIndexErr[currIndexErr], arrIndexErr[currIndexErr] + 1) 
            + "</span>" + lastStr;
        setAnswer(resStr)
    }
    const handleKeyDown = (e) => {
        console.log(e.nativeEvent.code)
        if (e.key === 'Enter') {
            onCheck();
        }
        if (e.nativeEvent.code === 'ShiftLeft') {
            // if(answer.length>0){
            //     setAnswer('')
            // }else{
            //     setAnswer(sentence)
            // }
            genHintStrAns();

        }
        // if (e.nativeEvent.code === 'ControlLeft') {
        //     setMode(mode===MODE_NONE?MODE_SPEAKE_CHANGE_QUST:MODE_NONE);
        // }
        if (e.nativeEvent.code === 'ControlRight') {
            speakText(lastAnsw);
        }
        if (e.nativeEvent.code === 'ShiftRight') {
            speakAns();
        }
        if (e.nativeEvent.code === 'End') {
            changeSentence();
        }
        if (e.nativeEvent.code === 'Home') {
            onStart();
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
            <textarea id='inputTxt' className='area-input' onKeyDown={e => handleKeyDownInput(e)}></textarea>

            <button className='button-12 inline' id='hideBtn' onClick={() => onHideInput('inputTxt')} ><FaEyeSlash /></button>
            <span> </span>
            <button className='button-12 inline' id='Start' onClick={() => onStart()} >Start</button>
            <span> </span>
            <select className='button-12 inline'
                id="voice"
                name="voice"
                value={voiceIndex || ''}
                onChange={(event) => {
                    setVoiceIndex(event.target.value);
                }}
            >
                <option value="">Default</option>
                {voices.map((option, index) => (
                    <option key={option.voiceURI} value={index}>
                        {`${option.lang} - ${option.name}`}
                    </option>
                ))}
            </select>
            <span> </span>
            <br/>
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
            <br/>
            <div className=''>{errorMs === 'wrong!' ? <FaRegFrown /> : <FaRegSmile />}</div>
            {/* <div>{answer}{_.isEmpty(answer) ? <div></div> : <FaVolumeUp className='iconSound' onClick={() => speakText(answer)} />}</div> */}
            <div dangerouslySetInnerHTML={{__html: answer}}></div>
            <br/>
            <div className="">
            <input type="text" id='answer' ref={inputAns} onKeyDown={e => handleKeyDown(e)} /><br />
            <div>{lastAnsw}</div>
            </div>
        </div>
    );
}

export default ListenTensPract;