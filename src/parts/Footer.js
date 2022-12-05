import React from "react";


function Footer(props) {

    // console.log('footer props', props);
  
    const footerSettings =  JSON.parse(props.settings.footerSettings);
    const socialMediaIcons =  JSON.parse(props.settings.socialMediaIcons);
    const generalSettings =  JSON.parse(props.settings.generalSettings);

    const sampleLocation = window.location.href;
    const slug = sampleLocation.split('/').filter(e => e).pop();//used for reporting everywhere (it's the URL slug)
    
    const actualLink = slug;
    const isLanding = false;//TODO from CMS

    const currentDate = new Date();

    // console.log('footerSettings', footerSettings);

    return (
    <>
        <footer id="colophon" className="site-footer white py-6">

            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-5">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-12">

                                { footerSettings.footer_logos.length !== 0 &&

                                    <img id="footer-logo-h" src={footerSettings.footer_logos.horizontal_white_logo.url} alt={footerSettings.footer_logos.horizontal_white_logo.alt} 
                                        width={footerSettings.footer_logos.horizontal_white_logo.width} height={footerSettings.footer_logos.horizontal_white_logo.height} 
                                        className="d-block" loading="lazy" />
                                }

                            </div>
                            <div id="footer-download" className="col-12 col-md-6 col-lg-12 small-buttons">

                                { generalSettings.app_downloads.length !== 0 && isLanding === false &&
                                <>
                                <div className="overline white mb-2">
                                    {generalSettings.misc_text.app_download_text}
                                </div>
                                <div className="d-flex">
                                    <div className="left-btn">
                                        <a href={generalSettings.app_downloads[0].download_link} className="button download left-button transparent add_utms" tabIndex="0" target="_blank" rel="noopener noreferrer" 
                                            data-device={generalSettings.app_downloads[0].app_reporting.user_device} data-location="footer" data-page={actualLink}>
                                            <img src={generalSettings.app_downloads[0].colorless_logo.url} alt={generalSettings.app_downloads[0].colorless_logo.alt} 
                                                width={generalSettings.app_downloads[0].colorless_logo.width} height={generalSettings.app_downloads[0].colorless_logo.height} 
                                                loading="lazy" />
                                        </a>	
                                    </div>
                                    <div className="right-btn">
                                        <a href={generalSettings.app_downloads[1].download_link} className="button download left-button transparent add_utms" tabIndex="0" target="_blank" rel="noopener noreferrer" 
                                            data-device={generalSettings.app_downloads[1].app_reporting.user_device} data-location="footer" data-page={actualLink}>
                                            <img src={generalSettings.app_downloads[1].colorless_logo.url} alt={generalSettings.app_downloads[1].colorless_logo.alt} 
                                                width={generalSettings.app_downloads[1].colorless_logo.width} height={generalSettings.app_downloads[1].colorless_logo.height} 
                                                loading="lazy" />
                                        </a>	
                                    </div>
                                </div>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                
                    <div className="col-12 col-lg-7">
                    {/* <?php
                    if ($is_landing == false){
                        //nav links
                        wp_nav_menu(
                            array(
                                'menu'			 => 'Footer Menu',
                                'theme_location' => 'menu-1',
                                'menu_id'        => 'footer-menu',
                                'menu_className'     => 'd-md-flex justify-content-md-between',//between, around, evenly
                            )
                        );
                        $time_test['footer_menu'] = microtime(true);
                        
                    }
                    ?> */}
                    </div>	
                </div>	
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <hr className="gray-dark" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-8 d-flex justify-content-between justify-content-md-end order-1 order-md-2 mb-5 mb-md-0 mt-4 mt-md-0 align-items-md-end">
                        
                        {socialMediaIcons.length !== 0 && socialMediaIcons.map((icon) => (
                            <a key={icon.social_name} href={icon.social_link} target="_blank" rel="noopener noreferrer" className="social-icon social-btn-click" aria-label={icon.social_name + ' link'} 
                                data-action={icon.social_name} data-location="footer" data-page={actualLink}>
                                <img src={icon.social_icon.url} alt={icon.social_icon.alt} 
                                    width={icon.social_width} height={icon.social_height} className="" />
                            </a>
                        ))}
                    
                    </div>

                    <div className="col-12 col-md-6 col-lg-4 text-center text-md-start order-2 order-md-1">
                        <div className="copyright text-gray-medium">
                            {footerSettings.copyright.replace('[year]',currentDate.getFullYear())}
                        </div>
                    </div>
                </div>

                { footerSettings.disclaimer.length !== 0 &&
                <div className="row">
                    <div className="col-12">
                        <div className="body2 white mt-5 mt-md-4" dangerouslySetInnerHTML={{__html:footerSettings.disclaimer}}>                            
                        </div>
                    </div>
                </div>
                }

            </div>
        </footer>

    </>
    );
}

export default Footer;