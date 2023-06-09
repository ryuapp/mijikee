import { z } from "zod";

export function validUrl(url: string | URL) {
  const httpsSchema = z.string().startsWith("https://");
  if (httpsSchema.safeParse(url).success) return true;
  return false;
}
