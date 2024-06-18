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
        <div className="" style={{height:"100%", display:"flex"}}>
          <aside className="menu column has-background-link" style={{height:"100%", border: "1px solid black", padding: '20px'}}>
            <p className="has-text-primary-100">General</p>
            <ul className="" >
              <li><Link className="has-text-primary-100" href="/Schedule">Built Schedule</Link></li>
              <li><Link className="has-text-primary-100" href="/Registration">Registration Manager</Link></li>
              <li><Link className="has-text-primary-100" href="/Coach">Coach List</Link></li>
              <li><Link className="has-text-primary-100" href="/Payroll">Payroll</Link></li>
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