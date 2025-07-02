import { FormWordEnglishEditProvider } from "./FormWordEnglishContext";
import { FormWordEnglishEdit } from "./FormWordEnglishEdit";
////http://localhost:5173/administrator/word-english-edit/12/true
//http://localhost:5173/administrator/word-english-edit/1Z6RHC4DD66umag7bUO2K6XXPmY9rlBuq/false
export const FormWordEnglishIndex = () => {
  return (
    <>
      <FormWordEnglishEditProvider>
        <FormWordEnglishEdit />
      </FormWordEnglishEditProvider>
    </>
  );
};
