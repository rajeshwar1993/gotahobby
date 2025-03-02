import { Database as SupaDatabase } from "@/dataHandlers/supabase/database.types";
import { Group } from "@/types/group";
import axios from "axios";
import { createClient } from "@/utils/supabase/server";
import { DBHandler } from "../dbHandler";
import { SupabaseClient } from "@supabase/supabase-js";
import { Logger } from "@/utils/supabase/logger";
import { event_DBToObj, picture_DBToObj } from "./transformers";
import { Event } from "@/types/event";
import { GlanceUser, Picture, Tag } from "@/types";

export class SupabaseHandler extends DBHandler {
  private logger;
  private supabaseClient: SupabaseClient<SupaDatabase> | null = null;
  constructor() {
    super();
    this.logger = new Logger();
  }

  async connect() {
    this.supabaseClient = await createClient<SupaDatabase>();
  }

  async disconnect() {
    this.supabaseClient = null;
  }

  async getPictureById(
    query: { type: "single"; id: string } | { type: "multiple"; ids: string[] }
  ): Promise<Picture[]> {
    if (!this.supabaseClient) {
      throw new Error("Supabase client not initialized");
    }

    if (query.type === "single") {
      const { data: dbPicture, error } = await this.supabaseClient
        .from("picture")
        .select("*")
        .eq("id", query.id)
        .single();

      if (error) {
        throw error;
      }

      const picture: Picture = picture_DBToObj(dbPicture);

      return [picture];
    } else {
      const { data: dbPictures, error } = await this.supabaseClient
        .from("picture")
        .select("*")
        .in("id", query.ids);

      if (error) {
        throw error;
      }

      const pictures: Picture[] = dbPictures.map((dbPicture) =>
        picture_DBToObj(dbPicture)
      );

      return pictures;
    }
  }

  async getTagsByIds(tagIds: string[]): Promise<Tag[]> {
    if (!this.supabaseClient) {
      throw new Error("Supabase client not initialized");
    }

    const { data: dbTags, error } = await this.supabaseClient
      .from("tags")
      .select("*")
      .in("id", tagIds);

    if (error) {
      throw error;
    }

    const tags: Tag[] = dbTags.map((dbTag) => ({
      id: dbTag.id,
      value: dbTag.value,
    }));

    return tags;
  }

  async getGlanceUsersByIds(userIds: string[]): Promise<GlanceUser[]> {
    if (!this.supabaseClient) {
      throw new Error("Supabase client not initialized");
    }

    const { data: dbUsers, error } = await this.supabaseClient
      .from("users")
      .select(
        `id,
        displayName,
        picture:displayPicture(*)`
      )
      .in("id", userIds);

    if (error) {
      throw error;
    }

    const glanceUsers: GlanceUser[] = dbUsers.map((dbUser) => ({
      id: dbUser.id,
      displayName: dbUser.displayName,
      displayPicture: dbUser.picture
        ? picture_DBToObj(dbUser.picture)
        : undefined,
    }));

    return glanceUsers;
  }

  async getAllGroups(): Promise<Group[]> {
    const response = await axios.get("http://localhost:3090/api/groups/all");

    return response.data;
  }

  async getGroupById(groupId: string): Promise<Group> {
    const response = await axios.get("http://localhost:3090/api/group");

    return response.data;
  }

  async getEventById(eventId: string): Promise<Event> {
    if (!this.supabaseClient) {
      throw new Error("Supabase client not initialized");
    }

    const { data: dbEvent, error } = await this.supabaseClient
      .from("event")
      .select("*")
      .eq("id", eventId)
      .single();

    if (error) {
      throw error;
    }

    const bannerImage = dbEvent.bannerImage
      ? await this.getPictureById({ type: "single", id: dbEvent.bannerImage })
      : undefined;

    const tags = await this.getTagsByIds(dbEvent.tags);

    const hosts = await this.getGlanceUsersByIds(dbEvent.hosts);

    const photos = dbEvent.photos
      ? await this.getPictureById({ type: "multiple", ids: dbEvent.photos })
      : [];

    const event: Event = event_DBToObj({
      dbEvent,
      bannerImage: bannerImage ? bannerImage[0] : undefined,
      tags,
      hosts,
      photos,
    });

    return event;
  }

  async getAllEventsOfGroup(groupId: string): Promise<Event[] | null> {
    try {
      if (!this.supabaseClient) {
        throw new Error("Supabase client not initialized");
      }

      const { data: dbEvents, error } = await this.supabaseClient
        .from("event")
        .select("*")
        .eq("groupId", groupId);

      if (error) {
        throw error;
      }

      if (!dbEvents || dbEvents.length === 0) {
        return [];
      }

      // Transform each event
      const events: Event[] = await Promise.all(
        dbEvents.map(async (dbEvent) => {
          const bannerImage = dbEvent.bannerImage
            ? await this.getPictureById({
                type: "single",
                id: dbEvent.bannerImage,
              })
            : undefined;

          const tags = await this.getTagsByIds(dbEvent.tags || []);
          const hosts = await this.getGlanceUsersByIds(dbEvent.hosts || []);

          return event_DBToObj({
            dbEvent,
            bannerImage: bannerImage as Picture,
            tags,
            hosts,
          });
        })
      );

      return events;
    } catch (error) {
      this.logger.info("getAllEventsOfGroup", error);
      return null;
    }
  }
}
