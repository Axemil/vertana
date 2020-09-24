import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import Fonts from "common/Fonts";
import Colors from "common/Colors";
import { Link, useLocation, useHistory, useParams } from "react-router-dom";

interface ListItemProps {
	isActive: boolean;
	onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
}

const PaginationItemListItem = styled.li<ListItemProps>`
	display: inline-block;
	font-family: ${Fonts.Bold};
	font-size: 14px !important;
	line-height: 28px !important;
	padding: 5px;
	border-radius: 999px;
	box-sizing: border-box;
	width: 40px;
	height: 40px;
	text-align: center;
	margin: 0;
	cursor: pointer;
	background-color: ${({ isActive }) =>
		isActive ? Colors.GreenMedium : Colors.Gray200};
	color: ${Colors.Black};
	transition: color 0.2s ease-in;
`;

const PaginationItemLink = styled.a<ListItemProps>`
	color: ${({ isActive }) => (isActive ? Colors.White : Colors.Black)};
	cursor: pointer;
	display: inline-block;
	&:hover {
		color: ${Colors.GreenMedium};
	}
`;

interface Props {
	children: ReactNode;
	to?: string;
	isActive?: boolean;
	onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
	className?: string;
}

export default function PaginationItem({
	children,
	to,
	isActive,
	onClick,
	className,
}: Props): ReactElement {
	return (
		<PaginationItemListItem
			className={className}
			onClick={onClick}
			isActive={isActive}
		>
			<PaginationItemLink isActive={isActive} href={to}>
				{children}
			</PaginationItemLink>
		</PaginationItemListItem>
	);
}
