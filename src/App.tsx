import { useEffect, useRef } from "react";
// import "./App.css";
// import { getTokenString } from "./services/HttpServices";
// import { GetWords } from "./services/HttpDictionaryServices";
// import { GetAudioBaseStringByLink } from "./services/HttpGetFileServices";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormWordEnglishIndex } from "./administrator/componments/word_english_edit/FormWordEnglishIndex";

function App() {
  // const [audioValue, setAudioVallue] = useState("");
  const initialized = useRef(false);

  async function fetchData() {
    // const data = await getTokenString();
    // console.log(data);
  }

  async function fetchDataDic() {
    //const data = await GetWords("sink");
    // console.log(data);
  }

  async function fetchDataAudio() {
    // const data = await GetAudioBaseStringByLink(
    //   "https://api.dictionaryapi.dev/media/pronunciations/en/sink-us.mp3"
    // );
    // setAudioVallue(data);
    //console.log(data);
  }

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    fetchData();
    fetchDataDic();
    fetchDataAudio();
    return () => {
      console.log("App: useEffect - count - cleanup");
    };
  }, []);

  return (
    <>
      <FormWordEnglishIndex></FormWordEnglishIndex>
      {/* <div>{audioValue}</div>
      <audio controls src={audioValue}></audio>
      <div>from html</div>
      <audio controls>
        <source
          src="https://api.dictionaryapi.dev/media/pronunciations/en/sink-uk.mp3"
          type="audio/mpeg"
        ></source>
      </audio> */}
    </>
  );
}

export default App;
