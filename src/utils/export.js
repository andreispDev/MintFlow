import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportCSV(data, filename) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], {
    type: "text/csv",
  });

  saveAs(blob, `${filename}.csv`);
}

export function exportExcel(data, filename) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

export function exportPDF(data, filename) {
  const doc = new jsPDF();
  const columns = Object.keys(data[0]);
  const rows = data.map((item) => columns.map((col) => item[col]));

  doc.text(filename, 14, 15);
  autoTable(doc, {
    head: [columns],
    body: rows,
  });

  doc.save(`${filename}.pdf`);
}
