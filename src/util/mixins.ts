import { keyframes, css } from "styled-components";

export const loadingAnimation = keyframes`
from{

		background-position: 0 0, -100% 0, 0 0;
}
 to {
    background-position: 0 0, 350% 0, 0 0;
  }
`;

export const loaderMixin = () => {
	return css`
		background-repeat: no-repeat;
		background-size: 50%, 100%;
		background-image: linear-gradient(
				to right,
				transparent,
				#eee 50%,
				transparent 100%
			),
			linear-gradient(#ddd, #ddd);
		animation: ${loadingAnimation} 1.5s infinite;
	`;
};
