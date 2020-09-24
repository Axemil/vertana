import React, { ReactElement } from "react";
import { useSearchQuery } from "hooks/useSearchQuery";
import { log, slicePostsForPage } from "util/helpers";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import NoData from "components/NoData";
import LoadingData from "components/LoadingData";
import items from "app/Footer/data";
import { GetPostData, PageType } from "typings/app-types";
import { getPostData, getNewsData } from "util/gql-selectors";
import ArchivesContainer from "app/ArchiveContainer";
import Pagination from "components/Pagination";
import Header from "./Header";
import { POST_DATA_FRAGMENT, NEWS_DATA_FRAGMENT } from "gql/postDataFragment";

const SEARCH_QUERY = gql`
	query searchPosts($search: String) {
		posts(where: { search: $search }, first: 999) {
			edges {
				node {
					...postData
				}
			}
		}
	}
	${POST_DATA_FRAGMENT}
`;

const POSTS_PER_SEARCH_PAGE = 12;

interface SearchQueryData {
	posts?: {
		edges: GetPostData[];
	};
	newsAndEvents?: {
		edges: GetPostData[];
	};
}

interface Props {}

export default function Search({}: Props): ReactElement {
	const { q, p, t } = useSearchQuery<{ q: string; p: string; t: string }>();
	if (!q) return <NoData items="posts" />;

	const SEARCH_QUERY = gql`
		query search${t === "news" ? "newsAndEvents" : "posts"}($search: String) {
			${
				t === "news" ? "newsAndEvents" : "posts"
			}(where: { search: $search }, first: 999) {
				edges {
					node {
						${t === "news" ? "...newsData" : "...postData"}
					}
				}
			}
		}
		${t === "news" ? NEWS_DATA_FRAGMENT : POST_DATA_FRAGMENT}
	`;

	const urlDecodedQuerry = q.split("%20").join(" ");

	const { error, loading, data } = useQuery<SearchQueryData>(SEARCH_QUERY, {
		variables: {
			search: urlDecodedQuerry,
		},
	});

	if (error) return null;
	if (loading) return <LoadingData items="posts" />;
	if (!data) return <NoData items="posts" />;

	let rawData: GetPostData[];
	if (t === "news") {
		rawData = data.newsAndEvents.edges;
	} else {
		rawData = data.posts.edges;
	}

	let pageNumber = parseInt(p);
	pageNumber = pageNumber || 1;

	let rawPageData;
	let normalizedPageData;
	if (rawData.length > 0) {
		rawPageData = slicePostsForPage(rawData, pageNumber, POSTS_PER_SEARCH_PAGE);
		normalizedPageData =
			t === "news" ? getNewsData(rawData) : getPostData(rawPageData);
	}

	log("Search query", q, data, normalizedPageData);

	return (
		<ArchivesContainer
			type={t as PageType}
			header={
				<Header
					noPosts={!rawData || rawData.length === 0}
					previousTerm={urlDecodedQuerry}
				/>
			}
			posts={normalizedPageData}
			columns={3}
			pagination={
				normalizedPageData &&
				normalizedPageData.length > POSTS_PER_SEARCH_PAGE && (
					<Pagination
						pageType="search"
						postsPerPage={POSTS_PER_SEARCH_PAGE}
						postsCount={rawData.length}
						slug={q}
						currentPage={pageNumber}
					/>
				)
			}
		/>
	);
}
