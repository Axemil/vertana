import React, { ReactElement, Component, useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation,
  Redirect,
  useParams,
} from 'react-router-dom';
import Main from 'pages/Main';
import Post from 'pages/Post';
import Archives from 'pages/Archives';
import Search from 'pages/Search';
import NewsAndEvents from 'pages/NewsAndEvents';
import PostNewsAndEvents from 'pages/PostNewsAndEvents';
import ArchivesNewsAndEvents from 'pages/ArchivesNewsAndEvents';
import client from 'util/WPClient';
import LoadingData from 'components/LoadingData';

declare const VI_NEWS_BASE_URL: string;

const getMainPagePath = () =>
  navigator.userAgent === 'ReactSnap' ? '/' : '/blog';

interface Props {}
export default function Layout({}: Props): ReactElement {
  const [newsBaseUrl, setNewsBaseUrl] = useState('news-and-events');
  useEffect(() => {
    (async () => {
      const { slug } = await client.getNewsIndexInfo();
      setNewsBaseUrl(`/${slug}`);
    })();
  });
  return (
    <>
      {/* <MainMenu className="main-menu" /> */}
      <Switch>
        <Route exact path={`${VI_NEWS_BASE_URL}-category/:slug/`}>
          <ArchivesNewsAndEvents />
        </Route>
        <Route exact path={`${newsBaseUrl}/page/:pageNumber/`}>
          <NewsAndEvents baseUrl={newsBaseUrl} />
        </Route>
        <Route exact path={`${VI_NEWS_BASE_URL}/:slug/`}>
          <PostNewsAndEvents />
        </Route>
        <Route exact path={`${newsBaseUrl}`}>
          <NewsAndEvents baseUrl={newsBaseUrl} />
        </Route>
        <Route exact path={`${getMainPagePath()}/category/:slug/`}>
          <Archives type="category" />
        </Route>
        <Route exact path={`${getMainPagePath()}/category/:slug/:pageNumber/`}>
          <Archives type="category" />
        </Route>
        <Route exact path={`${getMainPagePath()}/user/:slug/`}>
          <Archives type="user" />
        </Route>
        <Route exact path={`${getMainPagePath()}/user/:slug/:pageNumber/`}>
          <Archives type="user" />
        </Route>
        <Route exact path={`/search`}>
          <Search />
        </Route>
        <Route exact path={`${getMainPagePath()}/page/:pageNumber/`}>
          <Main />
        </Route>
        <Route exact path={`${getMainPagePath()}/:slug/`}>
          <Post />
        </Route>
        <Route exact path={getMainPagePath()}>
          <Main />
        </Route>
        <Route>
          <LoadingData items="" />
          {/* <Page404 /> */}
        </Route>
      </Switch>
      {/* <Footer data={footerData} /> */}
    </>
  );
}

function Page404() {
  return <h1>Page Not found</h1>;
}
