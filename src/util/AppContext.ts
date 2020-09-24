import React from "react";
import { AppState, AppAction } from "typings/app-types";

export interface AppContext {
	state: AppState;
	dispatch: React.Dispatch<AppAction>;
}

export default React.createContext<AppContext>(null);
