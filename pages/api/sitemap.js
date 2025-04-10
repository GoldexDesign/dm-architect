export default async function handler(req, res) {
  const baseUrl = "https://dm-architect.vercel.app";
  const staticRoutes = [
    "",
    "projects",
    "projects/retail",
    "projects/residential",
    "projects/hotels",
    "about/info",
    "about/press",
  ];

  const staticXml = staticRoutes
    .map(
      (route) => `
      <url>
        <loc>${baseUrl}/${route}</loc>
      </url>
    `
    )
    .join("");

  // Dynamic project pages from JSON-LD
  let dynamicXml = "";
  try {
    const response = await fetch(`${baseUrl}/projects/all-projects.jsonld`);
    const data = await response.json();

    dynamicXml = data.projects
      .map((project) => {
        const category = project.category?.toLowerCase() || "projects";
        return `
          <url>
            <loc>${baseUrl}/projects/${category}/${project.id}</loc>
          </url>`;
      })
      .join("");
  } catch (err) {
    console.error("Failed to fetch project data for sitemap", err);
  }

  const fullSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticXml}
      ${dynamicXml}
    </urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.write(fullSitemap);
  res.end();
}
