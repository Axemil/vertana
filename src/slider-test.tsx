import React from "react";
import ReactDOM from "react-dom";
import "./slider.css";
import Slider from "react-slick";

interface Props {}
const App = ({}: Props) => {
	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	return (
		<>
			<h1>Hello!</h1>;
			<Slider {...settings}>
				<div>
					<h3>1</h3>
				</div>
				<div>
					<h3>2</h3>
				</div>
				<div>
					<h3>3</h3>
				</div>
				<div>
					<h3>4</h3>
				</div>
				<div>
					<h3>5</h3>
				</div>
				<div>
					<h3>6</h3>
				</div>
			</Slider>
		</>
	);
};

ReactDOM.render(<App />, document.getElementById("blog-root"));
