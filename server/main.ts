import {Bids, Asks} from 'collections/orderbook';
var wsuri = "wss://api.poloniex.com";
var rxwamp = new Meteor.npmRequire("rx.wamp")()
Bids.remove({})
Asks.remove({})
console.log("create connection")
var connection = null
var res = Async.runSync(function(done){
    connection = rxwamp.Rx.Observable.fromConnection({url: wsuri, realm: "realm1"}).subscribe(function(sess){
        console.log("new session")
        done(null, sess)
    })
})
var session = res.result

var topic = rxwamp.Rx.Observable.subscribeAsObservable(session, "BTC_ETH")
topic.subscribe(Meteor.bindEnvironment(function(message){
    for(var i in message.args){
        var type = message.args[i].type
        var data = message.args[i].data
        var model = data.type == "bid" ? Bids : Asks
        console.log(type)
        console.log(data)
        
        if(type == "orderBookModify"){
            model.upsert({'rate': data.rate}, {'rate': data.rate, 'amount': data.amount})
        }
        if(type == "orderBookRemove"){
            model.remove({'rate': data.rate});
        }
    }
}));



//connection.dispose()