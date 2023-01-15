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
			<div className="events_page">
				{data.map((ev) => (
					<Link className="card" key={ev.id} href={`/events/${ev.id}`}>
						<Image src={ev.image} alt={ev.title} width={400} height={200} />
						<h2>{ev.title}</h2>
					</Link>
				))}
			</div>
		</>
	);
};

export default EventsPage;
