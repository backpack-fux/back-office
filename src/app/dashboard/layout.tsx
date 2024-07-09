import { Link } from "@nextui-org/link";

import { Navbar } from "@/components/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col">
      <Navbar />
      <main className="container mx-auto max-w-7xl grow px-6 pt-16">{children}</main>
      <footer className="flex w-full items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://backpack.network"
          title="backpack homepage"
        >
          <span className="text-default-600">Blood spilled by</span>
          <p className="text-primary">Backpack</p>
        </Link>
      </footer>
    </div>
  );
}
