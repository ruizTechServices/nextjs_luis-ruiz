import Image from "next/image";
import { useState, useEffect } from 'react';

/**
 * @typedef {Object} ImageProps
 * @property {string} src - The source URL of the image.
 * @property {string} [alt] - The alternative text for the image (optional).
 */

/**
 * @typedef {Object} FeaturesProps
 * @property {ImageProps} icon - The icon image details.
 * @property {string} description - A description of the feature.
 */

/**
 * @typedef {Object} Props
 * @property {string} heading - The main heading for the section.
 * @property {string} description - A longer description of the section.
 * @property {FeaturesProps[]} features - An array of feature objects.
 */

/**
 * @typedef {Object} Layout66Props
 * @extends React.ComponentPropsWithoutRef<'section'>
 * @property {Partial<Props>} [props] - Optional properties for the component.
 */

export const Layout66Defaults = {
  heading: "Allow me to create the tools for your business",
  description:
    "Explore innovative solutions and projects crafted with a blend of modern technologies and years of expertise in software development.",
  features: [
    {
      icon: {
        src: "/images/logo_lr.png",
        alt: "Dynamic Web Applications"
      },
      description: "Building responsive and dynamic web applications using the latest web technologies."
    },
    {
      icon: {
        src: "/images/logo_lr.png",
        alt: "Cloud Solutions"
      },
      description: "Implementing scalable cloud solutions to enhance business operations and service delivery."
    },
    {
      icon: {
        src: "/images/logo_lr.png",
        alt: "API Development"
      },
      description: "Developing robust APIs that power front-end applications and integrate seamlessly with various services."
    }
  ]
};

export const Layout66 = ({ props }) => {
  const [layoutProps, setLayoutProps] = useState({
    ...Layout66Defaults,
    ...props
  });

  useEffect(() => {
    setLayoutProps(current => ({
      ...current,
      ...props
    }));
  }, [props]);

  return (
    <section className="mx-10 my-10 md:py-24 lg:py-28 mx-auto dark:text-black">
      <div className="container lg:mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <h3 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          {layoutProps.heading}
        </h3>
        <div className="">
          <p className="text-md text-center md:text-left mb-10">
            {layoutProps.description}
          </p>
          <div className="border-b border-gray-500 w-full mb-10"/>
          <div className="grid grid-cols-1 gap-4">
            {(layoutProps.features.length > 0 ? layoutProps.features : Layout66Defaults.features).map((feature, index) => (
              <div key={index} className="flex flex-row">
                <div className="">
                  <Image
                    src={feature.icon.src}
                    alt={feature.icon.alt || 'Feature icon'}
                    width={100}
                    height={100}
                    className="block"
                  />
                </div>
                <p className="text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Layout66.displayName = "Layout66";
