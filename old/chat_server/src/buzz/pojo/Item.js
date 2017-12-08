﻿////////////////////////////////////////
// Item
// 物品对象
//--------------------------------------
// 如何使用
// var Item = require('src/buzz/pojo/Item').Item;
// var item = new Item(id);
// item.func(obj, params...);
////////////////////////////////////////

//==============================================================================
// import
//==============================================================================

//------------------------------------------------------------------------------
// POJO对象
//------------------------------------------------------------------------------
var Item = require('./Item').Item;

//------------------------------------------------------------------------------
// utils
//------------------------------------------------------------------------------
//var StringUtil = require('../utils/StringUtil');

//------------------------------------------------------------------------------
// configs
//------------------------------------------------------------------------------
var item_item_cfg = require('../../../cfgs/item_item_cfg');


//==============================================================================
// constant
//==============================================================================
var ERROR = 1;
var DEBUG = 0;

//------------------------------------------------------------------------------
// Item Type
//------------------------------------------------------------------------------
var ItemType = {
    GOLD:   1,
    PEARL:  2,
    SKILL:  3,
    DEBRIS: 4,
    SPECIAL: 5,
    GIFT:   7,
    MIX:    8,
    TOKENS: 9,
    CHANGE_FARE: 10,
    CHANGE_PHONE: 11,
};
exports.ItemType = ItemType;

var ItemTypeC = {
    GOLD: "1",
    PEARL: "2",
    SKILL: "3",
    DEBRIS: "4",
    /** 特殊: 活跃值, 成就点 */
    SPECIAL: "5",
    MINIGAME: "6",
    GIFT: "7",
    MIX: "8",
    TOKENS: "9",
    CHANGE_FARE: "10",
    CHANGE_PHONE: "11",
};
exports.ItemTypeC = ItemTypeC;


//==============================================================================
// public
//==============================================================================

//------------------------------------------------------------------------------
// definition
//------------------------------------------------------------------------------
exports.Item = Item;// 物品对象

//------------------------------------------------------------------------------
// implement
//------------------------------------------------------------------------------
//----------------------------------------------------------
// Item
//----------------------------------------------------------
/**
 * id 物品ID.
 */
function Item(id) {
    // ---- 储存原始物品ID
    this.id = id;
    
    // ---- 储存解析后的奖励
    this.type = 0;    // 物品ID, 具体含义参考ItemType
    
    // ---- 解析物品
    for (var i in item_item_cfg) {
        var item = item_item_cfg[i];
        if (item.id == this.id) {
            this.type = item.type;
            break;
        }
    }
}