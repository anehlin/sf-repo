global class MyHelloWorld implements Schedulable{

  global void execute(SchedulableContext ctx) {
        updateAccounts();
    }

   public static void updateAccounts() {

        List<Opportunity> opps = new List<Opportunity>(    // Valid Customers
            [SELECT AccountId
             FROM   Opportunity]);
        Set<Id> accsValidCustomers = new Set<Id>();
        for (Opportunity op : opps) {
            accsValidCustomers.add(op.AccountId);
        }

        List<Opportunity> opps4 = new List<Opportunity>(   // Find becoming Customers
            [SELECT AccountId
             FROM   Opportunity
             WHERE  Account.Type != 'Customer']);
        Set<Id> accsBecomingCustomers = new Set<Id>();
        for (Opportunity op : opps4) {
            accsBecomingCustomers.add(op.AccountId);
        }

        for (Id op : accsBecomingCustomers) {
            system.debug('ID = ' + op);
        }

    }
}