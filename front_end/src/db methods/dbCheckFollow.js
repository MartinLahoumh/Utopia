import { dbGetUserInfo } from "./dbGetUserInfo";

async function dbCheckFollow(uid, key, targetid) {

  try {
    const [result, error] = await dbGetUserInfo(uid, key);
    const following = result['following'];
    const isFollowing = following.includes(targetid);

    return [ isFollowing, error ];

  } catch (error) {
    console.error(error);
  }
}

export default dbCheckFollow;
