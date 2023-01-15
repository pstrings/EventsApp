import Layout from "../src/components/Layout/Layout";
import "../styles/globals.css";
import "../styles/general.sass";

export default function App({ Component, pageProps }) {
	return (
		<>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
