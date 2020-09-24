import React, { ReactElement } from "react";
import { ReactComponent as LogoSvg } from "assets/svg/logo.svg";
import styled from "styled-components";

const StyledLink = styled.a`
	display: block;

	.logo {
		height: 100%;
		display: block;
	}
`;

interface Props {
	className?: string;
	link?: string;
}

function Logo({ link, className }: Props): ReactElement {
	return (
		<StyledLink className={className} href={link}>
			<LogoSvg className="logo" />
		</StyledLink>
	);
}

export default Logo;
