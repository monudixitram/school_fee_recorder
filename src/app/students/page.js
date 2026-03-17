"use client"

import Navbar from "@/components/Navbar"
import { useContext, useState } from "react"
import { StudentContext } from "@/context/StudentContext"
import { useSearchParams } from "next/navigation"

export default function Students(){

  const { students, setStudents } = useContext(StudentContext)

  const searchParams = useSearchParams()
  const classFilter = searchParams.get("class")   // dashboard se aane wali class

  const [name,setName] = useState("")
  const [studentClass,setStudentClass] = useState("")
  const [fee,setFee] = useState("")

  const classes = [
    "Nursery","LKG","KG",
    "1st","2nd","3rd",
    "4th","5th","5th (A)","5th (B)"
  ]

  const addStudent = () => {

    if(!name || !studentClass || !fee) return

    const newStudent = {
      id: Date.now(),
      name,
      class: studentClass,
      monthlyFee: fee
    }

    setStudents([...students,newStudent])

    setName("")
    setStudentClass("")
    setFee("")
  }

  const deleteStudent = (id)=>{
    setStudents(students.filter(s=>s.id !== id))
  }

  // ⭐ CLASS FILTER
  const filteredStudents = students.filter((s)=>{
    if(!classFilter) return true
    return s.class === classFilter
  })

  return(

    <div>

      <Navbar/>

      <div className="p-8">

        <h1 className="text-2xl mb-6">
          Students {classFilter && `- ${classFilter}`}
        </h1>

        {/* Add Student */}

        <div className="bg-gray-800 p-4 rounded mb-6">

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Student Name"
              className="border p-2 rounded"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <select
              className="border p-2 rounded"
              value={studentClass}
              onChange={(e)=>setStudentClass(e.target.value)}
            >

              <option value="">Select Class</option>

              {classes.map((c)=>(
                <option key={c} value={c}>{c}</option>
              ))}

            </select>

            <input
              type="number"
              placeholder="Monthly Fee"
              className="border p-2 rounded"
              value={fee}
              onChange={(e)=>setFee(e.target.value)}
            />

            <button
              onClick={addStudent}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>

          </div>

        </div>

        {/* Student Table */}

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-200">

              <th>Name</th>
              <th>Class</th>
              <th>Monthly Fee</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.map((s)=>(

              <tr key={s.id} className="border">

                <td>{s.name}</td>
                <td>{s.class}</td>
                <td>₹{s.monthlyFee}</td>

                <td>

                  <button
                    onClick={()=>deleteStudent(s.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
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