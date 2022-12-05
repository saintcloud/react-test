import { useQuery, gql } from '@apollo/client';


const GET_CONTENT = gql`
  query getContent {
    pages(where: {id: 10}) {
      edges {
        node {
          pageId
          slug
          title
          content
          flexibleContent {
            flexibleBlocks {
              ... on Page_Flexiblecontent_FlexibleBlocks_TestBlock {
                content
                h2Header
                fieldGroupName
              }
              ... on Page_Flexiblecontent_FlexibleBlocks_TestimonialBlock {
                h2Header
                content
                fieldGroupName
              }
            }
          }
          featuredImage {
            node {
              altText
              link
              sizes
              srcSet
              slug
              sourceUrl
              uri
              title
              mediaDetails {
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
    }
  
  }
`;

const BlockTest = (props) => {
  return (
    <div>
      {/* This is TestBlock!<br /> */}
      <h2>{props.testData.h2Header}</h2>
      <div dangerouslySetInnerHTML={{__html: props.testData.content}}></div>
      {/* {console.log('Inside Test Block!!', props)} */}
    </div>
  );
}

const BlockTestimonial = (props) => {
  return (
    <section className="testimonial-block">
        <div className="container">
            <div className="row">
                <div className="col col-md-6 col-lg-4" >
                    {/* This is TestimonialBlock!<br /> */}
                    <h2>{props.testimonialData.h2Header}</h2>
                    <div dangerouslySetInnerHTML={{__html: props.testimonialData.content}}></div>
                    {/* {console.log('Inside Testimonial Block!!', props)} */}
                </div>
            </div>
        </div>
    </section>
  );
}

const DisplayContent = (props) => {
  const { loading, error, data } = useQuery(GET_CONTENT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const test =  data.pages.edges[0].node;

  return (
 
    <>

    <section className="" key={test.slug}>
        <div className="container">
            <div className="row">
                <div className="col col-md-6 col-lg-4" >
                    <h3>{test.title}</h3>
                    <img width={`${test.featuredImage.node.mediaDetails.width}`} height={`${test.featuredImage.node.mediaDetails.height}`} 
                        alt={`${test.featuredImage.node.altText}`} src={`${test.featuredImage.node.sourceUrl}`} />
                    <div dangerouslySetInnerHTML={{__html: test.content}}></div>
                </div>
            </div>
        </div>
    </section>     
    
    {test.flexibleContent.flexibleBlocks.map( function(dets, index){

        
        if( dets.fieldGroupName === 'Page_Flexiblecontent_FlexibleBlocks_TestBlock' ){
            return <BlockTest testData={dets} key={index}  />;
        }else if( dets.fieldGroupName === 'Page_Flexiblecontent_FlexibleBlocks_TestimonialBlock' ){
            return <BlockTestimonial testimonialData={dets} key={index} />;
        }else{
            return <div>Error: No match found</div>
        }
    
    })}
    </>
    
  );
}

export default DisplayContent;