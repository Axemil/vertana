import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import { ReactComponent as LogoFacebook } from "assets/svg/logo-facebook.svg";
import { ReactComponent as LogoLinkedin } from "assets/svg/logo-linkedin.svg";
import { ReactComponent as LogoTwitter } from "assets/svg/logo-twitter.svg";
import { ReactComponent as LogoArrow } from "assets/svg/logo-arrow.svg";
import Colors from "common/Colors";
import Media from "common/Media";

const Wrapper = styled.div<Props>`
	display: ${({ orientation }) =>
		orientation === "vertical" ? "none" : "inline-block"};

	@media (min-width: ${Media.laptop}) {
		display: inline-block;
	}

	.container {
		display: ${(props) =>
			props.orientation === "vertical" ? "block" : "flex"};
	}
`;

const ShareButton = styled.a<Props>`
	display: flex;
	background-color: ${Colors.Gray200};
	width: 38px;
	height: 38px;
	border-radius: 999px;
	justify-content: center;
	align-items: center;
	transition: background-color 0.2s ease-in;
	cursor: pointer;

	@media (min-width: ${Media.laptop}) {
		${(props) =>
			props.orientation === "horizontal"
				? `
		width: 38px;
		height: 38px;
		`
				: `
		width: 48px;
		height: 48px;
				`}
	}

	&:not(:last-child) {
		margin: ${({ orientation }) =>
			orientation === "vertical" ? "0 0 10px 0" : "0 8px 0 0"};
	}

	.logo {
		transition: color 0.2s ease-in;
	}

	&:hover {
		background-color: ${Colors.GreenMedium};

		.logo {
			color: ${Colors.White};
		}
	}

	.logo {
		height: 15px;
	}
`;

interface Props {
	className?: string;
	orientation: "vertical" | "horizontal";
	url?: string;
}

export default function Share({
	className,
	orientation,
	url,
}: Props): ReactElement {
	return (
		<Wrapper orientation={orientation} className={className}>
			<div className="container">
				<ShareButton
					href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
					orientation={orientation}
				>
					<LogoFacebook className="logo" />
				</ShareButton>
				<ShareButton
					href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
					orientation={orientation}
				>
					<LogoLinkedin className="logo" />
				</ShareButton>
				<ShareButton
					href={`https://twitter.com/home?status=${url}`}
					orientation={orientation}
				>
					<LogoTwitter className="logo" />
				</ShareButton>
			</div>
		</Wrapper>
	);
}
