import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { updateDoc } from "firebase/firestore";


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

export const deductUserToken = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const currentTokens = userSnap.data().tokensCount || 0;
        if (currentTokens > 0) {
            await updateDoc(userRef, {
                tokensCount: currentTokens - 1
            });
        } else {
            throw new Error("No tokens left to deduct.");
        }
    } else {
        throw new Error("User not found.");
    }
};