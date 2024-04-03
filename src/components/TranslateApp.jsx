import languages from "./Languages";
import copy from "/Copy.svg";
import logo from "/logo.svg";
import horizon from "/Horizontal_top_left_main.svg";
import sort from "/Sort_alfa.svg";
import sound from "/sound_max_fill.svg";
import { useState } from "react";
import { debounce } from "lodash";

export const TranslateApp = () => {
  const [inputText, setInputText] = useState("Hello , How are you ?");
  const [translatedText, setTranslatedText] = useState(
    "Bonjour, comment ça va?"
  );
  const [sourceLang, setSourceLang] = useState("es");
  const [targetLang, setTargetLang] = useState("fr");

  const switchLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  const translateText = async () => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          inputText
        )}!&langpair=${sourceLang}|${targetLang}`
      );
      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (err) {
      console.log("Error translating text:", err);
    }
  };

  const debouncedTranslate = debounce(translateText, 500);

  const handleTranslate = () => {
    debouncedTranslate();
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleListen = async (text, language) => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.language = language;
      console.log(utterance.language);
      await window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.log(`Listening to ${language} text: ${text} and Error: `, err);
    }
  };

  return (
    <div className="ta-container">
      <img src={logo} className="ta-logo" alt="logo" />
      <div className="ta-sections">
        <div className="ta-left">
          <span className="ta-languages">
            <button
              value="Autodetect"
              onClick={(e) => setSourceLang(e.target.value)}
              className={sourceLang === 'Autodetect' ? 'selected' : ''}
            >
              Detect Language
            </button>
            <button value="en" onClick={(e) => setSourceLang(e.target.value)} className={sourceLang === 'en' ? 'selected' : ''}>
              English
            </button>
            <button value="fr" onClick={(e) => setSourceLang(e.target.value)} className={sourceLang === 'fr' ? 'selected' : ''}>
              French
            </button>
            <select
              name="languages"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              id=""
            >
              <option value="es">Spanish</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <hr />
          </span>
          <div className="ta-text">
            <textarea
              value={inputText}
              rows={9}
              maxLength={500}
              onChange={(e) => setInputText(e.target.value)}
            />
            <p className="ta-charCount">{inputText.length}/500</p>
          </div>
          <div className="ta-buttons">
            <div className="imgBtns">
              <img
                src={sound}
                className="ta-img-btn"
                alt="voice img"
                onClick={() => handleListen(inputText, sourceLang)}
              />
              <img
                src={copy}
                className="ta-img-btn"
                alt="copy img"
                onClick={() => handleCopy(inputText)}
              />
            </div>
            <div className="ta-translate" onClick={handleTranslate}>
              <img src={sort} alt="" />
              Translate
            </div>
          </div>
        </div>
        <div className="ta-right">
          <div className="ta-languages">
            <button value="en" onClick={(e) => setTargetLang(e.target.value)} className={targetLang === 'en' ? 'selected' : ''}>
              English
            </button>
            <button value="fr" onClick={(e) => setTargetLang(e.target.value)} className={targetLang === 'fr' ? 'selected' : ''}>
              French
            </button>
            <select
              name="languages"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              id=""
            >
              <option value="es">Spanish</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <img
              src={horizon}
              onClick={switchLanguages}
              className="ta-langSwitch"
              alt="Language switch img"
            />
            <hr />
            <div className="ta-text">
              <p>{translatedText}</p>
            </div>
          </div>
          <div className="ta-buttons ">
            <div className="imgBtns">
              <img
                src={sound}
                className="ta-img-btn"
                alt="voice img"
                onClick={() => handleListen(translatedText, targetLang)}
              />
              <img
                src={copy}
                className="ta-img-btn"
                alt="copy img"
                onClick={() => handleCopy(translatedText)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslateApp;
