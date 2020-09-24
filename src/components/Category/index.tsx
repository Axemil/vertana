import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import Colors from "common/Colors";
import Fonts from "common/Fonts";

interface Props {
	color: string;
}

const Category = styled.a<Props>`
	display: inline-block;
	padding: 6px 18px;
	font-family: ${Fonts.Bold};
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.13);
	border-radius: 100px;
	font-size: 14px;
	line-height: 22px;
	cursor: pointer;
	text-decoration: none;
	background-color: ${Colors.White};
	transition: background-color 0.2s ease-in, color 0.2s ease-in;

	color: ${(props) => props.color == '#389E38 : Green' ? '#389E38' : props.color};

	&:hover {
		background-color: ${(props) => props.color == '#389E38 : Green' ? '#389E38' : props.color};
		color: ${Colors.White};
	}
`;


export default Category;
