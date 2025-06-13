export default function HRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full h-full md:flex bg-white">
      <div className="px-10 w-full bg-gray-200">{children}</div>
    </div>
  );
}
