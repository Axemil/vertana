import {
	AppAction,
	PostData,
	WPPost,
	WPCategory,
	MainPageQueryResponse,
	CategoriesQueryResponse,
	SaveMainPageDataAction,
	SaveCategoriesAction,
} from "typings/app-types";

const savePosts = (posts: PostData[], currentPage: number): AppAction => ({
	type: "SAVE_POSTS",
	payload: posts,
	meta: {
		currentPage,
	},
});

const savePostsForCategory = (
	posts: PostData[],
	categorySlug: string,
): AppAction => ({
	type: "SAVE_POSTS_FOR_CATEGORY",
	payload: posts,
	meta: categorySlug,
});

const savePost = (post: PostData): AppAction => ({
	type: "SAVE_POST",
	payload: post,
});

const setPostsCount = (postsCount: number): AppAction => ({
	type: "SET_POSTS_COUNT",
	payload: postsCount,
});

const saveCategories = (
	categories: CategoriesQueryResponse,
): SaveCategoriesAction => {
	return {
		type: "SAVE_CATEGORIES",
		payload: categories,
	};
};

const saveMainPageData = (
	data: MainPageQueryResponse,
): SaveMainPageDataAction => {
	return {
		type: "SAVE_MAIN_PAGE_DATA",
		payload: data,
	};
};

export {
	savePosts,
	savePost,
	setPostsCount,
	savePostsForCategory,
	saveCategories,
	saveMainPageData,
};
