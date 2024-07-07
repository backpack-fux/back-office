import { Link } from "@nextui-org/link";
import { NeynarProvider } from "@/providers/neynar";
import { Navbar } from "@/components/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <NeynarProvider>
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">{children}</main>
        <footer className="w-full flex items-center justify-center py-3">
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
    </NeynarProvider>
  );
}
