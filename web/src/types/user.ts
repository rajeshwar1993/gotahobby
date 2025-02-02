import { Bio, Email, Picture, Interest, Phone, Entity } from "@/types";
import { RSVP_Status } from "./enums";

type Basic = {
  firstName: string;
  middleName: string;
  lastName: string;
  alias: string;
};

type Contact = {
  email: Email;
  phone: Phone;
};

export type BasicUser = Entity & {
  basic: Basic;
  profilePhoto: Picture;
};

export type GlanceUser = BasicUser & {};

export type User = BasicUser & {
  contact: Contact;
  bio: Bio;
  interests: Array<Interest>;
};

export type Attendee = GlanceUser & {
  rsvp: RSVP_Status;
};
