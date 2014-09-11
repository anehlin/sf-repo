public class TestFactory {

    // Returns a list of valid mock Users
    public static List<User> buildTestUsers(Integer count, String profilename) {
        List<User> users = new List<User>();
        for(Integer i = 0; i < count; i++) {
            User newuser = new User();
            newuser.Lastname = profilename + String.valueOf(i);
            newuser.Alias = 'user_' + String.valueOf(i);
            newuser.Email = 'nisse' + String.valueOf(i) + '@carlsson.com';
            newuser.Username = 'test' + String.valueOf(i) + '@carlsson.com';
            newuser.CommunityNickname = 'test' + String.valueOf(i) + '@carlsson.com';
            newuser.ProfileId = [SELECT id FROM Profile WHERE name= :profilename].id;
            newuser.isActive = true;
            users.add(newuser);
        }
        return users;
    }
 }