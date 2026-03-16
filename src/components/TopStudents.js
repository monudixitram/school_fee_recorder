export default function TopStudents(){

const students=[

{name:"Rahul",amount:5000},
{name:"Aman",amount:4500},
{name:"Riya",amount:4200}

]

return(

<div className="bg-gray-800 p-4 rounded mt-8">

<h2 className="text-xl mb-4">
Top Paying Students
</h2>

{students.map((s)=>(
<div key={s.name} className="flex justify-between border-b border-gray-700 py-2">

<span>{s.name}</span>

<span>₹{s.amount}</span>

</div>
))}

</div>

)

}