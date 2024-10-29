import { useState } from "react";

interface IProps {
  numsOfPages: number;
  onClickPage: (value: number) => void;
}

const Pagination = ({ numsOfPages, onClickPage }: IProps) => {
  const [pageClicked, setPageClicked] = useState<number>(0);
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex h-10 -space-x-px text-base">
          <li
            onClick={() => {
              onClickPage(pageClicked);
              setPageClicked((prev) => prev - 1);
            }}
            className={`ms-0 flex h-10 ${pageClicked == 0 ? "cursor-not-allowed hover:bg-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 " : "cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"} items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-4 leading-tight text-gray-500 `}
          >
            Previous
          </li>
          {Array.from({ length: numsOfPages }, (_, idx) => (
            <li
              className="flex h-10 cursor-pointer items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              key={idx + 1}
              onClick={() => {
                onClickPage(idx + 1);
                setPageClicked((prev) => prev + 1);
              }}
            >
              {idx + 1}
            </li>
          ))}
          <li
            className={`flex h-10 cursor-pointer ${pageClicked == 0 ? "cursor-not-allowed hover:bg-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 " : "cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"} items-center justify-center rounded-e-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => {
              console.log(pageClicked);

              onClickPage(pageClicked + 1);
            }}
          >
            Next
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
