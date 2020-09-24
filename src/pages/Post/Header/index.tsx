import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Media from 'common/Media';

import heroImage from 'assets/img/res/post-thumbnail-8.jpg';
import Title from 'components/Title';
import PostInfo from 'components/PostInfo';
import { PostResponseData, ImageSize } from '..';

declare const VI_BLOG_BASE_URL: string;

interface HeaderWrapperProps {
  featImage: string;
}

const HeaderWrapper = styled.header<HeaderWrapperProps>`
  min-height: 432px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${({ featImage }) => featImage});
  background-blend-mode: normal;
  background-size: cover;
  background-position: center;
  padding: 100px 20px 60px 20px;

  @media (min-width: ${Media.tabletSm}) {
    min-height: 352px;
    padding: 100px 35px 60px 35px;
  }

  @media (min-width: ${Media.tabletLg}) {
    min-height: 500px;
    padding: 160px 30px 70px 30px;
  }

  .container {
    @media (min-width: ${Media.tabletSm}) {
      max-width: 75%;
    }
    @media (min-width: ${Media.tabletLg}) {
      max-width: 88%;
    }
    @media (min-width: ${Media.laptop}) {
      width: 1180px;
      margin: 0 auto;
    }

    .title {
      margin-bottom: 50px;

      @media (min-width: ${Media.laptop}) {
        width: 75%;
      }
    }
  }
`;

interface Props {
  className?: string;
  imageUrl: string;
  title: string;
  authorName: string;
  authorSlug: string;
  date: string;
  timeToRead: string;
}

export default function Header({
  className,
  imageUrl,
  title,
  authorName,
  authorSlug,
  date,
  timeToRead,
}: Props): ReactElement {
  return (
    <HeaderWrapper featImage={imageUrl} className={className}>
      <div className="container">
        <Title className="title" type="post title">
          {title}
        </Title>
        <PostInfo
          className="info"
          author={authorName}
          authorLink={`${VI_BLOG_BASE_URL}/user/${authorSlug}`}
          date={date}
          timeToRead={timeToRead}
          type="hero"
        />
      </div>
    </HeaderWrapper>
  );
}
