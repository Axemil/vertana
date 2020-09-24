import React, { ReactElement } from "react";
import styled from "styled-components";

import bgMobile from "assets/svg/bg-blue-mobile.svg";
import bgTabletSm from "assets/svg/bg-blue-tablet-sm.svg";
import Colors from "common/Colors";
import StyledInput from "components/StyledInput";
import Title from "components/Title";
import Fonts from "common/Fonts";
import Media from "common/Media";

const Wrapper = styled.section`
	height: 275px;
	background-image: url(${bgMobile});
	background-size: auto 100%;
	background-repeat: no-repeat;
	display: flex;
	align-items: center;
	justify-content: center;

	@media (min-width: ${Media.tabletSm}) {
		background-image: url(${bgTabletSm});
		height: 255px;
	}

	.container {
		width: 77%;
		text-align: center;

		@media (min-width: ${Media.tabletSm}) {
			margin-top: -14px;
			width: 60%;
		}
		@media (min-width: ${Media.tabletLg}) {
			margin-top: -10px;
			width: 65%;
		}
		@media (min-width: ${Media.laptop}) {
			width: 60%;
		}

		& .title {
			margin-bottom: 10px;
		}

		& .text {
			font-family: ${Fonts.Regular};
			color: ${Colors.White};
			font-size: 14px;
			line-height: 28px;
			margin: 0;
			margin-bottom: 24px;
		}

		& .input {
			@media (min-width: ${Media.tabletSm}) {
				margin: 0 45px;
			}
			@media (min-width: ${Media.tabletLg}) {
				margin: 0 40px;
			}
			@media (min-width: ${Media.laptop}) {
				margin: 0 65px;
			}
		}
	}
`;

interface Props {
	className?: string;
}

export default function Signup({ className }: Props): ReactElement {
	return (
		<Wrapper className={className}>
			<div className="container">
				<Title className="title" type="aside title light">
					Get Cloud Compass Updates
				</Title>
				<p className="text">
					Subscribe to get a monthly digest of all things hybrid-cloud
					management!
				</p>
				<StyledInput
					placeholder="Subscribe now!"
					className="input"
					type="arrow"
				/>
			</div>
		</Wrapper>
	);
}
