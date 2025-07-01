import {
  useState,
  createContext,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import type { ResponseApiDictionaryType } from "../../../model/ResponseApiDictionaryType";
import { GetWords } from "../../../services/HttpDictionaryServices";
import type {
  ListSentenceType,
  WordEnglishType,
} from "../../../model/WordEnglishType";
// import { PostRowData } from "../../../services/HttpServices";
// import UrlApi from "../../../services/UrlApi";
import { v4 as uuidv4 } from "uuid";
import { getTextIPA } from "../../../utils/utilsFunction";

export type FormWordEnglishEditContextProps = {
  dataDictionaryApi: ResponseApiDictionaryType;
  setDataDictionaryApi: (value: ResponseApiDictionaryType) => void;
  fetchDataDictionaryApi: () => void;
  //
  dataApi: WordEnglishType;
  setDataApi: (value: WordEnglishType) => void;
  saveDataApi: () => void;
  //
  //   setDataDictionaryToDataApi: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const FormWordEnglishEditContext =
  createContext<FormWordEnglishEditContextProps>({
    dataDictionaryApi: {},
    setDataDictionaryApi: () => {},
    fetchDataDictionaryApi: () => {},
    //
    dataApi: { soid: uuidv4() },
    setDataApi: () => {},
    saveDataApi: () => {},
    //
    // setDataDictionaryToDataApi: () => {},
  });

export const FormWordEnglishEditProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const intialized = useRef(false);
  //
  const [dataDictionaryApi, setDataDictionaryApi] =
    useState<ResponseApiDictionaryType>({});
  const list_sentences: ListSentenceType[] = [];
  list_sentences.push({
    id: uuidv4(),
    soid: uuidv4(),
    sentence_en: "asdasd",
  });
  const [dataApi, setDataApi] = useState<WordEnglishType>({
    soid: uuidv4(),
    list_sentences: list_sentences,
  });

  useEffect(() => {
    if (intialized.current) return;
    intialized.current = true;

    // const list_sentences: ListSentenceType[] = [];
    // list_sentences.push({
    //   id: uuidv4(),
    //   soid: dataApi.soid,
    // });
    // dataApi.list_sentences = list_sentences;
    console.log(dataApi);
    // setDataApi(dataApi);

    return () => {
      console.log("useEffect clean");
    };
  });

  //#region cách hàm thao tác
  async function fetchDataDictionaryApi() {
    const dataDicApi = await GetWords(dataApi.word_en ?? "");
    setDataDictionaryApi(dataDicApi);
    console.log(dataDicApi);
    setDataApi({
      ...dataApi,
      word_en: dataDicApi.word ?? "",
      ipa: getTextIPA(dataDicApi.phonetic ?? ""),
    });
  }
  async function saveDataApi() {
    // const data = await PostRowData(
    //   `${UrlApi.api_app_words_english_create_update}`,
    //   dataApi
    // );
    console.log(dataApi);
  }
  //#endregion cách hàm thao tác

  return (
    <FormWordEnglishEditContext.Provider
      value={{
        dataDictionaryApi: dataDictionaryApi,
        setDataDictionaryApi: setDataDictionaryApi,
        fetchDataDictionaryApi: fetchDataDictionaryApi,
        //
        dataApi: dataApi,
        setDataApi: setDataApi,
        saveDataApi: saveDataApi,
      }}
    >
      {children}
    </FormWordEnglishEditContext.Provider>
  );
};
