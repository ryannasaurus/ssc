var eventLabel;
var panelButton;
var mii;
var miiIcon;

window.onload = function () {
    eventLabel = document.getElementById("eventLabel");

    panelButton = [
        [document.getElementById("fighterMenu")],
        [document.getElementById("upgradeMenu")],
        [document.getElementById("settingMenu")]
    ];

    mii = [
        [document.getElementById("brawler")],
        [document.getElementById("fighter")],
        [document.getElementById("gunner")]
    ];

    miiIcon = [
        [document.getElementById("brawler")],
        [document.getElementById("fighter")],
        [document.getElementById("gunner")]
    ];

    goldCheck();
}

var attacked = false, bossBattle = false, sUnlocked = [false, false];

var bossHP = 1000, hp = 10, hpMax = 10, spirits = 0;
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
var miiUpgradeBoost = [];
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
    ["PETEY PIRANHA"],
    ["RAYQUAZA"],
    ["PORKY"],
    ["GALLEOM TANK"],
    ["GALLEOM"],
    ["RIDLEY"],
    ["DUON"],
    ["META RIDLEY"],
    [""],
    ["TABUU"]
];
var enemyName = [
    ["PRIMID"],
    ["SCOPE PRIMID"],
    ["SWORD PRIMID"],
    ["BOOM PRIMID"],
    ["METAL PRIMID"],
    ["FIRE PRIMID"],
    ["BIG PRIMID"]
];
var miiName = ["MII BRAWLER", "MII FIGHTER", "MII GUNNER"];
var miiDmgName = ["BEEFIER\nBRAWLERS\n", "SHARPER\nSWORDS\n", "GIRTHIER\nGUNS\n"];
var miiSpiritsName = ["BULKIER\nBULLDOZING\n", "DEADLIER\nDRILLING\n", "PRICKIER\nPENETRATION\n"];

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

function attackClicked() {
    if (!attacked)
        eventLabel.innerHTML = "You attacked the enemy!";

    attacked = true;

    hp--;

    hpCheck();
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
            eventLabel.setText(bossName[bossNum] + "\nhas joined the battle!");

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
                bossNextLabel.setText("A powerful enemy\nis approaching...");
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
        eventLabel.setText(bossName[bossNum] + "\nhas been defeated!");

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
                        eventLabel.setText("GALLEOM TANK transformed\ninto GALLEOM!");
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
                    eventLabel.setText(bossName[bossNum] + "\n has joined the battle!");
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

    document.getElementById("hp").innerHTML = hp;
    document.getElementById("hpBar").value = hp;
}

function spiritsCheck() {
    for (i = 0; i < 3; i++) {
        if (spirits >= miiValue[i] && !mii[i].style.display === "none") {
            show(mii[i]);
            setEnabled(mii[i]);
        }
        else if (spirits >= miiValue[i])
            setEnabled(mii[i]);
        else
            setDisabled(mii[i]);

        if (spirits >= miiUpgradePrice[0][i]) {
            miiDmgUpgrade[i].setEnabled(true);
        }
        else {
            panelButton[2].setStyleSheet("background-color: #E6E6E6;");
            miiDmgUpgrade[i].setEnabled(false);
        }

        if (spirits >= miiUpgradePrice[1][i]) {
            miiSpiritsUpgrade[i].setEnabled(true);
        }
        else {
            panelButton[2].setStyleSheet("background-color: #E6E6E6;");
            miiSpiritsUpgrade[i].setEnabled(false);
        }
    }

    if (spirits >= miiBoostPrice) {
        setEnabled(document.getElementById(miiBoostUpgrade));
    }
    else {
        panelButton[2].setStyleSheet("background-color: #E6E6E6;");
        setDisabled(document.getElementById(miiBoostUpgrade));
    }

    if (!sUnlocked[1] && spirits >= attackUpgradePrice) {
        attackUpgrade.setEnabled(true);
    }
    else {
        panelButton[2].setStyleSheet("background-color: #E6E6E6;");
        attackUpgrade.setEnabled(false);
    }

    document.getElementById("spirits") = numberformat.formatShort(spirits);
}