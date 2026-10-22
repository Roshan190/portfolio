import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/url";

export function JsonLd() {
  const skills = site.skillGroups.flatMap((group) => group.items);
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.fullName,
    jobTitle: site.experience[0].title,
    description: site.description,
    url: absoluteUrl("/"),
    homeLocation: {
      "@type": "Place",
      name: site.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressCountry: "IN",
      },
    },
    worksFor: {
      "@type": "Organization",
      name: site.experience[0].company,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: site.education.school,
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: site.certification.name,
      credentialCategory: "certificate",
      recognizedBy: {
        "@type": "Organization",
        name: site.certification.issuer,
      },
    },
    knowsAbout: skills,
    sameAs: [site.socials.github, site.socials.linkedin],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
