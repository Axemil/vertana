import { pathToFileURL } from "url";
import { PageType, PostData, WPPostFlat, GetPostData } from "typings/app-types";
import { NewsAndEventsData } from "pages/NewsAndEvents";

declare const VI_BLOG_DEBUG_MODE: boolean;

export function log(...rest: any): void {
	if (VI_BLOG_DEBUG_MODE) {
		console.log(...rest);
	}
}

export function stripTags(html: string): string {
	var doc = new DOMParser().parseFromString(html, "text/html");
	return doc.body.textContent || "";
}

export function flatten(
	obj: { [k: string]: any },
	result: { [k: string]: any } = {},
	path = "",
) {
	if (!obj) {
		return undefined;
	}
	const keys = Object.keys(obj);

	keys.forEach((key) => {
		if (typeof obj[key] !== "object") {
			result[path + key] = obj[key];
		} else {
			flatten(obj[key], result, path + key + ".");
		}
	});
	return result;
}

export const parseQueryStr = <T>(query: string): T => {
	return query
		.slice(1)
		.split("&")
		.map((i) => i.split("="))
		.reduce((acc, val) => ({ ...acc, [val[0]]: val[1] }), {} as T);
};

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const formatDate = (dateStr: string) => {
	const date = new Date(dateStr);
	const dayNumber = date.getDate();
	const month = monthNames[date.getMonth()];
	return `${dayNumber} ${month}, ${date.getFullYear()}`;
};

export const isReactSnap = () => navigator.userAgent === "ReactSnap";

export const getPathElements = (path: string) =>
	path.split("/").filter((e) => e !== "");

export const currentSlug = () =>
	getPathElements(window.location.pathname).slice(-1)[0];

export const currentCategory = (pathname: string) => {
	const pathElements = getPathElements(pathname);
	const categoryIndex = pathElements.findIndex((e) => e === "category");
	return pathElements[categoryIndex + 1];
};

declare const VI_BLOG_BASE_URL: string;
export const getPageType = (pathname: string): PageType => {
	const pathElements = getPathElements(pathname);
	if (
		pathElements.length === 0 ||
		(pathElements.length === 1 &&
			pathElements.includes(VI_BLOG_BASE_URL.replace("/", "")))
	) {
		return "main";
	} else {
		const el = pathElements[1];
		switch (el) {
			case "category":
				return "category";
			case "author":
				return "author";
			default:
				return "main";
		}
	}
};

export const preparePostsData = (data: { [k: string]: any }): PostData[] => {
	const flatData = data.map((p: {}) => flatten(p));
	return flatData.map((i: WPPostFlat): PostData => getPost(i));
};

export const removePrerenderedStyles = () => {
	if (!isReactSnap()) {
		const styles = document.getElementById("prerendered-styles");
		if (styles) {
			styles.parentNode.removeChild(styles);
		}
	}
};

export const getFetchPageNumber = (
	urlRegNumber: number,
	paginationLinksCount: number,
): number => Math.ceil(urlRegNumber / paginationLinksCount);

/**
 * Calculate index of the page to show in the array of loaded posts
 * when page is loaded from HTTP request with query string "?list=3"
 * @param q number taken from HTTP request query variable
 * @param ws number of the pagination links that are visible
 * @param pp number of posts per page
 */
export const getPageIndex = (q: number, ws: number, pp: number) =>
	q % ws !== 0 ? ((q % ws) - 1) * pp : (ws - 1) * pp;

export const slicePostsForPage = (
	data: any[],
	page: number,
	postsPerPage: number,
): any[] => {
	const from = (page - 1) * postsPerPage;
	const to = from + postsPerPage;
	log(from, to);
	return data.slice(from, to);
};
