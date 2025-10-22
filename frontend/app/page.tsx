import { client } from "@/lib/sanity";
import { PROJECTS_QUERY, SITE_SETTINGS_QUERY } from "@/lib/queries";
import { Project, SiteSettings } from "@/lib/types";
import MediaGrid from "@/components/MediaGrid";

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(
      PROJECTS_QUERY, 
      {}, 
      {
        next: { revalidate: 60 } // Revalidate every minute for development
      }
    );

    return projects || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function getSettings(): Promise<SiteSettings> {
  try {
    const settings = await client.fetch(
      SITE_SETTINGS_QUERY, 
      {}, 
      {
        next: { revalidate: 60 } // Revalidate every minute for development
      }
    );

    return settings || {
      _id: 'default',
      socialLinks: [],
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      _id: 'default',
      socialLinks: [],
    };
  }
}

export default async function Home() {
  const [projects, settings] = await Promise.all([
    getProjects(),
    getSettings(),
  ]);

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-light text-white mb-4">مرحباً بك</h2>
          <p className="text-gray-400">لا توجد مشاريع حالياً. قم بإضافة مشاريعك من لوحة التحكم.</p>
        </div>
      </div>
    );
  }

  return <MediaGrid projects={projects} logo={settings.logo} />;
}
