import { ChevronRight } from "lucide-react";

export default function ProfileMenuItem({
  icon,
  title,
  subtitle,
  danger = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between rounded-2xl bg-white border border-slate-200 p-4 transition hover:bg-slate-50"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${
            danger
              ? "bg-red-100 text-red-600"
              : "bg-teal-100 text-teal-700"
          }`}
        >
          {icon}
        </div>

        <div className="text-left">
          <p
            className={`font-medium ${
              danger ? "text-red-600" : "text-slate-900"
            }`}
          >
            {title}
          </p>

          {subtitle && (
            <p className="text-sm text-slate-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <ChevronRight className="w-5 h-5 text-slate-400" />
    </button>
  );
}