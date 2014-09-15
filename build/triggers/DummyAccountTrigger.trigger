trigger DummyAccountTrigger on Account (before insert) {

    for(Account account: Trigger.new) { 
        account.Name = 'Dummy_' + account.Name; 
    }
    
}