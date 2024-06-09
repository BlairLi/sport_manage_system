'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import AuthProvider from "../Context/AuthProvider";

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
      <AuthProvider>
        <div className="columns is-vcentered">
          <aside className="menu column">
            <p className="menu-label">General</p>
            <ul className="menu-list">
              <li><Link href="/Schedule">Built Schedule</Link></li>
              <li><Link href="/Registration">Registration Manager</Link></li>
              <li><Link href="/Coach">Coach List</Link></li>
              <li><Link href="/Payroll">Payroll</Link></li>
            </ul>
            
          </aside>
          <div className="section column is-10">
            <div className="title">Dashboard</div>
            <div className="subtitle">Overdue Payments</div>
            <div className="subtitle">Cancelled this Week</div>
          </div>
        </div>
      </AuthProvider>
    </>
  )
}