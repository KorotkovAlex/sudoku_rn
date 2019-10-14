import getDictionaryByLanguage from "../shared/locale";

export default class ConfigSingleton {
  private static instance: ConfigSingleton;
  private constructor() {}
  dictionary: any;

  public static shared(): ConfigSingleton {
    if (!ConfigSingleton.instance) {
      ConfigSingleton.instance = new ConfigSingleton();
      ConfigSingleton.instance.dictionary = getDictionaryByLanguage("en_EN");
    }

    return ConfigSingleton.instance;
  }

  public static setShared({ dictionary }: any) {
    ConfigSingleton.instance.dictionary = dictionary;
  }
}
