﻿var express = require('express');
var router = express.Router();

var buzz_admin_utils = require('../../src/buzz/buzz_admin_utils');
var buzz_cst_admin = require('../../src/buzz/cst/buzz_cst_admin');
var buzz_cst_gm_active = require('../../src/buzz/cst/buzz_cst_gm_active');

var active_cdkey_cfg = require('../../cfgs/active_cdkey_cfg');

var _ = require('underscore');

function _makeVar() {
    var TXT_EN = buzz_cst_admin.TXT_SIDEBAR_EN;
    TXT_EN = _.extend(TXT_EN, buzz_cst_gm_active.TXT_CONTENT_EN);
    
    var TXT_CN = buzz_cst_admin.TXT_SIDEBAR_CN;
    TXT_CN = _.extend(TXT_CN, buzz_cst_gm_active.TXT_CONTENT_CN);
    
    var data = TXT_CN;
    
    data = _.extend(data, { title: 'Data', expanded_id: 'menu_game_mgmt' });
    //data = _.extend(data, { action_list : [{ id: 1, description: '111' }, { id: 2, description: '222' }] });
    data.action_list = active_cdkey_cfg;
    console.log("data: ", data);
    return data;
}

/* GET home page. */
router.get('/', function (req, res) {
    res.render("admin/pages-gm-active", _makeVar());
});

/* POST */
router.post('/', function (req, res) {
    buzz_admin_utils.checkTokenPost(req, function (err, user_auth) {
        if (err) {
            var errMsg = JSON.stringify(err);
            console.log(errMsg);
            res.json({ rc: 10000, error: errMsg });
        } else {
            var params = _makeVar(req);
            params = _.extend(params, { user_auth: user_auth });
            
            res.render("admin/pages-gm-active", params);
        }
    });
});

module.exports = router;