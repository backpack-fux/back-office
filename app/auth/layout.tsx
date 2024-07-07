import { NeynarProvider } from "@/providers/neynar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-lg w-full">
        <NeynarProvider>
          <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">{children}</div>
          </section>
        </NeynarProvider>
      </div>
    </div>
  );
}
