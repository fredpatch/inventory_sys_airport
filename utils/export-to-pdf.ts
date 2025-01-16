import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { UserOptions } from "jspdf-autotable";

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

export function exportToPDF(
  columns: string[],
  data: any[],
  filename: string = "table-data.pdf"
) {
  const doc = new jsPDF() as jsPDFCustom;

  // Add Title
  doc.text("Table Data", 14, 10);

  // AutoTable
  doc.autoTable({
    head: [columns],
    body: data.map((row) => columns.map((col) => row[col])),
    startY: 20,
  });

  doc.save(filename);
}
