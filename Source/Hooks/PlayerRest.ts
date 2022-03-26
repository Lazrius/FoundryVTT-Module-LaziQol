export class PlayerRest {
	private constructor() {}

	static clearPreparedSpells = false;

	static OnPlayerRest(app: Dialog, html: JQuery): void {
		const dialog = html.find('.dialog-buttons:first');
		const preparedButton = `
			<div class='form-group'>
				<label>Reset Prepared Spells?</label>
				<input type="checkbox" name="resetPreparedSpells"/>
				<p class="hint">Unprepare all spells?</p>
			</div>
		`;

		dialog.before(preparedButton);

		html.find('input[name="resetPreparedSpells"]:first').on('change', (evt) => {
			const checkbox = $(evt.currentTarget) as JQuery<HTMLInputElement>;
			PlayerRest.clearPreparedSpells = checkbox.is(':checked');
		});
	}

	static OnPlayerRestCompleted(actor: Actor5e, rest: Actor5e.RestData): void {
		if (PlayerRest.clearPreparedSpells && (rest as any).longRest) {
			actor.items.forEach(x => {
				const data = x.data.data as any;
				if (!data.preparation)
					return;

				if (data.preparation.mode === "prepared" && data.preparation.prepared)
					x.update({["data.preparation.prepared"]: false});
			});
		}
	}
}