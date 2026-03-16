"use client"

import Navbar from "@/components/Navbar"
import { useContext } from "react"
import { StudentContext } from "@/context/StudentContext"
import { useSearchParams } from "next/navigation"

export default function Students(){

  const { students } = useContext(StudentContext)

  const searchParams = useSearchParams()
  const classFilter = searchParams.get("class")

  const filteredStudents = students.filter((s)=>{

    if(classFilter) return s.class === classFilter
    return true

  })

  return(

    <div>

      <Navbar/>

      <div className="p-8">

        <h1 className="text-2xl mb-6">
          Students
        </h1>

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-200">

              <th>Name</th>
              <th>Class</th>
              <th>Monthly Fee</th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.map((s)=>(

              <tr key={s.id} className="border">

                <td>{s.name}</td>
                <td>{s.class}</td>
                <td>₹{s.monthlyFee}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}