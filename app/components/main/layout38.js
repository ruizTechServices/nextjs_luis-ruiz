// C:\Users\Gio\OneDrive\Desktop\ruizTechServices\luis-ruiz\nextjs\nextjs_luis-ruiz\app\components\main\layout38.js

/**
 * @typedef {Object} ImageProps
 * @property {string} src - The source URL of the image.
 * @property {string} [alt] - The alternative text for the image (optional).
 */

import Image from "next/image";

/**
 * @typedef {Object} Props
 * @property {string} heading - The main heading for the section.
 * @property {string} description - A longer description of the section.
 * @property {ImageProps} image - The image object (with `src` and optional `alt`).
 */

/**
 * @typedef {Object} Layout38Props
 * @extends React.ComponentPropsWithoutRef<'section'>
 * @property {Partial<Props>} [props] - Optional properties for the component.
 */

export const Layout38Defaults = {
  heading: "Long heading is what you see here in this feature section",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  image: {
    src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
    alt: "Placeholder image",
  },
};

export const Layout38 = (props) => {
  // Combine default props with provided props using object spreading
  const { heading, description, image } = { ...Layout38Defaults, ...props };

  return (
    <section className="relative px-[5%]">
      <div className="container">
        <div className="flex items-center py-16 md:py-24 lg:py-28">
          <div className="max-w-md">
            <h3 className="mb-5 text-4xl font-bold leading-[1.2] text-text-alternative md:mb-6 md:text-5xl lg:text-6xl">
              {heading}
            </h3>
            <p className="text-base text-text-alternative md:text-md">{description}</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <Image
          src={image.src}
          alt={image?.alt ?? "Background image"}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
};

Layout38.displayName = "Layout38";