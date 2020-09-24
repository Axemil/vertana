import React, { ReactElement } from "react";
import styled from "styled-components";
import cx from "classnames";

import Logo from "components/Logo";
import Colors from "common/Colors";
import BurgerButton from "components/BurgerButton";
import Media from "common/Media";

import menuItems from "app/MainMenu/data";
import PrimaryItems from "./PrimaryItems";
import SecondaryItems from "./SecondaryItems";
import SearchButton from "components/SearchButton";
import Button from "components/Button";

const Sticky = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 999;
	background-color: ${Colors.White};
`;

const MainMenuWrapper = styled.div`
	height: 67px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 20px;
	background-color: ${Colors.White};

	@media (min-width: ${Media.tabletSm}) {
		margin: 0 35px;
	}
	@media (min-width: ${Media.tabletLg}) {
		height: 97px;
		margin: 0 30px;
	}
	@media (min-width: ${Media.laptop}) {
		width: 1180px;
		margin: 0 auto;
	}

	.search-button {
		width: 18px;
		height: 24px;
		margin-left: 15px;
		flex-shrink: 0;
	}

	.cta-button {
		margin-left: 15px;
		flex-shrink: 0;
	}

	.burger-button {
		margin-left: auto;
		display: none;
		@media (max-width: ${Media.laptop}) {
			display: flex;
		}
	}
`;

const MainMenuLogo = styled(Logo)`
	display: block;
	width: 120px;
	height: 23px;
	margin-right: 40px;
	color: ${Colors.Black};

	@media (min-width: ${Media.tabletLg}) {
		width: 140px;
		height: 26px;
	}
`;

const MainMenuNavigation = styled.nav`
	display: none;
	@media (min-width: ${Media.laptop}) {
		display: flex;
		align-items: center;
		flex-grow: 1;
	}
`;

const MainMenuPrimaryItems = styled(PrimaryItems)``;

const MainMenuSecondaryItems = styled(SecondaryItems)`
	margin-left: auto;
`;

const MainMenuSearchButton = styled(SearchButton)`
	margin-left: 22px;
`;

const MainMenuCTAButton = styled(Button)`
	margin-left: 22px;
`;

const MainMenuBurgerButton = styled(BurgerButton)`
	display: flex;
	margin-left: auto;
	@media (min-width: ${Media.laptop}) {
		display: none;
	}
`;

interface Props {
	className?: string;
}

const primaryItems = menuItems.filter((item) => item.type === "primary");
const secondaryItems = menuItems.filter((item) => item.type === "secondary");

function MainMenu({ className }: Props): ReactElement {
	return (
		<Sticky>
			<MainMenuWrapper>
				<MainMenuLogo link="https://virtana-wip.firebaseapp.com" />
				<MainMenuNavigation>
					<MainMenuPrimaryItems items={primaryItems} />
					<MainMenuSecondaryItems items={secondaryItems} />
					<MainMenuSearchButton />
					<MainMenuCTAButton type="secondary">
						Start Free Trial
					</MainMenuCTAButton>
				</MainMenuNavigation>
				<MainMenuBurgerButton />
			</MainMenuWrapper>
		</Sticky>
	);
}

export default MainMenu;
