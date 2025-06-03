import json from "@/components/SetTimetable/set-data.json";
import { getEventProgress } from ".";
import { EVENT_DATE } from "@/variables/constants";

const allActs = [...json.act_1, ...json.act_2, ...json.act_3];

export default function getCurrentAct() {
    console.log(json)
    return allActs.filter(act => getEventProgress(new Date(EVENT_DATE + act.startTime), new Date(EVENT_DATE + act.endTime)).inProgress)[0];
}