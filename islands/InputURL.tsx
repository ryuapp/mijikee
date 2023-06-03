import { JSX } from "preact";
import { validUrl } from "../services/valid.ts";
import { useState } from "preact/hooks";

export default function InputUrl() {
  const [originUrl, setOriginUrl] = useState("");
  const [shortPath, setShortPath] = useState("");
  const [fullPath, setFullPath] = useState("");
  const [message, setMessage] = useState("");
  const [isValid, setValid] = useState(false);
  const handleSubmit = async (inputTarget: HTMLInputElement) => {
    const url = inputTarget.value;

    if (validUrl(url)) {
      console.log(url);
      await fetch("/api/v1/links", {
        method: "POST",
        body: JSON.stringify({
          "url": url,
        }),
      }).then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setShortPath("/" + data.shortPath);
          setFullPath(location.origin + "/" + data.shortPath);
          setOriginUrl(data.originUrl);
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
    if (validUrl((e.target as HTMLInputElement).value)) {
      setValid(true);
    } else {
      setValid(false);
    }
  };
  return (
    <>
      <input
        id="inputUrl"
        aria-invalid={isValid}
        class="w-full px-3 py-2 bg-white rounded border(gray-500 2) disabled:(opacity-50 cursor-not-allowed)"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      />
      <div class="text-center">
        {isValid
          ? <p class="text-green-500">OK</p>
          : <p class="text-red-500">Invalid Url</p>}
        <p>{message}</p>
        <p>{originUrl}</p>
        {message ? <p>↓</p> : ""}
        <a class="text-blue-500 hover:underline" href={shortPath}>{fullPath}</a>
      </div>
    </>
  );
}
