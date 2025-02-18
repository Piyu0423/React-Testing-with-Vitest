import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  const renderComponent = () => {
    //simplify test cases with a helper function to render our component and return common elemnts
    render(<TermsAndConditions />);
    return {
      heading: screen.getByRole("heading"),
      checkbox: screen.getByRole("checkbox"),
      button: screen.getByRole("button"),
    };
  };

  it("should render with correct text and initial text", () => {
    const { heading, checkbox, button } = renderComponent(); // with getByRole we dont need to check whether its in the document, if its not in the doc its throwing an error
    expect(heading).toHaveTextContent("Terms & Conditions");
    expect(checkbox).not.toBeChecked(); // if the checkbox is not checked submit button should be disabled
    expect(button).toBeDisabled();
  });

  it("should enabled the button is the checkbox is checked", async () => {
    //Arrange
    const { checkbox, button } = renderComponent();
    //Act
    const user = userEvent.setup();
    await user.click(checkbox);

    //Assert
    expect(button).toBeEnabled();
  });
});
