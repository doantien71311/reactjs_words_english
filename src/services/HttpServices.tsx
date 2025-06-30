import UrlApi from "./UrlApi";
import type { ResponseApiType } from "../model/ResponseApiType";

/*#region các hàm publish */

// eslint-disable-next-line react-refresh/only-export-components
export const getTokenString = (): Promise<string> => {
  // console.log(api);
  return new Promise<string>((resolve) => {
    const api = `${UrlApi.getApiHttp()}${UrlApi.api_auth_token}`;
    fetch(api, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: UrlApi.getApiUsername(),
        password: UrlApi.getApiPassword(),
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        resolve(json.token);
      });
  });
};

export const PostRowData = <T,>(
  api: string,
  data: T
): Promise<ResponseApiType> => {
  return new Promise<ResponseApiType>((resolve) => {
    getTokenString().then((token) => {
      const api_url_post = `${UrlApi.getApiHttp()}${api}`;
      fetch(api_url_post, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json; charset=UTF-8",
          //  "Content-Type": "application/x-www-form-urlencoded",
        },
        // Adding body or contents to send
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
          const value = json.data.google_drive as ResponseApiType;
          return resolve(value);
        })
        .catch(() => {
          // return resolve([]);
        });
    });
  });
};

/*#endregion các hàm publish */
