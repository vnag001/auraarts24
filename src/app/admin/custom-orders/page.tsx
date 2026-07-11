const MOCK_COMMISSIONS = [
  { name: "Sofia Chen", style: "Abstract", size: "36in x 36in", budget: "$1,800", status: "New" },
  { name: "Marcus Bell", style: "Landscape", size: "24in x 30in", budget: "$950", status: "Quoted" },
  { name: "Aisha Khan", style: "Portrait", size: "20in x 24in", budget: "$1,200", status: "In Progress" },
];

export default function AdminCustomOrdersPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-primary mb-8">Commission Requests</h1>
      <div className="overflow-x-auto bg-secondary shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Style</th>
              <th className="px-6 py-4">Size</th>
              <th className="px-6 py-4">Budget</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MOCK_COMMISSIONS.map((c) => (
              <tr key={c.name}>
                <td className="px-6 py-4 text-primary">{c.name}</td>
                <td className="px-6 py-4 text-muted">{c.style}</td>
                <td className="px-6 py-4 text-muted">{c.size}</td>
                <td className="px-6 py-4 text-muted">{c.budget}</td>
                <td className="px-6 py-4 text-xs uppercase text-accent-dark">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
