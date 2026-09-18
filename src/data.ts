import { Character, Stage, Crisis, DefensePillar } from './types';

export const CHARACTERS: Character[] = [
  {
    id: 'manager',
    name: '陈建国 (30岁)',
    title: '高级项目经理 · 核心顶梁柱',
    desc: '月薪 RM 12,000 | 刚购入吉隆坡排屋，房贷 RM 3,200/月，育有一幼童',
    avatarBg: 'from-amber-500 to-amber-700',
    avatarImage: '/char_chen.jpg',
    initialSavings: 45000,
    initialHealth: 88,
    monthlyIncome: 12000,
    monthlyExpense: 7500,
    icon: 'fa-briefcase',
  },
  {
    id: 'business',
    name: '林美婷 (30岁)',
    title: '连锁餐饮创办人 · 拼搏期老板',
    desc: '月薪 RM 16,000 | 现金流充沛但工作高压，赡养双亲，计划筹备第二家分店',
    avatarBg: 'from-indigo-500 to-purple-700',
    avatarImage: '/char_lin.jpg',
    initialSavings: 80000,
    initialHealth: 82,
    monthlyIncome: 16000,
    monthlyExpense: 9500,
    icon: 'fa-store',
  },
  {
    id: 'engineer',
    name: '阿力 (30岁)',
    title: '资深工程师 · 双薪家庭主夫',
    desc: '月薪 RM 9,500 | 生活稳健，每月定存 EPF，双亲步入高龄需医疗预备金',
    avatarBg: 'from-sky-500 to-blue-700',
    avatarImage: '/char_ali.jpg',
    initialSavings: 35000,
    initialHealth: 92,
    monthlyIncome: 9500,
    monthlyExpense: 5800,
    icon: 'fa-laptop-code',
  },
];

export const STAGES: Stage[] = [
  { age: 30, name: '30~35 岁：事业黄金冲刺期', desc: '房贷、婚姻、育儿压力交织，高薪高压成为常态。' },
  { age: 35, name: '35~40 岁：家庭支柱巅峰期', desc: '孩子学费上涨，父母体检频繁出现指标异常。' },
  { age: 40, name: '40~45 岁：中年健康水岭期', desc: '身体代谢变慢，心血管与结节异常率大幅上升。' },
  { age: 45, name: '45~50 岁：子女高等教育与资产防线期', desc: '准备大学基金，同时步入大马重疾高发危险期。' },
  { age: 50, name: '50~55 岁：退休倒计时与大病高发期', desc: '身边的同龄朋友陆续出现健康危机，医疗成本激增。' },
  { age: 55, name: '55~60 岁：资产传承与最后防线', desc: '准备享受退休生活，绝不能让重疾掏空几十年的积蓄。' },
];

export const CRISES: Crisis[] = [
  { name: '早期甲状腺癌/乳腺肿瘤', medicalCost: 80000, incomeLossYears: 2 },
  { name: '突发急性心肌梗塞 (Heart Attack)', medicalCost: 120000, incomeLossYears: 3 },
  { name: '脑血管中风 (Stroke)', medicalCost: 150000, incomeLossYears: 4 },
  { name: '结肠癌中晚期 (Colon Cancer)', medicalCost: 180000, incomeLossYears: 3 },
];

export const DEFENSE_PILLARS: DefensePillar[] = [
  { id: 1, title: '1. 医疗保障', sub: '守护健康', desc: '结清医院账单', icon: 'fa-notes-medical', color: 'text-sky-400' },
  { id: 2, title: '2. 保险/重疾规划', sub: '守护家人', desc: '代替3-5年收入', icon: 'fa-shield-halved', color: 'text-amber-400' },
  { id: 3, title: '3. 信托规划', sub: '守护资产', desc: '隔离资产风险', icon: 'fa-handshake', color: 'text-indigo-400' },
  { id: 4, title: '4. 遗嘱规划', sub: '守护意愿', desc: '精准表达意愿', icon: 'fa-file-signature', color: 'text-rose-400' },
  { id: 5, title: '5. 财富传承', sub: '守护未来', desc: '富过三代保障', icon: 'fa-house-chimney-window', color: 'text-emerald-400' },
];
