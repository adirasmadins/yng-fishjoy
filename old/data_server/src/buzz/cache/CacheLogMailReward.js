////////////////////////////////////////
// CacheLogMailReward
// 玩家领取邮件日志
//--------------------------------------
// 如何使用
// var CacheLogMailReward = require('src/buzz/cache/CacheLogMailReward');
// CacheLogMailReward.func();
////////////////////////////////////////

//==============================================================================
// import
//==============================================================================
var _ = require('underscore');
var ObjUtil = require('../ObjUtil');

//------------------------------------------------------------------------------
// DAO
//------------------------------------------------------------------------------
var dao_feedback = require('../../dao/dao_feedback');


//==============================================================================
// constant
//==============================================================================
var ERROR = 1;
var DEBUG = 0;
var TAG = "【CacheLogMailReward】";


//==============================================================================
// global variable
//==============================================================================
// 使用说明: 定时存储记录, 存储时用队列方式
// 记录下当前长度len, 从队列中移除len个数据存入数据库, 等待下个周期
// 每一条记录格式如下
/**
MailReward = 
{
    uid: bigint,
    mid: bigint,
    reward: text,
    log_at: timestamp,
}
 */
var gMailRewardLogCache = [];


//==============================================================================
// public
//==============================================================================

//------------------------------------------------------------------------------
// definition
//------------------------------------------------------------------------------
exports.push = push;
exports.cache = cache;
exports.length = length;


//------------------------------------------------------------------------------
// implement
//------------------------------------------------------------------------------

/**
 * 检测gMailRewardLogCache长度, 超过11000条数据时将前面的10000条写入数据库中
 */
function push(data) {
    gMailRewardLogCache.push(data);
}

/**
 * 将gMailRewardLogCache全部写入数据库中
 */
function cache() {
    return gMailRewardLogCache;
}

/**
 * 将gMailRewardLogCache全部写入数据库中
 */
function length() {
    return gMailRewardLogCache.length;
}
