import Shell from "./Shell";
import ShellView from "./ShellView";
import PresentationModel from "./PresentationModel";

let pmod = new PresentationModel()
let view = new ShellView(pmod);
let shell = new Shell(view);
view.setShell(shell);

(<any>window).shell = shell;