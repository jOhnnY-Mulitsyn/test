import UiVideo from "./UiVideo";
import video from "./video/video.mp4";

export default {
    title: "Ui-Kit/UiVideo",
    component: UiVideo,
};

const props = {
    src: video,
    playbackRate: 1.0,
    classes: "",
};

export const Default = {
    args: { ...props },
};
