import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Hero from "../parts/Hero";
import BlockAlternatingText from '../parts/BlockAlternatingText';
import BlockCTA from '../parts/BlockCTA';


const About = (props) => {

    const sampleLocation = window.location.href;
    const slug = sampleLocation.split('/').filter(e => e).pop();//used for reporting everywhere (it's the URL slug)
   
    const GET_PAGE_DATA = gql`
    query getPageBySlug{
        page(id: "${slug}", idType: URI) {
            hero
            sidebarSettings
            flexibleContent
            slug
            status
            title
            uri
            content
            databaseId
        }
    }
    `;

    const { loading, error, data } = useQuery(GET_PAGE_DATA);

    if (loading) return null;
    if (error || !data.page) return null;

    const flexibleContent = JSON.parse(data.page.flexibleContent);

    console.log('About data', flexibleContent);


    return(
        <>
            <Hero slug={slug} settings={props.settings} hero={data.page.hero} sidebarSettings={data.page.sidebarSettings} />

            {flexibleContent.map( function(block, index){
                
                if( block.acf_fc_layout === 'our_team' ){
                    //TODO
                    return null;
                }else if( block.acf_fc_layout === 'alternating_text' ){
                    return <BlockAlternatingText block={block} key={index} />;
                }else if( block.acf_fc_layout === 'cta_block' ){
                    return <BlockCTA block={block} key={index} />;
                }else{
                    return <div>Error: No match found</div>
                }
            
            })}
            
        </>
    );
};
  
export default About;