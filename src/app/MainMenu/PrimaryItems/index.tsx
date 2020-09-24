import React, { ReactElement } from "react";
import styled from "styled-components";
import MenuItem, { MenuItemData } from "app/MainMenu/MenuItem";

const Wrapper = styled.div`
	display: flex;
	align-items: center;

	.primary-item {
		margin-right: 15px;
	}
`;

interface Props {
	items: MenuItemData[];
	className?: string;
}

export default function PrimaryItems({
	className,
	items,
}: Props): ReactElement {
	return (
		<Wrapper className={className}>
			{items.map((item) => (
				<MenuItem className="primary-item" type="primary">
					{item.content}
				</MenuItem>
			))}
		</Wrapper>
	);
}
