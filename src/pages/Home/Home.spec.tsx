import "../../../__mocks__/matchMedia.js";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from ".";

describe("Home page", () => {
  test("should display a toast error if inputs are not filled", async () => {
    const user = userEvent.setup()
    render(<Home />)

    const submitButton = screen.getByTestId("submit-btn")

    await user.click(submitButton)

    const toastError = await screen.findByText("Por favor preencha todos os campos")

    expect(toastError.textContent).toBe("Por favor preencha todos os campos")
  })
  test("should display a toast error if inputs are filled but user is not logged", async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    const powerInput = screen.getByRole("spinbutton")
    const nameAndLocalInputs = screen.getAllByRole("combobox")
    const submitButton = screen.getByTestId("submit-btn")

    await user.type(powerInput, "200")
    await user.type(nameAndLocalInputs[0], "geladeira")
    await user.click(nameAndLocalInputs[1])
    await user.click(screen.getByText("Quarto"))
    await user.click(submitButton)

    const toastError = await screen.findByText("Requer login")
    
    expect(toastError.textContent).toBe("Requer login")
  })
})