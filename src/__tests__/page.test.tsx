import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("Home page", () => {
  it("renders the profile heading with an accessible name", () => {
    render(<Page />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveAttribute("aria-label", "Varun Vangari");
  });

  it("renders all info items", () => {
    render(<Page />);
    for (const t of ["Mumbai, India", "varunvangari29@gmail.com", "he/him", "+918104597116", "varun.codes", "Deteroid Technologies LLP", "Zamanat Tech Solutions Private Limited"]) {
      expect(screen.getByText(t, { exact: false })).toBeInTheDocument();
    }
  });

  it("links to LinkedIn and GitHub with handles", () => {
    render(<Page />);
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", "https://www.linkedin.com/in/varun-vangari");
    expect(screen.getByRole("link", { name: /varunvangari/ })).toHaveAttribute("href", "https://github.com/varunvangari");
  });

  it("keeps empty slots for logo, avatar and flag", () => {
    const { container } = render(<Page />);
    for (const s of ["logo", "avatar", "flag"]) {
      expect(container.querySelector(`[data-asset-slot="${s}"]`)).not.toBeNull();
    }
  });

  it("exposes header controls", () => {
    render(<Page />);
    expect(screen.getByRole("button", { name: /Search/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Toggle theme/ })).toBeInTheDocument();
  });
});
