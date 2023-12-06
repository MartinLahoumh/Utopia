function dbCheckLike(info, targetid) {
  //console.log(info, targetid);
  return info.includes(targetid.toString());
}

export default dbCheckLike;
