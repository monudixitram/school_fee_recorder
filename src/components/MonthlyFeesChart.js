"use client"

import { Bar } from "react-chartjs-2"
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement
} from "chart.js"

ChartJS.register(
CategoryScale,
LinearScale,
BarElement
)

export default function MonthlyFeesChart(){

const data = {

labels:["Jan","Feb","Mar","Apr","May","Jun"],

datasets:[
{
label:"Fees Collected",
data:[2000,3500,4200,2800,5000,3900]
}
]

}

return(

<div className="bg-gray-800 p-4 rounded mt-8">

<h2 className="text-xl mb-4">
Monthly Fees Graph
</h2>

<Bar data={data} />

</div>

)

}