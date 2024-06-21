/**
 * Specifies which version of the Splits.io Exchange Format the run was produced for. If you try to parse a run and this field doesn't validate, you probably need to update your Splits.io Exchange Format schema. All schemas accept any patch of an equivalent major-minor version, and any lesser minor version of an equivalent major version (e.g. v.. accepts v.0.0, v..0, and v.., but not v..0 or v.0.0). The exception is definition v.0.0, which only accepts v.0.0 runs.
 */
export type SplitsIoExchangeFormatVersion = string
/**
 * Speedrun.com ID is the run's ID on Speedrun.com. This can be used to communicate with the Speedrun.com API.
 */
export type SpeedrunComID = string
/**
 * Splits.io ID is the run's ID on Splits.io. This can be used to communicate with the Splits.io API.
 */
export type SplitsIoID = string
/**
 * Shortname is a machine-readable timer name, intended for use in APIs, databases, URLs, and filenames.
 */
export type Shortname = string
/**
 * Longname is a human-readable timer name, intended for display to users.
 */
export type Longname = string
/**
 * Version is the version of the timer used to record this run. Semantic Versioning is strongly recommended but not enforced.
 */
export type Version = string
/**
 * Website is the URL for the timer's website.
 */
export type Website = string
/**
 * Total holds the total number of attempts for this category.
 */
export type Total = number
/**
 * Attempt Number is the number of lifetime attempts the runner will have made after this one. The Attempt Number for an attempt is a label, not an index; the first attempt for a category has an Attempt Number of  (not 0).
 */
export type AttemptNumber = number
/**
 * Realtime (Milliseconds) is a duration of milliseconds in real-world time.
 */
export type RealtimeMilliseconds = number
/**
 * Gametime (Milliseconds) is a duration of milliseconds in game-world time.
 */
export type GametimeMilliseconds = number
/**
 * Category Histories is an array of previous attempts by this runner of this category.
 */
export type CategoryHistories = CategoryHistory[]
/**
 * Category Histories is an array of previous attempts by this runner of this category.
 */
export type SegmentHistories = SegmentHistory[]
/**
 * Image URL is the location of an image associated with this run. Often this is a screenshot of the timer at run completion, but can be anything the runner wants displayed alongside the run.
 */
export type ImageURL = string
/**
 * Video URL is the location of a VOD of the run.
 */
export type VideoURL = string
/**
 * Started At is the date and time at which the run was started, specified in RFC 9 format.
 */
export type StartedAt = string
/**
 * Ended At is the date and time at which the run was ended, specified in RFC 9 format.
 */
export type EndedAt = string
/**
 * Pauses holds runner-caused pauses that took place during the run.
 */
export type Pauses = Pause[]
/**
 * Twitch ID specifies the runner's Twitch ID.
 */
export type TwitchID = string
/**
 * Twitter ID specifies the runner's Twitter ID.
 */
export type TwitterID = string
/**
 * Runners is an array of people who participated in this run. Some games and categories call for cooperative play, but otherwise this will usually be just one person.
 */
export type Runners = Runner[]
/**
 * Name is the runner-provided name of this segment
 */
export type Name = string
/**
 * Is Skipped should be true if the runner skipped over the split that ends this segment, rather than splitting. If so, this segment's Ended At is ignored.
 */
export type IsSkipped = boolean
/**
 * Is Reset should be true if the runner reset the run during this segment. If so, this and all future segments' Ended Ats for this run are ignored.
 */
export type IsReset = boolean
/**
 * Segments is an array of all segments for this run, ordered from first to last.
 */
export type Segments = Segment[]

/**
 * The Splits.io Exchange Format is a specification for the transmission of runs between services and programs.
 */
export interface SplitsIoExchangeFormat {
  _schemaVersion: SplitsIoExchangeFormatVersion
  links?: Links
  timer: Timer
  attempts?: Attempts
  imageURL?: ImageURL
  videoURL?: VideoURL
  startedAt?: StartedAt
  endedAt?: EndedAt
  pauses?: Pauses
  game?: Game
  category?: Category
  runners?: Runners
  segments?: Segments
}
/**
 * Timer holds information about the timer used to record the run.
 */
export interface Timer {
  shortname: Shortname
  longname: Longname
  version: Version
  website?: Website
}
/**
 * Attempts contains historical information about previous runs by this runner in this category.
 */
export interface Attempts {
  total?: Total
  histories?: CategoryHistories
}
/**
 * History is a single recorded attempt of this category by this runner.
 */
export interface History {
  attemptNumber: AttemptNumber
  duration?: Duration
}
/**
 * Duration holds a realtime duration and a gametime duration.
 */
export interface Duration {
  realtimeMS?: RealtimeMilliseconds
  gametimeMS?: GametimeMilliseconds
}
/**
 * Pause is a single pause that took place during the run.
 */
export interface Pause {
  startedAt: StartedAt
  endedAt?: EndedAt
}
/**
 * Game specifies information about the game being run.
 */
export interface Game {
  longname: Longname
  shortname?: Shortname
  links?: Links
}
/**
 * Links specifies the category or game's identity in other services.
 */
export interface Links {
  splitsioID?: SplitsIoID
  speedruncomID?: SpeedrunComID
}
/**
 * Category specifies information about the category being run.
 */
export interface Category {
  longname: Longname
  shortname?: Shortname
  links?: Links
}
/**
 * Runner describes one participant in the recorded run.
 */
export interface Runner {
  longname?: Longname
  shortname: Shortname
  links?: RunnerLinks
}
/**
 * Links specifies the runner's identity in other services.
 */
export interface RunnerLinks {
  twitchID?: TwitchID
  splitsioID?: SplitsIoID
  speedruncomID?: SpeedrunComID
  twitterID?: TwitterID
}
/**
 * Segment is one segment in this run.
 */
export interface Segment {
  name?: Name
  endedAt?: RunTime
  bestDuration?: Duration
  isSkipped?: IsSkipped
  isReset?: IsReset
  histories?: SegmentHistories
}
/**
 * Run Time represents a moment inside a run, and indicates the duration of the run so far at that moment. It holds a realtime run duration so far and a gametime run duration so far.
 */
export interface RunTime {
  realtimeMS?: RealtimeMilliseconds
  gametimeMS?: GametimeMilliseconds
}
/**
 * History is a single recorded attempt of this category by this runner.
 */
export interface CategoryHistory {
  attemptNumber: AttemptNumber;
  duration?: Duration;
}
/**
 * History is a single recorded attempt of this segment by this runner.
 */
export interface SegmentHistory {
  attemptNumber: AttemptNumber
  endedAt?: RunTime
  isSkipped?: IsSkipped
  isReset?: IsReset
}
