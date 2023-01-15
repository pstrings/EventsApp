import HomePage from "../src/components/home/HomePage";

// Should be used for data that is fetched at request time only.
export const getServerSideProps = async () => {
	const { events_categories } = await import("../data/events.json");

	return {
		props: {
			data: events_categories
		}
	};
};

const Home = ({ data }) => {
	return (
		<>
			<HomePage data={data} />
		</>
	);
};

export default Home;
