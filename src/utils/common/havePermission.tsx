const havePermission = (userPermissions: string[] | null | undefined, permissions: string[]): boolean => {
    if (!userPermissions) {
        return false;
    }

    let isAllow = false;
    userPermissions.forEach(userPermission => {
        if (permissions.includes(userPermission)) {
            isAllow = true;
        }
    });

    return isAllow;
};

export default havePermission;