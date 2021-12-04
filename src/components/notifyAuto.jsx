// this file is converted from javascript to reactjs so some code is not optimized
import React, { useEffect, useState } from "react";
import '../common/style.css';
import _ from 'lodash';
import { gapi } from 'gapi-script';
import config from '../common/config.js';
import { load, updateCell } from '../api/sheet.js';

const NotifyAuto = () => {
    const [isNotify, setIsNotify] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        document.getElementById('timeValue').value = '60000';
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
                arrList.push(item.eng + ' : ' + meaning);
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
        return ;
        }
        functionIsRunning = true;
        setIsNotify(true);
        var checkExcNotify = 'true';
        while (checkExcNotify === 'true') {
            
            var lineInputs = getListLineField();
            for (var j = 0; j < lineInputs.length; j++) {
                var line = lineInputs[j];
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
                await new Promise(resolve => setTimeout(resolve, valueTime));
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
        document.getElementById('control').style.display = "block";
    };

    //

    return (
        <div>
            <div className='option block' id='control'>
                <div className='option-left'>
                    <div>Field:</div>
                    <textarea id='txtField'></textarea>
                </div>
                <div className='option-right'>
                    <input type='submit' value="Start" id='btnStart' onClick={() => onStart()} /><br />
                    <input type='submit' value="GSheetApi" id='btnGSheetApi' onClick={() => onGSheetApi()} /><br />
                    <input type='submit' value="GetAPI" id='btnGetAPI' onClick={() => getDataFromExcel()} /><br />
                    <input type='submit' value="H" id='btnHide' onClick={() => onHideAll()} /><br />
                    <input type="submit" id='isNotify' value={isNotify} /><br />
                </div>
            </div>
            <input type='submit' value="Stop" id='btnStop' onClick={() => onStop()} />
            <input type="text" id='timeValue' /><br />
            <input type='submit' value="S" id='btnShow' onClick={() => onShowAll()} />
        </div>
    );
}

export default NotifyAuto;