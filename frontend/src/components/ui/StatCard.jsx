import React, { isValidElement } from 'react';
import Card from './Card';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const StatCard = ({
  icon,
  title,
  value,
  trend,
  trendLabel,
  color = 'teal'
}) => {
  const colorMap = {
    teal: 'bg-teal-50 text-teal-700',
    blue: 'bg-blue-50 text-blue-700',
    red: 'bg-red-50 text-red-700',
    amber: 'bg-amber-50 text-amber-700',
    slate: 'bg-slate-50 text-slate-700'
  };

  const isPositive = trend > 0;
  const isNegative = trend < 0;
  const isNeutral = trend === 0;

  return (
    <Card hover padding="md" className="flex flex-col min-h-[120px] md:min-h-0 h-full">   
      <div className="flex items-center justify-between mb-5">
        <h3 className="ttext-xs md:text-sm font-semibold text-slate-500">
          {title}
        </h3>

        <div className={`p-3 rounded-2xl ${colorMap[color] || colorMap.teal}`}>
          {icon &&
            (isValidElement(icon)
              ? React.cloneElement(icon, {
                  className: 'w-5 h-5'
                })
              : React.createElement(icon, {
                  className: 'w-6 h-6'
                }))}
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-3xl md:text-2xl font-bold text-slate-900 font-heading mb-2">
          {value}
        </div>

        {trend !== undefined && (
          <div className="flex items-center text-sm">
            <span
              className={`flex items-center font-medium ${
                isPositive
                  ? 'text-emerald-600'
                  : isNegative
                  ? 'text-red-600'
                  : 'text-slate-500'
              }`}
            >
              {isPositive && (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              )}

              {isNegative && (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}

              {isNeutral && (
                <Minus className="w-4 h-4 mr-1" />
              )}

              {Math.abs(trend)}%
            </span>

            {trendLabel && (
              <span className="text-slate-400 ml-2">
                {trendLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export { StatCard };
export default StatCard;