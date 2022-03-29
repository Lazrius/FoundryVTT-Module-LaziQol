import {GetSetting, ValidSetting} from "../Utils/Settings";
import {ApplyActiveEffect} from "./ApplyActiveEffect";
import {GetGlobalData} from "../Globals";
import ClickEvent = JQuery.ClickEvent;

export const RenderActorSheet = async (app: ActorSheet5e, html: JQuery): Promise<void> => {
	const global = GetGlobalData();
	global.preparedSpellCount = 0;

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

		global.preparedSpellCount = parseInt(match[0]);
		const outOf = match[0] + '/' + (app.actor.data.data.details as any).maxPreparedSpells;

		preparedSpellElement.off('change');
		target.html(html.replace(match[0], outOf));
		preparedSpellElement.on('change', OnPreparedCountChange);
	}

	preparedSpellElement.on('change', OnPreparedCountChange);

	// Check if we are tracking an invalid spell id
	if (GetSetting<boolean>(ValidSetting.EnforcePreparedSpellCap) && global.invalidPreparedSpellId) {
		const spellId = global.invalidPreparedSpellId;

		// Reset the stored value
		global.invalidPreparedSpellId = null;

		const el = html.find(`.item.flexrow[data-item-id="${spellId}"]:first`);
		if (!el) {
			return;
		}

		const button = el.find('.item-control.item-toggle.active');
		if (!button) {
			return;
		}

		// I feel like there are better ways
		button.trigger('click');
	}

	// Trigger the refresh
	preparedSpellElement.trigger('change');

	// Add a tracking click event to all unprepared spells if we are at max
	if (GetSetting<boolean>(ValidSetting.EnforcePreparedSpellCap) && global.preparedSpellCount >= (app.actor.data.data.details as any).maxPreparedSpells) {
		html.find('.item-control.item-toggle[title="Unprepared"]').on('click', (evt: ClickEvent) => {
			const el = $(evt.currentTarget);
			if (!el)
				return;

			const spell = el.parents('.item.flexrow[data-item-id]');
			if (!spell)
				return;

			global.invalidPreparedSpellId = spell.attr('data-item-id') || null;
		});
	}
};