import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import Colors from "common/Colors";
import Fonts from "common/Fonts";
import Media from "common/Media";

type Titles =
	| "card title"
	| "post title"
	| "hero title"
	| "section title"
	| "section subtitle"
	| "aside title"
	| "aside title light";

const CardTitle = styled.h2`
	font-family: ${Fonts.Bold};
	font-size: 20px !important;
	line-height: 32px !important;
	color: ${Colors.Black};
	margin: 0;

	@media (min-width: ${Media.laptop}) {
		font-size: 24px !important;
		line-height: 36px !important;
	}
`;

const HeroTitle = styled.h2`
	font-family: ${Fonts.Bold} !important;
	font-size: 30px !important;
	line-height: 40px !important;
	color: ${Colors.White};
	margin: 0;

	@media (min-width: ${Media.tabletLg}) {
		font-size: 40px;
		line-height: 56px;
	}
`;

const PostTitle = styled.h1`
	font-family: ${Fonts.Bold};
	font-size: 30px;
	line-height: 40px;
	color: ${Colors.White};
	margin: 0;

	@media (min-width: ${Media.tabletLg}) {
		font-size: 40px;
		line-height: 56px;
	}
`;

const SectionTitle = styled.h2`
	font-family: ${Fonts.Bold};
	font-size: 30px;
	line-height: 40px;
	color: ${Colors.Black};
	margin: 0;

	@media (min-width: ${Media.tabletLg}) {
		font-size: 40px;
		line-height: 56px;
	}
`;

const SectionSubTitle = styled.h3`
	font-family: ${Fonts.Bold};
	font-size: 26px;
	line-height: 44px;
	color: ${Colors.Black};
	margin: 0;
	padding: 0;
`;

const AsideTitle = styled.h2`
	font-family: ${Fonts.Bold};
	font-size: 20px !important;
	line-height: 32px !important;
	color: ${Colors.Black};
	margin: 0;

	@media (min-width: ${Media.laptop}) {
		font-size: 24px;
		line-height: 36px;
	}
`;

const AsideTitleLight = styled.h2`
	font-family: ${Fonts.Bold};
	font-size: 20px;
	line-height: 32px;
	color: ${Colors.White};
	margin: 0;

	@media (min-width: ${Media.laptop}) {
		font-size: 24px;
		line-height: 36px;
	}
`;

interface Props {
	/**
	 * Type of the header, one of: | "post title" | "hero title" | "section title" | "section subtitle" | "aside title" | "aside title light"
	 */
	type: Titles;
	children: React.ReactNode;
	className?: string;
	id?: string;
}

export default function Title({
	type = "section title",
	children,
	className,
	id,
}: Props): ReactElement {
	switch (type) {
		case "card title":
			return (
				<CardTitle data-element="title" id={id} className={className}>
					{children}
				</CardTitle>
			);
		case "post title":
			return (
				<PostTitle id={id} className={className}>
					{children}
				</PostTitle>
			);
		case "hero title":
			return (
				<HeroTitle id={id} className={className}>
					{children}
				</HeroTitle>
			);
		case "section title":
			return (
				<SectionTitle id={id} className={className}>
					{children}
				</SectionTitle>
			);
		case "section subtitle":
			return (
				<SectionSubTitle id={id} className={className}>
					{children}
				</SectionSubTitle>
			);
		case "aside title":
			return (
				<AsideTitle id={id} className={className}>
					{children}
				</AsideTitle>
			);
		case "aside title light":
			return (
				<AsideTitleLight id={id} className={className}>
					{children}
				</AsideTitleLight>
			);
		default:
			throw new Error("Set title type property");
	}
}
