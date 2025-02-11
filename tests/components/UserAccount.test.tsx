import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  it("should render the user name ", () => {
    const user: User = { id: 1, name: "Piumika" };
    render(<UserAccount user={user} />);
    const text = screen.getByText(user.name);
    expect(text).toBeInTheDocument();
  });
  it("should render the Edit button if the user is an admin", () => {
    const user: User = { id: 1, name: "Piumika", isAdmin: true };
    render(<UserAccount user={user} />);
    const button = screen.getByRole("button"); // this will throw an error is user is not an admin/ if the button is not exist
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should not render the Edit button if the user is not an admin", () => {
    const user: User = { id: 1, name: "Piumika", isAdmin: false };
    render(<UserAccount user={user} />);
    const button = screen.queryByRole("button"); // this will not throw an error even if it is exist
    expect(button).not.toBeInTheDocument();
  });
});
