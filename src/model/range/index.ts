import { atom } from "jotai";
import { HighlightRange } from "@/types";

const _rangeAtom = atom<HighlightRange | null>(null);

export const rangeAtom = atom(
  (get) => get(_rangeAtom),
  (get, set, update: Omit<HighlightRange, "id">) => {
    const uuid = crypto.randomUUID();
    set(_rangeAtom, { ...update, id: uuid });
  },
);
