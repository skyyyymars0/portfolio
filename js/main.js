const header = $(".header");
const headerMenus = $(".header .gnb-wrap a");
const skillBtn = $(".skill-wrap li");
const skillTxt = $(".skill-text");
const skillTexts = {
  html: "웹 표준과 시맨틱 마크업을 기반으로 구조적이고 접근성을 고려한 HTML을 작성합니다.",
  css: "다양한 CSS 레이아웃과 반응형 기법을 활용하여 디바이스 환경에 맞는 UI를 구현합니다.",
  js: "JavaScript를 활용하여 사용자 인터랙션과 동적인 UI를 구현합니다.",
  figma:
    "Auto Layout과 Component를 활용하여 UI를 설계하고 Prototype을 통해 사용자 흐름과 인터랙션을 구성합니다.",
  ps: "웹 이미지 편집 및 기본적인 이미지 보정 작업을 할 수 있습니다.",
  ai: "기본적인 그래픽 요소와 아이콘을 제작·편집할 수 있습니다.",
  git: "GitLab을 활용한 기본적인 버전 관리와 실제 운영 반영 경험이 있습니다.",
};

$(document).ready(function () {
  const mainSection = document.querySelector(".main");
  const planetBackground = mainSection?.querySelector(".bg1");

  // Read the pseudo-element so desktop/mobile styles share the same orbit center.
  function syncKeywordOrbits() {
    if (!planetBackground) return;

    const planet = getComputedStyle(planetBackground, "::after");
    const backgroundStyle = getComputedStyle(planetBackground);
    const backgroundRect = planetBackground.getBoundingClientRect();
    const sectionRect = mainSection.getBoundingClientRect();
    const width = parseFloat(planet.width);
    const height = parseFloat(planet.height);
    if (!Number.isFinite(width) || !Number.isFinite(height)) return;

    const left = planet.left !== "auto"
      ? parseFloat(planet.left)
      : planetBackground.clientWidth - parseFloat(planet.right) - width;
    const top = planet.top !== "auto"
      ? parseFloat(planet.top)
      : planetBackground.clientHeight - parseFloat(planet.bottom) - height;
    const transform = planet.transform === "none"
      ? { m41: 0, m42: 0 }
      : new DOMMatrixReadOnly(planet.transform);
    const x = backgroundRect.left - sectionRect.left
      + parseFloat(backgroundStyle.borderLeftWidth) - mainSection.clientLeft
      + left + width / 2 + transform.m41;
    const y = backgroundRect.top - sectionRect.top
      + parseFloat(backgroundStyle.borderTopWidth) - mainSection.clientTop
      + top + height / 2 + transform.m42;

    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    mainSection.style.setProperty("--orbit-x", `${x}px`);
    mainSection.style.setProperty("--orbit-y", `${y}px`);
    mainSection.style.setProperty("--orbit-size", `${width}px`);
  }

  syncKeywordOrbits();
  window.addEventListener("resize", syncKeywordOrbits);
  if (planetBackground && "ResizeObserver" in window) {
    const orbitObserver = new ResizeObserver(syncKeywordOrbits);
    orbitObserver.observe(mainSection);
    orbitObserver.observe(planetBackground);
  }

  $(window).on("scroll", function (e) {
    let $windowTop = $(window).scrollTop();

    if ($windowTop > 80) {
      header.addClass("on");
    } else {
      header.removeClass("on");
    }
  });

  headerMenus.on("click", function (e) {
    const href = $(this).attr("href");
    const targetTop = $(href).offset().top;

    $("html").stop().animate(
      {
        scrollTop: targetTop,
      },
      500,
    );

    e.preventDefault();
  });

  skillBtn.on("mouseenter", function () {
    const skill = $(this).data("txt");

    if (skillTexts[skill]) {
      skillTxt.find("p").text(skillTexts[skill]);
    }
  });
});
