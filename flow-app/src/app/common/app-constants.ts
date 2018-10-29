export class AppConstants {
  public static STICKY_SERVER_BASE_URL: String = 'http://localhost:3000';

  public static LOGIN_URL: String = AppConstants.STICKY_SERVER_BASE_URL + '/login';

  public static USERS_URL: String = AppConstants.STICKY_SERVER_BASE_URL + '/users';

  public static MESSAGES_URL : String = AppConstants.STICKY_SERVER_BASE_URL + '/messages';

  public static GROUPS_URL : String = AppConstants.STICKY_SERVER_BASE_URL + '/groups';

  public static GROUPS_CHECK_URL : String = AppConstants.STICKY_SERVER_BASE_URL + '/groups/check';
}
