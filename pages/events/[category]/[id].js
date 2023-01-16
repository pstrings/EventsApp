import Image from "next/image";
import React from "react";

export const getStaticPaths = async () => {
	const { allEvents } = await import("../../../data/events.json");

	const allPaths = allEvents.map((e) => {
		return {
			params: {
				// This is for the [id] folder
				category: e.city,
				// This is for the [id].js
				id: e.id
			}
		};
	});

	return {
		paths: allPaths,
		fallback: false
	};
};

export const getStaticProps = async (context) => {
	const id = context.params.id;

	const { allEvents } = await import("../../../data/events.json");
	const data = allEvents.find((e) => e.id === id);

	return {
		props: { data }
	};
};

const Event = ({ data }) => {
	const submitFunction = () => {};
	return (
		<>
			<div className="event">
				<h1>{data.title}</h1>
				<Image src={data.image} alt={data.id} width={600} height={200} />
				<p>{data.description}</p>
				<br />
				<br />
				<form onSubmit={submitFunction} className="email_registration">
					<label htmlFor="email">Get registered for the event:</label>
					<input type="email" id="email" placeholder="Enter Email ID" />
					<button type="button">Submit</button>
				</form>
			</div>
		</>
	);
};

export default Event;
