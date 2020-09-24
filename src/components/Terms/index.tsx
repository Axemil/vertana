import React, { ReactElement } from "react";
import styled from "styled-components";
import Fonts from "common/Fonts";
import Colors from "common/Colors";

const Wrapper = styled.p`
	font-family: ${Fonts.Regular};
	color: ${Colors.White};
	font-size: 11px;
	line-height: 30px;
	margin: 0;

	a {
		text-decoration: none;
		color: ${Colors.White};
	}

	.dash {
		margin: 0 10px;
	}
`;

interface Props {
	className?: string;
}

export default function Terms({ className }: Props): ReactElement {
	return (
		<Wrapper className={className}>
			<a href="#">Privacy</a>
			<span className="dash">|</span>
			<a href="#">Legal Notices</a>
			<span className="dash">|</span>
			<a href="#">Contacts & Terms</a>
			<span className="dash">|</span>
			<a href="#">&copy; 2020 Virtana</a>
		</Wrapper>
	);
}
