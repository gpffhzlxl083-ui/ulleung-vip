export const SCHEDULE_IMAGE_BASE = "/Image/inclusion2";

export type ScheduleIcon =
  | "pin"
  | "boat"
  | "bus"
  | "food"
  | "tree"
  | "camera"
  | "bed"
  | "spa"
  | "staff";

export type ScheduleItem = {
  id: string;
  icon: ScheduleIcon;
  title: string;
  category?: string;
  time?: string;
  description: string;
  highlight?: string;
  images: string[];
  actionLabel?: string;
};

export type ScheduleDay = {
  day: number;
  label: string;
  listTitle: string;
  headerTabs: [string, string];
  items: ScheduleItem[];
};

export const SCHEDULE_DAYS: ScheduleDay[] = [
  {
    day: 1,
    label: "1일차",
    listTitle: "1일차 일정표",
    headerTabs: ["일정", "지도"],
    items: [
      {
        id: "d1-meeting",
        icon: "pin",
        title: "만남의 광장",
        category: "집합",
        time: "08:00",
        description: "포항 여객터미널 2층 만남의 광장에서 인솔자와 만나 출발 준비를 합니다.",
        highlight: "08:00 집합",
        images: [`${SCHEDULE_IMAGE_BASE}/ulleung-sketch-sign.webp`],
        actionLabel: "만남의 광장 위치 확인",
      },
      {
        id: "d1-ferry",
        icon: "boat",
        title: "울릉도 크루즈",
        category: "교통",
        time: "09:30 ~ 13:00",
        description: "대저해운 썬라이즈호로 울릉도까지 이동합니다. 선상에서 바다 전망을 즐겨보세요.",
        images: [`${SCHEDULE_IMAGE_BASE}/ulleung-ferry.webp`],
      },
      {
        id: "d1-bus",
        icon: "bus",
        title: "VIP 관광버스",
        category: "이동",
        description: "울릉스케치 전용 VIP 관광버스로 편안하게 일정을 시작합니다.",
        images: [`${SCHEDULE_IMAGE_BASE}/vip-van.webp`],
      },
      {
        id: "d1-lunch",
        icon: "food",
        title: "울릉도식 물회",
        category: "점심",
        time: "13:30 ~ 14:30",
        description: "신선한 전복과 해산물이 가득한 울릉도 대표 물회로 점심 식사.",
        images: [`${SCHEDULE_IMAGE_BASE}/mulhoe.webp`],
      },
      {
        id: "d1-bridge",
        icon: "tree",
        title: "관음도 & 출렁다리",
        category: "관광",
        description: "관음도 출렁다리와 울릉도 숲길을 따라 걸으며 자연을 만끽합니다.",
        images: [
          `${SCHEDULE_IMAGE_BASE}/ulleung-suspension-bridge.webp`,
          `${SCHEDULE_IMAGE_BASE}/forest-trail.webp`,
        ],
      },
      {
        id: "d1-dinner",
        icon: "food",
        title: "오삼불고기",
        category: "저녁",
        time: "18:30 ~ 19:30",
        description: "울릉도산 오징어와 돼지고기로 만든 매콤한 오삼불고기 저녁 식사.",
        images: [`${SCHEDULE_IMAGE_BASE}/stir-fry.webp`],
      },
      {
        id: "d1-spa",
        icon: "spa",
        title: "올레 SPA 족욕",
        category: "체험",
        description: "하루 일정을 마무리하며 올레 SPA에서 편안한 족욕 체험을 즐깁니다.",
        images: [`${SCHEDULE_IMAGE_BASE}/foot-spa.webp`],
      },
      {
        id: "d1-hotel",
        icon: "bed",
        title: "오션뷰 숙소",
        category: "숙박",
        description: "전 객실 바다 전망 프리미엄 객실에서 편안한 밤을 보냅니다.",
        images: [`${SCHEDULE_IMAGE_BASE}/premium-room-twin.webp`],
      },
    ],
  },
  {
    day: 2,
    label: "2일차",
    listTitle: "2일차 일정표",
    headerTabs: ["1일차", "2일차"],
    items: [
      {
        id: "d2-breakfast",
        icon: "food",
        title: "조식 & 출발",
        category: "아침",
        time: "07:30 ~ 08:30",
        description: "숙소에서 조식 후 2일차 일정을 시작합니다.",
        images: [`${SCHEDULE_IMAGE_BASE}/premium-room-twin.webp`],
      },
      {
        id: "d2-trail",
        icon: "tree",
        title: "태하모노레일 & 숲길",
        category: "관광",
        description: "울릉도 10대 비경 태하모노레일과 울창한 삼나무 숲길을 따라 걸어갑니다.",
        images: [`${SCHEDULE_IMAGE_BASE}/forest-trail.webp`],
      },
      {
        id: "d2-lunch",
        icon: "food",
        title: "울릉도식 매운탕",
        category: "점심",
        time: "12:00 ~ 13:00",
        description: "대구와 각종 해산물이 어우러진 시원하고 얼큰한 울릉도식 매운탕.",
        images: [`${SCHEDULE_IMAGE_BASE}/fish-soup.webp`],
      },
      {
        id: "d2-staff",
        icon: "staff",
        title: "전문 해설 & 독도",
        category: "문화",
        description: "울릉도 전문 인솔자의 깊이 있는 해설과 함께 독도의 역사를 만납니다.",
        images: [`${SCHEDULE_IMAGE_BASE}/ulleung-staff.webp`],
      },
      {
        id: "d2-coast",
        icon: "camera",
        title: "해안 절벽 전망",
        category: "관광",
        description: "울릉도 대표 해안 절벽에서 펼쳐지는 에메랄드빛 바다를 감상합니다.",
        images: [`${SCHEDULE_IMAGE_BASE}/coast-cliff-view.webp`],
      },
      {
        id: "d2-dinner",
        icon: "food",
        title: "산채정식",
        category: "저녁",
        time: "18:00 ~ 19:00",
        description: "나리분지에서 즐기는 울릉도 산나물과 토속음식 정찬.",
        images: [`${SCHEDULE_IMAGE_BASE}/stir-fry.webp`, `${SCHEDULE_IMAGE_BASE}/mulhoe.webp`],
      },
    ],
  },
  {
    day: 3,
    label: "3일차",
    listTitle: "3일차 일정표",
    headerTabs: ["내 일정", "참여 일정"],
    items: [
      {
        id: "d3-breakfast",
        icon: "food",
        title: "조식",
        category: "아침",
        time: "07:30 ~ 08:30",
        description: "마지막 날 아침, 숙소에서 여유로운 조식을 즐깁니다.",
        images: [`${SCHEDULE_IMAGE_BASE}/fish-soup.webp`],
      },
      {
        id: "d3-bus",
        icon: "bus",
        title: "울릉도 구석구석 투어",
        category: "이동",
        description: "VIP 관광버스로 울릉도 주요 명소를 둘러봅니다.",
        images: [`${SCHEDULE_IMAGE_BASE}/vip-van.webp`],
      },
      {
        id: "d3-cruise",
        icon: "boat",
        title: "유람선 & 죽도 투어",
        category: "관광",
        description: "유람선을 타고 죽도와 울릉도 해안을 가까이에서 감상합니다.",
        images: [
          `${SCHEDULE_IMAGE_BASE}/ulleung-ferry.webp`,
          `${SCHEDULE_IMAGE_BASE}/coast-cliff-view.webp`,
        ],
      },
      {
        id: "d3-lunch",
        icon: "food",
        title: "전복 영양 돌솥밥",
        category: "점심",
        time: "12:30 ~ 13:30",
        description: "울릉도 해녀가 직접 채취한 전복으로 만든 영양 돌솥밥.",
        images: [`${SCHEDULE_IMAGE_BASE}/mulhoe.webp`],
      },
      {
        id: "d3-spa",
        icon: "spa",
        title: "올레 SPA & TEA",
        category: "체험",
        description: "족욕과 허브티, 다과로 여행의 마지막 휴식을 즐깁니다.",
        images: [`${SCHEDULE_IMAGE_BASE}/foot-spa.webp`],
      },
      {
        id: "d3-return",
        icon: "boat",
        title: "울릉도 → 포항",
        category: "귀항",
        time: "15:00 ~",
        description: "썬라이즈호를 타고 포항으로 귀항합니다. 소중한 추억과 함께.",
        images: [`${SCHEDULE_IMAGE_BASE}/ulleung-ferry.webp`],
        actionLabel: "선박 시간표 확인",
      },
    ],
  },
];

export function getScheduleDay(day: number): ScheduleDay | undefined {
  return SCHEDULE_DAYS.find((entry) => entry.day === day);
}
