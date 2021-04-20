declare module "react-step-progress-bar" {
    declare class ProgressBar extends React.Component<{
        percent: number;
        filledBackground: string;
        children?: JSX.Element | JSX.Element[]
    }> { }

    declare class Step extends React.Component<{
        transition: string;
        children: ({accomplished: boolean, index: number}) => any;
    }> { }
}