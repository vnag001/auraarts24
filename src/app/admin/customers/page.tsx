const MOCK_CUSTOMERS = [
  { name: "Priya Sharma", email: "priya@example.com", orders: 3, joined: "Feb 2026" },
  { name: "Daniel Wu", email: "daniel@example.com", orders: 1, joined: "May 2026" },
  { name: "Meera Reddy", email: "meera@example.com", orders: 5, joined: "Nov 2025" },
];

export default function AdminCustomersPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-primary mb-8">Customers</h1>
      <div className="overflow-x-auto bg-secondary shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Orders</th>
              <th className="px-6 py-4">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MOCK_CUSTOMERS.map((c) => (
              <tr key={c.email}>
                <td className="px-6 py-4 text-primary">{c.name}</td>
                <td className="px-6 py-4 text-muted">{c.email}</td>
                <td className="px-6 py-4 text-muted">{c.orders}</td>
                <td className="px-6 py-4 text-muted">{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
