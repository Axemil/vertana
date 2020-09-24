import React, { ReactElement } from "react";
import { PageType } from "typings/app-types";
import styled from "styled-components";
import Colors from "common/Colors";
import Fonts from "common/Fonts";

const LoadingDataWrapper = styled.div`
	min-height: 600px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoadingDataTitle = styled.h2`
	color: ${Colors.Gray700};
	font-family: ${Fonts.Bold};
`;

const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	/* background-color: grey; */
	.lds-ring {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 64px;
		height: 64px;
		margin: 8px;
		border: 8px solid grey;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: grey transparent transparent transparent;
	}
	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

interface Props {
	items: string;
}

export default function LoadingData({ items }: Props): ReactElement {
	return (
		<LoadingDataWrapper>
			<InnerWrapper>
				<LoadingDataTitle>{`Loading ${items} ...`}</LoadingDataTitle>
				<div className="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</InnerWrapper>
		</LoadingDataWrapper>
	);
}