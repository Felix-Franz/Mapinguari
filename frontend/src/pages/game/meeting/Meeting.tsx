import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Spinner } from "reactstrap";
import MeetingType from "../../../core/types/MeetingType";

const JITSI_DOMAIN = "meet.jit.si";

const Meeting: React.FC<{
    meeting: MeetingType,
    me?: string
}> = ({ meeting, me }) => {
    const {t} = useTranslation();
    const [status, setStatus] = useState<"loading" | "splash" | "meeting">("loading");

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://${JITSI_DOMAIN}/external_api.js`;
        script.async = true;
        script.onload = () => setStatus("splash");
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const startMeeting = () => {
        setStatus("loading");
        const options = {
            roomName: meeting.roomName,
            width: "100%",
            height: "100%",
            parentNode: document.querySelector('#meet'),
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
        setStatus("splash");
        document.querySelector('#meet')!.innerHTML = "";
    }

    return <div>
        <div className={status === "loading" ? "text-center mt-5" : "d-none"}>
            <h1>{t("Game.Meeting.Title")}</h1>
            <h3 className="mt-3">
                <Spinner color="primary" className="mr-2" />
                📞 {t("Game.Meeting.Loading")}
            </h3>
        </div>
        <div className={status === "splash" ? "text-center mt-5" : "d-none"}>
            <h1>{t("Game.Meeting.Title")}</h1>
            <p>{t("Game.Meeting.Description")}</p>
            <Button color="primary" outline onClick={startMeeting}>📞 {t("Game.Meeting.Join")}</Button>
        </div>
        <div id="meet" className={status === "meeting" ? "" : "d-none"} style={{ width: "100%", height: "calc(100vh - 50px - 4em )" }}></div>
    </div>
}


export default Meeting;