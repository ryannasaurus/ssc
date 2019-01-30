var attacked = false, bossBattle = false, sUnlocked =  [ false, false ];

var bossHP = 1000, hp = 10, hpMax = 10, gold = 0;
var dpsTotal = 0;
var gpsTotal = 0;
var miiValue = [ 25, 150, 500 ];
var miiDmg = [ 1, 2.5, 5 ];
var miiGold = [ 1, 2.5, 5 ];
var miiUpgradePrice = [
    [ 125, 750, 2500 ],
    [ 375, 2250, 12500 ]
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
var hpMod = 1, goldMod = 1, level = 1, killed = 0, killedTotal = 0;

var menuName = [ "FIGHTERS", "HEROES", "UPGRADES", "SETTINGS" ];
var bossName = [
    [ "PETEY PIRANHA" ],
    [ "RAYQUAZA" ],
    [ "PORKY" ],
    [ "GALLEOM TANK" ],
    [ "GALLEOM" ],
    [ "RIDLEY" ],
    [ "DUON" ],
    [ "META RIDLEY" ],
    [ "" ],
    [ "TABUU" ]
];
var enemyName = [
    [ "PRIMID" ],
    [ "SCOPE PRIMID" ],
    [ "SWORD PRIMID" ],
    [ "BOOM PRIMID" ],
    [ "METAL PRIMID" ],
    [ "FIRE PRIMID" ],
    [ "BIG PRIMID" ]
];
var miiName = [ "MII BRAWLER", "MII FIGHTER", "MII GUNNER" ];
var miiDmgName = [ "BEEFIER\nBRAWLERS\n", "SHARPER\nSWORDS\n", "GIRTHIER\nGUNS\n" ];
var miiGoldName = [ "BULKIER\nBULLDOZING\n", "DEADLIER\nDRILLING\n", "PRICKIER\nPENETRATION\n" ];
