import React, { ReactElement } from "react";
import styled from "styled-components";

import bgCatMob from "assets/svg/bg-cat-mob.svg";
import bgCatTabl from "assets/svg/bg-cat-tabl.svg";
import bgCatDesk from "assets/svg/bg-cat-desk.svg";
import Colors from "common/Colors";
import Title from "components/Title";
import Media from "common/Media";
import PostExcerpt from "components/PostExcerpt";
import { stripTags } from "util/helpers";

const Wrapper = styled.header`
	height: 445px;

	background-color: ${Colors.BlueDark};
	background-image: url(${bgCatMob});
	background-size: auto 100%;
	background-position: top 0 right 0;
	background-repeat: no-repeat;

	color: ${Colors.White};
	display: flex;
	flex-direction: column;
	justify-content: center;

	padding: 20px;

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.posts-number {
		opacity: 0.75;
		color: ${Colors.White};
		margin-top: 8px;
	}

	.cat-description {
		max-width: 90%;
		font-size: 16px !important;
		line-height: 28px !important;
		color: ${Colors.White} !important;
	}

	@media (min-width: ${Media.tabletSm}) {
		height: 340px;
		padding: 35px;
		background-image: url(${bgCatTabl});

		.cat-description {
			max-width: 80%;
		}
	}
	@media (min-width: ${Media.tabletLg}) {
		padding: 35px;
		background-image: url(${bgCatDesk});

		.cat-description {
			max-width: 60%;
		}
	}
	@media (min-width: ${Media.laptop}) {
		padding: 35px;
		margin: 0 auto;

		.cat-description {
			max-width: 60%;
		}
	}
`;

interface Props {
	className?: string;
	name: string;
	count: string;
	description: string;
}

export default function CategoryHeader({
	className,
	name,
	count,
	description,
}: Props): ReactElement {
	return (
		<Wrapper className={className}>
			<div className="container">
				<Title type="hero title">{stripTags(name) || ""}</Title>
				<p className="posts-number">{count || "No"} posts</p>
				<PostExcerpt className="cat-description" type="hero">
					{stripTags(description) === "null"
						? "Blog category"
						: stripTags(description)}
				</PostExcerpt>
			</div>
		</Wrapper>
	);
}
