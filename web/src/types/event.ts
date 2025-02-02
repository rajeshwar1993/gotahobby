import { Attendee, Bio, Entity, GlanceUser, Picture } from "@/types";
import { DAY } from "./enums";

type Host = GlanceUser & {};

type Place = {
  locationUrl: string;
  name: string;
};

type Appointment = {
  date: string;
  day: DAY;
  startTime: string;
  endTime: string;
};

export type Event = Entity & {
  name: string;
  bio: Bio;
  coverPicture: Picture;
  location: Place;
  appointment: Appointment;
  host: Array<Host>;
  attendees: Array<Attendee>;
};
