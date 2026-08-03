export const exportToCSV = (expenses, filename) => {
  if (!expenses || expenses.length === 0) return;
  
  const headers = ['Date', 'Title', 'Category', 'Payment Method', 'Amount', 'Notes'];
  const csvRows = [headers.join(',')];
  
  for (const exp of expenses) {
    const values = [
      new Date(exp.date).toLocaleDateString(),
      `"${(exp.title || '').replace(/"/g, '""')}"`,
      exp.category,
      exp.paymentMethod,
      exp.amount,
      `"${(exp.notes || '').replace(/"/g, '""')}"`
    ];
    csvRows.push(values.join(','));
  }
  
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'expenses.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToPDF = async (expenses, summary, filename) => {
  try {
    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');
    
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(15, 118, 110);
    doc.text('GroMo Track - Expense Report', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 14, 30);
    
    if (summary) {
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text(`Total: \u20b9${(summary.totalSpent || 0).toLocaleString()}`, 14, 42);
      doc.text(`Count: ${summary.count || 0} expenses`, 14, 50);
      doc.text(`Average/day: \u20b9${(summary.avgPerDay || 0).toLocaleString()}`, 14, 58);
    }
    
    autoTable(doc, {
      startY: 66,
      head: [['Date', 'Title', 'Category', 'Payment', 'Amount']],
      body: expenses.map(exp => [
        new Date(exp.date).toLocaleDateString('en-IN'),
        exp.title || '',
        exp.category || '',
        exp.paymentMethod || '',
        `\u20b9${Number(exp.amount).toLocaleString()}`
      ]),
      headStyles: { fillColor: [15, 118, 110] },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      styles: { fontSize: 9 }
    });
    
    doc.save(filename || 'expenses.pdf');
  } catch (err) {
    console.error('PDF export error:', err);
  }
};

export const exportToExcel = async (expenses, filename) => {
  try {
    const XLSX = await import('xlsx');
    
    const wsData = [
      ['Date', 'Title', 'Category', 'Payment Method', 'Amount', 'Notes'],
      ...expenses.map(exp => [
        new Date(exp.date).toLocaleDateString('en-IN'),
        exp.title || '',
        exp.category || '',
        exp.paymentMethod || '',
        Number(exp.amount),
        exp.notes || ''
      ])
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Expenses');
    XLSX.writeFile(wb, filename || 'expenses.xlsx');
  } catch (err) {
    console.error('Excel export error:', err);
  }
};

export const formatCurrency = (amount, symbol = '\u20b9') => {
  return `${symbol}${Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
