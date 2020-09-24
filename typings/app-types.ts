import queryString from 'query-string';

export interface FeaturedMedia {
  source_url?: string;
  media_details: {
    sizes: {
      'resource-card': {
        source_url: string;
      };
    };
  };
}

export interface Author {
  name: string;
  link: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface WPPost {
  type: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia': FeaturedMedia[];
    author: Author[];
  };
  author_name: string;
  post_cat: string;
  post_category_color: string;
  sticky_post: string;
  time_to_read: string;
  featured_image: string;
  cats: Category[];
  link: string;
  slug: string;
}

export interface WPPageFlat {
  type: string;
  ['title.rendered']: string;
  // ["content.rendered"]: string;
  ['excerpt.rendered']: string;
  featured_image: string;
  post_cat: string;
  ['acf.post_category_color']: string;
  ['acf.sticky_post']: string;
  ['_embedded.author.0.avatar_urls.48']: string;
  time_to_read: string;
  link: string;
  author_name: string;
  author_link: string;
  slug: string;
  date_gmt: string;
}

export interface WPPostFlat {
  id?: string;
  type: string;
  ['title.rendered']: string;
  ['content.rendered']: string;
  ['excerpt.rendered']: string;
  ['_embedded.author.0.name']: string;
  ['_embedded.author.0.link']: string;
  ['_embedded.author.0.description']: string;
  ['_embedded.wp:featuredmedia.0.media_details.sizes.full.source_url']: string;
  ['_embedded.wp:featuredmedia.0.media_details.sizes.large.source_url']: string;
  ['_embedded.wp:featuredmedia.0.media_details.sizes.medium.source_url']: string;
  ['_embedded.wp:featuredmedia.0.media_details.sizes.feature-card.source_url']: string;
  ['_embedded.wp:featuredmedia.0.media_details.sizes.post-thumbnail.source_url']: string;
  ['_embedded.wp:term.0.0.link']: string;
  ['_embedded.wp:term.0.0.name']: string;
  ['_embedded.wp:term.0.0.slug']: string;
  ['acf.post_category_color']: string;
  ['categories.0']: string;
  ['acf.sticky_post']: string;
  time_to_read: string;
  link: string;
  slug: string;
  date_gmt: string;
  avatar_url: string;
}

export interface PostData {
  title: string;
  id?: string;
  excerpt: string;
  timeToRead: string;
  authorName: string;
  authorSlug: string;
  categoryName?: string;
  categorySlug?: string;
  categoryColor?: string;
  thumbnail: string;
  largeImage?: string;
  slug: string;
  date: string;
}

export interface WPCategory {
  name: string;
  count: number;
  slug: string;
  categoryColor?: string;
}

export interface AppState {
  allPosts: PostData[] | null;
  categories: WPCategory[] | null;
  postsPerPage: number;
  paginationLinksCount: number;
}

export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';
export const SAVE_MAIN_PAGE_DATA = 'SAVE_MAIN_PAGE_DATA';

export interface SaveCategoriesAction {
  type: typeof SAVE_CATEGORIES;
  payload: CategoriesQueryResponse;
}

export interface SaveMainPageDataAction {
  type: typeof SAVE_MAIN_PAGE_DATA;
}

export type AppActionTypes = SaveMainPageDataAction | SaveCategoriesAction;

export interface RouteParams {
  currentPage: string;
}

export type PageType =
  | 'main'
  | 'user'
  | 'category'
  | 'search'
  | 'news'
  | 'news post'
  | 'news category'
  | 'news search'
  | 'post';

export interface PostsCountResponse {
  publish: string;
}

export interface NewsIndexInfoResponse {
  slug: string;
}

export interface SearchQuery extends queryString.ParsedQuery {
  list: string;
}

export interface GetPostsData {
  stickyPosts: {
    edges: GetPostData[];
  };
  posts: {
    edges: GetPostData[];
  };
}

export interface GetPostData {
  node: {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    slug: string;
    timeToRead: string;
    author: {
      name: string;
      slug: string;
    };
    categories?: {
      edges?: {
        node: {
          name: string;
          slug: string;
        };
      }[];
    };
    featuredImage?: FeaturedImage;
  };
}

export interface FeaturedImage {
  mediaDetails: {
    sizes: {
      sourceUrl: string;
      name:
        | 'medium'
        | 'large'
        | 'thumbnail'
        | 'medium_large'
        | 'post_thumbnail'
        | 'feature-card'
        | 'link-set'
        | 'promo'
        | 'resource-card';
    }[];
  };
}

export interface GetNewsData {
  node: {
    title: string;
    date: string;
    excerpt: string;
    slug: string;
    timeToRead: string;
    author: {
      name: string;
      slug: string;
    };
    newsAndEventsCategories?: {
      edges?: {
        node: {
          name: string;
          slug: string;
        };
      }[];
    };
    featuredImage?: {
      mediaDetails: {
        sizes: {
          sourceUrl: string;
          name:
            | 'medium'
            | 'large'
            | 'thumbnail'
            | 'medium_large'
            | 'post_thumbnail'
            | 'feature-card'
            | 'link-set'
            | 'promo'
            | 'resource-card';
        }[];
      };
    };
  };
}

export interface NewsInCategoryData {
  newsAndEventsCategory: {
    count: string;
    name: string;
    description: string;
    newsAndEvents: {
      edges: GetNewsData[];
    };
  };
}

export interface CategoriesQueryResponse {
  data: {
    categories: {
      edges: {
        node: {
          count: number;
          categoryId: number;
          slug: string;
          name: string;
          categoryMeta: {
            categoryColor: string;
          };
        };
      }[];
    };
  };
}

export interface CategoriesColorsData {
  categories: {
    edges: CategoryColorData[];
  };
}

export interface CategoryColorData {
  node: {
    slug: string;
    categoryMeta: {
      categoryColor: string;
    };
  };
}

export interface CategoriesColors {
  [k: string]: string;
}

export interface CardElementDataset extends DOMStringMap {
  cardElement: 'thumbnail' | 'title' | 'user' | 'category' | undefined;
}

export type ImageSize =
  | 'medium'
  | 'large'
  | 'hero'
  | 'hero-center'
  | 'accordion-slide'
  | 'lead-banner'
  | 'thumbnail'
  | 'medium_large'
  | 'post_thumbnail'
  | 'feature-card'
  | 'link-set'
  | 'promo'
  | 'resource-card';

export interface AllNewsAndEventsCategoriesColors {
  newsAndEventsCategories: {
    edges: {
      node: {
        categoryMeta: {
          categoryColor: string;
        };
        slug: string;
      };
    }[];
  };
}
