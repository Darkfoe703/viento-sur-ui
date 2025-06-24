// src/services/schedulesService.ts
import api from "@/services/api";

export async function getSchedules() {
    const response = await api.get("schedules/");
    return response.data;
}

export async function createSchedule(scheduleData: {
    day_of_week: number;
    start_time: string; // formato ISO 8601: "HH:MM:SS.sssZ"
    end_time: string;
    is_available: boolean;
    is_reserved: boolean;
}) {
    const response = await api.post("schedules/", scheduleData);
    return response.data;
}