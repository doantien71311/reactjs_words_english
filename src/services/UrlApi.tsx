class UrlApi {
  static getApiHttp = () => {
    return import.meta.env.VITE_api_http;
  };
  static getApiUsername = () => {
    return import.meta.env.VITE_api_username;
  };
  static getApiPassword = () => {
    return import.meta.env.VITE_api_password;
  };
  static getApiHttpDictionary = () => {
    return import.meta.env.VITE_api_dictionary_http;
  };

  static api_auth_token: string = "/api/auth-token";
  static api_app_words_english_create_update: string =
    "/api/app-words-english-create-update";
  //
  static api_v2_entries_en: string = "/api/v2/entries/en";
}
export default UrlApi;
