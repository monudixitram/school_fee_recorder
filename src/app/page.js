"use client"

import Navbar from "../components/Navbar"
import { useContext } from "react"
import { StudentContext } from "@/context/StudentContext"
import { useRouter } from "next/navigation"

export default function Home() {

  const { students, feeRecords } = useContext(StudentContext)
  const router = useRouter()

  const months = [
    "Apr","May","Jun","Jul","Aug","Sep",
    "Oct","Nov","Dec","Jan","Feb","Mar"
  ]

  let totalCollected = 0
  let totalExpected = 0

  students.forEach((s)=>{

    totalExpected += Number(s.monthlyFee) * months.length

    months.forEach((m)=>{

      const key = s.id + "-" + m

      if(feeRecords[key]){
        totalCollected += Number(s.monthlyFee)
      }

    })

  })

  const pending = totalExpected - totalCollected

  const classes = [
    "Nursery","LKG","KG",
    "1st","2nd","3rd","4th",
    "5th","5th (A)","5th (B)"
  ]

  return(

    <div>

      <Navbar/>

      <div className="p-8">

        {/* Top Cards */}

        <div className="grid grid-cols-4 gap-4 mb-10">

          <div className="bg-blue-600 p-6 rounded text-white">
            Total Students
            <h2 className="text-2xl">{students.length}</h2>
          </div>

          <div className="bg-green-500 p-6 rounded text-white">
            Total Collected
            <h2 className="text-2xl">₹{totalCollected}</h2>
          </div>

          <div className="bg-orange-500 p-6 rounded text-white">
            Pending Fees
            <h2 className="text-2xl">₹{pending}</h2>
          </div>

          <div className="bg-red-500 p-6 rounded text-white">
            Due Balance
            <h2 className="text-2xl">₹{pending}</h2>
          </div>

        </div>


        {/* Class Cards */}

        <div className="grid grid-cols-5 gap-4">

          {classes.map((c)=>{

            const classStudents = students.filter((s)=>s.class === c)

            let classExpected = 0
            let classCollected = 0

            classStudents.forEach((s)=>{

              classExpected += Number(s.monthlyFee) * months.length

              months.forEach((m)=>{

                const key = s.id + "-" + m

                if(feeRecords[key]){
                  classCollected += Number(s.monthlyFee)
                }

              })

            })

            const balance = classExpected - classCollected

            return(

              <div
                key={c}
                onClick={()=>router.push(`/students?class=${c}`)}
                className="bg-purple-600 p-5 rounded text-white cursor-pointer hover:bg-purple-700"
              >

                <h2 className="text-lg font-semibold">{c}</h2>

                <p>Students : {classStudents.length}</p>

                <p>Total Fee : ₹{classCollected}</p>

                <p className="text-yellow-300">
                  Balance : ₹{balance}
                </p>

              </div>

            )

          })}

        </div>

      </div>

    </div>

  )

}