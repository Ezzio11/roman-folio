const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const URL = process.argv[2] || 'http://localhost:3000';
const BUDGET_TBT = 500; // ms
const BUDGET_LCP = 2500; // ms (Good threshold)

console.log(`🚀 Starting Performance Audit for ${URL}...`);

try {
  // Run lighthouse via npx
  const reportPath = path.join(__dirname, '../perf-report.json');
  console.log(`📊 Running Lighthouse audit (this may take a minute)...`);
  
  execSync(`npx lighthouse ${URL} --output json --output-path ${reportPath} --only-categories=performance --chrome-flags="--headless"`, { stdio: 'inherit' });

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const tbt = report.audits['total-blocking-time'].numericValue;
  const lcp = report.audits['largest-contentful-paint'].numericValue;
  const perfScore = report.categories.performance.score * 100;

  console.log('\n--- Performance Results ---');
  console.log(`Performance Score: ${perfScore.toFixed(0)}/100`);
  console.log(`Total Blocking Time (TBT): ${tbt.toFixed(2)}ms`);
  console.log(`Largest Contentful Paint (LCP): ${lcp.toFixed(2)}ms`);
  
  const longTasks = report.audits['main-thread-tasks'].details.items
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 5);

  console.log('\n--- Top 5 Longest Tasks ---');
  longTasks.forEach((task, i) => {
    console.log(`${i + 1}. Duration: ${task.duration.toFixed(2)}ms, Start: ${task.startTime.toFixed(2)}ms`);
  });
  console.log('---------------------------\n');

  let failed = false;
  if (tbt > BUDGET_TBT) {
    console.error(`❌ Performance Budget Failed: TBT (${tbt.toFixed(2)}ms) exceeds budget of ${BUDGET_TBT}ms.`);
    failed = true;
  }
  if (lcp > BUDGET_LCP) {
    console.error(`❌ Performance Budget Failed: LCP (${lcp.toFixed(2)}ms) exceeds budget of ${BUDGET_LCP}ms.`);
    failed = true;
  }

  if (failed) process.exit(1);
  console.log(`✅ All Performance Budgets Passed!`);

} catch (error) {
  console.error('❌ Audit failed:', error.message);
  process.exit(1);
}
