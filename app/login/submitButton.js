// Use client-side rendering for this component
"use client";

// Import necessary hooks from react and react-dom
const { useFormStatus } = require("react-dom");

// Define the SubmitButton functional component
function SubmitButton({ children, pendingText, ...props }) {
  const { pending, action } = useFormStatus();

  // Determine if the button should display the pending text
  const isPending = pending && action === props.formAction;

  // Render the button with appropriate attributes and content
  return (
    <button {...props} type="submit" aria-disabled={pending}>
      {isPending ? pendingText : children}
    </button>
  );
}

// Export the SubmitButton component
module.exports = SubmitButton;
    