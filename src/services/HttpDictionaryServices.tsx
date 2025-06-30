import UrlApi from "./UrlApi";
import type { ResponseApiDictionaryType } from "../model/ResponseApiDictionaryType";

/*#region các hàm publish */

export const GetWords = (word: string): Promise<ResponseApiDictionaryType> => {
  return new Promise<ResponseApiDictionaryType>((resolve) => {
    const url_api_get = `${UrlApi.getApiHttpDictionary()}${
      UrlApi.api_v2_entries_en
    }/${word}`;

    fetch(url_api_get, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        const value = json as ResponseApiDictionaryType[];
        return resolve(value[0]);
      });
  });
};

/*#endregion các hàm publish */
