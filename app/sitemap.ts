import { MetadataRoute } from 'next';
import { getSortedLogsData } from '@/lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mohdarshad.com'; // Replace with real domain

  const logs = getSortedLogsData().map((log) => ({
    url: `${baseUrl}/logs/${log.slug}`,
    lastModified: new Date(log.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projects = ['careercatalyst', 'flashtix', 'streamflow'].map((id) => ({
    url: `${baseUrl}/project/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/logs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projects,
    ...logs,
  ];
}
