export default function StatCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded text-white ${color}`}>
      <h3 className="text-sm">{title}</h3>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  )
}