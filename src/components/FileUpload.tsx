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
        <label
          htmlFor="file-upload"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Choose File
        </label>
      ) : (
        <span className="text-gray-700">File: {fileName}</span>
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
