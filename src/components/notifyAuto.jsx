// this file is converted from javascript to reactjs so some code is not optimized
import React, { useEffect, useState } from "react";
import '../common/style.css';
import _ from 'lodash';

const NotifyAuto = () => {
    const [isNotify, setIsNotify] = useState(false);
    useEffect(() => {
        document.getElementById('timeValue').value = '60000';

    }, []);
    const SPLIT_LINE_INPUT_FIELD = '\n';

    const getListLineField = () => {
        var txtField = document.getElementById('txtField').value;
        var lineInputs = txtField.split(SPLIT_LINE_INPUT_FIELD);
        return lineInputs;
    }

    const onStart = async () => {
        
        setIsNotify(true);
        var checkExcNotify = 'true';
        while (checkExcNotify === 'true') {
            checkExcNotify = document.getElementById('isNotify').value;

            var lineInputs = getListLineField();
            for (var j = 0; j < lineInputs.length; j++) {
                var line = lineInputs[j];
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
    };
    const onStop = () => {
        setIsNotify(false);
    };
    const onHideAll = () => {
        document.getElementById('control').style.display = "none";
    };
    const onShowAll = () => {
        document.getElementById('control').style.display = "block";
    };
    return (
        <div>
            <div className='option block' id='control'>
                <div className='option-left'>
                    <div>Field:</div>
                    <textarea id='txtField'></textarea>
                </div>
                <div className='option-right'>
                    <input type='submit' value="Start" id='btnStart' onClick={() => onStart()} />
                    <input type="hidden" id='isNotify' value={isNotify} />
                    <input type='submit' value="H" id='btnHide' onClick={() => onHideAll()} />
                </div>
            </div>
            <input type='submit' value="Stop" id='btnStop' onClick={() => onStop()} />
            <input type="text" id='timeValue' /><br/>
            <input type='submit' value="S" id='btnShow' onClick={() => onShowAll()} />
        </div>
    );
}

export default NotifyAuto;