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
