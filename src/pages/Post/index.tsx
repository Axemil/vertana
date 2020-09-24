import React, { ReactElement, useContext, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostData, ImageSize } from 'typings/app-types';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import NoData from 'components/NoData';
import LoadingData from 'components/LoadingData';
import { CategoryData } from 'app/CategoriesMenu';
import SEOHeader from 'components/SEOHeader';
import PostContainer from 'containers/PostContainer';

const GET_POST_BY_SLUG = gql`
  query getPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      timeToRead
      content
      categories {
        edges {
          node {
            slug
          }
        }
      }
      author {
        name
        slug
        avatar {
          url
        }
        additionalInfo {
          shortDescription
        }
      }
      date
      featuredImage {
        mediaDetails {
          sizes {
            sourceUrl
            name
          }
        }
      }
      seo {
        title
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        metaKeywords
        canonical
        focuskw
        twitterTitle
        opengraphUrl
        opengraphType
        opengraphTitle
        opengraphSiteName
        opengraphDescription
        opengraphAuthor
        twitterDescription
        twitterImage {
          description(format: RAW)
          mediaItemUrl
          title(format: RAW)
        }
        opengraphImage {
          description(format: RAW)
          mediaItemUrl
          title(format: RAW)
        }
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
      }
    }
    seo {
      social {
        twitter {
          cardType
        }
      }
    }
  }
`;

export interface PostResponseData {
  post: {
    title: string;
    timeToRead: string;
    content: string;
    date: string;
    featuredImage: FeaturedImageData;
    categories: {
      edges: CategoryData[];
    };
    author: PostAuthorData;
    seo: {
      title: string;
      metaDesc: string;
      metaRobotsNofollow: string;
      metaRobotsNoindex: string;
      metaKeywords: string;
      canonical: string;
      focuskw: string;
      twitterTitle: string;
      opengraphUrl: string;
      opengraphType: string;
      opengraphTitle: string;
      opengraphSiteName: string;
      opengraphDescription: string;
      opengraphAuthor: string;
      twitterDescription: string;
      twitterImage: {
        description: string;
        mediaItemUrl: string;
        title: string;
      };
      opengraphImage?: OpengraphImage;
      opengraphModifiedTime: string;
      opengraphPublishedTime: string;
      opengraphPublisher: string;
    };
  };
  seo: {
    social: {
      twitter: {
        cardType: string;
      };
    };
  };
}

export interface FeaturedImageData {
  mediaDetails: {
    sizes: {
      sourceUrl: string;
      name: ImageSize;
    }[];
  };
}

export interface OpengraphImage {
  description: string;
  mediaItemUrl: string;
  title: string;
  mediaDetails: {
    sizes: {
      width: string;
      height: string;
    }[];
  };
}
export interface CategoryResponse {
  node: {
    slug: string;
  };
}

export interface PostAuthorData {
  name: string;
  slug?: string;
  avatar: {
    url: string;
  };
  additionalInfo: {
    shortDescription: string;
  };
}

interface Props {
  slug?: string;
}

export default function Post({}: Props): ReactElement {
  const { slug } = useParams();
  const { error, loading, data } = useQuery<PostResponseData>(
    GET_POST_BY_SLUG,
    {
      variables: { slug },
    }
  );

  if (loading) return <LoadingData items="post" />;
  if (error) return <NoData items="post" />;

  const {
    post: {
      content,
      featuredImage,
      title,
      timeToRead,
      date,
      categories: { edges: categories },
      author: {
        name: authorName,
        slug: authorSlug,
        additionalInfo: { shortDescription },
        avatar: { url: avatar },
      },
      seo: {
        title: seoTitle,
        metaDesc,
        metaRobotsNofollow,
        metaRobotsNoindex,
        canonical,
        opengraphType,
        opengraphTitle,
        opengraphDescription,
        opengraphUrl,
        opengraphSiteName,
        opengraphPublishedTime,
        opengraphImage,
      },
    },
    seo: {
      social: {
        twitter: { cardType: twitterCardType },
      },
    },
  } = data;

  return (
    <>
      <SEOHeader
        seoTitle={seoTitle}
        metaDesc={metaDesc}
        metaRobotsNofollow={metaRobotsNofollow}
        metaRobotsNoindex={metaRobotsNoindex}
        canonical={canonical}
        opengraphType={opengraphType}
        opengraphTitle={opengraphTitle}
        opengraphDescription={opengraphDescription}
        opengraphUrl={opengraphUrl}
        opengraphSiteName={opengraphSiteName}
        opengraphPublishedTime={opengraphPublishedTime}
        opengraphImage={opengraphImage}
        twitterCardType={twitterCardType}
      />
      <PostContainer
        postUrl={`https://virtana.com/blog/${slug}/`}
        title={title}
        authorName={authorName}
        authorSlug={authorSlug}
        timeToRead={timeToRead}
        date={date}
        featuredImage={featuredImage}
        content={content}
        shortDescription={shortDescription}
        avatar={avatar}
        categories={categories}
        pageType="post"
      />
    </>
  );
}
