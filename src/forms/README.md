# 양식 사진 (AeroLogic: 2026-10-31 앱 적용 완료, 예시값은 영수증 받은 뒤)

## AeroLogic (3S) — Aircraft Journey Log B777F (OF001 Rev.06) — 3S_aerologic_journey_log.jpg
- 받은 날: 2026-10-31. 사용자 요청: 거의 안 쓰니 **항공사 목록 맨 끝**에 배치
- 예시값은 나중에 받을 연료 영수증으로 만들 예정, 로고 이미지는 따로 받을 예정
- 기종: B777F (D-AxLx)

FUEL 칸 배치 (양식 그대로):
| SUPPL. QTY | x DENSITY | = FUEL UPLIFT | (빗금) |
| (빗금) | + FOB PRIOR REFUELING | = CALC FUEL ON BOARD | IND. FUEL ON BOARD |
| IND. LDG FUEL | FUEL TYPE | FUEL SUPPLIER | MINIMUM BLOCK FUEL |

계산(양식에서 읽은 것):
- FUEL UPLIFT = SUPPL. QTY × DENSITY
- CALC FUEL ON BOARD = FUEL UPLIFT + FOB PRIOR REFUELING
- 확인용 차이 = IND. FUEL ON BOARD − CALC FUEL ON BOARD (양식에 칸 없음, 앱에서만 표시)

결정(10/31): SUPPL. QTY 기본 단위 **USG** (L도 선택 가능하게), 경고 한도 **±1000kg**
FOB PRIOR REFUELING: 자동 채움 없이 **직접 자유 입력** (사용자 결정 10/31)
