import { FC, ReactNode } from "react";
import { useFileHandling } from "./hooks/useFileHandling";
import { FileUpload } from "./FileUpload";
import { PdfGeneration } from "./PdfGeneration";

interface FormProviderProps {
  setURL: (value: string) => void;
  updateSearchList: (updatedResults: any[]) => void;
  children: ReactNode;
}

export const FormProvider: FC<FormProviderProps> = ({
  setURL,
  updateSearchList,
  children,
}: FormProviderProps) => {
  const {
    fileName,
    isFileProcessed,
    downloadLink,
    generatedFileName,
    fileInputRef,
    handleFileChange,
    handleSubmit,
  } = useFileHandling(setURL, updateSearchList);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {children}

        <FileUpload
          fileName={fileName}
          isFileProcessed={isFileProcessed}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
        />
      </form>

      <PdfGeneration
        downloadLink={downloadLink}
        generatedFileName={generatedFileName}
      />
    </>
  );
};
