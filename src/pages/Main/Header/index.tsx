import React, { ReactElement, useContext, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { CSSTransition } from "react-transition-group";

import heroImgUrl from "assets/img/hero-img-1.jpg";
import Colors from "common/Colors";
import Category from "components/Category";
import Title from "components/Title";
import PostInfo from "components/PostInfo";
import PostExcerpt from "components/PostExcerpt";
import Button from "components/Button";
import Media from "common/Media";
import AppContext from "util/AppContext";
import { PostData, CardElementDataset, PageType } from "typings/app-types";
import { loaderMixin, loadingAnimation } from "util/mixins";
import { isReactSnap } from "util/helpers";
import { useImageOnLoad } from "hooks/usePageNumber";
import { useHistory } from "react-router-dom";

interface MainHeaderWrapperProps {
  imageUrl?: string;
  visible?: boolean;
}

const MainHeaderWrapper = styled.header<MainHeaderWrapperProps>`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 600ms;
  margin-top: 97px;
  padding: 60px 20px 60px 20px;
  min-height: 450px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(${({ imageUrl }) => imageUrl});

  @media (min-width: ${Media.tabletSm}) {
    margin: 97px 35px 0 35px;
    padding: 60px 140px 60px 40px;
  }

  @media (min-width: ${Media.tabletLg}) {
    margin: 97px 30px 0 30px;
    padding: 80px 180px 80px 60px;
  }

  @media (min-width: ${Media.laptop}) {
    max-width: 1180px;
    margin: 97px auto 0 auto;
    padding: 80px 350px 80px 80px;
  }
`;

const MainHeaderCategory = styled(Category)`
  margin-bottom: 80px;

  @media (min-width: ${Media.tabletLg}) {
    margin-bottom: 95px;
  }
`;

const MainPostInfo = styled(PostInfo)`
  margin-bottom: 7px;
`;

const MainPostTitle = styled(Title)`
  margin-bottom: 15px;
`;

const MainPostExcerpt = styled(PostExcerpt)`
  margin-bottom: 40px;
`;

declare const VI_BLOG_BASE_URL: string;
declare const VI_NEWS_BASE_URL: string;
declare const VI_BLOG_DEBUG_MODE: string;

interface Props {
  className?: string;
  post: PostData;
  basePath: string;
  pageType?: PageType;
}

export default function MainHeader({
  className,
  basePath,
  pageType,
  post: {
    categoryName,
    categorySlug,
    categoryColor,
    authorName,
    authorSlug,
    timeToRead,
    largeImage,
    date,
    title,
    excerpt,
    slug,
  },
}: Props): ReactElement {
  const visible = useImageOnLoad(largeImage);
  const history = useHistory();

  const categoryPath =
    pageType === "news"
      ? `/news-and-events-category/${categorySlug}`
      : `${basePath}/category/${categorySlug}`;
  const authorPath = `${VI_BLOG_BASE_URL}/user/${authorSlug}`;
  const postPath =
    pageType === "news" ? `${VI_NEWS_BASE_URL}/${slug}` : `${basePath}/${slug}`;
  const handleClick = (e: React.SyntheticEvent<EventTarget>) => {
    if (
      e.target instanceof HTMLHeadingElement ||
      e.target instanceof HTMLAnchorElement ||
      e.target instanceof HTMLImageElement
    ) {
      const { element } = e.target.dataset as CardElementDataset;

      if (VI_BLOG_DEBUG_MODE) {
        console.log("Clicked Card element: ", element);
      }
      e.preventDefault();
      switch (element) {
        case "button":
          e.preventDefault();
          return history.push(postPath);
        case "user":
          e.preventDefault();
          return history.push(authorPath);
        case "category":
          e.preventDefault();
          return history.push(categoryPath);
        default:
          return;
      }
    }
  };
  return (
    <MainHeaderWrapper visible={visible} imageUrl={largeImage}>
      <MainHeaderCategory
        data-element={"category"}
        href={categoryPath}
        color={categoryColor ? categoryColor : Colors.GreenDark}
        onClick={handleClick}
      >
        {categoryName}
      </MainHeaderCategory>

      {pageType !== "news" && (
        <MainPostInfo
          type="hero"
          author={authorName}
          authorLink={authorPath}
          onClick={handleClick}
          date={date}
          timeToRead={timeToRead}
        />
      )}

      <MainPostTitle type="hero title">{title}</MainPostTitle>
      <MainPostExcerpt type="hero">{excerpt}</MainPostExcerpt>

      <Button
        data-element="button"
        onClick={handleClick}
        href={postPath}
        type="primary"
      >
        Read More
      </Button>
    </MainHeaderWrapper>
  );
}
