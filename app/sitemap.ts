import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://miracat.com/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // {
    //   url: 'https://miracat.com/projects/home.html',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.5,
    // },
  ]
}