/*#region các hàm publish */

export const GetAudioBaseStringByLink = (urlLink: string): Promise<string> => {
  return new Promise<string>((resolve) => {
    fetch(urlLink, {
      method: "GET",
    })
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result; // This is the Base64 string
          // Use the base64String in your component state or logic
          return resolve(base64String as string);
        };
        reader.readAsDataURL(blob);
      });
  });
};

/*#endregion các hàm publish */
