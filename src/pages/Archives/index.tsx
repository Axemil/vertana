import React, { ReactElement, useEffect, useContext } from 'react';
import MainSection from 'pages/Main/MainSection';
import styled from 'styled-components';
import Sidebar from 'app/Sidebar';
import Media from 'common/Media';
import CategoryHeader from 'pages/Archives/CategoryHeader';
import { useLocation, useParams } from 'react-router-dom';
import { currentCategory, slicePostsForPage, log } from 'util/helpers';
import LoadingData from 'components/LoadingData';
import { gql, DocumentNode } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { GetPostsData, GetPostData, PageType } from 'typings/app-types';
import { getPostData, categoriesColorsDataToHash } from 'util/gql-selectors';
import Pagination from 'components/Pagination';
import { usePageNumber } from 'hooks/usePageNumber';
import CategoriesMenu, { AllCategoriesData } from 'app/CategoriesMenu';
import NoData from 'components/NoData';
import UserHeader from 'components/UserHeader';
import { useSearchQuery } from 'hooks/useSearchQuery';
import { POST_DATA_FRAGMENT } from 'gql/postDataFragment';
import ContextSearch from 'app/Sidebar/ContextSearch';

declare const VI_BLOG_DEBUG_MODE: string;

const StyledCategoryHeader = styled(CategoryHeader)`
  margin-top: 100px;
`;

const StyledUserHeader = styled(UserHeader)`
  margin-top: 100px;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  padding: 0 20px;
  margin: 60px 0 60px 0;

  @media (min-width: ${Media.tabletLg}) {
    display: flex;
    padding: 0 30px;
    box-sizing: border-box;

    .sidebar {
      width: 245px;
      flex-shrink: 0;
      margin-left: 80px;
    }
  }

  @media (min-width: ${Media.laptop}) {
    padding: 0;
    margin: 60px auto;

    .sidebar {
      width: 300px;
      flex-shrink: 0;
      margin-left: 100px;
    }
  }
`;

export const POSTS_IN_CATEGORY = gql`
  query postsInCategory(
    $categoryName: String
    $first: Int
    $categorySlug: ID!
  ) {
    posts(where: { categoryName: $categoryName }, first: $first) {
      edges {
        node {
          ...postData
        }
      }
    }
    category(id: $categorySlug, idType: SLUG) {
      name
      count
      description
    }
  }
  ${POST_DATA_FRAGMENT}
`;

const POSTS_OF_USER = gql`
  query postsOfUser($authorName: String, $authorId: ID!, $first: Int) {
    posts(first: $first, where: { authorName: $authorName }) {
      edges {
        node {
          ...postData
        }
      }
    }
    user(id: $authorId, idType: SLUG) {
      name
      slug
      twitter
      linkedin
      facebook
      additionalInfo {
        city
        detailedDescription
        shortDescription
        favouriteTopics {
          name
        }
      }
      avatar {
        url
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

export interface ArchiveQueryData {
  posts: {
    edges: GetPostData[];
  };
  category?: CategoryDescription;
  user?: UserDescription;
}

export interface PostsInCategoryVars {
  categoryName: string;
  first: number;
  categorySlug: string;
}

export interface CategoryDescription {
  count: string;
  description: string;
  name: string;
  slug?: string;
}

export interface UserDescription {
  name: string;
  slug: string;
  twitter: string;
  linkedin: string;
  facebook: string;
  additionalInfo: {
    city: string;
    fieldGroupName: string;
    detailedDescription: string;
    shortDescription: string;
    favouriteTopics: {
      name: string;
    }[];
  };
  avatar: {
    url: string;
  };
  posts: [];
}

export type ArchiveType = 'category' | 'user' | 'search';

interface Props {
  type: ArchiveType;
}

export default function Archives({ type }: Props): ReactElement {
  //Get category slug from URL
  const { slug } = useParams();

  let query: DocumentNode | null = null;
  let queryConfig: {} | null = null;
  let postsPerPage: number;

  switch (type) {
    case 'category':
      query = POSTS_IN_CATEGORY;
      queryConfig = {
        variables: { categoryName: slug, first: 999, categorySlug: slug },
      };
      postsPerPage = 8;
      break;
    case 'user':
      query = POSTS_OF_USER;
      queryConfig = {
        variables: { authorName: slug, first: 999, authorId: slug },
      };
      postsPerPage = 12;
    default:
  }

  const {
    loading: loadingPosts,
    error: errorPosts,
    data: dataPosts,
  } = useQuery<ArchiveQueryData>(query, queryConfig);

  //When posts are loaded, get category colors
  const { data: dataCategories } = useQuery<AllCategoriesData>(
    GET_ALL_CATEGORIES,
    { skip: !dataPosts }
  );

  console.log('Posts data: ', dataPosts);

  if (loadingPosts) return <LoadingData items="posts" />;
  if (errorPosts) return <h2>Error</h2>;
  if (!dataPosts) return <NoData items="posts" />;
  if (dataPosts.posts.edges.length === 0) return <NoData items="posts" />;

  const page = usePageNumber();

  const {
    posts: { edges: posts },
    category,
    user,
  } = dataPosts;

  //Slice a piece fo data for one page from page data
  let pageData = slicePostsForPage(posts, page, postsPerPage);

  //Normalize data
  const normalizedPageData = getPostData(pageData);
  //if posts are in multiple categories set category name to current category
  if (type === 'category') {
    normalizedPageData.forEach((data) => (data.categoryName = category.name));
  }

  //If categories data available add them to the posts data
  if (dataCategories && dataCategories.categories.edges.length > 0) {
    const categoriesColors = categoriesColorsDataToHash(dataCategories);

    normalizedPageData.forEach(
      (data) => (data.categoryColor = categoriesColors[data.categorySlug])
    );
  }

  if (VI_BLOG_DEBUG_MODE) {
    console.log(normalizedPageData);
  }

  /**
   *
   * Visulal setup for the categories or autor or search
   *
   */

  let header: ReactElement | null = null;
  let columns: number;
  let pagination: ReactElement | null = null;

  switch (type) {
    case 'category':
      header = <StyledCategoryHeader {...category} />;
      columns = 2;
      pagination = (
        <Pagination
          pageType="category"
          slug={slug}
          postsCount={posts.length - 1}
          postsPerPage={8}
          currentPage={page}
        />
      );
      break;
    case 'user':
      let authorPosts = {
        posts: [unique(normalizedPageData.map((item) => item.categoryName))]
      }
      function unique(arr : any) {
        const array = arr;

        const maxOccurences = array => Array.from(
        array.reduce(
          (map, value) => map.set(
            value,
            map.has(value)
            ? map.get(value) + 1
            : 1
          ),
        new Map()
        ).entries()
      ).reduce(
        (max, entry) => entry[1] > max[1] ? entry : max
      ).reduce(
        (item, count) => ({ item, count })
      )

      const resultArr = [];
        
      resultArr[0] = maxOccurences(array).item;

      var index = array.indexOf(resultArr[0]);
      if (index > -1) {
        array.splice(index, 1);
      }

      resultArr[1] = maxOccurences(array).item;

      console.log("TEST: ",resultArr)

        let result = [];
        for (let str of arr) {
          if (!result.includes(str)) {
            result.push(str);
          }
        }
        return result;
      }
      Object.assign(user, authorPosts);
      header = <StyledUserHeader data={user} />;
      columns = 3;
      pagination = (
        <Pagination
          pageType="user"
          slug={slug}
          postsCount={posts.length - 1}
          postsPerPage={12}
          currentPage={page}
        />
      );
      break;
    default:
      header = <StyledCategoryHeader {...category} />;
      columns = 2;
      pagination = (
        <Pagination
          pageType="news category"
          slug={slug}
          postsCount={posts.length - 1}
          postsPerPage={8}
          currentPage={page}
        />
      );
  }

  const getContextSearch = (pageType: PageType): ((p: {}) => ReactElement) => {
    return (p) => <ContextSearch pageType={pageType} {...p} />;
  };

  return (
    <>
      {header}
      <Wrapper>
        <MainSection
          posts={normalizedPageData}
          className="main"
          pagination={pagination}
          columns={columns}
          pageType={type}
        />
        {type === 'category' && (
          <Sidebar
            contextSearch={getContextSearch('category')}
            sidebarMenu={(p) => <CategoriesMenu {...p} />}
            className="sidebar"
          />
        )}
      </Wrapper>
    </>
  );
}
