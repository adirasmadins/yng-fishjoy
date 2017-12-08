const RedisUtil = require('../utils/RedisUtil');
const utils = require('../utils/utils');
const active_cfg = require('../../cfgs/active_active_cfg');
const schedule = require('node-schedule');
var CacheAccount = require('./cache/CacheAccount');


let field_def = [
    'active',
    // 'active_daily_reset',
    // 'active_stat_once',
    // 'active_stat_reset'
    'active:daily',
    'active:stat:once',
    'active:stat:reset'
];

const activeReset_sql = 'UPDATE tbl_account SET active = \'{}\', active_daily_reset = \'{}\', active_stat_once = \'{}\',active_stat_reset = \'{}\'';

exports.resetDB = resetDB;

function resetDB(myPool) {
    myPool.query(activeReset_sql, function (err, result) {
        if(err){
            console.error('mysql 活动数据重置失败:', err);
        }else {
            console.log('mysql 活动数据重置成功');
        }
    });

    let cmds = [];

    field_def.forEach(function (item) {
        cmds.push(['hkeys', `pair:uid:${item}`])
        // cmds.push(['hvals', `pair:uid:${item}`])
        // cmds.push(['hset', `pair:uid:${item}`, item, 1000])
    });

    RedisUtil.multi(cmds, function (err, results) {
        if (!!err) {
            console.error('redis 获取活动数据异常:', err);
            return;
        }

        for (let i = 0; i< results.length; ++i){
            let subCmds = [];
            let items = results[i];

            items.forEach(function (item) {
                subCmds.push(['hset', `pair:uid:${field_def[i]}`, item, '{}']);
            });

            if(subCmds.length > 0){
                RedisUtil.multi(subCmds, function (err, results) {
                    if (!!err) {
                        console.error('redis 重置活动数据异常:', err);
                        return;
                    }
                    console.log('redis 重置活动数据成功');
                });
            }
        }

    });

    CacheAccount.resetActive(function() {
        console.log('缓存 重置活动数据成功');
    });

}


function runActiveReset(myPool) {
    active_cfg.forEach(function (item) {

        let eTime = new Date(item.endtime.replace('&', ' '));
        let time_str = `${eTime.getSeconds()} ${eTime.getMinutes()} ${eTime.getHours()} ${eTime.getDate()} ${eTime.getMonth()+1} ${eTime.getDay()}`;
        console.log('启动活动结束重置数据模块', time_str);

        schedule.scheduleJob(time_str, function(){
            console.log('执行活动结束重置数据业务');
            resetDB(myPool);
        });

    });
}

module.exports.runActiveReset = runActiveReset;