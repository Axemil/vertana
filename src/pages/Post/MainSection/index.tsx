import React, { ReactElement } from 'react';
import { Element } from 'react-scroll';
import Title from 'components/Title';
import Text from 'components/Text';
import styled from 'styled-components';
import Quote from 'components/Quote';
import { PostList, PostListItem } from 'components/PostList';
import PostImage from 'components/PostImage';
import img1 from 'assets/img/res/post-thumbnail-2.jpg';
import Ad from 'app/CategoriesMenu/Ad';
import Media from 'common/Media';

import authorImg from 'assets/img/res/author.jpg';
import Share from 'components/Share';
import Author from 'components/Author';
import Colors from 'common/Colors';
import Fonts from 'common/Fonts';
import slugify from 'slugify';
import { PostData } from 'typings/app-types';
import { PostResponseData } from '..';

const Wrapper = styled.div`
  padding: 10px 20px 0 20px;

  @media (min-width: ${Media.mobile}) {
    padding: 10px 35px 0 35px;
  }

  @media (min-width: ${Media.tabletLg}) {
    padding: 10px 0 0 30px;
  }

  @media (min-width: ${Media.laptop}) {
    padding: 10px 0 0 52px;
  }

  & .vi-blog-post-content {
    /* First level post title */
    & a {
      border-bottom: 3px solid #47C647;
      color: #47C647;
      font-weight: 600;
    }
    & h2 {
      font-family: ${Fonts.Bold};
      font-size: 30px;
      line-height: 40px;
      color: ${Colors.Black};
      margin: 0;
      padding-top: 50px;

      @media (min-width: ${Media.tabletSm}) {
        padding-top: 70px;
      }

      @media (min-width: ${Media.tabletLg}) {
        font-size: 40px;
        line-height: 56px;
        padding-top: 50px;
        padding-bottom: 2px;
      }

      @media (min-width: ${Media.laptop}) {
        padding-top: 70px;
        padding-bottom: 1px;
      }
    }

    /* Second level post title */
    & h3 {
      padding-top: 36px;
      padding-bottom: 2px;

      @media (min-width: ${Media.laptop}) {
        padding-top: 37px;
      }
    }

    /* Third level post title */
    & h4 {
      padding-top: 36px;
      padding-bottom: 2px;
      font-family: ${Fonts.Bold};
      font-size: 16px !important;
      line-height: 28px !important;
      margin: 0;

      @media (min-width: ${Media.laptop}) {
        padding-top: 37px;
      }
    }

    /* Text Paragraph */
    & p {
      padding-top: 14px;
      padding-bottom: 14px;
      margin: 0;
      font-family: ${Fonts.Regular};
      font-size: 16px;
      line-height: 28px;

      @media (min-width: ${Media.tabletLg}) {
        letter-spacing: 0.0035em;
      }
    }

    & h4 + p {
      padding-top: 8px;
    }

    /* Post quote */
    & blockquote {
      border-left: 4px solid ${Colors.GreenMedium};
      padding: 0 0 0 40px;
      margin: 0;
      font-family: ${Fonts.Bold};
      font-size: 16px;
      line-height: 28px;

      margin-top: 35px;
      margin-bottom: 35px;
      @media (min-width: ${Media.tabletSm}) {
        margin-bottom: 20px;
      }
      @media (min-width: ${Media.tabletLg}) {
        margin-bottom: 40px;
      }
      @media (min-width: ${Media.laptop}) {
        margin-bottom: 19px;
        padding: 0 0 0 40px;
        border-left: 5px solid ${Colors.GreenMedium};
      }
    }

    /* Post list */

    & ul {
      list-style: inside;
      padding: 0;
      margin: 0;
      padding-top: 4px;
      padding-bottom: 16px;

      @media (min-width: ${Media.tabletLg}) {
        padding-bottom: 14px;
      }
    }

    /* Post list item */

    & li {
      font-family: ${Fonts.Regular};
      font-size: 16px;
      line-height: 28px;
      margin: 0;
      padding: 0;

      &:not(:last-child) {
        padding-bottom: 28px;
      }
    }

    /* Post image */

    & figure {
      display: inline-block;
      width: 100%;
      margin: 0;
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding: 0;
      margin-top: 44px;
      margin-bottom: 77px;

      @media (min-width: ${Media.tabletSm}) {
        margin-bottom: 10px;
      }

      @media (min-width: ${Media.tabletLg}) {
        margin-top: 47px;
      }

      & img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    /* Fourth level post title */
    & h4 {
      text-transform: none;
    }
  }

  .post-ad {
    margin-top: 48px;
    margin-bottom: 24px;

    @media (min-width: ${Media.tabletSm}) {
      margin-top: 44px;
    }
    @media (min-width: ${Media.tabletLg}) {
      display: none;
    }
  }

  .author-container {
    padding: 24px 0 55px 0;
    border-bottom: 2px solid ${Colors.Gray200};

    @media (min-width: ${Media.laptop}) {
      padding-top: 36px;
    }
  }

  .shares-container {
    padding: 20px 0 80px 0;
    display: flex;
    align-items: center;

    @media (min-width: ${Media.laptop}) {
      padding-top: 18px;
    }

    .shares-count {
      font-family: ${Fonts.Bold};
    }

    .share-buttons {
      margin-left: auto;
    }
  }
`;

const createMarkup = (html: string) => ({ __html: `<div>${html}</div>` });

interface Props {
  className?: string;
  content: string;
  author: ReactElement;
  postUrl?: string;
}

export default function MainSection({
  className,
  content,
  author,
  postUrl,
}: Props): ReactElement {
  return (
    <Wrapper className={className}>
      <div
        className="vi-blog-post-content"
        dangerouslySetInnerHTML={createMarkup(content)}
      ></div>
      <section className="author-container">{author}</section>
      <div className="shares-container">
        <Share
          url={postUrl}
          className="share-buttons"
          orientation="horizontal"
        />
      </div>
    </Wrapper>
  );
}
