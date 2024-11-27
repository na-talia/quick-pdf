import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { FormProvider } from "../components";
import { convertToPdf } from "../helpers/convert-to-pdf";
import { saveResultToLocalstorage } from "../helpers/save-result-to-localstorage";

// Mock the convertToPdf function
jest.mock("../helpers/convert-to-pdf");

// Mock the saveResultToLocalstorage function
jest.mock("../helpers/save-result-to-localstorage", () => ({
  saveResultToLocalstorage: jest.fn(),
}));

describe("FormProvider", () => {
  it("should call convertToPdf and setURL on form submission", async () => {
    const setURL = jest.fn();
    const mockPdfUrl = "blob:http://localhost:3000/mock-pdf-url";

    convertToPdf.mockResolvedValue(mockPdfUrl);

    render(
      <FormProvider setURL={setURL}>
        <input type="textarea" name="pdfText" defaultValue="Text test" />
        <button type="submit">Convert to PDF format</button>
      </FormProvider>
    );

    fireEvent.click(screen.getByText("Convert to PDF format"));

    await waitFor(() => expect(convertToPdf).toHaveBeenCalledWith("Text test"));
    await waitFor(() => expect(setURL).toHaveBeenCalledWith(mockPdfUrl));
  });

  it("should call saveResultToLocalstorage with correct arguments on form submission", async () => {
    const setURL = jest.fn();
    const mockPdfUrl = "blob:http://localhost:3000/mock-pdf-url";

    convertToPdf.mockResolvedValue(mockPdfUrl);

    render(
      <FormProvider setURL={setURL}>
        <input type="textarea" name="pdfText" defaultValue="Test text" />
        <button type="submit">Submit</button>
      </FormProvider>
    );

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() =>
      expect(saveResultToLocalstorage).toHaveBeenCalledWith(
        "Test text",
        mockPdfUrl
      )
    );
  });
});
