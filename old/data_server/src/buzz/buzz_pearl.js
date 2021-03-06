////////////////////////////////////////////////////////////
// 和钻石相关的业务操作
////////////////////////////////////////////////////////////

//==========================================================
// import
//==========================================================

//------------------------------------------------------------------------------
// 缓存(Cache)
//------------------------------------------------------------------------------
var CachePearl = require('./cache/CachePearl');


//==========================================================
// public
//==========================================================

//----------------------------------------------------------
// definition
//----------------------------------------------------------
exports.addPearlLog = addPearlLog;

//----------------------------------------------------------
// implement
//----------------------------------------------------------

/**
 * 添加一组钻石日志到缓存CachePearl中
 */
function addPearlLog(list) {
    for (var i = 0; i < list.length; i++) {
        var one_change = list[i];
        // 删除伪数据
        if (one_change.gain > 0 || one_change.cost > 0) {
            CachePearl.push({
                account_id: one_change.account_id,
                log_at: one_change.log_at,
                gain: one_change.gain,
                cost: one_change.cost,
                total: one_change.total,
                scene: one_change.scene,
                nickname: one_change.nickname,
            });
        }
    }
}