import { useFormContext } from "#hooks/useAppForm";
import { Button, type ButtonProps } from "@jeremyng/ui/components/Button";
import { Spinner } from "@jeremyng/ui/components/Spinner";

/**
 * Submit button for `@tanstack/react-form` forms that displays spinner while
 * the form is submitting
 */
const SubmitButton = (props: ButtonProps) => {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={isSubmitting} {...props}>
          {isSubmitting && <Spinner className="absolute" />}
          <span
            className="data-[pending=true]:invisible"
            data-pending={isSubmitting}
          >
            Submit
          </span>
        </Button>
      )}
    </form.Subscribe>
  );
};

export { SubmitButton };
