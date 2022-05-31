// this file is converted from javascript to reactjs so some code is not optimized
import React, { useEffect, useState } from "react";
// import LineSub from "./childCpn/lineSub.jsx";
// import YTSubtitles from "youtube-subtitles-downloader";
import '../common/style.css';
import _ from 'lodash';
import { Sub } from './childCpn/subtitle.jsx'
// import YouTube from 'react-youtube';

let player;
var timerId;
const YoutubeSub = () => {

    const [arrSub, setArrSub] = useState(Array());
    const [timeReplay, setTimeReplay] = useState(10000000);
    const [isReplay, setIsReplay] = useState(false);
    const [timeStart, setTimeStart] = useState(0);
    const [isChangeSub, setIsChangeSub] = useState(false);
    // const [idVideo, setIdVideo] = useState('');

    useEffect(() => {

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
    }, []);
    const onYouTubeIframeAPIReady=()=> {
        player = new window.YT.Player('player', {
          height: 390,
          width: 640,
          videoId: "",
          playerVars: {
            'playsinline': 1
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
      const onPlayerReady=(event)=> {
        event.target.playVideo();
      }
      var done = false;
      const onPlayerStateChange=(event)=> {
        if (event.data === window.YT.PlayerState.PLAYING && !done) {
        //   setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      const stopVideo=() =>{
        player.stopVideo();
      }

    
    useEffect(() => {
        if(isChangeSub === true){
            clearInterval(timerId)
        }
        // if (isReplay===true) {
            console.log('replay');
             timerId= setInterval(() => {
                player.seekTo(timeStart, true);
                setIsChangeSub(false);
                // setTimeReplay(timeReplay+1)
            }, (timeReplay));
        // }else{
        //     clearInterval(timerId);
        // }

    }, [timeReplay]);

    useEffect(() => {
 if (isReplay===false) {
    clearInterval(timerId);
 }
    }, [isReplay]);

    const onResize = () => {
       player.setSize(640,390);
    };
    const onPressBtnVerySmall = () => {
        player.setSize(100,80);
    };
    const onPressBtnSmall = () => {
        player.setSize(70,50);
    };
    const onPressBtnMedium = () => {
        player.setSize(1200,700);
    };
    const onPressBtnBig = () => {
        player.setSize(1200,700);
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
        let count =1;
        let tempTime = '';
        let arrTemp = [];
        lineSubArr.forEach((line, index )=> {
            if(count===1){
             tempTime = line;
            }
            if(count===2){
               arrTemp.push(new Sub(tempTime, line));
                count=0;
            }
            count++;
            
        });
        setArrSub(arrTemp);
    };

    const LineSub = (props) => {
        return (
            <div role ='button' className ='sub-item'  onClick={(e) => onClickSub(props.time, props.value)}>
                key ={props.time}   value ={props.value} 
            </div>
        )
    }
    const onClickSub = (time, value) => {
        console.log(time);
        console.log(value);
        setIsChangeSub(true);
        let timeSecond = time.split(':').reduce((acc,time) => (60 * acc) + +time);
        setTimeStart(timeSecond);
        let nextIndex=arrSub.length-1;
        for(let i=0; i<arrSub.length; i++){
            if(_.isEqual(arrSub[i].time, time)){
                nextIndex = i+1;
            }
        }
        let nextTime =arrSub[nextIndex].time.split(':').reduce((acc,time) => (60 * acc) + +time);
        console.log(timeSecond);
        console.log(nextTime);
        setIsReplay(true);
        setTimeReplay((nextTime-timeSecond)*1000);
        // let tArr= arrSub.filter(item=>_.isEqual(item.time, time));
        
        // console.log(player.getCurrentTime());
        player.seekTo(timeSecond, true);

    };
    const onProcess = () => {
        var txtSrcMedia = document.getElementById('txtSrcMedia').value;
        var url =  txtSrcMedia.substring(txtSrcMedia.lastIndexOf('/') + 1, txtSrcMedia.length).trim();
        
        player.loadVideoById(url, 0);
        // setIdVideo(url);
    };
    const onStop = () => {
        setIsReplay(false);
    };

    return (
        
        <div className='media-left'>
            {/* <iframe title="this is a video, clear!" width="420" height="315" id='iFMedia' src="">
            </iframe> <br /> */}
            <div id="player"></div>
            {/* <YouTube id='iFMedia' videoId="8UVNT4wvIGY" opts={opts} onReady={_onReady} /> */}
            <div id=''>
                <div className=''>
                    <div className=''>
                    <div id = 'sub-control' >
                        <div>
                        {arrSub.map((item, index) => <LineSub  key ={`${item.time}${item.value}`}
                        time={item.time}
                        value={item.value}
                        // onClick={(e) => onClickSub(e)}
                    />)}
                        </div>
                    </div>
                        <input type='submit' value="Stop" id='btnStop' onClick={() => onStop()} />
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
                <textarea  id='media-sub'></textarea>

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