export type SpeedrunInfo = {
  title: string,
  game: string,
  splits: Split[]
}

export interface Split {
  name: string,
  time?: number,
  best?: number,
  pb?: number
}