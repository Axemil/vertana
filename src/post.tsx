import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
//https://github.com/geelen/react-snapshot/issues/98#issuecomment-446182084
import "./setupTests.js";

import React, { useReducer, useEffect, useLayoutEffect } from "react";
import { render } from "react-dom";

import GlobalStyle from "common/GlobalStyle";
import AppContext from "util/AppContext";
import { reducer, initialState, getPost } from "util/reducer";
import Post from "pages/Post";
import { currentSlug, isReactSnap, flatten } from "util/helpers";
import { savePost } from "util/actions";
import client from "util/gql-client";
import { ApolloProvider } from "@apollo/react-hooks";

type Props = {};

function App({}: Props) {
	const slug = currentSlug();
	// useLayoutEffect(() => {
	// 	if (!isReactSnap()) {
	// 		const styles = document.getElementById("prerendered-styles");
	// 		styles.parentNode.removeChild(styles);
	// 	}
	// }, []);

	return (
		<>
			<GlobalStyle />
			<ApolloProvider client={client}>
				<Post slug={slug} />
			</ApolloProvider>
		</>
	);
}

const rootElement = document.getElementById("blog-root");

render(<App />, rootElement);
