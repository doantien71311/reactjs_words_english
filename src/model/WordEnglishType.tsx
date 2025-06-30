export type WordEnglishType = {
  word_en?: string;
  ipa?: string;
  word_translation?: string;
  word_base_audio?: string;
  list_sentences?: ListSentenceType[];
  list_words?: ListWordType[];
};

export type ListSentenceType = {
  soid: string;
  id: string;
  sentence_en?: string;
  sentence_base_image?: string;
  sentence_base_audio?: string;
};
export type ListWordType = {
  soid: string;
  id: string;
  word_base_image?: string;
  word_base_audio?: string;
};

// export const ResponseApiDictionaryTypeDefault: ResponseApiDictionaryType = {
//   word: "",
//   phonetic: "",
//   data: "",
// };
