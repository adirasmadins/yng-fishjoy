﻿////////////////////////////////////////////////////////////////////////////////
// Account Update Pirate
// 更新海盗任务(不同的场景单独记录, 海盗任务结束并领取奖励后重置)
// update
////////////////////////////////////////////////////////////////////////////////

//==============================================================================
// import
//==============================================================================
var StringUtil = require('../../../utils/StringUtil');
var ObjUtil = require('../../../buzz/ObjUtil');
var CstError = require('../../../buzz/cst/buzz_cst_error');

var AccountCommon = require('../common');
var CacheAccount = require('../../../buzz/cache/CacheAccount');


//==============================================================================
// const
//==============================================================================
const ERROR_CODE = CstError.ERROR_CODE;
const ERROR_OBJ = CstError.ERROR_OBJ;

var DEBUG = 0;
var ERROR = 1;


//==============================================================================
// public
//==============================================================================

//------------------------------------------------------------------------------
// definition
//------------------------------------------------------------------------------
exports.update = _update;

//------------------------------------------------------------------------------
// implement
//------------------------------------------------------------------------------

/**
 * 账户数据更新(每日任务完成度).
 */
function _update(pool, data, cb, my_account) {
    if (DEBUG) console.log("CALL pirate.update()");
    
    var uid = my_account['id'];
    var token = my_account['token'];
    var pirate = ObjUtil.data2String(data['pirate']);
    
    //--------------------------------------------------------------------------
    // 更新缓存中的数据(重要:数据库操作将会被删除)
    //--------------------------------------------------------------------------
    CacheAccount.setPirate(uid, pirate);
    //--------------------------------------------------------------------------

    cb(null, "success");
}


//==============================================================================
// private
//==============================================================================
