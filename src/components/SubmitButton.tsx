import { Button } from "@headlessui/react";
import { Fragment, FC } from "react";
import { clsx } from "clsx";

export const SubmitButton: FC = () => {
  return (
    <div className="w-full max-w-md px-4 pb-4">
      <Button as={Fragment} type="submit">
        {({ hover, active }) => (
          <button
            className={clsx(
              "rounded py-2 my-4 px-4 text-sm text-white",
              !hover && !active && "bg-blue-500",
              hover && !active && "bg-blue-600",
              active && "bg-blue-700"
            )}
          >
            Convert to PDF
          </button>
        )}
      </Button>
    </div>
  );
};
