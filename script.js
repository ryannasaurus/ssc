var eventLabel;
var name;
var enemy;
var attack;
var panelButton;
var mii;
var miiIcon;
var miiDmgUpgrade;
var miiSpiritsUpgrade;
var miiBoostUpgrade;
var attackUpgrade;

window.onload = function () {
    eventLabel = document.querySelector("#eventLabel");

    name = document.querySelector("#name");
    enemy = document.querySelector("#enemyImage");

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

    mii = [
        document.querySelector("#brawler"),
        document.querySelector("#fighter"),
        document.querySelector("#gunner")
    ];

    miiIcon = [
        document.querySelector("#brawler"),
        document.querySelector("#fighter"),
        document.querySelector("#gunner")
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

    spiritsCheck();
}

var attacked = false, bossBattle = false, sUnlocked = [false, false];

var bossHP = 1000, hp = 10, hpMax = 10, spirits = 0;
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

var bossCount = 10, fighterCount = 3;

var stage = 1;
var bossNum = 0;
var last = 4, timer = 0;
var miiNum = [];
var miiUpgradeBought = [];
var miiBoostCounter = 0;
var miiBoostBought = 0;
var hpMod = 1, spiritsMod = 1, level = 1, killed = 0, killedTotal = 0;

var menuName = ["FIGHTERS", "HEROES", "UPGRADES", "SETTINGS"];
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
var enemyName = [
    "PRIMID",
    "SCOPE PRIMID",
    "SWORD PRIMID",
    "BOOM PRIMID",
    "METAL PRIMID",
    "FIRE PRIMID",
    "BIG PRIMID"
];
var miiName = ["MII BRAWLER", "MII FIGHTER", "MII GUNNER"];
var miiDmgName = ["BEEFIER<br>BRAWLERS<br>", "SHARPER<br>SWORDS<br>", "GIRTHIER<br>GUNS<br>"];
var miiSpiritsName = ["BULKIER<br>BULLDOZING<br>", "DEADLIER<br>DRILLING<br>", "PRICKIER<br>PENETRATION<br>"];

var enemyImage = [
    "Images/Enemies/primid.png",
    "Images/Enemies/primidScope.png",
    "Images/Enemies/primidSword.png",
    "Images/Enemies/primidBoom.png",
    "Images/Enemies/primidMetal.png",
    "Images/Enemies/primidFire.png",
    "Images/Enemies/primidBig.png"
];

function setText(id, text) {
    id.innerHTML = text;
}

function setImage(id, path) {
    id.style.src = path;
}

function setEnabled(id) {
    id.disabled = false;
}

function setDisabled(id) {
    id.disabled = true;
}

function show(id) {
    id.style.display = visible;
}

function hide(id) {
    id.style.display = none;
}

function randomEnemy() {
    switch (stage) {
        case 1:
            var randEnemy = Math.floor((Math.random() * 6) + 1);
            setText(name, enemyName[randEnemy]);
            setImage(enemy, enemyImage[randEnemy]);
    }
}

function hpCheck() {
    if (hp <= 0 && !bossBattle) {
        killedTotal++;
        killed++;

        if (level % 10 == 0 && killed == 10) {
            bossBattle = true;

            bossNext.clear();
            bossNextLabel.setText("");
            eventImage.setPixmap(bossShadow[bossNum]);
            eventLabel.setText(bossName[bossNum] + "<br>has joined the battle!");

            name.setText(bossName[bossNum]);
            enemy.setPixmap(bossImage[bossNum]);

            hp = bossHP;
            hpMax = hp;
            hpBar.setMaximum(hpMax);

            spirits += 10 * level;
            spiritsCheck();
        }
        else if (killed == 10) {
            killed = 0;
            hpMod++;

            level++;
            levelLabel.setText("Level " + level);

            if (level % 10 == 0) {
                bossNext.setPixmap(bossShadow[bossNum]);
                bossNextLabel.setText("A powerful enemy<br>is approaching...");
            }

            hp = 5 * (level + hpMod);
            hpMax = hp;
            hpBar.setMaximum(hpMax);

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

        progressBar.setValue(killed);
        progressLabel.setText(killed + "/10");
    }
    else if (hp <= 0 && bossBattle) {
        bossBattle = false;

        killed = 0;
        progressBar.setValue(killed);
        progressLabel.setText(killed + "/10");

        killedTotal++;

        eventImage.setPixmap(bossEvent[bossNum]);
        eventLabel.setText(bossName[bossNum] + "<br>has been defeated!");

        bossNum++;
        bossHP = 100 * level * 1.5;

        level++;
        levelLabel.setText("Level " + level);

        hpMod++;
        hp = 5 * (level + hpMod);
        hpMax = hp;
        hpBar.setMaximum(hpMax);

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
                        bossNext.clear();
                        bossNextLabel.clear();
                        eventImage.setPixmap(bossShadow[bossNum]);
                        eventLabel.setText("GALLEOM TANK transformed<br>into GALLEOM!");
                        name.setText(bossName[bossNum]);
                        enemy.setPixmap(bossImage[bossNum]);

                        hp *= 1.5;

                        pause(false);
                    }
                    else
                        galleomTimer.start(250);
                }
                else if (bossNum == 8) {
                    pause(true);

                    eventImage.clear();
                    eventLabel.clear();

                    var tabuu;
                    // tabuu.setWindowFlag(Qt::FramelessWindowHint);
                    tabuu.setText("<p align='center'><img src='qrc://Images/Images/Bosses/Boss Shadows/tabuuWingsShadow.png'></p>",
                        "<p align='center'>You dare challenge the great TABUU?</p>");
                    var whatButton = tabuu.addButton("What?"/*, QMessageBox::YesRole*/);
                    var clicked = 0;
                    tabuu.exec();

                    while (clicked < 4) {
                        if (tabuu.clickedButton() == whatButton) {
                            switch (clicked) {
                                case 0:
                                    tabuu.setText("<p align='center'><img src='qrc://Images/Images/Bosses/Boss Shadows/tabuuWingsShadow.png'></p>",
                                        "<p align='center'>You have defeated the Subspace Army, fool!</p>");
                                    tabuu.exec();
                                    break;
                                case 1:
                                    tabuu.setText("<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuWingsEvent.png'></p>",
                                        "<p align='center'>Aren't you going to question me?</p>",
                                        "<p align='center'>The great TABUU?</p>");
                                    tabuu.exec();
                                    break;
                                case 2:
                                    tabuu.setText("<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuWingsEvent.png'></p>",
                                        "<p align='center'>Not like that fool!</p>",
                                        "<p align='center'>You don't even want to know what I'm going to do?</p>");
                                    tabuu.exec();
                                    break;
                                case 3:
                                    tabuu.setText("<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuEvent.png'></p>",
                                        "<p align='center'>Very well, have it your way!</p>",
                                        "<p align='center'>Die [insert name here]!</p>");
                                    tabuu.exec();
                                    break;
                            }

                            clicked++;
                        }
                    }

                    bossNum++;
                    eventImage.setPixmap(bossShadow[bossNum]);
                    eventLabel.setText(bossName[bossNum] + "<br> has joined the battle!");
                    name.setText(bossName[bossNum]);
                    enemy.setPixmap(bossImage[bossNum]);
                    pause(false);
                }
            }
            else if (bossNum == 10) {
                pause(true);

                eventImage.clear();
                eventLabel.clear();

                var tabuu;
                // tabuu.setWindowFlag(Qt::FramelessWindowHint);
                tabuu.setText("<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuEvent.png'></p>",
                    "<p align='center'>You have defeated the great TABUU?</p>");
                var whatButton = tabuu.addButton("What?"/*, QMessageBox::YesRole*/);
                var clicked = 0;
                tabuu.exec();

                while (clicked < 6) {
                    if (tabuu.clickedButton() == whatButton) {
                        switch (clicked) {
                            case 0:
                                tabuu.setText("<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuEvent.png'></p>",
                                    "<p align='center'>What a great warrior you are!</p>");
                                tabuu.exec();
                                break;
                            case 1:
                                tabuu.setText("<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuEvent.png'></p>",
                                    "<p align='center'>You could've been a great addition to the army.</p>");
                                tabuu.exec();
                                break;
                            case 2:
                                tabuu.setText("<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuEvent.png'></p>",
                                    "<p align='center'>You do not know what lies ahead of you, kid.</p>");
                                tabuu.exec();
                                break;
                            case 3:
                                tabuu.setText("<p align='center'><img src='qrc://Images/Images/Bosses/Boss Events/tabuuWingsEvent.png'></p>",
                                    "<p align='center'>If you think this was tough, get ready!</p>",
                                    "<p align='center'>Farewell, kid!</p>");
                                tabuu.exec();
                                break;
                            case 4:
                                tabuu.setText("<p align='center'>You have completed the alpha!</p>",
                                    "<p align='center'>There is more to come, so stick around for updates!</p>");
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
            miiSpiritsUpgrade[0].show();
            attackUpgrade.show();

            break;
        case 21:
            miiSpiritsUpgrade[1].show();
            attackUpgrade.show();

            break;
        case 31:
            miiSpiritsUpgrade[2].show();

            break;
    }

    document.querySelector("#hp").innerHTML = hp;
    document.querySelector("#hpBar").value = hp;
}

function spiritsCheck() {
    for (let i = 0; i < 3; i++) {
        if (spirits >= miiValue[i] && !mii[i].style.display === "none") {
            show(mii[i]);
            setEnabled(mii[i]);
        }
        else if (spirits >= miiValue[i])
            setEnabled(mii[i]);
        else
            setDisabled(mii[i]);

        if (spirits >= miiUpgradePrice[0][i]) {
            setEnabled(miiDmgUpgrade[i]);
        }
        else {
            // panelButton[2].setStyleSheet("background-color: #E6E6E6;");
            setDisabled(miiDmgUpgrade[i]);
        }

        if (spirits >= miiUpgradePrice[1][i]) {
            setEnabled(miiSpiritsUpgrade[i]);
        }
        else {
            // panelButton[2].setStyleSheet("background-color: #E6E6E6;");
            setDisabled(miiSpiritsUpgrade[i]);
        }
    }

    if (spirits >= miiBoostPrice) {
        setEnabled(miiBoostUpgrade);
    }
    else {
        // panelButton[2].setStyleSheet("background-color: #E6E6E6;");
        setDisabled(miiBoostUpgrade);
    }

    if (!sUnlocked[1] && spirits >= attackUpgradePrice) {
        setEnabled(attackUpgrade);
    }
    else {
        // panelButton[2].setStyleSheet("background-color: #E6E6E6;");
        setDisabled(attackUpgrade);
    }

    document.querySelector("#spirits").innerHTML = numberformat.formatShort(spirits);
}