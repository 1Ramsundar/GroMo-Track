import React from 'react';
import { Card } from '../ui/Card';

export function GeneralSettings() {
  return (
    <Card title="General Settings" padding="lg">
      <div className="text-slate-600 text-sm">
        Additional application preferences will be available in a future update.
      </div>
    </Card>
  );
}