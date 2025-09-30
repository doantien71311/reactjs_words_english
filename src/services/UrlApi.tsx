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
  static getHostHttp = () => {
    return import.meta.env.VITE_host_http;
  };
  static getApiSoundoftextHttp = () => {
    return import.meta.env.VITE_api_soundoftext_http;
  };
  static api_auth_token: string = "/api/auth-token";
  static api_app_words_english_create_update: string =
    "/api/app-words-english-create-update";
  // static api_app_words_english_get_list: string =
  //   "/api/app-words-english-get-list";
  static api_app_words_english_cache_get_list: string =
    "/api/app-words-english-cache-get-list";
  static api_app_words_english_get_file: string =
    "/api/app-words-english-get-file";
  static api_app_words_english_delete_file: string =
    "/api/app-words-english-delete-file";
  //
  static api_v2_entries_en: string = "/api/v2/entries/en";
}
export default UrlApi;
