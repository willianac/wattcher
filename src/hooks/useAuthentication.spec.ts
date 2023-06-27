import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { jest } from "@jest/globals";
import axios, { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { useUserStore }  from "../store/user";
import { useAuthentication } from "./useAuthentication";

jest.mock("axios")
jest.mock("jwt-decode")
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedJwtDecode = jwtDecode as jest.Mocked<typeof jwtDecode>

describe("#useAuthentication.register", () => {
  beforeEach(() => {
    cleanup()
  })

  test("should call axios.post with correct parameters", async () => {
    const URL = process.env.VITE_API_URL
    const parameters = {
      name : "Willian",
      email : "willianac@live.com",
      password : "12345"
    }

    const { result } = renderHook(() => {
      return useAuthentication()
    })

    await result.current.register(parameters)
    expect(mockedAxios.post).toHaveBeenCalledWith(URL + "/createuser", parameters)
  })

  test("after the request, should save user info on zustand store", async () => {
    const saveUser = jest.spyOn(useUserStore.getState(), "saveUser")
    const setUserLogged = jest.spyOn(useUserStore.getState(), "setUserLogged")
    
    const { result } = renderHook(() => {
      return useAuthentication()
    })

    const mockToken = "dummyToken"
    const mockUserResponse = {
      id : "121pdi1pidj1id3ip31",
      name : "dummyUser",
      local_kwh : 1.12,
      taxes : 18
    }
    const registerParameters = {
      name : "dummyUser",
      email : "dummyMail@live.com",
      password : "dummyPass"
    }
    mockedAxios.post.mockResolvedValueOnce(mockToken)
    mockedJwtDecode.mockReturnValueOnce(mockUserResponse)

    act(() => {
      result.current.register(registerParameters)
    })

    await waitFor(() => {
      expect(saveUser).toBeCalledWith(mockUserResponse)
      expect(setUserLogged).toBeCalledWith(true)
    })
  })
  test("should return network error, in case the server is offline", async () => {
    const { result } = renderHook(() => {
      return useAuthentication()
    })

    const mockError = new AxiosError();
    mockError.code = AxiosError.ERR_NETWORK

    mockedAxios.post.mockRejectedValue(mockError)

    const registerParameters = {
      name : "dummyUser",
      email : "dummyMail@live.com",
      password : "dummyPass"
    }

    const registerReturn = await result.current.register(registerParameters)

    await waitFor(() => {
      expect(registerReturn).toBe("network_error")
    })
  })
})