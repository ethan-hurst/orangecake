import { getPageContent } from '@/lib/api';
import Hero from '@/components/Hero';
import FeaturesGrid from '@/components/FeaturesGrid';

export default function Home() {
  const content = getPageContent('home');

  if (!content) {
    return <div>Content not found</div>;
  }

  const { title, hero_title, hero_description, sections } = content;

  return (
    <>
      <Hero
        title={hero_title || title}
        description={hero_description}
        objectId={content._id}
        titleField="hero_title"
        descriptionField="hero_description"
      />
      {sections?.map((section, index) => {
        if (section.type === 'features_grid') {
          return (
            <FeaturesGrid
              key={index}
              title={section.title}
              features={section.features}
              fieldPath={`sections.${index}`}
            />
          );
        }
        return null;
      })}
    </>
  );
}
