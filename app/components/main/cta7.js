import { Button } from "@relume_io/relume-ui";

/**
 * @typedef {Object} Props
 * @property {string} heading - The main heading for the section.
 * @property {string} description - A description of the section.
 * @property {ButtonProps[]} buttons - An array of button properties (assumes you have ButtonProps defined in your library).
 */

/**
 * @typedef {Object} Cta7Props
 * @extends React.ComponentPropsWithoutRef<'section'>
 * @property {Partial<Props>} [props] - Optional properties for the component.
 */

export const Cta7Defaults = {
  heading: "Try my services with a 60-money-back guarantee!*",
  description: "Let me create your next project for you!",
  buttons: [{ title: "Sign Up" }],
};


export const Cta7 = (props) => {
  // Combine default props with provided props using object spreading
  const { heading, description, buttons } = { ...Cta7Defaults, ...props };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 dark:text-black bg-gradient-to-r from-yellow-200 via-green-200 to-green-500">
      <div className="container ml-2 mr-2 grid w-full grid-cols-1 items-start justify-between gap-6 md:grid-cols-[1fr_max-content] md:gap-x-12 md:gap-y-8 lg:gap-x-20">
        <div className="md:mr-12 lg:mr-0">
          <div className="w-full max-w-lg">
            <h2 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="md:text-md">{description}</p>
          </div>
        </div>
        <div className="flex items-start justify-start gap-4">
          {buttons.map((button, index) => (
            <Button
              className="rounded-xl"
              key={index}
              variant={button.variant} // Assuming Button component uses 'variant' for styling
              size={button.size}     // Assuming Button component uses 'size' for sizing
              iconRight={button.iconRight} 
              iconLeft={button.iconLeft}
            >
              <a href="/login">{button.title}</a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

Cta7.displayName = "Cta7"; 
