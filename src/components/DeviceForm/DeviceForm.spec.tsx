import "../../../__mocks__/matchMedia.js";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeviceForm from ".";

describe("DeviceForm", () => {
  test("should display input errors if inputs are not filled", async () => {
    const user = userEvent.setup()
    const saveDevice = jest.fn()
    const throwToast = jest.fn()

    render(
      <DeviceForm 
        saveDevice={saveDevice} 
        throwToast={throwToast} 
      />
    )
    const submitButton = screen.getByTestId("submit-btn")
    
    await user.click(submitButton)

    const nameErrorMessage = await screen.findByText("Escolha o nome do aparelho")
    const powerErrorMessage = await screen.findByText("Por favor insira a potência")
    const localErrorMessage = await screen.findByText("Por favor selecione o local")

    expect(localErrorMessage).toBeTruthy()
    expect(powerErrorMessage).toBeTruthy()
    expect(nameErrorMessage).toBeTruthy()
  })
})