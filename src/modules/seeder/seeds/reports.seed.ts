import { randomInt } from "crypto";
import { Priority } from "prisma/generated/client";
import { CreateReportDto } from "src/modules/reports/dtos/createReport.dto";

export const reportsSeed = (assetCount): CreateReportDto[] => {
    const descriptions = [
        "The plumbing system is leaking water.",
        "Broken window in the main hall.",
        "Air conditioning not working.",
        "Lights flickering in the corridor.",
        "Elevator is out of service.",
        "Strange noise from the generator.",
        "Fire alarm malfunctioning.",
        "Water dispenser is empty.",
        "Internet connection is unstable.",
        "Door lock is jammed.",
        "Ceiling tiles are falling.",
        "Paint is peeling off the walls.",
        "Heating system is not responsive.",
        "Security camera is offline.",
        "Projector in the meeting room is broken.",
        "Coffee machine is not dispensing.",
        "Restroom hand dryer is faulty.",
        "Parking gate is stuck open.",
        "Sprinkler system is leaking.",
        "Window blinds are damaged.",
        "Floor tiles are cracked.",
        "Vending machine is out of stock.",
        "Emergency exit sign is not illuminated.",
        "Reception phone is not working.",
        "Conference room chairs are missing.",
        "Printer is jammed.",
        "Microwave in the kitchen is broken.",
        "Trash bins are overflowing.",
        "Main entrance door won't close.",
        "Server room temperature is too high.",
        "Water heater is malfunctioning."
    ];

    const reports: CreateReportDto[] = [];

    for (let i = 0; i < 50; i++) {
        reports.push({
            assetId: randomInt(1, assetCount),
            priority: Object.values(Priority)[randomInt(0, Object.values(Priority).length)],
            description: descriptions[randomInt(0, descriptions.length)],
        });
    }

    return reports;
}