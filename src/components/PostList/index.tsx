import React, { ReactElement } from "react";
import styled from "styled-components";
import Fonts from "common/Fonts";

export const PostList = styled.ul`
	list-style: inside;
	padding: 0;
	margin: 0;
`;

export const PostListItem = styled.li`
	font-family: ${Fonts.Regular};
	font-size: 16px;
	line-height: 28px;
	margin: 0;
	padding: 0;
`;
