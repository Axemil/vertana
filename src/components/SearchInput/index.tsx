import React, { ReactElement } from "react";
import styled from "styled-components";
import Colors from "common/Colors";
import Fonts from "common/Fonts";
import searchIconUrl, {
	ReactComponent as SearchIcon,
} from "assets/svg/search.svg";
import SearchButton from "components/SearchButton";
import Media from "common/Media";

const Wrapper = styled.div`
	width: 100%;
	box-sizing: border-box;
	border: 2px solid #f0f1ef;
	border-radius: 3px;
	display: flex;
	align-items: center;

	.input {
		flex: 1;
		font-size: 12px;
		font-family: ${Fonts.Regular};
		padding: 13px 15px 13px 15px;
		border: none;
		height: 100%;

		@media (min-width: ${Media.laptop}) {
			display: none;
		}
	}

	.searchButton {
		padding: 0 10px;
	}
`;

interface Props {
	className?: string;
	style?: {};
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function SearchInput({
	className,
	style,
	onClick,
	...rest
}: Props): ReactElement {
	return (
		<Wrapper className={className} style={style}>
			<input {...rest} className="input" type="text" />
			<SearchButton
				onClick={onClick}
				className="searchButton"
				toggleIcon={true}
			/>
		</Wrapper>
	);
}
