import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Forbidden",
  description: "You do not have permission to access this page.",
};

export default function ForbiddenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">{children}</div>
    </div>
  );
}
