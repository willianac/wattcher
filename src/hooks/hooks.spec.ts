import { renderHook } from "@testing-library/react";
import { useAuthentication } from "./useAuthentication";
import axios from "axios";

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("useAuthentication", () => {
  test.only("register method should call axios.post with correct parameters", async () => {
    
    const parameters = {
      name : "Willian",
      email : "willianac@live.com",
      password : "12345"
    }

    const { result } = renderHook(() => {
      return useAuthentication()
    })

    await result.current.register(parameters)
    
    expect(mockedAxios.post).toHaveBeenCalledWith(parameters)
  })
})