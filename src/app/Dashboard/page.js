'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Dashboard() {
  const {data: session} = useSession({
    required: true,
    redirectTo: "/api/auth/signin?callbackUrl=/Dashboard",
  });

  useEffect (() => {
    console.log(session);
  } , [session]);

  return (
    <>
      <div className="section">
        <div className="title">Dashboard</div>
        <div className="subtitle">Overdue Payments</div>
        <div className="subtitle">Cancelled this Week</div>
        <Link href="/schedule">Built Schedule</Link>
      </div>
    </>
  )
}