// this is a tools for studying english
import React, { useEffect, useState } from "react";
import '../common/style.css';
import '../common/styleTemplate.css';
import _ from 'lodash';
import { gapi } from 'gapi-script';
import config from '../common/config.js';
import { load } from '../api/sheet.js';
import PractWords from './practWords.jsx'
import { FaCircleNotch } from 'react-icons/fa';
import { useSpeechSynthesis } from "react-speech-kit";

const NotifyAuto = () => {
    const onEnd = () => {
        // You could do something here after speaking has finished
    };
    const { speak, voices } = useSpeechSynthesis({
        onEnd,
    });
    const [isNotify, setIsNotify] = useState(false);
    // const [isUseVoice, setIsUseVoice] = useState(true);
    const [items, setItems] = useState([]);
    const [oderRandomS, setOderRandomS] = useState('order');
    const [isLoadQuestion, setIsLoadQuestion] = useState(false);

    const [voiceIndex, setVoiceIndex] = useState(1);
    const [voiceIndexVie, setVoiceIndexVie] = useState(7);
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(0.7);
    const [sheet, setSheet] = useState("");
    let voice = voices[voiceIndex] || null;


    const styleFlexRow = { display: 'flex', flexDirection: 'row' };
    const styleContainerRatePitch = {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 12,
    };
    const SPLIT_WORD = ':';
    const IND_SPEAK_NOTI_VOICE = 'noti-voice';
    const IND_SPEAK_NO_VOICE = 'no-voice';
    const IND_SPEAK_NO_NOTI = 'no-noti';
    const IND_SPEAK_NOTI_NO_VIE = 'noti-no-vie';
    const IND_SPEAK_NO_NOTI_NO_VIE = 'no-noti-no-vie';
    const IND_SPEAK_NO_NOTI_ENG = 'noti-eng-voice';
    const IND_SPEAK_ALL_ENG = 'all-eng';
    const IND_SPEAK_NOTI_ENG = 'noti-eng';

    const IND_VALUE_ON = 'On';
    const IND_VALUE_OFF = 'Off';
    const SPLIT_LINE_INPUT_FIELD = '\n';

    /**  */
    useEffect(() => {
        document.getElementById('timeValue').value = '30';
        document.getElementById('pracWord').style.display = "none";
        document.getElementById('control').style.display = "block";
        document.getElementById('notify-control').style.display = "block";
        getDataFromExcel();

    }, []);

    useEffect(() => {
        getDataFromExcel();
        console.log("useEffect [sheet]");
    }, [sheet]);

    useEffect(() => {
        onGSheetApi();
        console.log("useEffect [items]");
    }, [items]);

    /** */
    const getDataFromExcel = () => {
        gapi.load("client:auth2", initClient);

    }

    /** */
    const onGSheetApi = () => {
        var arrList = [];
        if (!_.isEmpty(items)) {
            console.log(items.length);
            for (let i = 0; i < items.length; i++) {
                var item = items[i];
                var meaning = item.vi;
                if (!_.isEmpty(item.customDefine)) {
                    meaning = item.customDefine;
                }
                if (!_.isEmpty(item.eng) && item.eng.length > 0) {
                    if (_.isEmpty(meaning)) {
                        arrList.push(item.eng);
                    } else {
                        arrList.push(item.eng + ' ' + SPLIT_WORD + ' ' + meaning);
                    }
                }
            }
        }
        var strResult = '';
        for (let j = 0; j < arrList.length; j++) {
            strResult += arrList[j];
            strResult += '\n';

        }
        document.getElementById('txtField').value = strResult;
    }

    /** */
    const initClient = () => {
        //custom sheet
        var vsheet = sheet;
        gapi.client.init({
            // window.gapi.client.init({
            apiKey: config.apiKey,
            clientId: config.clientId,
            discoveryDocs: config.discoveryDocs,
            scope: config.scope
        })
            .then(() => {
                load(onLoad, vsheet);
            })
    };

    /** */
    const onLoad = (data, error) => {
        if (data) {
            const result = data.items;
            let arr = [];
        
            result.forEach(item => {
                if(!_.isEmpty(item)&&!_.isEmpty(item.eng)){
                    arr.push(item);
                }
            });

            setItems(arr);
            console.log(arr);
        } else {
            console.log(error);
        }
    };


    /** */

    const onStart = async () => {
        var functionIsRunning = document.getElementById('isNotify').value;
        if (functionIsRunning === IND_VALUE_ON) {
            return;
        }

        setIsNotify(true);
        var checkExcNotify = IND_VALUE_ON;
        var lineInputs = getListLineField();
        while (checkExcNotify === IND_VALUE_ON) {
            let line = "";

            let oderRandom = document.getElementById("slGenData").value;

            if (oderRandom === 'random') {
                let index =Math.floor(Math.random()*lineInputs.length);
                line = lineInputs[index];
                lineInputs.splice(index, 1);
            }else{
                line = lineInputs[0];
                lineInputs.shift();
            }
            if(_.isEmpty(lineInputs)){
                lineInputs = getListLineField();
            }

            onNotiExc(line);

            let valueTime = document.getElementById('timeValue').value;
            await new Promise(resolve => setTimeout(resolve, (valueTime * 1000)));

            checkExcNotify = document.getElementById('isNotify').value;
        }
    };

    /** */
    const onNotiExc = (line) => {

        if (!window.Notification) {
            console.log('Browser does not support notifications.');
        } else {
            // check if permission is already granted
            if (Notification.permission === 'granted') {
                // show notification here
                var isSpeak = document.getElementById('slIsUseVoice').value;
                if (!_.isEmpty(line)) {
                    console.log(line.indexOf(SPLIT_WORD));
                    console.log(line.length);
                    var engStr = line.substring(0, line.indexOf(SPLIT_WORD));
                    var viStr = line.substring(line.indexOf(SPLIT_WORD) + SPLIT_WORD.length, line.length);

                    if (_.isEmpty(engStr)) {
                        engStr = viStr;
                        viStr = '';
                    }
                    var utterance = new window.SpeechSynthesisUtterance();

                    //because state is not synchronized, can't use state in this line(in loop)
                    var vVoice = document.getElementById('voice').value;
                    var vVoiceVie = document.getElementById('voiceVie').value;
                    var vrate = document.getElementById('rate').value;

                    if (_.isEqual(isSpeak, IND_SPEAK_NOTI_VOICE) || _.isEqual(isSpeak, IND_SPEAK_NO_NOTI)
                        || _.isEqual(isSpeak, IND_SPEAK_NOTI_NO_VIE) || _.isEqual(isSpeak, IND_SPEAK_NO_NOTI_NO_VIE)
                        || _.isEqual(isSpeak, IND_SPEAK_NO_NOTI_ENG) || _.isEqual(isSpeak, IND_SPEAK_ALL_ENG)) {

                        utterance.text = engStr;
                        // utterance.lang = 'en-US';
                        utterance.rate = vrate;
                        utterance.voice = voices[vVoice];
                        utterance.volume = 10;
                        //  setting pitch 
                        // utterance.pitch =pitch;
                        speak(utterance);
                    }

                    if (_.isEqual(isSpeak, IND_SPEAK_NOTI_VOICE) || _.isEqual(isSpeak, IND_SPEAK_NO_NOTI)
                        || _.isEqual(isSpeak, IND_SPEAK_NO_NOTI_ENG)) {
                        utterance.text = viStr;
                        // utterance.lang = 'vi-VN';
                        utterance.rate = vrate;
                        utterance.voice = voices[vVoiceVie];
                        speak(utterance);
                    }
                    if (_.isEqual(isSpeak, IND_SPEAK_NO_NOTI_ENG) || _.isEqual(isSpeak, IND_SPEAK_ALL_ENG)
                        || _.isEqual(isSpeak, IND_SPEAK_NOTI_ENG)) {
                        var notification = new Notification(engStr);
                    }

                    if (_.isEqual(isSpeak, IND_SPEAK_NOTI_VOICE) || _.isEqual(isSpeak, IND_SPEAK_NO_VOICE)
                        || _.isEqual(isSpeak, IND_SPEAK_NOTI_NO_VIE)) {
                        var notification = new Notification(line);
                    }

                }
            } else {
                // request permission from user
                Notification.requestPermission().then(function (p) {
                    if (p === 'granted') {
                        // show notification here
                    } else {
                        console.log('User blocked notifications.');
                    }
                }).catch(function (err) {
                    console.error(err);
                });
            }
        }
    }

    /** */
    const getListLineField = () => {
        var txtField = document.getElementById('txtField').value.trim();
        var lineInputs = txtField.split(SPLIT_LINE_INPUT_FIELD);
        let arrResult = [];
        
        lineInputs.forEach(item => {
            if(!_.isEmpty(item)){
                arrResult.push(item);
            }
        });
        return arrResult;
    }

    /** */
    const onStop = () => {
        setIsNotify(false);
    };

    /** */
    const onHideAll = () => {
        document.getElementById('control').style.display = "none";
    };

    /** */
    const onShowAll = () => {
        var prac = document.getElementById('control');
        if (prac.style.display === "block") {

            document.getElementById('control').style.display = "none";
        } else {
            document.getElementById('control').style.display = "block";

        }
    };

    /** */
    const onShowPract = () => {
        var prac = document.getElementById('pracWord');
        setIsLoadQuestion(true);

        if (prac.style.display === "block") {

            document.getElementById('pracWord').style.display = "none";
        } else {
            document.getElementById('pracWord').style.display = "block";
            onHideWhenPrac();
        }

    };

    /** */
    const onChangeOrder = (value) => {
        setOderRandomS(value);
    }

    /** */
    const onChangeIsUseVoice = (value) => {
        // setIsUseVoice(value);
        if (_.isEqual(value, IND_SPEAK_NO_VOICE)) {
            document.getElementById('sound-control').style.display = "none";
        } else {
            document.getElementById('sound-control').style.display = "block";
        }
    }

    /** */
    const onHideWhenPrac = () => {
        var prac = document.getElementById('notify-control');
        if (prac.style.display === "block") {
            document.getElementById('notify-control').style.display = "none";
        } else {
            document.getElementById('notify-control').style.display = "block";
        }
    };


    /** */
    return (
        <div>
            <div id='notify-control'>
                <div className='option-noti block' id='control'>
                    <div className='option-left'>
                        {/* <div>Field:</div> */}
                        <textarea title='f' id='txtField'></textarea>
                    </div>
                    <div className='option-right notify-right'>
                        <select className='button-34' name="sheet" id="slsheet" onChange={(e) => {
                            setSheet(e.target.value)
                        }}>
                            <option value="Words1!A1:C100">Words1</option>
                            <option value="Words2!A1:C100">Words2</option>
                            <option value="Sentence1!A1:C500">Sentence1</option>
                            <option value="Sentence2!A1:C500">Sentence2</option>
                        </select>
                        {/* <input className='button-34' type='submit' value="GSheetApi" id='btnGSheetApi' onClick={() => onGSheetApi()} />
                        <input className='button-34' type='submit' value="GetAPI" id='btnGetAPI' onClick={() => getDataFromExcel()} /> */}
                        {/* <input className='button-33' type='submit' value="Hide" id='btnHide' onClick={() => onHideAll()} /><br /> */}

                        <select className='button-33' name="genData" id="slGenData" onChange={(e) => {
                            onChangeOrder(e.target.value)
                        }}>
                            <option value="order">order</option>
                            <option value="random">random</option>
                        </select>
                        <select className='button-33' name="isUseVoice" id="slIsUseVoice" onChange={(e) => {
                            onChangeIsUseVoice(e.target.value)
                        }}>
                            <option value={IND_SPEAK_NO_NOTI_ENG}>Notify Eng - Voice</option>
                            <option value={IND_SPEAK_NOTI_VOICE}>Notify - Voice</option>
                            <option value={IND_SPEAK_NO_VOICE}>Notify</option>
                            <option value={IND_SPEAK_NO_NOTI}>Voice</option>
                            <option value={IND_SPEAK_ALL_ENG}>Notify Eng - Voice Eng</option>
                            <option value={IND_SPEAK_NOTI_NO_VIE}>notify - Voice Eng</option>
                            <option value={IND_SPEAK_NO_NOTI_NO_VIE}>Voice Eng</option>
                            <option value={IND_SPEAK_NOTI_ENG}>noti Eng</option>
                        </select>

                        <div id='sound-control'>
                            <div>Voice 1:</div>
                            <select className='button-33'
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
                            <div style={styleContainerRatePitch}>
                                <div style={styleFlexRow}>
                                    <label htmlFor="rate">Speed: </label>
                                    <div className="rate-value">{rate}</div>
                                </div>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="2"
                                    defaultValue="0.7"
                                    step="0.1"
                                    id="rate"
                                    onChange={(event) => {
                                        setRate(event.target.value);
                                    }}
                                />
                            </div>
                            {/*  setting pitch */}
                            {/* <div style={styleContainerRatePitch}>
                                <div style={styleFlexRow}>
                                    <label htmlFor="pitch">Pitch: </label>
                                    <div className="pitch-value">{pitch}</div>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="2"
                                    defaultValue="1"
                                    step="0.1"
                                    id="pitch"
                                    onChange={(event) => {
                                        setPitch(event.target.value);
                                    }}
                                />
                            </div> */}
                            <div>Voice 2:</div>
                            <select className='button-33'
                                id="voiceVie"
                                name="voiceVie"
                                value={voiceIndexVie || ''}
                                onChange={(event) => {
                                    setVoiceIndexVie(event.target.value);
                                }}
                            >
                                <option value="">Default</option>
                                {voices.map((option, index) => (
                                    <option key={option.voiceURI} value={index}>
                                        {`${option.lang} - ${option.name}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='control-footer'>
                    <input className='button-41' type='submit' value="Start" id='btnStart' onClick={() => onStart()} />
                    <button className='button-41' id='btnStop' onClick={() => onStop()} >Stop</button>
                    <input className='button-23' type="text" id='timeValue' />
                    <input className='button-33' type='submit' value="Show" id='btnShow' onClick={() => onShowAll()} />
                    <input className='button-33' type='submit' value="Practice" id='btnPract' onClick={() => onShowPract()} />
                    <input className='button-59' type="submit" id='isNotify' value={isNotify ? IND_VALUE_ON : IND_VALUE_OFF} /><br />
                </div>
            </div>
            {/* <FaStop/> */}
            <div id='pracWord'>
                <PractWords items={items} oderRandom={oderRandomS} voice={voice} rate={rate} 
                pitch={pitch} isLoadQuestion= {isLoadQuestion} />
            </div>
            <div id='btnHideWhenPrac' onClick={() => onHideWhenPrac()} ><FaCircleNotch /></div>
        </div>
    );

}

export default NotifyAuto;