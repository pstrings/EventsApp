import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

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
			<Head>
				<title>Events</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<nav>
					<Image src="" alt="" />
					<Link href="/">Home</Link>
					<Link href="/events">Events</Link>
					<Link href="/about-us">About Us</Link>
				</nav>
			</header>
			<main className={styles.main}>
				{data.map((ev) => (
					<Link key={ev.id} href={`/events/${ev.id}`}>
						<Image src={ev.image} alt={ev.title} width={300} height={200} />
						<h2>{ev.title}</h2>
						<p>{ev.description}</p>
					</Link>
				))}
			</main>
		</>
	);
};

export default Home;
