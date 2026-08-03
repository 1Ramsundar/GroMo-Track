import React from 'react';
import { Button } from '../ui/Button';
import { FileText, Sheet, Table } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  exportToPDF,
  exportToCSV,
  exportToExcel
} from '../../utils/exportUtils';

export function ReportDownload({ expenses, summary, period }) {

  const handleDownload = (format) => {
    if (expenses.length === 0) {
      toast.error("No expenses to download.");
      return;
    }

    try {
      if (format === "PDF") {
        exportToPDF(expenses, summary, period);
      } else if (format === "CSV") {
        exportToCSV(expenses);
      } else if (format === "Excel") {
        exportToExcel(expenses);
      }

      toast.success(`${format} report downloaded successfully!`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to download ${format} report.`);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mt-6">

      <Button
        variant="outline"
        icon={<FileText className="w-4 h-4" />}
        onClick={() => handleDownload("PDF")}
      >
        Download PDF
      </Button>

      <Button
        variant="outline"
        icon={<Sheet className="w-4 h-4" />}
        onClick={() => handleDownload("CSV")}
      >
        Download CSV
      </Button>

      <Button
        variant="outline"
        icon={<Table className="w-4 h-4" />}
        onClick={() => handleDownload("Excel")}
      >
        Download Excel
      </Button>

    </div>
  );
}