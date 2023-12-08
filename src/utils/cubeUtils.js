exports.isOwner = (user, cube) => {
    if (user) {
        return cube.owner == user._id;
    }
    return;
}