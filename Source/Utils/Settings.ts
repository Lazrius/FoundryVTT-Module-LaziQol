import Globals, {Assert, Pair} from "../Globals";
import Logger from "./Logger";

class Settings {
	private constructor() {
		Logger.Ok("Loading configuration settings.")
		this.SettingsList = [
			// Add settings items here
			[ValidSetting.PreparedSpellCountInSheet, {
				name: "List Prepared Spell Count",
				scope: "world",
				type: Boolean,
				hint: "Modifies the actor sheet to list the current prepared spell out of their total capacity.",
				config: true,
				default: true,
			}],
			[ValidSetting.ResetPreparedSpellCountOnLongRest, {
				name: "Show reset prepared spells in LR Dialog",
				scope: "world",
				type: Boolean,
				hint: "Shows an option that allows prepared spells to be completely reset upon a long rest.",
				config: true,
				default: true,
			}],
			[ValidSetting.EnforcePreparedSpellCap, {
				name: "Enforce Prepared Spell Cap",
				scope: "world",
				type: Boolean,
				hint: "Prevents someone from preparing spells beyond their cap.",
				config: true,
				default: true,
			}],
		];
	}

	private static instance: Settings;

	public static Get(): Settings {
		if (Settings.instance)
			return Settings.instance;

		Settings.instance = new Settings();
		return Settings.instance;
	}

	private SettingsInit = false;
	public RegisterSettings(): void {
		if (this.SettingsInit)
			return;

		Assert(game instanceof Game);
		const g = game as Game;
		this.SettingsList.forEach((item) => {
			g.settings.register(Globals.ModuleName, item[0], item[1]);
		});

		this.SettingsInit = true;
	}

	readonly SettingsList: ReadonlyArray<Pair<ClientSettings.PartialSetting>>;
}

export const RegisterSettings = (): void => Settings.Get().RegisterSettings();

export enum ValidSetting {
	PreparedSpellCountInSheet = "PreparedSpellCountInSheet",
	ResetPreparedSpellCountOnLongRest = "ResetPreparedSpellCountOnLongRest",
	EnforcePreparedSpellCap = "EnforcePreparedSpellCap"
}

export const GetSetting = <T>(setting: ValidSetting): T | null => {
	const found = Settings.Get().SettingsList.find(x => x[0] === setting);
	return found ? found[1] as unknown as T : null;
}