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

	const spellBookFilter = html.find('ul.filter-list[data-filter="spellbook"]:first');
	if (!spellBookFilter)
		return;

	const preparedSpellElement = spellBookFilter.find('li[data-filter="prepared"]:first');
	if (!preparedSpellElement)
		return;

	const OnPreparedCountChange = (evt: Event): void => {
		if (!evt.currentTarget)
			return;

		const target = $(evt.currentTarget);
		if (!target)
			return;

		const html = target.html();
		const match = target.html().match(/(\d+)/g);
		if (!match)
			return;

		const outOf = match[0] + '/' + (app.actor.data.data.details as any).maxPreparedSpells;

		preparedSpellElement.off('change');
		target.html(html.replace(match[0], outOf));
		preparedSpellElement.on('change', OnPreparedCountChange);
	}

	preparedSpellElement.on('change', OnPreparedCountChange);
	preparedSpellElement.trigger('change');
};