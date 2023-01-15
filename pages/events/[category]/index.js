import Image from "next/image";
import Link from "next/link";

export const getStaticPaths = async () => {
	const { events_categories } = await import("../../../data/events.json");
	const allPaths = events_categories.map((ev) => ({
		params: {
			category: ev.id.toString()
		}
	}));

	return {
		paths: allPaths,
		fallback: false
	};
};

export const getStaticProps = async (context) => {
	const id = context.params.category;
	const { allEvents } = await import("../../../data/events.json");

	const data = allEvents.filter((ev) => ev.city === id);

	return {
		props: { data, pageName: id }
	};
};

const Events = ({ data, pageName }) => {
	return (
		<>
			{/* Making the first character uppercase. */}
			<h1>Events in {pageName.charAt(0).toUpperCase() + pageName.slice(1)}</h1>
			<div>
				{data.map((ev) => (
					<Link key={ev.id} href={`/events/${ev.city}/${ev.id}`}>
						<Image src={ev.image} alt={ev.title} width={300} height={200} />
						<h2>{ev.title}</h2>
						<p>{ev.description}</p>
					</Link>
				))}
			</div>
		</>
	);
};

export default Events;
