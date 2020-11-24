//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Magic.js
//#include Scripts/Crafting/Miner.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js

//Opens the carpentry window and created the last item
//Uses a FindList for saws and boards, labelled Carpentry
//WIP// 
function StartCarpentryLoop() {
    CarpentryCreateLoop('Carpentry');
}

function RestackContainerItems() {
Orion.Print('Select the container you would like to sort');
var container = SelectTarget();
MoveItems(container,container,'any','any');
}

function CarpentryCreateLoop(listName) {
    EquipAxe();
    BotPush("started");
    var righthand = Orion.ObjAtLayer('LeftHand');
    var triedToBuy = false;
    var toolSet = '0x1034';
    while (!Player.Dead()) {
        Orion.Wait(400);
        TextWindow.Clear();
        DebugText('Carpentry :' + Orion.SkillValue(listName));
        var needToBuy = NotEnoughResourcesGump();
        DebugText("NeedToBuy:" + needToBuy);
        if (needToBuy && !triedToBuy) {
            Restock(listName);
            triedToBuy = listHasEmptyInBackpack(listName);
        }
        if (needToBuy && triedToBuy) {
            Orion.Print(triedToBuy);

            Orion.PauseScript();
        }
        else {
            triedToBuy = false;
            Orion.Print('make');

            if (Orion.WaitForGump(1000)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (gump0.ID() === '0x38920ABD')) {
                    gump0.Select(Orion.CreateGumpHook(21));
                }
            }
            else {
                var tools = Orion.FindTypeEx(toolSet, 'any', 'backpack');
                if (tools.length == 0 || Orion.SkillValue('Carpentry') > 700) {
                    BotPush("no saws left");
                    BotPush("Carp: " + Orion.SkillValue('Carpentry'));

                    Orion.ShutdownWindows('forced');
                }
                Orion.UseObject(tools[0].Serial());
            }

            Orion.FindTypeEx('0x14F0').forEach(function (item) {
                Orion.MoveItem(item.Serial(), 1, '0x43122D26');
                Orion.Wait(700);

            });

            Orion.FindTypeEx('0x0E3D|0x09AA|0x0B4F').forEach(function (item) {
                Orion.ObjAtLayer('LeftHand');
                Orion.UseObject(righthand.Serial());
                if (Orion.WaitForTarget(1000)) {
                    Orion.TargetObject(item.Serial());
                    Orion.Wait(700);
                }
            });
        }
    }
    BotPush("You Died");
    Orion.FindTypeEx(any, any, ground,
            'nothumanmobile|live|ignoreself|ignorefriends', 10, 4).forEach(function (mob){
                    BotPush(mob.Name());
            });
              Orion.ShutdownWindows('forced');

}