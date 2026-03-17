"use client"

import Navbar from "@/components/Navbar"
import { useContext } from "react"
import { StudentContext } from "@/context/StudentContext"

export default function FeeRecords(){

  const { students, feeRecords, setFeeRecords } = useContext(StudentContext)

  const months = [
    "Apr","May","Jun","Jul","Aug","Sep",
    "Oct","Nov","Dec","Jan","Feb","Mar"
  ]

  const toggleFee = (studentId, month)=>{

    const key = studentId + "-" + month

    setFeeRecords({
      ...feeRecords,
      [key]: !feeRecords[key]
    })

  }

const printReceipt = (student, month)=>{

  const w = window.open("")

  w.document.write(`

  <html>
  <head>
    <title>Fee Receipt</title>
    <style>
      body{
        font-family: Arial;
        padding: 20px;
      }

      .receipt{
        max-width: 600px;
        margin: auto;
        border: 2px solid black;
        padding: 20px;
      }

      .header{
        text-align: center;
        border-bottom: 2px solid black;
        padding-bottom: 10px;
        margin-bottom: 15px;
      }

      .header h2{
        margin: 0;
      }

      .info{
        margin-bottom: 15px;
      }

      .info p{
        margin: 5px 0;
        font-size: 14px;
      }

      table{
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }

      table, th, td{
        border: 1px solid black;
      }

      th, td{
        padding: 8px;
        text-align: center;
      }

      .footer{
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
      }

      .stamp{
        border: 1px dashed black;
        padding: 10px;
        text-align: center;
        width: 120px;
      }

    </style>
  </head>

  <body>

    <div class="receipt">

      <div class="header">
        <h2>S.N.D. PUBLIC SCHOOL</h2>
        <p>Baghauli, Hardoi</p>
        <h3>Fee Receipt</h3>
      </div>

      <div class="info">
        <p><b>Name:</b> ${student.name}</p>
        <p><b>Class:</b> ${student.class}</p>
        <p><b>Month:</b> ${month}</p>
        <p><b>Date:</b> ${new Date().toLocaleDateString()}</p>
      </div>

      <table>
        <tr>
          <th>Description</th>
          <th>Amount</th>
        </tr>
        <tr>
          <td>Monthly Fee (${month})</td>
          <td>₹${student.monthlyFee}</td>
        </tr>
        <tr>
          <th>Total</th>
          <th>₹${student.monthlyFee}</th>
        </tr>
      </table>

      <div class="footer">
        <div>
          <p>Signature</p>
        </div>

        <div class="stamp">
          School Stamp
        </div>
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
          S.N.D. PUBLIC SCHOOL BAGHAULI (HARDOI)
        </h1>

        <h1 className="text-2xl mb-6">
          Fee Records
        </h1>

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-200">

              <th className="border px-2">Name</th>
              <th className="border px-2">Class</th>

              {months.map((m)=>(
                <th key={m} className="border px-2">{m}</th>
              ))}

            </tr>

          </thead>

          <tbody>

            {students.map((s)=>(

              <tr key={s.id} className="border">

                <td className="border px-2">{s.name}</td>
                <td className="border px-2">{s.class}</td>

                {months.map((m)=>{

                  const key = s.id + "-" + m
                  const paid = feeRecords[key]

                  return(

                    <td key={m} className="border px-2 text-center">

                      <button
                        onClick={()=>toggleFee(s.id, m)}
                        className={`px-2 py-1 rounded text-white ${
                          paid ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {paid ? "Paid" : "Due"}
                      </button>

                      {paid && (
                        <button
                          onClick={()=>printReceipt(s, m)}
                          className="bg-blue-500 text-white px-2 py-1 rounded ml-1"
                        >
                          Print
                        </button>
                      )}

                    </td>

                  )

                })}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}