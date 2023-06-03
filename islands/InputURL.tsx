import { JSX } from "preact";
import { validURL } from "../services/valid.ts";
import { useState } from "preact/hooks";

export default function InputURL() {
  const [originURL, setOriginURL] = useState("");
  const [shortPath, setShortPath] = useState("");
  const [fullPath, setFullPath] = useState("");
  const [message, setMessage] = useState("");
  const [isValid, setValid] = useState(false);
  const handleSubmit = async (inputTarget: HTMLInputElement) => {
    const url = inputTarget.value;

    if (validURL(url)) {
      console.log(url);
      await fetch("/api/v1/links", {
        method: "POST",
        body: JSON.stringify({
          "url": url,
        }),
      }).then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setShortPath("/" + data.path);
          setFullPath(location.origin + "/" + data.path);
          setOriginURL(url);
          setMessage("Success!");
          inputTarget.value = "";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const handleKeyDown = (e: JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !e.target) {
      return;
    }
    handleSubmit(e.target as HTMLInputElement);
  };
  const handleInput = (e: JSX.TargetedEvent) => {
    if (validURL((e.target as HTMLInputElement).value)) {
      setValid(true);
    } else {
      setValid(false);
    }
  };
  return (
    <>
      <input
        id="inputURL"
        aria-invalid={isValid}
        class="w-full px-3 py-2 bg-white rounded border(gray-500 2) disabled:(opacity-50 cursor-not-allowed)"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      />
      <div class="text-center">
        {isValid
          ? <p class="text-green-500">OK</p>
          : <p class="text-red-500">Invalid URL</p>}
        <p>{message}</p>
        <p>{originURL}</p>
        {message ? <p>↓</p> : ""}
        <a class="text-blue-500 hover:underline" href={shortPath}>{fullPath}</a>
      </div>
    </>
  );
}
