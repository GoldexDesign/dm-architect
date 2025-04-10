export async function getServerSideProps({ res }) {
  const response = await fetch("http://localhost:3000/api/sitemap");
  const sitemap = await response.text();

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
