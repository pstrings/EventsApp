import Link from "next/link";
import Image from "next/image";

// Any logs inside the below function will only be visible at server side and not in client browswer.
export const getStaticProps = async () => {
	const { events_categories } = await import("../../data/events.json");

	return {
		props: {
			data: events_categories
		}
	};
};

const EventsPage = ({ data }) => {
	return (
		<>
			<h1>Events Page</h1>
			<div>
				{data.map((ev) => (
					<Link key={ev.id} href={`/events/${ev.id}`}>
						<Image src={ev.image} alt={ev.title} width={300} height={200} />
						<h2>{ev.title}</h2>
					</Link>
				))}
			</div>
		</>
	);
};

export default EventsPage;
