import UiLoading from "./UiLoading";

export default {
    title: "Ui-Kit/UiLoading", //название папки и компонента в storybook
    component: UiLoading,
};

const props = {
    //все пропы UiButton по умолчанию
    theme: "black",
    isShadow: false,
    classes: "",
};

export const Black = {
    //темы UiButton с необходимыми изменениями
    args: { ...props },
};

export const White = {
    args: { ...props, theme: "white", isShadow: true },
};

export const Blue = {
    args: { ...props, theme: "blue" },
};
