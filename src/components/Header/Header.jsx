import Image from "next/image";
import Link from "next/link";

const Header = () => {
	return (
		<div>
			<header>
				<div>
					<div className="topNav">
						<Image
							src={"/images/logo_black.png"}
							alt="logo"
							width={50}
							height={50}
						/>
						<nav>
							<ul>
								<li>
									<Link href="/">Home</Link>
								</li>
								<li>
									<Link href="/events">Events</Link>
								</li>
								<li>
									<Link href="/about-us">About Us</Link>
								</li>
							</ul>
						</nav>
					</div>
					<h1>Events App</h1>
				</div>
			</header>
		</div>
	);
};

export default Header;
