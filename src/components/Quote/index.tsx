import React, { ReactElement } from "react";
import styled from "styled-components";
import Colors from "common/Colors";
import Fonts from "common/Fonts";
import Media from "common/Media";

const Quote = styled.blockquote`
	border-left: 4px solid ${Colors.GreenMedium};
	padding: 0 0 0 40px;
	margin: 0;
	font-family: ${Fonts.Bold};
	font-size: 16px;
	line-height: 28px;

	@media (min-width: ${Media.laptop}) {
		padding: 0 0 0 40px;
		border-left: 5px solid ${Colors.GreenMedium};
	}
`;

export default Quote;
