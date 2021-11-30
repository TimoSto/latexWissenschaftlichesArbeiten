import Shell from "./Shell";
import ShellView from "./ShellView";

let view = new ShellView();
let shell = new Shell(view);
view.setShell(shell);

(<any>window).shell = shell;