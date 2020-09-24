import { AppState, SearchQuery, PageType, PostData } from "typings/app-types";
import { createBrowserHistory } from "history";
import queryString from "query-string";
import { getPageType, preparePostsData } from "./helpers";
import { initialState } from "./reducer";

const { pathname, search } = createBrowserHistory().location;
export class MainApp {
	private initState: AppState;

	query: SearchQuery;
	pageType: PageType;

	constructor(
		private debugMode: boolean = false,
		private client: any = client,
	) {
		const { pathname, search } = createBrowserHistory().location;
		this.query = queryString.parse(search) as SearchQuery;
		this.pageType = getPageType(pathname);
		this.log("page type: ", this.pageType);
		this.log("search query: ", this.query);
	}

	async init() {
		let fetchedPosts: any[];
		let posts: PostData[];
		switch (this.pageType) {
			case "category":
				this.initState = {
					...initialState,
					currentPageType: "category",
				};
				break;
			case "main":
			default:
				fetchedPosts = await this.client.getPosts(
					initialState.paginationLinksCount * initialState.postsPerPage,
					1,
				);
				posts = preparePostsData(fetchedPosts);
				this.initState = {
					...initialState,
					posts,
					currentPageType: "main",
				};
		}
		this.log("initial state: ");
		this.log(this.initState);
	}

	getInitState() {
		return this.initState;
	}

	log(...rest: any): void {
		if (this.debugMode) {
			console.log(...rest);
		}
	}
}
