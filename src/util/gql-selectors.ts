import { FeaturedImageData } from 'pages/Post';
import { FeaturedImage } from './../../typings/app-types';
import {
  GetPostsData,
  PostData,
  GetPostData,
  GetNewsData,
  AllNewsAndEventsCategoriesColors,
} from 'typings/app-types';
import { CategoriesColors, CategoriesColorsData } from 'typings/app-types';
import { stripTags, formatDate } from './helpers';
import { CategoryDescription } from 'pages/Archives';
import { CategoryData, AllCategoriesData } from 'app/CategoriesMenu';

export const getCardThumbnail = ({
  mediaDetails: { sizes },
}: FeaturedImage): string => {
  const postThumbnail = sizes.filter((size) => size.name === 'post_thumbnail');
  const mediumLarge = sizes.filter((size) => size.name === 'medium_large');
  const featureCard = sizes.filter((size) => size.name === 'feature-card');
  const large = sizes.filter((size) => size.name === 'large');
  const medium = sizes.filter((size) => size.name === 'medium');
  return postThumbnail.length > 0
    ? postThumbnail[0].sourceUrl
    : mediumLarge.length > 0
    ? mediumLarge[0].sourceUrl
    : large.length > 0
    ? large[0].sourceUrl
    : featureCard.length > 0
    ? featureCard[0].sourceUrl
    : medium.length > 0
    ? medium[0].sourceUrl
    : '';
};

export const getHeroImage = ({
  mediaDetails: { sizes },
}: FeaturedImageData): string => {
  const hero = sizes.filter((size) => size.name === 'hero');
  const heroCenter = sizes.filter((size) => size.name === 'hero-center');
  const accordionSlide = sizes.filter(
    (size) => size.name === 'accordion-slide'
  );
  const leadBanner = sizes.filter((size) => size.name === 'lead-banner');
  const large = sizes.filter((size) => size.name === 'large');
  const featureCard = sizes.filter((size) => size.name === 'feature-card');
  const promo = sizes.filter((size) => size.name === 'promo');
  const medium = sizes.filter((size) => size.name === 'medium');
  return hero.length > 0
    ? hero[0].sourceUrl
    : heroCenter.length > 0
    ? heroCenter[0].sourceUrl
    : accordionSlide.length > 0
    ? accordionSlide[0].sourceUrl
    : leadBanner.length > 0
    ? leadBanner[0].sourceUrl
    : large.length > 0
    ? large[0].sourceUrl
    : featureCard.length > 0
    ? featureCard[0].sourceUrl
    : promo.length > 0
    ? promo[0].sourceUrl
    : medium.length > 0
    ? medium[0].sourceUrl
    : '';
};

export const getPostData = (data: GetPostData[]): PostData[] => {
  return data.map(
    ({
      node: {
        id,
        title,
        timeToRead,
        slug,
        date,
        excerpt,
        author: { name, slug: authorSlug },
        featuredImage,
        categories: { edges },
      },
    }) => ({
      id,
      title: stripTags(title),
      timeToRead,
      slug,
      date: formatDate(date),
      excerpt: stripTags(excerpt).slice(0, 121).concat(' ...'),
      authorName: name,
      authorSlug,
      thumbnail: getCardThumbnail(featuredImage),

      // featuredImage
      // 	? featuredImage.mediaDetails.sizes.filter(
      // 			({ name }) => name === "medium",
      // 	  )[0]?.sourceUrl
      // 	: "",
      largeImage: featuredImage
        ? featuredImage.mediaDetails.sizes.filter(
            ({ name }) => name === 'large'
          )[0]?.sourceUrl
        : '',
      categoryName: edges.length !== 0 ? edges[0].node.name : '',
      categorySlug: edges.length !== 0 ? edges[0].node.slug : '',
    })
  );
};

export const getNewsData = (data: GetNewsData[]): PostData[] => {
  return data.map(
    ({
      node: {
        title,
        timeToRead,
        slug,
        date,
        excerpt,
        author: { name, slug: authorSlug },
        featuredImage,
        newsAndEventsCategories: { edges },
      },
    }) => ({
      title: stripTags(title),
      timeToRead,
      slug,
      date: formatDate(date),
      excerpt: stripTags(excerpt).slice(0, 121).concat(' ...'),
      authorName: name,
      authorSlug,
      thumbnail: getCardThumbnail(featuredImage),

      // featuredImage
      //   ? featuredImage.mediaDetails.sizes.filter(
      //       ({ name }) => name === 'medium'
      //     )[0]?.sourceUrl
      //   : '',
      largeImage: featuredImage
        ? featuredImage.mediaDetails.sizes.filter(
            ({ name }) => name === 'large'
          )[0]?.sourceUrl
        : '',
      categoryName: edges.length !== 0 ? edges[0].node.name : '',
      categorySlug: edges.length !== 0 ? edges[0].node.slug : '',
    })
  );
};

/**
 * Reduce incoming category data to a hash
 * with the shape { [category-slug]: "category color"}
 */
export const categoriesColorsDataToHash = (
  categoryData: AllCategoriesData
): CategoriesColors => {
  return categoryData.categories.edges.reduce(
    (
      prev,
      {
        node: {
          slug,
          categoryMeta: { categoryColor },
        },
      }
    ) => {
      return { ...prev, [slug]: categoryColor };
    },
    {} as {
      [k: string]: string;
    }
  );
};

export const newsAndEventsColorsDataToHash = (
  categoryData: AllNewsAndEventsCategoriesColors
): CategoriesColors => {
  return categoryData.newsAndEventsCategories.edges.reduce(
    (
      prev,
      {
        node: {
          slug,
          categoryMeta: { categoryColor },
        },
      }
    ) => {
      return { ...prev, [slug]: categoryColor };
    },
    {} as {
      [k: string]: string;
    }
  );
};

export const getFirstCategorySlug = (categories: CategoryData[]): string => {
  if (!categories || categories.length === 0) {
    return '';
  }

  return categories[0].node.slug;
};
