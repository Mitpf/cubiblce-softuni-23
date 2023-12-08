exports.isOwner = (user, cube) => {
    return cube.owner == user._id;
}