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
        <span className="font-semibold px-4 py-2 rounded border-2 text-sm border-grey-400 hover:bg-gray-500 hover:text-white">
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            Click here to view the file
          </a>
        </span>
        <a href={downloadLink} download={generatedFileName}>
          <button className="bg-green-400 hover:bg-green-500 text-white text-sm px-5 py-2 mt-2 rounded">
            Download File
          </button>
        </a>
      </p>
    </div>
  );
};
