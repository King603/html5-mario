import { Enjine } from "./Enjine.js";
import { Mario } from "./Mario.js";

$(document).ready(() => new Enjine.Application().Initialize(new Mario.LoadingState(), 320, 240));