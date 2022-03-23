import {
	EffectChangeData
} from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/effectChangeData";

export const ApplyActiveEffect = async (actor: Actor5e, change: EffectChangeData): Promise<void | boolean> => {
	if (change.key !== "data.details.maxPreparedSpells")
		return;

	if (!change.value || !change.value.length)
		return;

	const oldValueString =  getProperty(actor.data, change.key) || "0";
	let changeText = change.value.trim();
	let op = "none";
	if (["+","-","/","*","="].includes(changeText[0])) {
		op = changeText[0];
		changeText = changeText.slice(1);
	}
	const rollData = actor.getRollData();
	Object.keys(rollData.abilities).forEach(abl => {
		const ability = ((rollData.abilities as Record<string, unknown>)[abl] as DND5e.Ability);
		ability.mod = Math.floor((ability.value - 10) / 2);
	});

	// const value = new Roll(changeText, rollData).roll().total;
	const roll = await new Roll(changeText, rollData).roll();
	const value = roll.total as number;
	const oldValue = parseInt(oldValueString);
	switch (op) {
		case "+":
			return setProperty(actor.data, change.key, oldValue + value);
		case "-":
			return setProperty(actor.data, change.key, oldValue - value);
		case "*":
			return setProperty(actor.data, change.key, oldValue * value);
		case "/":
			return setProperty(actor.data, change.key, oldValue / value);
		case "=":
			return setProperty(actor.data, change.key, value);
		default:
			return setProperty(actor.data, change.key, value);
	}
}