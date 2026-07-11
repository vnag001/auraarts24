"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Package, User as UserIcon, DatabaseZap } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/shared/PageHero";
import { EmptyState } from "@/components/ui/empty-state";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

const SUPABASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

interface OrderRow {
  id: string;
  order_number: string;
  total: number;
  status: string;
  created_at: string;
}

export default function AccountPage() {
  if (!SUPABASE_CONFIGURED) {
    return (
      <div className="pt-32">
        <PageHero eyebrow="Your Account" title="Account" />
        <div className="container-luxe py-16">
          <EmptyState
            icon={DatabaseZap}
            title="Supabase isn't connected yet"
            description="Accounts, sign-in, and order history need a Supabase project. Add your keys to .env.local — see the README's 'Set up Supabase' section — then this page will work."
            action={<Link href="/shop" className="btn-primary">Continue Browsing</Link>}
          />
        </div>
      </div>
    );
  }

  return <AccountPageContent />;
}

function AccountPageContent() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [orders, setOrders] = useState<OrderRow[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (mounted) {
          setUser(data.user);
          setLoadingUser(false);
        }
      } catch {
        // Supabase not configured yet — treat as signed out rather than crashing.
        if (mounted) setLoadingUser(false);
      }
    })();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const { data } = await supabase
          .from("orders")
          .select("id, order_number, total, status, created_at")
          .order("created_at", { ascending: false });
        setOrders(data ?? []);
      } catch {
        setOrders([]);
      }
    })();
  }, [user, supabase]);

  if (loadingUser) {
    return (
      <div className="pt-32">
        <PageHero eyebrow="Your Account" title="Account" />
        <div className="container-luxe py-16 text-center text-muted">Loading…</div>
      </div>
    );
  }

  return (
    <div className="pt-32">
      <PageHero eyebrow="Your Account" title={user ? "My Account" : "Sign In"} />
      <div className="container-luxe py-16">
        {user ? <SignedInView user={user} orders={orders} /> : <AuthForm />}
      </div>
    </div>
  );
}

function SignedInView({ user, orders }: { user: User; orders: OrderRow[] }) {
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <div className="bg-secondary p-8 shadow-card">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-canvas">
              <UserIcon className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-primary">{user.email}</p>
              <p className="text-xs text-muted">Member</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </div>

      <div className="lg:col-span-2">
        <h2 className="font-display text-2xl text-primary mb-6">Order History</h2>
        {orders.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No orders yet"
            description="Once you place an order, it will show up here with tracking and status."
            action={<Link href="/shop" className="btn-primary">Shop Collection</Link>}
          />
        ) : (
          <div className="divide-y divide-border bg-secondary shadow-card">
            {orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between px-6 py-5">
                <div>
                  <p className="text-sm text-primary">{o.order_number}</p>
                  <p className="text-xs text-muted mt-1">{new Date(o.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-primary">{formatPrice(o.total)}</p>
                  <p className="text-xs uppercase text-accent-dark mt-1">{o.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AuthForm() {
  const supabase = createClient();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { full_name: form.name } },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to confirm.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        toast.success("Welcome back");
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-8 flex border-b border-border">
        <button
          className={`flex-1 pb-3 text-sm tracking-wide uppercase ${mode === "signin" ? "border-b-2 border-accent text-primary" : "text-muted"}`}
          onClick={() => setMode("signin")}
        >
          Sign In
        </button>
        <button
          className={`flex-1 pb-3 text-sm tracking-wide uppercase ${mode === "signup" ? "border-b-2 border-accent text-primary" : "text-muted"}`}
          onClick={() => setMode("signup")}
        >
          Create Account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <Input required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        )}
        <Input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
          {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted">
        Requires a connected Supabase project — see the README&apos;s &quot;Set up Supabase&quot; section.
      </p>
    </div>
  );
}
