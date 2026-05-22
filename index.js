/* ==========================================
   EASY LEDGER - APP CORE LOGIC & AUTH ENGINE
   Pure Vanilla JS (Tactile Visual Sync)
   ========================================== */

// 1. 分类定义与专属 SVG 图标
const CATEGORIES = {
  expense: [
    { id: 'cater', name: '餐饮美食', color: 'hsl(20, 90%, 55%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>` },
    { id: 'shop', name: '日用百货', color: 'hsl(340, 85%, 60%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>` },
    { id: 'traffic', name: '交通出行', color: 'hsl(195, 90%, 48%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="14" height="10" rx="2" ry="2"/><line x1="9" y1="18" x2="9" y2="18"/><line x1="15" y1="18" x2="15" y2="18"/><path d="M4 15v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></svg>` },
    { id: 'play', name: '休闲娱乐', color: 'hsl(282, 80%, 60%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>` },
    { id: 'bill', name: '水电缴费', color: 'hsl(45, 95%, 48%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>` },
    { id: 'medical', name: '医疗健康', color: 'hsl(0, 85%, 55%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>` },
    { id: 'social', name: '人情往来', color: 'hsl(315, 75%, 55%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
    { id: 'other_exp', name: '其他支出', color: 'hsl(215, 25%, 55%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>` }
  ],
  income: [
    { id: 'salary', name: '工资收入', color: 'hsl(145, 80%, 42%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>` },
    { id: 'bonus', name: '年终奖金', color: 'hsl(52, 95%, 48%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/><path d="M12 2a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"/></svg>` },
    { id: 'invest', name: '投资理财', color: 'hsl(165, 85%, 40%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>` },
    { id: 'parttime', name: '兼职副业', color: 'hsl(210, 85%, 55%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>` },
    { id: 'refund', name: '报销返还', color: 'hsl(180, 75%, 42%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>` },
    { id: 'gift', name: '节日礼金', color: 'hsl(335, 80%, 55%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>` },
    { id: 'secondhand', name: '闲鱼二手', color: 'hsl(28, 90%, 50%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>` },
    { id: 'other_inc', name: '其他收入', color: 'hsl(215, 20%, 55%)', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>` }
  ]
};

// 2. 应用全局状态
let state = {
  currentUser: null,  // 当前登录的用户名
  transactions: [],   // 账单记录 (无初始测试数据，纯净空白起步)
  budget: 5000,       // 默认月预算
  selectedCategory: '',
  chartInstance: null
};

// 3. DOM 缓存
const DOM = {
  // 注册登录 DOM
  authWrapper: document.getElementById('authWrapper'),
  tabLogin: document.getElementById('tabLogin'),
  tabRegister: document.getElementById('tabRegister'),
  loginForm: document.getElementById('loginForm'),
  registerForm: document.getElementById('registerForm'),
  loginUser: document.getElementById('loginUser'),
  loginPass: document.getElementById('loginPass'),
  regUser: document.getElementById('regUser'),
  regPass: document.getElementById('regPass'),
  regPassConfirm: document.getElementById('regPassConfirm'),
  
  // 主程序 DOM
  appContainer: document.getElementById('appContainer'),
  currentUserText: document.getElementById('currentUserText'),
  avatarLetter: document.getElementById('avatarLetter'),
  logoutBtn: document.getElementById('logoutBtn'),
  
  // 看板
  totalBalance: document.getElementById('totalBalance'),
  monthlyIncome: document.getElementById('monthlyIncome'),
  monthlyExpense: document.getElementById('monthlyExpense'),
  budgetLimitText: document.getElementById('budgetLimitText'),
  budgetUsedText: document.getElementById('budgetUsedText'),
  budgetBar: document.getElementById('budgetBar'),
  budgetStatusText: document.getElementById('budgetStatusText'),
  setBudgetBtn: document.getElementById('setBudgetBtn'),
  
  // 记账表单
  ledgerForm: document.getElementById('ledgerForm'),
  typeExpense: document.getElementById('typeExpense'),
  typeIncome: document.getElementById('typeIncome'),
  amountInput: document.getElementById('amount'),
  calcPreview: document.getElementById('calcPreview'),
  categoryGrid: document.getElementById('categoryGrid'),
  hiddenCategoryInput: document.getElementById('selectedCategory'),
  dateInput: document.getElementById('date'),
  noteInput: document.getElementById('note'),
  
  // 图表
  categoryChart: document.getElementById('categoryChart'),
  noDataOverlay: document.getElementById('noDataOverlay'),
  chartLabel: document.getElementById('chartLabel'),
  
  // 筛选历史
  searchInput: document.getElementById('searchInput'),
  categoryFilter: document.getElementById('categoryFilter'),
  monthFilter: document.getElementById('monthFilter'),
  sortBy: document.getElementById('sortBy'),
  transactionList: document.getElementById('transactionList'),
  filteredCount: document.getElementById('filteredCount'),
  filteredIncome: document.getElementById('filteredIncome'),
  filteredExpense: document.getElementById('filteredExpense'),
  
  // 预算弹窗
  budgetModal: document.getElementById('budgetModal'),
  budgetInput: document.getElementById('budgetInput'),
  saveBudgetBtn: document.getElementById('saveBudgetBtn'),
  cancelBudgetBtn: document.getElementById('cancelBudgetBtn'),
  closeModalBtn: document.getElementById('closeModalBtn'),
  
  // 批量清除数据弹窗
  openClearModalBtn: document.getElementById('openClearModalBtn'),
  clearModal: document.getElementById('clearModal'),
  closeClearModalBtn: document.getElementById('closeClearModalBtn'),
  cancelClearBtn: document.getElementById('cancelClearBtn'),
  clearAllBtn: document.getElementById('clearAllBtn'),
  clearSelectedCatBtn: document.getElementById('clearSelectedCatBtn'),
  clearThisMonthBtn: document.getElementById('clearThisMonthBtn'),
  clearThisYearBtn: document.getElementById('clearThisYearBtn'),

  // 文件与主题
  exportBtn: document.getElementById('exportBtn'),
  importBtn: document.getElementById('importBtn'),
  fileInput: document.getElementById('fileInput'),
  themeToggle: document.getElementById('themeToggle')
};

// ==========================================
// 4. 程序初始化入口
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // 默认日期填充为今天
  const today = new Date().toISOString().split('T')[0];
  DOM.dateInput.value = today;

  // 绑定基础事件与主题
  bindBaseEvents();
  initTheme();

  // 账户状态检查
  checkUserSession();
});

// ==========================================
// 5. 账户会话检查 (Authentication Logic)
// ==========================================
function checkUserSession() {
  const loggedInUser = localStorage.getItem('easy_ledger_logged_in_user');
  
  if (loggedInUser) {
    // 已登录，进入系统
    state.currentUser = loggedInUser;
    enterApp();
  } else {
    // 未登录，保持在 Auth 界面
    state.currentUser = null;
    DOM.authWrapper.style.display = 'flex';
    DOM.appContainer.style.display = 'none';
  }
}

function enterApp() {
  // 1. 滑出/隐藏登录框并显示主界面
  DOM.authWrapper.style.opacity = '0';
  setTimeout(() => {
    DOM.authWrapper.style.display = 'none';
    DOM.appContainer.style.display = 'flex';
    DOM.authWrapper.style.opacity = '1'; // 重置供未来退场用
  }, 350);

  // 2. 渲染顶栏用户头像及名称
  DOM.currentUserText.textContent = state.currentUser;
  DOM.avatarLetter.textContent = state.currentUser.charAt(0).toUpperCase();

  // 3. 读取该账户隔离下的特定数据 (新账户无 mock 数据，直接起步)
  loadUserSpecificData();

  // 4. 重绘全页面
  changeCategoryGrid('expense');
  updateUI();
}

function loadUserSpecificData() {
  const userTransKey = `easy_ledger_trans_${state.currentUser}`;
  const userBudgetKey = `easy_ledger_budget_${state.currentUser}`;
  
  const storedTrans = localStorage.getItem(userTransKey);
  const storedBudget = localStorage.getItem(userBudgetKey);
  
  // 核心改动：不再添加测试数据，无数据直接以空数组 [] 起步
  state.transactions = storedTrans ? JSON.parse(storedTrans) : [];
  state.budget = storedBudget ? parseFloat(storedBudget) : 5000;
  
  // 同步一次
  saveUserSpecificData();
}

function saveUserSpecificData() {
  if (!state.currentUser) return;
  const userTransKey = `easy_ledger_trans_${state.currentUser}`;
  const userBudgetKey = `easy_ledger_budget_${state.currentUser}`;
  
  localStorage.setItem(userTransKey, JSON.stringify(state.transactions));
  localStorage.setItem(userBudgetKey, state.budget);
}

// ==========================================
// 6. 核心基础事件绑定 (Base Events)
// ==========================================
function bindBaseEvents() {
  // A. 注册登录选项卡切换
  DOM.tabLogin.addEventListener('click', () => {
    DOM.tabRegister.classList.remove('active');
    DOM.tabLogin.classList.add('active');
    DOM.registerForm.classList.remove('active');
    DOM.loginForm.classList.add('active');
  });
  DOM.tabRegister.addEventListener('click', () => {
    DOM.tabLogin.classList.remove('active');
    DOM.tabRegister.classList.add('active');
    DOM.loginForm.classList.remove('active');
    DOM.registerForm.classList.add('active');
  });

  // B. 注册表单提交
  DOM.registerForm.addEventListener('submit', handleRegister);

  // C. 登录表单提交
  DOM.loginForm.addEventListener('submit', handleLogin);

  // D. 退出登录
  DOM.logoutBtn.addEventListener('click', handleLogout);

  // E. 记账收支类型切换
  DOM.typeExpense.addEventListener('change', () => changeCategoryGrid('expense'));
  DOM.typeIncome.addEventListener('change', () => changeCategoryGrid('income'));

  // F. 金额数学算式解析
  DOM.amountInput.addEventListener('input', handleCalculatorInput);

  // G. 账目表单提交
  DOM.ledgerForm.addEventListener('submit', handleFormSubmit);

  // H. 预算模态框
  DOM.setBudgetBtn.addEventListener('click', () => {
    DOM.budgetInput.value = state.budget;
    DOM.budgetModal.classList.add('active');
  });
  const closeBudgetModal = () => DOM.budgetModal.classList.remove('active');
  DOM.closeModalBtn.addEventListener('click', closeBudgetModal);
  DOM.cancelBudgetBtn.addEventListener('click', closeBudgetModal);
  DOM.saveBudgetBtn.addEventListener('click', () => {
    const val = parseFloat(DOM.budgetInput.value);
    if (!isNaN(val) && val >= 0) {
      state.budget = val;
      saveUserSpecificData();
      updateUI();
      closeBudgetModal();
      showToast('月度预算设定成功！');
    }
  });

  // I. 高级批量清空数据模态框
  DOM.openClearModalBtn.addEventListener('click', () => DOM.clearModal.classList.add('active'));
  const closeClearModal = () => DOM.clearModal.classList.remove('active');
  DOM.closeClearModalBtn.addEventListener('click', closeClearModal);
  DOM.cancelClearBtn.addEventListener('click', closeClearModal);
  
  // 绑定多维度清空事件
  DOM.clearAllBtn.addEventListener('click', () => batchClearData('all'));
  DOM.clearSelectedCatBtn.addEventListener('click', () => batchClearData('category'));
  DOM.clearThisMonthBtn.addEventListener('click', () => batchClearData('month'));
  DOM.clearThisYearBtn.addEventListener('click', () => batchClearData('year'));

  // J. 历史搜索筛选与排序
  DOM.searchInput.addEventListener('input', updateUI);
  DOM.categoryFilter.addEventListener('change', updateUI);
  DOM.monthFilter.addEventListener('change', updateUI);
  DOM.sortBy.addEventListener('change', updateUI);

  // K. 数据备份导入导出
  DOM.exportBtn.addEventListener('click', exportBackup);
  DOM.importBtn.addEventListener('click', () => DOM.fileInput.click());
  DOM.fileInput.addEventListener('change', importBackup);

  // L. 主题切换
  DOM.themeToggle.addEventListener('click', toggleTheme);
}

// ==========================================
// 7. 用户注册与登录控制 (User Auth Core)
// ==========================================
function handleRegister(e) {
  e.preventDefault();
  
  const user = DOM.regUser.value.trim();
  const pass = DOM.regPass.value;
  const passConf = DOM.regPassConfirm.value;
  
  if (!user || !pass) {
    showToast('请输入完整的注册信息！', 'error');
    return;
  }
  
  if (pass !== passConf) {
    showToast('密码与确认密码不一致！', 'error');
    return;
  }
  
  // 读取已存用户列表
  let users = [];
  const storedUsers = localStorage.getItem('easy_ledger_users');
  if (storedUsers) {
    try { users = JSON.parse(storedUsers); } catch(e) { users = []; }
  }
  
  // 重名检测
  if (users.some(u => u.username.toLowerCase() === user.toLowerCase())) {
    showToast('该用户名已被注册，请换一个吧！', 'error');
    // 抖动输入框警示
    DOM.regUser.classList.add('calc-invalid');
    setTimeout(() => DOM.regUser.classList.remove('calc-invalid'), 1000);
    return;
  }
  
  // 写入新用户 (简单混淆密码)
  const newUser = {
    username: user,
    passwordHash: btoa(pass) // 简易前端 base64 混淆
  };
  users.push(newUser);
  localStorage.setItem('easy_ledger_users', JSON.stringify(users));
  
  showToast('注册成功！正在为您登入... 🎉');
  
  // 自动登入
  state.currentUser = user;
  localStorage.setItem('easy_ledger_logged_in_user', user);
  
  // 清空表单
  DOM.regUser.value = '';
  DOM.regPass.value = '';
  DOM.regPassConfirm.value = '';
  
  setTimeout(enterApp, 800);
}

function handleLogin(e) {
  e.preventDefault();
  
  const user = DOM.loginUser.value.trim();
  const pass = DOM.loginPass.value;
  
  if (!user || !pass) {
    showToast('密码或用户名不能为空！', 'error');
    return;
  }
  
  // 读取用户库
  let users = [];
  const storedUsers = localStorage.getItem('easy_ledger_users');
  if (storedUsers) {
    try { users = JSON.parse(storedUsers); } catch(e) { users = []; }
  }
  
  // 匹配校验
  const matched = users.find(u => u.username.toLowerCase() === user.toLowerCase());
  if (matched && atob(matched.passwordHash) === pass) {
    showToast('安全验证通过，欢迎回来！🔑');
    state.currentUser = matched.username;
    localStorage.setItem('easy_ledger_logged_in_user', matched.username);
    
    DOM.loginUser.value = '';
    DOM.loginPass.value = '';
    
    setTimeout(enterApp, 800);
  } else {
    showToast('用户名或密码错误，请重新输入！', 'error');
    // 抖动整个卡片提示失败
    const card = document.querySelector('.auth-card');
    card.style.animation = 'none';
    setTimeout(() => {
      card.style.animation = 'pulse-svg 0.4s ease';
    }, 10);
  }
}

function handleLogout() {
  if (confirm('确定要退出当前记账账户吗？')) {
    // 销毁图表
    if (state.chartInstance) {
      state.chartInstance.destroy();
      state.chartInstance = null;
    }
    
    // 清空会话
    localStorage.removeItem('easy_ledger_logged_in_user');
    state.currentUser = null;
    
    showToast('已安全登出账户。🧹');
    
    // 平滑退场并重启会话
    DOM.appContainer.style.opacity = '0';
    setTimeout(() => {
      DOM.appContainer.style.display = 'none';
      DOM.appContainer.style.opacity = '1';
      DOM.authWrapper.style.display = 'flex';
      // 激活登录标签
      DOM.tabLogin.click();
    }, 3000 / 10); // 300ms
  }
}

// ==========================================
// 8. 多维度批量数据清空引擎 (Multi-dimensional Clear)
// ==========================================
function batchClearData(mode) {
  if (state.transactions.length === 0) {
    showToast('当前账户本就无任何账单，无需清空。', 'error');
    DOM.clearModal.classList.remove('active');
    return;
  }

  let confirmMsg = '';
  let filterFn = null;

  if (mode === 'all') {
    confirmMsg = '⚠️ 确定要彻底清空【全部历史账单】吗？删除后数据将完全重置且不可还原！';
    filterFn = () => false; // 保留 0 个
  } else if (mode === 'category') {
    const selectedCat = DOM.categoryFilter.value;
    if (selectedCat === 'all') {
      showToast('请先在明细账单上方的下拉框中选择要清空的分类！', 'error');
      DOM.clearModal.classList.remove('active');
      return;
    }
    const catName = getCategoryDetails('expense', selectedCat).name;
    confirmMsg = `⚠️ 确定要清空分类为【${catName}】的所有账单记录吗？`;
    filterFn = (t) => t.category !== selectedCat; // 剔除特定分类
  } else if (mode === 'month') {
    const selectedMonth = DOM.monthFilter.value;
    const currentMonthStr = selectedMonth !== 'all' ? selectedMonth : new Date().toISOString().slice(0, 7);
    const displayMonth = `${currentMonthStr.split('-')[0]}年${currentMonthStr.split('-')[1]}月`;
    confirmMsg = `⚠️ 确定要清空【${displayMonth}】这整个月份的账单记录吗？`;
    filterFn = (t) => t.date.slice(0, 7) !== currentMonthStr; // 剔除特定月份
  } else if (mode === 'year') {
    const selectedMonth = DOM.monthFilter.value;
    const currentYearStr = selectedMonth !== 'all' ? selectedMonth.slice(0, 4) : new Date().getFullYear().toString();
    confirmMsg = `⚠️ 确定要清空【${currentYearStr}年】这一整年的所有账目记录吗？`;
    filterFn = (t) => t.date.slice(0, 4) !== currentYearStr; // 剔除特定年份
  }

  if (confirmFn(confirmMsg)) {
    const beforeCount = state.transactions.length;
    // 运行删除过滤
    state.transactions = state.transactions.filter(filterFn);
    const deletedCount = beforeCount - state.transactions.length;
    
    saveUserSpecificData();
    updateUI();
    DOM.clearModal.classList.remove('active');
    
    showToast(`成功批量清空 ${deletedCount} 笔数据！🧹`);
  }
}

// 供覆写方便测试的弹窗方法
function confirmFn(msg) {
  return confirm(msg);
}

// ==========================================
// 9. 计算器动态解析
// ==========================================
function handleCalculatorInput(e) {
  let val = e.target.value.trim();
  
  if (!val) {
    DOM.calcPreview.textContent = '支持数学运算，如 10+25-5';
    DOM.calcPreview.className = 'calc-preview';
    return;
  }
  
  const safeRegex = /^[0-9+\-*/().\s]+$/;
  if (!safeRegex.test(val)) {
    DOM.calcPreview.textContent = '仅支持数字和运算符 +-/*';
    DOM.calcPreview.className = 'calc-preview calc-invalid';
    return;
  }
  
  try {
    const result = evalSafe(val);
    if (result !== null && !isNaN(result) && isFinite(result)) {
      const formattedResult = Number(result.toFixed(2));
      DOM.calcPreview.textContent = `计算公式有效 ＝ ¥ ${formattedResult}`;
      DOM.calcPreview.className = 'calc-preview calc-valid';
    } else {
      DOM.calcPreview.textContent = '公式不完整...';
      DOM.calcPreview.className = 'calc-preview calc-invalid';
    }
  } catch (err) {
    DOM.calcPreview.textContent = '公式运算中...';
    DOM.calcPreview.className = 'calc-preview calc-invalid';
  }
}

function evalSafe(str) {
  const cleanStr = str.replace(/[^0-9+\-*/().\s]/g, '');
  try {
    const fn = new Function(`return (${cleanStr})`);
    return fn();
  } catch(e) {
    return null;
  }
}

// ==========================================
// 10. 类别格子生成
// ==========================================
function changeCategoryGrid(type) {
  DOM.categoryGrid.innerHTML = '';
  state.selectedCategory = '';
  DOM.hiddenCategoryInput.value = '';
  
  CATEGORIES[type].forEach((cat, index) => {
    const item = document.createElement('div');
    item.className = 'category-item';
    item.dataset.id = cat.id;
    item.innerHTML = `
      ${cat.icon}
      <span>${cat.name}</span>
    `;
    
    if (index === 0) {
      item.classList.add('active');
      state.selectedCategory = cat.id;
      DOM.hiddenCategoryInput.value = cat.id;
    }
    
    item.addEventListener('click', () => {
      document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      state.selectedCategory = cat.id;
      DOM.hiddenCategoryInput.value = cat.id;
    });
    
    DOM.categoryGrid.appendChild(item);
  });
}

// ==========================================
// 11. 快速记账提交 (Add Transaction)
// ==========================================
function handleFormSubmit(e) {
  e.preventDefault();
  
  const type = DOM.typeExpense.checked ? 'expense' : 'income';
  const rawAmount = DOM.amountInput.value.trim();
  const category = DOM.hiddenCategoryInput.value;
  const date = DOM.dateInput.value;
  const note = DOM.noteInput.value.trim();
  
  if (!rawAmount || !category || !date) {
    showToast('请完整填写金额、分类和日期！', 'error');
    return;
  }
  
  let amount = 0;
  try {
    const evaluated = evalSafe(rawAmount);
    if (evaluated !== null && !isNaN(evaluated) && isFinite(evaluated) && evaluated > 0) {
      amount = parseFloat(evaluated.toFixed(2));
    } else {
      showToast('请输入大于 0 的有效金额数字或公式！', 'error');
      return;
    }
  } catch (err) {
    showToast('金额输入有误，请检查！', 'error');
    return;
  }
  
  const newTransaction = {
    id: Date.now().toString(),
    type,
    amount,
    category,
    date,
    note: note || getCategoryName(type, category)
  };
  
  state.transactions.unshift(newTransaction);
  
  saveUserSpecificData();
  updateUI();
  
  // 重置表单
  DOM.amountInput.value = '';
  DOM.noteInput.value = '';
  DOM.calcPreview.textContent = '支持数学运算，如 10+25-5';
  DOM.calcPreview.className = 'calc-preview';
  
  DOM.ledgerForm.style.transform = 'scale(0.99)';
  setTimeout(() => { DOM.ledgerForm.style.transform = 'none'; }, 150);

  showToast('账目记录成功！🎉');
}

// ==========================================
// 12. UI 总更新
// ==========================================
function updateUI() {
  if (!state.currentUser) return;

  const totalFinancials = calculateFinancials();
  
  DOM.totalBalance.textContent = `¥${formatNumber(totalFinancials.net)}`;
  DOM.monthlyIncome.textContent = `¥${formatNumber(totalFinancials.income)}`;
  DOM.monthlyExpense.textContent = `¥${formatNumber(totalFinancials.expense)}`;
  
  renderBudget(totalFinancials.expense);
  populateFilterOptions();
  
  const filteredList = getFilteredAndSortedTransactions();
  renderTransactionList(filteredList);
  renderChart();
}

function calculateFinancials() {
  const currentMonthStr = new Date().toISOString().slice(0, 7);
  
  let net = 0;
  let income = 0;
  let expense = 0;
  
  state.transactions.forEach(t => {
    const amount = t.amount;
    const isCurrentMonth = t.date.slice(0, 7) === currentMonthStr;
    
    if (t.type === 'income') {
      net += amount;
      if (isCurrentMonth) income += amount;
    } else {
      net -= amount;
      if (isCurrentMonth) expense += amount;
    }
  });
  
  return { net, income, expense };
}

function renderBudget(currentMonthExpense) {
  DOM.budgetLimitText.textContent = `¥${formatNumber(state.budget)}`;
  DOM.budgetUsedText.textContent = `¥${formatNumber(currentMonthExpense)}`;
  
  if (state.budget === 0) {
    DOM.budgetBar.style.width = '0%';
    DOM.budgetStatusText.textContent = '暂未设定月度预算，点击右上角设置以控制日常开销。';
    DOM.budgetBar.className = 'progress-bar';
    return;
  }
  
  const percentage = Math.min((currentMonthExpense / state.budget) * 100, 100);
  DOM.budgetBar.style.width = `${percentage}%`;
  
  const remaining = state.budget - currentMonthExpense;
  const parentCard = DOM.budgetBar.closest('.budget-card');
  parentCard.classList.remove('budget-safe', 'budget-warning', 'budget-danger');
  DOM.budgetBar.style.backgroundColor = '';
  
  if (percentage < 50) {
    parentCard.classList.add('budget-safe');
    DOM.budgetBar.style.backgroundColor = 'var(--color-income)';
    DOM.budgetStatusText.innerHTML = `预算十分充足！本月还剩 <span class="text-income">¥${formatNumber(remaining)}</span> 可支配。`;
  } else if (percentage >= 50 && percentage < 80) {
    parentCard.classList.add('budget-warning');
    DOM.budgetBar.style.backgroundColor = 'var(--color-warning)';
    DOM.budgetStatusText.innerHTML = `已使用过半，略有紧缩。本月还剩 <span class="text-income">¥${formatNumber(remaining)}</span>。`;
  } else {
    parentCard.classList.add('budget-danger');
    DOM.budgetBar.style.backgroundColor = 'var(--color-expense)';
    if (remaining >= 0) {
      DOM.budgetStatusText.innerHTML = `🚨 预算告急！已使用 ${percentage.toFixed(0)}%，仅剩 <span class="text-expense">¥${formatNumber(remaining)}</span>！`;
    } else {
      DOM.budgetStatusText.innerHTML = `💥 预算爆表！已超出限额 <span class="text-expense">¥${formatNumber(Math.abs(remaining))}</span>！`;
    }
  }
}

function populateFilterOptions() {
  const prevSelectedMonth = DOM.monthFilter.value;
  const prevSelectedCat = DOM.categoryFilter.value;
  
  const months = ['all'];
  state.transactions.forEach(t => {
    const m = t.date.slice(0, 7);
    if (!months.includes(m)) months.push(m);
  });
  
  const sortedMonths = ['all', ...months.filter(m => m !== 'all').sort((a,b) => b.localeCompare(a))];
  
  DOM.monthFilter.innerHTML = '';
  sortedMonths.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m === 'all' ? '所有月份' : `${m.split('-')[0]}年${m.split('-')[1]}月`;
    DOM.monthFilter.appendChild(opt);
  });
  DOM.monthFilter.value = sortedMonths.includes(prevSelectedMonth) ? prevSelectedMonth : 'all';
  
  const cats = [{ id: 'all', name: '所有分类' }];
  [...CATEGORIES.expense, ...CATEGORIES.income].forEach(c => {
    if (!cats.some(el => el.id === c.id)) cats.push(c);
  });
  
  DOM.categoryFilter.innerHTML = '';
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.name;
    DOM.categoryFilter.appendChild(opt);
  });
  DOM.categoryFilter.value = cats.some(el => el.id === prevSelectedCat) ? prevSelectedCat : 'all';
}

function getFilteredAndSortedTransactions() {
  const searchVal = DOM.searchInput.value.toLowerCase().trim();
  const selectedCat = DOM.categoryFilter.value;
  const selectedMonth = DOM.monthFilter.value;
  const sortOption = DOM.sortBy.value;
  
  let list = [...state.transactions];
  
  if (searchVal) {
    list = list.filter(t => t.note.toLowerCase().includes(searchVal));
  }
  if (selectedCat !== 'all') {
    list = list.filter(t => t.category === selectedCat);
  }
  if (selectedMonth !== 'all') {
    list = list.filter(t => t.date.slice(0, 7) === selectedMonth);
  }
  
  list.sort((a, b) => {
    if (sortOption === 'date-desc') return new Date(b.date) - new Date(a.date) || b.id.localeCompare(a.id);
    if (sortOption === 'date-asc') return new Date(a.date) - new Date(b.date) || a.id.localeCompare(b.id);
    if (sortOption === 'amount-desc') return b.amount - a.amount;
    if (sortOption === 'amount-asc') return a.amount - b.amount;
    return 0;
  });
  
  return list;
}

function renderTransactionList(list) {
  DOM.transactionList.innerHTML = '';
  
  let totalIncome = 0;
  let totalExpense = 0;
  
  DOM.filteredCount.textContent = list.length;
  
  if (list.length === 0) {
    DOM.transactionList.innerHTML = `
      <div class="list-empty">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>
        <span>当前账户无任何账目，请在左侧添加。</span>
      </div>
    `;
    DOM.filteredIncome.textContent = '¥0.00';
    DOM.filteredExpense.textContent = '¥0.00';
    return;
  }
  
  list.forEach(t => {
    if (t.type === 'income') {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;
    }
    
    const item = document.createElement('div');
    item.className = 'transaction-item';
    
    const catDetails = getCategoryDetails(t.type, t.category);
    
    item.innerHTML = `
      <div class="item-left">
        <div class="item-icon-wrapper ${t.type === 'expense' ? 'item-expense-icon' : 'item-income-icon'}">
          ${catDetails.icon}
        </div>
        <div class="item-meta">
          <span class="item-category">${catDetails.name}</span>
          <span class="item-note">${escapeHTML(t.note)}</span>
          <span class="item-date">${t.date}</span>
        </div>
      </div>
      <div class="item-right">
        <span class="item-amount ${t.type === 'expense' ? 'amount-expense' : 'amount-income'}">
          ${t.type === 'expense' ? '-' : '+'}¥${formatNumber(t.amount)}
        </span>
        <button class="btn-delete" title="删除该账目" data-id="${t.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        </button>
      </div>
    `;
    
    item.querySelector('.btn-delete').addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      deleteTransaction(id);
    });
    
    DOM.transactionList.appendChild(item);
  });
  
  DOM.filteredIncome.textContent = `¥${formatNumber(totalIncome)}`;
  DOM.filteredExpense.textContent = `¥${formatNumber(totalExpense)}`;
}

function deleteTransaction(id) {
  if (confirm('确定要删除这笔记账记录吗？')) {
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveUserSpecificData();
    updateUI();
    showToast('账目删除成功！🗑️');
  }
}

// ==========================================
// 13. 图表渲染 (Doughnut Chart)
// ==========================================
function renderChart() {
  const currentMonthStr = DOM.monthFilter.value !== 'all' 
    ? DOM.monthFilter.value 
    : new Date().toISOString().slice(0, 7);
  
  const displayYear = currentMonthStr.split('-')[0];
  const displayMonth = currentMonthStr.split('-')[1];
  DOM.chartLabel.textContent = `${displayYear}年${displayMonth}月 支出分类构成`;
  
  const monthlyExpenses = state.transactions.filter(t => 
    t.type === 'expense' && t.date.slice(0, 7) === currentMonthStr
  );
  
  if (monthlyExpenses.length === 0) {
    DOM.noDataOverlay.classList.add('show');
    if (state.chartInstance) {
      state.chartInstance.destroy();
      state.chartInstance = null;
    }
    return;
  }
  DOM.noDataOverlay.classList.remove('show');
  
  const categorySums = {};
  monthlyExpenses.forEach(t => {
    categorySums[t.category] = (categorySums[t.category] || 0) + t.amount;
  });
  
  const labels = [];
  const data = [];
  const backgroundColor = [];
  
  Object.keys(categorySums).forEach(catId => {
    const catDetails = getCategoryDetails('expense', catId);
    labels.push(catDetails.name);
    data.push(categorySums[catId]);
    backgroundColor.push(catDetails.color);
  });
  
  if (state.chartInstance) {
    state.chartInstance.destroy();
  }
  
  const isDark = document.body.classList.contains('dark-theme');
  const textColor = isDark ? '#d1d5db' : '#374151';
  const borderColor = isDark ? '#1a202c' : '#ffffff';
  
  state.chartInstance = new Chart(DOM.categoryChart, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColor,
        borderWidth: 3,
        borderColor: borderColor,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            font: { family: 'Inter', size: 12 },
            color: textColor
          }
        },
        tooltip: {
          backgroundColor: isDark ? '#1a202c' : '#ffffff',
          titleColor: isDark ? '#ffffff' : '#111827',
          bodyColor: isDark ? '#d1d5db' : '#374151',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: function(context) {
              const val = context.raw;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percent = ((val / total) * 100).toFixed(1);
              return ` ¥${formatNumber(val)} (${percent}%)`;
            }
          }
        }
      },
      cutout: '62%'
    }
  });
}

// ==========================================
// 14. 导入导出备份 (JSON File Support)
// ==========================================
function exportBackup() {
  if (state.transactions.length === 0) {
    showToast('当前账户无记账数据可导出！', 'error');
    return;
  }
  
  const backupObj = {
    app: 'Easy Ledger',
    version: '1.2.0',
    user: state.currentUser,
    exportAt: new Date().toISOString(),
    budget: state.budget,
    transactions: state.transactions
  };
  
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObj, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  
  const timeStamp = new Date().toISOString().slice(0,10);
  downloadAnchor.setAttribute("download", `easy-ledger-${state.currentUser}-backup-${timeStamp}.json`);
  
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  
  showToast('账目备份导出成功！💾');
}

function importBackup(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const data = JSON.parse(evt.target.result);
      
      if (data.app !== 'Easy Ledger' || !Array.isArray(data.transactions)) {
        showToast('导入失败：非本系统认可的备份格式！', 'error');
        return;
      }
      
      if (confirm(`解析到备份文件。\n属于用户：${data.user || '未知'}\n条目：${data.transactions.length} 笔\n是否确定合并覆盖当前账户【${state.currentUser}】的数据？`)) {
        state.transactions = data.transactions;
        state.budget = data.budget || 5000;
        
        saveUserSpecificData();
        updateUI();
        
        showToast('🎉 数据导入并恢复成功！');
      }
    } catch(err) {
      showToast('导入失败：备份解析错误！', 'error');
    }
    DOM.fileInput.value = '';
  };
  reader.readAsText(file);
}

// ==========================================
// 15. 辅助与主题功能 (Helpers & Theme)
// ==========================================
function formatNumber(num) {
  return Number(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

function getCategoryDetails(type, categoryId) {
  const list = CATEGORIES[type] || [];
  const found = list.find(c => c.id === categoryId);
  if (found) return found;
  return { 
    name: '其他', 
    color: 'hsl(215, 20%, 50%)', 
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>` 
  };
}

function getCategoryName(type, categoryId) {
  return getCategoryDetails(type, categoryId).name;
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 99999;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  // 适配立体白的优雅 toast 样式
  toast.style.cssText = `
    background: ${type === 'success' ? '#ffffff' : '#ffffff'};
    color: ${type === 'success' ? 'var(--color-income)' : 'var(--color-expense)'};
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 700;
    border-radius: var(--border-radius-sm);
    border: 1.5px solid ${type === 'success' ? 'var(--color-income)' : 'var(--color-expense)'};
    box-shadow: 0 10px 30px rgba(0,0,0,0.08), 0 2px 5px rgba(0,0,0,0.02);
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  `;
  toast.innerHTML = `
    ${type === 'success' ? '⚡' : '⚠️'}
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px) scale(0.9)';
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

function initTheme() {
  const currentTheme = localStorage.getItem('easy_ledger_theme') || 'light'; // 默认设置为 light
  if (currentTheme === 'dark') {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  }
}

function toggleTheme() {
  const body = document.body;
  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('easy_ledger_theme', 'dark');
    showToast('切换至暗黑微光立体视图 🌙');
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('easy_ledger_theme', 'light');
    showToast('切换至高阶白瓷浮雕视图 ☀️');
  }
  updateUI();
}
