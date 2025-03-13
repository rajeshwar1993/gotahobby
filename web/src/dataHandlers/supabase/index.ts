import { Database as SupaDatabase } from "@/dataHandlers/supabase/database.types";
import { Group } from "@/types/group";
import axios from "axios";
import { DBHandler } from "../dbHandler";
import { SupabaseClient } from "@supabase/supabase-js";
import { Logger } from "@/utils/supabase/logger";
import { event_DBToObj, picture_DBToObj } from "./transformers";
import { Event } from "@/types/event";
import { Bio, GlanceUser, Picture, PictureType, Tag } from "@/types";

type GroupInsert = SupaDatabase["public"]["Tables"]["group"]["Insert"];
type UpdateEvent = SupaDatabase["public"]["Tables"]["event"]["Update"];
type PictureInsert = SupaDatabase["public"]["Tables"]["picture"]["Insert"];

export class SupabaseHandler extends DBHandler {
  private logger;
  private supabaseClient: SupabaseClient<SupaDatabase> | null = null;
  constructor(client: SupabaseClient<SupaDatabase>) {
    super();
    this.logger = new Logger();
    this.supabaseClient = client;
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
    if (!this.supabaseClient) {
      throw new Error("Supabase client not initialized");
    }

    const { data: dbGroup, error } = await this.supabaseClient
      .from("group")
      .select("*")
      .eq("id", groupId)
      .single();

    if (error) {
      throw error;
    }

    // Fetch the banner image if it exists
    const bannerImage = dbGroup.bannerImage
      ? await this.getPictureById({ type: "single", id: dbGroup.bannerImage })
      : undefined;

    const photos = dbGroup.photos
      ? await this.getPictureById({ type: "multiple", ids: dbGroup.photos })
      : [];

    // Fetch tags if they exist
    const tags = dbGroup.tags ? await this.getTagsByIds(dbGroup.tags) : [];

    // Fetch members if they exist
    const members = dbGroup.members
      ? await this.getGlanceUsersByIds(dbGroup.members)
      : [];

    // Transform the database group object to a client-side Group object
    const group: Group = {
      id: dbGroup.id,
      createdAtUTC: dbGroup.created_at,
      name: dbGroup.title || "",
      coverPicture: bannerImage && bannerImage[0],
      photos,
      bio: dbGroup.bio as Bio,
      tags,
      members,
    };

    return group;
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
          const photos = dbEvent.photos
            ? await this.getPictureById({
                type: "multiple",
                ids: dbEvent.photos,
              })
            : [];

          return event_DBToObj({
            dbEvent,
            bannerImage: bannerImage ? bannerImage[0] : undefined,
            tags,
            hosts,
            photos,
          });
        })
      );

      return events;
    } catch (error) {
      this.logger.info("getAllEventsOfGroup", error);
      return null;
    }
  }

  // Override the createEvent method from DBHandler
  async createEvent(
    eventName: string,
    groupId: string
  ): Promise<{ id: string }> {
    if (!this.supabaseClient) {
      throw new Error("Supabase client not initialized");
    }

    const { data: event, error } = await this.supabaseClient
      .from("event")
      .insert({
        title: eventName,
        groupId: groupId,
        hosts: [], // Default empty array
        tags: [], // Default empty array
        status: "draft",
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      this.logger.error("createEvent", error);
      throw error;
    }

    return { id: event.id };
  }

  // Override the updateEvent method from DBHandler
  async updateEvent(eventId: string, data: UpdateEvent): Promise<void> {
    if (!this.supabaseClient) {
      throw new Error("Supabase client not initialized");
    }

    const { error } = await this.supabaseClient
      .from("event")
      .update(data)
      .eq("id", eventId);

    if (error) {
      this.logger.error("updateEvent", error);
      throw error;
    }
  }

  async deleteEvent(eventId: string): Promise<void> {}

  // Override the createGroup method from DBHandler
  async createGroup(input: {
    title?: string;
    createdBy: string;
  }): Promise<{ id: string }> {
    if (!this.supabaseClient) {
      throw new Error("Supabase client not initialized");
    }

    const { data: group, error } = await this.supabaseClient
      .from("group")
      .insert({
        title: input.title || "New Group", // Default name if none provided
        created_at: new Date().toISOString(),
        createdBy: input.createdBy, // Required field
        members: [input.createdBy], // Add creator as first member
        tags: [], // Default empty array
        photos: [], // Default empty array
      })
      .select()
      .single();

    if (error) {
      this.logger.error("createGroup", error);
      throw error;
    }

    return { id: group.id };
  }

  async getTagById(tagId: string): Promise<Tag> {
    if (!this.supabaseClient) {
      throw new Error("Supabase client not initialized");
    }

    const { data: dbTag, error } = await this.supabaseClient
      .from("tags")
      .select("*")
      .eq("id", tagId)
      .single();

    if (error) {
      throw error;
    }

    const tag: Tag = {
      id: dbTag.id,
      value: dbTag.value,
    };

    return tag;
  }

  async createTag(value: string): Promise<Tag> {
    if (!this.supabaseClient) {
      throw new Error("Supabase client not initialized");
    }

    const { data: tag, error } = await this.supabaseClient
      .from("tags")
      .insert({ value })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      id: tag.id,
      value: tag.value,
    };
  }

  async createNewImage(data: PictureInsert): Promise<boolean> {
    if (!this.supabaseClient) {
      throw new Error("Supabase client not initialized");
    }

    const { error } = await this.supabaseClient.from("picture").insert([data]);

    if (error) {
      throw error;
    }

    return true;
  }
}
