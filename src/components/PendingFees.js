export default function PendingFees(){

const pending=[

{name:"Rohit",class:"2nd",amount:2000},
{name:"Ankit",class:"3rd",amount:1500}

]

return(

<div className="bg-gray-800 p-4 rounded mt-8">

<h2 className="text-xl mb-4">
Pending Fees
</h2>

{pending.map((p)=>(
<div key={p.name} className="flex justify-between border-b border-gray-700 py-2">

<span>{p.name} ({p.class})</span>

<span>₹{p.amount}</span>

</div>
))}

</div>

)

}