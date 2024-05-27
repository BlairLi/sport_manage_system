import Link from "next/link";

export default function Navbar() {
    return (
        <div className="columns">
            <div className="column">
                <Link href="/">
                    Home
                </Link>
            </div>
            <div className="column">
                <Link href="/Dashboard">
                    Dashboard
                </Link>
            </div>
            <div className="column">
                <Link href="/api/auth/signin?callbackUrl=/">
                    Login
                </Link>
            </div>
        </div>
    );
}