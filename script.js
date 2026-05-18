const launchAt = new Date("2026-06-01T20:00:00+08:00");

const cases = {
  "001": {
    title: "异常入口 001：好孩子模拟器",
    body: "一名主播进入童年模拟器后，发现退出键消失。当前仅开放入口预览，完整记录将在下一次同步后解锁。",
    open: true,
  },
  "002": {
    title: "异常入口 002：画外音监听中",
    body: "该异常尚未完成归档。监测到手机推送、酒店线索与黑屏反光，请等待下一次异常同步。",
  },
  "003": {
    title: "异常入口 003：上传进度 99%",
    body: "该异常尚未完成归档。2007 年的上传进度仍停留在 99%。",
  },
  "004": {
    title: "异常入口 004：失踪女友求助记录",
    body: "该异常尚未完成归档。访问者暂不可读取求助节目录像与数字痕迹。",
  },
  "005": {
    title: "异常入口 005：蝶泉中心入营档案",
    body: "该异常尚未完成归档。入营记录被封存，绿色信号仍在闪烁。",
  },
  "006": {
    title: "异常入口 006：未完成的日出剪辑",
    body: "该异常尚未完成归档。时间线存在多次回退、覆盖与重剪。",
  },
  "007": {
    title: "异常入口 007：梦境回声采样",
    body: "该异常尚未完成归档。梦境样本正在等待比对。",
  },
  "008": {
    title: "异常入口 008：醒梦人观察日志",
    body: "该异常尚未完成归档。观察连接尚不稳定。",
  },
};

const pad = (value) => String(value).padStart(2, "0");

function updateCountdown() {
  const remaining = Math.max(0, launchAt.getTime() - Date.now());
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  document.querySelector("#days").textContent = pad(days);
  document.querySelector("#hours").textContent = pad(hours);
  document.querySelector("#minutes").textContent = pad(minutes);
  document.querySelector("#seconds").textContent = pad(seconds);
}

function updateClock() {
  const now = new Date();
  document.querySelector("#clock").textContent = `SYNC ${pad(now.getHours())}:${pad(
    now.getMinutes(),
  )}:${pad(now.getSeconds())}`;
}

function createTraceId() {
  const partA = Math.floor(1000 + Math.random() * 9000);
  const partB = Math.floor(1000 + Math.random() * 9000);
  return `GQ-${partA}-${partB}`;
}

function openModal(entry, title, body) {
  document.querySelector("#modalKicker").textContent = `ENTRY ${entry}`;
  document.querySelector("#modalTitle").textContent = title;
  document.querySelector("#modalBody").textContent = body;
  document.querySelector("#modal").classList.add("is-open");
  document.querySelector("#modal").setAttribute("aria-hidden", "false");
}

function closeModal() {
  document.querySelector("#modal").classList.remove("is-open");
  document.querySelector("#modal").setAttribute("aria-hidden", "true");
}

document.querySelector("#traceId").textContent = createTraceId();
updateCountdown();
updateClock();
setInterval(updateCountdown, 1000);
setInterval(updateClock, 1000);

document.querySelectorAll(".case-row").forEach((row) => {
  row.addEventListener("click", () => {
    const entry = row.dataset.entry;
    const item = cases[entry];
    openModal(entry, item.title, item.body);
  });
});

document.querySelector("#enterArchive").addEventListener("click", () => {
  document.querySelector(".archive-index").scrollIntoView({ behavior: "smooth", block: "center" });
});

document.querySelector("#copySignal").addEventListener("click", async () => {
  const traceId = document.querySelector("#traceId").textContent;
  try {
    await navigator.clipboard.writeText(traceId);
    openModal("000", "访问编号已复制", `当前访问编号：${traceId}`);
  } catch {
    openModal("000", "当前访问编号", traceId);
  }
});

document.querySelectorAll("[data-close]").forEach((node) => {
  node.addEventListener("click", closeModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
