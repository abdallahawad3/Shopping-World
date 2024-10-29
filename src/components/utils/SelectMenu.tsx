import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { MdArrowDropUp, MdCheckBox } from "react-icons/md";

interface ISingleCategory {
  _id: string;
  slug: string;
  image: string;
  name: string;
}

interface IProps {
  selectFor: string;
  category: ISingleCategory[];
  selected: ISingleCategory;
  setSelected: (selected: ISingleCategory) => void;
}

const SelectMenu = ({ selectFor, category, selected, setSelected }: IProps) => {
  return (
    <Listbox
      value={selected}
      onChange={(value) => {
        setSelected(value);
      }}
    >
      <Label className="block text-sm font-medium leading-6 text-gray-500 dark:text-white">
        {selectFor}
      </Label>
      <div className="relative !mt-2">
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white">
          <span className="flex items-center">
            <img
              alt=""
              src={
                selected.image.search("https:") !== -1
                  ? selected.image.slice(selected.image.search("https:"))
                  : selected.image
              }
              className="size-5 shrink-0 rounded-full"
            />
            <span className="ml-3 block truncate">{selected.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <MdArrowDropUp
              aria-hidden="true"
              className="size-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1   focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm dark:bg-gray-600 dark:text-white"
        >
          {category.map((cat) => (
            <ListboxOption
              key={cat._id}
              value={cat}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white dark:text-white"
            >
              <div className="flex items-center">
                <img
                  src={
                    cat.image.search("https:") !== -1
                      ? cat.image.slice(cat.image.search("https:"))
                      : cat.image
                  }
                  className="size-5 shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {cat.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <MdCheckBox aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default SelectMenu;
