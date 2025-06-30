export type ResponseApiDictionaryType = {
  word?: string;
  phonetic?: string;
  phonetics?: ResponseApiDictionaryPhoneticsType[];
};

export type ResponseApiDictionaryPhoneticsType = {
  text?: string;
  audio?: string;
  sourceUrl?: string;
};

// export const ResponseApiDictionaryTypeDefault: ResponseApiDictionaryType = {
//   word: "",
//   phonetic: "",
//   data: "",
// };
