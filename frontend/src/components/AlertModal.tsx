import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

type AlertType = {
	header: string,
	subHeader?: string
	message: string,
	demiss?: () => void,
	buttons?: (string | { text: string, color?: string, handler?: () => void })[]
}

type StateType = {
	open: boolean,
	alert?: AlertType
}

export default class AlertModal extends React.Component<{}, StateType> {
	private static instance: AlertModal;
	private static alerts: Array<AlertType> = [];

	public static show(alert: AlertType, override: boolean = false) {
		if (override)
			this.alerts = [alert];
		else
			this.alerts.push(alert);
		this.instance.showNextAlert();

	}

	constructor(props: any) {
		super(props);
		AlertModal.instance = this;
		this.state = {
			open: false,
			alert: undefined,
		};
		this.onClickButton = this.onClickButton.bind(this);
	}

	private showNextAlert() {
		if (AlertModal.alerts.length > 0 && !this.state.alert) {
			const alert: any = AlertModal.alerts.pop();
			if (alert)
				this.setState({open: true, alert})
		}
	}

	onClickButton(before?: () => void) {
		if (before)
			before();
		if (this.state.alert!.demiss)
			this.state.alert!.demiss();
		this.setState({alert: undefined, open: false}, () => this.showNextAlert());
	}

	render() {
		if (this.state.alert) {
			const rawButtons = this.state.alert.buttons || ["OK"];
			const buttons = rawButtons.map((r, i) => {
				if (typeof r === "string")
					return <Button key={i} color="primary" onClick={() => this.onClickButton()}>{r}</Button>;
				else
					return <Button key={i} color={r.color || "primary"}
								   onClick={() => this.onClickButton(r.handler)}>{r.text}</Button>
			});
			return (
				<Modal isOpen={this.state.open}>
					<ModalHeader toggle={() => this.onClickButton()}>
						{this.state.alert.header}
						<p className="mt-1 font-italic"
						   style={{display: this.state.alert.subHeader ? undefined : "none", fontSize: "75%"}}>
							{this.state.alert.subHeader}
						</p>
					</ModalHeader>
					<ModalBody>{this.state.alert.message}</ModalBody>
					<ModalFooter>
						{buttons}
					</ModalFooter>
				</Modal>
			);
		}
		else
			return "";
	}
}
