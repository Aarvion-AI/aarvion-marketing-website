export function JsonLd({ data }: { data: string | string[] }) {
  const blobs = Array.isArray(data) ? data : [data];
  return (
    <>
      {blobs.map((blob, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: blob }}
        />
      ))}
    </>
  );
}
