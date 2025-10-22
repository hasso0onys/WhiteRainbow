export const metadata = {
  title: 'WhiteRainbow Studio',
  description: 'Content Management System',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="ltr">
      <body style={{ margin: 0, padding: 0, height: '100vh' }}>
        {children}
      </body>
    </html>
  )
}

