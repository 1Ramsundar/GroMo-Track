import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  House,
  Receipt,
  ChartColumn,
  User,
  Plus,
} from "lucide-react";

export default function BottomNavigation() {
  const navigate = useNavigate();

  const location = useLocation();

  const showFab = [
    "/dashboard",
    "/expenses",
    "/analytics",
].includes(location.pathname);

  const navItems = [
    {
      name: "Home",
      icon: House,
      path: "/dashboard",
    },
    {
      name: "Expenses",
      icon: Receipt,
      path: "/expenses",
    },
    {
      name: "Analytics",
      icon: ChartColumn,
      path: "/analytics",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <>
      {/* Floating Add Button */}
      {showFab && (
        <button
        onClick={() => navigate("/expenses?add=true")}
        className="
            fixed
            bottom-10
            left-1/2
            -translate-x-1/2
            border-4
            border-white
            w-16
            h-16
            rounded-full
            bg-teal-600
            text-white
            shadow-xl
            flex
            items-center
            justify-center
            transition
            duration-200
            hover:scale-105
            active:scale-95
            z-50
          "
        >
        <Plus size={30} strokeWidth={2.5} />
        </button>
      )}
      {/* Bottom Navigation */}
      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          h-20
          bg-white
          border-t
          border-slate-200
          flex
          justify-around
          rounded-t-3xl
          items-center
          z-40
          shadow-2xl
        "
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center text-[13px] font-medium transition ${
                  isActive
                    ? "text-teal-600"
                    : "text-slate-500"
                }`
              }
            >
              <Icon size={28} />
              <span className="mt-1.5">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}