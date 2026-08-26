import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const logsDirectory = path.join(process.cwd(), 'content/logs');

export interface LogData {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  contentHtml?: string;
}

export function getSortedLogsData(): LogData[] {
  if (!fs.existsSync(logsDirectory)) return [];
  
  const fileNames = fs.readdirSync(logsDirectory);
  const allLogsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(logsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as { title: string; date: string; description: string; tags: string[] }),
    };
  });

  return allLogsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getLogData(slug: string): Promise<LogData> {
  const fullPath = path.join(logsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { title: string; date: string; description: string; tags: string[] }),
  };
}
