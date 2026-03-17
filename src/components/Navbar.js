import Link from "next/link"
export default function Navbar() {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">
        S.N.D. Fee Management System
      </h1>
      <h3>Session - 2026-27</h3>
      <div className="flex gap-6">
        <Link href="/">Dashboard</Link>
        <Link href="/students">Add Students</Link>
        <Link href="/feerecords">Fee Records</Link>
        <Link href="/reports">Reports</Link>
      </div>
    </div>
  )
}