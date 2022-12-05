import React from 'react';
import EmailSubscribeForm from './EmailSubscribeForm';

const BlockAlternatingText = (props) => {

    const block = props.block.alternating_text;

    //block settings
    const mb = (block.block_settings.remove_margin_bottom === true ? 'mb-0' : 'mb-6 mb-lg-7');

    let py = '', bg = '';
    if( block.block_settings.background_color !== 'none' ){
        py = 'py-6 py-lg-7';
        bg = block.block_settings.background_color + '-bg';
    }

    //Configure page based on option settings
    let orderText = '',  orderImage = '';
    if (block.options.text_location === 'text_right'){
        orderText = 'order-lg-2';
        orderImage = 'order-lg-1';
    }

    //Default is h2, but allow h1 exception for landing pages
    let headerType = 'h2';
    if ( block.options.change_h2_into_h1 === true){
        headerType = 'h1';
    }

    //Display Graphic on Mobile option (only shows up when "graphic type" == 'image')
    let displayGraphic = '';
    if ( block.options.display_graphic_mobile === 'no' ){
        displayGraphic = 'd-none d-lg-block';
    }

    /*********************************************
     * Retrieve Element Height
     ********************************************/
    function getHeight(elem) {
        // console.log(       
        //     elem.clientHeight,
        //     elem.offsetHeight,
        //     elem.scrollHeight,
        //     elem.getBoundingClientRect().height
        // );
        return Math.max(
            elem.clientHeight,
            elem.offsetHeight,
            // elem.scrollHeight,
            elem.getBoundingClientRect().height
        );
    }


    /*********************************************
    * Get height of nav and admin bar (if signed in), so they can be subracted from viewport height
    ********************************************/
    var adminBarHeight = 0, navigationBarHeight = 0;
    function get_nav_heights(){
        if( document.getElementById('wpadminbar') !== null ){
            adminBarHeight = document.getElementById('wpadminbar').offsetHeight;
        }

        navigationBarHeight = document.getElementById('site-header').offsetHeight;
    }


    /*********************************************
    * When scrolling, check to see if there are images that need animation 
    * includes animateImages(), setScrollPercent(), and eventListener for scroll
    ********************************************/
    window.addEventListener( "scroll", () => {
            animateImages();
        },
        false
    );

    function animateImages(){

        get_nav_heights();//TODO put this in resize width a

        let viewportHeight = window.innerHeight;//TODO fix this and update on resize width
        let currentY = window.scrollY;

        //detect if on page, then detect if on screen, then calc % of display versus height of container
        let growCrypto = document.getElementById('grow-crypto-animate');
        let unlockFuture = document.getElementById('unlock-future-animate');
        let autoGas = document.getElementById('autogas-animate');
        let easystake = document.getElementById('easystake-animate');
        let buysell = document.getElementById('buysell-animate');
        let sendreceive = document.getElementById('sendreceive-animate');
        if(growCrypto){
            setScrollPercent(growCrypto,'growcryptoscroll',viewportHeight,currentY);
        }
        if(unlockFuture){
            setScrollPercent(unlockFuture,'unlockfuturescroll',viewportHeight,currentY);
        }
        if(autoGas){
            setScrollPercent(autoGas,'autogasscroll',viewportHeight,currentY);
        }
        if(easystake){
            setScrollPercent(easystake,'easystakescroll',viewportHeight,currentY);
        }     
        if(buysell){
            setScrollPercent(buysell,'buysellscroll',viewportHeight,currentY);
        }
        if(sendreceive){
            setScrollPercent(sendreceive,'sendreceivescroll',viewportHeight,currentY);
        }
    }


    function setScrollPercent(elem,scrollProperty,viewportHeight,currentY){
        let elemH = getHeight(elem);
        let elemToTop = elem.getBoundingClientRect().top + window.scrollY;
        // console.log('Grow Crypto (cryptoH, toTop, viewportH, currentY): ', elemH, elemToTop, viewportHeight, currentY);
        // console.log('Left: ', (elemToTop ), '<=', currentY + viewportHeight, 'Right: ', currentY, '<=', (elemToTop + elemH));

        if( (elemToTop ) <= (currentY + viewportHeight) && (currentY + navigationBarHeight + adminBarHeight) <= (elemToTop + elemH) ){
            let currentPercent = (currentY + viewportHeight - elemToTop) / (viewportHeight - navigationBarHeight - adminBarHeight + elemH);
            // console.log('currentPercent: ', currentPercent, (viewportHeight + elemH));
            elem.style.setProperty("--"+scrollProperty,currentPercent);//TODO put on body tag because only 1 works, then use .active?
            elem.classList.add('active');
        }else{
            elem.classList.remove('active');
        }
    }


    // console.log('BlockAlternatingText', props);

    return (
    <>
        <div id={block.block_settings.block_id} className={'alternating-text-block '  + mb + ' ' + py + ' ' + bg}>
            <div className="container">
                <div className="row">

                    <div className={orderText + ' col-12 offset-lg-1 col-lg-5 offset-xl-1 col-xl-4'}>
                        <div className="d-flex flex-column h-100 justify-content-center mb-4 mb-lg-0">

                            {block.options.post_content_extras === 'extra_image' &&
                                <div className='mb-4'>
                                    <img loading="lazy" src={block.options.additional_image.url} alt={block.options.additional_image.alt}
                                        width={block.options.additional_image.width} height={block.options.additional_image.height} />
                                </div>
                            }

                            {block.block_text.overline !== '' &&
                            <div className="overline mb-3" dangerouslySetInnerHTML={{__html:block.block_text.overline}}>
                            </div>
                            }

                            {headerType === 'h1' &&
                            <h1 className="mb-4" dangerouslySetInnerHTML={{__html:block.block_text.header}}></h1>
                            }
                            {headerType === 'h2' &&
                            <h2 className="mb-4" dangerouslySetInnerHTML={{__html:block.block_text.header}}></h2>
                            }


                            {block.block_text.sub_header !== '' &&
                            <div className="body1 mb-3 " dangerouslySetInnerHTML={{__html:block.block_text.sub_header}}>
                            </div>
                            }

                            {block.block_text.additional_header !== '' &&
                            <div className="h5 mb-2 " dangerouslySetInnerHTML={{__html:block.block_text.additional_header}}>
                            </div>
                            }

                            {block.options.post_content_extras === 'join_waitlist_cta' &&
                                <div className='alternating-waitlist'>
                                    <EmailSubscribeForm location='Block Alternating Text' />
                                </div>
                            }
                            {/* <?php
                            elseif( $block['options']['post_content_extras'] == 'download_buttons' ):
                                $site_settings = retrieve_site_settings();
                                $actual_link = $actual_link = "$_SERVER[REQUEST_URI]";
                                $data_location = 'Alternating Block';
                            ?> */}
                            {block.options.post_content_extras === 'download_buttons' &&
                                <div className="d-flex ">
                                    {/* <?php  build_download_app_buttons($site_settings, $actual_link, $data_location); ?> */}
                                </div>
                            }

                        </div>
                    </div>

                    <div className={orderImage + ' col-12 col-lg-6 offset-xl-1 col-xl-5'} >
            
                        <div className="d-flex align-items-center h-100 justify-content-center " > 

                            {/********************************************************************************* */}                            
                            {block.options.graphic_type === 'image' && block.block_settings.block_id === 'grow-crypto' &&

                                <div id={block.block_settings.block_id + '-animate'} className="position-relative overflow-hidden">
        
                                    <img className=" img-fluid position-relative easiest-way-1 z-index5" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/grow/wallet.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid animate-alt bg-position position-absolute z-index5" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/grow/shadow.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />

                                    <img className=" img-fluid animate-alt bg-position position-absolute opacity0 easiest-way-6 z-index1" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/grow/coin-1.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid animate-alt bg-position position-absolute opacity0 easiest-way-7 z-index1" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/grow/coin-1.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid animate-alt bg-position position-absolute opacity0 easiest-way-8 z-index1" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/grow/coin-2.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid animate-alt bg-position position-absolute opacity0 easiest-way-9 z-index1" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/grow/coin-2.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />  
                                    <img className=" img-fluid animate-alt bg-position position-absolute opacity0 easiest-way-10 z-index1" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/grow/coin-1.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />   
                                        
                                    <img className=" img-fluid animate-alt bg-position position-absolute opacity0 easiest-way-11 z-index1" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/grow/coin-1.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />  
                                    <img className=" img-fluid animate-alt bg-position position-absolute opacity0 easiest-way-12 z-index1" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/grow/coin-2.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />                                    
                                            
                                    <img className=" img-fluid animate-alt bg-position position-absolute easiest-way-3 z-index2" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/grow/bills-2.svg`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid animate-alt bg-position position-absolute easiest-way-4 z-index3" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/grow/bills-3.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid animate-alt bg-position position-absolute easiest-way-5 z-index4" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/grow/bills-1.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />   

                        
                                </div>
                            }

                            {/********************************************************************************* */}
                            {block.options.graphic_type === 'image' && block.block_settings.block_id === 'unlock-future' &&
                    
                                <div id={block.block_settings.block_id + '-animate'} className="position-relative overflow-hidden">
                                    <img className=" img-fluid  position-relative unlock-key-1" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/key/unlock-key-1.svg`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid bg-position animate-unlock position-absolute unlock-key-2" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/key/unlock-key-2.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid bg-position animate-unlock position-absolute unlock-key-3" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/key/unlock-key-3.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid bg-position animate-unlock position-absolute unlock-key-4" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/key/unlock-key-4.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid bg-position animate-unlock position-absolute unlock-key-5" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/key/unlock-key-5.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />

                                    <img className=" img-fluid bg-position animate-unlock position-absolute unlock-callout unlock-callout-1" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/key/unlock-key-lock.svg`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid bg-position animate-unlock position-absolute unlock-callout unlock-callout-2" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/key/unlock-key-fingerprint.svg`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid bg-position animate-unlock position-absolute unlock-callout unlock-callout-3" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/key/unlock-key-google.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid bg-position animate-unlock position-absolute unlock-callout unlock-callout-4" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/key/unlock-key-phone.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid bg-position animate-unlock position-absolute unlock-callout unlock-callout-5" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/key/unlock-key-apple.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                        
                                    <img className=" img-fluid bg-position animate-unlock position-absolute unlock-callout key-dividers-1" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/key/dividers-1.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid bg-position animate-unlock position-absolute unlock-callout key-dividers-2" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/key/dividers-2.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid bg-position animate-unlock position-absolute unlock-callout key-dividers-3" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/key/dividers-3.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className=" img-fluid bg-position animate-unlock position-absolute unlock-callout key-dividers-4" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/key/dividers-4.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />

                                </div>
                            }

                            {/* /******************************************************************************* */}
                            {block.options.graphic_type === 'image' && block.block_settings.block_id === 'easystake' &&

                                <div id={block.block_settings.block_id + '-animate'} className="position-relative overflow-hidden">

                                    <img className="img-fluid position-absolute bg-position z-index1" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/easyswipe/stake-bg.svg`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid position-relative z-index4" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/easyswipe/stake-app.svg`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />

                                    <img className="img-fluid bg-position position-absolute animate-easystake easystake-l-plant z-index2"  
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/easyswipe/stake-left-plant.svg`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid bg-position position-absolute animate-easystake easystake-r-plant z-index2"  
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/easyswipe/stake-right-plant.svg`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />

                                    <img className="img-fluid animate-easystake bg-position position-absolute easystake-success-m z-index4"  
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/easyswipe/stake-app-start.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid animate-easystake bg-position position-absolute easystake-btn z-index3" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/easyswipe/stake-app-swipe-btn.svg`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />  
                                    <img className="img-fluid animate-easystake bg-position position-absolute z-index2" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/easyswipe/stake-app-swipe-start.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />  

                                    <img className="img-fluid animate-easystake bg-position position-absolute easystake-process-btn opacity0 z-index4"  
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/easyswipe/stake-btn-processing-2.svg`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid animate-easystake bg-position position-absolute easystake-process-text opacity0 z-index3"  
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/easyswipe/stake-processing.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid animate-easystake bg-position position-absolute easystake-checkmark opacity0 z-index4" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/easyswipe/stake-success-checkmark.svg`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />  
                                    <img className="img-fluid animate-easystake bg-position position-absolute easystake-success-bg opacity0 z-index3" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/easyswipe/stake-success-bg.png`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />  

                                </div>
                            }


                            {/********************************************************************************* */}
                            {block.options.graphic_type === 'image' && block.block_settings.block_id === 'autogas' &&

                                <div id={block.block_settings.block_id + '-animate'}  className="position-relative overflow-hidden">

                                    <img className="img-fluid animate-autogas position-absolute autogas-needle z-index5" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/autogas/autogas-needle.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid position-relative z-index4" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/autogas/autogas-bg-main.svg`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid bg-position position-absolute z-index3" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/autogas/autogas-bg-2.svg`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid animate-autogas position-absolute autogas-fuel z-index2" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/autogas/autogas-bg-fuel.svg`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid bg-position position-absolute z-index1" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/autogas/autogas-bg-3.svg`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />  
                                </div>
                            }


                            {/********************************************************************************* */}
                            {block.options.graphic_type === 'image' && block.block_settings.block_id === 'buysell' &&

                                <div id={block.block_settings.block_id + '-animate'}  className="position-relative overflow-hidden">
                                    <img className="img-fluid position-absolute bg-position z-index3" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/buysell/buy-n-sell-crypto-fiat.png`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid bg-position position-absolute  z-index3" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/buysell/buy-n-sell-crypto-coin.png`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid position-absolute buysell-top-arrow animate-buysell z-index2" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/buysell/buy-n-sell-crypto-top-arrow-sm.png`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid position-absolute buysell-bottom-arrow animate-buysell z-index2" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/buysell/buy-n-sell-crypto-bottom-arrow-sm.png`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />  
                                    <img className="img-fluid position-relative z-index1" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/buysell/buy-n-sell-crypto-bg-2.png`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />

                                </div>
                            }


                            {/********************************************************************************* */}
                            {block.options.graphic_type === 'image' && block.block_settings.block_id === 'sendreceive' &&

                                <div id={block.block_settings.block_id + '-animate'} className="position-relative overflow-hidden">

                                    <img className="img-fluid bg-position position-relative z-index1" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/sendreceive/send-n-receive-bg.png`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid  position-absolute animate-sendreceive sendreceive-coin1 z-index2" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/sendreceive/send-n-receive-coin3.png`} 
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid  position-absolute animate-sendreceive sendreceive-coin2 z-index2" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/sendreceive/send-n-receive-coin4.png`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />
                                    <img className="img-fluid bg-position position-absolute z-index3" 
                                        src={`${process.env.PUBLIC_URL}/img/what-is-giddy/sendreceive/send-n-receive-fg-2.png`}
                                        alt={block.options.image.alt}
                                        height={block.options.image.height}
                                        width={block.options.image.width} />

                                </div>
                            }


                            {/********************************************************************************* */}
                            {block.options.graphic_type === 'image' && 
                                block.block_settings.block_id !== 'grow-crypto' &&
                                block.block_settings.block_id !== 'unlock-future' &&
                                block.block_settings.block_id !== 'easystake' &&
                                block.block_settings.block_id !== 'autogas' &&
                                block.block_settings.block_id !== 'buysell' &&
                                block.block_settings.block_id !== 'sendreceive' &&
                                <img className={displayGraphic + ' img-fluid position-relative'} loading='lazy'
                                    src={block.options.image.url} alt={block.options.image.alt}
                                    height={block.options.image.height}width={block.options.image.width} />
                            }
                       
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </>
    )

};

export default BlockAlternatingText;