import React, { ReactElement, ReactNode } from "react";
import GlobalStyle from "common/GlobalStyle";

interface Props {
	children: ReactNode;
}

export default function StyleguideWrapper({ children }: Props): ReactElement {
	return (
		<div>
			<GlobalStyle />
			{children}
		</div>
	);
}
