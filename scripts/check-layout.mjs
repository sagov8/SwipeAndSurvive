import { spawn } from 'child_process';
import fs from 'fs';

async function runCheck(width, height, namePrefix) {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9222;
  const tmpDir = `d:\\DEV\\universidad\\TGS\\SwipeAndSurvive\\.tmp-chrome-${width}x${height}`;
  fs.mkdirSync(tmpDir, { recursive: true });
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--window-size=${width},${height}`,
    `--user-data-dir=${tmpDir}`,
    '--hide-scrollbars',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
    const tabs = await listRes.json();
    const wsUrl = tabs[0]?.webSocketDebuggerUrl;
    if (!wsUrl) throw new Error('No wsUrl');

    const ws = new WebSocket(wsUrl);
    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === id) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: 'http://localhost:4173/' });
    await new Promise(r => setTimeout(r, 1000));

    // Capture Step 1 screenshot
    let snap = await send('Page.captureScreenshot');
    fs.writeFileSync(`${namePrefix}_step1.png`, Buffer.from(snap.data, 'base64'));

    // Check step 1 bounds
    let step1Bounds = await send('Runtime.evaluate', {
      expression: `(() => {
        const cabinet = document.querySelector('.max-w-3xl');
        const crt = document.querySelector('.arcade-crt');
        const buttons = Array.from(document.querySelectorAll('button')).map(b => {
          const rect = b.getBoundingClientRect();
          return { text: b.innerText.split('\\n')[0], top: rect.top, bottom: rect.bottom, height: rect.height };
        });
        const docH = window.innerHeight;
        return {
          windowHeight: docH,
          cabinetHeight: cabinet ? cabinet.getBoundingClientRect().height : 0,
          crtHeight: crt ? crt.getBoundingClientRect().height : 0,
          buttons
        };
      })()`,
      returnByValue: true
    });
    console.log(`[${namePrefix}] Step 1:`, JSON.stringify(step1Bounds.result.value, null, 2));

    // Click on 1 JUGADOR button to go to Step 2
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const btn = btns.find(b => b.innerText.includes('1 JUGADOR'));
        if (btn) btn.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    // Capture Step 2 screenshot
    snap = await send('Page.captureScreenshot');
    fs.writeFileSync(`${namePrefix}_step2.png`, Buffer.from(snap.data, 'base64'));

    // Check step 2 bounds
    let step2Bounds = await send('Runtime.evaluate', {
      expression: `(() => {
        const cabinet = document.querySelector('.max-w-3xl');
        const crt = document.querySelector('.arcade-crt');
        const missionBox = document.querySelector('.bg-\\[\\#0B1E33\\]\\/90');
        const stratContainer = document.querySelector('.grid-cols-1.sm\\:grid-cols-2');
        const stratButtons = stratContainer ? Array.from(stratContainer.querySelectorAll('button')).map(b => {
          const r = b.getBoundingClientRect();
          return { text: b.innerText.split('\\n')[0], top: r.top, bottom: r.bottom, height: r.height };
        }) : [];
        const bottomNav = document.querySelector('.flex.items-center.justify-between.gap-3');
        const bottomNavRect = bottomNav ? bottomNav.getBoundingClientRect() : null;
        const crtRect = crt ? crt.getBoundingClientRect() : null;
        const joystick = document.querySelector('.bg-\\[\\#7CD1CF\\]');
        const coinDoor = document.querySelector('.bg-\\[\\#0B3559\\]');

        // Check if strat buttons collide with mission box or bottom nav or overflow CRT
        const overflowsCRT = stratButtons.some(b => crtRect && b.bottom > crtRect.bottom);
        const collidesNav = bottomNavRect && stratButtons.some(b => b.bottom > bottomNavRect.top);

        return {
          windowHeight: window.innerHeight,
          cabinetHeight: cabinet ? cabinet.getBoundingClientRect().height : 0,
          crtHeight: crtRect ? crtRect.height : 0,
          crtBottom: crtRect ? crtRect.bottom : 0,
          missionBoxHeight: missionBox ? missionBox.getBoundingClientRect().height : 0,
          stratButtons,
          bottomNavRect,
          overflowsCRT,
          collidesNav,
          joystickHeight: joystick ? joystick.getBoundingClientRect().height : 0,
          coinDoorHeight: coinDoor ? coinDoor.getBoundingClientRect().height : 0
        };
      })()`,
      returnByValue: true
    });
    console.log(`[${namePrefix}] Step 2:`, JSON.stringify(step2Bounds.result.value, null, 2));

    // Click "INICIAR PARTIDA"
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const btn = btns.find(b => b.innerText.includes('INICIAR PARTIDA'));
        if (btn) btn.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    // Capture Gameplay screenshot
    snap = await send('Page.captureScreenshot');
    fs.writeFileSync(`${namePrefix}_gameplay.png`, Buffer.from(snap.data, 'base64'));

    let gameplayBounds = await send('Runtime.evaluate', {
      expression: `(() => {
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        const main = document.querySelector('main');
        const card = document.querySelector('.cursor-grab');
        const headerRect = header ? header.getBoundingClientRect() : null;
        const footerRect = footer ? footer.getBoundingClientRect() : null;
        const cardRect = card ? card.getBoundingClientRect() : null;
        const mainRect = main ? main.getBoundingClientRect() : null;
        const mainScrollHeight = main ? main.scrollHeight : 0;
        const mainClientHeight = main ? main.clientHeight : 0;
        const hasMainScroll = mainScrollHeight > mainClientHeight;

        return {
          windowHeight: window.innerHeight,
          headerHeight: headerRect ? headerRect.height : 0,
          footerHeight: footerRect ? footerRect.height : 0,
          cardHeight: cardRect ? cardRect.height : 0,
          mainClientHeight,
          mainScrollHeight,
          hasMainScroll,
          overlapHeader: cardRect && headerRect ? cardRect.top < headerRect.bottom : false,
          overlapFooter: cardRect && footerRect ? cardRect.bottom > footerRect.top : false
        };
      })()`,
      returnByValue: true
    });
    console.log(`[${namePrefix}] Gameplay:`, JSON.stringify(gameplayBounds.result.value, null, 2));

    ws.close();
  } finally {
    chrome.kill();
  }
}

async function main() {
  console.log('Testing 1366x650 (Standard Laptop 100% zoom with browser UI)...');
  await runCheck(1366, 650, 'test_1366x650');
  console.log('Testing 1280x600 (Compact Laptop / 125% zoom)...');
  await runCheck(1280, 600, 'test_1280x600');
  console.log('Testing 1536x700 (1080p at 125% zoom)...');
  await runCheck(1536, 700, 'test_1536x700');
}

main().catch(console.error);
