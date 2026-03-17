import { NavLink, useLocation } from "react-router-dom";

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div>
      <h4 className="mb-4 text-white">Dashboard</h4>

      <div className="d-flex flex-column gap-2">
        {/* PRODUCTS */}
        <NavLink
          to="/dashboard"
          end
          className={
            pathname === "/dashboard" ? "sidebar-link active" : "sidebar-link"
          }
        >
          Products
        </NavLink>

        {/* ORDERS */}
        <NavLink
          to="/dashboard/orders"
          className={
            pathname.startsWith("/dashboard/orders")
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
}
