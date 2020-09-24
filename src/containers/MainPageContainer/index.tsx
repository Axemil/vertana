import React, { ReactElement } from 'react';
import Header from 'pages/Main/Header';
import styled from 'styled-components';
import Sidebar from 'app/Sidebar';
import Media from 'common/Media';
import { useParams } from 'react-router-dom';
import { GetPostsData, PostData, PageType } from 'typings/app-types';
import { categoriesColorsDataToHash } from 'util/gql-selectors';
import { gql } from 'apollo-boost';
import { slicePostsForPage, log } from 'util/helpers';
import ScrollToTop from 'components/ScrollToTop';
import LoadingData from 'components/LoadingData';
import { useQuery } from '@apollo/react-hooks';
import { getPostData } from 'util/gql-selectors';
import Pagination from 'components/Pagination';
import CategoriesMenu, { AllCategoriesData } from 'app/CategoriesMenu';
import { usePageNumber } from 'hooks/usePageNumber';
import { POST_DATA_FRAGMENT } from 'gql/postDataFragment';
import MainSection from 'pages/Main/MainSection';
import CategoriesMenuContainer from 'containers/CategoriesMenuContainer';
import NewsAndEventsCategoriesMenu from 'app/NewsAndEventsCategoriesMenu';
import ContextSearch from 'app/Sidebar/ContextSearch';

const Wrapper = styled.div`
  margin: 60px 20px 60px 20px;

  @media (min-width: ${Media.tabletSm}) {
    margin: 60px 35px 60px 35px;
  }

  @media (min-width: ${Media.tabletLg}) {
    display: flex;
    margin: 60px 30px 140px 30px;

    .main {
      margin-right: 80px;
    }

    .sidebar {
      width: 245px;
      flex-shrink: 0;
    }
  }

  @media (min-width: ${Media.laptop}) {
    padding: 0;
    width: 1180px;
    margin: 80px auto 140px auto;

    .main {
      margin-right: 100px;
    }

    .sidebar {
      width: 300px;
      flex-shrink: 0;
    }
  }
`;

interface Props {
  data: PostData[];
  stickyPostData: PostData;
  page: number;
  postsCount: number;
  pageType: PageType;
  basePath: string;
  postsPerPage: number;
}

const getSidebarMenu = (pageType: PageType): ((p: {}) => ReactElement) => {
  switch (pageType) {
    case 'main':
      return (p) => <CategoriesMenu {...p} />;
    case 'news':
      return (p) => <NewsAndEventsCategoriesMenu {...p} />;
    default:
      return null;
  }
};

const getContextSearch = (pageType: PageType): ((p: {}) => ReactElement) => {
  return (p) => <ContextSearch pageType={pageType} {...p} />;
};

export default function MainPageContainer({
  pageType,
  data,
  stickyPostData,
  page,
  postsCount,
  basePath,
  postsPerPage,
}: Props): ReactElement {
  return (
    <>
      {stickyPostData && (
        <Header
          basePath={basePath}
          post={stickyPostData}
          className="blog-main-page-header"
          pageType={pageType}
        />
      )}
      <Wrapper>
        <MainSection
          pageType={pageType}
          className="main"
          posts={data}
          pagination={
            <Pagination
              pageType={pageType}
              postsCount={postsCount}
              postsPerPage={postsPerPage}
              currentPage={page}
              basePath={basePath}
            />
          }
        />
        <Sidebar
          contextSearch={getContextSearch(pageType)}
          sidebarMenu={getSidebarMenu(pageType)}
          className="sidebar"
        />
      </Wrapper>
    </>
  );
}
