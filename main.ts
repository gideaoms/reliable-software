import { z } from "zod";
import { right, left, match } from "./either.ts";

const schema = z.object({
  datetime: z.string(),
});

async function getCurrentDateTime() {
  try {
    const URL = "https://worldtimeapi.org/api/timezone/America/Sao_Paulo";
    const response = await fetch(URL);
    const data = await response.json();
    const parsed = schema.parse(data);
    return right(parsed.datetime);
  } catch (err) {
    if (err instanceof Error) {
      return left(err.message);
    }
    throw err;
  }
}

const result = await getCurrentDateTime();
const str = match(result, {
  Left: (value) => `left: ${value}`,
  Right: (value) => `right: ${value}`,
});
console.log(str);
