import { Database } from "@ui/types/db";
import jsPDF from "jspdf";

export const calculateTax = (amount: number, taxRate: number) => {
  return (amount * taxRate) / 100;
};

export const calculateTotal = (amount: number, tax: number) => {
  return amount + tax;
};

export const statusToText: Record<Devis["status"], string> = {
  draft: "Brouillon",
  sent: "Envoyé",
  accepted: "Accepté",
  rejected: "Rejeté",
  expired: "Expiré",
};

type Devis = Database["public"]["Tables"]["devis"]["Row"];

export const exportDevisToPdf = (devis: Devis) => {
  const doc = new jsPDF();

  // --- Basic PDF Content ---
  doc.setFontSize(22);
  doc.text(`Devis ${devis.number}`, 20, 20);

  doc.setFontSize(12);
  doc.text(`Client: ${devis.client_email}`, 20, 40);

  doc.text(
    `Date: ${new Date(devis.date).toLocaleDateString("fr-FR")}`,
    140,
    40
  );
  doc.text(
    `Date d'échéance: ${new Date(devis.due_date).toLocaleDateString("fr-FR")}`,
    140,
    48
  );

  // --- Amounts ---
  const startYAmounts = 70;
  doc.line(20, startYAmounts - 5, 190, startYAmounts - 5); // Separator line
  doc.text(`Sous-total HT: ${devis.subtotal.toFixed(2)} €`, 140, startYAmounts);
  doc.text(`TVA: ${devis.tax.toFixed(2)} €`, 140, startYAmounts + 8);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Total TTC: ${devis.total.toFixed(2)} €`, 140, startYAmounts + 18);
  doc.setFont("helvetica", "normal"); // Reset font
  doc.line(20, startYAmounts + 25, 190, startYAmounts + 25); // Separator line

  // --- Notes & Terms (if available) ---
  let currentY = startYAmounts + 40;
  if (devis.notes) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Notes:", 20, currentY);
    doc.setFont("helvetica", "normal");
    // Use splitTextToSize for wrapping long text
    const notesLines = doc.splitTextToSize(devis.notes, 170); // 170 is max width
    doc.text(notesLines, 20, currentY + 8);
    currentY += notesLines.length * 5 + 15; // Adjust Y position based on lines
  }

  if (devis.terms) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Conditions:", 20, currentY);
    doc.setFont("helvetica", "normal");
    const termsLines = doc.splitTextToSize(devis.terms, 170);
    doc.text(termsLines, 20, currentY + 8);
  }

  // --- Save the PDF ---
  doc.save(`devis_${devis.number}.pdf`);
};
