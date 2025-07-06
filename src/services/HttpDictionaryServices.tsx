import UrlApi from "./UrlApi";
import type { ResponseApiDictionaryType } from "../model/ResponseApiDictionaryType";

/*#region các hàm publish */

export const GetWords = (word: string): Promise<ResponseApiDictionaryType> => {
  return new Promise<ResponseApiDictionaryType>((resolve) => {
    const url_api_get = `${UrlApi.getApiHttpDictionary()}${
      UrlApi.api_v2_entries_en
    }/${word}`;

    try {
      fetch(url_api_get, {
        method: "GET",
      })
        .then((res) => {
          if (res.ok) return res.json();
          return resolve({
            word: word,
          });
        })
        .then((json) => {
          const value = json as ResponseApiDictionaryType[];
          return resolve(value[0]);
        })
        .catch(() => {
          // console.log("aaa");
          // console.log(error);
          return resolve({
            word: word,
          });
        });
    } catch {
      console.log("AAAAAAAAA");
      // console.log(error);
      return resolve({
        word: word,
      });
    }
  });
};

/*#endregion các hàm publish */
