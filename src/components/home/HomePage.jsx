import Image from "next/image";
import Link from "next/link";

const HomePage = ({ data }) => {
	return (
		<div>
			<main>
				{data.map((ev) => (
					<Link key={ev.id} href={`/events/${ev.id}`}>
						<Image src={ev.image} alt={ev.title} width={300} height={200} />
						<h2>{ev.title}</h2>
						<p>{ev.description}</p>
					</Link>
				))}
			</main>
		</div>
	);
};

export default HomePage;
