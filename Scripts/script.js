var mainModule = function () {
    var attacked = false;
    var bossBattle = false;
    var sUnlocked = [false, false];

    var bossHP = 1000;
    var hp = 10;
    var hpMax = 10;
    var spirits = 1000000000;
    var attackDmg = [1, 5, 25];
    var dpsTotal = 0;
    var gpsTotal = 0;
    var miiValue = [25, 150, 500];
    var miiDmg = [1, 2.5, 5];
    var miiSpirits = [1, 2.5, 5];
    var miiUpgradePrice = [
        [125, 750, 2500],
        [375, 2250, 12500]
    ];
    var miiBoostPrice = 5000;
    var miiUpgradeBoost = [[]];
    var miiBoostBoost = 1.05;
    var attackUpgradePrice = 2500;

    var bossCount = 10;
    var fighterCount = 3;

    var stage = 1;
    var bossNum = 0;
    var last = 4, timer = 0;
    var miiNum = [0, 0, 0];
    var miiUpgradeBought = [];
    var miiBoostCounter = 0;
    var miiBoostBought = 0;
    var hpMod = 1;
    var spiritsMod = 1;
    var level = 1;
    var killed = 0;
    var killedTotal = 0;

    var menuName = ["FIGHTERS", "UPGRADES", "SETTINGS"];
    var bossName = [
        "PETEY PIRANHA",
        "RAYQUAZA",
        "PORKY",
        "GALLEOM TANK",
        "GALLEOM",
        "RIDLEY",
        "DUON",
        "META RIDLEY",
        "",
        "TABUU"
    ];
    var bossImage = [
        "Images/Bosses/petey.png",
        "Images/Bosses/rayquaza.png",
        "Images/Bosses/porky.png",
        "Images/Bosses/galleomTank.png",
        "Images/Bosses/galleom.png",
        "Images/Bosses/ridley.png",
        "Images/Bosses/duon.png",
        "Images/Bosses/ridleyMeta.png",
        "Images/Bosses/tabuuWings.png",
        "Images/Bosses/tabuu.png"
    ];
    var bossShadow = [
        "Images/Bosses/Boss Shadows/peteyShadow.png",
        "Images/Bosses/Boss Shadows/rayquazaShadow.png",
        "Images/Bosses/Boss Shadows/porkyShadow.png",
        "Images/Bosses/Boss Shadows/galleomTankShadow.png",
        "Images/Bosses/Boss Shadows/galleomShadow.png",
        "Images/Bosses/Boss Shadows/ridleyShadow.png",
        "Images/Bosses/Boss Shadows/duonShadow.png",
        "Images/Bosses/Boss Shadows/ridleyMetaShadow.png",
        "Images/Bosses/Boss Shadows/tabuuWingsShadow.png",
        "Images/Bosses/Boss Shadows/tabuuShadow.png"
    ];
    var bossEvent = [
        "Images/Bosses/Boss Events/peteyEvent.png",
        "Images/Bosses/Boss Events/rayquazaEvent.png",
        "Images/Bosses/Boss Events/porkyEvent.png",
        "Images/Bosses/Boss Events/galleomTankEvent.png",
        "Images/Bosses/Boss Events/galleomEvent.png",
        "Images/Bosses/Boss Events/ridleyEvent.png",
        "Images/Bosses/Boss Events/duonEvent.png",
        "Images/Bosses/Boss Events/ridleyMetaEvent.png",
        "Images/Bosses/Boss Events/tabuuWingsEvent.png",
        "Images/Bosses/Boss Events/tabuuEvent.png"
    ];

    var enemyName = [
        "PRIMID",
        "SCOPE PRIMID",
        "SWORD PRIMID",
        "BOOM PRIMID",
        "METAL PRIMID",
        "FIRE PRIMID",
        "BIG PRIMID"
    ];
    var enemyImage = [
        "Images/Enemies/primid.png",
        "Images/Enemies/primidScope.png",
        "Images/Enemies/primidSword.png",
        "Images/Enemies/primidBoom.png",
        "Images/Enemies/primidMetal.png",
        "Images/Enemies/primidFire.png",
        "Images/Enemies/primidBig.png"
    ];

    var miiName = ["MII BRAWLER", "MII FIGHTER", "MII GUNNER"];
    var miiDmgName = ["BEEFIER<br>BRAWLERS<br>", "SHARPER<br>SWORDS<br>", "GIRTHIER<br>GUNS<br>"];
    var miiSpiritsName = ["BULKIER<br>BULLDOZING<br>", "DEADLIER<br>DRILLING<br>", "PRICKIER<br>PENETRATION<br>"];

    var fighterEvent = [
        "Images/Fighters/Fighter Events/brawlerEvent.png",
        "Images/Fighters/Fighter Events/fighterEvent.png",
        "Images/Fighters/Fighter Events/gunnerEvent.png"
    ];

    //object ids
    var eventLabelID = document.querySelector("#eventLabel");
    var eventImageID = document.querySelector("#eventImage");

    var nameID = document.querySelector("#name");
    var hpID = document.querySelector("#hp");
    var hpBarID = document.querySelector("#hpBar");
    var enemy = document.querySelector("#enemyImage");
    var lvlID = document.querySelector("#lvl");
    var killedID = document.querySelector("#killed");
    var lvlBarID = document.querySelector("#lvlBar");
    var attack = [
        document.querySelector("#attackButton"),
        document.querySelector("#specialButton"),
        document.querySelector("#smashButton")
    ];

    var panelButton = [
        document.querySelector("#fighterMenu"),
        document.querySelector("#upgradeMenu"),
        document.querySelector("#settingMenu")
    ];
    var panelWidget = [
        document.querySelector("#fighterPanel"),
        document.querySelector("#upgradePanel"),
        document.querySelector("#settingPanel")
    ];

    var spiritsID = document.querySelector("#spirits");

    var mii = [
        document.querySelector("#brawler"),
        document.querySelector("#fighter"),
        document.querySelector("#gunner")
    ];
    var miiCost = [
        document.querySelector("#brawlerCost"),
        document.querySelector("#fighterCost"),
        document.querySelector("#gunnerCost")
    ];
    var miiAmount = [
        document.querySelector("#brawlerAmount"),
        document.querySelector("#fighterAmount"),
        document.querySelector("#gunnerAmount")
    ];
    var miiDmgUpgrade = [
        document.querySelector("#bDmg"),
        document.querySelector("#fDmg"),
        document.querySelector("#gDmg")
    ];
    var miiSpiritsUpgrade = [
        document.querySelector("#bSpirits"),
        document.querySelector("#fSpirits"),
        document.querySelector("#gSpirits")
    ];

    var miiBoostUpgrade = document.querySelector("#mBoost");
    var attackUpgrade = document.querySelector("#aNew");

    for (let i = 0; i < attack.length; i++) {
        attack[i].onclick = function () {
            if (!attacked)
                eventLabelID.innerHTML = "You attacked the enemy!";

            attacked = true;
            hp -= attackDmg[i];

            hpCheck();
        }
    }

    for (let i = 0; i < panelButton.length; i++) {
        panelButton[i].onclick = function () {
            for (let j = 0; j < panelButton.length; j++) {
                panelWidget[j].style.display = "none";
                panelButton[j].innerHTML = menuName[j].charAt(0);
                panelButton[j].style.width = "46px";
                panelButton[j].disabled = false;
            }

            panelButton[i].innerHTML = menuName[i];
            panelButton[i].style.width = "125px";
            panelButton[i].disabled = true;

            if (i == 1)
                panelWidget[i].style.display = "inline-grid";
            else
                panelWidget[i].style.display = "initial";
        }
    }

    for (let i = 0; i < mii.length; i++) {
        miiDmgUpgrade[i].innerHTML = miiDmgName[i] + "I<br>" + miiUpgradePrice[0][i];
        miiSpiritsUpgrade[i].innerHTML = miiSpiritsName[i] + "I<br>" + miiUpgradePrice[1][i];
        
        mii[i].onclick = function () {
            miiNum[i]++;
            miiAmount[i].innerHTML = miiNum[i];

            spirits -= miiValue[i];
            gpsTotal += miiSpirits[i];

            miiValue[i] = miiValue[i] * 1.15;
            miiCost[i].innerHTML = numberformat.formatShort(Math.round(miiValue[i] * 100) / 100);

            dpsTotal += miiDmg[i];

            // miiDps[i].innerHTML = (Math.round(miiDmg[i] * 10) / 10 * miiNum[i]);

            switch (miiNum[i]) {
                case 1:
                    window.setInterval(function () { dpsTimer() }, 1000 / 60);
                    window.setInterval(function () { gpsTimer() }, 1000);
                    eventImageID.src = fighterEvent[i];
                    eventLabelID.innerHTML = miiName[i] + "<br>has joined the battle!";

                    break;
                case 5:
                    if (i != 2) {
                        mii[i + 1].style.display = "initial";
                    }

                    break;
                case 10:
                    panelButton[1].style.display = "initial";
                    miiDmgUpgrade[i].style.display = "initial";

                    break;
                case 15:
                    miiBoostCounter++;

                    if (miiBoostCounter == 3)
                        miiBoostUpgrade.style.display = "initial";

                    break;
            }

            spiritsCheck();
        }

        miiDmgUpgrade[i].onclick = function () {
            spirits -= miiUpgradePrice[0][i];

            miiUpgradeBought[0][i]++;
            miiUpgradePrice[0][i] *= 3;
            miiDmgUpgrade[i].innerHTML = miiDmgName[i] + roman(miiUpgradeBought[0][i] + 1) + "<br>" + numberformat.formatShort(miiUpgradePrice[0][i]);

            miiDmg[i] *= miiUpgradeBoost[0][i];

            miiDps[i].innerHTML = numberformat.formatShort(round(miiDmg[i] * 10) / 10 * miiNum[i]);

            dpsTotal = 0;
            for (let j = 0; j < mii.length; j++)
                dpsTotal += miiDmg[j] * miiNum[j];

            spiritsCheck();
        }

        miiSpiritsUpgrade[i].onclick = function () {
            spirits -= miiUpgradePrice[1][i];

            miiUpgradeBought[1][i]++;
            miiUpgradePrice[1][i] *= 3;
            miiSpiritsUpgrade[i].innerHTML = miiSpiritsName[i] + roman(miiUpgradeBought[1][i] + 1) + "<br>" + miiNum[i]++;

            miiSpirits[i] *= miiUpgradeBoost[1][i];

            gpsTotal = 0;
            for (let j = 0; j < mii.length; j++)
                gpsTotal += miiSpirits[j] * miiNum[j];

            spiritsCheck();
        }
    }

    miiBoostUpgrade.onclick = function () {
        spirits -= miiBoostPrice;
        miiBoostPrice *= 3;
        miiBoostBought++;

        miiBoostUpgrade.innerHTML = "SUPERIOR SYNERGY<br>" + roman(miiBoostBought + 1) + "<br>" + numberformat.formatShort(miiBoostPrice);

        dpsTotal = 0;
        for (let j = 0; j < mii.length; j++) {
            miiDmg[j] *= miiBoostBoost;
            dpsTotal += miiDmg[j] * miiNum[j];
        }

        spiritsCheck();
    }

    attackUpgrade.onclick = function () {
        spirits -= attackUpgradePrice;

        attackUpgradePrice *= 3;

        if (!sUnlocked[0]) {
            sUnlocked[0] = true;
            attackUpgrade.style.display = "none";
            attackUpgrade.innerHTML = "Unlock Smash Attack<br>" + numberformat.formatShort(attackUpgradePrice);
            attackUpgrade.setToolTip("Unlocks the Smash Attack, which does 25 damage!<br>Can only attack once every 3 seconds.");
            attackButton.innerHTML = "A";
            attackButton.setFixedSize(100, 75);

            specialButton.style.display = "initial";
        }
        else if (!sUnlocked[1]) {
            sUnlocked[1] = true;
            attackUpgrade.style.display = "none";
            specialButton.innerHTML = "S";
            specialButton.setFixedSize(100, 75);

            smashButton.style.display = "initial";
        }

        spiritsCheck();
    }

    function roman(num) {
        if (isNaN(num))
            return NaN;
        var digits = String(+num).split(""),
            key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }

    function dpsTimer() {
        // window.setInterval(dpsTimer(), 1000 / 60);

        hp -= dpsTotal / 60;

        hpCheck();
    }

    function gpsTimer() {
        // window.setInterval(gpsTimer(), 1000);

        spirits += gpsTotal;

        spiritsCheck();
    }

    function randomEnemy() {
        switch (stage) {
            case 1:
                var randEnemy = Math.floor(Math.random() * 7);
                nameID.innerHTML = enemyName[randEnemy];
                enemy.src = enemyImage[randEnemy];
        }
    }

    function hpCheck() {
        if (hp <= 0 && !bossBattle) {
            killedTotal++;
            killed++;

            if (level % 10 == 0 && killed == 10) {
                bossBattle = true;

                bossNext.src = "";
                bossNextLabel.innerHTML = "";
                eventImageID.src = bossShadow[bossNum];
                eventLabelID.innerHTML = bossName[bossNum] + "<br>has joined the battle!";

                name.innerHTML = bossName[bossNum];
                enemy.src = bossImage[bossNum];

                hp = bossHP;
                hpMax = hp;
                hpBarID.max = hpMax;

                spirits += 10 * level;
                spiritsCheck();
            }
            else if (killed == 10) {
                killed = 0;
                hpMod++;

                level++;
                lvlID.innerHTML = "Level " + level;

                if (level % 10 == 0) {
                    bossNext.src = bossShadow[bossNum];
                    bossNextLabel.innerHTML = "A powerful enemy<br>is approaching...";
                }

                hp = 5 * (level + hpMod);
                hpMax = hp;
                hpBarID.max = hpMax;

                spirits += 10 * level;
                spiritsCheck();

                randomEnemy();
            }
            else {
                hp = 5 * (level + hpMod);
                hpMax = hp;

                spirits += level * spiritsMod;
                spiritsCheck();

                randomEnemy();
            }

            lvlBarID.value = killed;
            killedID.innerHTML = killed + "/10";
        }
        else if (hp <= 0 && bossBattle) {
            bossBattle = false;

            killed = 0;
            lvlBarID.value = killed;
            killedID.innerHTML = killed + "/10";

            killedTotal++;

            eventImageID.src = bossEvent[bossNum];
            eventLabelID.innerHTML = bossName[bossNum] + "<br>has been defeated!";

            bossNum++;
            bossHP = 100 * level * 1.5;

            level++;
            lvlID.innerHTML = "Level " + level;

            hpMod++;
            hp = 5 * (level + hpMod);
            hpMax = hp;
            hpBarID.max = hpMax;

            spirits += 100 * level * 1.5;
            spiritsCheck();

            randomEnemy();
        }

        switch (stage) {
            case 1:
                if (level % 10 == 0 && killed == 10) {
                    if (bossNum == 3 && bossHP / hp >= 2) {
                        pause(true);

                        if (timer == 8) {
                            galleomTimer.stop();
                            bossNum++;
                            bossNext.src = "";
                            bossNextLabel.innerHTML = "";
                            eventImageID.src = bossShadow[bossNum];
                            eventLabelID.innerHTML = "GALLEOM TANK transformed<br>into GALLEOM!";
                            name.innerHTML = bossName[bossNum];
                            enemy.src = bossImage[bossNum];

                            hp *= 1.5;

                            pause(false);
                        }
                        else
                            galleomTimer.start(250);
                    }
                    else if (bossNum == 8) {
                        pause(true);

                        eventImageID.src = "";
                        eventLabelID.innerHTML = "";

                        var tabuu;
                        // tabuu.setWindowFlag(Qt::FramelessWindowHint);
                        tabuu.innerHTML = "<p align='center'><img src='qrc://Images/Images/Bosses/Boss Shadows/tabuuWingsShadow.png'></p>",
                            "<p align='center'>You dare challenge the great TABUU?</p>";
                        var whatButton = tabuu.addButton("What?"/*, QMessageBox::YesRole*/);
                        var clicked = 0;
                        tabuu.exec();

                        while (clicked < 4) {
                            if (tabuu.clickedButton() == whatButton) {
                                switch (clicked) {
                                    case 0:
                                        tabuu.innerHTML = "<p align='center'><img src='qrc://Images/Images/Bosses/Boss Shadows/tabuuWingsShadow.png'></p>",
                                            "<p align='center'>You have defeated the Subspace Army, fool!</p>";
                                        tabuu.exec();
                                        break;
                                    case 1:
                                        tabuu.innerHTML = "<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuWingsEvent.png'></p>",
                                            "<p align='center'>Aren't you going to question me?</p>",
                                            "<p align='center'>The great TABUU?</p>";
                                        tabuu.exec();
                                        break;
                                    case 2:
                                        tabuu.innerHTML = "<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuWingsEvent.png'></p>",
                                            "<p align='center'>Not like that fool!</p>",
                                            "<p align='center'>You don't even want to know what I'm going to do?</p>";
                                        tabuu.exec();
                                        break;
                                    case 3:
                                        tabuu.innerHTML = "<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuEvent.png'></p>",
                                            "<p align='center'>Very well, have it your way!</p>",
                                            "<p align='center'>Die [insert name here]!</p>";
                                        tabuu.exec();
                                        break;
                                }

                                clicked++;
                            }
                        }

                        bossNum++;
                        eventImageID.src = bossShadow[bossNum];
                        eventLabelID.innerHTML = bossName[bossNum] + "<br> has joined the battle!";
                        name.innerHTML = bossName[bossNum];
                        enemy.src = bossImage[bossNum];
                        pause(false);
                    }
                }
                else if (bossNum == 10) {
                    pause(true);

                    eventImageID.src = "";
                    eventLabelID.innerHTML = "";

                    var tabuu;
                    // tabuu.setWindowFlag(Qt::FramelessWindowHint);
                    tabuu.innerHTML = "<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuEvent.png'></p>",
                        "<p align='center'>You have defeated the great TABUU?</p>";
                    var whatButton = tabuu.addButton("What?"/*, QMessageBox::YesRole*/);
                    var clicked = 0;
                    tabuu.exec();

                    while (clicked < 6) {
                        if (tabuu.clickedButton() == whatButton) {
                            switch (clicked) {
                                case 0:
                                    tabuu.innerHTML = "<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuEvent.png'></p>",
                                        "<p align='center'>What a great warrior you are!</p>";
                                    tabuu.exec();
                                    break;
                                case 1:
                                    tabuu.innerHTML = "<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuEvent.png'></p>",
                                        "<p align='center'>You could've been a great addition to the army.</p>";
                                    tabuu.exec();
                                    break;
                                case 2:
                                    tabuu.innerHTML = "<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuEvent.png'></p>",
                                        "<p align='center'>You do not know what lies ahead of you, kid.</p>";
                                    tabuu.exec();
                                    break;
                                case 3:
                                    tabuu.innerHTML = "<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuWingsEvent.png'></p>",
                                        "<p align='center'>If you think this was tough, get ready!</p>",
                                        "<p align='center'>Farewell, kid!</p>";
                                    tabuu.exec();
                                    break;
                                case 4:
                                    tabuu.innerHTML = "<p align='center'>You have completed the alpha!</p>",
                                        "<p align='center'>There is more to come, so stick around for updates!</p>";
                                    tabuu.exec();
                                    break;
                                case 5:
                                    qApp.quit();
                                    break;
                            }

                            clicked++;
                        }
                    }
                }

                break;
        }

        switch (level) {
            case 11:
                miiSpiritsUpgrade[0].style.display = "initial";
                attackUpgrade.style.display = "initial";

                break;
            case 21:
                miiSpiritsUpgrade[1].style.display = "initial";
                attackUpgrade.style.display = "initial";

                break;
            case 31:
                miiSpiritsUpgrade[2].style.display = "initial";

                break;
        }

        hpID.innerHTML = Math.round(hp);
        hpBarID.value = Math.round(hp);
    }

    function spiritsCheck() {
        for (let i = 0; i < 3; i++) {
            if (spirits >= miiValue[i] && !mii[i].style.display === "none") {
                mii[i].style.display = "initial";
                mii[i].disabled = false;
            }
            else if (spirits >= miiValue[i])
                mii[i].disabled = false;
            else
                mii[i].disabled = true;

            if (spirits >= miiUpgradePrice[0][i]) {
                miiDmgUpgrade[i].disabled = false;
            }
            else {
                // panelButton[2].setStyleSheet("background-color: #E6E6E6;");
                miiDmgUpgrade[i].disabled = true;
            }

            if (spirits >= miiUpgradePrice[1][i]) {
                miiSpiritsUpgrade[i].disabled = false;
            }
            else {
                // panelButton[2].setStyleSheet("background-color: #E6E6E6;");
                miiSpiritsUpgrade[i].disabled = true;
            }
        }

        if (spirits >= miiBoostPrice) {
            miiBoostUpgrade.disabled = false;
        }
        else {
            // panelButton[2].setStyleSheet("background-color: #E6E6E6;");
            miiBoostUpgrade.disabled = true;
        }

        if (!sUnlocked[1] && spirits >= attackUpgradePrice) {
            attackUpgrade.disabled = false;
        }
        else {
            // panelButton[2].setStyleSheet("background-color: #E6E6E6;");
            attackUpgrade.disabled = true;
        }

        spiritsID.innerHTML = numberformat.formatShort(spirits);
    }

    spiritsCheck();
}();