// lib/browser.ts
import { chromium, Browser } from "playwright-core"

let browser: Browser | null = null

export async function getBrowser(): Promise<Browser> {
  if (browser) return browser

  const isProduction = process.env.NODE_ENV === "production" || !!process.env.VERCEL

  if (isProduction) {
    // Dynamic import to avoid bundling issues
    const chromiumExecutable = await import("@sparticuz/chromium").then(m => m.default)
    
    browser = await chromium.launch({
      args: chromiumExecutable.args,
      executablePath: await chromiumExecutable.executablePath(),
      headless: true,
    })
  } else {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })
  }

  return browser
}














// import { chromium, Browser } from "playwright"
// import chromiumExecutable from "@sparticuz/chromium"

// let browser: Browser | null = null

// export async function getBrowser(): Promise<Browser> {
//   if (!browser) {
//     const isProduction =
//       process.env.NODE_ENV === "production" || !!process.env.VERCEL

//     if (isProduction) {
//       browser = await chromium.launch({
//         args: [
//           ...chromiumExecutable.args,
//           "--no-sandbox",
//           "--disable-setuid-sandbox",
//         ],
//         executablePath: await chromiumExecutable.executablePath(),
//         headless: true,
//       })
//     } else {
//       browser = await chromium.launch({
//         headless: true,
//         args: ["--no-sandbox", "--disable-setuid-sandbox"],
//       })
//     }
//   }

//   return browser
// }
