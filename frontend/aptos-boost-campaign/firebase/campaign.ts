// services/firebase/campaigns.ts
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config"; // adjust path as per your structure

export interface CampaignData {
  id: string;
  name: string;
  description: string;
  userLimit: number;
  rewardAmount: number;
  rewardPerAction: number;
  tweetLink: string;
  category: string;
  createdAt: string;
  completedActions: number;
}

export const storeCampaignToFirebase = async (data: CampaignData) => {
  try {
    await addDoc(collection(db, "campaigns"), data);
    console.log("✅ Campaign stored:", data);
  } catch (error) {
    console.error("❌ Error adding campaign: ", error);
  }
};

export const listenToCampaigns = (callback: (data: CampaignData[]) => void) => {
  return onSnapshot(collection(db, "campaigns"), (snapshot) => {
    const campaigns = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as CampaignData)
    );
    callback(campaigns);
  });
};


