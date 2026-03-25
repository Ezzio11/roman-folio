/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting FPS & Interaction Audit...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const URL = process.argv[2] || 'http://localhost:3000';
  await page.goto(URL);

  console.log(`📡 Monitoring ${URL}...`);

  // Inject script to track long tasks and FPS
  await page.evaluate(() => {
    window.perfMetrics = {
      longTasks: 0,
      frameCount: 0,
      startTime: performance.now(),
    };

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.perfMetrics.longTasks++;
        console.warn(`⚠️ Long Task detected: ${entry.duration.toFixed(2)}ms`);
      }
    });
    observer.observe({ entryTypes: ['longtask'] });

    // Track FPS
    const countFrame = () => {
      window.perfMetrics.frameCount++;
      requestAnimationFrame(countFrame);
    };
    requestAnimationFrame(countFrame);
  });

  // Simulate user scroll
  console.log('🖱️ Simulating full-page scroll...');
  await page.evaluate(async () => {
    const scrollStep = 100;
    const delay = 50;
    const totalHeight = document.body.scrollHeight;
    
    for (let currentHeight = 0; currentHeight < totalHeight; currentHeight += scrollStep) {
      window.scrollTo(0, currentHeight);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  });

  // Collect metrics
  const metrics = await page.evaluate(() => {
    const duration = (performance.now() - window.perfMetrics.startTime) / 1000;
    return {
      longTasks: window.perfMetrics.longTasks,
      avgFps: window.perfMetrics.frameCount / duration,
      duration
    };
  });

  console.log('\n--- Interaction Results ---');
  console.log(`Duration: ${metrics.duration.toFixed(2)}s`);
  console.log(`Average FPS: ${metrics.avgFps.toFixed(1)}`);
  console.log(`Long Tasks: ${metrics.longTasks}`);
  console.log('---------------------------\n');

  await browser.close();

  if (metrics.longTasks > 5) {
    console.error('❌ Interaction Budget Failed: Too many long tasks (>5).');
    process.exit(1);
  } else if (metrics.avgFps < 55) {
    console.warn('⚠️ Warning: Average FPS dropped below 55.');
  } else {
    console.log('✅ Interaction Budget Passed!');
  }
})();
