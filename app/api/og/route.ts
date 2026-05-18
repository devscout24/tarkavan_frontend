import React from "react"
import { ImageResponse } from "next/og"
import { resolveAssetUrl } from "@/lib/url-utils"

export const runtime = "edge"

export const size = {
  width: 1200,
  height: 630,
}

async function fetchPlayerProfile(playerid: string) {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "https://tarkavan.thenightowl.team/api"
  const response = await fetch(`${apiBaseUrl}/data/athlete/${playerid}`, {
    cache: "no-store",
  })

  return response.json()
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const playerid = searchParams.get("playerid") || ""

  let data = null

  if (playerid) {
    try {
      const res = await fetchPlayerProfile(playerid)

      if (
        res &&
        "success" in res &&
        res.success &&
        res.data &&
        "data" in res.data &&
        res.data.data
      ) {
        data = res.data.data
      }
    } catch (error) {
      console.error("OG image fetch failed:", error)
    }
  }

  const imageUrl = resolveAssetUrl(data?.basic_info?.preview)
  const title = data?.basic_info?.full_name ?? "Player Profile"

  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0f172a 0%, #111827 50%, #020617 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          color: "white",
        },
      },
      imageUrl
        ? React.createElement("img", {
            src: imageUrl,
            width: 1200,
            height: 630,
            style: {
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
              height: "100%",
            },
          })
        : React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                fontSize: 60,
                fontWeight: 700,
                letterSpacing: "-0.04em",
              },
            },
            React.createElement("div", null, title),
            React.createElement(
              "div",
              { style: { fontSize: 28, opacity: 0.72 } },
              "Go Elite"
            )
          )
    ),
    size
  )
}
