import React, { ReactElement, useContext, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import PageProgress from 'react-page-progress';
import HeaderNewsAndEvents from 'pages/PostNewsAndEvents/HeaderNewsAndEvents';
import Header from 'pages/Post/Header';
import MainSection from 'pages/Post/MainSection';
import Colors from 'common/Colors';
import Share from 'components/Share';
import Fonts from 'common/Fonts';
import Signup from 'components/Signup';
import tocData from 'components/TableOfContent/data';
import Media from 'common/Media';
import Aside from 'pages/Post/Aside';
import { PageType } from 'typings/app-types';
import Author from 'components/Author';
import { CategoryData } from 'app/CategoriesMenu';
import { getFirstCategorySlug, getHeroImage } from 'util/gql-selectors';
import { formatDate } from 'util/helpers';
import Recommended from 'pages/Post/Recommended';
import { FeaturedImageData } from 'pages/Post';
import RecommendedNews from 'pages/PostNewsAndEvents/RecommendedNews';
import Category from 'components/Category';

const Wrapper = styled.div`
  & .post-header {
    margin-top: 67px;

    @media (min-width: ${Media.tabletLg}) {
      margin-top: 97px;
    }
  }

  .main-aside-container {
    @media (min-width: ${Media.tabletLg}) {
      display: flex;
    }
    @media (min-width: ${Media.laptop}) {
      width: 1230px;
      padding: 0 0 0 25px;
      margin: 0 auto;
    }

    .post-share {
      margin-top: 78px;
    }

    .post-aside {
      display: none;

      @media (min-width: ${Media.tabletLg}) {
        display: block;
        flex-shrink: 0;
      }
    }
  }

  .share-main-container {
    @media (min-width: ${Media.laptop}) {
      display: flex;
    }
  }

  .shares {
    display: flex;
    align-items: center;

    .shares-count {
      font-family: ${Fonts.Bold};
      font-size: 16px;
    }

    .share-buttons {
      margin-left: auto;
    }
  }

  .signup {
    margin: 0 20px 80px 20px;

    @media (min-width: ${Media.mobile}) {
      margin: 0 35px 80px 35px;
    }

    @media (min-width: ${Media.tabletLg}) {
      margin: 0 0 115px 30px;
    }

    @media (min-width: ${Media.laptop}) {
      margin-left: 0;
    }
  }
`;

interface Props {
  postUrl: string;
  slug?: string;
  title: string;
  authorName: string;
  authorSlug?: string;
  timeToRead: string;
  date: string;
  featuredImage: FeaturedImageData;
  content: string;
  shortDescription: string;
  avatar: string;
  categories: CategoryData[];
  pageType: PageType;
}

export default function PostContainer({
  postUrl,
  title,
  authorName,
  authorSlug,
  timeToRead,
  date,
  featuredImage,
  content,
  shortDescription,
  avatar,
  categories,
  pageType,
}: Props): ReactElement {
  const imageUrl = getHeroImage(featuredImage);
  // const imageUrl = featuredImage
  //   ? featuredImage?.mediaDetails?.sizes?.filter(
  //       (data) => data.name === 'large'
  //     )[0]?.sourceUrl
  //   : '';

  const formattedDate = date ? formatDate(date) : '';

  let recommended: ReactElement;
  switch (pageType) {
    case 'post':
      recommended = (
        <Recommended
          pageType={pageType}
          currentCategory={getFirstCategorySlug(categories)}
        />
      );
      break;
    case 'news post':
      recommended = (
        <RecommendedNews
          pageType={pageType}
          currentCategory={getFirstCategorySlug(categories)}
        />
      );
      break;
    default:
      recommended = null;
  }

  let header;
  if (pageType === 'news post') {
    const {
      name: categoryName,
      slug: categorySlug,
      categoryMeta: { categoryColor },
    } = categories[0]?.node;
    header = (
      <HeaderNewsAndEvents
        className="post-header"
        title={title}
        authorName={authorName}
        timeToRead={timeToRead}
        date={formattedDate}
        categoryColor={categoryColor}
        categorySlug={categorySlug}
        categoryName={categoryName}
        imageUrl={imageUrl}
      />
    );
  } else {
    header = (
      <Header
        className="post-header"
        title={title}
        authorName={authorName}
        authorSlug={authorSlug}
        timeToRead={timeToRead}
        date={formattedDate}
        imageUrl={imageUrl}
      />
    );
  }

  return (
    <>
      <Wrapper>
        <PageProgress color={'#389E38'} heigth={3}/>
        {header}
        <div className="main-aside-container">
          <div className="main-signup-container">
            <div className="share-main-container">
              <Share
                url={postUrl}
                className="post-share"
                orientation="vertical"
              />
              <MainSection
                className="post-main"
                content={content}
                author={
                  <Author
                    name={authorName}
                    shortDescription={shortDescription}
                    avatar={avatar}
                  />
                }
                postUrl={postUrl}
              />
            </div>
            <Signup className="signup" />
          </div>
          <Aside data={tocData} className="post-aside" />
        </div>
        {recommended}
      </Wrapper>
    </>
  );
}
