import { createHash } from "crypto";

function sha256(message: string): string {
  return createHash("sha256").update(message).digest("hex");
}

export { sha256 };

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
