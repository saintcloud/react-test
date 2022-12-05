import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Hero from "../parts/Hero";
import NoPage from "./NoPage";


function Default(props){

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
    if (error || !data.page) return <NoPage />;

    // console.log('Default data', data);
    
    return (
        <>
            <Hero slug={slug} settings={props.settings} hero={data.page.hero} sidebarSettings={data.page.sidebarSettings} />
            <div>This should catch all pages without a specified template</div>
            <h1>{data.page.title}</h1>
            <p>{data.page.content}</p>
        </>
    )
    
};

export default Default;