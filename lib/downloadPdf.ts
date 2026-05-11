import { saveAs } from "file-saver";

export function downloadPdf(
  pdfString: string,
  fileName: string = "document.pdf"
): void {
 
  const cleaned = pdfString
    .replace(/\u0000/g, "")   
    .trim();

  const bytes = new Uint8Array(cleaned.length);
  for (let i = 0; i < cleaned.length; i++) {
    bytes[i] = cleaned.charCodeAt(i) & 0xff;
  }

  const blob = new Blob([bytes.buffer as ArrayBuffer], {
    type: "application/pdf",
  });

  saveAs(blob, fileName);
}