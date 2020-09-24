import React, { ReactElement } from "react";
import styled from "styled-components";
import Colors from "common/Colors";
import { FooterListData } from "components/FooterList";
import FooterList from "components/FooterList";
import Logo from "components/Logo";
import Fonts from "common/Fonts";
import Terms from "components/Terms";
import Media from "common/Media";

const Wrapper = styled.footer`
	background-color: ${Colors.Black};
	color: ${Colors.White};

	section:first-child {
		border-bottom: 1px solid ${Colors.Gray900};
	}

	.links {
		padding: 84px 20px;

		@media (min-width: ${Media.tabletSm}) {
			padding: 60px 35px 30px 35px;
			display: flex;
			flex-wrap: wrap;
		}
		@media (min-width: ${Media.tabletLg}) {
			padding: 58px 30px 63px 30px;
			justify-content: space-between;
		}
		@media (min-width: ${Media.laptop}) {
			padding: 53px 0 60px 0;
			max-width: 1180px;
			margin: 0 auto;
		}

		.footer-list {
			@media (min-width: ${Media.tabletSm}) {
				width: 33%;
			}
			@media (min-width: ${Media.tabletLg}) {
				width: auto;
				/* width: 20%; */
			}
		}

		.footer-list:not(:last-child) {
			margin-bottom: 45px;

			@media (min-width: ${Media.tabletSm}) {
				margin-bottom: 70px;
			}
			@media (min-width: ${Media.tabletLg}) {
				margin-bottom: 0px;
			}
		}

		.address {
			margin: 0;
			padding: 0;
			font-size: 13px;
			list-style: none;
			margin-top: 20px;

			& li:not(:last-child) {
				margin-bottom: 20px;
			}
		}
	}

	.legal {
		padding: 30px 0px;
		margin: 0 20px;

		@media (min-width: ${Media.tabletSm}) {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 35px;
		}
		@media (min-width: ${Media.tabletLg}) {
			padding: 20px 0;
		}
		@media (min-width: ${Media.laptop}) {
			max-width: 1180px;
			margin: 0 auto;
		}

		.logo {
			display: block;
			height: 20px;
			margin-bottom: 15px;
			color: white;

			@media (min-width: ${Media.tabletSm}) {
				margin-bottom: 0;
			}
		}

		.legal-info-links {
			font-family: ${Fonts.Regular};
			font-size: 11px;
			line-height: 30px;
		}
	}
`;

interface Props {
	className?: string;
	data: FooterListData[];
}

export default function Footer({ data }: Props): ReactElement {
	return (
		<Wrapper>
			<section>
				<div className="links">
					<FooterList
						className="footer-list"
						title={data[0].title}
						items={data[0].items}
					/>
					<FooterList
						className="footer-list"
						title={data[1].title}
						items={data[1].items}
					/>
					<FooterList
						className="footer-list"
						title={data[2].title}
						items={data[2].items}
					/>
					<FooterList
						className="footer-list"
						title={data[3].title}
						items={data[3].items}
					/>
					<div className="footer-list">
						<FooterList title={data[4].title} items={data[4].items} />
						<ul className="address">
							<li>2331 Zanker Road</li>
							<li>San Jose, CA 95131</li>
						</ul>
					</div>
				</div>
			</section>
			<section>
				<div className="legal">
					<Logo link="https://virtana.com" className="logo" />
					<Terms />
				</div>
			</section>
		</Wrapper>
	);
}
