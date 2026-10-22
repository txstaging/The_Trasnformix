import { SERVICES as arabicServices } from "@/lib/services";
import { SECTOR_OPTIONS as arabicSectors } from "@/components/v2/contact/options";
import { SERVICES as englishServices } from "./services";
import { SECTOR_OPTIONS as englishSectors } from "../components/v2/contact/options";

// Existing endpoints validate these values. Keep their contract unchanged.
const originalValues = new Map<string, string>([
  ...englishServices.map((label, index) => [label, arabicServices[index]] as [string, string]),
  ...englishSectors.map((label, index) => [label, arabicSectors[index]] as [string, string]),
]);

export function englishContactFetch(input: RequestInfo | URL, init?: RequestInit) {
  if (typeof init?.body !== "string") return globalThis.fetch(input, init);
  const body = JSON.parse(init.body) as Record<string, unknown>;
  if (Array.isArray(body.services)) {
    body.services = body.services.map(value => originalValues.get(value) ?? value);
  }
  if (typeof body.sector === "string") body.sector = originalValues.get(body.sector) ?? body.sector;
  return globalThis.fetch(input, { ...init, body: JSON.stringify(body) });
}
