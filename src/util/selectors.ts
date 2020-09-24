import { WPPost, PostData, CategoryColorsData } from "typings/app-types";
import { CategoryData } from "app/CategoriesMenu";

export const getPostsForSinglePage = (
	posts: PostData[],
	postIndex: number,
	postsCount: number,
): PostData[] => {
	return posts.slice(postIndex, postIndex + postsCount);
};

export const getStickyPost = (posts: PostData[]): PostData =>
	posts.filter((post) => post.stickyPost)[0];

export const getPost = (posts: PostData[], slug: string): PostData => {
	return posts.find((post) => post.slug === slug);
};
