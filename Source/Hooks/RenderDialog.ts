import {PlayerRest} from "./PlayerRest";

export const RenderDialog = (app: Dialog, html: JQuery): void => {
	if (app.options.template.endsWith('long-rest.html')) {
		PlayerRest.OnPlayerRest(app, html);
		return;
	}
};