({
	handleInit : function(component, event, helper) {
		var action = component.get('c.getAccountsAndContactData');
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //console.log("From server: " + response.getReturnValue());
                var returnedMap = response.getReturnValue();                  
                var mapArray = new Array();
                for(var i in returnedMap){
                    mapArray.push({
                        key: i,
                        value: returnedMap[i]
                    });                    
                }
                console.log('mapArray >>>' + JSON.stringify(mapArray));
                component.set("v.mapList", mapArray);
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
	}
})