
Messages = new Mongo.Collection("messages");


if (Meteor.isServer) {
    Meteor.methods({
        allusers : function(){
            return Meteor.users.find({}, {fields: {emails: 1, profile: 1, username: 1}}).fetch();
        },
        
        sendmessage : function(_from, _to, text, _fromUserName, _fromName){
            
            Messages.insert({
                    message: text,
                    from: _from,
                    username : _fromUserName,
                    name : _fromName,
                    to: _to,
                    createdAt: new Date() ,
                    messageID: Random.id([26])
                    
      });
            
            return "sent";
        }
    });
    
    Meteor.publish("message", function (_to) {
        console.log(_to+" is subscribing");
        
        
  return Messages.find({ $or : [{to:_to},{from:_to}]});
});
}
