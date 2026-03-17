"use client"

import Navbar from "@/components/Navbar"
import { useContext } from "react"
import { StudentContext } from "@/context/StudentContext"

export default function FeeRecords(){

  const {
    students,
    feeRecords,
    setFeeRecords,
    getCurrentClass,
    getCurrentSessionYear
  } = useContext(StudentContext)

  const months = [
    "Apr","May","Jun","Jul","Aug","Sep",
    "Oct","Nov","Dec","Jan","Feb","Mar"
  ]

  // ✅ Exam Fees
  const examFees = {
    Sep: 200,
    Dec: 200,
    Mar: 200
  }

  const sessionYear = getCurrentSessionYear()

  // ✅ Toggle Fee
  const toggleFee = (studentId, month)=>{

    const key = `${studentId}-${sessionYear}-${month}`

    setFeeRecords((prev)=>({
      ...prev,
      [key]: !prev[key]
    }))
  }

  // ✅ Print Receipt
  const printReceipt = (student, month)=>{

    const currentClass = getCurrentClass(student)

    const examAmount = examFees[month] || 0
    const total = Number(student.monthlyFee) + examAmount

    const w = window.open("")

    w.document.write(`

    <html>
    <head>
      <title>Fee Receipt</title>
      <style>
        body{font-family: Arial;padding: 20px;}
        .receipt{max-width: 600px;margin: auto;border: 2px solid black;padding: 20px;}
        .header{text-align: center;border-bottom: 2px solid black;margin-bottom: 15px;}
        table{width: 100%;border-collapse: collapse;margin-top: 10px;}
        table, th, td{border: 1px solid black;}
        th, td{padding: 8px;text-align: center;}
        .footer{margin-top: 30px;display:flex;justify-content:space-between;}
      </style>
    </head>

    <body>

      <div class="receipt">

        <div class="header">
          <h2>S.N.D. PUBLIC SCHOOL</h2>
          <p>Baghauli, Hardoi</p>
          <h3>Fee Receipt (${sessionYear}-${sessionYear+1})</h3>
        </div>

        <p><b>Name:</b> ${student.name}</p>
        <p><b>Class:</b> ${currentClass}</p>
        <p><b>Month:</b> ${month}</p>
        <p><b>Date:</b> ${new Date().toLocaleDateString()}</p>

        <table>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>

          <tr>
            <td>Monthly Fee (${month})</td>
            <td>₹${student.monthlyFee}</td>
          </tr>

          ${examAmount ? `
          <tr style="background:#ffeaa7;">
            <td><b>Exam Fee (${month})</b></td>
            <td><b>₹${examAmount}</b></td>
          </tr>` : ""}

          <tr>
            <th>Total</th>
            <th>₹${total}</th>
          </tr>

        </table>

        <div class="footer">
          <div>Signature</div>
          <div>School Stamp</div>
        </div>

      </div>

    </body>
    </html>
    `)

    w.document.close()
    w.print()
  }

  return(

    <div>

      <Navbar/>

      <div className="p-8">

        <h1 className="text-2xl mb-6">
          Fee Records ({sessionYear}-{sessionYear+1})
        </h1>

        <table className="w-full border">

          <thead>
            <tr>
              <th className="border px-2">Name</th>
              <th className="border px-2">Class</th>

              {months.map((m)=>(
                <th key={m} className="border px-2">{m}</th>
              ))}
            </tr>
          </thead>

          <tbody>

            {students.map((s)=>{

              const currentClass = getCurrentClass(s)

              return(
                <tr key={s.id}>

                  <td className="border px-2">{s.name}</td>
                  <td className="border px-2">{currentClass}</td>

                  {months.map((m)=>{

                    const key = `${s.id}-${sessionYear}-${m}`
                    const paid = feeRecords[key]

                    return(
                      <td key={m} className="border text-center">

                        <button
                          onClick={()=>toggleFee(s.id, m)}
                          className={`px-2 py-1 rounded text-white ${
                            paid ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {paid ? "Paid" : "Due"}
                        </button>

                        {paid && (
                          <div className="text-xs mt-1">

                            <div>₹{s.monthlyFee}</div>

                            {examFees[m] && (
                              <div className="text-yellow-300">
                                +₹{examFees[m]} Exam
                              </div>
                            )}

                            <button
                              onClick={()=>printReceipt(s, m)}
                              className="bg-blue-500 text-white px-2 py-1 rounded mt-1"
                            >
                              Print
                            </button>

                          </div>
                        )}

                      </td>
                    )
                  })}

                </tr>
              )
            })}

          </tbody>

        </table>

      </div>

    </div>

  )
}