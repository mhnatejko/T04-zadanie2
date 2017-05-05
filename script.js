class EventEmitter{
    constructor() {
        this.events = {};
    };
    on (type, fn) {
        if(!type || !fn) return;
        this.events[type] = this.events[type] || [];
        this.events[type].push(fn);
    };
    emit (type, data) {
        let fns = this.events[type];
        if(!fns || !fns.length) return;
        for(var i = 0; i < fns.length; i++) {
            fns[i](data);
        };
    } 
}


//function EventEmitter() {
//    this.events = {};
//}
//EventEmitter.prototype.on = function(type, fn) {
//    if(!type || !fn) return;
//    this.events[type] = this.events[type] || [];
//    this.events[type].push(fn);
//}
//EventEmitter.prototype.emit = function(type, data) {
//    let fns = this.events[type];
//    if(!fns || !fns.length) return;
//    for(var i = 0; i < fns.length; i++) {
//        fns[i](data);
//    }
//    
//    
// };

/**************************************************/
//Database.prototype = Object.create(EventEmitter.prototype);
//Database.prototype.constructor = Database;


class Database extends EventEmitter {
    constructor(url) {
        super()
        this.url = url;
        
    };
    connect () {
        this.emit("connect", this.url);
    };
    disconnect () {
        this.emit("disconnect", this.url);
    };
}

//function Database(url) {
//    this.url = url;
//    EventEmitter.call(this)
//}



//Database.prototype.connect = function() {
//    this.emit("connect", this.url);
//}
//Database.prototype.disconnect = function() {
//    this.emit("disconnect", this.url);
//    
//}

/**************************************************/

const ev = new EventEmitter();
ev.on("hello", (message) => {
    console.log(`Witaj ${message} !`);
});
ev.on("hello", (message) => {
    console.log(`Siema ${message} .`);
});
ev.on("goodbye", () => {
    console.log("Do widzenia!");
});

ev.emit("hello", "Marek");
ev.emit("goodbye");

/**************************************************/
let db = new Database("db://localhost:3000");
db.on("connect", (url) => {
    console.log(`Połączenie z bazą pod adresem ${url} zostało ustanowione.`);
});
db.on("disconnect", (url) => {
    console.log(`Połączenie z bazą pod adresem ${url} zostało zakończone.`);
});

db.connect();
setTimeout(function() {
    db.disconnect();
}, 5000);