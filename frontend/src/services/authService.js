const authService = {
  isAdmin: () => {
    const userData = localStorage.getItem("userData");
    if (!userData) return false;

    const { user } = JSON.parse(userData);
    return user.permissao === 1;
  },

  isAuthenticated: () => {
    const userData = localStorage.getItem("userData");
    if (!userData) return false;

    const { user, expiresAt } = JSON.parse(userData);
    const currentTime = new Date().getTime();

    if (currentTime > expiresAt || user.status === 0) {
      localStorage.removeItem("userData");
      localStorage.removeItem("isLoggedIn");
      return false;
    }

    return localStorage.getItem("isLoggedIn") === "true";
  },

  getCurrentUser: () => {
    const userData = localStorage.getItem("userData");
    if (!userData) return null;

    const { user, expiresAt } = JSON.parse(userData);
    const currentTime = new Date().getTime();

    if (currentTime > expiresAt) {
      localStorage.removeItem("userData");
      localStorage.removeItem("isLoggedIn");
      return null;
    }

    return user;
  },

  logout: () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("isLoggedIn");
  },

  refreshSession: () => {
    const userData = localStorage.getItem("userData");
    if (!userData) return;

    const { user } = JSON.parse(userData);
    const expiresIn = 24 * 60 * 60 * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    const refreshedUserData = {
      user,
      expiresAt: expirationDate,
    };

    localStorage.setItem("userData", JSON.stringify(refreshedUserData));
  },

  isOwner: (resourceUserId) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return false;
    
    return currentUser.id === resourceUserId || authService.isAdmin();
  },
};

export default authService;
