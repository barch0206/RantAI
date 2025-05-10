import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getUserTokensCount = async (uid) => {
  // Validate input
  if (!uid || typeof uid !== 'string') {
    console.error('Invalid UID provided');
    return 0;
  }

  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    
    if (!userDoc.exists()) {
      console.warn(`User ${uid} not found in database`);
      return 0;
    }

    const data = userDoc.data();
    
    //  Token expiry logic
    const isTokensExpired = data.lastReset && 
      (Date.now() - data.lastReset.toDate() > 2592000000); // 30 days
    
    return isTokensExpired ? 0 : (data.tokensCount ?? 0);
    
  } catch (error) {
    console.error(`Error fetching tokens for ${uid}:`, error);
    return 0;
  }
};