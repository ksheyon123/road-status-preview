const sections = [
  {
    name: "한남IC",
    distance: "7.4",
    leftVDS: [
      { status: "원활", percentage: 40, time: "10" },
      { status: "서행", percentage: 35, time: "8" },
      { status: "정체", percentage: 25, time: "5" },
    ],
    rightVDS: [
      { status: "원활", percentage: 60, time: "15" },
      { status: "정체", percentage: 40, time: "10" },
    ],
  },
  {
    name: "양재IC",
    distance: "12.4",
    leftVDS: [{ status: "원활", percentage: 100, time: "8" }],
    rightVDS: [
      { status: "서행", percentage: 60, time: "10" },
      { status: "정체", percentage: 40, time: "17" },
      { status: "원활", percentage: 40, time: "5" },
    ],
  },
  {
    name: "서울톨게이트",
    distance: "16.6",
    leftVDS: [{ status: "원활", percentage: 100, time: "12" }],
    rightVDS: [
      { status: "원활", percentage: 70, time: "3" },
      { status: "서행", percentage: 15, time: "6" },
      { status: "정체", percentage: 15, time: "8" },
    ],
  },
  {
    name: "기흥동탄IC",
    distance: "23.1",
    leftVDS: [{ status: "원활", percentage: 100, time: "17" }],
    rightVDS: [{ status: "원활", percentage: 100, time: "15" }],
  },
  {
    name: "안성JC",
    distance: "29.2",
    leftVDS: [
      { status: "원활", percentage: 50, time: "6" },
      { status: "서행", percentage: 50, time: "14" },
    ],
    rightVDS: [{ status: "원활", percentage: 100, time: "19" }],
  },
  {
    name: "천안JC",
    distance: "34.5",
    leftVDS: [{ status: "원활", percentage: 100, time: "22" }],
    rightVDS: [{ status: "원활", percentage: 100, time: "22" }],
  },
  {
    name: "남이JC",
    distance: "21.5",
    leftVDS: [{ status: "원활", percentage: 100, time: "14" }],
    rightVDS: [{ status: "원활", percentage: 100, time: "14" }],
  },
  {
    name: "회덕JC",
    distance: "9.7",
    leftVDS: [{ status: "원활", percentage: 100, time: "7" }],
    rightVDS: [{ status: "원활", percentage: 100, time: "6" }],
  },
  {
    name: "비룡JC",
    distance: "36.4",
    leftVDS: [{ status: "원활", percentage: 100, time: "22" }],
    rightVDS: [{ status: "원활", percentage: 100, time: "23" }],
  },
  {
    name: "영동IC",
    distance: "48.5",
    leftVDS: [{ status: "원활", percentage: 100, time: "28" }],
    rightVDS: [{ status: "원활", percentage: 100, time: "30" }],
  },
  {
    name: "김천JC",
    distance: "40.7",
    leftVDS: [{ status: "원활", percentage: 100, time: "25" }],
    rightVDS: [{ status: "원활", percentage: 100, time: "25" }],
  },
  {
    name: "오산교",
    distance: "19.9",
    leftVDS: [{ status: "원활", percentage: 100, time: "13" }],
    rightVDS: [{ status: "원활", percentage: 100, time: "13" }],
  },
  {
    name: "동대구JC",
    distance: "26.4",
    leftVDS: [{ status: "원활", percentage: 100, time: "15" }],
    rightVDS: [{ status: "원활", percentage: 100, time: "16" }],
  },
  {
    name: "영천IC",
    distance: "28.0",
    leftVDS: [{ status: "원활", percentage: 100, time: "16" }],
    rightVDS: [{ status: "원활", percentage: 100, time: "17" }],
  },
  {
    name: "경주IC",
    distance: "28.4",
    leftVDS: [{ status: "원활", percentage: 100, time: "17" }],
    rightVDS: [{ status: "원활", percentage: 100, time: "18" }],
  },
  {
    name: "언양JC",
    distance: "26.5",
    leftVDS: [{ status: "원활", percentage: 100, time: "17" }],
    rightVDS: [{ status: "원활", percentage: 100, time: "16" }],
  },
  {
    name: "양산JC",
    distance: "13.3",
    leftVDS: [
      { status: "원활", percentage: 50, time: "2" },
      { status: "정체", percentage: 50, time: "8" },
    ],
    rightVDS: [
      { status: "원활", percentage: 60, time: "3" },
      { status: "서행", percentage: 40, time: "6" },
    ],
  },
  {
    name: "만남의광장",
    isLast: true,
    leftVDS: [{ status: "원활", percentage: 100, time: "0" }],
    rightVDS: [{ status: "원활", percentage: 100, time: "0" }],
  },
];

export { sections };
