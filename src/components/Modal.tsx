import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  dialogTrigger: React.ReactNode;
  dialogTitle: string;
  dialogDescription: string;
  title?: string;
  component?: React.ComponentType<unknown>;
  jsx?: React.ReactNode;
};

export default function ModalClient({
  dialogTrigger,
  dialogTitle,
  dialogDescription,
  title,
  component,
  jsx,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>

      <DialogContent
        className="
    sm:max-w-[425px] lg:max-w-[600px]
    max-h-[80vh] md:max-h-[90vh] overflow-hidden p-0
    bg-transparent border-none shadow-none

  overflow-y-scroll
  "
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{
            duration: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="rounded-lg shadow-xl"
        >
          <DialogTitle className="sr-only">{dialogTitle}</DialogTitle>
          <DialogDescription className="sr-only">
            {dialogDescription}
          </DialogDescription>

          <div className="bg-[var(--color-container)] px-6 pt-8 pb-10 rounded-xl shadow-lg">
            {title ? <h2 className="text-center">{title}</h2> : null}
            {jsx ? jsx : component ? React.createElement(component) : null}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
