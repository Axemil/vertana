import React, { ReactElement } from "react";
import styled from "styled-components";
import Fonts from "common/Fonts";
import Colors from "common/Colors";

const Hero = styled.p`
	font-family: ${Fonts.Regular};
	font-size: 16px;
	line-height: 28px;
	color: ${Colors.White};
	margin: 0;
`;

const Card = styled.p`
	font-family: ${Fonts.Regular};
	font-size: 14px;
	line-height: 22px;
	color: ${Colors.Black};
	margin: 0;
`;

interface Props {
	children: string;
	className?: string;
	type: "hero" | "card";
}

export default function PostExcerpt({
	className,
	children,
	type,
}: Props): ReactElement {
	switch (type) {
		case "hero":
			return <Hero className={className}>{children}</Hero>;
		case "card":
			return <Card className={className}>{children}</Card>;
	}
}
