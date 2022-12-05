// import React from 'react';
import { useEffect } from "react";


const BlockVideo = (props) => {

    useEffect(() => {
            
        document.getElementById('video-placeholder').addEventListener('click', function(e){
    
            e.preventDefault();
        
            videoId = this.getAttribute("data-video");
            
            // 1. This code loads the IFrame Player API code asynchronously  (it loads after a user requests the Video by clicking on the play button)
            // if( $("#YT-API-Loaded").length === 0 ){
            console.log( document.getElementById('YT-API-Loaded'), videoId );
            if ( document.getElementById('YT-API-Loaded') === null ){    
                console.log('1. loading YT iFrame API');
                var tag = document.createElement('script');
                
                var siteProtocol = 'https';//( location.protocol != 'https:' ) ? 'http' : 'https';
                
                tag.src = siteProtocol + "://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                tag.id = "YT-API-Loaded";
                // tag.defer = true;

            }else{
                console.log('already loaded YT player, so just processCue (step 2)');
                processCue(videoId);
            }
        });

    }, []);

    /**************************************************************************************************************** YouTube Player */
    //https://developers.google.com/youtube/iframe_api_reference#Accessing_and_Modifying_DOM_Nodes
    //https://demo.tutorialzine.com/2015/08/how-to-control-youtubes-video-player-with-javascript/
    var player;
    var videoId;
    var YT;
    window.onYouTubeIframeAPIReady = function() {
        
        // 2. This function creates an <iframe> (and YouTube player) after the API code downloads.
        console.log('2. Create iFrame player');
        player = new YT.Player('video-placeholder', {
            height: 'auto',
            width: '100%',
            // videoId: videoId,
            host: 'https://www.youtube.com',
            // origin: giddy.home_url,//https://stackoverflow.com/questions/27573017/failed-to-execute-postmessage-on-domwindow-https-www-youtube-com-http
            playerVars: {
                rel: 0,
                enablejsapi: 1,
                autoplay: 1,
                modestbranding: 1,
                //color: 'white'
                //playlist: 'taJ60kskkns,FG0fTKAqZ5g'
            },
            events: {
                'onReady': onPlayerReady//this is what makes the player work on the first load only
                //,'onStateChange': onPlayerStateChange
            }
        });

    }

    function onPlayerReady(event) {
        processCue(videoId);
    }

    function processCue(videoId){

        if((typeof YT !== "undefined") && YT && YT.Player && player.cueVideoById !== "undefined" ){ //&& jQuery.isFunction(player.cueVideoById) 
            
            console.log('3. Load the iFrame and play it');//processCue', videoId, player
            player.loadVideoById(videoId);
            player.playVideo(); 
        }
    }

    function stopVideo() {
        player.stopVideo();
    }

    function pauseVideo() {
        player.pauseVideo();
    }


    
    const block = props.block.giddy_video;
    console.log('BlockVideo', props);

    //Block settings
    const mb = (block.block_settings.remove_margin_bottom === true ? 'mb-0' : 'mb-6 mb-lg-7');

    let py = '', bg = '';
    if( block.block_settings.background_color !== 'none' ){
        py = 'py-6 py-lg-7';
        bg = block.block_settings.background_color + '-bg';
    }

    //Remove spacing from content if it's empty (otherwise there is a big gap)
    let bp = 'mb-5 mb-md-6';
    if ( block.video_options.youtubeId === '' ){
        bp = '';
    }


    


    return (
    <>
        <div id={block.block_settings.block_id} className={'cta-block '  + mb + ' ' + py + ' ' + bg}>

            <div id="" className="swiper-slide position-relative page-break d-flex align-items-center container">

                <div className="container">
                    <div className="row">
                        <div className="col-12 offset-md-2 col-md-8">

                            {block.block_text.overline !== '' &&
                            <div className="overline text-center mb-2 mb-md-3" dangerouslySetInnerHTML={{__html:block.block_text.overline}}>
                            </div>
                            }

                            <h2 className="text-center mb-2 mb-md-3" dangerouslySetInnerHTML={{__html:block.block_text.header}}></h2>

                            {block.block_text.sub_header !== '' &&
                            <div className={bp + ' text-center'} dangerouslySetInnerHTML={{__html:block.block_text.sub_header}}>
                            </div>
                            }

                    
                            {block.video_options.youtube_id !== '' &&
                            <div id="video-placeholder" className="video-box position-relative bg-img rounded d-flex justify-content-center align-items-center pointer" 
                                data-video={block.video_options.youtube_id} 
                                style={{backgroundImage: `url(${block.video_options.background_image.url })`}}
                                // src={block.video_options.background_image.url}
                                >
                                <img className="" src={`${process.env.PUBLIC_URL}/img/play-button.svg`} alt="Play Giddy Video" width="97" height="114" />
                            </div>
                            }
                
                            
                        </div>
                    </div>
                </div>
                                
            </div>

        </div>

    </>
    )

};


export default BlockVideo;
