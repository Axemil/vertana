import React, { ReactElement, useContext, useMemo } from "react";
import styled, { css } from "styled-components";
import Card from "components/Card";
import Colors from "common/Colors";
import Media from "common/Media";
import Signup from "components/Signup";
import Pagination from "components/Pagination";
import AppContext from "util/AppContext";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import { RouteParams, PostData, PageType } from "typings/app-types";
import { stripTags, parseQueryStr, isReactSnap, log } from "util/helpers";
import { useSearchQuery } from "hooks/useSearchQuery";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

declare const VI_BLOG_DEBUG_MODE: string;

const StyledMain = styled.main`
	@media (min-width: ${Media.tabletSm}) {
		display: flex;
		flex-wrap: wrap;
	}

	.label-posts{
		font-size: 30px;
		padding: 30px 0;
		margin: 0;
	}
	
	.wrapper-posts-label{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.wrapper-posts-label p{
		margin: 0;
	}

	.content-section {
		width: 100%;
	}

	.signup {
		margin: 30px 0 60px 0;
		width: 100%;

		@media (min-width: ${Media.tabletSm}) {
			align-self: center;
			height: 255px;
		}
	}

	.pagination {
		margin: 80px auto 60px auto;
		text-align: center;

		@media (min-width: ${Media.tabletSm}) {
			margin: 10px auto 30px auto;
		}

		@media (min-width: ${Media.tabletLg}) {
			margin: 30px auto 0 auto;
		}

		@media (min-width: ${Media.tabletLg}) {
			margin: 36px auto 0 auto;
		}
	}

	.dash {
		background-color: ${Colors.Gray200};
		height: 2px;
		margin-bottom: 60px;

		@media (min-width: ${Media.tabletSm}) {
			margin-bottom: 80px;
		}
		@media (min-width: ${Media.tabletLg}) {
			display: none;
		}
	}
`;

interface ContentSectionProps {
	columns: number;
}

const ContentSection = styled.div<ContentSectionProps>`
	width: 100%;
	.post-card {
		margin-bottom: 50px;
	}
	@media (min-width: ${Media.tabletSm}) {
		display: flex;
		flex-wrap: wrap;
		& .post-card {
			margin-right: 20px;
			${({ columns }) =>
				(columns === 2 &&
					css`
						width: calc(50% - 10px);
					`) ||
				(columns === 3 &&
					css`
						width: calc(33.3% - 15px);
					`)};
			flex: 0 1 auto;
		}
		${({ columns }) =>
			(columns === 2 &&
				css`
					& .post-card:nth-child(2n) {
						margin-right: 0px;
					}
				`) ||
			(columns === 3 &&
				css`
					& .post-card:nth-child(3n) {
						margin-right: 0px;
					}
				`)};
	}
`;

interface Props {
	className?: string;
	posts: PostData[];
	pagination: ReactElement;
	columns?: number;
	pageType?: PageType;
}

export default function MainSection({
	className,
	posts,
	pagination,
	columns = 2,
	pageType,
}: Props): ReactElement {
	if (!posts || posts.length === 0) return null;
	const posts1_start = 0;
	const posts1_end = 2 * columns;
	const posts2_start = posts1_end;
	const posts2_end = posts2_start + 2 * columns;

	const posts1 = posts.slice(posts1_start, posts1_end);
	const posts2 = posts.slice(posts2_start, posts2_end);

	console.log('Hello',pageType)

	return (
		<StyledMain className={className}>
			{pageType === 'user' && (
				<div className="wrapper-posts-label">
					<h2 className="label-posts">Posts</h2>
					<p>We're find {posts.length} results</p>
				</div>
			)}
			{posts && posts.length > 0 && (
				<>
					<ContentSection columns={columns} className="content-section">
						{posts1.map((post, key) => (
							<Card
								pageType={pageType}
								key={key}
								className="post-card"
								data={post}
							/>
						))}
					</ContentSection>

					<Signup className="signup" />

					<ContentSection columns={columns} className="content-section">
						{posts2.map((post, key) => (
							<Card
								pageType={pageType}
								key={key}
								className="post-card"
								data={post}
							/>
						))}
					</ContentSection>

					<div className="pagination">{pagination}</div>
				</>
			)}

			<div className="dash"></div>
		</StyledMain>
	);
}
