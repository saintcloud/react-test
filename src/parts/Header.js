import { Outlet, Link } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

const Header = (props) => {
  
  // const footerSettings =  JSON.parse(props.settings.footerSettings);
  // const socialMediaIcons =  JSON.parse(props.settings.socialMediaIcons);
  const generalSettings = JSON.parse(props.settings.generalSettings);
  let sidebarSettings = {};
  if (props.sidebarSetting !== undefined){
    sidebarSettings = JSON.parse(props.sidebarSettings);
  }
   
  

  const actualLink = props.slug;//This doens't update, so this will not WORK! TODO, fix these references
  const isLanding = false;//TODO from CMS

  // console.log('header.js ', props.slug);
  


  // $banner = '';
  // $banner_background = 'background-color: #635b4f;';
  // $banner_text = 'color:#FFFFFF;';
  // if( !isset($_COOKIE['wp-giddy_banner']) && !empty($site_settings['site_options']['turn_on_promo_banner']) ){
  //   $banner = 'promo-banner';

  //   if( !empty($site_settings['site_options']['promo_banner_options']['banner_background_color']) ){
  //     $banner_background = 'background-color:'.$site_settings['site_options']['promo_banner_options']['banner_background_color'].';';
  //     $banner_text = 'color:'.$site_settings['site_options']['promo_banner_options']['banner_text_color'].';';
  //   }
  // }


  const mobileMenu = (props) =>{
   
    let nav = document.getElementById('nav-icon');
    let overlay = window.document.getElementById('menu-overlay');
    let mobile = document.getElementById('mobile-menu');
    if (nav){
        if(nav.classList.contains('active')){//turn off mobile menu
            nav.classList.remove('active');
            mobile.classList.remove('active');
            overlay.classList.remove('show');
            // mobile.setAttribute( 'aria-expanded', 'false' );
        }else{//turn on mobile menu
            nav.classList.add('active');
            mobile.classList.add('active');
            overlay.classList.add('show');
            // mobile.setAttribute( 'aria-expanded', 'true' );
        }
    }

  }

  const modalButton = (props) => {
      const modalBtn = document.getElementsByClassName('modal-button'); 
      const modalCTA = document.getElementById('modal-cta');
      const modalOverlay = document.getElementById('modal-overlay'); 
      const headerImage = document.getElementById('modal-image');
      const closeBtn = document.getElementById('close-button');

      if(modalBtn){
        modalCTA.classList.add('show');
        modalOverlay.classList.add('show');
        if( headerImage != null ){
          headerImage.src = headerImage.getAttribute('data-src');
        }
        closeBtn.focus();
        closeBtn.addEventListener('click', function(e){//close the modal when clicking on the "x" close button
          e.preventDefault();
          modalCTA.classList.remove('show');
          modalOverlay.classList.remove('show');
        });
        modalOverlay.addEventListener('click', function(){//close modal when clicking on the dark background overlay
            modalCTA.classList.remove('show');
            modalOverlay.classList.remove('show');
        });
      }

  };


  const GET_CONTENT = gql`
  query getHeaderData {
    menu(idType: SLUG, id: "main-menu") {
      count
      id
      databaseId
      name
      slug
      menuItems(first: 100) {
        nodes {
          id
          databaseId
          title
          url
          cssClasses
          description
          label
          linkRelationship
          target
          parentId
          order
          uri
        }
      }
    }
  }
  `;

  const { loading, error, data } = useQuery(GET_CONTENT);

  if (loading) return null; //console.log('header loading...')
  if (error) return <p>Error : {error.message}</p>;


  const flatListToHierarchical = (data = [], {idKey='id',parentKey='parentId',childrenKey='children'} = {} ) => {
      const tree = [];
      const childrenOf = {};
      data.forEach((item) => {
          const newItem = {...item};
          const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
          childrenOf[id] = childrenOf[id] || [];
          newItem[childrenKey] = childrenOf[id];
          parentId
              ? (
                  childrenOf[parentId] = childrenOf[parentId] || []
              ).push(newItem)
              : tree.push(newItem);
      });
      return tree;
  };

  const orderedMenu = flatListToHierarchical( data.menu.menuItems.nodes );

  // console.log('menu updated: ', orderedMenu); // console.log('header data', data);


  return (
  <>
    


	<a className="skip-link screen-reader-text visually-hidden-focusable" href={'#primary'}>
    Skip to content
  </a>

	<header id="site-header" className=""> {/* <?php $banner; ?> (as on className) */}

		{/* <?php
		if( !isset($_COOKIE['wp-giddy_banner']) && !empty($site_settings['site_options']['turn_on_promo_banner']) ){
		?> 
			<div id="promo-banner" className=" white-text position-relative" style="<?php echo $banner_background.' '.$banner_text; ?>" >
				

				<div className="container h-100">
					<div id="banner-text" className="row h-100 position-relative" >

						<div id="close-giddy-banner" className="position-absolute pointer d-flex justify-content-center align-items-center">
							<div className="position-absolute">X</div>
						</div>

						<div className="offset-2 col-8 offset-md-1 col-md-10 h-100 ">
							<div className="d-flex justify-content-center justify-content-lg-left align-items-center text-center text-md-start h-100">
								<div>
									<?php echo $site_settings['site_options']['promo_banner_options']['banner_text']; ?> 
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		 <?php
		} 
		?> */}

		<div id="site-nav" className="container d-flex justify-content-between align-items-center mx-auto position-relative" >


      {isLanding === false &&
			<div id="nav-icon" tabIndex="0" onClick={(e) => mobileMenu(e)} className="menu-toggle no-print " aria-labelledby="mobile-menu-tooltip">
				<div></div>
				<span className="screen-reader-text visually-hidden-focusable" id="mobile-menu-tooltip">Open mobile menu</span>
			</div>
      }


			<div className="site-branding ">
        <Link to="/" rel="home">
					<img id="giddy-logo" src={generalSettings.site_branding.horizontal_logo.url} 
						alt={generalSettings.site_branding.horizontal_logo.alt} 
						height={generalSettings.site_branding.horizontal_logo.height} 
						width={generalSettings.site_branding.horizontal_logo.width} 
						className="" />
        </Link>	
			</div>

			{isLanding === false &&
			<nav id="site-navigation" className="main-navigation flex-nowrap" aria-label="web navigation"> 
				<div className="d-inline-block">

          {/* TODO $text_color as part of className below */}
          <ul id="primary-menu" className="dropdown menu navigation-main text-uppercase fw-bold nav-menu">
            {
              orderedMenu.map( (menuItem) => {

                let childMenu = [], thisItem = []; 
                let hasChildren = false;

                //TODO if blog, then use <Link to="/" rel="">
                // let parentUrl = menuItem.url.replace('http://localhost/giddyco','http://localhost:3000');
                // thisItem.push(<a key={Date()} href={parentUrl}>{menuItem.label}</a>);
                let parentUrl = menuItem.uri;
                thisItem.push(<Link key={Date()} to={parentUrl}>{menuItem.label}</Link>);

                if(menuItem.children.length > 0){
                
                  hasChildren = true;
            
                  menuItem.children.forEach(function(child){
                    // console.log('child in Header.js', child);
                    // let updatedUrl = child.url.replace('http://localhost/giddyco','http://localhost:3000');

                    childMenu.push(
                      <li key={child.id} className=" menu-item menu-item-type-post_type menu-item-object-page children-count-0">                        
                        {/* <a href={updatedUrl}> */}
                        <Link to={child.uri}>
                          <div className="d-flex">
                            <div className="menu-icon">
                              {child.title &&
                                <img src={'https://giddy.co' + child.title} alt={child.label + ' icon'} width="24" height="24" />
                              }
                            </div>
                            <div className="flex-column">
                              <div className="subtitle1 text-primary text-none">{child.label}</div>
                              <div className="body2 text-none"></div>
                            </div>
                          </div>
                        </Link>
                        {/* </a> */}
                      </li>
                    );
                  });
                  
                }

                let childClass = '';
                if(hasChildren === true){
                  childClass = 'menu-item-has-children';
                  thisItem.push(<ul key={menuItem.databaseId} className={menuItem.databaseId + ' sub-menu'}>{childMenu}</ul>);
                }
                
                return( 
                  <li key={menuItem.id} className={childClass + ' menu-item menu-item-type-post_type menu-item-object-page ' + menuItem.id}>
                    {thisItem}
                  </li> 
                );
               
              })
            }
          </ul>
					{/* <?php
					wp_nav_menu(
						array(
							'theme_location' => 'menu-1',
							'menu_id'        => 'primary-menu',
							'menu_className'     => 'dropdown menu navigation-main text-uppercase fw-bold '.$text_color,
							'container'		 => 'false',
							'walker'		 => new Giddy_Nav_Walker()
						)
					);
					?> */}
          
				</div>
				<button id="register-button" onClick={(e)=>{modalButton(e);}} className="modal-button <?php echo $changing_button; ?>" tabIndex="0">
					<span id="web" className="label d-inline">
            {generalSettings.misc_text.app_download_text}
					</span>
				</button>
			</nav>
			}

		</div>
	</header>





	<nav id="mobile-menu"  aria-label="mobile navigation">   {/* aria-expanded="false" */}
		<div id="mobile-container">
			<div id="mobile-brand" className="position-relative">
				<div className=" d-flex justify-content-between align-items-center h-100">
					<div className="site-branding ">
            <Link to="/" rel="home">
							<img src={generalSettings.site_branding.horizontal_logo.url}  alt={generalSettings.site_branding.horizontal_logo.alt} 
								height={generalSettings.site_branding.horizontal_logo.height}   width={generalSettings.site_branding.horizontal_logo.width}  />
						</Link>			
					</div>
					<div id="close-menu-btn" onClick={(e)=>mobileMenu(e)} className="position-absolute">
						<img src={`${process.env.PUBLIC_URL}/img/x.svg`}  width="44" height="44" alt="Close Navigation Menu" />
					</div>
				</div>
			</div>	
			
			<div id="mobile-content">
				{/* <?php
				wp_nav_menu(
					array(
						'container'      => false,
						'menu_id'        => 'mobile-ul',
						'menu_className'     => 'nav',
						'items_wrap'     => '<ul id="%1$s" className="%2$s desktop-menu" data-dropdown-menu>%3$s</ul>',
						'theme_location' => 'menu-1',
						'depth'          => 2,
						'fallback_cb'    => false,
						'walker'		 => new Giddy_Nav_Walker()
					)
				);

				?> */}

				<div className="row">	
					<div className="col-12 col-md-6 left-button">
						<a href={generalSettings.app_downloads[0].download_link} className="mb-3 mb-md-0 text-center button download full-width text-center add_utms" 
							tabIndex="0" target="_blank" rel="noopener noreferrer" 
							data-device={generalSettings.app_downloads[0].app_reporting.user_device} data-location="mobile menu" data-page={actualLink}>
							<img src={generalSettings.app_downloads[0].color_logo.url} alt={generalSettings.app_downloads[0].color_logo.alt} 
								width={generalSettings.app_downloads[0].color_logo.width} height={generalSettings.app_downloads[0].color_logo.height} />
						</a>
					</div>
					<div className="col-12 col-md-6 right-button">
						<a href={generalSettings.app_downloads[1].download_link} className="text-center button download full-width text-center add_utms" 
							tabIndex="0" target="_blank" rel="noopener noreferrer" 
							data-device={generalSettings.app_downloads[1].app_reporting.user_device} data-location="mobile menu" data-page={actualLink}>
							<img src={generalSettings.app_downloads[1].color_logo.url} alt={generalSettings.app_downloads[1].color_logo.alt} 
								width={generalSettings.app_downloads[1].color_logo.width} height={generalSettings.app_downloads[1].color_logo.height} />
						</a>		
					</div>
				</div>		

			</div>
		</div>
	</nav>



	<div id="menu-overlay" onClick={(e) => mobileMenu(e)}></div>
	<div id="site-content" className="<?php echo $banner; ?>"></div>





	<div id="modal-overlay"></div>
	<div id="modal-cta" className="modal-content relative text-center">
		<button id="close-button" href="#" tabIndex="0" className="transparent">
			<img loading="lazy" src={window.location.origin + '/img/x.svg'} width="36" height="36" alt="Close Modal Button"/>
		</button>

			{generalSettings.download_modal.modal_image.url.length > 0 && 
			<img id="modal-image" data-src={generalSettings.download_modal.modal_image.url} 
				width={generalSettings.download_modal.modal_image.width}  height={generalSettings.download_modal.modal_image.height} 
				alt={generalSettings.download_modal.modal_image.alt} />
			}

			<h3 className="header">
        {generalSettings.download_modal.modal_header}
      </h3>
			<p className="desc text-center mb-3">
        {generalSettings.download_modal.modal_description}
      </p>
		
			<div className="row">
				<div className="col-12 col-md-6 left-button">
					<a href={generalSettings.app_downloads[0].download_link} className="mb-3 mb-md-0 button full-width download add_utms" tabIndex="0" target="_blank" rel="noopener noreferrer" 
						data-device={generalSettings.app_downloads[0].app_reporting.user_device} data-location="modal" data-page={actualLink}>
						<img src={generalSettings.app_downloads[0].color_logo.url} alt={generalSettings.app_downloads[0].color_logo.alt}
							width={generalSettings.app_downloads[0].color_logo.width} height={generalSettings.app_downloads[0].color_logo.height} />
					</a>
				</div>
				<div className="col-12 col-md-6 right-button">
					<a href={generalSettings.app_downloads[1].download_link} className="button full-width download add_utms" tabIndex="0" target="_blank" rel="noopener noreferrer" 
						data-device={generalSettings.app_downloads[1].app_reporting.user_device} data-location="modal" data-page={actualLink}>
						<img src={generalSettings.app_downloads[1].color_logo.url}  alt={generalSettings.app_downloads[1].color_logo.alt}
							width={generalSettings.app_downloads[1].color_logo.width} height={generalSettings.app_downloads[1].color_logo.height} />
					</a>
				</div>
			</div>
		
	
	</div>





	{/* <?php
	if( $is_admin && isset($_GET['cookies']) ){
		echo 'Cookies: <pre>'.print_r($_COOKIE,1).'</pre>';
	}
	if( !isset($_COOKIE['wp-giddy_cookie_policy']) && !empty($site_settings['cookie_policy']['turn_on_banner']) && $site_settings['cookie_policy']['turn_on_banner'] == true ){
	?> */}

		{/* <div id="cookie-container" className="py-3 position-fixed no-print d-none-c">
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-8 offset-md-2">
						<div className="d-flex flex-column flex-md-row">
							<div className=""> */}
                {/* <?php echo $site_settings['cookie_policy']['cookie_text']; ?> */}
                {/* {generalSettings.cookie_policy.cookie_text} */}
              {/* </div>
							<div className="mt-2 mt-md-0 mx-auto me-md-0 ms-md-4">
								<button id="giddy-cookie-policy" className=" button transparent-dark text-center" href="#" > */}
                  {/* {generalSettings.cookie_policy.cookie_button_text} */}
								{/* </button>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div> */}

	{/* 
	<?php
	}
	?> */}

	<div id="add-app"></div>



  <script src={`${process.env.PUBLIC_URL}/critical/giddy.js`}></script>


      <Outlet />
    </>
  )
};

export default Header;