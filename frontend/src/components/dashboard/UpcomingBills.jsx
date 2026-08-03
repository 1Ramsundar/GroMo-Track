import React from 'react';
import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';
import EmptyState from '../ui/EmptyState';
import { CalendarClock } from 'lucide-react';

export default function UpcomingBills() {
  return (
    <Card padding="md" className="h-full">
      <SectionTitle title="Upcoming Bills" />
      <div className="mt-6 flex-1 flex flex-col justify-center">
        <EmptyState 
          icon={<CalendarClock className="w-10 h-10 text-slate-300" />}
          title="Coming Soon"
          description="Bill tracking feature is under development."
        />
      </div>
    </Card>
  );
}
