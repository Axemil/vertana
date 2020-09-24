import React, { ReactElement } from "react";
import styled from "styled-components";

import Fonts from "common/Fonts";
import Colors from "common/Colors";
import { PostAuthorData } from "pages/Post";
import { useQuery } from "@apollo/react-hooks";

const Wrapper = styled.div`
	display: inline-block;

	& > .container {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: 25px 25px;
		column-gap: 14px;
		row-gap: 5px;

		.picture {
			display: block;
			width: 50px;
			height: 50px;
			border-radius: 999px;
			grid-row: 1 / 2;
			grid-column: 1;
		}

		.name {
			font-family: ${Fonts.Bold};
			font-size: 16px;
			line-height: 28px;
			grid-row: 1;
			grid-column: 2;
		}

		.title {
			font-family: ${Fonts.Regular};
			font-size: 14px;
			line-height: 24px;
			color: ${Colors.Gray700};
			grid-row: 2;
			grid-column: 2;
		}
	}
`;

interface Props {
	className?: string;
	name: string;
	shortDescription: string;
	avatar: string;
}

export default function Author({
	className,
	name,
	shortDescription,
	avatar,
}: Props): ReactElement {
	return (
		<Wrapper className={className}>
			<div className="container">
				<img className="picture" src={avatar} />
				<div className="name">{(name && name) || ""}</div>
				<div className="title">
					{(shortDescription && shortDescription) || ""}
				</div>
			</div>
		</Wrapper>
	);
}
