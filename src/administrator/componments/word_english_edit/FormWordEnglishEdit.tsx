import {
  Accordion,
  Button,
  Col,
  Form,
  InputGroup,
  Toast,
  ToastContainer,
  Image,
  Stack,
} from "react-bootstrap";
import {
  FormWordEnglishEditContext,
  type FormWordEnglishEditContextProps,
} from "./FormWordEnglishContext";
import { useContext, useEffect, useRef, useState } from "react";
import { GetAudioBaseStringByLink } from "../../../services/HttpGetFileServices";
import { ItemWordEnglishSentence } from "./ItemWordEnglishSentence";
import { v4 as uuidv4 } from "uuid";
import { getAudioTitle } from "../../../utils/utilsFunction";
import imageCompression from "browser-image-compression";

export const FormWordEnglishEdit = () => {
  const {
    dataDictionaryApi,
    fetchDataDictionaryApi,
    dataApi,
    setDataApi,
    saveDataApi,
    saveNewDataApi,
    isSavingDataApi,
    responseApi,
  } = useContext<FormWordEnglishEditContextProps>(FormWordEnglishEditContext);

  const [show, setShow] = useState(false);
  const audioIPA = useRef<HTMLAudioElement>(null);
  const [imageInfo, setImageInfo] = useState("");

  useEffect(() => {
    setShow(isSavingDataApi == "saved");
  }, [isSavingDataApi]);

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
  const handleChangeWordIPA = (event: string) => {
    setDataApi({
      ...dataApi,
      ipa: event,
    });
  };
  const handleChangeAudioIPA = (urlAudio: string) => {
    GetAudioBaseStringByLink(urlAudio)
      .then((value) => {
        setDataApi({
          ...dataApi,
          word_base_audio: value,
        });
      })
      .then(() => {
        audioIPA.current?.play();
      });
  };
  const handleChangeWordTranslation = (event: string) => {
    setDataApi({
      ...dataApi,
      word_translation: event,
    });
  };

  const handleFileDeleteWordAudio = () => {
    setDataApi({
      ...dataApi,
      word_base_audio: "",
    });
  };
  const handleFileChangeWordAudio = (
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    if (!event) return;
    const files = event.currentTarget.files;
    if (!files) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (dataApi.list_sentences == null) return;
      const base64String = reader.result as string;
      setDataApi({
        ...dataApi,
        word_base_audio: base64String,
      });
    };
    reader.readAsDataURL(file);
  };

  // const handleChangeSentenceEn = (id: string, event: string) => {
  //   const row = (dataApi.list_sentences ?? []).filter((f) => f.id == id)[0];
  //   row.sentence_en = event;
  //   setDataApi({
  //     ...dataApi,
  //   });
  // };

  const handleChangeSaveDataApi = () => {
    saveDataApi();
  };
  const handleChangeSaveNewDataApi = () => {
    saveNewDataApi();
  };

  const handleFileChangeIllustrationImage = async (
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    if (!event) return;
    const files = event.currentTarget.files;
    if (!files) return;
    const imageFile = files[0];
    const options = {
      maxSizeMB: 0.15,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    //
    const compressedFile = await imageCompression(imageFile, options);
    const sizeImage = `${Math.round(compressedFile.size / 1024)} KB`;
    setImageInfo(sizeImage);
    //
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setDataApi({
        ...dataApi,
        word_base_image: base64String as string,
      });
    };
    reader.readAsDataURL(compressedFile);
  };

  const handleFileDeleteIllustrationImage = () => {
    setDataApi({
      ...dataApi,
      word_base_image: "",
    });
  };

  const handleChangeAddSentence = () => {
    setDataApi({
      ...dataApi,
      list_sentences: [
        ...(dataApi.list_sentences ?? []),
        { id: uuidv4(), soid: dataApi.soid },
      ],
    });
  };

  const onCoppData = () => {
    navigator.clipboard.writeText(dataApi.word_en ?? "");
  };

  const getStatus = () => {
    let text_status = "text-danger";
    if ((responseApi.status ?? "") == "200") text_status = "text-success";
    return `${text_status} fw-bold`;
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
          <Toast.Body className={getStatus()}>
            {responseApi.message ?? ""}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <div></div>

      <Accordion
        className=""
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
            <InputGroup className="mt-1 mb-1">
              <InputGroup.Text className="text-xl text-success fw-bold">
                WOR
              </InputGroup.Text>
              <Form.Control
                size="lg"
                type="text"
                className="text-center text-xl text-lowercase text-success fw-bold"
                placeholder=""
                value={dataApi.word_en ?? ""}
                onChange={(event) => handleChangeWordEn(event.target.value)}
              />
            </InputGroup>

            <InputGroup className="mt-1 mb-1">
              <InputGroup.Text className="text-xl text-info fw-bold">
                IPA
              </InputGroup.Text>
              <Form.Control
                type="text"
                size="lg"
                // readOnly
                placeholder=""
                value={dataApi.ipa ?? ""}
                onChange={(event) => handleChangeWordIPA(event.target.value)}
                className="text-center text-xl text-info fw-bold"
              />
            </InputGroup>
            <InputGroup className="mt-1 mb-1">
              <InputGroup.Text className="text-warning fw-bold">
                TRA
              </InputGroup.Text>
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
            </InputGroup>
            <Stack direction="horizontal" gap={3}>
              <div className="ms-auto"> </div>
              <Button
                className=""
                variant="outline-secondary"
                onClick={() => onClickGetData()}
              >
                <i className="bi bi-cloud-download"></i>
              </Button>
              <a
                className=""
                href={`https://vdict.com/${dataApi.word_en ?? ""},1,0,0.html`}
                target="_blank"
              >
                <Button className="m-1" variant="outline-secondary">
                  <i className="bi bi-link"></i>
                </Button>
              </a>
              <Button
                className=""
                variant="outline-secondary"
                onClick={() => onCoppData()}
              >
                <i className="bi bi-copy"></i>
              </Button>
              <div className="ms-auto"> </div>
            </Stack>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <Form.Label className="w-100 text-center text-secondary fw-bold">
              Pronounce
            </Form.Label>
          </Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              {/* <Form.Label className="text-sm-left font-italic">
                File audio, 100KB
              </Form.Label> */}
              <Stack direction="horizontal" gap={3}>
                <a href={`https://soundoftext.com/`} target="_blank">
                  <Button size="sm" variant="outline-secondary">
                    <i className="bi bi-link"></i>
                  </Button>
                </a>

                <Button
                  size="sm"
                  variant="outline-secondary"
                  className=""
                  onClick={() => handleFileDeleteWordAudio()}
                >
                  <i className="bi bi-file-x"></i>
                </Button>
                <input
                  className=""
                  type="file"
                  accept="audio/*,audio/mp3,audio/m4a,audio/wav"
                  onChange={(event) => handleFileChangeWordAudio(event)}
                />
              </Stack>
            </Form.Group>
            {(dataDictionaryApi.phonetics ?? [])
              .filter((f) => (f.audio ?? "") != "")
              .map((item) => (
                // <div>{item.audio ?? ""}</div>
                <Button
                  className="m-1"
                  key={item.audio}
                  onClick={() => handleChangeAudioIPA(item.audio ?? "")}
                  variant="secondary"
                >
                  {getAudioTitle(item.audio ?? "")}
                </Button>
              ))}

            {/* <Button variant="secondary">UK</Button>
            <Button variant="secondary">US</Button> */}

            <Form.Label as={Col} className="text-center">
              <audio
                ref={audioIPA}
                className="w-100"
                controls
                src={dataApi.word_base_audio ?? "data:audio/mp3;base64"}
              ></audio>
            </Form.Label>
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
              <Form.Label className="text-sm-left">
                {`File image (JPG) 1000px-1000px, 200KB; compress ${imageInfo}`}
              </Form.Label>
              <Stack className="mb-3 mt-1" direction="horizontal" gap={3}>
                <a href={`https://www.freepik.com/`} target="_blank">
                  <Button size="sm" variant="outline-secondary">
                    <i className="bi bi-link"></i>
                  </Button>
                </a>
                <a href={`https://www.pexels.com/`} target="_blank">
                  <Button size="sm" variant="outline-secondary">
                    <i className="bi bi-link"></i>
                  </Button>
                </a>
                <a href={`https://pixabay.com/`} target="_blank">
                  <Button size="sm" variant="outline-secondary">
                    <i className="bi bi-link"></i>
                  </Button>
                </a>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  className=""
                  onClick={() => handleFileDeleteIllustrationImage()}
                >
                  <i className="bi bi-file-x"></i>
                </Button>
                <input
                  className=""
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleFileChangeIllustrationImage(event)}
                />
              </Stack>
              <Image
                key={`${dataApi.soid}-illustration-image`}
                src={dataApi.word_base_image ?? "data:image/gif;base64,"}
                fluid
                rounded
              ></Image>
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <Form.Label className="w-100 text-center text-secondary fw-bold">
              The sentence
            </Form.Label>
          </Accordion.Header>
          <Accordion.Body>
            {(dataApi.list_sentences ?? []).map((item) => (
              <ItemWordEnglishSentence key={item.id} item={item} />
            ))}
            <Button size="sm" onClick={() => handleChangeAddSentence()}>
              <span>Add Sentence</span>
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div style={{ height: "50px" }}></div>

      <Stack
        direction="horizontal"
        style={{ border: "1px solid back" }}
        gap={1}
        className="w-100 m-0 fixed-bottom mx-auto"
      >
        <div className="ms-auto"></div>

        <a href={`https://app-words-english.onrender.com/`}>
          <Button
            disabled={isSavingDataApi == "saving"}
            variant="success"
            // className="m-10"
            size="sm"
          >
            <Stack>
              <i className="bi bi-chevron-left"></i>
              <span>Back</span>
            </Stack>
          </Button>
        </a>

        <Button
          disabled={isSavingDataApi == "saving"}
          variant="success"
          size="sm"
          onClick={() => handleChangeSaveDataApi()}
        >
          <Stack>
            <i className="bi bi-check-circle"></i>
            <span>Save Update</span>
          </Stack>
        </Button>

        <Button
          disabled={isSavingDataApi == "saving"}
          variant="success"
          size="sm"
          onClick={() => handleChangeSaveNewDataApi()}
        >
          <Stack>
            <i className="bi bi-plus-circle"></i>
            <span>Save New</span>
          </Stack>
        </Button>
        <Button
          disabled={isSavingDataApi == "saving"}
          variant="success"
          size="sm"
          onClick={() => handleChangeSaveDataApi()}
        >
          <Stack>
            <i className="bi bi-arrow-left-circle"></i>
            <span>Save Back</span>
          </Stack>
        </Button>
        <Button
          disabled={isSavingDataApi == "saving"}
          variant="success"
          size="sm"
          onClick={() => handleChangeSaveDataApi()}
        >
          <Stack>
            <i className="bi bi-dash-circle"></i>
            <span>Save Draft</span>
          </Stack>
        </Button>
        <div className="ms-auto"></div>
      </Stack>
    </>
  );
};
