import { useState, useRef, FormEvent } from "react";
import { convertToPdf } from "helpers/convert-to-pdf";
import { saveResultToLocalstorage } from "helpers/save-result-to-localstorage";
import { RESULTS } from "constants/results";

export const useFileHandling = (
  setURL: (value: string) => void,
  updateSearchList: (updatedResults: any[]) => void
) => {
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");
  const [generatedFileName, setGeneratedFileName] = useState<string | null>(
    null
  );
  const [isFileProcessed, setIsFileProcessed] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      setDownloadLink(null);
      setGeneratedFileName(null);

      setFileName(file.name);
      setIsFileProcessed(false);
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        setFileContent(text);
      };
      reader.readAsText(file);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const textInput = target.elements.namedItem(
      "pdfText"
    ) as HTMLTextAreaElement;
    const text = textInput?.value;

    const contentToUse = fileContent || text;

    if (contentToUse) {
      convertToPdf(contentToUse).then((result: string | undefined) => {
        if (result) {
          const newFileName = saveResultToLocalstorage(contentToUse, result);
          setURL("");
          setDownloadLink(result);
          setGeneratedFileName(newFileName);
          setIsFileProcessed(true);
          setFileContent("");
          textInput.value = "";

          const currentResults: string | null = localStorage.getItem(RESULTS);
          const newResult = {
            text: contentToUse,
            url: result,
            fileName: newFileName,
          };

          let updatedResults = currentResults ? JSON.parse(currentResults) : [];

          if (!updatedResults.some((item: any) => item.url === result)) {
            updatedResults.unshift(newResult);
          }

          localStorage.setItem(RESULTS, JSON.stringify(updatedResults));

          updatedResults.sort(
            (a: { fileName: string }, b: { fileName: string }) =>
              b.fileName.localeCompare(a.fileName)
          );
          updateSearchList(updatedResults);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      });
    } else {
      alert("No content found. Please enter text or upload a file.");
    }
  }

  return {
    fileName,
    isFileProcessed,
    downloadLink,
    generatedFileName,
    fileInputRef,
    handleFileChange,
    handleSubmit,
  };
};
