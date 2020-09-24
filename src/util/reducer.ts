import {
	AppState,
	AppAction,
	WPPost,
	FeaturedMedia,
	WPPageFlat,
	WPPostFlat,
	PostData,
	WPCategory,
	MainPageQueryResponse,
	CategoriesQueryResponse,
	QueryResponse,
	AppActionTypes,
} from "typings/app-types";
import { stripTags, flatten, formatDate } from "./helpers";

declare const VI_BLOG_DEBUG_MODE: boolean;

const initialPost = {
	id: "",
	title: "",
	excerpt: "",
	thumbnail: "",
	featImageLarge: "",
	featImageCard: "",
	authorName: "",
	authorDesc: "",
	authorLink: "",
	categoryName: "",
	categorySlug: "",
	authorImage: "",
	timeToRead: "",
	categoryColor: "",
	categoryLink: "",
	categoryId: "",
	stickyPost: false,
	previousPageNumber: 0,
	link: "",
	slug: "",
	date: "",
};

const initialState: AppState = {
	postsPerPage: 8,
	paginationLinksCount: 4,
};

function reducer(state: AppState, action: AppActionTypes): AppState {
	switch (action.type) {
		case "SAVE_MAIN_PAGE_DATA":
			const {
				allPosts: { edges },
			} = action.payload.data;
			return {
				...state,
				allPosts: edges.map(
					({
						node: {
							title,
							id,
							excerpt,
							timeToRead,
							author: { name },
							categories: {
								edges: [
									{
										node: { name: categoryName, slug: categorySlug },
									},
								],
							},
							featuredImage,
						},
					}) => ({
						title,
						id,
						excerpt: `${stripTags(excerpt).slice(0, 120)} ...`,
						timeToRead,
						authorName: name,
						categoryName,
						categorySlug,
						thumbnail: featuredImage?.mediaDetails.sizes.filter(
							({ sourceUrl, name }) => name === "medium",
						)[0]?.sourceUrl,
					}),
				),
			};
		case "SAVE_CATEGORIES":
			return {
				...state,
				categories: action.payload.data.categories.edges.map(
					({
						node: {
							count,
							categoryId,
							slug,
							name,
							categoryMeta: { categoryColor },
						},
					}) => ({
						count,
						categoryId,
						slug,
						name,
						categoryColor,
					}),
				),
			};

		default:
			return state;
	}
}

export { initialState, reducer };
