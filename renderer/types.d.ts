
type TimeSheetRow = [number, number, number, number, number];

type CellSelector =
  | {
      col: Keyof<EDITABLES>;
      index: number;
    }
  | { col: null; index: null };
