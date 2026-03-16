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

  const toggleFee = (studentId,month)=>{

    const key = studentId + "-" + month

    setFeeRecords({

      ...feeRecords,
      [key]:!feeRecords[key]

    })

  }

  const printReceipt = (student)=>{

    const w = window.open("")

    w.document.write(`

      <h2>School Fee Receipt</h2>

      <p>Name : ${student.name}</p>
      <p>Class : ${student.class}</p>
      <p>Monthly Fee : ₹${student.monthlyFee}</p>

      <p>Date : ${new Date().toLocaleDateString()}</p>

      <br/>
      <p>Signature</p>

    `)

    w.print()

  }

  return(

    <div>

      <Navbar/>

      <div className="p-8">

        <h1 className="text-2xl mb-6">
          Fee Records
        </h1>

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-200">

              <th>Name</th>
              <th>Class</th>

              {months.map((m)=>(
                <th key={m}>{m}</th>
              ))}

              <th>Receipt</th>

            </tr>

          </thead>

          <tbody>

            {students.map((s)=>(

              <tr key={s.id} className="border">

                <td>{s.name}</td>
                <td>{s.class}</td>

                {months.map((m)=>{

                  const key = s.id + "-" + m
                  const paid = feeRecords[key]

                  return(

                    <td key={m}>

                      <button
                        onClick={()=>toggleFee(s.id,m)}
                        className={`px-2 py-1 rounded text-white ${
                          paid ? "bg-green-500" : "bg-red-500"
                        }`}
                      >

                        {paid ? "Paid" : "Due"}

                      </button>

                    </td>

                  )

                })}

                <td>

                  <button
                    onClick={()=>printReceipt(s)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Print
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}