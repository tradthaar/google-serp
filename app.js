/**
 * GoogleBot Landing Page & Documentation Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initTerminalSimulation();
  initOsDetection();
  initTabNavigation();
  initCopyButtons();
  initUpdateNotice();
});

/* 1. Terminal Log Simülasyonu */
function initTerminalSimulation() {
  const terminalBody = document.getElementById('terminalBody');
  if (!terminalBody) return;

  const logs = [
    { type: 'info', text: 'Google Search by Tradthar v1.0.4 başlatılıyor...' },
    { type: 'info', text: 'Uzak lisans sunucusuyla güvenli (AES-256-GCM) el sıkışma yapılıyor...' },
    { type: 'success', text: 'Kullanıcı doğrulandı: "tradthar-pro"' },
    { type: 'success', text: 'Uzak oturum havuzundan 2 adet aktif Google çerezi yüklendi.' },
    { type: 'info', text: 'Eşzamanlı havuz hazır: 2 paralel worker devrede.' },
    { type: 'info', text: 'Cihaz kimliği: Doğal parmak izi eşleşti (Zero Botguard Detection).' },
    { type: 'info', text: '[Worker #1] Arama yapılıyor: "deneme keyword"' },
    { type: 'info', text: '[Worker #1] SERP Sayfa 1 taranıyor (12 organik kart inceleniyor)...' },
    { type: 'success', text: '[Worker #1] Hedef bulundu! Sıra: 1 -> deneme.com' },
    { type: 'info', text: '[Worker #1] Doğal Bézier insan eğrisi ile fare kaydırılıyor (240, 492)...' },
    { type: 'info', text: '[Worker #1] Proxy kota koruması aktif: Resim/CSS/Medya engellendi, JS devrede.' },
    { type: 'success', text: '[Worker #1] Hedef siteye organik geçiş başarılı (Dwell Time: 25 sn)...' },
    { type: 'success', text: '[Worker #1] Organik SERP ve trafik döngüsü eksiksiz tamamlandı.' }
  ];

  let index = 0;

  function getTime() {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  }

  function appendLog() {
    if (index >= logs.length) {
      setTimeout(() => {
        terminalBody.innerHTML = '';
        index = 0;
        appendLog();
      }, 5000);
      return;
    }

    const item = logs[index];
    const logLine = document.createElement('div');
    logLine.className = 'log-line';

    let tagClass = 'log-tag-info';
    let tagText = '[BİLGİ]';

    if (item.type === 'success') {
      tagClass = 'log-tag-success';
      tagText = '[BAŞARILI]';
    } else if (item.type === 'warn') {
      tagClass = 'log-tag-warn';
      tagText = '[UYARI]';
    }

    logLine.innerHTML = `
      <span class="log-time">[${getTime()}]</span>
      <span class="${tagClass}">${tagText}</span>
      <span>${item.text}</span>
    `;

    terminalBody.appendChild(logLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
    index++;

    const delay = item.type === 'success' ? 900 : Math.floor(Math.random() * 600) + 400;
    setTimeout(appendLog, delay);
  }

  appendLog();
}

/* 2. Otomatik İşletim Sistemi Tespiti & İndirme Butonu Eşleştirme */
function initOsDetection() {
  const ua = navigator.userAgent;
  let targetPlatform = 'windows';

  if (ua.includes('Macintosh') || ua.includes('Mac OS X')) {
    targetPlatform = 'mac-arm'; // Modern Mac'ler varsayılan ARM64
  } else if (ua.includes('Linux') || ua.includes('X11')) {
    targetPlatform = 'linux-x64';
  }

  // İlgili kartı recommended yap
  document.querySelectorAll('.platform-card').forEach((card) => {
    if (card.dataset.os === targetPlatform) {
      card.classList.add('recommended');
      const badge = document.createElement('div');
      badge.className = 'rec-badge';
      badge.textContent = 'Cihazınızla Uyumlu';
      card.prepend(badge);
    }
  });

  // Hero indirme butonunu güncelle
  const heroBtn = document.getElementById('heroDownloadBtn');
  if (heroBtn) {
    if (targetPlatform === 'mac-arm') {
      heroBtn.textContent = 'Mac (.dmg) İndir';
      heroBtn.href = 'https://github.com/tradthaar/google-serp/releases/latest/download/googlebot-darwin-arm64.dmg';
    } else if (targetPlatform === 'linux-x64') {
      heroBtn.textContent = 'Linux (.tar.gz) İndir';
      heroBtn.href = 'https://github.com/tradthaar/google-serp/releases/latest/download/googlebot-linux-x64.tar.gz';
    } else {
      heroBtn.textContent = 'Windows (.zip) İndir';
      heroBtn.href = 'https://github.com/tradthaar/google-serp/releases/latest/download/googlebot-windows-x64.zip';
    }
  }
}

/* 3. Dokümantasyon Sekme Geçişleri */
function initTabNavigation() {
  const tabButtons = document.querySelectorAll('.doc-tab-btn');
  const contentPanes = document.querySelectorAll('.doc-content-pane');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      tabButtons.forEach((b) => b.classList.remove('active'));
      contentPanes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* 4. Kod Kopyalama Butonları */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block-wrapper').querySelector('pre code');
      if (pre) {
        navigator.clipboard.writeText(pre.innerText).then(() => {
          const originalText = btn.textContent;
          btn.textContent = 'Kopyalandı! ✓';
          btn.style.color = 'var(--accent-sage, #8fa88d)';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.color = '';
          }, 2000);
        });
      }
    });
  });
}

/* 5. Dinamik Güncelleme Bildirimi (URL'de ?update=1 parametresi varsa) */
function initUpdateNotice() {
  const params = new URLSearchParams(window.location.search);
  const isUpdate = params.get('update') === '1' || params.has('update');
  if (!isUpdate) return;

  const currentVer = params.get('current') || '1.0.0';
  const latestVer = params.get('latest') || '1.0.2';

  const banner = document.getElementById('updateNoticeBanner');
  const currentEl = document.getElementById('bannerCurrentVer');
  const latestEl = document.getElementById('bannerLatestVer');

  if (banner) {
    if (currentEl) currentEl.textContent = `v${currentVer}`;
    if (latestEl) latestEl.textContent = `v${latestVer}`;
    banner.style.display = 'block';

    // 400ms sonra doğrudan indirme kartlarına yumuşak kaydır
    setTimeout(() => {
      const dlSection = document.getElementById('downloads');
      if (dlSection) {
        dlSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Kullanıcının işletim sistemine uygun kartı vurgula
      document.querySelectorAll('.platform-card.recommended').forEach((card) => {
        card.classList.add('pulse-highlight');
      });
    }, 400);
  }
}
