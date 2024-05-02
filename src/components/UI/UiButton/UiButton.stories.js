import UiButton from "./UiButton";

export default {
    title: 'Ui-Kit/UiButton',      //название папки и компонента в storybook
    component: UiButton
}

const props = {                    //все пропы UiButton по умолчанию
    text: 'hello', 
    onClick: () => console.log('click clack'), 
    disabled: false,
    theme:'light',
    classes:'',
}

export const Light = {             //темы UiButton с необходимыми изменениями
    args: {...props}
  };

export const Dark = {
    args: {...props, theme: 'dark'}
  };

export const Disabled = {
    args: {...props, disabled: true}
  };