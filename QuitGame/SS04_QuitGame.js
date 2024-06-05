/*:
 * @plugindesc Adds a "Quit" option to title screen and in-game menu
 * @author SpringySpring04
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
 * Version 1.0.0
 * Adds "Quit" option to title screen and in-game menu
*/

(function() {

    var parameters = PluginManager.parameters('SS04_QuitGame');
    var titleQuitText = String(parameters['Title Quit Text'] || "Quit");
    var gameEndQuitText = String(parameters['Game End Quit Text'] || "Quit");
    
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
    }

    var _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.call(this);
        this.addCommand(titleQuitText, 'quitGame');
    }

    var QuitGameFunction = function() {
        if (this._commandWindow)
            this._commandWindow.close();
        SceneManager.exit();
    }

    var _Scene_GameEnd_createCommandWindow = Scene_GameEnd.prototype.createCommandWindow;
    Scene_GameEnd.prototype.createCommandWindow = function() {
        _Scene_GameEnd_createCommandWindow.call(this);
        // remove the window, add the command, and add the window right back
        this._windowLayer.removeChild(this._commandWindow);
        this._commandWindow.setHandler('quitGame', QuitGameFunction.bind(this));
        this.addWindow(this._commandWindow);
    }

    var _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        // remove the window, add the command, and add the window right back
        this._windowLayer.removeChild(this._commandWindow);
        this._commandWindow.setHandler('quitGame', QuitGameFunction.bind(this));
        this.addWindow(this._commandWindow);
    }

})();