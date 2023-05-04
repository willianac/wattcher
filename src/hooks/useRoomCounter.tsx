import { Device } from "../store/devices";

export function useRoomCounter(devices: Device[]) {
    const roomCounts = devices.reduce((counts, device: Device) => {
        const room = device.room;
        if (!counts[room]) {
          counts[room] = 1;
        } else {
          counts[room]++;
        }
        return counts;
      }, {} as Record<string, number>);
      return roomCounts
}