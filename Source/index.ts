import Logger from "./Utils/Logger";
import PreloadTemplates from "./PreloadTemplates";
import { RegisterSettings } from "./Utils/Settings";
import { ApplyActiveEffect } from "./Hooks/ApplyActiveEffect";
import {RenderActorSheet} from "./Hooks/RenderActorSheet";
import {PlayerRest} from "./Hooks/PlayerRest";
import {RenderDialog} from "./Hooks/RenderDialog";

Hooks.once("init", async () => {
	RegisterSettings();
	await PreloadTemplates();

	// Taken from TidySheet5E
	Hooks.on("applyActiveEffect", ApplyActiveEffect);
});

Hooks.once("ready", () => {
	Logger.Ok("Module is now ready.");
});

Hooks.on("renderActorSheet", RenderActorSheet);
Hooks.on("renderDialog", RenderDialog);
Hooks.on('restCompleted', PlayerRest.OnPlayerRestCompleted);