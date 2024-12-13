const camelToOtherCase = (str: string, separator: string = "_") => {
  return str.replace(
    /[A-Z]/g,
    (letter) => `${separator}${letter.toLowerCase()}`,
  );
};

export { camelToOtherCase };
