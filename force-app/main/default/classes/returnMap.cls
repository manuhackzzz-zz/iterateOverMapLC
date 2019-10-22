public class returnMap {
    @AuraEnabled
    public static Map<String, List<String>> getAccountsAndContactData(){
        Map<String, List<String>> accConMap = new Map<String, List<String>>();
        Map<Id,Account> accMap = new Map<Id,Account>([SELECT Id,Name FROM Account]) ;
        List<Contact> conList = [SELECT Name,AccountId FROM Contact WHERE AccountID IN :accMap.keyset()];
        
        for(Contact c : conList){
            if(accConMap.containsKey(accMap.get(c.AccountId).Name)){                
                accConMap.get(accMap.get(c.AccountId).Name).add(c.Name);
            }else{
                accConMap.put(accMap.get(c.AccountId).Name, new List<String>());
            }            
        }
        system.debug('accConMap >>>' + accConMap);
        return accConMap;
    }
}