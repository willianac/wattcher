import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from ".";
import { MemoryRouter } from "react-router-dom";

describe("Login Component", () => {
 
  beforeEach(() => {
    cleanup()
  })
 
  test("submit button should be disable if email input is no filled properly", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    const user = userEvent.setup()

    await user.type(await screen.findByTestId("email"), "fulanooxx.")
    await user.type(await screen.findByTestId("password"), "longPasswordThatWorks")

    const button = await screen.findByRole("button", {name: /entrar/i}) as HTMLButtonElement

    expect(button.disabled).toBeTruthy()
  })

  test("submit button should be disable if password input is not filled properly", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    const user = userEvent.setup()
    
    await user.type(await screen.findByTestId("email"), "correct@email.com")
    await user.type(await screen.findByTestId("password"), "short")

    const button = await screen.findByRole("button", {name: /entrar/i}) as HTMLButtonElement    
    expect(button.disabled).toBeTruthy()
  })

  test("should call login function after button click", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    const user = userEvent.setup()
    
    await user.type(await screen.findByTestId("email"), "correct@email.com")
    await user.type(await screen.findByTestId("password"), "longPasswordThatPass")

    const button = await screen.findByRole("button", {name: /entrar/i}) as HTMLButtonElement
    expect(button.disabled).toBeFalsy()
  })
})