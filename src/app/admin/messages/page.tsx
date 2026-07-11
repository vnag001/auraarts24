const MOCK_MESSAGES = [
  { name: "Alicia M.", email: "alicia@example.com", subject: "Question about frame options", date: "Jul 8, 2026", read: false },
  { name: "Jordan K.", email: "jordan@example.com", subject: "Shipping to Canada?", date: "Jul 5, 2026", read: true },
];

export default function AdminMessagesPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-primary mb-8">Messages</h1>
      <div className="divide-y divide-border bg-secondary shadow-card">
        {MOCK_MESSAGES.map((m) => (
          <div key={m.email} className="flex items-center justify-between px-6 py-5">
            <div>
              <p className="text-primary text-sm font-medium">{m.name} <span className="text-muted font-normal">— {m.subject}</span></p>
              <p className="text-xs text-muted mt-1">{m.email}</p>
            </div>
            <div className="flex items-center gap-3">
              {!m.read && <span className="h-2 w-2 rounded-full bg-accent" />}
              <span className="text-xs text-muted">{m.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
