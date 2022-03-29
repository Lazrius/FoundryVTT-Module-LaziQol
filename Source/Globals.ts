import assert from "assert"

const ModuleInfo = {
	ModuleName: "lazri-qol",
	IsModule: true, // If you are developing a system rather than a module, change this to false
};

export default ModuleInfo;

// Pop some fairly universal types that we might use

export type Pair<T> = [string, T];
export const Assert = (value: unknown): void => assert(value);

interface Global {
	preparedSpellCount: number;
	invalidPreparedSpellId: string | null;
}

export const GetGlobalData = (): Global => {
	const win = window as any;
	return win[ModuleInfo.ModuleName] = win[ModuleInfo.ModuleName] || {
		preparedSpellCount: 0,
		invalidPreparedSpellId: null,
	} as Global;
}