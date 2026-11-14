// Comprehensive Automated Test Suite for Phase 2 & Phase 3 Data & Auth Layer
import assert from 'node:assert';

console.log('🧪 Starting Phase 2 & Phase 3 Verification Test Suite...\n');

// Mock localStorage for Node environment
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

globalThis.localStorage = new MockLocalStorage();
globalThis.sessionStorage = new MockLocalStorage();
globalThis.window = {
  dispatchEvent: () => {},
  addEventListener: () => {},
  removeEventListener: () => {}
};

// Test 1: Verify Initial Data Integrity
import { initialPortfolioData } from '../src/data/initialPortfolioData.ts';

console.log('Test 1: Verifying Initial Portfolio Data Integrity...');
assert.ok(initialPortfolioData, 'Initial data must exist');
assert.strictEqual(typeof initialPortfolioData.profile, 'object', 'Profile must be an object');
assert.strictEqual(initialPortfolioData.profile.name, 'Hetansh Patel', 'Name must be Hetansh Patel');
assert.strictEqual(initialPortfolioData.profile.gpa, '8.42 / 10 (till 4th Semester)', 'GPA must match 8.42');
assert.strictEqual(initialPortfolioData.profile.phone, '+91 87582 96710', 'Phone number must match');

// Verify Projects
assert.ok(Array.isArray(initialPortfolioData.projects), 'Projects must be an array');
assert.strictEqual(initialPortfolioData.projects.length, 7, 'Must have exactly 7 portfolio case studies');

const projectIds = initialPortfolioData.projects.map(p => p.id);
assert.ok(projectIds.includes('crop-advisor'), 'crop-advisor project must exist');
assert.ok(projectIds.includes('gesture-car'), 'gesture-car project must exist');
assert.ok(projectIds.includes('targeting-system'), 'targeting-system project must exist');
assert.ok(projectIds.includes('autonomous-follower'), 'autonomous-follower project must exist');
assert.ok(projectIds.includes('nagarnetra'), 'nagarnetra project must exist');
assert.ok(projectIds.includes('monte-carlo'), 'monte-carlo project must exist');
assert.ok(projectIds.includes('wifi-car'), 'wifi-car project must exist');

initialPortfolioData.projects.forEach(p => {
  assert.ok(p.title, `Project ${p.id} must have title`);
  assert.ok(p.techSpecs, `Project ${p.id} must have techSpecs`);
  assert.ok(p.techSpecs.mcu, `Project ${p.id} must have mcu`);
  assert.ok(p.techSpecs.sensors, `Project ${p.id} must have sensors`);
  assert.ok(p.techSpecs.protocol, `Project ${p.id} must have protocol`);
  assert.ok(p.techSpecs.languages, `Project ${p.id} must have languages`);
  assert.ok(Array.isArray(p.metrics), `Project ${p.id} must have metrics array`);
});
console.log('✅ Test 1 Passed: Initial data structure & all 7 case studies verified.\n');

// Test 2: Verify Research & Milestones
console.log('Test 2: Verifying Research & Achievements Categories...');
assert.ok(Array.isArray(initialPortfolioData.research), 'Research must be an array');
assert.ok(initialPortfolioData.research.length >= 1, 'Must have at least 1 research project');
const res = initialPortfolioData.research[0];
assert.strictEqual(res.supervisor, 'Dr. Uma Chaduvula', 'Supervisor must match Dr. Uma Chaduvula');
assert.ok(res.contributions.length >= 4, 'Must have key contributions listed');
assert.ok(res.techStack.length >= 4, 'Must have tech stack listed');

assert.ok(Array.isArray(initialPortfolioData.achievements), 'Achievements must be an array');
assert.strictEqual(initialPortfolioData.achievements.length, 3, 'Must have 3 achievement categories');
const achCats = initialPortfolioData.achievements.map(a => a.id);
assert.ok(achCats.includes('hackathons'), 'Hackathons category must exist');
assert.ok(achCats.includes('workshops'), 'Workshops category must exist');
assert.ok(achCats.includes('credentials'), 'Credentials category must exist');

// Verify Timeline
assert.ok(Array.isArray(initialPortfolioData.timeline), 'Timeline must be an array');
assert.strictEqual(initialPortfolioData.timeline.length, 5, 'Must have 5 timeline milestones');

// Verify UI settings
assert.ok(initialPortfolioData.ui, 'UI settings must exist');
assert.strictEqual(initialPortfolioData.ui.accentColor, '#A61E2D', 'Default accent must be #A61E2D');
assert.strictEqual(initialPortfolioData.ui.heroFirstName, 'Hetansh', 'Hero first name must match');
assert.strictEqual(initialPortfolioData.ui.heroLastName, 'Patel', 'Hero last name must match');
assert.strictEqual(typeof initialPortfolioData.ui.visibleSections, 'object', 'Visible sections must be an object');
assert.strictEqual(initialPortfolioData.ui.visibleSections.projects, true, 'Projects section must be visible');
console.log('✅ Test 2 Passed: Research, Achievements, Timeline, and UI settings verified.\n');

// Test 3: Data Service CRUD & Persistence
console.log('Test 3: Verifying Data Service CRUD, Export & Import...');
import {
  getStoredPortfolioData,
  savePortfolioData,
  resetPortfolioData,
  exportPortfolioDataJSON,
  importPortfolioDataJSON
} from '../src/services/dataService.ts';

// 3a. Read stored data (should seed from defaults)
const loaded = getStoredPortfolioData();
assert.strictEqual(loaded.projects.length, 7, 'Default storage must seed 7 projects');

// 3b. Add a new project
const testProj = {
  id: 'test-drone',
  title: 'Autonomous Swarm Drone Node',
  category: 'CASE STUDY // AVIONICS',
  tagline: 'Precision flight telemetry via mesh networking',
  problem: 'GPS denied navigation challenges',
  approach: 'Optical flow + ultra wideband localization',
  outcome: 'Position accuracy within 2cm',
  techSpecs: {
    mcu: 'STM32F405',
    sensors: 'PMW3901 Optical Flow',
    protocol: 'MAVLink / UWB Mesh',
    languages: 'C / PX4 Autopilot'
  },
  metrics: [{ label: 'Drift Rate', value: '< 2cm/min' }],
  githubUrl: 'https://github.com/hex021/swarm-drone'
};

const updatedData = {
  ...loaded,
  projects: [testProj, ...loaded.projects]
};

await savePortfolioData(updatedData);
const reloaded = getStoredPortfolioData();
assert.strictEqual(reloaded.projects.length, 8, 'Storage must now contain 8 projects');
assert.strictEqual(reloaded.projects[0].id, 'test-drone', 'First project must be test-drone');

// 3c. Export JSON test
const jsonExport = exportPortfolioDataJSON();
assert.ok(typeof jsonExport === 'string', 'Export must return a JSON string');
const parsedExport = JSON.parse(jsonExport);
assert.strictEqual(parsedExport.projects.length, 8, 'Exported JSON must contain 8 projects');
assert.ok(parsedExport.ui, 'Exported JSON must contain UI settings');

// 3d. Import JSON test
const modifiedImport = {
  ...parsedExport,
  profile: { ...parsedExport.profile, name: 'Hetansh Patel (Verified Systems Engineer)' },
  ui: { ...parsedExport.ui, accentColor: '#D4AF37', directGithubClick: true }
};
const importRes = await importPortfolioDataJSON(JSON.stringify(modifiedImport));
assert.strictEqual(importRes.success, true, 'Import must succeed for valid JSON');
const afterImport = getStoredPortfolioData();
assert.strictEqual(afterImport.profile.name, 'Hetansh Patel (Verified Systems Engineer)', 'Imported name must reflect in store');
assert.strictEqual(afterImport.ui.accentColor, '#D4AF37', 'Imported accent color must reflect in store');
assert.strictEqual(afterImport.ui.directGithubClick, true, 'Imported direct click flag must reflect in store');

// 3e. Test Malformed JSON Import Handling
const badImport = await importPortfolioDataJSON('INVALID_NON_JSON_STRING{{{');
assert.strictEqual(badImport.success, false, 'Import must fail gracefully on bad JSON');
assert.ok(badImport.error, 'Must provide descriptive error message');

// 3f. Reset to Defaults
await resetPortfolioData();
const resetResult = getStoredPortfolioData();
assert.strictEqual(resetResult.projects.length, 7, 'Must restore back to 7 projects on reset');
assert.strictEqual(resetResult.profile.name, 'Hetansh Patel', 'Must restore default profile name');
assert.strictEqual(resetResult.ui.accentColor, '#A61E2D', 'Must restore default accent color');
console.log('✅ Test 3 Passed: Full CRUD, persistent LocalStorage sync, Export/Import & Reset verified.\n');

// Test 4: Admin Authentication Layer
console.log('Test 4: Verifying Admin Authentication Layer...');
import {
  loginWithCredentials,
  isAuthenticated,
  logoutAdmin,
  updateAdminPassword
} from '../src/services/authService.ts';

// 4a. Initially unauthenticated
assert.strictEqual(isAuthenticated(), false, 'Must be unauthenticated initially');

// 4b. Login with invalid credentials
const failAttempt = await loginWithCredentials('wrong_user', 'bad_pass');
assert.strictEqual(failAttempt.success, false, 'Invalid credentials must be rejected');
assert.strictEqual(isAuthenticated(), false, 'Must remain unauthenticated after bad attempt');

// 4c. Login with Owner credentials
const ownerLogin = await loginWithCredentials('hetansh', 'hetansh-ece-2026');
assert.strictEqual(ownerLogin.success, true, 'Owner credentials must be accepted');
assert.strictEqual(ownerLogin.user.username, 'hetansh', 'User must be hetansh');
assert.strictEqual(ownerLogin.user.role, 'owner', 'Role must be owner');
assert.strictEqual(isAuthenticated(), true, 'Must report isAuthenticated = true');

// 4d. Logout
await logoutAdmin();
assert.strictEqual(isAuthenticated(), false, 'Must report isAuthenticated = false after logout');

// 4e. Login with Standard Admin credentials
const adminLogin = await loginWithCredentials('admin', 'admin123');
assert.strictEqual(adminLogin.success, true, 'Admin credentials must be accepted');
assert.strictEqual(adminLogin.user.role, 'admin', 'Role must be admin');
await logoutAdmin();

// 4f. Custom password override
await updateAdminPassword('new-secure-key-999');
const customLogin = await loginWithCredentials('hetansh', 'new-secure-key-999');
assert.strictEqual(customLogin.success, true, 'Custom password must be accepted');
await logoutAdmin();
console.log('✅ Test 4 Passed: Admin & Owner authentication, security token override & logout verified.\n');

// Test 5: Firebase Engine Driver Diagnostics
console.log('Test 5: Verifying Firebase Config & Graceful Fallback...');
import { isFirebaseConfigured, getFirebaseStatus } from '../src/services/firebase.ts';

const fbStatus = getFirebaseStatus();
assert.strictEqual(typeof fbStatus.configured, 'boolean', 'Firebase status must report boolean');
assert.strictEqual(isFirebaseConfigured(), false, 'Without .env, should be false');
console.log('✅ Test 5 Passed: Firebase fallback engine diagnostic verified.\n');

// Test 6: Advanced Reordering, Deletion, and GitHub Redirection URL Validation
console.log('Test 6: Advanced Project Reordering, Deletion & GitHub Redirection...');
const initialData = getStoredPortfolioData();
assert.strictEqual(initialData.projects.length, 7, 'Should have 7 projects initially');

// 6a. Verify every project has a valid GitHub repo link
initialData.projects.forEach(p => {
  assert.ok(p.githubUrl, `Project ${p.title} must have githubUrl`);
  assert.ok(p.githubUrl.startsWith('https://github.com/'), `Project ${p.title} githubUrl must be a valid GitHub URL`);
});

// 6b. Reorder projects
const reordered = [initialData.projects[1], initialData.projects[0], ...initialData.projects.slice(2)];
await savePortfolioData({ ...initialData, projects: reordered });
const afterReorder = getStoredPortfolioData();
assert.strictEqual(afterReorder.projects[0].id, initialData.projects[1].id, 'Reordered first project must match');
assert.strictEqual(afterReorder.projects[1].id, initialData.projects[0].id, 'Reordered second project must match');

// 6c. Project deletion & restore
const withoutFirst = afterReorder.projects.slice(1);
await savePortfolioData({ ...afterReorder, projects: withoutFirst });
const afterDelete = getStoredPortfolioData();
assert.strictEqual(afterDelete.projects.length, 6, 'Should have 6 projects after deletion');

// Restore baseline
await resetPortfolioData();
const finalReset = getStoredPortfolioData();
assert.strictEqual(finalReset.projects.length, 7, 'Should be restored back to 7 projects');
console.log('✅ Test 6 Passed: Reordering, deletion, and GitHub URLs verified.\n');

console.log('======================================================');
console.log('🎉 ALL AUTOMATED VERIFICATION TESTS PASSED SUCCESSFULLY!');
console.log('======================================================\n');
