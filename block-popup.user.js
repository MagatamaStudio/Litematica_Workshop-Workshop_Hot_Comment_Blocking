// ==UserScript==
// @name        我的世界投影工坊弹窗屏蔽器
// @namespace   Violentmonkey
// @match       *://haomc.com/*
// @match       *://www.haomc.com/*
// @grant       GM_addStyle
// @run-at      document-end
// @version     1.0
// @description 屏蔽指定ID和类名的网页弹窗
// ==/UserScript==

GM_addStyle(`
  #wniui-popup-window.wniui-show-popup-window,
  .wniui-popup-window-title,
  .wniui-popup-window-divider,
  .wniui-popup-window-content {
    display: none !important;
  }
`);

function removePopup() {
  document.querySelectorAll('#wniui-popup-window.wniui-show-popup-window').forEach(el => el.remove());
}

// 创建观察器应对动态加载
function startObserver() {
  const target = document.body || document.documentElement;
  if (!target) {
    return;
  }
  const observer = new MutationObserver(removePopup);
  observer.observe(target, {
    childList: true,
    subtree: true
  });
}

// 初始化移除
removePopup();

// body 尚未解析时等 DOMContentLoaded（once）再启动观察器，避免 observe(null) 抛 TypeError
if (document.body) {
  startObserver();
} else {
  window.addEventListener('DOMContentLoaded', startObserver, { once: true });
}
