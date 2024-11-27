import { FC } from "react";

interface PdfGenerationProps {
  downloadLink: string | null;
  generatedFileName: string | null;
}

export const PdfGeneration: FC<PdfGenerationProps> = ({
  downloadLink,
  generatedFileName,
}) => {
  if (!downloadLink || !generatedFileName) return null;

  return (
    <div className="mt-4 mx-4">
      <p>
        File has been created:{" "}
        <span className="font-semibold">{generatedFileName}</span>
      </p>
      <a href={downloadLink} download={generatedFileName}>
        <button className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 mt-2 rounded">
          Download File
        </button>
      </a>
    </div>
  );
};
