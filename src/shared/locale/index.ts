import ru_RU from "./ru-RU.json";
import en_EN from "./en-EN.json";

export default function getDictionaryByLanguage(languageCode: string) {
  console.log("getDictionaryByLanguage");
  const dictionaries: any = {
    ru_RU,
    en_EN
  };
  console.log("getDictionaryByLanguage", dictionaries[languageCode]);
  return dictionaries[languageCode] || dictionaries.en_EN;
}
