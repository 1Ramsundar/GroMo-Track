import React from 'react';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { useSettings } from '../../context/SettingsContext';

export function NotificationSettings() {
  const { notifications, setNotification } = useSettings();

  const toggleNotification = (key, checked) => {
  setNotification(key, checked);
  };

  return (
    <Card title="Notifications" padding="lg">
      <div className="space-y-6">
        <Toggle
          label="Budget Alerts"
          description="Receive an alert when you exceed 80% of your budget for any category."
          checked={notifications?.budgetAlerts ?? true}
          onChange={(checked) =>
            toggleNotification("budgetAlerts", checked)
          }
        />
        <Toggle
          label="Weekly Summary"
          description="Get a weekly email summary of your spending and savings."
          checked={notifications?.weeklySummary ?? true}
          onChange={(checked) =>
            toggleNotification("weeklySummary", checked)
          }
        />
      </div>
    </Card>
  );
}
