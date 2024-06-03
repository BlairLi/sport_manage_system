import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Link from "next/link";


export default async function Home() {
  const session = await getServerSession(options)

  return (
    <>
      <div className="">
        <div className="section">
          <div className="title">Welcome to the home page!</div>
        </div>
        <div className="column">
          {session ? (
            <div className="columns">
              <div className="column">
                You are logged in as {session.user.name}
              </div>
            </div>
          ) : (
            <div className="columns">
              <div className="column">
                You are not logged in! 
              </div>
            </div>
          )
          }
        </div>
      </div>

    </>
  );
}