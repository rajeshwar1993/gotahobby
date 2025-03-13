export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      event: {
        Row: {
          bannerImage: string | null;
          bio: string | null;
          capacity: number | null;
          created_at: string;
          fee: Json | null;
          groupId: string | null;
          hosts: string[];
          id: string;
          isPublic: boolean | null;
          location: Json | null;
          photos: string[] | null;
          status: Database["public"]["Enums"]["EventStatus"] | null;
          tags: string[];
          timings: Json | null;
          title: string;
        };
        Insert: {
          bannerImage?: string | null;
          bio?: Json | null;
          capacity?: number | null;
          created_at?: string;
          fee?: Json | null;
          groupId?: string | null;
          hosts: string[];
          id?: string;
          isPublic?: boolean | null;
          location?: Json | null;
          photos?: string[] | null;
          status?: Database["public"]["Enums"]["EventStatus"] | null;
          tags: string[];
          timings?: Json | null;
          title?: string;
        };
        Update: {
          bannerImage?: string | null;
          bio?: Json | null;
          capacity?: number | null;
          created_at?: string;
          fee?: Json | null;
          groupId?: string | null;
          hosts?: string[];
          id?: string;
          isPublic?: boolean | null;
          location?: Json | null;
          photos?: string[] | null;
          status?: Database["public"]["Enums"]["EventStatus"] | null;
          tags?: string[];
          timings?: Json | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_bannerImage_fkey";
            columns: ["bannerImage"];
            isOneToOne: false;
            referencedRelation: "picture";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_groupId_fkey";
            columns: ["groupId"];
            isOneToOne: false;
            referencedRelation: "group";
            referencedColumns: ["id"];
          }
        ];
      };
      group: {
        Row: {
          bannerImage: string | null;
          bio: string | null;
          created_at: string;
          createdBy: string;
          id: string;
          members: string[];
          photos: string[] | null;
          tags: string[] | null;
          title: string | null;
        };
        Insert: {
          bannerImage?: string | null;
          bio?: Json | null;
          created_at?: string;
          createdBy: string;
          id?: string;
          members: string[];
          photos?: string[] | null;
          tags?: string[] | null;
          title?: string | null;
        };
        Update: {
          bannerImage?: string | null;
          bio?: Json | null;
          created_at?: string;
          createdBy?: string;
          id?: string;
          members?: string[];
          photos?: string[] | null;
          tags?: string[] | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "group_bannerImage_fkey";
            columns: ["bannerImage"];
            isOneToOne: false;
            referencedRelation: "picture";
            referencedColumns: ["id"];
          }
        ];
      };
      picture: {
        Row: {
          alt: string | null;
          associatedTo: string;
          caption: string | null;
          created_at: string;
          height: number | null;
          id: string;
          size: number | null;
          src: string;
          type: Database["public"]["Enums"]["PictureType"];
          width: number | null;
        };
        Insert: {
          alt?: string | null;
          associatedTo: string;
          caption?: string | null;
          created_at?: string;
          height?: number | null;
          id?: string;
          size?: number | null;
          src: string;
          type: Database["public"]["Enums"]["PictureType"];
          width?: number | null;
        };
        Update: {
          alt?: string | null;
          associatedTo?: string;
          caption?: string | null;
          created_at?: string;
          height?: number | null;
          id?: string;
          size?: number | null;
          src?: string;
          type?: Database["public"]["Enums"]["PictureType"];
          width?: number | null;
        };
        Relationships: [];
      };
      tags: {
        Row: {
          created_at: string;
          id: string;
          value: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          value: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          value?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          bio: string | null;
          created_at: string;
          dateOfBirth: string | null;
          displayName: string;
          displayPicture: string | null;
          email: string;
          emailVerified: boolean | null;
          fullName: string | null;
          id: string;
          isActive: boolean;
          isVerified: boolean;
          phoneNumber: string | null;
          phoneNumberExt: string | null;
          userName: string | null;
        };
        Insert: {
          bio?: Json | null;
          created_at?: string;
          dateOfBirth?: string | null;
          displayName: string;
          displayPicture?: string | null;
          email: string;
          emailVerified?: boolean | null;
          fullName?: string | null;
          id?: string;
          isActive?: boolean;
          isVerified?: boolean;
          phoneNumber?: string | null;
          phoneNumberExt?: string | null;
          userName?: string | null;
        };
        Update: {
          bio?: Json | null;
          created_at?: string;
          dateOfBirth?: string | null;
          displayName?: string;
          displayPicture?: string | null;
          email?: string;
          emailVerified?: boolean | null;
          fullName?: string | null;
          id?: string;
          isActive?: boolean;
          isVerified?: boolean;
          phoneNumber?: string | null;
          phoneNumberExt?: string | null;
          userName?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_displayPicture_fkey";
            columns: ["displayPicture"];
            isOneToOne: false;
            referencedRelation: "picture";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      EventStatus: "draft" | "published" | "cancelled" | "finished";
      PictureType:
        | "PROFILE_PICTURE"
        | "GROUP_BANNER"
        | "GROUP_GALLERY"
        | "EVENT_BANNER"
        | "EVENT_GALLERY";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
