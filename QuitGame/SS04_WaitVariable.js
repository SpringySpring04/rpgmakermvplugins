/*:
 * @target MV
 * @plugindesc Allows you to use a variable in the "wait" command in event pages
 * @author SpringySpring04
 * 
 * @help 
 * SS04_WaitVariable.js
 * Version 1.0.0
 * This plugin allows you to use a variable in the "Wait" command in event pages
 * 
 * @command SS04Wait
 * @text SS04Wait
 * @desc Executes the "Wait" command, passing the value in the given Variable ID to the Wait command
 * @arg ID
 * @type number
 * @text Variable ID
 * @desc The ID of the variable to use for the command
 * 
 *  +==============================================================
 *  * Changelog
 *  +--------------------------------------------------------------
 *      v1.0.0:
 *          * Initial Creation
*/

var Imported = Imported || {};
Imported.SS04_WaitVariable = "1.0.0";

(function() {
    
    /* // Reference
    Game_Interpreter.prototype.command230 = function() {
        this.wait(this._params[0]);
        return true;
    };
    */

    // call on Game_Interpreter
    var Wait_With_Variable = function(var_id) {
        this.wait($gameVariables.value(var_id));
        return true;
    }

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command == "SS04Wait") {
            Wait_With_Variable.call(this, args[0]);
        }
    }

})();