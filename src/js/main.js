import { Enjine } from "./Enjine/index.js";
import { Mario } from "./Mario/index.js";

$(document).ready(() => new Enjine.Application().Initialize(new Mario.LoadingState(), 320, 240));