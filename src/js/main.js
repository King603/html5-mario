import { Application } from "./Enjine/Application.js";
import { Mario } from "./Mario/index.js";

$(document).ready(() => new Application().Initialize(new Mario.LoadingState(), 320, 240));