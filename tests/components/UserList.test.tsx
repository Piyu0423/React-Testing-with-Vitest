import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
  it("should render no users available if the user list is empty", () => {
    render(<UserList users={[]} />);
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it("should render users if the user list is not empty", () => {
    const users: User[] = [
      { id: 1, name: "Piumika" },
      { id: 2, name: "Pasan" },
    ];
    render(<UserList users={users} />);
    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
