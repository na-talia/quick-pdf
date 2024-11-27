import { FC } from "react";

interface PDFViewerProps {
  currentPDFUrl: string;
  closeViewer: () => void;
}

export const PDFViewer: FC<PDFViewerProps> = ({
  currentPDFUrl,
  closeViewer,
}) => {
  if (!currentPDFUrl) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-90 flex justify-center items-center">
      <button
        onClick={closeViewer}
        className="absolute top-4 right-4 text-white bg-red-500 px-4 py-2 rounded-md shadow-md"
      >
        Close
      </button>
      <iframe
        src={currentPDFUrl}
        title="PDF Viewer"
        className="w-full h-full"
        style={{
          border: "none",
        }}
      ></iframe>
    </div>
  );
};
