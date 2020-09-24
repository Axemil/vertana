import React, { ReactElement } from 'react';
import Header from 'pages/Main/Header';
import MainSection from './MainSection';
import styled from 'styled-components';
import Sidebar from 'app/Sidebar';
import Media from 'common/Media';
import { useParams } from 'react-router-dom';
import { GetPostsData } from 'typings/app-types';
import { categoriesColorsDataToHash } from 'util/gql-selectors';
import { gql } from 'apollo-boost';
import { slicePostsForPage, log } from 'util/helpers';
import ScrollToTop from 'components/ScrollToTop';
import LoadingData from 'components/LoadingData';
import { useQuery } from '@apollo/react-hooks';
import { getPostData } from 'util/gql-selectors';
import Pagination from 'components/Pagination';
import { AllCategoriesData } from 'app/CategoriesMenu';
import { usePageNumber } from 'hooks/usePageNumber';
import { POST_DATA_FRAGMENT } from 'gql/postDataFragment';
import MainPageContainer from 'containers/MainPageContainer';

declare const VI_BLOG_BASE_URL: string;

export const MAIN_PAGE_QUERY = gql`
  query mainPageQuery {
    stickyPosts: posts(where: { onlySticky: true }) {
      edges {
        node {
          ...postData
        }
      }
    }
    posts(first: 999) {
      edges {
        node {
          ...postData
        }
      }
    }
  }

  ${POST_DATA_FRAGMENT}
`;

export const GET_ALL_CATEGORIES = gql`
  query allCategories {
    categories {
      edges {
        node {
          slug
          categoryMeta {
            categoryColor
          }
        }
      }
    }
  }
`;

interface Props {}

export default function Main({}: Props): ReactElement {
  //Get All posts
  const {
    loading: loadingPosts,
    error: errorPosts,
    data: dataPosts,
  } = useQuery<GetPostsData>(MAIN_PAGE_QUERY);

  //When posts loaded, get category colors
  const { data: dataCategories } = useQuery<AllCategoriesData>(
    GET_ALL_CATEGORIES,
    { skip: !dataPosts }
  );

  if (loadingPosts) return <LoadingData items="posts" />;
  if (errorPosts) return <h2>Error</h2>;

  //Get sticky and regular posts data from GraphQL response
  const {
    stickyPosts: { edges: stickyPosts },
    posts: { edges: posts },
  } = dataPosts;

  const page = usePageNumber();

  //Slice a piece fo data for one page from page data
  const pageData = slicePostsForPage(posts, page, 8);

  //Normalize data
  let normalizedPageData = getPostData(pageData);

  //Normalize sticky post data
  let normalizedStickyPostData = getPostData(stickyPosts)[0];

  //If categories data available add them to the posts data
  if (dataCategories && dataCategories.categories.edges.length > 0) {
    const categoriesColors = categoriesColorsDataToHash(dataCategories);

    normalizedPageData.forEach(
      (data) => (data.categoryColor = categoriesColors[data.categorySlug])
    );

    if (normalizedStickyPostData) {
      normalizedStickyPostData.categoryColor =
        categoriesColors[normalizedStickyPostData?.categorySlug];
    }
  }

  return (
    <MainPageContainer
      pageType="main"
      stickyPostData={normalizedStickyPostData}
      data={normalizedPageData}
      page={page}
      postsCount={posts.length}
      basePath={VI_BLOG_BASE_URL}
      postsPerPage={8}
    />
  );
}
