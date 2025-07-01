import {
  Accordion,
  Button,
  Col,
  FloatingLabel,
  Form,
  InputGroup,
  Toast,
  ToastContainer,
  Image,
} from "react-bootstrap";
import {
  FormWordEnglishEditContext,
  type FormWordEnglishEditContextProps,
} from "./FormWordEnglishContext";
import { useContext, useState } from "react";
import { GetAudioBaseStringByLink } from "../../../services/HttpGetFileServices";

export const FormWordEnglishEdit = () => {
  const {
    dataDictionaryApi,
    fetchDataDictionaryApi,
    dataApi,
    setDataApi,
    saveDataApi,
  } = useContext<FormWordEnglishEditContextProps>(FormWordEnglishEditContext);

  const [show, setShow] = useState(false);

  //#region các hàm xử lý
  const onClickGetData = async () => {
    await fetchDataDictionaryApi();
  };
  const handleChangeWordEn = (event: string) => {
    setDataApi({
      ...dataApi,
      word_en: event,
    });
  };
  const handleChangeAudioIPA = (urlAudio: string) => {
    GetAudioBaseStringByLink(urlAudio).then((value) => {
      setDataApi({
        ...dataApi,
        word_base_audio: value,
      });
    });
  };
  const handleChangeWordTranslation = (event: string) => {
    setDataApi({
      ...dataApi,
      word_translation: event,
    });
  };

  const handleChangeSentenceEn = (id: string, event: string) => {
    const row = (dataApi.list_sentences ?? []).filter((f) => f.id == id)[0];
    row.sentence_en = event;
    setDataApi({
      ...dataApi,
    });
  };

  const handleChangeSaveDataApi = () => {
    setShow(false);
    saveDataApi();
    setShow(true);
  };
  const handleFileChangeIllustrationImage = (
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    if (!event) return;
    const files = event.currentTarget.files;
    if (!files) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setDataApi({
        ...dataApi,
        word_base_image: base64String as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileDeleteIllustrationImage = () => {
    setDataApi({
      ...dataApi,
      word_base_image: "",
    });
  };

  //#endregion các hàm
  return (
    <>
      <ToastContainer
        className="p-3"
        position="bottom-center"
        style={{ zIndex: 10 }}
      >
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body className="text-success fw-bold">
            Lưu thành công
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Accordion
        className="mb-3"
        defaultActiveKey={["0", "1", "2", "3", "4", "5"]}
        alwaysOpen
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header className="">
            <Form.Label className="w-100 text-center text-xl text-success fw-bold">
              The word English
            </Form.Label>
          </Accordion.Header>
          <Accordion.Body>
            <InputGroup className="">
              <Form.Control
                size="lg"
                type="text"
                className="text-center text-xl text-lowercase text-success fw-bold"
                placeholder=""
                value={dataApi.word_en ?? ""}
                onChange={(event) => handleChangeWordEn(event.target.value)}
              />
              <Button variant="info" onClick={() => onClickGetData()}>
                GET API
              </Button>
            </InputGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <Form.Label className="w-100 text-center text-info fw-bold">
              IPA
            </Form.Label>
          </Accordion.Header>
          <Accordion.Body>
            <Form.Control
              type="text"
              size="lg"
              readOnly
              placeholder=""
              value={dataApi.ipa ?? ""}
              className="text-center text-xl text-info fw-bold"
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <Form.Label className="w-100  text-center text-secondary fw-bold">
              Pronounce
            </Form.Label>
          </Accordion.Header>
          <Accordion.Body>
            {(dataDictionaryApi.phonetics ?? [])
              .filter((f) => (f.audio ?? "") != "")
              .map((item) => (
                // <div>{item.audio ?? ""}</div>
                <Button
                  onClick={() => handleChangeAudioIPA(item.audio ?? "")}
                  variant="secondary"
                >
                  {item.audio ?? ""}
                </Button>
              ))}

            {/* <Button variant="secondary">UK</Button>
            <Button variant="secondary">US</Button> */}

            <Form.Label as={Col} className="text-center">
              <audio controls src={dataApi.word_base_audio ?? ""}></audio>
            </Form.Label>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <Form.Label className="w-100 text-center text-warning fw-bold">
              Từ tiếng việt
            </Form.Label>
          </Accordion.Header>
          <Accordion.Body>
            <Form.Control
              type="text"
              size="lg"
              placeholder=""
              className="text-center text-warning fw-bold"
              value={dataApi.word_translation ?? ""}
              onChange={(event) =>
                handleChangeWordTranslation(event.target.value)
              }
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <Form.Label className="w-100 text-center text-secondary fw-bold">
              Illustration Image
            </Form.Label>
          </Accordion.Header>
          <Accordion.Body>
            <Form.Group>
              <Form.Label>1000px-1000px, 100KB</Form.Label>
              <InputGroup>
                <Button onClick={() => handleFileDeleteIllustrationImage()}>
                  Delete image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleFileChangeIllustrationImage(event)}
                />
              </InputGroup>
              <Image src={dataApi.word_base_image ?? ""} fluid></Image>
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <Form.Label className="text-center fw-bold">
              The sentence
            </Form.Label>
          </Accordion.Header>
          <Accordion.Body>
            {(dataApi.list_sentences ?? []).map((item) => (
              <div>
                <FloatingLabel
                  className="mb-3"
                  controlId="floatingTextarea2"
                  label="Make a sentence at your level of English"
                >
                  <Form.Control
                    as="textarea"
                    className="text-start text-warning fw-bold"
                    placeholder="Make a sentence at your level of English"
                    value={item.sentence_en ?? ""}
                    onChange={(event) =>
                      handleChangeSentenceEn(item.id, event.target.value)
                    }
                    style={{ height: "100px" }}
                  />
                </FloatingLabel>
                <Form.Group controlId="formFile">
                  <Form.Label>Choose file audio of sentence</Form.Label>
                  <InputGroup>
                    <Form.Control type="file" size="sm" />
                    {/* <Button variant="info">Listen</Button> */}
                  </InputGroup>
                  <audio controls src={item.sentence_base_audio ?? ""}></audio>
                </Form.Group>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Button
        variant="primary"
        size="lg"
        type="submit"
        onClick={() => handleChangeSaveDataApi()}
      >
        Save
      </Button>
    </>
  );
};
