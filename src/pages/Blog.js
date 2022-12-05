import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';


const GET_POSTS = gql`
  query getPosts {
    posts {
      edges {
        node {
          slug
          title
          id
          isSticky
          status
          excerpt
          content
          date
          author {
            node {
              nicename
              name
              lastName
              firstName
            }
          }
        }
      }
    }
  }
`;

const Blog = (props) => {

    const { loading, error, data } = useQuery(GET_POSTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    let blogData =  data.posts.edges;
    
    // console.log(blogData);

    return (
      <>
      {/* <Hero slug={slug} settings={props.settings} hero={data.page.hero} sidebarSettings={data.page.sidebarSettings} /> */}
      <div>
        {
          blogData.map( (blog, key) => {
            return(
              <div key={key} className="mb-5" >
                <h2>{blog.node.title}</h2>
                <p>{blog.node.exerpt}</p>
                <p>{blog.node.slug}</p>
                <Link to={`/blog/${blog.node.slug}/`}>Learn More</Link>
              </div>
            )
          })
        }
      </div>
      </>
    )
}



  
export default Blog;