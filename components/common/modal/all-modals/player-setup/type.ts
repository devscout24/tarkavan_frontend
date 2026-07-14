import { FileMetadata } from "@/hooks/use-file-upload";

export type TPlayerProfilePayload = {
  // Core Identity
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender: string;
  nationality: string;
  email: string;
  sport: string;
  jerseyNumber: string;
  dominantFoot: string;
  clubTeam: string;
  country: string;
  city: string;
  province: string;
 
  profilePhoto: File | null | string | FileMetadata;
  profilePhotoPreview: string;
  profilePhotoNames: string[];

  // Position
  primaryPosition: string;
  secondaryPosition: string;

  // Biography
  biography: string;

  // Season Stats
  seasonStats: {
    activeTab: "outfield" | "goalkeeper";
    values: {
      gamesPlayed: string;
      goals: string;
      assists: string;
      yellowCards: string;
      redCards: string;
     
      cleanSheets: string;
      totalSaves: string;
    };
  };

  // Strengths
  strengths: {
    activeCategoryId: string;
    selectedByCategory: Record<string, string>;
  };

  // Highlights
  highlights: {
    showcaseValue: string;
    selectedShowcaseSource:
      | "youtube"
      | "hudl"
      | "vimeo"
      | null;

    facebook_link: string;
    whatsapp_link: string;
    twitter_link: string;

    uploadedItems: {
      id: string;
      title: string;
      type: "video" | "link";
      file?: File; 
      video_url?: string;
    }[];
  };

  // Achievement
  achievements: {
    title: string;
    description: string;
    dateEarned?: string;

    uploadedAssets: {
      id: string;
      name: string;
      type: "image" | "file";
      file?: File;
      preview?: string;
      
    };
  };

  // Privacy
  privacySettings: {
    visibility: "public" | "private";
  };
}