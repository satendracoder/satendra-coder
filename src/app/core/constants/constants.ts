// import { environment } from "../../../environments/environment.development";

//const API_URL = 'http://satendracoder.eu-north-1.elasticbeanstalk.com';
const API_URL = 'http://localhost:8080/api/v1';
//const API_URL = environment.API_URL;

export const APIEndPoint = {
  Auth: {
    Login: `${API_URL}/auth/login`,
    Register: `${API_URL}/auth/register`,
    getAllUser: `${API_URL}/auth/all-users`,
    OAuth: `${API_URL}/auth/oauth-user`,
    forgotPassword: `${API_URL}/auth/forgot-password`,
    resetPassword: `${API_URL}/auth/reset-password`,
    changePassword: `${API_URL}/auth/change-password`,
    logout: `${API_URL}/auth/logout`,
    updateName: `${API_URL}/auth/update-name`,
    updatePhone: `${API_URL}/auth/update-phone`,
    updateDesignation: `${API_URL}/auth/update-designation`,
    updateAvatar: `${API_URL}/auth/update-avatar`,
    updateRole: `${API_URL}/auth/update-role`,
  },
  global: {
    AskMe: `${API_URL}/global/ask-me-anything`,
    BecomeMember: `${API_URL}/global/become-a-member`,
  },
};
