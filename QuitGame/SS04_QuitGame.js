/*:
 * @plugindesc Adds a "Quit" option to title screen and in-game menu
 * @author SpringySpring04
 * 
 * @param Enable Title Quit Command
 * @desc Default is ON, ON = enable quit command, OFF = disable quit command
 * @default true
 * @require 1
 * @type boolean
 * 
 * @param Enable Game End Quit Command
 * @desc Default is ON, ON = enable quit command, OFF = disable quit command
 * @default true
 * @require 1
 * @type boolean
 * 
 * @param Title Quit Text
 * @desc The text displayed for the "quit" option in the title screen
 * @default Quit
 * 
 * @param Game End Quit Text
 * @desc The text displayed for the "quit" option in the Game End screen in the in-game menu
 * @default Quit
 * 
 * @help 
 * SS04_QuitGame.js
 * Version 1.0.1
 * Adds "Quit" option to title screen and in-game menu
 * 
 *  +==============================================================
 *  * Changelog
 *  +--------------------------------------------------------------
 *  v1.0.1:
 *      * Added separate "Enable [menu] command" parameter for each screen,
 *        restructured code to look nicer
 *  v1.0.0:
 *      * Initial creation
 *  
*/

(function() {

    var parameters = PluginManager.parameters('SS04_QuitGame');
    var enableTitleCommand = Boolean(parameters['Enable Title Quit Command'] || true);
    var enableGameEndCommand = Boolean(parameters['Enable Game End Quit Command'] || true);
    var titleQuitText = String(parameters['Title Quit Text'] || "Quit");
    var gameEndQuitText = String(parameters['Game End Quit Text'] || "Quit");
    
    var QuitGameFunction = function() {
        if (this._commandWindow)
            this._commandWindow.close();
        SceneManager.exit();
    }

    if (enableTitleCommand) {
        var _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
        Window_TitleCommand.prototype.makeCommandList = function() {
            _Window_TitleCommand_makeCommandList.call(this);
            this.addCommand(titleQuitText, 'quitGame');
        };
        var _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
        Scene_Title.prototype.createCommandWindow = function() {
            _Scene_Title_createCommandWindow.call(this);
            // remove the window, add the command, and add the window right back
            this._windowLayer.removeChild(this._commandWindow);
            this._commandWindow.setHandler('quitGame', QuitGameFunction.bind(this));
            this.addWindow(this._commandWindow);
        };
    }
    
    if (enableGameEndCommand) {
        var _Window_GameEnd_makeCommandList = Window_GameEnd.prototype.makeCommandList;
        Window_GameEnd.prototype.makeCommandList = function() {
            _Window_GameEnd_makeCommandList.call(this);
            // temporarily remove the 'cancel' command
            this._list[this.findSymbol('cancel')] = null;
            this._list = this._list.filter(c => c != null);
            // add quitGame command
            this.addCommand(gameEndQuitText, 'quitGame');
            // add 'cancel' command back
            this.addCommand(TextManager.cancel,  'cancel');
        };
        var _Scene_GameEnd_createCommandWindow = Scene_GameEnd.prototype.createCommandWindow;
        Scene_GameEnd.prototype.createCommandWindow = function() {
            _Scene_GameEnd_createCommandWindow.call(this);
            // remove the window, add the command, and add the window right back
            this._windowLayer.removeChild(this._commandWindow);
            this._commandWindow.setHandler('quitGame', QuitGameFunction.bind(this));
            this.addWindow(this._commandWindow);
        };
    }

})();