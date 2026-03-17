"use client"

import { createContext, useState, useEffect } from "react"

export const StudentContext = createContext()

export function StudentProvider({ children }) {

  const [students, setStudents] = useState([])
  const [feeRecords, setFeeRecords] = useState({})

  useEffect(() => {

    const savedStudents = localStorage.getItem("students")
    const savedFees = localStorage.getItem("fees")

    if (savedStudents) setStudents(JSON.parse(savedStudents))
    if (savedFees) setFeeRecords(JSON.parse(savedFees))

  }, [])

  useEffect(() => {

    localStorage.setItem("students", JSON.stringify(students))
    localStorage.setItem("fees", JSON.stringify(feeRecords))

  }, [students, feeRecords])

  return (
    <StudentContext.Provider value={{
      students,
      setStudents,
      feeRecords,
      setFeeRecords
    }}>
      {children}
    </StudentContext.Provider>
  )
}