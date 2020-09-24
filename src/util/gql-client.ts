import ApolloClient, { InMemoryCache } from "apollo-boost";

declare const VI_GRAPHQL_BASE_URL: string;
declare const VI_BLOG_DEBUG_MODE: string;

if (VI_BLOG_DEBUG_MODE) {
	console.log("GraphQL API URL: ", VI_GRAPHQL_BASE_URL);
}

export default new ApolloClient({
	uri: VI_GRAPHQL_BASE_URL,
	cache: new InMemoryCache(),
});
