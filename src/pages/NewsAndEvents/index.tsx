import React, { ReactElement } from 'react';
import MainPageContainer from 'containers/MainPageContainer';
import gql from 'graphql-tag';
import { POST_DATA_FRAGMENT } from 'gql/postDataFragment';
import { useQuery } from '@apollo/react-hooks';
import LoadingData from 'components/LoadingData';
import NoData from 'components/NoData';
import { log, slicePostsForPage, stripTags, formatDate } from 'util/helpers';
import { NEWS_AND_EVENTS_DATA_FRAGMENT } from 'gql/newsAndEventsDataFragment';
import {
  PostData,
  AllNewsAndEventsCategoriesColors,
  ImageSize,
  FeaturedImage,
} from 'typings/app-types';
import {
  getPostData,
  categoriesColorsDataToHash,
  newsAndEventsColorsDataToHash,
  getCardThumbnail,
} from 'util/gql-selectors';
import { AllCategoriesData } from 'app/CategoriesMenu';
import { usePageNumber } from 'hooks/usePageNumber';
import { GET_ALL_NEWS_AND_EVENTS_CATEGORIES_COLORS } from 'gql/getAllNewsAndEventsCategoriesColors';

declare const VI_NEWS_BASE_URL: string;

const NEWS_AND_EVENTS_QUERY = gql`
  query newsAndEventsData {
    newsAndEvents(first: 999) {
      edges {
        node {
          ...newsAndEventsDataFragment
        }
      }
    }
  }
  ${NEWS_AND_EVENTS_DATA_FRAGMENT}
`;

export interface AllNewsAndEventsRawData {
  newsAndEvents: {
    edges: NewsAndEventsRawData[];
  };
}

export interface NewsAndEventsRawData {
  node: {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    timeToRead: string;
    date: string;
    author: {
      name: string;
      slug: string;
    };
    newsAndEventsCategories: {
      edges: {
        node: {
          name: ImageSize;
          slug: string;
        };
      }[];
    };
    featuredImage: FeaturedImage;
  };
}

const getNewsAndEventsNormalizedData = (
  data: NewsAndEventsRawData[]
): PostData[] => {
  return data.map(
    ({
      node: {
        title,
        slug,
        timeToRead,
        excerpt,
        date,
        author: { name: authorName, slug: authorSlug },
        newsAndEventsCategories: { edges: newsCatsArr },
        featuredImage,
      },
    }) => ({
      title: stripTags(title),
      excerpt: stripTags(excerpt).slice(0, 120).concat(' ...'),
      slug,
      timeToRead,
      date: formatDate(date),
      authorName,
      authorSlug,
      categoryName:
        newsCatsArr && newsCatsArr.length > 0 && newsCatsArr[0].node.name,
      categorySlug:
        newsCatsArr && newsCatsArr.length > 0 && newsCatsArr[0].node.slug,
      categoryColor: undefined,
      thumbnail: (featuredImage && getCardThumbnail(featuredImage)) || '',

      // featuredImage?.mediaDetails?.sizes.filter(
      //   ({ name }) => name === 'medium'
      // )[0]?.sourceUrl,
      largeImage: featuredImage?.mediaDetails?.sizes.filter(
        ({ name }) => name === 'large'
      )[0]?.sourceUrl,
    })
  );
};

interface Props {
  baseUrl: string;
}

export default function NewsAndEvents({ baseUrl }: Props): ReactElement {
  const {
    error: newsError,
    loading: newsLoading,
    data: newsQueryData,
  } = useQuery<AllNewsAndEventsRawData>(NEWS_AND_EVENTS_QUERY);

  const {
    error: catColorsError,
    loading: catColorsLoading,
    data: catColorsRawData,
  } = useQuery<AllNewsAndEventsCategoriesColors>(
    GET_ALL_NEWS_AND_EVENTS_CATEGORIES_COLORS,
    {
      skip: !newsQueryData,
    }
  );
  if (newsError) return null;
  if (newsLoading) return <LoadingData items="posts" />;
  if (!newsQueryData || newsQueryData.newsAndEvents.edges.length === 0)
    return <NoData items="posts" />;

  const page = usePageNumber();

  let {
    newsAndEvents: { edges: newsRawData },
  } = newsQueryData;

  let stickyPostData;

  if (page === 1) {
    const stickyPostRawData = [newsRawData[0]];
    stickyPostData = getNewsAndEventsNormalizedData(stickyPostRawData)[0];

    newsRawData = [...newsRawData.slice(1)];
  }

  const pageRawData = slicePostsForPage(newsRawData, page, 8);
  let pageNormalizedData = getNewsAndEventsNormalizedData(pageRawData);

  if (catColorsRawData) {
    const categoriesColors = newsAndEventsColorsDataToHash(catColorsRawData);

    pageNormalizedData.forEach(
      (data) => (data.categoryColor = categoriesColors[data.categorySlug])
    );

    if (page === 1) {
      stickyPostData.categoryColor =
        categoriesColors[stickyPostData.categorySlug];
    }
  }
  return (
    <MainPageContainer
      pageType="news"
      stickyPostData={stickyPostData}
      data={pageNormalizedData}
      page={page}
      postsCount={newsRawData.length}
      basePath={baseUrl}
      postsPerPage={8}
    />
  );
}
