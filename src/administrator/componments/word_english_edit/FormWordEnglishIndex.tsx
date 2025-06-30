import { FormWordEnglishEditProvider } from "./FormWordEnglishContext";
import { FormWordEnglishEdit } from "./FormWordEnglishEdit";

export const FormWordEnglishIndex = () => {
  return (
    <>
      <FormWordEnglishEditProvider>
        <FormWordEnglishEdit />
      </FormWordEnglishEditProvider>
    </>
  );
};
