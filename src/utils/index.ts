export const textSlice = (txt: string, length: number) => {
  if (txt.length > length) {
    return `${txt.slice(0, length)}...`;
  } else return txt;
};
