attacked = false, bossBattle = false, sUnlocked = [false, false];

bossHP = 1000, hp = 10, hpMax = 10, spirits = 1000000000;
attackDmg = [1, 5, 25];
dpsTotal = 0;
gpsTotal = 0;
miiValue = [25, 150, 500];
miiDmg = [1, 2.5, 5];
miiSpirits = [1, 2.5, 5];
miiUpgradePrice = [
    [125, 750, 2500],
    [375, 2250, 12500]
];
miiBoostPrice = 5000;
miiUpgradeBoost = [[]];
miiBoostBoost = 1.05;
attackUpgradePrice = 2500;

bossCount = 10, fighterCount = 3;

stage = 1;
bossNum = 0;
last = 4, timer = 0;
miiNum = [0, 0, 0];
miiUpgradeBought = [];
miiBoostCounter = 0;
miiBoostBought = 0;
hpMod = 1, spiritsMod = 1, level = 1, killed = 0, killedTotal = 0;

menuName = ["FIGHTERS", "UPGRADES", "SETTINGS"];
bossName = [
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
enemyName = [
    "PRIMID",
    "SCOPE PRIMID",
    "SWORD PRIMID",
    "BOOM PRIMID",
    "METAL PRIMID",
    "FIRE PRIMID",
    "BIG PRIMID"
];

enemyImage = [
    "Images/Enemies/primid.png",
    "Images/Enemies/primidScope.png",
    "Images/Enemies/primidSword.png",
    "Images/Enemies/primidBoom.png",
    "Images/Enemies/primidMetal.png",
    "Images/Enemies/primidFire.png",
    "Images/Enemies/primidBig.png"
];

miiName = ["MII BRAWLER", "MII FIGHTER", "MII GUNNER"];
miiDmgName = ["BEEFIER<br>BRAWLERS<br>", "SHARPER<br>SWORDS<br>", "GIRTHIER<br>GUNS<br>"];
miiSpiritsName = ["BULKIER<br>BULLDOZING<br>", "DEADLIER<br>DRILLING<br>", "PRICKIER<br>PENETRATION<br>"];

//object ids
eventLabel = document.querySelector("#eventLabel");

nameLabel = document.querySelector("#name");
hpAmount = document.querySelector("#hp");
hpBar = document.querySelector("#hpBar");
enemy = document.querySelector("#enemyImage");
lvlLabel = document.querySelector("#lvlLabel");
killedLabel = document.querySelector("#killed");
lvlBar = document.querySelector("#lvlBar");

attack = [
    document.querySelector("#attackButton"),
    document.querySelector("#specialButton"),
    document.querySelector("#smashButton"),
];

panelButton = [
    document.querySelector("#fighterMenu"),
    document.querySelector("#upgradeMenu"),
    document.querySelector("#settingMenu")
];

panelWidget = [
    document.querySelector("#fighterPanel"),
    document.querySelector("#upgradePanel"),
    document.querySelector("#settingPanel")
];

spiritsID = document.querySelector("#spirits");

mii = [
    document.querySelector("#brawler"),
    document.querySelector("#fighter"),
    document.querySelector("#gunner")
];

miiCost = [
    document.querySelector("#brawlerCost"),
    document.querySelector("#fighterCost"),
    document.querySelector("#gunnerCost")
];

miiAmount = [
    document.querySelector("#brawlerAmount"),
    document.querySelector("#fighterAmount"),
    document.querySelector("#gunnerAmount")
];

miiDmgUpgrade = [
    document.querySelector("#bDmg"),
    document.querySelector("#fDmg"),
    document.querySelector("#gDmg")
];

miiSpiritsUpgrade = [
    document.querySelector("#bSpirits"),
    document.querySelector("#fSpirits"),
    document.querySelector("#gSpirits")
];

miiBoostUpgrade = document.querySelector("#mBoost");
attackUpgrade = document.querySelector("#aNew");

for (let i = 0; i < attack.length; i++) {
    attack[i].onclick = function () {
        if (!attacked)
            eventLabel.innerHTML = "You attacked the enemy!";

        attacked = true;
        hp -= attackDmg[i];

        hpCheck();
    }
}

for (let i = 0; i < panelButton.length; i++) {
    panelButton[i].onclick = function () {
        for (let j = 0; j < panelButton.length; j++) {
            panelWidget[i].style.display = none;
            panelButton[i].innerHTML = menuName[i].charAt(0);
            // panelButton[i].setFixedSize(46, 40);
            panelButton[i].disabled = false;
        }

        panelButton[i].innerHTML = menuName[i];
        // panelButton[i].setFixedSize(125, 40);
        panelButton[i].disabled = true;

        panelWidget[i].style.display = initial;
    }
}

for (let i = 0; i < mii.length; i++) {
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
                dpsTimer.start(1000 / 60);
                gpsTimer.start(1000);
                eventImage.src = fighterEvent[i];
                eventLabel.innerHTML = miiName[i] + "\nhas joined the battle!";

                break;
            case 5:
                if (i != 2) {
                    mii[i + 1].style.display = initial;
                }

                break;
            case 10:
                panelButton[2].style.display = initial;
                miiDmgUpgrade[i].style.display = initial;

                break;
            case 15:
                miiBoostCounter++;

                if (miiBoostCounter == 3)
                    miiBoostUpgrade.style.display = initial;

                break;
        }

        spiritsCheck();
    }

    miiDmgUpgrade[i].onclick = function () {
        spirits -= miiUpgradePrice[0][i];

        miiUpgradeBought[0][i]++;
        miiUpgradePrice[0][i] *= 3;
        miiDmgUpgrade[i].innerHTML = miiDmgName[i] + roman(miiUpgradeBought[0][i] + 1) + "\n" + numberformat.formatShort(miiUpgradePrice[0][i]);

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
        miiSpiritsUpgrade[i].innerHTML = miiSpiritsName[i] + roman(miiUpgradeBought[1][i] + 1) + "\n" + miiNum[i]++;

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

    miiBoostUpgrade.innerHTML = "SUPERIOR SYNERGY\n" + roman(miiBoostBought + 1) + "\n" + numberformat.formatShort(miiBoostPrice);

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
        attackUpgrade.style.display = none;
        attackUpgrade.innerHTML = "Unlock Smash Attack\n" + numberformat.formatShort(attackUpgradePrice);
        attackUpgrade.setToolTip("Unlocks the Smash Attack, which does 25 damage!\nCan only attack once every 3 seconds.");
        attackButton.innerHTML = "A";
        attackButton.setFixedSize(100, 75);

        specialButton.style.display = initial;
    }
    else if (!sUnlocked[1]) {
        sUnlocked[1] = true;
        attackUpgrade.style.display = none;
        specialButton.innerHTML = "S";
        specialButton.setFixedSize(100, 75);

        smashButton.style.display = initial;
    }

    spiritsCheck();
}

function dpsTimer() {
    dpsTimer.start(1000 / 60);

    hp -= dpsTotal / 60;

    hpCheck();
}

function gpsTimer() {
    gpsTimer.start(1000);

    spirits += gpsTotal;

    spiritsCheck();
}

function randomEnemy() {
    switch (stage) {
        case 1:
            var randEnemy = Math.floor(Math.random() * 7);
            nameLabel.innerHTML = enemyName[randEnemy];
            enemy.src = enemyImage[randEnemy];
    }
}

function hpCheck() {
    if (hp <= 0 && !bossBattle) {
        killedTotal++;
        killed++;

        if (level % 10 == 0 && killed == 10) {
            bossBattle = true;

            bossNext.innerHTML = "";
            bossNextLabel.innerHTML = "";
            eventImage.src = bossShadow[bossNum];
            eventLabel.innerHTML = bossName[bossNum] + "<br>has joined the battle!";

            name.innerHTML = bossName[bossNum];
            enemy.src = bossImage[bossNum];

            hp = bossHP;
            hpMax = hp;
            hpBar.max = hpMax;

            spirits += 10 * level;
            spiritsCheck();
        }
        else if (killed == 10) {
            killed = 0;
            hpMod++;

            level++;
            lvlLabel.innerHTML = "Level " + level;

            if (level % 10 == 0) {
                bossNext.src = bossShadow[bossNum];
                bossNextLabel.innerHTML = "A powerful enemy<br>is approaching...";
            }

            hp = 5 * (level + hpMod);
            hpMax = hp;
            hpBar.max = hpMax;

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

        lvlBar.value = killed;
        killedLabel.innerHTML = killed + "/10";
    }
    else if (hp <= 0 && bossBattle) {
        bossBattle = false;

        killed = 0;
        lvlBar.value = killed;
        killedLabel.innerHTML = killed + "/10";

        killedTotal++;

        eventImage.src = bossEvent[bossNum];
        eventLabel.innerHTML = bossName[bossNum] + "<br>has been defeated!";

        bossNum++;
        bossHP = 100 * level * 1.5;

        level++;
        lvlLabel.innerHTML = "Level " + level;

        hpMod++;
        hp = 5 * (level + hpMod);
        hpMax = hp;
        hpBar.max = hpMax;

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
                        bossNext.innerHTML = "";
                        bossNextLabel.innerHTML = "";
                        eventImage.src = bossShadow[bossNum];
                        eventLabel.innerHTML = "GALLEOM TANK transformed<br>into GALLEOM!";
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

                    eventImage.src = "";
                    eventLabel.innerHTML = "";

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
                    eventImage.src = bossShadow[bossNum];
                    eventLabel.innerHTML = bossName[bossNum] + "<br> has joined the battle!";
                    name.innerHTML = bossName[bossNum];
                    enemy.src = bossImage[bossNum];
                    pause(false);
                }
            }
            else if (bossNum == 10) {
                pause(true);

                eventImage.innerHTML = "";
                eventLabel.innerHTML = "";

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
            miiSpiritsUpgrade[0].style.display = initial;
            attackUpgrade.style.display = initial;

            break;
        case 21:
            miiSpiritsUpgrade[1].style.display = initial;
            attackUpgrade.style.display = initial;

            break;
        case 31:
            miiSpiritsUpgrade[2].style.display = initial;

            break;
    }

    hpAmount.innerHTML = hp;
    hpBar.value = hp;
}

function spiritsCheck() {
    for (let i = 0; i < 3; i++) {
        if (spirits >= miiValue[i] && !mii[i].style.display === "none") {
            mii[i].style.display = initial;
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