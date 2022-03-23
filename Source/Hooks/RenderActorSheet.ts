import {GetSetting, ValidSetting} from "../Utils/Settings";
import {ApplyActiveEffect} from "./ApplyActiveEffect";

export const RenderActorSheet = async (app: ActorSheet5e, html: JQuery): Promise<void> => {
	if (!GetSetting<boolean>(ValidSetting.PreparedSpellCountInSheet)) {
		return;
	}


	const maxPreparedSpells = (app.actor.data.data.details as any).maxPreparedSpells as string | undefined;
	if (maxPreparedSpells === undefined) {
		return;
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	await ApplyActiveEffect(app.actor, { key: "data.details.maxPreparedSpells", value: maxPreparedSpells });

	console.log(app);
	console.log(html);
};