import { useState, useEffect } from "react";
import { TextArea, SearchList, FormProvider, PDFViewer } from "./components";
import { UseStateResult } from "./types/use-state-return-type";
import { RESULTS } from "./constants/results";

function App(): JSX.Element {
  const [currentPDFUrl, setCurrentPDFUrl]: UseStateResult<string> =
    useState("");
  const [searchList, setSearchList] = useState<any[]>([]);

  useEffect(() => {
    const localStorageResults: string | null = localStorage.getItem(RESULTS);
    if (localStorageResults) {
      const results = JSON.parse(localStorageResults);
      results.sort((a: { fileName: string }, b: { fileName: string }) =>
        b.fileName.localeCompare(a.fileName)
      );
      setSearchList(results);
    }
  }, []);

  const updateSearchList = (updatedResults: any[]) => {
    setSearchList(updatedResults);
  };

  return (
    <div className="flex justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        <FormProvider
          setURL={setCurrentPDFUrl}
          updateSearchList={updateSearchList}
        >
          <TextArea />
        </FormProvider>

        {currentPDFUrl && (
          <PDFViewer
            currentPDFUrl={currentPDFUrl}
            closeViewer={() => setCurrentPDFUrl("")}
          />
        )}

        <SearchList
          setURL={setCurrentPDFUrl}
          searchList={searchList}
          updateSearchList={updateSearchList}
        />
      </div>
    </div>
  );
}

export default App;
