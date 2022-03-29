import {PlayerRest} from "./PlayerRest";

export const RenderDialog = (app: Dialog, html: JQuery): void => {
	if (app.options.template.endsWith('long-rest.html')) {
		const actor = (app as any).actor as Actor5e | undefined;
		if (!actor || !((actor.data.data.details as any).maxPreparedSpells))
			return;

		PlayerRest.OnPlayerRest(app, html);
		return;
	}
};