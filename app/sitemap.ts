import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.miracat.net/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // {
    //   url: 'https://miracat.net/projects/home.html',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.5,
    // },
  ]
}
