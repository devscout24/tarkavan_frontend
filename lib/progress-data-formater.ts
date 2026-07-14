import { TPlayerProfile } from "@/types"
import moment from "moment";


export const formatProgressData = (data: TPlayerProfile) => {
  const formattedData = {
    firstName: data.basic_info.name,
    lastName: data.basic_info.last_name,
    dateOfBirth: data.basic_info.dob,
    gender: data.basic_info.gender,
    nationality: data.basic_info.nationality,
    email: data.basic_info.email,
    sport: data.basic_info.sport_option_id,
    jerseyNumber: data.position_info.jersey_number,
    dominantFoot: data.position_info.dominant_foot,
    clubTeam: data.position_info.club_team,
    country: data.basic_info.country,
    city: data.basic_info.city,
    province: data.basic_info.province,
    profilePhoto: data.basic_info.image,
    profilePhotoPreview: data.basic_info.image,
    primaryPosition: data.position_info.primary_position.id,
    secondaryPosition: data.position_info.secondary_position.id,
    biography: data.basic_info.biography,
    privacySettings: {
      visibility: data?.basic_info?.privacy_settings || "public"
    },
    seasonStats: {
      activeTab: "outfield",
      values: {
        gamesPlayed: data?.player_stats?.total_matches,
        goals: data?.player_stats?.goals,
        assists: data?.player_stats?.assists,
        yellowCards: data?.player_stats?.yellow_cards,
        redCards: data?.player_stats?.red_cards,
        cleanSheets: data?.player_stats?.clean_sheets,
        totalSaves: data?.player_stats?.total_saves,
      },
    },
    strengths: {
      activeCategoryId: "",
      selectedByCategory: data.strengths.reduce<Record<string, string>>(
        (acc, st) => {
          acc[st.strength_type] = st.strength_name
          return acc
        },
        {}
      ),
    },
    highlights: {
        facebook_link: data?.basic_info?.facebook_link || "",
        whatsapp_link: data?.basic_info?.whatsapp_link || "",
        twitter_link: data?.basic_info?.twitter_link || "", 
        uploadedItems: data?.videos?.map((video) => { return {video_url: video.video_url } } )
    } ,
    achievements: {
        title : data?.achievements[0]?.title || "" ,
        description : data?.achievements[0]?.description || "" ,
        dateEarned: moment(data?.achievements[0]?.date_earned).format("YYYY/MM/DD") || "" ,
        uploadedAssets: {
            preview: data?.achievements[0]?.image || "",
            id: data?.achievements[0]?.id || "", 
            name: data?.achievements[0]?.title || "",
            type: "image" 
        }
    }
  }
  return formattedData
}
