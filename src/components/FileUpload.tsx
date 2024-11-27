import { FC } from "react";

interface FileUploadProps {
  fileName: string;
  isFileProcessed: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload: FC<FileUploadProps> = ({
  fileName,
  isFileProcessed,
  fileInputRef,
  handleFileChange,
}) => {
  return (
    <>
      {!fileName || isFileProcessed ? (
        <>
          <span className="mx-4 text-sm/6">
            Or upload a file from your computer to convert it to PDF
          </span>
          <label
            htmlFor="file-upload"
            className="bg-gray-400 hover:bg-gray-500 text-sm text-white px-4 py-2 rounded cursor-pointer"
          >
            Upload a File
          </label>
        </>
      ) : (
        <span className="text-gray-700 mx-4">File: {fileName}</span>
      )}

      <input
        type="file"
        id="file-upload"
        accept=".txt"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
    </>
  );
};
