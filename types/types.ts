export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

export type MovieMetadata = {
  id: string;
  year: number;
  title: string;
  origin: string;
  director: string;
  cast: string;
  genre: string;
  wiki: string;
  plot: string;
};
