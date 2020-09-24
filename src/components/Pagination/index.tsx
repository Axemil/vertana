import React, {
  ReactElement,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import styled from 'styled-components';
import Colors from 'common/Colors';
import Fonts from 'common/Fonts';
import PaginationLink from './PaginationItem';
import PaginationItem from './PaginationItem';
import AppContext from 'util/AppContext';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { RouteParams, GetPostsData, PageType } from 'typings/app-types';
import client from 'util/WPClient';
import { useSearchQuery } from 'hooks/useSearchQuery';
import { useQuery } from '@apollo/react-hooks';
import { MAIN_PAGE_QUERY } from 'pages/Main';
import { gql } from 'apollo-boost';
import { log } from 'util/helpers';
import { usePageNumber } from 'hooks/usePageNumber';

declare let VI_BLOG_BASE_URL: string;
declare const VI_NEWS_BASE_URL: string;

const Wrapper = styled.ul`
  margin: 0;
  list-style: none;
  display: inline-block;
  border-radius: 999px;
  background-color: ${Colors.Gray200};
  padding: 5px 5px 5px 5px;

  & .pagination-prev-btn {
    margin-left: 20px;
  }
  & .pagination-next-btn {
    margin-right: 20px;
  }

  .not-active {
  }

  .active {
    background-color: ${Colors.GreenMedium};
    color: ${Colors.White};
  }
`;

const postsPerPage = 8;

const ALL_POSTS_QUERY = gql`
  query allPostsQuery {
    posts(first: 999) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

const ALL_POSTS_IN_CATEGORY = gql`
  query postsInCategory($categoryName: String, $first: Int) {
    posts(where: { categoryName: $categoryName }, first: $first) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
interface AllPostsData {
  posts: {
    edges: PostIDData[];
  };
}

interface PostIDData {
  node: {
    id: string;
  };
}

const initFirstPage = (
  currentPage: number,
  lastPage: number,
  numbersRangeSize: number
) => {
  let newFirstPage =
    currentPage > lastPage - numbersRangeSize + 1
      ? lastPage - numbersRangeSize + 1
      : currentPage;
  newFirstPage = newFirstPage < 1 ? 1 : newFirstPage;
  return newFirstPage;
};

interface Props {
  className?: string;
  pageType: PageType;
  slug?: string;
  postsCount: number;
  postsPerPage: number;
  currentPage: number;
  basePath?: string;
}

export default function Pagination({
  className,
  pageType,
  slug,
  postsCount,
  postsPerPage,
  currentPage,
  basePath,
}: Props): ReactElement {
  const [firstPage, setFirstPage] = useState(1);

  const paginationLinksCount = 4;
  const history = useHistory();

  if (postsCount <= postsPerPage) {
    return null;
  }

  let lastPage: number;

  lastPage = Math.ceil(postsCount / postsPerPage);

  const numbersRangeSize =
    paginationLinksCount > lastPage ? lastPage : paginationLinksCount;

  let middlePage = firstPage + paginationLinksCount - 1;
  middlePage = middlePage > lastPage ? lastPage : middlePage;

  let numbersRange = new Array(numbersRangeSize)
    .fill(0)
    .map((_, i) => firstPage + i);

  /**
   * Event handlers
   */
  const handleNextClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    history.push(getPageLink(currentPage+1))
    
    let nextFirstPage: number;

    if (middlePage + numbersRangeSize - 1 > lastPage) {
      nextFirstPage = lastPage - numbersRangeSize + 1;
    } else {
      nextFirstPage = middlePage;
    }
    setFirstPage(nextFirstPage);
  };

  const handlePrevClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    history.push(getPageLink(currentPage > 1 ? currentPage-1 : 1));
    console.log("MIDDLE PAGE PREV",middlePage);

    let nextFirstPage: number;

    if (firstPage - numbersRangeSize + 1 < 1) {
      nextFirstPage = 1;
    } else {
      nextFirstPage = firstPage - numbersRangeSize + 1;
    }
    setFirstPage(nextFirstPage);
  };

  const getPageLink = (pageNumber: number): string => {
    switch (pageType) {
      case 'main':
        return `${VI_BLOG_BASE_URL}/page/${pageNumber}`;
      case 'category':
        return `${VI_BLOG_BASE_URL}/category/${slug}/${pageNumber}`;
      case 'user':
        return `${VI_BLOG_BASE_URL}/user/${slug}/${pageNumber}`;
      case 'search':
        return `${VI_BLOG_BASE_URL}/search?q=${slug}&p=${pageNumber}`;
      case 'news':
        return `${basePath}/page/${pageNumber}`;
      default:
        return `${VI_BLOG_BASE_URL}/${pageNumber}`;
    }
  };

  const handleFirstItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    history.push(getPageLink(1));
    setFirstPage(1);
  };

  const handleLastItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    history.push(getPageLink(lastPage));
    setFirstPage(lastPage - numbersRangeSize + 1);
  };

  const handleClick = (
    pageNumber: number,
    e: React.MouseEvent<HTMLLIElement>
  ) => {
    e.preventDefault();
    history.push(getPageLink(pageNumber));
  };

  const isItemActive = (itemNumber: number): boolean =>
    currentPage === itemNumber;

  console.log('FIRST PAGE: ',firstPage)
  return (
    <Wrapper className={className}>
      {currentPage > 1 && (
        <PaginationItem
          className="pagination-prev-btn"
          onClick={handlePrevClick}
          to=""
        >
          prev
        </PaginationItem>
      )}
      {firstPage > 1 && (
        <>
          <PaginationItem
            isActive={isItemActive(1)}
            onClick={handleFirstItemClick}
            to={getPageLink(1)}
          >
            1
          </PaginationItem>
          {firstPage > 2 && <PaginationItem to="">...</PaginationItem>}
        </>
      )}
      {numbersRange.map((pageNumber: number, key: number) => (
        <PaginationItem
          key={key}
          isActive={isItemActive(pageNumber)}
          onClick={handleClick.bind(null, pageNumber)}
          to={getPageLink(pageNumber)}
        >
          {pageNumber}
        </PaginationItem>
      ))}
      {middlePage < lastPage && (
        <>
          <PaginationItem to="#">...</PaginationItem>
          <PaginationItem
            isActive={isItemActive(lastPage)}
            onClick={handleLastItemClick}
            to=""
          >
            {lastPage}
          </PaginationItem>
        </>
      )}
      {currentPage !== lastPage && (
        <PaginationItem
          className="pagination-next-btn"
          onClick={handleNextClick}
          to=""
        >
          next
        </PaginationItem>
      )}
    </Wrapper>
  );
}
