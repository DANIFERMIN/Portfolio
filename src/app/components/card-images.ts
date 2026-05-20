import omenImg from "../../imports/image.png";
import esignImg from "../../imports/image-1.png";
import createMobileImg from "../../imports/image-2.png";
import createDesktopImg from "../../imports/image-3.png";
import pcPilotImg from "../../imports/image-4.png";
import aiJourneyPlanImg from "../../imports/image-11.png";
import buddyPickerImg from "../../imports/image-12.png";
import buddyPickerHeroImg from "../../imports/image-14.png";

export const cardImages: Record<string, { src: string; objectPosition: string }> = {
  "omen-gaas": { src: omenImg, objectPosition: "50% 3%" },
  "next-gen-pc": { src: pcPilotImg, objectPosition: "50% 0%" },
  "create-pilot": { src: createDesktopImg, objectPosition: "50% 5%" },
  "esign-redesign": { src: esignImg, objectPosition: "50% 3%" },
  "ai-journey": { src: aiJourneyPlanImg, objectPosition: "50% 0%" },
  "buddy-picker": { src: buddyPickerHeroImg, objectPosition: "50% 0%" },
};

// Re-exports so other modules can share the same image references
export {
  omenImg,
  esignImg,
  createMobileImg,
  createDesktopImg,
  pcPilotImg,
  aiJourneyPlanImg,
  buddyPickerImg,
  buddyPickerHeroImg,
};
