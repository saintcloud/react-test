import { useEffect } from "react";


const Hero = (props) => {

    useEffect(() => {
        
        /*********************************************
         * What is Giddy Featured App Images that rotate in a cirlce
         *******************************************
        if( document.getElementById('rotating-images-container') !== null ){
        
            let delay = parseInt( document.getElementById('rotating-images-container').getAttribute("data-delay") );
            // console.log('this is delay', delay);
            
            if( typeof delay === 'number'){
        
                let runRotation = function runRotation() {
                    let hasError = false;
                    let errorId = '';
                    let hasFirst = false, hasSecond = false, hasThird = false;
                    let items = document.getElementsByClassName('r-img');
                    for (let i=0; i < items.length; i++) {
        
                        items[i].classList.remove('standard-transition'); //just in case there has been a window resize
        
                        if(items[i].classList.contains('rotate-first')){
                            items[i].classList.remove('rotate-first');
                            items[i].classList.add('move-far-left');  
                            let update1 = items[i];
                            setTimeout(function() {
                                update1.classList.remove('move-far-left');
                                update1.classList.add('rotate-second');  
                            }, 500);
                            hasFirst = true;
                        }else if(items[i].classList.contains('rotate-second')){
                            items[i].classList.remove('rotate-second');
                            // items[i].classList.add('move-right');  
                            items[i].classList.add('rotate-third');  
        
                            // let update2 = items[i];
                            // setTimeout(function() {
                            //     update2.classList.remove('move-right');
                            //     update2.classList.add('rotate-third');  
                            // }, 600);
                            hasSecond = true;
                        }else if(items[i].classList.contains('rotate-third')){
                            items[i].classList.remove('rotate-third');
                            items[i].classList.add('move-left');  
                            let update3 = items[i];
                            setTimeout(function() {
                                update3.classList.remove('move-left');
                                update3.classList.add('rotate-first');  
                            }, 750);
                            hasThird = true;
                        }else{//rotate-first, rotate-second, or rotate-third got lost somehow, so restore it
                            hasError = true;
                            errorId = items[i].id;
                        }
                    }
                    
                    if (hasError === true){
        
                        let errorDiv = document.getElementById(errorId);
                        errorDiv.classList.remove('move-left');
                        errorDiv.classList.remove('move-far-left');
                        errorDiv.classList.remove('rotate-first');
                        errorDiv.classList.remove('rotate-second');
                        errorDiv.classList.remove('rotate-third');
        
                        if(hasFirst === false){
                            errorDiv.classList.add('rotate-second');  
                        }else if(hasSecond === false){
                            errorDiv.classList.add('rotate-third'); 
                        }else if(hasThird === false){
                            errorDiv.classList.add('rotate-first');  
                        }
        
                    }
                }
                runRotation();
                setInterval(runRotation, delay);
        
            }
        
            // const processRotatingResize = debounce(() => updateRotating());
            window.addEventListener('resize', function(e) {
                updateRotating();
            }, true);
        
            function updateRotating(){
            
                var items = document.getElementsByClassName('r-img');
                for (var i=0; i < items.length; i++) {
        
                    //pieces moving from 1st (left) to 2nd (mid)
                    if(items[i].classList.contains('move-far-left')){
                        items[i].classList.remove('move-far-left');  
                        items[i].classList.add('rotate-second');  
                    }
        
                    //pieces movinig from 3rd (right) to 1st (left)
                    if(items[i].classList.contains('move-left')){
                        items[i].classList.remove('move-left');  
                        items[i].classList.add('rotate-first');  
                    }
            
                    items[i].classList.add('standard-transition');  
                }
            }
        }

        */
        
    }, []);


    //Hero variables/settings
    const hero = JSON.parse(props.hero);
    const footerSettings =  JSON.parse(props.settings.footerSettings);
    const sidebarSettings = JSON.parse(props.sidebarSettings);
    const slug = props.slug;
    const settings = JSON.parse(props.settings.generalSettings);

    let textColor = '', darkBg = '';
    if (hero.hero_settings.text_color === 'white'){
        textColor = 'text-white';
        darkBg = 'dark_brown-bg';
    }


    /*********************************************
     * Scroll Events (add background to top nav, parallax roadmap page)
     ********************************************/
     window.addEventListener("scroll", (event) => {
        let scroll = window.scrollY;
        let nav = document.getElementById('site-header');
        let hamburger = document.getElementById('nav-icon');
        let cookieB = document.getElementById('cookie-container');
        
        // let front = document.getElementById('hero-front');
        let mid = document.getElementById('hero-mid');
        let back = document.getElementById('hero-back');
        let windowWidth = getWidth();
        
        //  After starting to scroll, add background to fixed menu on pages with transparency 
        if (scroll < 75) {
            nav.classList.remove('nav-bg');
            if (hamburger){
                hamburger.classList.remove('sticky-bg');
            }
        }else{
            nav.classList.add('nav-bg');

            if (hamburger){
                hamburger.classList.add('sticky-bg');
            }

            if (cookieB !== null && cookieB.classList.contains('d-none-c')){
                cookieB.classList.remove('d-none-c');
            }
        }

        // parallax the scenery on roadmap page 
        if( (mid && windowWidth > 719) || (mid && scroll < 400) ){
            // front.style.transform = "translateY(" + (scroll * 0) + "px)";
            mid.style.transform = "translateY(" + (scroll * .6) + "px)";
            back.style.transform = "translateY(" + (scroll * .8) + "px)";
        }
        
    });

    /*********************************************
     * Retrieve Page Width
     ********************************************/
    function getWidth() {
        return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
        );
    }

    /*********************************************
    * For images that have a very dark background, swap out the dark text/logo/hamburger with white
    *********************************************/
    let navAdjustment = '';
    if (sidebarSettings.transparent_nav === true){
        const nav = document.getElementById('site-header');
        nav.classList.add('transparent');
        
        navAdjustment = 'hero-overlap';

        const giddyLogo = document.getElementById('giddy-logo'); 
        
        if( sidebarSettings.nav_text_color === 'white' ){//make everything white for a dark background
            document.getElementById('primary-menu').classList.add('nav-text-white');
            document.getElementById('register-button').classList.add('changing-button');
            document.getElementById('nav-icon').classList.add('changing-hamburger');
            giddyLogo.classList.add('dark-logo');

            if( document.getElementById('giddy-white-logo') === null ){//add white logo to the DOM
                let giddyWhiteLogo = document.createElement("img");
                giddyWhiteLogo.src = footerSettings.footer_logos.horizontal_white_logo.url;
                giddyWhiteLogo.setAttribute("height", footerSettings.footer_logos.horizontal_white_logo.height);
                giddyWhiteLogo.setAttribute("width", footerSettings.footer_logos.horizontal_white_logo.width);
                giddyWhiteLogo.setAttribute("alt", footerSettings.footer_logos.horizontal_white_logo.alt);
                giddyWhiteLogo.setAttribute("id", 'giddy-white-logo');
                giddyWhiteLogo.classList.add('white-logo');
                giddyLogo.insertAdjacentElement('afterend', giddyWhiteLogo);
            }else{//display the logo, which has previously been hidden
                document.getElementById('giddy-white-logo').style.display = 'block';
            }
            
        }else {
            document.getElementById('primary-menu').classList.remove('nav-text-white');
            document.getElementById('register-button').classList.remove('changing-button');
            document.getElementById('nav-icon').classList.remove('changing-hamburger');
            giddyLogo.classList.remove('dark-logo');

            if( document.getElementById('giddy-white-logo') !== null ){
                document.getElementById('giddy-white-logo').style.display = 'none';
            }
        }
    }

    
    /*********************************************
    * Rotating Images adds all three App Banner Images
    ********************************************/
    const RotatingImages = (props) => {

        return(
        <>
            <img id='rotate-first' 
                src={props.images.first.url} 
                className='position-absolute r-img rotate-first'
                width={props.images.first.width}  height={props.images.first.height} 
                alt={props.images.first.alt} />
            <img id='rotate-second' 
                src={props.images.second.url} 
                className='position-absolute r-img rotate-second'
                width={props.images.second.width}  height={props.images.second.height} 
                alt={props.images.second.alt} />
            <img id='rotate-third' 
                src={props.images.third.url} 
                className='position-absolute r-img rotate-third'
                width={props.images.third.width}  height={props.images.third.height} 
                alt={props.images.third.alt} />
        </>        
        )
    }


    /*********************************************
    * DRY - Render Overline, H1, Subtext, buttons for hero banners that follow the same styles 
    * (home page is unique, so it doesn't use this function)
    ********************************************/
    const DisplayHeroText = (props) => { 

        let buttonColor = '';
        if( props.heroSettings.text_color === 'white'){
            buttonColor = 'transparent';
        }

        return(
        <>
            {props.heroText.overline &&
            <div className={'overline overline-hero mb-2 ' + props.textColor} >
                {props.heroText.overline}
            </div>
            }
            
            <h1 className={'mb-4 ' + props.textColor} dangerouslySetInnerHTML={{__html:props.heroText.header}}></h1>

            {props.heroText.sub_header &&
            <p className={'hero-subtitle subtitle mb-4 ' + props.textColor} dangerouslySetInnerHTML={{__html:props.heroText.sub_header}} >
            </p>
            }

            
            {props.heroSettings.cta.cta_options === 'download_app_buttons' &&
                <div className="d-flex flex-row justify-content-center ">
                {/* <BuildDownloadAppButtons siteSettings={props.siteSettings} actualLink={} hero={} buttonColor={} /> */}
                    <div className="left-button mobile fluid-to-fixed">
                        <a href={settings.app_downloads[0].download_link} className={'mb-3 mb-md-0 button full-width download text-center add_utms ' + buttonColor} 
                            tabIndex="0" target="_blank" rel="noopener noreferrer" 
                            data-device={settings.app_downloads[0].app_reporting.user_device} data-location="hero" data-page={props.actualLink}>
                            <img src={settings.app_downloads[0].color_logo.url} alt={settings.app_downloads[0].color_logo.alt}  
                                width={settings.app_downloads[0].color_logo.width} height={settings.app_downloads[0].color_logo.height} />
                        </a>
                    </div>
                    <div className="right-button mobile fluid-to-fixed">
                        <a href={settings.app_downloads[1].download_link} className={'button full-width download text-center add_utms ' + buttonColor}
                            tabIndex="0" target="_blank" rel="noopener noreferrer" 
                            data-device={settings.app_downloads[1].app_reporting.user_device} data-location="hero" data-page={props.actualLink}>
                            <img src={settings.app_downloads[1].color_logo.url} alt={settings.app_downloads[1].color_logo.alt}  
                                width={settings.app_downloads[1].color_logo.width} height={settings.app_downloads[1].color_logo.height}  />
                        </a>
                    </div>
                </div>    
            }
            {props.heroSettings.cta.cta_options === 'custom_button' &&
                {/* build_custom_button($hero_settings['cta']['custom_button']); */}
            }            
        
        </>
        )
    }


    //Parallax settings
    let bgImg = 'bg-img', bottomAdjust = '', paddingOveride = '';
    if (hero.hero_type === 'parallax'){

        if(hero.parallax.background_position !== 'center'){
            bgImg = 'bg-img-center-'.$images['background_position'];
        }
        if(hero.parallax.bottom_adjustment){
            bottomAdjust = 'bottom: -' + hero.parallax.bottom_adjustment + 'px; ';
        }
        if(hero.parallax.rotating_images === true){
            paddingOveride = 'pb-0';
        }

    }

    //Background Image Settings
    let backgroundImage = '', backgroundImagePT = 'pt-4', backgroundImagePB = '';
    if (hero.hero_type === 'background_image'){
        backgroundImage = hero.background_image.bg_image_settings.background_image;
        if( navAdjustment !== '' ){
            backgroundImagePT = 'glossary-pt';
            backgroundImagePB = 'glossary-pb';
        }
         
    }

    //Standard Image Settings
    //     $image = get_field('standard_image', $post_id);
    //     if( empty($image) ){
    //         $image = get_sub_field('standard_image', $post_id);
    //     }
    //TODO
    let standardImage = '';
    if( hero.standard_image !== ''){
        standardImage = hero.standard_image;
    } 


    //Padding for after hero container
    let heroBottomSpacing = 'mb-6 mb-lg-7';
    if (hero.overlap_hero_bottom === true){
        heroBottomSpacing = 'hero-overlap';
    }


    // console.log('Props Hero.js', hero);


    return (
    <>

    <div className="z-index1 position-relative">

        {/************************************************************************************************** None */}
        {hero.hero_type === 'none' &&
        <>

        <div id="" className={navAdjustment + ' position-relative text-center'} >
            <div className="mt-4 position-relative z-index4">
                <DisplayHeroText heroText={hero.hero_text} siteSettings={settings} heroSettings={hero.hero_settings} actualLink={slug} textColor={textColor} />
            </div>
        </div>

        </>
        }


        {/************************************************************************************************** Parallax */}
        {hero.hero_type === 'parallax' &&
        <>

            <div className="position-relative hero-bg-tall">
                <div id="hero-parallax" className={darkBg + ' ' + navAdjustment + ' hero-bg-tall overflow-hidden d-flex align-items-center position-relative text-center'}>

                    <div className={bgImg + ' z-index1 position-absolute bg-position d-block d-md-none'} style={{backgroundImage: `url(${hero.parallax.mobile.mobile_image.url })`}} ></div>
                    
                    <div id="hero-mid" className={bgImg + ' position-absolute bg-position d-none d-md-block z-index2'} style={{backgroundImage: `url(${hero.parallax.web.mid.url })`}}></div>
                    <div id="hero-back" className={bgImg + ' position-absolute bg-position d-none d-md-block z-index1'} style={{backgroundImage: `url(${hero.parallax.web.back.url })`}}></div>

                    <div className={'hero-text w-100 position-relative z-index4 ' + paddingOveride} >

                        <DisplayHeroText heroText={hero.hero_text} siteSettings={settings} heroSettings={hero.hero_settings} actualLink={slug} textColor={textColor} />

                        {hero.parallax.rotating_images === true && 
                        <div id="rotating-images-container" className="position-relative z-index4 d-flex align-items-end mx-auto" data-delay={ (hero.parallax.add_images.delay) ? hero.parallax.add_images.delay * 1000 : 6000} >
                            <RotatingImages images={hero.parallax.add_images} ></RotatingImages>
                        </div>
                        }
                    </div>

                </div>
                {/* <?php echo $bottom_adjust; ?>  this is also style */}
                <div id="hero-front" className={bgImg + ' position-absolute bg-position d-none d-md-block z-index3'} style={{backgroundImage: `url(${hero.parallax.web.front.url })`}}></div>

            </div>

        </>
        }

        {/************************************************************************************************** Fixed */}
        {hero.hero_type === 'fixed' &&
        <>
        {/* <?php
        }elseif( $hero_type == 'fixed'){

            $images = '';
            if (!empty($args['fixed'])){
                $images = $args['fixed'];
            }
            if( empty($images) ){
                $images = get_field('fixed', $post_id);
            }
            if( empty($images) ){
                $images = get_sub_field('fixed', $post_id);
            }

            $featured_alt = '';
            if( !empty($images['add_featured_image']['featured_image']['alt']) ){
                $featured_alt = $images['add_featured_image']['featured_image']['alt'];
            }
            $button_1_alt = '';
            if( !empty($site_settings['app_downloads'][0]['color_logo']['alt']) ){
                $button_1_alt = $site_settings['app_downloads'][0]['color_logo']['alt'];
            }
            $button_2_alt = '';
            if( !empty($site_settings['app_downloads'][1]['color_logo']['alt']) ){
                $button_2_alt = $site_settings['app_downloads'][1]['color_logo']['alt'];
            }

            // echo 'Images<pre>'.print_r($images,1).'</pre>';

        ?> */}

            <div className="position-relative ">
                <div id="hero-fixed" className={'overflow-hidden d-flex align-items-center position-relative text-center ' + navAdjustment} >

                    <div className="bg-img z-index1 position-absolute bg-position d-block d-md-none" data-style="background-image: url('<?php echo $images['background_images']['mobile_image']['url']; ?>');"></div>
                    
                    <div className="bg-img position-absolute bg-position d-none d-md-block z-index3" data-style="background-attachment:fixed; background-image: url('<?php echo $images['background_images']['web']['url']; ?>');"></div>
                    
                    {/* <?php
                    //featured image on left side
                    if( !empty( $images['featured_image'] ) ){
                    ?> */}
                    <div className="container position-relative z-index4 h-100">
                        <div className="row h-100 d-flex flex-row align-items-center pt-6">
                            <div className="col-12 col-md-6 order-md-2 col-lg-5 h-100 position-relative z-index3">
                    
                                <div className="d-flex flex-column justify-content-center h-100 mt-5 mt-md-0">    
                                    
                                    {/* <?php
                                    if( !empty($hero_text['overline']) ){
                                    ?>
                                    <div className="overline mb-4 text-center text-md-start d-none d-md-block <?php echo $text_color; ?>"><?php echo $hero_text['overline']; ?></div>
                                    <?php
                                    }
                                    ?>
                                    
                                    <h1 className="mb-3 mt-3 mt-md-0 mb-md-4 text-center text-md-start <?php echo $text_color; ?>"><?php echo $hero_text['header']; ?></h1>

                                    <?php 
                                    if( !empty($hero_text['sub_header']) ){
                                    ?>
                                    <p className="subtitle mb-3 mb-md-5 text-center text-md-start <?php echo $text_color; ?>"><?php echo $hero_text['sub_header']; ?></p>
                                    <?php
                                    }
                                    ?> */}

                                    
                                    <div className="row mb-0 mb-md-0">	
                                        <div className="col-6 left-button mobile">			
                                            <a href="<?php echo ($site_settings['app_downloads'][0]['download_link']); ?>" className="mb-3 mb-md-0 button download full-width text-center add_utms" 
                                                tabIndex="0" target="_blank" rel="noopener" 
                                                data-device="<?php echo $site_settings['app_downloads'][0]['app_reporting']['user_device']; ?>" 
                                                data-location="mobile menu" data-page="<?php echo $actual_link; ?>">
                                                <img src="<?php echo $site_settings['app_downloads'][0]['color_logo']['url']; ?>" 
                                                    alt="<?php echo $button_1_alt; ?>" 
                                                    width="<?php echo $site_settings['app_downloads'][0]['color_logo']['width']; ?>" 
                                                    height="<?php echo $site_settings['app_downloads'][0]['color_logo']['height']; ?>"/>
                                            </a>
                                        </div>
                                        <div className="col-6 right-button mobile">
                                            <a href="<?php echo ($site_settings['app_downloads'][1]['download_link']); ?>" className="button download full-width text-center add_utms" 
                                                tabIndex="0" target="_blank" rel="noopener" 
                                                data-device="<?php echo $site_settings['app_downloads'][1]['app_reporting']['user_device']; ?>" 
                                                data-location="mobile menu" data-page="<?php echo $actual_link; ?>">
                                                <img src="<?php echo $site_settings['app_downloads'][1]['color_logo']['url']; ?>" 
                                                    alt="<?php echo $button_2_alt; ?>" 
                                                    width="<?php echo $site_settings['app_downloads'][1]['color_logo']['width']; ?>" 
                                                    height="<?php echo $site_settings['app_downloads'][1]['color_logo']['height']; ?>"/>
                                            </a>		
                                        </div>
                                    </div>
                                </div>	
                    
                            
                                    
                            </div>
                            <div className="col-12 col-md-4 order-md-1 h-100 position-relative z-index-1">
                                <div id="hero-featured-container" className="d-flex align-items-center justify-content-center h-100">
                                    <img id="hero-fixed-featured"  className="img-fluid position-relative" 
                                        width="<?php echo $images['add_featured_image']['featured_image']['width']; ?>" 
                                        height="<?php echo $images['add_featured_image']['featured_image']['height']; ?>"
                                        src="<?php echo $images['add_featured_image']['featured_image']['url']; ?>" 
                                        alt="<?php echo $featured_alt; ?>"/>
                                </div>
                            </div>

                            <div className="bg-img z-index2 position-absolute bg-position d-block d-md-none" data-style="background-image: url('<?php echo $images['background_images']['mobile_image_foreground']['url']; ?>');"></div>

                        </div>
                    </div>

                    {/* // <?php
                    // }
                    // ?>

                    
                    // <?php
                    // //standard setup
                    // //display_hero_text($hero_text, $site_settings, $hero_settings, $actual_link, $text_color); 
                    // ?> */}

                </div>
                
            </div>


        </>
        }



        {/**************************************************************************************************/}
        {hero.hero_type === 'rive' &&
        <>

        {/* <?php

            $rive = get_field('rive', $post_id);
          
        ?> */}

            <div id="hero-rive" className={'hero-bg-tall h-100 overflow-hidden d-flex align-items-center position-relative text-center ' + navAdjustment} >

                <div className="bg-img z-index1 position-absolute bg-position d-block d-md-none" data-style="background-image: url('<?php echo $rive['rive_options']['mobile_image']['url']; ?>');"></div>
                
                <div id="" className="bg-img position-absolute bg-position d-none d-md-block z-index2" data-style="background-image: url('<?php echo $rive['rive_options']['backup_background']['url']; ?>');"></div>
            
                <canvas id="hero-canvas" className="position-absolute z-index3 d-none d-md-block hero-bg-tall" ></canvas>

                <div className="hero-text w-100 position-relative z-index4">
                    <DisplayHeroText heroText={hero.hero_text} siteSettings={settings} heroSettings={hero.hero_settings} actualLink={slug} textColor={textColor} />
                </div>
            </div>
            
            {/* <?php
            //TODO make this work for all RIVE, and pass the PHP variable through a CANVAS data element or something
            //https://newbedev.com/html5-canvas-100-width-height-of-viewport
            //https://help.rive.app/runtimes/layout
            ?>
            <script src="https://unpkg.com/@rive-app/canvas@1.0.47"></script>
            <script>

                // Fill the canvas, cropping Rive if necessary
                let layout = new rive.Layout({
                    fit: rive.Fit.Cover,
                    minY: 737
                });

                const r = new rive.Rive({
                    src: "<?php echo $rive['rive_options']['rive_file']['url']; ?>",
                    canvas: document.getElementById("hero-canvas"),
                    layout: layout,
                    autoplay: true,
                });

                // Update the layout
                var canvas = document.getElementById('hero-canvas'),
                    context = canvas.getContext('2d');

                // resize the canvas to fill browser window dynamically
                function updateCanvas() {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    // console.log(canvas.width, canvas.height);
            
                    if( window.innerWidth > 700){//don't adjust for mobile devices (it's hidden anyway)
                        r.layout = new rive.Layout({ fit: rive.Fit.Cover });
                    }
                    
                }
                updateCanvas();

                window.addEventListener('resize', updateCanvas, false);


                // // https://www.freecodecamp.org/news/javascript-debounce-example/
                // function e_debounce(func, timeout = 300){
                // let timer;
                // return (...args) => {
                //     clearTimeout(timer);
                //     timer = setTimeout(() => { func.apply(this, args); }, timeout);
                // };
                // }
                // const processChange = e_debounce(() => updateCanvas(), 50);
                // window.addEventListener("resize", processChange);
            </script>

        */}

        </>
        }


        {/**************************************************************************************************/}
        {hero.hero_type === 'background_image' && hero.background_image.bg_image_settings.text_placement === 'overlap' &&
        <>
        
        {/* "overlap" puts text on top of background image, while "below" puts it below the image (see thank-you) */}

            <div className={'position-relative short-bg-height text-center ' + navAdjustment} >
                <div className="bg-img-center-bottom  position-absolute w-100 h-100 z-index1" style={{backgroundImage: `url(${hero.background_image.bg_image_settings.background_image.url})`}} ></div>
            

                <div className={'position-relative z-index2 px-2 max-width ' + backgroundImagePB + ' ' + backgroundImagePT} >
                    <DisplayHeroText heroText={hero.hero_text} siteSettings={settings} heroSettings={hero.hero_settings} actualLink={slug} textColor={textColor} />
                </div>
            </div>
        </>
        }

        {hero.hero_type === 'background_image' && hero.background_image.bg_image_settings.text_placement !== 'overlap' &&
        <>
            <div id="hero-bg" className={'position-relative text-center ' + navAdjustment} >

                <div className="position-relative z-index4 ">

                    <div id="hero-bg-img" className="bg-img mb-4 bg-img-center-bottom container g-0 " style={{backgroundImage: `url(${hero.background_image.bg_image_settings.background_image.url})`}} ></div>
                    
                    <div className="container px-2">
                        <DisplayHeroText heroText={hero.hero_text} siteSettings={settings} heroSettings={hero.hero_settings} actualLink={slug} textColor={textColor} />
                    </div>

                </div>
            </div>

        </>
        }








        {/**************************************************************************************************/}
        {hero.hero_type === 'standard_image' &&
        <>
        
        {/* 
            // <?php
        //     }
        // }elseif( $hero_type == 'standard_image'){

        //     $image = get_field('standard_image', $post_id);
        //     if( empty($image) ){
        //         $image = get_sub_field('standard_image', $post_id);
        //     }
        // ?> */}

        <div className="container d-flex justify-content-center text-center">
                <img src="<?php echo $image['image_settings']['image']['url']; ?>" alt={standardImage.image_settings.image.alt}
                    width="<?php echo $image['image_settings']['image']['width']; ?>" height="<?php echo $image['image_settings']['image']['height']; ?>" className="img-fluid" />
            </div>

            <div id="hero-bg" className={'position-relative text-center ' + navAdjustment} >

                <div className="position-relative z-index4 ">

                    <div className="container px-2">
                        <DisplayHeroText heroText={hero.hero_text} siteSettings={settings} heroSettings={hero.hero_settings} actualLink={slug} textColor={textColor} />
                    </div>

                </div>
            </div>

        {/* <?php
        }
        ?> */}

        </>
        }

    </div>


    <div className={heroBottomSpacing}></div>
    

    </>
    )
};
  
export default Hero;