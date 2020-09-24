import { PostsCountResponse } from 'typings/app-types';
import { MainPageData, MainPageDataAPIResponse } from 'app/CategoriesMenu/Ad';

declare const VI_BLOG_DEBUG_MODE: boolean;
declare const VI_BLOG_BASE_URL: string;
declare const VI_BLOG_API_BASE_URL: string;

class WPClient {
  // Routes
  private static postsRoute = 'wp-json/wp/v2/posts';
  private static pagesRoute = 'wp-json/wp/v2/pages';
  private static categoriesRoute = 'wp-json/wp/v2/categories';
  private static postsCountRoute = 'wp-json/blog-utils/v1/posts-count';
  private static newsIndexInfoRoute = 'wp-json/blog-utils/v1/news-index-info';

  // params
  private static oldPagesParams = 'per_page=30&parent=139';
  private static postsParams = '_embed';
  private static mainPageParams = `slug=${VI_BLOG_BASE_URL.replace('/', '')}`;
  private static postParams = `_embed&slug=`;
  private static relatedPostsParams = `_embed&categories=`;
  private static postsByCategoryParams = `_embed&filter[taxonomy]=category&filter[term]=`;

  //URLs
  private oldPagesURL: string;
  private postsCountURL: string;
  private postsUrl: string;
  private mainPageURL: string;
  private categoriesURL: string;
  private postURL: string;
  private relatedPostsUrl: string;
  private postsByCategoryUrl: string;
  private newsIndexInfoUrl: string;

  constructor(private baseURL: string) {
    this.oldPagesURL = `${baseURL}/${WPClient.pagesRoute}?${WPClient.oldPagesParams}`;
    this.postsCountURL = `${baseURL}/${WPClient.postsCountRoute}`;
    this.postsUrl = `${baseURL}/${WPClient.postsRoute}?${WPClient.postsParams}`;
    this.mainPageURL = `${baseURL}/${WPClient.pagesRoute}?${WPClient.mainPageParams}`;
    this.categoriesURL = `${baseURL}/${WPClient.categoriesRoute}`;
    this.postURL = `${baseURL}/${WPClient.postsRoute}?${WPClient.postParams}`;
    this.relatedPostsUrl = `${baseURL}/${WPClient.postsRoute}?${WPClient.relatedPostsParams}`;
    this.postsByCategoryUrl = `${baseURL}/${WPClient.postsRoute}?${WPClient.postsByCategoryParams}`;
    this.newsIndexInfoUrl = `${baseURL}/${WPClient.newsIndexInfoRoute}`;
  }

  async getPostsByCategorySlug(slug: string) {
    this.log(
      `getting post by category slug from API url: ${this.postsByCategoryUrl}${slug}`
    );

    return fetch(`${this.postsByCategoryUrl}${slug}`)
      .then((data) => data.json())
      .catch(this.handleError);
  }

  async relatedPosts(catId: string) {
    this.log(
      `getting post by category from API url: ${this.relatedPostsUrl}${catId}`
    );

    return fetch(`${this.relatedPostsUrl}${catId}`)
      .then((data) => data.json())
      .catch(this.handleError);
  }

  async getPost(slug: string) {
    this.log(`getting post by slug from API url: ${this.postURL}${slug}`);

    return fetch(`${this.postURL}${slug}`)
      .then((data) => data.json())
      .catch(this.handleError);
  }

  async getCategories() {
    this.log(`getting categories from API url: ${this.categoriesURL}`);

    return fetch(this.categoriesURL)
      .then((data) => data.json())
      .catch(this.handleError);
  }

  async getMainPage() {
    this.log(`getting main page data from API url: ${this.mainPageURL}`);

    return fetch(this.mainPageURL)
      .then((data) => (data.json() as unknown) as MainPageDataAPIResponse[])
      .catch(this.handleError);
  }

  async getPosts(perPage: number, page: number) {
    const currentPostsURL = `${this.postsUrl}&per_page=${perPage}&page=${page}`;
    this.log('getting posts from API url: ' + currentPostsURL);
    return await fetch(currentPostsURL)
      .then((data) => data.json())
      .catch(this.handleError);
  }

  async getOldPosts() {
    this.log(`getting old posts from API url: ${this.oldPagesURL}`);
    return await fetch(this.oldPagesURL)
      .then((data) => data.json())
      .catch(this.handleError);
  }

  async getPostsCount(): Promise<PostsCountResponse> {
    this.log(`getting posts count from url: ${this.postsCountURL}`);
    return await fetch(this.postsCountURL)
      .then((data) => data.json())
      .catch(this.handleError);
  }

  async getNewsIndexInfo(): Promise<{ slug: string }> {
    this.log(`getting news index information from: ${this.newsIndexInfoUrl}`);
    return await fetch(this.newsIndexInfoUrl)
      .then((data) => data.json())
      .catch(this.handleError);
  }

  private log(message: string): void {
    if (VI_BLOG_DEBUG_MODE) {
      console.log(message);
    }
  }

  private handleError(err: any): null {
    if (VI_BLOG_DEBUG_MODE) {
      console.error(err);
    }
    return null;
  }
}

export default new WPClient(VI_BLOG_API_BASE_URL);
