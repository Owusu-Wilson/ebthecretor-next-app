// app/health/page.tsx
import {prisma} from "@/lib/prisma";

export const dynamic = "force-dynamic"; // ensure this page always SSR’s

export default async function HealthPage() {
  let status: { ok: boolean; detail: string };

  try {
    // try a lightweight round‑trip
    await prisma.$queryRaw`SELECT 1;`;
    status = { ok: true, detail: "Prisma connected successfully" };
  } catch (err: any) {
    status = { ok: false, detail: err.message || String(err) };
  }

  return (
    <main className="p-8 font-sans bg-background text-foreground">
      <h1 className="text-3xl mb-4">🩺 Health Check</h1>
      {status.ok ? (
        <p className="text-green-600">{status.detail}</p>
      ) : (
        <div className="text-red-600">
          <p><strong>Connection failed:</strong></p>
          <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded">
            {status.detail}
          </pre>
        </div>
      )}
    </main>
  );
}
