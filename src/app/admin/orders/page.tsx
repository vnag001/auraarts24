import { formatPrice } from "@/lib/utils";

const MOCK_ORDERS = [
  { id: "AA24-482913", customer: "Priya Sharma", total: 1250, status: "Paid", date: "Jul 9, 2026" },
  { id: "AA24-482844", customer: "Daniel Wu", total: 980, status: "Shipped", date: "Jul 7, 2026" },
  { id: "AA24-482791", customer: "Meera Reddy", total: 720, status: "Delivered", date: "Jul 3, 2026" },
  { id: "AA24-482703", customer: "James Carter", total: 1600, status: "Processing", date: "Jul 1, 2026" },
];

const STATUS_COLOR: Record<string, string> = {
  Paid: "text-blue-700", Shipped: "text-accent-dark", Delivered: "text-green-700", Processing: "text-muted",
};

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-primary mb-8">Orders</h1>
      <div className="overflow-x-auto bg-secondary shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-6 py-4">Order #</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MOCK_ORDERS.map((o) => (
              <tr key={o.id}>
                <td className="px-6 py-4 text-primary">{o.id}</td>
                <td className="px-6 py-4 text-muted">{o.customer}</td>
                <td className="px-6 py-4 text-primary">{formatPrice(o.total)}</td>
                <td className={`px-6 py-4 text-xs uppercase ${STATUS_COLOR[o.status]}`}>{o.status}</td>
                <td className="px-6 py-4 text-muted">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
