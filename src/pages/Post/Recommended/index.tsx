import React, { ReactElement, useState, useRef } from "react";
import styled from "styled-components";
import Carousel from "nuka-carousel";
import Title from "components/Title";
import Card from "components/Card";

import Colors from "common/Colors";
import NavButtons, { NavDirection } from "components/NavButtons";
import Media from "common/Media";
import { PostData, PageType } from "typings/app-types";
import { useMedia } from "use-media";

import Slider from "react-slick";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { POSTS_IN_CATEGORY, PostsInCategoryData } from "pages/Archives";
import { getPostData } from "util/gql-selectors";
import { POST_DATA_FRAGMENT } from "gql/postDataFragment";

const Wrapper = styled.section`
	background-color: ${Colors.Gray100};
	padding: 80px 20px 120px 20px;

	@media (min-width: ${Media.tabletSm}) {
		padding: 100px 35px 90px 35px;
	}
	@media (min-width: ${Media.tabletLg}) {
		padding: 85px 30px 110px 30px;
	}

	.recommended-container {
		@media (min-width: ${Media.laptop}) {
			width: 1180px;
			margin: 0 auto;
		}
	}

	.title-wrapper {
		margin-bottom: 25px;

		@media (min-width: ${Media.tabletSm}) {
			display: flex;
			align-items: center;
		}
	}

	.nav-buttons-top {
		display: none;

		@media (min-width: ${Media.tabletSm}) {
			display: block;
			margin-left: auto;
		}
	}

	.nav-buttons-bottom {
		margin-top: 12px;

		@media (min-width: ${Media.tabletSm}) {
			display: none;
		}
	}

	.slider-wrapper {
		width: 100%;
	}
`;

export const RECOMMENDED_POSTS_IN_CATEGORY = gql`
	query postsInCategory($categoryName: String, $first: Int) {
		posts(where: { categoryName: $categoryName }, first: $first) {
			edges {
				node {
					...postData
				}
			}
		}
	}
	${POST_DATA_FRAGMENT}
`;

interface Props {
	currentCategory: string;
	pageType: PageType;
}

export default function Recommended({
	currentCategory,
	pageType,
}: Props): ReactElement {
	const [slideIndex, setSlideIndex] = useState(0);
	const isLaptop = useMedia({ minWidth: Media.laptop });
	const isTablet = useMedia({ minWidth: Media.tabletSm });
	const isMobile = useMedia({ minWidth: Media.mobile });
	const { error, loading, data } = useQuery<PostsInCategoryData>(
		RECOMMENDED_POSTS_IN_CATEGORY,
		{
			variables: {
				categoryName: currentCategory,
				first: 10,
			},
		},
	);

	if (error) return null;
	if (loading) return null;

	const recommendedPosts = getPostData(data.posts.edges);

	const slidesToShow = () => {
		if (isLaptop) {
			return 3;
		} else if (isTablet) {
			return 2;
		} else if (isMobile) {
			return 1;
		} else {
			return 1;
		}
	};

	const handleClick = (dir: NavDirection) => {
		let newIndex;
		switch (dir) {
			case NavDirection.Forward:
				newIndex =
					slideIndex + 1 >= data.posts.edges.length - 1
						? slideIndex
						: slideIndex + 1;
				setSlideIndex(newIndex);
				break;
			case NavDirection.Backward:
				newIndex = slideIndex - 1 < 0 ? 0 : slideIndex - 1;
				setSlideIndex(newIndex);
				break;
			default:
				slideIndex;
		}
	};

	return (
		<Wrapper>
			<div className="recommended-container">
				<div className="title-wrapper">
					<Title className="title" type="section title">
						Recommended
					</Title>

					<NavButtons onClick={handleClick} className="nav-buttons-top" />
				</div>
				<Carousel
					withoutControls={true}
					slideIndex={slideIndex}
					afterSlide={(slideIndex) => setSlideIndex(slideIndex)}
					slidesToShow={slidesToShow()}
					cellSpacing={20}
					className="slider-wrapper"
				>
					{recommendedPosts.map((post) => (
						<Card pageType={pageType} className="slider-card" data={post} />
					))}
				</Carousel>
				<NavButtons onClick={handleClick} className="nav-buttons-bottom" />
			</div>
		</Wrapper>
	);
}
