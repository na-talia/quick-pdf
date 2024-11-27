import { RESULTS } from "../constants/results";

function generateTimestampedName(): string {
  const now = new Date();
  const formattedDate = now.toISOString().split("T")[0];
  const formattedTime = now
    .toTimeString()
    .split(" ")[0]
    .slice(0, 8)
    .replace(/:/g, "-");

  return `PDF_${formattedDate}_on_${formattedTime}.pdf`;
}

export function saveResultToLocalstorage(text: string, url: string): string {
  const fileName = generateTimestampedName();
  const currentResults: string | null = localStorage.getItem(RESULTS);

  const resultItem = { text, url, fileName };

  if (currentResults) {
    const results = JSON.parse(currentResults);
    results.push(resultItem);
    localStorage.setItem(RESULTS, JSON.stringify(results));
  } else {
    localStorage.setItem(RESULTS, JSON.stringify([resultItem]));
  }

  return fileName;
}
