import { JSX } from "preact";
import { validURL } from "../services/valid.ts";
import { useState } from "preact/hooks";

export default function InputURL() {
  const [isValid, setValid] = useState(false);
  const handleSubmit = (value: string) => {
    if (validURL(value)) {
      console.log(value);
    }
  };
  const handleKeyDown = (e: JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !e.target) {
      return;
    }
    handleSubmit((e.target as HTMLInputElement).value);
  };
  const handleInput = (e: JSX.TargetedEvent) => {
    if (validURL((e.target as HTMLInputElement).value)) {
      setValid(true);
    } else {
      setValid(false);
    }
  };
  return (
    <input
      id="inputURL"
      aria-invalid={isValid}
      class="w-full px-3 py-2 bg-white rounded border(gray-500 2) disabled:(opacity-50 cursor-not-allowed)"
      onKeyDown={handleKeyDown}
      onInput={handleInput}
    />
  );
}
