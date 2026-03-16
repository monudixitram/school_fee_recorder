"use client"

import Navbar from "@/components/Navbar"
import { useContext, useState, useEffect } from "react"
import { StudentContext } from "@/context/StudentContext"

export default function FeeRecords() {
  const { students } = useContext(StudentContext)

  const months = [
    "April","May","June","July","August","September",
    "October","November","December","January","February","March"
  ]

  const [fees, setFees] = useState({})

  // Load fees from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("fees")
    if (saved) setFees(JSON.parse(saved))
  }, [])

  // Save fees to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem("fees", JSON.stringify(fees))
  }, [fees])

  const toggleFee = (student, month) => {
    const key = student.id + "-" + month
    const paid = fees[key]

    setFees({
      ...fees,
      [key]: !paid
    })
  }

  const getPaidAmount = (studentId) => {
    let total = 0
    months.forEach(m => {
      const key = studentId + "-" + m
      if (fees[key]) total++
    })
    return total
  }

  const printReceipt = (student) => {
    const paidMonths = months.filter(m => fees[student.id + "-" + m])
    const totalPaid = paidMonths.length * Number(student.monthlyFee)
    const receipt = `
School Fee Receipt

Student : ${student.name}
Class : ${student.class}

Paid Months:
${paidMonths.join(", ")}

Amount Paid : ₹${totalPaid}
`
    const win = window.open("", "", "width=600,height=600")
    win.document.write("<pre>" + receipt + "</pre>")
    win.print()
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Fee Records</h1>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700">
            <thead>
              <tr className="border-b border-gray-600">
                <th>Name</th>
                <th>Class</th>
                <th>Monthly Fee</th>
                {months.map(m => <th key={m}>{m}</th>)}
                <th>Pending</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const paidMonths = getPaidAmount(s.id)
                const pending = (12 - paidMonths) * Number(s.monthlyFee)
                return (
                  <tr key={s.id} className="border-b border-gray-700">
                    <td>{s.name}</td>
                    <td>{s.class}</td>
                    <td>₹{s.monthlyFee}</td>
                    {months.map(m => {
                      const key = s.id + "-" + m
                      const paid = fees[key]
                      return (
                        <td key={m}>
                          <button
                            onClick={() => toggleFee(s, m)}
                            className={`px-2 py-1 rounded text-sm ${paid ? "bg-green-500" : "bg-red-500"}`}
                          >
                            {paid ? "Paid" : "Due"}
                          </button>
                        </td>
                      )
                    })}
                    <td className="text-red-400">₹{pending}</td>
                    <td>
                      <button
                        onClick={() => printReceipt(s)}
                        className="bg-blue-500 px-3 py-1 rounded"
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}