// this is a tools for studying english
import React, { useEffect, useState } from "react";
import '../common/style.css';
import '../common/styleTemplate.css';
import _ from 'lodash';
import { gapi } from 'gapi-script';
import config from '../common/config.js';
import { load, updateCell } from '../api/sheet.js';
import PractWords from './practWords.jsx'
import { randomList } from "../common/common.js";
import { FaCircleNotch } from 'react-icons/fa';

const NotifyAuto = () => {
    const [isNotify, setIsNotify] = useState(false);
    const [items, setItems] = useState([]);
    const [oderRandomS, setOderRandomS] = useState('order');

    useEffect(() => {
        document.getElementById('timeValue').value = '60';
        document.getElementById('pracWord').style.display = "none";
        document.getElementById('control').style.display = "block";
        document.getElementById('notify-control').style.display = "block";
        getDataFromExcel();
    }, []);
    const SPLIT_LINE_INPUT_FIELD = '\n';

    const initClient = () => {
        gapi.client.init({
            // window.gapi.client.init({
            apiKey: config.apiKey,
            clientId: config.clientId,
            discoveryDocs: config.discoveryDocs,
            scope: config.scope
        })
            .then(() => {
                load(onLoad);
            })
    };

    const onLoad = (data, error) => {
        if (data) {
            const result = data.items;
            setItems(result);
            console.log(result);
        } else {
            console.log(error);
        }
    };

    const getDataFromExcel = () => {
        gapi.load("client:auth2", initClient);

    }
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
                    arrList.push(item.eng + ' : ' + meaning);
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

    var functionIsRunning = false;

    const onStart = async () => {
        if (functionIsRunning) {
            return;
        }
        functionIsRunning = true;
        setIsNotify(true);
        var checkExcNotify = 'true';
        while (checkExcNotify === 'true') {

            var lineInputs = getListLineField();
            for (var j = 0; j < lineInputs.length; j++) {
                var line = lineInputs[j];
                var oderRandom = document.getElementById("slGenData").value;

                if (oderRandom === 'random') {
                    line = randomList(lineInputs);
                }

                checkExcNotify = document.getElementById('isNotify').value;
                if (checkExcNotify === 'false') {
                    return;
                }
                if (!window.Notification) {
                    console.log('Browser does not support notifications.');
                } else {
                    // check if permission is already granted
                    if (Notification.permission === 'granted') {
                        // show notification here
                        var notification = new Notification(line);
                        // var notify = new Notification(valueTime, {
                        //     body: line,
                        //     icon: 'https://bit.ly/2DYqRrh',
                        // });
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
                var valueTime = document.getElementById('timeValue').value;
                await new Promise(resolve => setTimeout(resolve, (valueTime * 1000)));
            }

        }
        functionIsRunning = false;
    };

    const getListLineField = () => {
        var txtField = document.getElementById('txtField').value.trim();
        var lineInputs = txtField.split(SPLIT_LINE_INPUT_FIELD);
        return lineInputs;
    }

    const onStop = () => {
        setIsNotify(false);
    };
    const onHideAll = () => {
        document.getElementById('control').style.display = "none";
    };
    const onShowAll = () => {
        var prac = document.getElementById('control');
        if (prac.style.display === "block") {

            document.getElementById('control').style.display = "none";
        } else {
            document.getElementById('control').style.display = "block";

        }
    };
    const onShowPract = () => {
        var prac = document.getElementById('pracWord');
        if (prac.style.display === "block") {

            document.getElementById('pracWord').style.display = "none";
        } else {
            document.getElementById('pracWord').style.display = "block";

        }
        onHideWhenPrac();
    };
    const onChangeOrder = (value) => {
        setOderRandomS(value);
    }

    const onHideWhenPrac = () => {
        var prac = document.getElementById('notify-control');
        if (prac.style.display === "block") {
            document.getElementById('notify-control').style.display = "none";
        } else {
            document.getElementById('notify-control').style.display = "block";
        }
    };
    return (
        <div>
            <div id='notify-control'>
                <div className='option-noti block' id='control'>
                    <div className='option-left'>
                        {/* <div>Field:</div> */}
                        <textarea className='ta3' id='txtField'></textarea>
                    </div>
                    <div className='option-right'>
                        <input className='button-41' type='submit' value="Start" id='btnStart' onClick={() => onStart()} /><br />
                        <input className='button-33' type='submit' value="GSheetApi" id='btnGSheetApi' onClick={() => onGSheetApi()} /><br />
                        <input className='button-33' type='submit' value="GetAPI" id='btnGetAPI' onClick={() => getDataFromExcel()} /><br />
                        {/* <input className='button-33' type='submit' value="Hide" id='btnHide' onClick={() => onHideAll()} /><br /> */}
                        <select className='button-33' name="genData" id="slGenData" onChange={(e) => {
                            onChangeOrder(e.target.value)
                        }}>
                            <option value="order">order</option>
                            <option value="random">random</option>
                        </select><br /><br />
                        <input className='button-59' type="submit" id='isNotify' value={isNotify ? "is notifying" : 'not started yet'} /><br />
                    </div>
                </div>
                <div className='control-footer'>
                    <button className='button-41' id='btnStop' onClick={() => onStop()} >Stop</button>
                    <input className='button-23' type="text" id='timeValue' />
                    <input className='button-33' type='submit' value="Show" id='btnShow' onClick={() => onShowAll()} />
                    <input className='button-33' type='submit' value="Practice" id='btnPract' onClick={() => onShowPract()} />
                </div>
            </div>
            {/* <FaStop/> */}
            <div id='pracWord'>
                <PractWords items={items} oderRandom={oderRandomS} />
            </div>
            <div id='btnHideWhenPrac' onClick={() => onHideWhenPrac()} ><FaCircleNotch /></div>
        </div>
    );

}

export default NotifyAuto;