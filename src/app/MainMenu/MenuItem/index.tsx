import React, { ReactElement, ReactNode } from "react";
import Fonts from "common/Fonts";
import styled from "styled-components";
import Colors from "common/Colors";
import Media from "common/Media";

const GenericMenuItem = styled.li`
	list-style: none;
	display: block;

	.link {
		padding: 5px 5px;
		text-decoration: none;
		color: ${Colors.Black};
		transition: color 0.3s;
		cursor: pointer;
		display: block;
		white-space: nowrap;
		overflow: hidden;

		&:hover {
			color: ${Colors.Gray700};
		}
	}
`;

const PrimaryMenuItem = styled(GenericMenuItem)`
	font-family: ${Fonts.Bold};
	font-size: 16px;
	line-height: 24px;

	@media (min-width: ${Media.tabletLg}) {
		font-family: ${Fonts.Regular};
	}
`;

const SecondaryMenuItem = styled(GenericMenuItem)`
	font-family: ${Fonts.Regular};
	font-size: 12px;
	line-height: 15px;
`;

export type MenuItemType = "primary" | "secondary";

export interface MenuItemData {
	nested: boolean;
	type: MenuItemType;
	content: string | [];
}

interface Props {
	className?: string;
	/**
	 * Type of menu item, one of: "primary" | "secondary"
	 */
	type: MenuItemType;
	children: ReactNode;
}

export default function MenuItem({
	className,
	type,
	children,
}: Props): ReactElement {
	switch (type) {
		case "primary":
			return (
				<PrimaryMenuItem className={className}>
					<a className="link" href="#">
						{children}
					</a>
				</PrimaryMenuItem>
			);
		case "secondary":
			return (
				<SecondaryMenuItem className={className}>
					<a className="link" href="#">
						{children}
					</a>
				</SecondaryMenuItem>
			);
		default:
			throw new Error("Property 'type' is required");
	}
}
