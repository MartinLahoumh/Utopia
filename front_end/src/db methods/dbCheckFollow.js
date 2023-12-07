function dbCheckFollow(info, targetid) {
  return info.includes(targetid.toString());
}

export default dbCheckFollow;
