function BushKnight() {
    TextWindow.Open();
    while (Player.IsHuman()) {
        while (Player.WarMode()) {
            Orion.Wait(500);

            var attacker = Orion.FindObject(Orion.ClientLastAttack());
            if (Player.Mana() > 10 && !Orion.BuffExists('Counter Attack')) {
                Orion.Cast('Counter Attack');
                Orion.Wait(1000);
            }
            if (Player.Mana() > 10 &&
                !Orion.BuffExists('Lightning Strike') &&
                !Orion.BuffExists('Honorable Execution')
            ) {
                Orion.Cast('Lightning Strike');
                Orion.Wait(1000);
            }

            if (false && attacker != null && attacker.Distance() < 8) {
                if (Player.Mana() > 10 && !Orion.BuffExists('consecrate weapon')) {
                    Orion.Cast('consecrate weapon');
                    Orion.Wait(2000);
                }

                if (false && Player.Mana() > 10 && !Orion.BuffExists('divine fury')) {
                    Orion.Cast('divine fury');
                    Orion.Wait(2000);
                }
            }
        }
    }
}