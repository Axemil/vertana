import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import Fonts from "common/Fonts";
import Colors from "common/Colors";

const Wrapper = styled.a`
	text-decoration: none;
	display: inline-block;
	font-size: 14px;
	line-height: 22px;
	font-family: ${Fonts.Bold};
	border-bottom: 3px solid ${Colors.GreenMedium};
	color: ${Colors.GreenMedium};
	transition: color 0.2s ease-in, border-color 0.2s ease-in;

	&:hover {
		color: ${Colors.GreenDark};
		border-color: ${Colors.GreenDark};
	}
`;

interface Props {
	className?: string;
	url: string;
	children: string | ReactNode;
}

export default function SiteLink({
	className,
	url,
	children,
}: Props): ReactElement {
	return <Wrapper href={url}>{children}</Wrapper>;
}
