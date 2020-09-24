import React, { ReactElement, useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import ebookImgUrl from "assets/img/ebook.jpg";
import Fonts from "common/Fonts";
import SiteLink from "components/SiteLink";
import Media from "common/Media";
import client from "util/WPClient";
import { flatten, isReactSnap, log } from "util/helpers";

interface WrapperProps {
	sticky?: boolean;
	aside?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
	display: flex;
	flex-direction: column;
	min-height: 350px;

	box-shadow: 0px 2px 29px rgba(135, 128, 128, 0.15);

	position: ${({ sticky }) => (sticky ? "sticky" : "static")};

	@media (min-width: 600px) {
		flex-direction: row;
	}

	@media (min-width: ${Media.tabletLg}) {
		display: flex;
		flex-direction: column;
	}

	.img-container {
		max-height: 45%;

		@media (min-width: ${Media.tabletSm}) {
			width: 300px;
		}

		@media (min-width: ${Media.tabletLg}) {
			width: 100%;
			height: 180px;
		}
	}

	.ad-img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.text-container {
		text-align: center;
		padding: 23px 40px 40px 40px;

		@media (min-width: 600px) {
			text-align: left;
		}

		@media (min-width: ${Media.tabletSm}) {
			padding: 22px 20px 40px 18px;
		}
		@media (min-width: ${Media.tabletLg}) {
			text-align: center;
		}
	}

	.title {
		font-family: ${Fonts.Bold};
		font-size: 20px;
		line-height: 32px;
		margin: 0;
		margin-bottom: 8px;

		@media (min-width: ${Media.tabletSm}) {
			margin-bottom: 5px;
		}
	}

	.text {
		font-family: ${Fonts.Regular};
		font-size: 14px;
		line-height: 21px;
		margin: 0;
		margin-bottom: 16px;
	}
`;

export interface MainPageDataAPIResponse {
	acf: {
		cta_title: string;
		cta_text: string;
		cta_link: string;
		cta_link_text: string;
		cta_image: {
			url: string;
		};
	};
}

interface Props {
	className?: string;
	aside?: boolean;
	sticky?: boolean;
}

export default function Ad({ sticky, className, aside }: Props): ReactElement {
	const [imageURL, setImageURL] = useState<string>();
	const [title, setTitle] = useState<string>();
	const [text, setText] = useState<string>();
	const [link, setLink] = useState<string>();
	const [linkText, setLinkText] = useState<string>();

	useEffect(() => {
		client
			.getMainPage()
			.then(
				([
					{
						acf: {
							cta_image: { url: acfImageUrl },
							cta_link,
							cta_link_text,
							cta_text,
							cta_title,
						},
					},
				]) => {
					if (acfImageUrl) {
						setImageURL(acfImageUrl);
						setTitle(cta_title);
						setText(cta_text);
						setLink(cta_link);
						setLinkText(cta_link_text);
					}
				},
			)
			.catch((e) => {
				log("Ad widget image not available");
			});
	}, []);

	return imageURL ? (
		<Wrapper sticky={sticky} aside={aside} className={className}>
			<div className="img-container">
				<img className="ad-img" src={imageURL} />
			</div>
			<div className="text-container">
				<h3 className="title">{title}</h3>
				<p className="text">{text}</p>
				<SiteLink url={link}>{linkText}</SiteLink>
			</div>
		</Wrapper>
	) : null;
}
