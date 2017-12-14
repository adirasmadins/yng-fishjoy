const Entity = require('../../../base/entity');
const matchingCmd = require('../../../../cmd/matchingCmd');
const event = require('../../../base/event');
const pomelo = require('pomelo');
const Code = require('../fishCode');
const consts = require('../consts');
const RankMatching = require('./rankMatching');
class MatchingEntry extends Entity {
    constructor() {
        super({})
        this._rankMatching = new RankMatching();

        let req = matchingCmd.request;
        for (let k of Object.keys(req)) {
            event.on(req[k].route, this.onMessage.bind(this));
        }
    }

    start(){
        this._rankMatching.start();
    }

    stop(){
        this._rankMatching.stop();
    }

    _getMatchType(session, msg) {
        let matchType = msg.data.matchType;
        if (!matchType) {
            matchType = session.get('matchType');
        } else {
            session.set('matchType');
            session.pushAll();
        }
        return matchType;
    }

    onMessage(msg, session, cb, route) {
        msg.data.uid = session.uid;
        msg.data.sid = session.frontendId
        const matchType = this._getMatchType(session, msg);
        switch (matchType) {
            case consts.MATCH_TYPE.RANK:
                this._rankMatching[route](msg.data, function (err, result) {
                    if (!!err) {
                        utils.invokeCallback(cb, null, answer.respNoData(err));
                        return;
                    }
                    if (result) {
                        utils.invokeCallback(cb, null, answer.respData(result, msg.enc));
                    } else {
                        utils.invokeCallback(cb, null, answer.respNoData(CONSTS.SYS_CODE.OK));
                    }
                });
                break;
            case consts.MATCH_TYPE.OTHER:
                break;
            default:
                break;
        }
    }
}

module.exports = MatchingEntry;