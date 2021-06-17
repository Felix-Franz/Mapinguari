import { createRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Spinner } from "reactstrap";
import MeetingType from "../../../core/types/MeetingType";

const JITSI_DOMAIN = "meet.jit.si";
let scriptSet: boolean = false;

const Meeting: React.FC<{
    meeting: MeetingType,
    me?: string,
    className?: string
}> = ({ meeting, me, className }) => {
    const { t } = useTranslation();
    const [status, setStatus] = useState<"loading" | "splash" | "meeting">("loading");
    const meet = createRef<HTMLDivElement>();

    useEffect(() => {
        if (!scriptSet) {
            scriptSet = true;
            const script = document.createElement("script");
            script.src = `https://${JITSI_DOMAIN}/external_api.js`;
            script.async = true;
            script.onload = () => setStatus("splash");
            document.body.appendChild(script);
        }
        else
            setStatus("splash");
    }, []);

    const startMeeting = () => {
        setStatus("loading");
        const options = {
            roomName: meeting.roomName,
            width: "100%",
            height: "100%",
            parentNode: meet.current,
            configOverwrite: {
                prejoinPageEnabled: false,
            },
            interfaceConfigOverwrite: {
                SHOW_CHROME_EXTENSION_BANNER: false,
            }
        };
        // @ts-ignore
        const api = new window.JitsiMeetExternalAPI(JITSI_DOMAIN, options);
        api.addEventListener('videoConferenceJoined', () => {
            api.executeCommand('displayName', me);
            api.executeCommand('password', meeting.password);
            setStatus("meeting")
        });
        api.addEventListener('passwordRequired', () => {
            api.executeCommand('password', meeting.password);
        });
        api.addListener("readyToClose", stopMeeting);
    }

    const stopMeeting = () => {
        const meeting = document.getElementsByClassName("meeting");
        for (let i = 0; i < meeting.length; ++i)
            meeting.item(i)!.innerHTML = "";
        setStatus("splash");
    }

    return <div className={className}>
        <div className={status === "loading" ? "text-center my-5" : "d-none"}>
            <h1>{t("Game.Meeting.Title")}</h1>
            <h3 className="mt-3">
                <Spinner color="primary" className="mr-2" />
                📞 {t("Game.Meeting.Loading")}
            </h3>
        </div>
        <div className={status === "splash" ? "text-center my-5" : "d-none"}>
            <h1>{t("Game.Meeting.Title")}</h1>
            <p>{t("Game.Meeting.Description")}</p>
            <Button color="primary" outline onClick={startMeeting}>📞 {t("Game.Meeting.Join")}</Button>
        </div>
        <div ref={meet} className={`meeting ${status === "meeting" ? "" : "d-none"}`} style={{ width: "100%", height: "calc(100vh - 50px - 4em )" }}></div>
    </div>
}


export default Meeting;