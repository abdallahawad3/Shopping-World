import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { ReactNode } from "react";

interface IProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  children: ReactNode;
  title: string;
  description?: string;
}

const ModalDialog = ({
  open,
  setOpen,
  title,
  description,
  children,
}: IProps) => {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 backdrop-blur-lg transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative  overflow-hidden rounded-lg bg-white text-left text-gray-300 shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 dark:bg-gray-600 dark:text-white"
          >
            <div className="bg-white pt-5 dark:bg-gray-800 dark:text-white">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900  dark:text-white"
                  >
                    {title}
                  </DialogTitle>
                  {description ? (
                    <div className="mt-2">
                      <p className="text-sm text-red-600">{description}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div>{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalDialog;
