import React, { ReactElement, useState } from 'react';
import StyledInput from 'components/StyledInput';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Fonts from 'common/Fonts';
import Colors from 'common/Colors';
import SiteLink from 'components/SiteLink';
import DetectClickOutside from 'components/DetectClickOutside';
import { formatDate } from 'util/helpers';
import { PageType } from 'typings/app-types';
import { useHistory } from "react-router-dom";

declare const VI_BLOG_BASE_URL: string;

const SearchListWrapper = styled.div`
  position: relative;
`;

const SearchList = styled.ul`
  position: absolute;
  display: block;
  margin: 0;
  margin-top: 10px;
  padding: 0;
  background: #ffffff;
  box-shadow: 0px 6px 24px rgba(15, 25, 80, 0.1);
`;

const SearchListItem = styled.li`
  margin: 0;
  padding: 20px;
  list-style: none;
  border-bottom: 1px solid ${Colors.Gray200};
`;

const SearchListTitle = styled.div`
  text-decoration: none;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  font-family: ${Fonts.Bold};
  cursore: pointer;

  &:hover {
    color: ${Colors.GreenDark};
  }
`;

const SearchListInfo = styled.p`
  margin: 0 !important;
  padding: 0 !important;
  margin-top: 10px !important;
  color: ${Colors.Gray700};
`;

const SearchListAuthor = styled.div`
  font-size: 16px;
  font-family: ${Fonts.Bold};
  color: ${Colors.Black};
  margin-left: 10px;
  cursor: pointer;
  display: inline;

  &:hover {
    color: ${Colors.GreenDark};
  }
`;

const SearchListDate = styled.span`
  font-size: 14px;
  font-family: ${Fonts.Regular};
  color: ${Colors.Gray700};
  margin-left: 10px;
`;

interface Props {
  className?: string;
  pageType: PageType;
}

interface ContextSearchQueryNormalizedData {
  postTitle: string;
  postSlug: string;
  postDate: string;
  authorName: string;
  authorSlug: string;
}

const CONTEXT_SEARCH_POSTS_QUERY = gql`
  query searchPosts($search: String) {
    posts(where: { search: $search }, first: 999) {
      edges {
        node {
          title
          slug
          date
          author {
            name
            slug
          }
        }
      }
    }
  }
`;

const CONTEXT_SEARCH_NEWS_QUERY = gql`
  query searchNewsAndEvents($search: String) {
    newsAndEvents(where: { search: $search }, first: 999) {
      edges {
        node {
          title
          slug
          date
          author {
            name
            slug
          }
        }
      }
    }
  }
`;

interface ContextSearchQueryRawData {
  node: {
    title: string;
    slug: string;
    date: string;
    author: {
      name: string;
      slug: string;
    };
  };
}

interface ContextSearchPostsQueryRawData {
  posts: {
    edges: ContextSearchQueryRawData[];
  };
}

interface ContextSearchNewsQueryRawData {
  newsAndEvents: {
    edges: ContextSearchQueryRawData[];
  };
}

const getSearcQueryNormalizedData = (
  data: ContextSearchQueryRawData[]
): ContextSearchQueryNormalizedData[] => {
  if (!data || data.length === 0) return null;
  return data.map(
    ({
      node: {
        title: postTitle,
        slug: postSlug,
        date: postDate,
        author: { name: authorName, slug: authorSlug },
      },
    }) => ({
      postTitle,
      postDate: formatDate(postDate),
      postSlug,
      authorName,
      authorSlug,
    })
  );
};

export default function ContextSearch({
  className,
  pageType,
}: Props): ReactElement {
  let history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: postsData } = useQuery<ContextSearchPostsQueryRawData>(
    CONTEXT_SEARCH_POSTS_QUERY,
    {
      variables: {
        search: searchTerm,
      },
      skip: searchTerm.length === 1 || searchTerm === '' || pageType === 'news',
    }
  );

  const { data: newsData } = useQuery<ContextSearchNewsQueryRawData>(
    CONTEXT_SEARCH_NEWS_QUERY,
    {
      variables: {
        search: searchTerm,
      },
      skip: searchTerm.length === 1 || searchTerm === '' || pageType === 'post',
    }
  );

  const qureyRawData = postsData
    ? postsData.posts.edges
    : newsData
    ? newsData.newsAndEvents.edges
    : null;

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    setSearchTerm(e.currentTarget.value);
  };

  const linkHandle = (data: string) => history.push(data);

  return (
    <SearchListWrapper className={className}>
      <StyledInput
        onChange={handleChange}
        value={searchTerm}
        placeholder="Search by keyword"
        type="search"
      />
      {qureyRawData && qureyRawData.length > 0 && (
        <DetectClickOutside>
          {(clickedOutside) => {
            if (clickedOutside) {
              setSearchTerm('');
            }
            return (
              <SearchList>
                {getSearcQueryNormalizedData(qureyRawData)
                  .slice(0, 5)
                  .map(
                    ({
                      postTitle,
                      postSlug,
                      authorName,
                      authorSlug,
                      postDate,
                    }) => (
                      <SearchListItem>
                        <SearchListTitle
                          onClick={() => linkHandle(`${VI_BLOG_BASE_URL}/${postSlug}`)}
                          // href={`${VI_BLOG_BASE_URL}/${postSlug}`}
                        >
                          {postTitle}
                        </SearchListTitle>
                        <SearchListInfo>
                          by
                          <SearchListAuthor
                            onClick={() => linkHandle(`${VI_BLOG_BASE_URL}/user/${authorSlug}`)}
                            // href={`${VI_BLOG_BASE_URL}/user/${authorSlug}`}
                          >
                            {authorName}
                          </SearchListAuthor>
                          <SearchListDate>{postDate}</SearchListDate>
                        </SearchListInfo>
                      </SearchListItem>
                    )
                  )}
                <SearchListItem>
                  <SiteLink url={`/search?q=${searchTerm}&t=${pageType}/`}>
                    Show all results
                  </SiteLink>
                </SearchListItem>
              </SearchList>
            );
          }}
        </DetectClickOutside>
      )}
    </SearchListWrapper>
  );
}
