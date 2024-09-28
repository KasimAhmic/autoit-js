//@ts-check
import fs from 'node:fs';
import path from 'node:path';

const bindingsPath = path.resolve(process.cwd(), 'src', 'bindings');

const autoItFunctions = [
  'AU3_Init',
  'AU3_AutoItSetOption',
  'AU3_ClipGet',
  'AU3_ClipPut',
  'AU3_ControlClick',
  'AU3_ControlClickByHandle',
  'AU3_ControlCommand',
  'AU3_ControlCommandByHandle',
  'AU3_ControlListView',
  'AU3_ControlListViewByHandle',
  'AU3_ControlDisable',
  'AU3_ControlDisableByHandle',
  'AU3_ControlEnable',
  'AU3_ControlEnableByHandle',
  'AU3_ControlFocus',
  'AU3_ControlFocusByHandle',
  'AU3_ControlGetFocus',
  'AU3_ControlGetFocusByHandle',
  'AU3_ControlGetHandle',
  'AU3_ControlGetHandleAsText',
  'AU3_ControlGetPos',
  'AU3_ControlGetPosByHandle',
  'AU3_ControlGetText',
  'AU3_ControlGetTextByHandle',
  'AU3_ControlHide',
  'AU3_ControlHideByHandle',
  'AU3_ControlMove',
  'AU3_ControlMoveByHandle',
  'AU3_ControlSend',
  'AU3_ControlSendByHandle',
  'AU3_ControlSetText',
  'AU3_ControlSetTextByHandle',
  'AU3_ControlShow',
  'AU3_ControlShowByHandle',
  'AU3_ControlTreeView',
  'AU3_ControlTreeViewByHandle',
  'AU3_DriveMapAdd',
  'AU3_DriveMapDel',
  'AU3_DriveMapGet',
  'AU3_IsAdmin',
  'AU3_MouseClick',
  'AU3_MouseClickDrag',
  'AU3_MouseDown',
  'AU3_MouseGetCursor',
  'AU3_MouseGetPos',
  'AU3_MouseMove',
  'AU3_MouseUp',
  'AU3_MouseWheel',
  'AU3_Opt',
  'AU3_PixelChecksum',
  'AU3_PixelGetColor',
  'AU3_PixelSearch',
  'AU3_ProcessClose',
  'AU3_ProcessExists',
  'AU3_ProcessSetPriority',
  'AU3_ProcessWait',
  'AU3_ProcessWaitClose',
  'AU3_Run',
  'AU3_RunWait',
  'AU3_RunAs',
  'AU3_RunAsWait',
  'AU3_Send',
  'AU3_Shutdown',
  'AU3_Sleep',
  'AU3_StatusbarGetText',
  'AU3_StatusbarGetTextByHandle',
  'AU3_ToolTip',
  'AU3_WinActivate',
  'AU3_WinActivateByHandle',
  'AU3_WinActive',
  'AU3_WinActiveByHandle',
  'AU3_WinClose',
  'AU3_WinCloseByHandle',
  'AU3_WinExists',
  'AU3_WinExistsByHandle',
  'AU3_WinGetCaretPos',
  'AU3_WinGetClassList',
  'AU3_WinGetClassListByHandle',
  'AU3_WinGetClientSize',
  'AU3_WinGetClientSizeByHandle',
  'AU3_WinGetHandle',
  'AU3_WinGetHandleAsText',
  'AU3_WinGetPos',
  'AU3_WinGetPosByHandle',
  'AU3_WinGetProcess',
  'AU3_WinGetProcessByHandle',
  'AU3_WinGetState',
  'AU3_WinGetStateByHandle',
  'AU3_WinGetText',
  'AU3_WinGetTextByHandle',
  'AU3_WinGetTitle',
  'AU3_WinGetTitleByHandle',
  'AU3_WinKill',
  'AU3_WinKillByHandle',
  'AU3_WinMenuSelectItem',
  'AU3_WinMenuSelectItemByHandle',
  'AU3_WinMinimizeAll',
  'AU3_WinMinimizeAllUndo',
  'AU3_WinMove',
  'AU3_WinMoveByHandle',
  'AU3_WinSetOnTop',
  'AU3_WinSetOnTopByHandle',
  'AU3_WinSetState',
  'AU3_WinSetStateByHandle',
  'AU3_WinSetTitle',
  'AU3_WinSetTitleByHandle',
  'AU3_WinSetTrans',
  'AU3_WinSetTransByHandle',
  'AU3_WinWait',
  'AU3_WinWaitByHandle',
  'AU3_WinWaitActive',
  'AU3_WinWaitActiveByHandle',
  'AU3_WinWaitClose',
  'AU3_WinWaitCloseByHandle',
  'AU3_WinWaitNotActive',
  'AU3_WinWaitNotActiveByHandle',
];

for (const autoItFunctionName of autoItFunctions) {
  const functionName = autoItFunctionName.replace('AU3_', '');
  const fileName = functionName.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

  const sourceCode = `#include "../macros.h"
#include "../validators.h"
#include "autoit.h"
#include "autoitx3.h"

Napi::Object ${functionName}(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    // TODO: Handle validation
    if (const auto [success, error] = ValidateArguments(info, 0, {}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const auto [${functionName}, errorCode, error] = LoadAutoItFunction(${autoItFunctionName});

    if (${functionName} == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    // TODO: Call the function
    // ${functionName}();

    ReturnResult(true, StatusCode::None, env.Null());
}
`;

  const filePath = path.resolve(bindingsPath, `${fileName}.cpp`);

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    console.log(`Skipping ${fileName}.cpp as it already exists`);
    continue;
  }

  console.log(`Writing ${fileName}.cpp to ${filePath}`);
  fs.writeFileSync(path.resolve(bindingsPath, filePath), sourceCode);
}
