// this file is converted from javascript to reactjs so some code is not optimized
import React, { useEffect, useState } from "react";
// import LineSub from "./childCpn/lineSub.jsx";
// import YTSubtitles from "youtube-subtitles-downloader";
import '../common/style.css';
import _ from 'lodash';
import { Sub } from './childCpn/subtitle.jsx'
const YoutubeSub = () => {


    const [arrSub, setArrSub] = useState(Array());
    const [listSubElement, setListSubElement] = useState(null);

    useEffect(() => {
        document.getElementById('txtWidth').value = '640';
        document.getElementById('txtHeight').value = '390';

        if (!window.YT) { // If not, load the script asynchronously
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
      
            // onYouTubeIframeAPIReady will load the video after the script is loaded
            window.onYouTubeIframeAPIReady = loadVideo;
      
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
          } else { // If script is already there, load the video directly
            loadVideo();
          }

    }, []);
    const loadVideo = () => {
    
        // the Player object is created uniquely based on the id in props
        player = new window.YT.Player(`iFMedia`, {
          videoId: 1,
          events: {
            onReady: onPlayerReady,
          },
        });
      };

      const onPlayerReady = event => {
        event.target.playVideo();
      };

    useEffect(() => {
        console.log(arrSub);

    }, [arrSub]);

    const onProcess = () => {
        // var txtSrcMedia = document.getElementById('txtSrcMedia').value;
        // var url = txtSrcMedia;
        // if (txtSrcMedia.indexOf('|') !== 0) {
        //     url = 'https://www.youtube.com/embed/' + txtSrcMedia.substring(txtSrcMedia.lastIndexOf('/') + 1, txtSrcMedia.length).trim();
        // } else {
        //     url = url.substring(1, url.length);
        // }
        // document.getElementById('iFMedia').src = url;


    };
    const onResize = () => {
        var txtWidth = document.getElementById('txtWidth');
        var txtWidthValue = txtWidth.value;
        var txtHeight = document.getElementById('txtHeight').value;
        document.getElementById('iFMedia').setAttribute("style", `width:${txtWidthValue}px; height:${txtHeight}px`);
    };
    const onPressBtnVerySmall = () => {
        document.getElementById('iFMedia').setAttribute("style", `width:100px; height:80px`);
    };
    const onPressBtnSmall = () => {
        document.getElementById('iFMedia').setAttribute("style", `width:70px; height:50px`);
    };
    const onPressBtnMedium = () => {
        document.getElementById('iFMedia').setAttribute("style", `width:1200px; height:700px`);
    };
    const onPressBtnBig = () => {
        document.getElementById('iFMedia').setAttribute("style", `width:100%; height:1500px`);
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
            <div role ='button' className ='sub-item'>
                key ={props.time}   value ={props.value} 
            </div>
        )
    }
    const onClickSub = () => {
    };

    return (
        
        <div className='media-left'>
            <iframe title="this is a video, clear!" width="420" height="315" id='iFMedia' src="">
            </iframe> <br />
            <div id='control'>
                <div className='option'>
                    <div className='option-left'>
                    <div id = 'sub-control'>
                        <div>
                        {arrSub.map((item, index) => <LineSub  key ={`${item.time}${item.value}`}
                        time={item.time}
                        value={item.value}
                        onClick={() => onClickSub()}
                    />)}
                        </div>
                    </div>

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