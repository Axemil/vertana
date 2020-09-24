import React, { ReactElement } from "react";
import { PageType } from "typings/app-types";
import styled from "styled-components";
import Colors from "common/Colors";
import Fonts from "common/Fonts";

const NoDataWrapper = styled.div`
	min-height: 600px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const NoDataTitle = styled.h1`
	background-color: ${Colors.Gray700};
	font-family: ${Fonts.Bold};
`;

interface Props {
	items: string;
}

export default function NoData({ items }: Props): ReactElement {
	return (
		<NoDataWrapper>
			<NoDataTitle>{`No ${items} have been found`}</NoDataTitle>
		</NoDataWrapper>
	);
}
