import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Media from 'common/Media';

import Title from 'components/Title';
import Category from 'components/Category';
import Colors from 'common/Colors';
import { useHistory } from 'react-router-dom';

interface HeaderWrapperProps {
  featImage: string;
}

const HeaderWrapper = styled.header<HeaderWrapperProps>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${({ featImage }) => featImage});
  background-blend-mode: normal;
  background-size: cover;
  background-position: center;
  padding: 60px 20px 60px 20px;

  @media (min-width: ${Media.tabletSm}) {
    padding: 100px 35px 100px 35px;
  }

  @media (min-width: ${Media.tabletLg}) {
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

    & .thumbnail-category {
      margin-bottom: 60px;

      @media (min-width: ${Media.tabletLg}) {
        /* margin-bottom: 100px; */
      }
    }

    .title {
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
  date: string;
  timeToRead: string;
  categoryColor: string;
  categorySlug: string;
  categoryName: string;
}

export default function HeaderNewsAndEvents({
  className,
  imageUrl,
  title,
  categoryColor,
  categorySlug,
  categoryName,
}: Props): ReactElement {
  const history = useHistory();
  const categoryUrl = `/news-and-events-category/${categorySlug}`;
  return (
    <HeaderWrapper featImage={imageUrl} className={className}>
      <div className="container">
        <Category
          onClick={(e: React.SyntheticEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            history.push(categoryUrl);
          }}
          className="thumbnail-category"
          color={categoryColor ? categoryColor : Colors.BlueDark}
          href={categoryUrl}
          data-element="category"
        >
          {categoryName}
        </Category>
        <Title className="title" type="post title">
          {title}
        </Title>
      </div>
    </HeaderWrapper>
  );
}
