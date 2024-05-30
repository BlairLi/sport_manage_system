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
      <div className="columns is-vcentered">
        <aside className="menu column">
          <p className="menu-label">General</p>
          <ul className="menu-list">
            <li><a href="/Schedule">Built Schedule</a></li>
            <li><a href="/Registration">Registration Manager</a></li>
          </ul>
          
        </aside>
        <div className="section column is-10">
          <div className="title">Dashboard</div>
          <div className="subtitle">Overdue Payments</div>
          <div className="subtitle">Cancelled this Week</div>
        </div>
      </div>
    </>
  )
}