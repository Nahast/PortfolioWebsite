import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', 'experience/'].map((path) => ({ url: `https://romainjouffret.com/${path}` }))
}
