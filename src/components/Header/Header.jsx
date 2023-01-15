import Image from "next/image";
import Link from "next/link";

const Header = () => {
	return (
		<div>
			<header>
				<nav>
					<Image src="" alt="" />
					<Link href="/">Home</Link>
					<Link href="/events">Events</Link>
					<Link href="/about-us">About Us</Link>
				</nav>
			</header>
		</div>
	);
};

export default Header;
