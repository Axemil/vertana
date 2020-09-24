import React, { ReactElement } from 'react';
import { useSearchQuery } from 'hooks/useSearchQuery';
import { log, slicePostsForPage } from 'util/helpers';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import NoData from 'components/NoData';
import LoadingData from 'components/LoadingData';
import items from 'app/Footer/data';
import { GetPostData, NewsInCategoryData } from 'typings/app-types';
import { getPostData, getNewsData } from 'util/gql-selectors';
import ArchivesContainer from 'app/ArchiveContainer';
import Pagination from 'components/Pagination';
import { POST_DATA_FRAGMENT } from 'gql/postDataFragment';
import CategoryHeader from 'pages/Archives/CategoryHeader';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const POSTS_PER_SEARCH_PAGE = 8;

const StyledCategoryHeader = styled(CategoryHeader)`
  margin-top: 100px;
`;

export const POSTS_IN_NEWS_CATEGORY = gql`
  query PostsInNewsAndEventsCategory($id: ID!) {
    newsAndEventsCategory(id: $id, idType: SLUG) {
      count
      name
      description
      newsAndEvents(first: 999) {
        edges {
          node {
            ...newsData
          }
        }
      }
    }
  }
  fragment newsData on NewsAndEvent {
    id
    title
    excerpt
    slug
    timeToRead
    date
    author {
      name
      slug
    }
    newsAndEventsCategories(first: 1) {
      edges {
        node {
          name
          slug
        }
      }
    }
    featuredImage {
      mediaDetails {
        sizes {
          sourceUrl
          name
        }
      }
    }
  }
`;

interface Props {}

export default function ArchivesNewsAndEvents({}: Props): ReactElement {
  const { slug } = useParams();

  const { error, loading, data } = useQuery<NewsInCategoryData>(
    POSTS_IN_NEWS_CATEGORY,
    {
      variables: {
        id: slug,
      },
    }
  );

  if (error) return null;
  if (loading) return null;
  if (
    !data ||
    !data.newsAndEventsCategory ||
    data.newsAndEventsCategory.newsAndEvents.edges.length === 0
  )
    return <NoData items="posts" />;

  const normalizedPageData = getNewsData(
    data.newsAndEventsCategory.newsAndEvents.edges
  );

  const { count, name, description } = data.newsAndEventsCategory;

  return (
    <ArchivesContainer
      type="news"
      header={
        <StyledCategoryHeader
          name={name || ''}
          count={count || ''}
          description={description || ''}
        />
      }
      posts={normalizedPageData}
      columns={2}
      pagination={
        normalizedPageData &&
        normalizedPageData.length > POSTS_PER_SEARCH_PAGE && (
          <Pagination
            pageType="search"
            postsPerPage={POSTS_PER_SEARCH_PAGE}
            postsCount={data.newsAndEventsCategory.newsAndEvents.edges.length}
            slug={slug}
            currentPage={1}
          />
        )
      }
    />
  );
}
