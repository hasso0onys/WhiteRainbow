import type { Metadata } from "next";
import "./globals.css";
import { client } from "@/lib/sanity";
import { SITE_SETTINGS_QUERY } from "@/lib/queries";
import { SiteSettings } from "@/lib/types";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  metadataBase: new URL('https://wr-mapping.com'),
  title: "وايت ريمبو | 3D Mapping",
  description: "موقع شركة وايتريمبو لعروض ال3D Mapping",
  keywords: ["3D Mapping", "Projection Mapping", "WhiteRainbow", "وايت ريمبو", "عرض بصري"],
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "وايت ريمبو | 3D Mapping",
    description: "موقع شركة وايتريمبو لعروض ال3D Mapping",
    type: "website",
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "وايت ريمبو | 3D Mapping",
    description: "موقع شركة وايتريمبو لعروض ال3D Mapping",
    images: ['/og-image.png'],
  },
};

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
      projectName: 'Projection Portfolio',
      contactButton: 'تواصل معنا',
      bookingButton: 'احجز الآن',
      socialLinks: [],
      barColor: '#000000'
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      _id: 'default',
      projectName: 'Projection Portfolio',
      contactButton: 'تواصل معنا',
      bookingButton: 'احجز الآن',
      socialLinks: [],
      barColor: '#000000'
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html 
      lang="ar" 
      dir="rtl"
      style={{
        margin: 0,
        padding: 0,
        scrollBehavior: 'smooth',
      }}
    >
      <body 
        className="antialiased"
        style={{
          margin: 0,
          padding: 0,
          overflowX: 'hidden',
          backgroundColor: '#000000',
        }}
      >
        <ConditionalLayout settings={settings}>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
