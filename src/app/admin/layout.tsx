import AdminNav from '@/components/admin/admin-nav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <main className="pt-16">{children}</main>
    </div>
  );
}
