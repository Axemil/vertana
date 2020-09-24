import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import Colors from "common/Colors";
import Fonts from "common/Fonts";
import { ReactComponent as RightArrow } from "assets/svg/right-arrow.svg";
import SearchInput from "components/SearchInput";
import StyledInput from "components/StyledInput";
import Button from "components/Button";
import Media from "common/Media";
import useMedia from "use-media";
import { useHistory } from "react-router-dom";

declare const VI_BLOG_BASE_URL: string;

const SearchHeaderWrapper = styled.div`
	min-height: 354px;
	background-color: ${Colors.GreenLight};
	padding: 95px 20px 60px 20px;

	& .search-header-container {
		@media (min-width: ${Media.laptop}) {
			width: 1200px;
			margin: 0 auto;
		}
	}

	& .search-input-wrapper {
		display: flex;
	}
`;

const Breadcrumbs = styled.div`
	margin-bottom: 70px;
`;

interface BreadcrumbProps {
	active?: boolean;
}
const Breadcrumb = styled.a<BreadcrumbProps>`
	font-size: 16px;
	font-family: ${Fonts.Bold};
	color: ${({ active }) => (active && Colors.GreenMedium) || Colors.Black};
	cursor: pointer;

	&:hover {
		color: ${Colors.GreenMedium};
	}
`;

const StyledRightArrow = styled(RightArrow)`
	color: ${Colors.Gray600};
	fill: transparent !important;
	height: 10px;
	width: 5px;
	margin: 0 15px;
`;

const SearchHeaderTitle = styled.h1`
	font-family: ${Fonts.Bold};
	color: ${Colors.Black};
	font-size: 30px;
	line-height: 40px !important;
	margin-bottom: 30px;
`;

const TitleSearchTerm = styled.span`
	color: ${Colors.GreenMedium};
	margin-left: 15px;
`;

const StyledSearchInput = styled(StyledInput)`
	flex: 0 1 90%;
	margin-right: 15px;

	@media (min-width: ${Media.tabletLg}) {
		flex: 0 1 60%;
	}
	@media (min-width: ${Media.laptop}) {
		flex: 0 1 50%;
	}
`;

const StyledButton = styled(Button)`
	display: none;
	@media (min-width: ${Media.tabletSm}) {
		display: inline-block;
	}
`;

interface Props {
	previousTerm?: string;
	noPosts?: boolean;
}

export default function Header({ previousTerm, noPosts }: Props): ReactElement {
	const [searchTerm, setSearchTerm] = useState(previousTerm);
	const isTabletSm = useMedia({ maxWidth: Media.tabletSm });
	const history = useHistory();

	const handleChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
		setSearchTerm(e.currentTarget.value);
	};

	const makeSearchRequest = (e: React.SyntheticEvent) => {
		e.preventDefault();
		history.push(`/search?q=${searchTerm}`);
	};

	return (
		<SearchHeaderWrapper>
			<div className="search-header-container">
				<Breadcrumbs>
					<Breadcrumb href="https://virtana.com">Home</Breadcrumb>
					<StyledRightArrow />
					<Breadcrumb href={VI_BLOG_BASE_URL}>Blog</Breadcrumb>
					<StyledRightArrow />
					<Breadcrumb active>Search</Breadcrumb>
				</Breadcrumbs>
				<SearchHeaderTitle>
					{noPosts ? `No posts for the term: ` : `Search results for `}
					<TitleSearchTerm>{previousTerm}</TitleSearchTerm>
				</SearchHeaderTitle>
				<form onSubmit={makeSearchRequest} className="search-input-wrapper">
					<StyledSearchInput
						placeholder="Search by keyword"
						className="sidebar-search"
						type="search"
						showButton={isTabletSm}
						onChange={handleChange}
						value={searchTerm}
						onClick={makeSearchRequest}
					/>
					<StyledButton onClick={makeSearchRequest} type="primary">
						Search
					</StyledButton>
				</form>
			</div>
		</SearchHeaderWrapper>
	);
}
