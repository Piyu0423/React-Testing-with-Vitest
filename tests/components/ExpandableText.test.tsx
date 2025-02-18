import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  it("should render full text if less than 255 characters", () => {
    const text = "Short text";
    render(<ExpandableText text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument(); // testing short text
  });

  it("should truncate the text if more than 255 characters", () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(truncatedText)).toBeInTheDocument(); // testing long test when button is not clicked
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/more/i);
  });

  it("should expand the long text if Show More button is clicked", async () => {
    // test for expanding the text
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/less/i);
  });

  it("should collapse the long text if Show Less button is clicked", async () => {
    // test for collapsing the text

    //Arrange
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole("button", { name: /more/i }); // click on show more button
    const user = userEvent.setup();
    await user.click(showMoreButton);

    // Act
    const showLessButton = screen.getByRole("button", { name: /less/i }); // click on show less button
    await user.click(showLessButton);

    //Assert
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/more/i);
  });
});
