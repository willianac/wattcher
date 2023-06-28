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
const URL = process.env.VITE_API_URL

describe("#useAuthentication.register", () => {
  beforeEach(() => {
    cleanup()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  test("should call axios.post with correct parameters", async () => {
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


describe("#useAuthentication.login", () => {
  beforeEach(() => {
    cleanup()
  })

  test("should call axios.post with correct parameters", async () => {
    const { result } = renderHook(() => {
      return useAuthentication()
    })

    const loginParameters = {
      email : "dummyEmail",
      password : "dummyPass"
    }

    await result.current.login(loginParameters)

    expect(mockedAxios.post).toHaveBeenCalledWith(URL + "/getuser", loginParameters)
  })

  test("after the request, should save user info on zustand store", async () => {
    const saveUserSpy = jest.spyOn(useUserStore.getState(), "saveUser")
    const setUserLogged = jest.spyOn(useUserStore.getState(), "setUserLogged")

    const { result } = renderHook(() => {
      return useAuthentication()
    })

    const loginParameters = {
      email : "dummyEmail",
      password : "dummyPass"
    }

    const mockUserToken = "mockedToken"
    const mockUserResponse = {
      id : "hugeidgeneratedbyaexternallib",
      name : "dummyUser",
      local_kwh : 1.14,
      taxes : 17.10
    }

    mockedAxios.post.mockResolvedValueOnce(mockUserToken)
    mockedJwtDecode.mockReturnValueOnce(mockUserResponse)

    act(() => {
      result.current.login(loginParameters)
    })

    await waitFor(() => {
      expect(saveUserSpy).toHaveBeenCalledWith(mockUserResponse)
      expect(setUserLogged).toHaveBeenCalledWith(true)
    })
  })

  test("should return network error, in case the server is offline", async () => {
    const { result } = renderHook(() => {
      return useAuthentication()
    })

    const mockAxiosError = new AxiosError();
    mockAxiosError.code = AxiosError.ERR_NETWORK

    mockedAxios.mockRejectedValueOnce(mockAxiosError)

    const loginParameters = {
      email : "dummyEmail",
      password : "dummyPass"
    }

    const errorMessage = await result.current.login(loginParameters)

    await waitFor(() => {
      expect(errorMessage).toBe("network_error")
    })
  })
})