export default function PaymentTable() {
  return (

    <div className="bg-white shadow p-4 rounded mt-6">

      <h2 className="text-lg font-semibold mb-4">
        Recent Payments
      </h2>

      <table className="w-full">

        <thead>
          <tr className="border-b">
            <th className="text-left">Student</th>
            <th className="text-left">Class</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Date</th>
          </tr>
        </thead>

        <tbody>

          <tr className="border-b">
            <td>Rahul</td>
            <td>5</td>
            <td>₹2000</td>
            <td>10 Mar</td>
          </tr>

          <tr className="border-b">
            <td>Aman</td>
            <td>3</td>
            <td>₹1500</td>
            <td>11 Mar</td>
          </tr>

          <tr>
            <td>Sita</td>
            <td>2</td>
            <td>₹1800</td>
            <td>12 Mar</td>
          </tr>

        </tbody>

      </table>

    </div>

  )
}