export async function getServerSideProps({ req, res }) {
  const protocol = req.headers.host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${req.headers.host}`;

  try {
    const response = await fetch(`${baseUrl}/api/sitemap`);
    const sitemap = await response.text();

    res.setHeader("Content-Type", "application/xml");
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error("Failed to fetch sitemap:", error);
    res.statusCode = 500;
    res.end("Sitemap generation failed");
  }

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
