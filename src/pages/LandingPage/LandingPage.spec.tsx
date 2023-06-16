import "../../../__mocks__/matchMedia.js";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LandingPage from ".";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Login from "../Login/index";

describe("Landing Page", () => {
  test("should redirect to Login page after user clicks on 'Começar' button", async () => {
    const routes = [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
    const router = createMemoryRouter(routes, {initialEntries : ["/"]})
    render(<RouterProvider router={router}/>)
    
    const button = screen.getByRole("link", {name : "Começar"})

    await userEvent.click(button)

    const loginHeading = await screen.findByRole("heading")

    expect(loginHeading.textContent).toBe("Preencha todos os campos")
  })
})