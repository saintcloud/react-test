import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

//pages
import Home from "./pages/Home";
import WhatIsGiddy from "./pages/WhatIsGiddy";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Faq from "./pages/Faq";
import Default from "./pages/Default";
import NoPage from "./pages/NoPage"; //404

//parts
import Header from "./parts/Header";
import Footer from "./parts/Footer";


export default function App() {

  const GET_CONTENT = gql`
    query getGeneralSettings {
      giddyGeneralSettings {
        footerSettings
        generalSettings
        socialMediaIcons
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CONTENT);

  if (loading) return null; //console.log('app loading...')
  if (error) return <p>Error : {error.message}</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header settings={data.giddyGeneralSettings} />}>
          <Route index element={<Home settings={data.giddyGeneralSettings} />} />
          <Route path="/what-is-giddy/" element={<WhatIsGiddy settings={data.giddyGeneralSettings} />} />
          <Route path="/about/" element={<About settings={data.giddyGeneralSettings} />} />
          <Route path="/blog/" element={<Blog settings={data.giddyGeneralSettings} />} />
          <Route path="/blog/:slug/" element={<BlogDetail settings={data.giddyGeneralSettings} />} />
          <Route path="/faq/" element={<Faq settings={data.giddyGeneralSettings} />} />
          <Route path="/:slug/" element={<Default settings={data.giddyGeneralSettings} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <Footer settings={data.giddyGeneralSettings} />
  </BrowserRouter>
  );
}