import { renderHook } from "@testing-library/react";
import { useCalculateEnergy, useCalculateRoomEnergy } from "./useCalculateEnergy";
import { Device, RoomEnum } from "../store/devices";

describe("useCalculateEnergy hook", () => {
  describe("useCalculateEnergy function", () => {
    test("should return the correct result from the calculation", () => {
      const device: Device = {
        id: "test",
        power: 300,
        daily_use: 5,
        month_use: 30,
        name: "FakeDevice",
        room: RoomEnum["A"],
        user_id: "FakeUserId",
      }

      const { result } = renderHook(() => {
        return useCalculateEnergy(device)
      })

      expect(result.current).toBe(45)
    })
  })
  describe("useCalculateRoomEnergy function", () => {
    test("should calculate the total energy consumption of the room", () => {

      const devicesArray: Device[] = []

      const device: Device = {
        id: "test",
        power: 300,
        daily_use: 5,
        month_use: 30,
        name: "FakeDevice",
        room: RoomEnum["A"],
        user_id: "FakeUserId",
      }

      while (devicesArray.length < 3) {
        devicesArray.push(device)
      }

      const { result } = renderHook(() => {
        return useCalculateRoomEnergy(devicesArray)
      })

      expect(result.current).toBe(135)
    })
  })
})