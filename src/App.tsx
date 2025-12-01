import { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
const CLIENT_ID =
  "333770945451-t5i9hsfdh7q7fl6vqb6n10snk552l18g.apps.googleusercontent.com";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import SessionStorageKey from "./administrator/SessionStorageKey";

interface GoogleJwtPayload extends JwtPayload {
  email?: string;
  name?: string;
  picture?: string;
}

function App() {
  // const [audioValue, setAudioVallue] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    return () => {
      console.log("App: useEffect - count - cleanup");
    };
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const token = credentialResponse.credential;
            if (token == null) {
              console.log("No token received");
              return;
            }
            const userInfo = jwtDecode<GoogleJwtPayload>(token);
            console.log("User Info:", userInfo);
            if (userInfo == null || userInfo.email == null) {
              console.log("Failed to decode token");
              return;
            }
            if (
              userInfo.email === import.meta.env.VITE_mr_tien_gmail ||
              userInfo.email === import.meta.env.VITE_mr_tien_developer_gmail
            ) {
              sessionStorage.setItem(
                SessionStorageKey.TokenEmail,
                userInfo.email!
              );
              navigate("/");
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>

      {/* <EnglishDisplayIndex></EnglishDisplayIndex> */}

      {/* <FormWordEnglishIndex></FormWordEnglishIndex> */}
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
