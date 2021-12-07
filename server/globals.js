/* eslint-disable no-underscore-dangle */
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
export const root = path.join(dirname, "../");
