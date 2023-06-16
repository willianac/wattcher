import "../../../__mocks__/matchMedia.js";
import { render, screen, fireEvent, cleanup, } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IntroForm from ".";

describe("Introduction Form", () => {
  const calculate = jest.fn()

  beforeEach(() => {
    render(<IntroForm calc={calculate} />);
  })

  afterEach(() => {
    cleanup()
  })

  test("should have 3 inputs and match snapshot", () => {
    const inputsNumber = screen.getAllByRole("spinbutton");
    inputsNumber.push(screen.getByRole("combobox"))

    expect(inputsNumber).toMatchSnapshot()
  })

  test("should not call the calculate function, if input is not filled", async () => {
    const button = screen.getByText("Calcular")
    await userEvent.click(button)
    expect(calculate).not.toBeCalled()
  })

  test("should call calculate function when input is filled properly", async () => {
    const button = screen.getByText("Calcular")
    const numberInputs = screen.getAllByRole("spinbutton") as HTMLInputElement[]
    const selectInput = screen.getByRole("combobox") as HTMLInputElement

    numberInputs.forEach(async input => fireEvent.input(input, {target : {value : "31"}}))
    await userEvent.click(selectInput)

    const option = screen.getByText("2 horas");

    await userEvent.click(option)
    await userEvent.click(button)

    expect(calculate).toBeCalledTimes(1)
  })
})