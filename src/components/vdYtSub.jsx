import React, { useEffect, useState } from "react";
import '../common/style.css';
import _ from 'lodash';
import { Sub } from './childCpn/subtitle.jsx'

let player;
let interval
const YoutubeSub = () => {

    const [arrSub, setArrSub] = useState([]);

    const [isReplay, setIsReplay] = useState(true);
    const CONTROL_REPLAY = 'Replay';

    useEffect(() => {
        console.log("useEffect[]:");
        if (!window.YT) { // If not, load the script asynchronously
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            // onYouTubeIframeAPIReady will load the video after the script is loaded
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        } else { // If script is already there, load the video directly
            // loadVideo();
            onYouTubeIframeAPIReady();
        }
        document.getElementById('media-sub').value = `0:04
in sequel server so let's begin in front
0:12
of me I have a JSON object which
0:14
contains information about superheroes
0:16
like a squad like members and a list of
0:21
powers for each member and we're going
0:23
to solve this jason in a sequel table
0:25
and we are going to extract some fields
0:27
from here so basically we are going to
0:30
parse some JSON object and jason erase i
0:33
have added the json object in in a
0:37
sequel table and i've also added another
0:40
object which is not correctly formatted
0:44
and the reason why i've added the second`;
        return () => {
            console.log("destroy interval:"+interval);
            clearInterval(interval);
        };
       
    }, []);


    const onYouTubeIframeAPIReady = () => {
        player = new window.YT.Player('player', {
            height: 390,
            width: 640,
            videoId: "0Zm41iZzbnI",
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onReady': onPlayerReady,
                // 'onStateChange': onPlayerStateChange
            }
        });
    }
    const onPlayerReady = (event) => {
        event.target.playVideo();
    }
    
    const onResize = () => {
        player.setSize(640, 390);
    };
    const onPressBtnVerySmall = () => {
        player.setSize(100, 80);
    };
    const onPressBtnSmall = () => {
        player.setSize(70, 50);
    };
    const onPressBtnMedium = () => {
        player.setSize(1200, 700);
    };
    const onPressBtnBig = () => {
        player.setSize(1200, 700);
    };
    const onHideAll = () => {
        document.getElementById('control').style.display = "none";
    };
    const onShowAll = () => {
        document.getElementById('control').style.display = "block";
    };
    const onChangeWith = (value) => {
        document.getElementById('txtHeight').value = value * 0.7;
    };
    const loadSub = () => {
        var txtSub = document.getElementById('media-sub').value;
        var lineSubArr = txtSub.split('\n');
        let count = 1;
        let tempTime = '';
        let arrTemp = [];
        lineSubArr.forEach((line, index) => {
            if (count === 1) {
                tempTime = line;
            }
            if (count === 2) {
                arrTemp.push(new Sub(tempTime, line));
                count = 0;
            }
            count++;

        });
        setArrSub(arrTemp);
    };

    const LineSub = (props) => {
        return (
            <div role='button' className='sub-item' onClick={(e) => onClickSub(props.time, props.value)}>
                key ={props.time}   value ={props.value}
            </div>
        )
    }
    const onClickSub = (time, value) => {
        console.log("interval1:"+interval);
        clearInterval(interval);
        let timestart = time.split(':').reduce((acc, time) => (60 * acc) + +time);
        let nextIndex = arrSub.length - 1;
        for (let i = 0; i < arrSub.length; i++) {
            if (_.isEqual(arrSub[i].time, time)) {
                nextIndex = i + 1;
            }
        }
        let nextTime = arrSub[nextIndex].time.split(':').reduce((acc, time) => (60 * acc) + +time);
        console.log(timestart);
        console.log(nextTime);
        // setTimeStart(timestart);
        // setNextTime(nextTime);
        player.seekTo(timestart, true);
        console.log("onClickSub");

            interval = setInterval(() => {
                let currTime = player.getCurrentTime().toString().substring(0, 2);
                if (_.isEqual(currTime, nextTime.toString()) && isReplay === true) {
                    console.log("player.seekTo(timeStart, true);:"+timestart);
                    player.seekTo(timestart, true)
                }
            }, 1000);
            console.log("interval2:"+interval);
            
        
    };
    const onProcess = () => {
        var txtSrcMedia = document.getElementById('txtSrcMedia').value;
        var url = txtSrcMedia.substring(txtSrcMedia.lastIndexOf('/') + 1, txtSrcMedia.length).trim();
        player.loadVideoById(url, 0);
    };
    const onChangeReplay = (value) => {
        // setIsUseVoice(value);
        if (_.isEqual(value, CONTROL_REPLAY)) {
            setIsReplay(false);
        } else {
            clearInterval(interval);
            setIsReplay(false);
        }
    }
    return (

        <div className='media-left'>
            <div id="player"></div>
            <div id=''>
                <div className=''>
                    <div className=''>
                        <div id='sub-control' >
                            <div>
                                {arrSub.map((item, index) => <LineSub key={`${item.time}${item.value}`}
                                    time={item.time}
                                    value={item.value}
                                />)}
                            </div>
                        </div>
                        <select   onChange={(e) => {
                            onChangeReplay(e.target.value)
                        }}>
                            <option value={CONTROL_REPLAY}>Replay</option>
                            <option value="None">None</option>
                        </select>
                        <br />
                        <input type="text" id="txtSrcMedia" /> <br />
                        <input type='submit' value="Load" id='btnExecute' onClick={() => onProcess()} />
                        <br />
                        <p>width:</p>
                        <input type="text" id="txtWidth" onChange={(e) => {
                            onChangeWith(e.target.value)
                        }}
                        />
                        <p>Height:</p>
                        <input type="text" id="txtHeight" />
                        <br />
                        <input type='submit' value="Resize" id='btnResize' onClick={() => onResize()} />
                        <input type='submit' value="100x80" id='btnVerySmall' onClick={() => onPressBtnVerySmall()} />
                        <input type='submit' value="70x50" id='btnSmall' onClick={() => onPressBtnSmall()} />
                        <input type='submit' value="1200x700" id='btnMedium' onClick={() => onPressBtnMedium()} />
                        <input type='submit' value="100%" id='btnBig' onClick={() => onPressBtnBig()} />
                    </div>
                </div>
                <div className='option-right'> <br />
                </div>
                <input type='submit' value="loadSub" id='btnLoadSube' onClick={() => loadSub()} /><br />
                <textarea id='media-sub'></textarea>

            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <input type='submit' value="H" id='btnHide' onClick={() => onHideAll()} />
            <input type='submit' value="S" id='btnShow' onClick={() => onShowAll()} />

        </div>
    )

};
export default YoutubeSub;