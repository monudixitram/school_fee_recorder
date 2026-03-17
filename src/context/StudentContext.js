"use client"

import { createContext, useState } from "react"

export const StudentContext = createContext()

export const StudentProvider = ({ children }) => {

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ram",
      admissionClass: "Nursery",
      admissionYear: 2026,
      monthlyFee: 500
    }
  ])

  const [feeRecords, setFeeRecords] = useState({})

  // ✅ Current Session (April based)
  const getCurrentSessionYear = () => {
    const today = new Date()
    let year = today.getFullYear()

    if (today.getMonth() < 3) {
      year = year - 1
    }

    return year
  }

  // ✅ Auto Class Promotion
  const getCurrentClass = (student) => {

    const sessionYear = getCurrentSessionYear()

    const classOrder = [
      "Nursery","LKG","KG",
      "1st","2nd","3rd","4th",
      "5th","Passed"
    ]

    const yearsPassed = sessionYear - student.admissionYear

    const index =
      classOrder.indexOf(student.admissionClass) + yearsPassed

    return classOrder[index] || "Passed"
  }

  return (
    <StudentContext.Provider value={{
      students,
      setStudents,
      feeRecords,
      setFeeRecords,
      getCurrentClass,
      getCurrentSessionYear
    }}>
      {children}
    </StudentContext.Provider>
  )
}