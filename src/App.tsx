import { useState, useEffect } from "react";
import {
  TextArea,
  SubmitButton,
  SearchList,
  FormProvider,
  PDFViewer,
} from "./components";
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
    <div className="App">
      <FormProvider
        setURL={setCurrentPDFUrl}
        updateSearchList={updateSearchList}
      >
        <TextArea />
        <SubmitButton />
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
  );
}

export default App;
