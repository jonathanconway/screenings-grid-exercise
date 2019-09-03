import screenings from "../data/screenings.json";
import { Screening } from "./Screenings.types";

interface GetScreeningsResponse {
  readonly results: readonly Screening[];
}

export const getScreenings = () =>
  new Promise<readonly Screening[]>(resolve =>
    setTimeout(() =>
      resolve((screenings as GetScreeningsResponse)
        .results
        .filter(x => !!x)
      ), 1500));

