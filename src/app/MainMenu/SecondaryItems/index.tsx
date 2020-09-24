import React, { ReactElement } from "react";
import styled from "styled-components";
import MenuItem, { MenuItemData } from "app/MainMenu/MenuItem";

const Wrapper = styled.div`
	display: flex;
	align-items: center;

	.secondary-item {
		margin-right: 5px;
	}
`;

interface Props {
	items: MenuItemData[];
	className?: string;
}

export default function SecondaryItems({
	className,
	items,
}: Props): ReactElement {
	return (
		<Wrapper className={className}>
			{items.map((item) => (
				<MenuItem className="secondary-item" type="secondary">
					{item.content}
				</MenuItem>
			))}
		</Wrapper>
	);
}
