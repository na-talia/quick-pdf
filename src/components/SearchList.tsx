import { FC } from "react";
import { Button } from "@headlessui/react";
import { convertToPdf } from "../helpers/convert-to-pdf";
import { saveResultToLocalstorage } from "../helpers/save-result-to-localstorage";
import { RESULTS } from "../constants/results";

interface SearchListItem {
  text: string;
  url: string;
  fileName: string;
}

interface SearchListProps {
  setURL: (value: string) => void;
  searchList: SearchListItem[];
  updateSearchList: (updatedResults: SearchListItem[]) => void;
}

export const SearchList: FC<SearchListProps> = ({
  searchList,
  updateSearchList,
}: SearchListProps) => {
  function removeSingleResult(url: string): void {
    const results: string | null = localStorage.getItem(RESULTS);
    const data = results
      ? JSON.parse(results).filter(
          (result: SearchListItem) => result.url !== url
        )
      : [];
    localStorage.setItem(RESULTS, JSON.stringify(data));
    updateSearchList(data);
  }

  function clearAllResults(): void {
    localStorage.removeItem(RESULTS);
    updateSearchList([]);
  }

  function handleCurrentResult(
    text: string,
    url: string,
    fileName: string
  ): void {
    const results: string | null = localStorage.getItem(RESULTS);
    let data = results ? JSON.parse(results) : [];
    const existingFile = data.find(
      (result: SearchListItem) => result.url === url
    );

    if (!existingFile) {
      convertToPdf(text).then((result: string | undefined) => {
        if (result) {
          window.open(result, "_blank");
          saveResultToLocalstorage(text, result);
          window.scrollTo({ top: 300, behavior: "smooth" });

          const newFile: SearchListItem = { text, url, fileName };
          data.push(newFile);
          localStorage.setItem(RESULTS, JSON.stringify(data));
          updateSearchList(data);
        }
      });
    } else {
      convertToPdf(existingFile.text).then((result: string | undefined) => {
        if (result) {
          window.open(result, "_blank");
          window.scrollTo({ top: 300, behavior: "smooth" });
        }
      });
    }
  }

  return searchList.length > 0 ? (
    <div className="w-full max-w-xl px-4 py-4 mt-5">
      <h2 className="text-2xl font-bold mb-1">
        Your previously generated files:
      </h2>
      <ul>
        {searchList.map(({ text, url, fileName }) => (
          <li
            key={url}
            className="mb-3 w-full flex justify-between items-center"
          >
            <Button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 rounded px-4 py-2 mr-4"
              onClick={() => handleCurrentResult(text, url, fileName)}
            >
              {fileName}
            </Button>
            <Button
              type="button"
              className="border-2 border-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded"
              onClick={() => removeSingleResult(url)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <button
        onClick={clearAllResults}
        className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 mt-2 w-full rounded"
      >
        Clear all results
      </button>
    </div>
  ) : (
    <p className="mx-4">No saved results</p>
  );
};
