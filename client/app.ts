
import {Component, View, NgZone} from 'angular2/core';

import {bootstrap} from 'angular2-meteor';
import {Bids, Asks} from 'collections/orderbook';

@Component({

    selector: 'app'

})

@View({
    templateUrl: 'client/app.html'
})


class poloview {
    parties: Mongo.Cursor<Object>;
    constructor () {
        this.parties = Bids.find({}, {sort: {rate: -1}});
        

        
        
        // this.connection = new autobahn.Connection({
        //     url: 'ws://127.0.0.1:9000/',
        //     realm: 'realm1'
        // });
        // this.connection.onopen = function(session){
            
        //   // 1) subscribe to a topic
        //   function onevent(args) {
        //       console.log("Event:", args[0]);
        //   }
        //   session.subscribe('com.myapp.hello', onevent);
        
        //   // 2) publish an event
        //   session.publish('com.myapp.hello', ['Hello, world!']);
        
        //   // 3) register a procedure for remoting
        //   function add2(args) {
        //       return args[0] + args[1];
        //   }
        //   session.register('com.myapp.add2', add2);
        
        //   // 4) call a remote procedure
        //   session.call('com.myapp.add2', [2, 3]).then(
        //       function (res) {
        //          console.log("Result:", res);
        //       }
        //   );
        // }
        // this.connection.open()
    }
}
bootstrap(poloview);

