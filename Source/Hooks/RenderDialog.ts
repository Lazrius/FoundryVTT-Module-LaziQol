import {PlayerRest} from "./PlayerRest";

export const RenderDialog = (app: Dialog, html: JQuery): void => {
	if (app.options.template.endsWith('long-rest.html')) {
		const actor = (app as any).actor as Actor5e | undefined;
		if (!actor || !((actor.data.data.details as any).maxPreparedSpells))
			return;

		// Unset height to allow for our element to be properly rendered
		html.css('height', '');
		PlayerRest.OnPlayerRest(app, html);
		return;
	}
};