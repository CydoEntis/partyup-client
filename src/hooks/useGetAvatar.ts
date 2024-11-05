import { useState, useEffect } from "react";
import Angel from "../assets/angel.png";
import Archer from "../assets/archer.png";
import Bear from "../assets/bear.png";
import DemonFemale from "../assets/demon_female.png";
import DemonMale from "../assets/demon_male.png";
import Fanatic from "../assets/fanatic.png";
import FemaleA from "../assets/female_a.png";
import FemaleB from "../assets/female_b.png";
import FemaleDevil from "../assets/devil_female.png";
import FemaleOrc from "../assets/orc_female.png";
import Fishman from "../assets/fishman.png";
import Frog from "../assets/frog.png";
import Ghoul from "../assets/ghoul.png";
import Goblin from "../assets/goblin.png";
import Gorilla from "../assets/gorilla.png";
import Knight from "../assets/knight.png";
import Lich from "../assets/lich.png";
import Mage from "../assets/mage.png";
import MaleA from "../assets/male_a.png";
import MaleB from "../assets/male_b.png";
import MaleDevil from "../assets/devil_male.png";
import MaleOrc from "../assets/orc_male.png";
import Medusa from "../assets/medusa.png";
import Merfolk from "../assets/merfolk.png";
import Mimic from "../assets/mimic.png";
import Mummy from "../assets/mummy.png";
import Occultist from "../assets/occultist.png";
import Pharoah from "../assets/pharoah.png";
import Priest from "../assets/priest.png";
import Prince from "../assets/prince.png";
import Rogue from "../assets/rogue.png";
import SkeletonA from "../assets/skeleton_a.png";
import SkeletonB from "../assets/skeleton_b.png";
import Slime from "../assets/slime.png";
import Snake from "../assets/snake.png";
import SpiderA from "../assets/spider_a.png";
import Squidman from "../assets/squid_man.png";
import WerewolfA from "../assets/werewolf_a.png";
import WerewolfB from "../assets/werewolf_b.png";
import WerewolfC from "../assets/werewolf_c.png";
import Witch from "../assets/witch.png";
import ZombieFemale from "../assets/zombie_female.png";
import ZombieMale from "../assets/zombie_male.png";

const avatarMap: { [key: number]: string } = {
	1: MaleA,
	2: MaleB,
	3: FemaleA,
	4: FemaleB,
	5: SkeletonA,
	6: SkeletonB,
	7: ZombieMale,
	8: ZombieFemale,
	9: Bear,
	10: Gorilla,
	11: Frog,
	12: Snake,
	13: Medusa,
	14: Knight,
	15: Priest,
	16: Mage,
	17: Archer,
	18: Rogue,
	19: Merfolk,
	20: Squidman,
	21: Fishman,
	22: Mummy,
	23: Pharoah,
	24: SpiderA,
	25: Fanatic,
	26: Prince,
	27: Occultist,
	28: Slime,
	29: Mimic,
	30: Ghoul,
	31: Goblin,
	32: WerewolfA,
	33: WerewolfB,
	34: WerewolfC,
	35: MaleOrc,
	36: FemaleOrc,
	37: Lich,
	38: Witch,
	39: Angel,
	40: MaleDevil,
	41: FemaleDevil,
	42: DemonMale,
	43: DemonFemale,
};

function useAvatar(avatarId: number) {
	const [avatarImage, setAvatarImage] = useState<string | null>(null);

	useEffect(() => {
		if (avatarId in avatarMap) {
			setAvatarImage(avatarMap[avatarId]);
		} else {
			console.warn(`Invalid avatar ID: ${avatarId}`);
		}
	}, [avatarId]);

	return avatarImage;
}

export default useAvatar;
