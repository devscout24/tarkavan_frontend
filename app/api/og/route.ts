// app/api/og/route.ts
import { NextRequest } from "next/server"
import { getBrowser } from "@/lib/browser"

export const runtime = "nodejs"
export const maxDuration = 30 // Vercel Pro: 60, Free: 10

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url)
  const { searchParams, origin } = requestUrl
  const targetUrl = searchParams.get("url")
  const fallbackImage = `${origin}/images/program_details_bg.png`

  if (!targetUrl) {
    return Response.redirect(fallbackImage, 302)
  }

  let parsedTarget: URL
  try {
    parsedTarget = new URL(targetUrl)
  } catch {
    return Response.redirect(fallbackImage, 302)
  }

  if (parsedTarget.pathname.startsWith("/api/og")) {
    return Response.redirect(fallbackImage, 302)
  }

  let page = null
  try {
    const browser = await getBrowser()
    page = await browser.newPage()

    await page.setViewportSize({ width: 1200, height: 630 })

    await page.goto(parsedTarget.toString(), {
      waitUntil: "networkidle", // domcontentloaded থেকে পরিবর্তন
      timeout: 25000,
    })

    // Page render হওয়ার জন্য একটু অপেক্ষা
    await page.waitForTimeout(1000)

    const imageBuffer = await page.screenshot({
      type: "png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    })

    return new Response(new Uint8Array(imageBuffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      },
    })
  } catch (err) {
    console.error("OG screenshot error:", err)
    return Response.redirect(fallbackImage, 302)
  } finally {
    if (page) await page.close().catch(() => {})
  }
}













// import { NextRequest } from "next/server"
// import { getBrowser } from "@/lib/browser"

// export const runtime = "nodejs"

// export async function GET(req: NextRequest) {
//   const requestUrl = new URL(req.url)
//   const { searchParams, origin } = requestUrl
//   const targetUrl = searchParams.get("url")
//   const fallbackImage = `${origin}/images/program_details_bg.png`

//   if (!targetUrl) {
//     return Response.redirect(fallbackImage, 302)
//   }

//   let parsedTarget: URL
//   try {
//     parsedTarget = new URL(targetUrl)
//   } catch {
//     return Response.redirect(fallbackImage, 302)
//   }

//   // Prevent accidental recursion if /api/og is passed as the screenshot target.
//   if (parsedTarget.pathname.startsWith("/api/og")) {
//     return Response.redirect(fallbackImage, 302)
//   }

//   const browser = await getBrowser()
//   const page = await browser.newPage()

//   try {
//     await page.setViewportSize({
//       width: 1200,
//       height: 630,
//     })

//     await page.goto(parsedTarget.toString(), {
//       waitUntil: "domcontentloaded",
//       timeout: 60000,
//     })

//     const imageBuffer = await page.screenshot({
//       type: "png",
//       fullPage: false,
//     })

//     await page.close()

//     return new Response(new Uint8Array(imageBuffer), {
//       headers: {
//         "Content-Type": "image/png",
//         "Cache-Control": "public, max-age=86400",
//       },
//     })
//   } catch (err) {
//     await page.close()
//     return Response.redirect(fallbackImage, 302)
//   }
// }
