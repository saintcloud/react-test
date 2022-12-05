import React from 'react';
import { useQuery, gql } from '@apollo/client';
import NoPage from "./NoPage";


function BlogDetail(props){

    let pageUrl = window.location.href;
    let slug = pageUrl.split('/').filter(e => e).pop();
    // console.log('pageUrl slug', slug);

    const GET_POSTS_DETAIL = gql`
        query getPostBySlug($slug: String) {
            post: postBy(uri: $slug, slug: "${slug}") {
              title
              content
              date
              author {
                node {
                  name
                }
              }
              featuredImage {
                node {
                  altText
                  srcSet
                  title
                  uri
                  sourceUrl
                  sizes
                  link
                  mediaDetails {
                    file
                    height
                    width
                    sizes {
                        file
                        fileSize
                        height
                        mimeType
                        name
                        sourceUrl
                        width
                    }
                  }
                }
              }
            }
          }
    `;

    const { loading, error, data } = useQuery(GET_POSTS_DETAIL);

    if (loading) return console.log('Loading blog detail...');
    if (error || data === undefined || !data.post) return <NoPage />;
    // console.log('Blog data', data);

    return (
        <>
            {/* <Header slug={props.slug} settings={props.settings}  /> */}
            <main id="primary" className="site-main">

            {/* <?php
            if ( have_posts() ) :
                the_post();

                $post_id = get_the_ID();
                $title = get_the_title();
                $date = get_the_date();
                $author = get_the_author();
                $content = get_the_content();
                $content = apply_filters('the_content', $content);
                $content = str_replace(']]>', ']]&gt;', $content);
                $featured_img = get_the_post_thumbnail_url();
                $featured_img_sm = get_the_post_thumbnail_url($post_id,'medium_large');//medium_large = 768 wide, giddy-thumb = 472

                
                $featured_cat = get_the_category();
                $cats_data = [];
                foreach($featured_cat as $k => $v){
                    // $cats_data[] = '<a href="'.home_url().'/category/'.$v->slug.'" className="">'.$v->name.'</a>';
                    $cats_data[$v->term_id] = $v->term_id;
                }
                // $cats = implode(',', $cats_data);
            ?> */}


                
                <div className="bg-img position-relative single-hero-height">

                    <div id="post-large" className="bg-img bg-position position-absolute d-block d-md-none" style={{backgroundImage: `url(${data.post.featuredImage.node.mediaDetails.sizes[6].sourceUrl})`}}></div>
                    <div id="post-small" className="bg-img bg-position position-absolute d-none d-md-block" style={{backgroundImage: `url(${data.post.featuredImage.node.sourceUrl})`}}></div>			

                    <div className="container h-100 z-index3 position-relative">
                        <div className="row h-100">
                            <div className="col-12"> 
                                <div className="d-flex flex-column justify-content-center h-100">
                                    <h1 className="text-white text-center mb-3">{data.post.title}</h1>
                                    <div className="overline text-white text-center">{data.post.author.node.name + ' - ' + data.post.date}</div>
                                </div>
                            </div>
                        </div> 
                    </div> 

                    <div className="blog-border img-overlay position-absolute rounded-start z-index2" ></div>
                </div>


                <div className="container my-5">
                    <div className="row">
                        <div className="col-12 offset-lg-1 col-lg-10 offset-xl-3 col-xl-6"> 
                            <div className="blog-text">
                                <div dangerouslySetInnerHTML={{__html:data.post.content}}></div>
                            </div>
                        </div>
                    </div> 
                </div> 

                <div className="container mb-5">
                    <div className="row">
                        <div className="col-12 col-md-6 offset-lg-1 col-lg-5 offset-xl-3 col-xl-3"> 
                            <div className="d-flex align-items-md-center h-md-100 mb-2 mb-md-0">
                                <div className="">
                                    
                                    {/* <?php 
                                    $tags = wp_get_post_tags($post_id);
                                    // echo 'Tags<pre>'.print_r($tags,1).'</pre>';
                                    if( !empty($tags) ){
                                        echo '<span className="brown">'.$text['tags'].'</span>';
                                        foreach($tags as $k => $tag){
                                        ?>	
                                        <a className="button transparent-dark ms-1 mb-1 small" href="<?php echo home_url().'/tag/'.$tag->slug.'/'; ?>"><?php echo $tag->name; ?></a>
                                        <?php
                                        }
                                    }
                                    ?> */}
                                </div>
                            </div>	
                        </div>
                        <div className="col-12 col-md-6 col-lg-5 col-xl-3"> 
                            <div className="d-flex justify-content-start justify-content-md-end align-items-center">
                                <div className="brown">share this text</div>
                                <div className="ms-1">
                                 
                                    <div className="a2a_kit a2a_kit_size_32 a2a_default_style" data-a2a-icon-color="transparent,#211B12">
                                        <a className="a2a_button_facebook"></a>
                                        <a className="a2a_button_twitter"></a>
                                        <a className="a2a_button_linkedin"></a>
                                    </div>
                                    <script async src="https://static.addtoany.com/menu/page.js"></script>
                                   
                                </div>	
                            </div>
                        </div>
                    </div> 
                </div> 



                {/* <?php
                if ( 'post' === get_post_type() ) {

                    // the_post_navigation(
                    // 	array(
                    // 		'prev_text' => '<span className="nav-subtitle">' . esc_html__( 'Previous:', '_s' ) . '</span> <span className="nav-title">%title</span>',
                    // 		'next_text' => '<span className="nav-subtitle">' . esc_html__( 'Next:', '_s' ) . '</span> <span className="nav-title">%title</span>',
                    // 	)
                    // );


                    //Get Related Articles
                    $related_posts_args = array(
                        'category__in'	=> $cats_data,
                        'orderby' => 'post_date',
                        'order' => 'DESC',
                        'post_type' => 'post',
                        'post_status' => 'publish',
                        'posts_per_page' => 6,
                        'paged' => '1',
                        'post__not_in' => [$post_id],
                        'no_found_rows'	=> true
                    );

                    $wp_query = new WP_Query( $related_posts_args );

                    if ( $wp_query->have_posts() ) { 
                    ?> */}

                        
                        <div className="container mb-4">
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="text-center">Related Articles</h3>
                                </div>
                            </div>
                        </div>

                        <div className="container mb-5">
                            <div className="row ">
                    
                            {/* <?php
                            while($wp_query->have_posts()) : $wp_query->the_post();

                                get_template_part( 'template-parts/post', 'item', $args );

                            endwhile;
                            ?>	 */}

                            </div>
                        </div>

                    {/* <?php
                    }
                    wp_reset_query();
                }
            endif; // End of the Post.
            ?> */}

            </main>
        </>
    )
};
 

export default BlogDetail;
