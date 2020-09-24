import React, { ReactElement, ReactNode } from "react";
import Fonts from "common/Fonts";
import styled from "styled-components";

const Wrapper = styled.p<{ emphasized: boolean }>`
	font-family: ${({ emphasized }) => (emphasized ? Fonts.Bold : Fonts.Regular)};
	font-size: 16px;
	line-height: 28px;
	margin: 0;
`;

interface Props {
	className?: string;
	children: ReactNode;
	emphasized?: boolean;
	id?: string;
}

export default function Text({
	className,
	children,
	emphasized,
	id,
}: Props): ReactElement {
	return (
		<Wrapper id={id} emphasized={emphasized} className={className}>
			{children}
		</Wrapper>
	);
}
