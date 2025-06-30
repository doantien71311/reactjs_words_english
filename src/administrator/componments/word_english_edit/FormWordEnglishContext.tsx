import { useState, createContext, type ReactNode } from "react";
import type { ResponseApiDictionaryType } from "../../../model/ResponseApiDictionaryType";
import { GetWords } from "../../../services/HttpDictionaryServices";
import type { WordEnglishType } from "../../../model/WordEnglishType";

export type FormWordEnglishEditContextProps = {
  dataDictionaryApi: ResponseApiDictionaryType;
  setDataDictionaryApi: (value: ResponseApiDictionaryType) => void;
  fetchDataDictionaryApi: () => void;
  //
  dataApi: WordEnglishType;
  setDataApi: (value: WordEnglishType) => void;
  saveDataApi: (value: WordEnglishType) => void;
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
    dataApi: {},
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
  //
  const [dataDictionaryApi, setDataDictionaryApi] =
    useState<ResponseApiDictionaryType>({});

  const [dataApi, setDataApi] = useState<WordEnglishType>({});

  //#region cách hàm thao tác
  async function fetchDataDictionaryApi() {
    const dataDicApi = await GetWords(dataApi.word_en ?? "");
    setDataDictionaryApi(dataDicApi);
    console.log(dataDicApi);
    setDataApi({
      ...dataApi,
      word_en: dataDicApi.word ?? "",
      ipa: dataDicApi.phonetic ?? "",
    });
  }
  async function saveDataApi() {
    // const dataApi = await GetWords("sink");
    // setDataDictionaryApi(dataApi);
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
