import UrlApi from "./UrlApi";
import type { ResponseApiType } from "../model/ResponseApiType";
import ResponseStatus from "../model/ResponseStatus";

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
          const value = json as ResponseApiType;
          return resolve(value);
        })
        .catch(() => {
          // return resolve([]);
        });
    });
  });
};

export const GetArrayData = <T,>(api: string): Promise<Array<T>> => {
  return new Promise<Array<T>>((resolve) => {
    getTokenString().then((token) => {
      const api_url_post = `${UrlApi.getApiHttp()}${api}`;
      fetch(api_url_post, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          let value: T[] = [];
          if (json.data) {
            value = json.data as T[];
          }
          return resolve(value);
        })
        .catch(() => {
          return resolve([]);
        });
    });
  });
};

export const GetRowData = <T,>(api: string, id: string): Promise<T> => {
  return new Promise<T>((resolve) => {
    getTokenString().then((token) => {
      const api_url_post = `${UrlApi.getApiHttp()}${api}?id=${id}`;
      fetch(api_url_post, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          const value: T = json.data as T;
          return resolve(value);
        })
        .catch(() => {
          const value: T = null as T;
          return resolve(value);
        });
    });
  });
};

export const DeleteRowData = (
  api: string,
  id: string
): Promise<ResponseApiType> => {
  return new Promise<ResponseApiType>((resolve) => {
    getTokenString().then((token) => {
      // console.log(token);
      const api_url_post = `${UrlApi.getApiHttp()}${api}/${id}`;
      // console.log(api_url_post);
      fetch(api_url_post, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          // console.log(json);
          const value: ResponseApiType = json as ResponseApiType;
          return resolve(value);
        })
        .catch((error) => {
          const value: ResponseApiType = {
            status: ResponseStatus.BAD,
            message: "Xóa không thành công",
            data: error,
          };
          return resolve(value);
        });
    });
  });
};

/*#endregion các hàm publish */
