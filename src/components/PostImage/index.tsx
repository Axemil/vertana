import React, { ReactElement } from "react";
import styled from "styled-components";

const Wrapper = styled.figure`
	display: inline-block;
	width: 100%;
	margin: 0;
	padding: 0;

	.image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.caption {
	}
`;

interface Props {
	link: string;
	caption?: string;
	className?: string;
}

export default function PostImage({
	className,
	link,
	caption,
}: Props): ReactElement {
	return (
		<Wrapper className={className}>
			<img className="image" src={link} />
			<figcaption className="visually-hidden">{caption}</figcaption>
		</Wrapper>
	);
}
