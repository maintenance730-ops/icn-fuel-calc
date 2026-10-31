# ICN Fuel Calculator

ICN 라인정비용 항공사별 급유 계산기 (EK · UL · LO · KC · AI · 3S).
앱 주소: https://maintenance730-ops.github.io/icn-fuel-calc/ (폰 Chrome → 홈 화면에 추가 → 오프라인 작동)

## 구조
- 루트: 배포 파일 (index.html, sw.js, manifest.webmanifest, 아이콘)
- src/: 소스
  - calc.js — 항공사별 계산식 (DOM 없음, node로 테스트 가능)
  - samples.js — 예시값 (실제 급유 사례)
  - logos.js — 항공사 로고 (data URI, src/logos/ 원본에서 생성)
  - template.html — 화면 (항공사별 양식 배치)
  - build.js — calc + samples + template → icn-fuel-calc.html
  - build_pwa.js — icn-fuel-calc.html → pwa/index.html, sw.js 캐시 버전 +1

## 수정 후 배포
src에서 `node build.js && node build_pwa.js` → 생성된 index.html, sw.js를 루트로 복사 → 커밋/푸시.
sw.js 캐시 버전이 올라가야 설치된 폰 앱이 새 버전을 받음.
