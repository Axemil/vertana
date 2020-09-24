import React, { ReactElement, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import styled from "styled-components";
import Title from "components/Title";
import Category from "components/Category";
import Colors from "common/Colors";
import PostInfo from "components/PostInfo";
import PostExcerpt from "components/PostExcerpt";
import Media from "common/Media";
import { PostData, PageType } from "typings/app-types";
import { useImageOnLoad } from "hooks/usePageNumber";
import { log } from "util/helpers";

declare const VI_BLOG_BASE_URL: string;
declare const VI_NEWS_BASE_URL: string;
declare const VI_BLOG_DEBUG_MODE: string;

interface WrapperProps {
	imageLoaded?: boolean;
}

const Wrapper = styled.section<WrapperProps>`
	width: 100%;
	min-height: 350px;
	background-color: transparent;

	.thumbnail-container {
		width: 100%;
		height: 215px;
		margin-bottom: 25px;
		position: relative;

		@media (min-width: ${Media.tabletLg}) {
			height: 194px;
		}
		@media (min-width: ${Media.laptop}) {
			height: 240px;
		}
	}

	.thumbnail {
		opacity: ${({ imageLoaded }) => (imageLoaded ? 1 : 0)};
		transition: opacity 700ms;
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
	}

	.thumbnail-category {
		position: absolute;
		top: 10px;
		left: 10px;

		@media (min-width: ${Media.laptop}) {
			top: 20px;
			left: 20px;
		}
	}

	.title,
	.post-info {
		margin-bottom: 14px;
	}

	.title {
		transition: color 0.2s ease-in;

		&:hover {
			color: ${Colors.GreenDark};
		}
	}

	.link-to-post {
		text-decoration: none;
	}
`;

interface Props {
	className?: string;
	data: PostData;
	pageType: PageType;
}

export default function Card({
	className,
	pageType,
	data: {
		thumbnail,
		timeToRead,
		title,
		slug,
		authorName,
		authorSlug,
		categoryName,
		categorySlug,
		categoryColor,
		excerpt,
	},
}: Props): ReactElement {
	const loaded = useImageOnLoad(thumbnail);
	const history = useHistory();

	let postUrl: string;
	let userUrl: string;
	let categoryUrl: string;

	switch (pageType) {
		case "news":
		case "news post":
		case "news category":
		case "news search":
			postUrl = `${VI_NEWS_BASE_URL}/${slug}`;
			userUrl = `${VI_BLOG_BASE_URL}/user/${authorSlug}`;
			categoryUrl = `/news-and-events-category/${categorySlug}`;
			break;
		case "category":
		case "main":
		case "search":
		case "user":
			postUrl = `${VI_BLOG_BASE_URL}/${slug}`;
			userUrl = `${VI_BLOG_BASE_URL}/user/${authorSlug}`;
			categoryUrl = `${VI_BLOG_BASE_URL}/category/${categorySlug}`;
			break;
		default:
			postUrl = `${VI_BLOG_BASE_URL}/${slug}`;
			userUrl = `${VI_BLOG_BASE_URL}/user/${authorSlug}`;
			categoryUrl = `${VI_BLOG_BASE_URL}/category/${categorySlug}`;
	}

	const handleClick = (e: React.SyntheticEvent<EventTarget>) => {
		interface CardElementDataset extends DOMStringMap {
			cardElement: "thumbnail" | "title" | "user" | "category" | undefined;
		}

		if (
			e.target instanceof HTMLHeadingElement ||
			e.target instanceof HTMLAnchorElement ||
			e.target instanceof HTMLImageElement
		) {
			const { element } = e.target.dataset as CardElementDataset;

			log("Clicked Card element: ", element);

			e.preventDefault();

			switch (element) {
				case "thumbnail":
				case "title":
					return history.push(postUrl);
				case "user":
					return history.push(userUrl);
				case "category":
					return history.push(categoryUrl);
				default:
					return;
			}
		}
	};

	return (
		<Wrapper onClick={handleClick} imageLoaded={loaded} className={className}>
			<div className="thumbnail-container">
				<a href={postUrl}>
					<img data-element="thumbnail" className="thumbnail" src={thumbnail} />
				</a>
				{categoryName && categorySlug && (
					<Category
						className="thumbnail-category"
						color={categoryColor ? categoryColor : Colors.BlueDark}
						href={categoryUrl}
						data-element="category"
					>
						{categoryName}
					</Category>
				)}
			</div>
			<a className="link-to-post" href={postUrl}>
				<Title data-element="title" className="title" type="card title">
					{title}
				</Title>
			</a>
			<PostInfo
				className="post-info"
				type="card"
				author={authorName}
				authorLink={userUrl}
				timeToRead={timeToRead}
			/>
			<PostExcerpt className="excerpt" type="card">
				{excerpt}
			</PostExcerpt>
		</Wrapper>
	);
}
