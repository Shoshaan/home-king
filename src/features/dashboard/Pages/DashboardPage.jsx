import { DashboardLayout } from "../components/DashboardLayout";
import { ProductsTable } from "../components/ProductsTable";
import { DashboardStats } from "../components/DashboardStats";
import { DashboardCharts } from "../components/DashboardCharts";

export function DashboardPage() {
  return (
    <DashboardLayout>
      <h2 className="mb-4">Admin Dashboard</h2>

      <DashboardStats />

      <DashboardCharts />

      <ProductsTable />
    </DashboardLayout>
  );
}
