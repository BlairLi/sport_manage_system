import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
// TODO ADMIN (home page)

export default async function Navbar() {
    const session = await getServerSession(options)

    return (
        <nav className="navbar is-link" role="navigation" aria-label="main navigation">

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    {/* TODO: integration */}
                    {/* <a className="navbar-item" href="/"> */}
                    <a className="navbar-item" href="http://localhost:5173">
                        Home
                    </a>

                    <a className="navbar-item" href="/Dashboard">
                        Admin
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            More
                        </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                About
                            </a>
                            <a className="navbar-item">
                                Contact
                            </a>
                            <hr className="navbar-divider" />
                            <a className="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {!session ? <a className="button is-light" href="/api/auth/signin?callbackUrl=/">
                                Login
                            </a> :
                                <a className="button is-light" href="/api/auth/signout?callbackUrl=/">
                                    Sign out
                                </a>}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}