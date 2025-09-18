import {
  useState,
  createContext,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import type { ResponseApiDictionaryType } from "../../../model/ResponseApiDictionaryType";
import { GetWords } from "../../../services/HttpDictionaryServices";
import type { WordEnglishType } from "../../../model/WordEnglishType";
// import { PostRowData } from "../../../services/HttpServices";
// import UrlApi from "../../../services/UrlApi";
import { v4 as uuidv4 } from "uuid";
import { getTextIPA } from "../../../utils/utilsFunction";
import { GetRowData, PostRowData } from "../../../services/HttpServices";
import UrlApi from "../../../services/UrlApi";
import { useParams } from "react-router-dom";
import { type ResponseApiType } from "../../../model/ResponseApiType";
import type { ParameterQueryApiType } from "../../../model/ParameterQueryApiType";
import IdDriveFolder from "../../../model/IdDriveFolder";
import type { ParameterApiType } from "../../../model/ParameterApiType";

export type FormWordEnglishEditContextProps = {
  dataDictionaryApi: ResponseApiDictionaryType;
  setDataDictionaryApi: (value: ResponseApiDictionaryType) => void;
  fetchDataDictionaryApi: () => void;
  //
  dataApi: WordEnglishType;
  setDataApi: (value: WordEnglishType) => void;
  saveDataApi: () => void;
  saveNewDataApi: () => void;
  isSavingDataApi: string;
  setSavingDataApi: (value: string) => void;
  responseApi: ResponseApiType;
  setResponseApi: (value: ResponseApiType) => void;
  //
  parameterQuery: ParameterQueryApiType;
  setParameterQuery: (value: ParameterQueryApiType) => void;
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
    saveNewDataApi: () => {},
    isSavingDataApi: "",
    setSavingDataApi: () => {},
    responseApi: {},
    setResponseApi: () => {},
    //
    parameterQuery: {},
    setParameterQuery: () => {},

    //
    // setDataDictionaryToDataApi: () => {},
  });

export const FormWordEnglishEditProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const intialized = useRef(false);
  const { keyString, isAddNew, idFolderParent } = useParams();
  //
  const [dataDictionaryApi, setDataDictionaryApi] =
    useState<ResponseApiDictionaryType>({});
  const [responseApi, setResponseApi] = useState<ResponseApiType>({});
  const [isSavingDataApi, setSavingDataApi] = useState("");

  const [dataApi, setDataApi] = useState<WordEnglishType>({
    soid: uuidv4(),
  });
  const [parameterQuery, setParameterQuery] = useState<ParameterQueryApiType>({
    id: IdDriveFolder.word_default,
  });

  useEffect(() => {
    if (intialized.current) return;
    intialized.current = true;

    setParameterQuery({ ...parameterQuery, id: idFolderParent });

    fechDataApi();
    //
    return () => {
      console.log("useEffect clean FormWordEnglishEditProvider");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyString, isAddNew]);

  //#region cách hàm thao tác
  async function fetchDataDictionaryApi() {
    const dataDicApi = await GetWords(dataApi.word_en ?? "");
    const checkWordEn =
      (dataDicApi.word ?? "") != (dataDictionaryApi.word ?? "") ? false : true;
    setDataDictionaryApi(dataDicApi);
    console.log(dataDicApi);
    setDataApi({
      ...dataApi,
      word_en: dataDicApi.word ?? "",
      ipa: getTextIPA(dataDicApi.phonetic ?? ""),
      word_base_audio: checkWordEn ? dataApi.word_base_audio : "",
    });
  }
  async function saveDataApi(isAddNew: boolean = false) {
    setSavingDataApi("saving");
    // console.log(JSON.stringify(dataApi));
    const parameter: ParameterApiType[] = [];
    parameter.push({
      name: "id_folder_parent",
      value: parameterQuery.id ?? "",
    });
    const data = await PostRowData(
      `${UrlApi.api_app_words_english_create_update}`,
      dataApi,
      parameter
    );
    // console.log(data);
    setResponseApi(data);
    setSavingDataApi("saved");

    if (isAddNew) {
      if ((data.status ?? "") == "200") {
        console.log("saveNewDataApi");
        const soid = uuidv4();
        setDataApi({
          ...{
            soid: soid,
          },
          list_sentences: [
            ...[],
            {
              id: uuidv4(),
              soid: soid,
            },
          ],
        });
      }
    }
  }

  async function saveNewDataApi() {
    await saveDataApi(true);
  }

  async function fechDataApi() {
    const data = await GetRowData<WordEnglishType>(
      `${UrlApi.api_app_words_english_get_file}`,
      keyString ?? ""
    );
    let pIsAddNew = isAddNew;
    if (data != null) pIsAddNew = "false";
    if (pIsAddNew?.toUpperCase() == "TRUE") {
      //dùng cho trường hợp thêm mới
      setDataApi({
        ...dataApi,
        list_sentences: [
          ...[],
          {
            id: uuidv4(),
            soid: dataApi.soid,
          },
        ],
      });
    } else {
      //dùng cho trường hợp edit
      setDataApi(data);
    }
    console.log(data);
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
        saveNewDataApi: saveNewDataApi,
        //
        isSavingDataApi: isSavingDataApi,
        setSavingDataApi: setSavingDataApi,
        responseApi: responseApi,
        setResponseApi: setResponseApi,
        //
        parameterQuery: parameterQuery,
        setParameterQuery: setParameterQuery,
      }}
    >
      {children}
    </FormWordEnglishEditContext.Provider>
  );
};
