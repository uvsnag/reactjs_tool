import React, { useEffect, useState } from "react";
import '../common/styleYoutSub.css';
import _ from 'lodash';
import { Sub } from './childCpn/subtitle.jsx'
// import YTSubtitles from "youtube-subtitles-downloader";
import YouTube from 'react-youtube';

let player;
let interval;
let currentTime;
let startTime = 0;
let nextTime = 100000;
let oldClickClass = null;
let isReplay = true;
let mode = '';

console.log("int..ed variables");

const YoutubeSub = () => {

    const text = ` 0:00
     but what you do isn't for the quick win
     0:03
     it's for the big win
     0:05
     it's for a happier healthier society
     0:08
     as well as for happier healthier
     0:11
     children
     0:12
     thank you
     0:14
     anton deck and thank you mike and the
     0:17
     ford trust for bringing us all here
     0:19
     together this morning
     0:21
     i'm so pleased to be joining you to
     0:23
     launch the taking action on addiction
     0:26
     campaign
     0:27
     and i'm grateful to those of you who
     0:29
     have shared your experiences of
     0:31
     addiction with me here today
     0:34
     addiction is not a choice
     0:38
     no one chooses to become an addict
     0:41
     but it can happen to any one of us
     0:45
     none of us are immune
     0:48
     yet it's all too rarely discussed as a
     0:50
     serious mental health condition
     0:52
     and seldom do we take the time to
     0:54
     uncover
     0:55
     and fully understand
     0:57
     its fundamental root causes
     1:02
     the journey towards addiction is often
     1:04
     multi-layered and complex
     1:06
     but
     1:07
     by recognizing what lies beneath
     1:09
     addiction
     1:10
     we can help remove the taboo and shame
     1:12
     that sadly surrounds it
     1:15
     as a society
     1:17
     we need to start from a position of
     1:19
     compassion and empathy
     1:22
     where we nurture those around us
     1:25
     understand their journey
     1:28
     and
     1:29
     what has come before them
     1:32
     we need to value and prioritize care and
     1:34
     support
     1:36
     helping to restore and connect
     1:38
     individuals
     1:39
     who are clearly suffering to the people
     1:41
     around them
     1:44
     that is why i'm so passionate about the
     1:46
     work of the forward trust
     1:48
     an organization i'm so proud to be a
     1:50
     patron of
     1:52
     this is the work that you and many other
     1:54
     charities provide day in day out
     1:58
     and it's needed now more than ever
     2:02
     the pandemic has had a devastating
     2:04
     impact on addiction rates
     2:06
     and families and children are having to
     2:08
     cope with addiction in greater numbers
     2:09
     than ever before
     2:12
     we know that over one and a half million
     2:14
     people across the uk
     2:16
     who did not have substance misused prior
     2:17
     to lockdown may now be experiencing
     2:20
     problems associated with increased
     2:22
     alcohol consumption
     2:25
     around 2 million individuals who are
     2:28
     identified as being in recovery
     2:30
     may have experienced a relapse over the
     2:33
     past 18 months
     2:36
     and almost one million young people and
     2:38
     children
     2:39
     are showing an increase in addictive
     2:41
     behavior since the pandemic began
     2:46
     yet there is hope
     2:49
     over the last 10 years i have had the
     2:51
     privilege of meeting many incredible
     2:53
     people who have lived through the harsh
     2:55
     realities of addiction
     2:58
     through their own hard work
     3:00
     and with help from communities and
     3:02
     charities such as the forward trust
     3:04
     lives really are being turned around
     3:08
     these are stories of healing
     3:11
     of hope
     3:12
     and recovery that can inspire us all
     3:17
     i fully support the taking action on
     3:19
     addiction campaign
     3:21
     to improve awareness
     3:23
     and understanding of addiction
     3:26
     the campaign will show us
     3:28
     that not only do many people recover
     3:29
     from addiction
     3:31
     they can go on to prosper
     3:34
     we can all play our part
     3:36
     in helping this work
     3:39
     by understanding
     3:41
     by listening
     3:43
     by
     3:44
     connecting so that together
     3:47
     we can build a happier healthier more
     3:51
     nurturing society
     3:53
     thank you
     3:56
     over the last nine months the pandemic
     3:58
     has been a worrying time for us all
     4:01
     we've experienced isolation
     4:03
     loss and uncertainty
     4:06
     but in the midst of this crisis we've
     4:08
     also seen huge acts of kindness
     4:11
     generosity and empathy
     4:14
     the pandemic has reminded us just how
     4:16
     much we value
     4:18
     living in a world where people care for
     4:20
     one another
     4:21
     and the importance of feeling connected
     4:24
     to the people around us
     4:27
     and it's these connections
     4:29
     these relationships
     4:31
     that are founded in the earliest years
     4:33
     of our lives
     4:36
     people often ask why i care so
     4:38
     passionately about the early years
     4:40
     many mistakenly believe that my interest
     4:43
     stems from having children of my own
     4:45
     and while of course i care hugely about
     4:47
     their start in life
     4:49
     this ultimately sells the issue short
     4:52
     parenthood isn't a prerequisite for
     4:55
     understanding the importance of the
     4:56
     early years
     4:58
     if we only expect people to take an
     5:00
     interest in the early years when they
     5:01
     have children
     5:02
     we are not only too late for them we are
     5:05
     underestimating the huge role others can
     5:07
     play in shaping our most formative years
     5:10
     too
     5:12
     over the last decade i like many of you
     5:14
     have met people from all walks of life
     5:17
     i've seen that experiences such as
     5:19
     homelessness addiction and poor mental
     5:21
     health
     5:22
     are often grounded in a difficult
     5:24
     childhood
     5:26
     but i have also seen
     5:28
     how positive protective factors in the
     5:31
     early years
     5:32
     can play a critical role in shaping our
     5:35
     futures too
     5:37
     and i care hugely about this
     5:40
     because the science shows that the early
     5:42
     years are more pivotal for future health
     5:45
     and happiness than any other period in
     5:47
     our lifetime
     5:49
     because as many as 40 percent of our
     5:52
     children
     5:53
     will arrive at school with below the
     5:54
     expected levels of development
     5:57
     and because the social cost of late
     5:59
     intervention has been estimated to be
     6:02
     over 17 billion pounds a year
     6:05
     the early years are therefore not simply
     6:07
     just about how we raise our children
     6:10
     they are in fact about how we raise the
     6:12
     next generation of adults
     6:14
     they are about the society we will
     6:16
     become
     6:17
     which is why i wanted to start a
     6:20
     society-wide conversation
     6:23
     to hear what people across the uk think
     6:25
     about the early years too
     6:27
     i was humbled that over half a million
     6:29
     people responded to the five big
     6:31
     questions survey
     6:32
     showing just how much people wanted to
     6:34
     talk about this
     6:36
     we combined these findings with national
     6:38
     research and a covert lockdown survey
     6:41
     and together this represents the uk's
     6:43
     biggest ever study on the early years
     6:47
     these collective insights are critical
     6:50
     and the questions they pose will help
     6:53
     guide our work in the years to come
     6:56
     firstly if parents are struggling to
     6:58
     prioritize their own wellbeing
     7:00
     how can we better support them
     7:03
     secondly
     7:04
     what is at the root of why parents feel
     7:07
     so judged
     7:08
     thirdly how can we address parental
     7:10
     loneliness
     7:11
     which has dramatically increased during
     7:14
     the pandemic
     7:15
     particularly in the most deprived areas
     7:18
     and finally
     7:20
     if less than a quarter of us understand
     7:22
     the unique importance of a child's first
     7:25
     five years
     7:26
     what can we do to make this better known
     7:30
     we must do all we can to tackle these
     7:33
     issues and to elevate the importance of
     7:35
     the early years
     7:37
     so that together
     7:38
     we can build a more nurturing society
     7:42
     because i believe
     7:43
     the early years should be on par with
     7:46
     the other great social challenges and
     7:48
     opportunities of our time
     7:50
     and next year we will announce ambitious
     7:53
     plans to support this objective
     7:56
     my final message is a thank you
     7:59
     thank you to all the families and
     8:01
     parents and carers for the important
     8:03
     work you do every single day in raising
     8:06
     our children
     8:08
     and thank you to those of you working to
     8:10
     support these families and their
     8:11
     children too
     8:13
     what you do takes hard work commitment
     8:17
     and vision
     8:18
     it is a brave thing to believe in an
     8:20
     outcome
     8:21
     in a world even that might not be fully
     8:24
     felt for a generation or more
     8:26
     but what you do isn't for the quick win
     8:29
     it's for the big win
     8:32
     it's for a happier healthier society
     8:35
     as well as for happier healthier
     8:37
     children
     8:40
     only by working together
     8:42
     can we bring about lasting change for
     8:44
     the generations to come
     8:47
     because i truly believe
     8:50
     big change
     8:51
     starts small
     8:53
     [Music]
     9:11
     [Music]
     9:32
     you`

    const [arrSub, setArrSub] = useState([]);
    const [widthYt, setWidthYt] = useState(640);
    const [heightYt, setHeightYt] = useState(390);
    const COLOR_NONE = "";
    const COLOR_CURRENT_BACKGROUND = "#e2e2e2";
    // const COLOR_CURRENT = "#32312f";
    const MODE_NOMAL = 'NOMAL';
    const MODE_FOCUS_SUB = 'FOCUS_SUB';
    //  const [mode, setMode] = useState(MODE_NOMAL);

    const CONTROL_REPLAY = 'Replay';
    const SIZE_1200X700 = '1200X700';
    const SIZE_900X630 = '900X630';
    const SIZE_800X560 = '800X560';
    const SIZE_640X390 = '640X390';
    const SIZE_400X280 = '400X280';
    const SIZE_300X210 = '300X210';
    const SIZE_100X80 = '100X80';
    const SIZE_70X50 = '70X50';
    const SIZE_1X1 = '1X1';
    const SIZE_CUSTOM = 'custom';

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
        document.getElementById('media-sub').value = text;
        mode = MODE_NOMAL;
        return () => {
            console.log("destroy interval:" + interval);
            clearInterval(interval);
        };

    }, []);
    useEffect(() => {
        if (_.isEmpty(arrSub)) {
            document.getElementById('subline-control').style.display = "none";
        } else {
            document.getElementById('subline-control').style.display = "block";
        }
    }, [arrSub]);

    const onYouTubeIframeAPIReady = () => {
        player = new window.YT.Player('player', {
            height: 390,
            width: 640,
            videoId: "AFbZYgXCSY4",
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onReady': onPlayerReady,
            }
        });
    }
    const onPlayerReady = (event) => {
        event.target.playVideo();

        interval = setInterval(() => {
            if (player.getPlayerState() === 1) {
                let currTime = player.getCurrentTime().toString();
                if (currTime.includes(".")) {
                    currTime = currTime.substring(0, currTime.lastIndexOf("."));
                }

                let min = Math.floor(player.getCurrentTime() / 60);
                let sec = Math.floor((player.getCurrentTime() % 60));
                let mmss = sec > 9 ? `${min}:${sec}` : `${min}:0${sec}`;
                console.log(mmss);
                currentTime = currTime;
                console.log(currentTime);
                let currentSubEle = document.getElementById(`sub-item${mmss}`);
                let offsetOgr = document.getElementById(`sub-item0:00`);
                if (currentSubEle && offsetOgr && (player.getPlayerState() === 1)) {
                    currentSubEle.style.backgroundColor = COLOR_CURRENT_BACKGROUND;
                    if (_.isEqual(mode, MODE_NOMAL)) {
                        let distanTop = (offsetOgr) ? offsetOgr.offsetTop : 0;
                        const MINUS_TOP = 100;
                        var scrollDiv = currentSubEle.offsetTop - distanTop - MINUS_TOP;
                        let subControl = document.getElementById('sub-control');
                        subControl.scrollTo({ top: (scrollDiv), behavior: 'smooth' });
                    }
                    if (_.isEqual(mode, MODE_FOCUS_SUB)) {
                        currentSubEle.scrollIntoView();
                    }
                    let oldClass = document.getElementById(`${oldClickClass}`)
                    if (oldClass) {
                        oldClass.style.backgroundColor = COLOR_NONE;
                    }
                    oldClickClass = `sub-item${mmss}`;
                }


                if (_.isEqual(currentTime, nextTime.toString()) && isReplay === true) {
                    console.log("replay at:" + startTime);
                    player.seekTo(startTime, true)
                }
            }
        }, 1000);
    }
    //     console.log("onPlay");
    //     if(interval){
    //         interval.resume();
    //     }
    // }
    // const onPause = (event) => {
    //     console.log("onPause");
    //     if(interval){
    //         interval.pause();
    //     }
    // }

    const onChangeWith = (value) => {
        setWidthYt(value);
        setHeightYt(value * 0.7);
    };
    const loadSub = () => {
        var txtSub = document.getElementById('media-sub').value;
        var lineSubArr = txtSub.split('\n');
        let count = 1;
        let tempTime = '';
        let arrTemp = [];
        lineSubArr.forEach((line, index) => {
            let lineSub = line.trim();
            if (count === 1) {
                tempTime = lineSub;
            }
            if (count === 2) {
                arrTemp.push(new Sub(tempTime, lineSub));
                count = 0;
            }
            count++;

        });
        setArrSub(arrTemp);
        document.getElementById('media-sub').style.display = "none";
    };

    const LineSub = (props) => {
        return (
            <div role='button' className={`sub-item`} id={`sub-item${props.time}`} onClick={(e) => onClickSub(props.time, props.value)}>
                {props.time}: {props.value}
            </div>
        )
    }
    const onClickSub = (time, value) => {
        console.log("=====onClickSub=====");
        startTime = time.split(':').reduce((acc, time) => (60 * acc) + +time);
        let nextIndex = arrSub.length - 1;


        for (let i = 0; i < arrSub.length; i++) {
            if (_.isEqual(arrSub[i].time, time)) {
                nextIndex = i + 1;
            }
        }
        nextTime = arrSub[nextIndex].time.split(':').reduce((acc, time) => (60 * acc) + +time);

        console.log(startTime);
        console.log(nextTime);
        player.seekTo(startTime, true);

    };
    const onProcess = () => {
        var txtSrcMedia = document.getElementById('txtSrcMedia').value;
        var url = txtSrcMedia.substring(txtSrcMedia.lastIndexOf('=') + 1, txtSrcMedia.length).trim();
        player.loadVideoById(url, 0);

    };
    const onChangeReplay = (value) => {
        if (_.isEqual(value, CONTROL_REPLAY)) {
            // setIsReplay(true);
            isReplay = true;
        } else {
            // clearInterval(interval);
            // setIsReplay(false);
            isReplay = false;
        }
    }
    const onChangeSize = (value) => {
        switch (value) {
            case SIZE_1200X700:
                player.setSize(1200, 700);
                break;
            case SIZE_900X630:
                player.setSize(900, 630);
                break;
            case SIZE_800X560:
                player.setSize(800, 650);
                break;
            case SIZE_640X390:
                player.setSize(640, 390);
                break;
            case SIZE_300X210:
                player.setSize(300, 210);
                break;
            case SIZE_100X80:
                player.setSize(100, 80);
                break;
            case SIZE_70X50:
                player.setSize(70, 50);
                break;
            case SIZE_400X280:
                player.setSize(400, 280);
                break;
            case SIZE_1X1:
                player.setSize(1, 1);
                break;
            case SIZE_CUSTOM:
                player.setSize(widthYt, heightYt);
                break;
            default:
                console.log("Error: Not have data to set size!");
                break;
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onProcess();
        }
    }
    const onShowHide = (e) => {
        let elm = document.getElementById('media-sub');
        if (elm && elm.style.display === "none") {
            document.getElementById('media-sub').style.display = "block";
        } else {
            document.getElementById('media-sub').style.display = "none";
        }
    }
    const onStartStop = (e) => {
        if (player.getPlayerState() !== 1) {
            player.playVideo();
        } else {
            player.pauseVideo();
        }
        console.log(player);

    }
    return (

        <div className='media-left'>
            <div id="player"></div>
            <div id=''>
                <div className=''>
                    <div className=''>
                        <input type='submit' value="Stop/Start" onClick={() => onStartStop()} />
                        <select onChange={(e) => {
                            onChangeSize(e.target.value)
                        }}>
                            <option value={SIZE_640X390}>640x390</option>
                            <option value={SIZE_1X1}>1x1</option>
                            <option value={SIZE_1200X700}>1200x700</option>
                            <option value={SIZE_900X630}>900x630</option>
                            <option value={SIZE_800X560}>800x560</option>
                            <option value={SIZE_400X280}>400x280</option>
                            <option value={SIZE_300X210}>300x210</option>
                            <option value={SIZE_100X80}>100x80</option>
                            <option value={SIZE_70X50}>70x50</option>
                            <option value={SIZE_CUSTOM}>SIZE_CUSTOM</option>
                        </select>
                        <input type="text" id="txtSrcMedia" onKeyDown={e => handleKeyDown(e)} />
                        <input type='submit' value="Load" id='btnExecute' onClick={() => onProcess()} />
                        <br />
                        <input className='txt-10-pc' type="text" value={widthYt} onChange={(e) => {
                            onChangeWith(e.target.value)
                        }}
                        />x
                        <input className='txt-10-pc' type="text" value={heightYt} onChange={(e) => {
                            setHeightYt(e.target.value)
                        }} />
                        <input type='submit' value="Resize" onClick={() => onChangeSize(SIZE_CUSTOM)} />
                        <div id='subline-control'>
                            <div id='sub-control' >
                                {arrSub.map((item, index) => <LineSub key={`${item.time}${item.value}`}
                                    time={item.time}
                                    value={item.value}
                                />)}
                            </div>
                            <select onChange={(e) => {
                                onChangeReplay(e.target.value)
                            }}>
                                <option value={CONTROL_REPLAY}>Replay</option>
                                <option value="None">None</option>
                            </select>

                            <select onChange={(e) => {
                                mode = e.target.value;
                            }}>
                                <option value={MODE_NOMAL}>Nomal</option>
                                <option value={MODE_FOCUS_SUB}>Focus</option>
                            </select>
                            {/* <input type="text"  onKeyDown={e => {
                        if (e.key === 'Enter') {

                        }
                    }} /> */}

                            <input type='submit' value="Show/Hide" onClick={() => onShowHide()} />
                        </div>
                    </div>
                </div>
                <div className='option-right'> <br />
                </div>
                <input type='submit' value="loadSub" id='btnLoadSube' onClick={() => loadSub()} /><br />
                <textarea id='media-sub'></textarea>

            </div>
            <br />

        </div>
    )

};
export default YoutubeSub;