import jsPDF from "jspdf";

export async function convertToPdf(text: string): Promise<string | undefined> {
  try {
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    const blob = doc.output("blob");
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}
