import { gql } from "apollo-boost";

export const POST_DATA_FRAGMENT = gql`
	fragment postData on Post {
		id
		title
		excerpt
		slug
		timeToRead
		date
		author {
			name
			slug
		}
		categories(first: 1) {
			edges {
				node {
					name
					slug
				}
			}
		}
		featuredImage {
			mediaDetails {
				sizes {
					sourceUrl
					name
				}
			}
		}
	}
`;

export const NEWS_DATA_FRAGMENT = gql`
	fragment newsData on NewsAndEvent {
		id
		title
		excerpt
		slug
		timeToRead
		date
		author {
			name
			slug
		}
		newsAndEventsCategories(first: 1) {
			edges {
				node {
					name
					slug
				}
			}
		}
		featuredImage {
			mediaDetails {
				sizes {
					sourceUrl
					name
				}
			}
		}
	}
`;
