import React, { ReactElement } from "react";
import { Helmet } from "react-helmet";
import { OpengraphImage } from "pages/Post";

export interface SEOHeaderProps {
	seoTitle: string;
	metaDesc: string;
	metaRobotsNoindex: string;
	metaRobotsNofollow: string;
	canonical: string;
	opengraphType: string;
	opengraphTitle: string;
	opengraphDescription: string;
	opengraphUrl: string;
	opengraphSiteName: string;
	opengraphPublishedTime: string;
	opengraphImage: OpengraphImage;
	twitterCardType: string;
}

export default function SEOHeader({
	seoTitle,
	metaDesc,
	metaRobotsNoindex,
	metaRobotsNofollow,
	canonical,
	opengraphType,
	opengraphTitle,
	opengraphDescription,
	opengraphUrl,
	opengraphSiteName,
	opengraphPublishedTime,
	opengraphImage,
	twitterCardType,
}: Props): ReactElement {
	return (
		<Helmet>
			<title>{seoTitle}</title>
			<meta name="description" content={metaDesc} />
			<meta
				name="robots"
				content={`${metaRobotsNoindex}, ${metaRobotsNofollow}`}
			/>
			<meta
				name="googlebot"
				content={`${metaRobotsNoindex}, ${metaRobotsNofollow}, max-snippet:-1, max-image-preview:large, max-video-preview:-1`}
			/>
			<meta
				name="bingbot"
				content={`${metaRobotsNoindex}, ${metaRobotsNofollow}, max-snippet:-1, max-image-preview:large, max-video-preview:-1`}
			/>
			<link rel="canonical" href={`${canonical}`} />
			<meta property="og:locale" content="en_US" />
			<meta property="og:type" content={opengraphType} />
			<meta property="og:title" content={opengraphTitle} />
			<meta property="og:description" content={opengraphDescription} />
			<meta property="og:url" content={opengraphUrl} />
			<meta property="og:site_name" content={"test---" + opengraphSiteName} />
			<meta
				property="article:published_time"
				content={opengraphPublishedTime}
			/>
			<meta property="og:image" content={opengraphImage?.mediaItemUrl} />
			<meta name="twitter:card" content={twitterCardType} />
		</Helmet>
	);
}
